const mysql = require("mysql2/promise");

const crearConexion = async () => {
    const connection = await mysql.createConnection({
        //DB Local
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'atenmedica1',
        port: 3306,
        multipleStatements: true

        //DB CC
        /* host: 'bdk3g5vaeedryozkkdd7-mysql.services.clever-cloud.com',
        user: 'uy7r6mevogm0fiys',
        password: 'Xxe3MqxR1x4FGeb7TODP',
        database: 'bdk3g5vaeedryozkkdd7',
        port: 3306 */
    });
    return connection;
}
module.exports = crearConexion;