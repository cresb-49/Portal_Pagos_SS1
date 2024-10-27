export default {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/mydb',
    BANCO1URL: process.env.BANCO1URL || 'http://localhost:3000',
    BANCO2URL: process.env.BANCO2URL || 'http://localhost:3001',
};
