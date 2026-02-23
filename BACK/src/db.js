const oracledb = require('oracledb');
const dotenv = require('dotenv');

dotenv.config();

// Configuración básica
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// Configuración de conexión - IGUAL QUE EN SQLPLUS
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING
};

console.log('🔧 Configuración:', {
    user: dbConfig.user,
    connectString: dbConfig.connectString
});

// Función de conexión directa
async function getConnection() {
    try {
        console.log('🟡 Conectando a Oracle...');
        const connection = await oracledb.getConnection(dbConfig);
        console.log('✅ Conectado a Oracle');
        return connection;
    } catch (error) {
        console.error('❌ Error conectando:', error.message);
        throw error;
    }
}

// Función de query
async function query(sql, params = []) {
    let connection;
    try {
        connection = await getConnection();
        console.log('🟡 Ejecutando SQL...');
        const result = await connection.execute(sql, params);
        return { rows: result.rows || [] };
    } catch (error) {
        console.error('❌ Error en query:', error.message);
        throw error;
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}

// Probar conexión al arrancar
(async () => {
    try {
        const conn = await getConnection();
        await conn.close();
        console.log('✅ Conexión de prueba OK');
    } catch (err) {
        console.error('❌ Error de prueba inicial:', err.message);
    }
})();

module.exports = { query };