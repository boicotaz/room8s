module.exports = {
    HOST: "0.0.0.0",
    USER: "root",
    PASSWORD: "root",
    DB: "room8s",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};