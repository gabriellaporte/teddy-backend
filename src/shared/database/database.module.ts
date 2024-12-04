import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource from '../../../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '../../../**/*.entity{.ts,.js}'],
        logging: true,
      }),
    }),
  ],
})
export class DatabaseModule implements OnModuleInit {
  onModuleInit(): any {
    dataSource.initialize().then(async () => {
      console.log('Database inicializada! 🚀');
      await dataSource.runMigrations();
    });
  }
}
