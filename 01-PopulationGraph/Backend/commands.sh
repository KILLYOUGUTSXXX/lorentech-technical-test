MAIN_ENV='main';

# Drop database if exists
npm run drop:db;

# Create the database
npm run create:db;

# Migrate schema
npm run migrate:up;

# Seedng the datas Province & Populations
npm run seed;

npm run start;