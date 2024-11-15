const crearConexion = require("../config/DBconfig");

class Alergias {
    static async listar(idPaciente) {
        const connection = await crearConexion();
        const SQL = `SELECT 
                    idPaciente, idMedico, descNombreAlergia, descImportancia, fechaDesde, fechaHasta 
                    FROM turno NATURAL JOIN atencion NATURAL JOIN agenda NATURAL JOIN espmedico
                    NATURAL JOIN alergias NATURAL JOIN nomencladoralergias NATURAL JOIN importanciaalergias
                    WHERE idPaciente=?;`;
        const [alergias] = await connection.query(SQL, idPaciente);
        connection.end();
        //console.log(alergias);
        return alergias;
    }

    static async cargar(alergias, idAtencion) {
        try {
            const connection = await crearConexion();
            let fechaHasta;
            if(alergias[0].fechaHasta==null){
                fechaHasta='null';
            }else{
                fechaHasta=`'${new Date(alergias[0].fechaHasta).toISOString().slice(0,10)}'`;
            }
            let SQL = `INSERT INTO alergias(idNombreAlergia, idImportancia, fechaDesde, fechaHasta, idAtencion) VALUES (${alergias[0].idNombreAlergia} , ${alergias[0].idImportancia} , '${new Date(alergias[0].fechaDesde).toISOString().slice(0,10)}' , ${fechaHasta} , ${idAtencion})`;
            
            if (alergias.length > 1) {
                for (let i=1; i < alergias.length; i++) {
                    if(alergias[i].fechaHasta==null){
                        fechaHasta='null';
                    }else{
                        fechaHasta=`'${new Date(alergias[i].fechaHasta).toISOString().slice(0,10)}'`;
                    }
                    SQL = SQL + `,(${alergias[i].idNombreAlergia} , ${alergias[i].idImportancia} , '${new Date(alergias[i].fechaDesde).toISOString().slice(0,10)}' , ${fechaHasta} , ${idAtencion})`
                }
            }

            const [result] = await connection.query(SQL);
            connection.end();
            console.log(result)
            if (result.affectedRows > 0) {
                console.log("Antecedente/s cargado!")
                return result.insertId
            } else {
                return -1
            }
        } catch (e){
            console.log(e)
        }

    }

    static async nomenclador() {
        const connection = await crearConexion();
        const SQL = `SELECT * FROM nomencladoralergias`;
        const [nombresAlergias] = await connection.query(SQL,);
        connection.end();
        //console.log(turnos);
        return nombresAlergias;
    }

    static async listarImportancias() {
        const connection = await crearConexion();
        const SQL = `SELECT * FROM importanciaalergias`;
        const [importanciasAlergias] = await connection.query(SQL,);
        connection.end();
        //console.log(turnos);
        return importanciasAlergias;
    }
}
module.exports = Alergias;