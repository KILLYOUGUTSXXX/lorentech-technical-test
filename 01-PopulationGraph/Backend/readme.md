
# Backend Installation

on this configuration, there is upon on the 2 environment (main & dev), which "main" is meant by the production stage, whereas "dev" is the development stage :

**Configuration Template :**
```bash
PORT=<SERVICE_PORT>

AFX_PG_URL=<POSTRES_URL>
AFX_PG_PORT=<POSTRES_PORT>
AFX_PG_USER=<POSTRES_USER>
AFX_PG_PSW=<POSTRES_DB_PASSWORD>
AFX_PG_DBNAME=<POSTRES_DB_NAME>
```

### With Docker

####  1. Run docker compose & wait unti the installation finish

```bash
  docker compose up --build -d
```

### Without Docker (Linux Configuration)

#### 1. Installing package
```bash
  npm i --legacy-peer-deps
```

#### 2. Creating Database
```bash
  npm run db:create
```

#### 3. Migrate Schema
```bash
  npm run migrate:up
```

#### 4. Seeding the Datas
```bash
  npm run seed
```

#### 4. Build Project
```bash
  npm run build
```

#### 5. Run the service
```bash
  npm run start
```
