
# Technical Test Eigen - Backend
### Aidil Febrian


#### Run Migration :
- Linux
    ```bash
    NEST_ENV=[dev|test] npm run migrate:refresh  
    ```
- Windows
    ```bash
    SET NEST_ENV=[dev|test&&npm run migrate:refresh  
    ```

#### Develop Mode
- Linux
    ```bash
    npm run start:dev
    ```
- Windows
    ```bash
    npm run start:win-dev
    ```
    
#### Production Mode
```bash
docker compose up --build -d
```

#### Open Api Documentaion
```bash
http://localhost:4010/api-docs
```

## Tech Stack
[![My Skills](https://skillicons.dev/icons?i=nodejs,nest,ts,js,jest)](https://skillicons.dev)

## Sources
https://github.com/KILLYOUGUTSXXX/user-crud-nestjs