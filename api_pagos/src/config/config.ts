export default {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL || "mysql://root:root@localhost:3306/pagos_ss1",
    banco1: process.env.BANCO1 || "http://localhost:3001",
    banco2: process.env.BANCO2 || "http://localhost:3002",
    secretKey: process.env.JWT_SECRET || "secretKey",
    ecommerce1: process.env.ECOMMERCE1 || "http://localhost:3003",
    ecommerce2: process.env.ECOMMERCE2 || "http://localhost:3004",
};
