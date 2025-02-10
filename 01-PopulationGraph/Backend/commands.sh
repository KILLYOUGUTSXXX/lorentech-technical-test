

# Drop database if exists
AIDIL_ENV='main' npm run drop:db;

# Create the database
AIDIL_ENV='main' npm run create:db;

# Migrate schema
AIDIL_ENV='main' npm run migrate:up;

# Seedng the datas Province & Populations
AIDIL_ENV='main' npm run seed;

AIDIL_ENV='main' npm run start;