const crearConexion = require("../config/DBconfig");

class Habitos {

    static async listar(idPaciente) {
        const connection = await crearConexion();
        const SQL = `SELECT 
                    idPaciente, idMedico, descHabitos, fechaDesde, fechaHasta
                    FROM turno NATURAL JOIN atencion NATURAL JOIN agenda NATURAL JOIN espmedico
                    NATURAL JOIN habitos
                    WHERE idPaciente=?;`;
        const [habitos] = await connection.query(SQL, idPaciente);
        connection.end();
        //console.log(habitos);
        return habitos;
    }

    static async cargar(habitos, idAtencion) {
        try {
            const connection = await crearConexion();
            let fechaHasta;
            if(habitos[0].fechaHasta==null){
                fechaHasta='null';
            }else{
                fechaHasta=`'${new Date(habitos[0].fechaHasta).toISOString().slice(0,10)}'`;
            }
            let SQL = `INSERT INTO habitos(descHabitos, fechaDesde, fechaHasta, idAtencion) VALUES ('${habitos[0].descHabito}' , '${new Date(habitos[0].fechaDesde).toISOString().slice(0,10)}' , ${fechaHasta} , ${idAtencion})`;
            
            if (habitos.length > 1) {
                for (let i=1; i < habitos.length; i++) {
                    if(habitos[i].fechaHasta==null){
                        fechaHasta='null';
                    }else{
                        fechaHasta=`'${new Date(habitos[i].fechaHasta).toISOString().slice(0,10)}'`;
                    }
                    SQL = SQL + `,('${habitos[i].descHabito}' , '${new Date(habitos[i].fechaDesde).toISOString().slice(0,10)}' , ${fechaHasta} , ${idAtencion})`
                }
            }

            const [result] = await connection.query(SQL);
            connection.end();
            console.log(result)
            if (result.affectedRows > 0) {
                console.log("Habito/s cargado!")
                return result.insertId
            } else {
                return -1
            }
        } catch (e){
            console.log(e)
        }

    }

}
module.exports = Habitos;