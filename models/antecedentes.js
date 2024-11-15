const crearConexion = require("../config/DBconfig");

class Antecedente {

    static async listar(idPaciente) {
        const connection = await crearConexion();
        const SQL = `SELECT 
                    idPaciente, idMedico, descAntecedentes, fechaDesde, fechaHasta
                    FROM turno NATURAL JOIN atencion NATURAL JOIN agenda NATURAL JOIN espmedico
                    NATURAL JOIN antecedentes
                    WHERE idPaciente=?;`;
        const [antecedentes] = await connection.query(SQL, idPaciente);
        connection.end();
        console.log(antecedentes);
        return antecedentes;
    }

    static async cargar(antecedentes, idAtencion) {
        try {
            const connection = await crearConexion();
            let fechaHasta;
            if(antecedentes[0].fechaHasta==null){
                fechaHasta='null';
            }else{
                fechaHasta=`'${new Date(antecedentes[0].fechaHasta).toISOString().slice(0,10)}'`;
            }
            let SQL = `INSERT INTO antecedentes(descAntecedentes, fechaDesde, fechaHasta, idAtencion) VALUES ('${antecedentes[0].descAntecedente}' , '${new Date(antecedentes[0].fechaDesde).toISOString().slice(0,10)}' , ${fechaHasta} , ${idAtencion})`;
            
            if (antecedentes.length > 1) {
                for (let i=1; i < antecedentes.length; i++) {
                    if(antecedentes[i].fechaHasta==null){
                        fechaHasta='null';
                    }else{
                        fechaHasta=`'${new Date(antecedentes[i].fechaHasta).toISOString().slice(0,10)}'`;
                    }
                    SQL = SQL + `,('${antecedentes[i].descAntecedente}' , '${new Date(antecedentes[i].fechaDesde).toISOString().slice(0,10)}' , ${fechaHasta} , ${idAtencion})`
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

}
module.exports = Antecedente;