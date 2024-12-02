#!/bin/sh

echo "NODE_ENV is set to: $NODE_ENV"

if [ "$NODE_ENV" = "development" ]; then
  echo "Starting in development mode..."
  rm -rf ./dist && npm run start:dev
else
  echo "Starting in production mode..."
  npm run start:prod
fi
