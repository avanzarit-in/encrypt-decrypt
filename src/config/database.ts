module.exports = {
  "local": {
    "username": "postgres",
    "password": "admin",
    "database": "gts_crm",
    //"host": "10.0.0.20",
    "host": "localhost",
    "dialect": "postgres",
    define: {
      timestamps: false
    }
  },
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "gts_crm",
    //"host": "10.0.0.20",
    "host": "47.154.53.168",
    "dialect": "postgres",
    define: {
      timestamps: false
    }
    
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
};
