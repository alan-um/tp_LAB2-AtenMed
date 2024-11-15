const crearConexion = require("../config/DBconfig");

class Medicamentos {

    static async listar(idPaciente) {
        const connection = await crearConexion();
        const SQL = `SELECT
                    idPaciente, idMedico, descMedicamentos
                    FROM turno NATURAL JOIN atencion NATURAL JOIN agenda NATURAL JOIN espmedico
                    NATURAL JOIN medicamentos
                    WHERE idPaciente=?;`;
        const [medicamentos] = await connection.query(SQL, idPaciente);
        connection.end();
        //console.log(medicamentos);
        return medicamentos;
    }

    static async cargar(medicamentos, idAtencion) {
        try {
            const connection = await crearConexion();
            
            let SQL = `INSERT INTO medicamentos(descMedicamentos, idAtencion) VALUES ('${medicamentos[0].descMedicamento}' ,  ${idAtencion})`;
            
            if (medicamentos.length > 1) {
                for (let i=1; i < medicamentos.length; i++) {
                    SQL = SQL + `,('${medicamentos[i].descMedicamento}' , ${idAtencion})`
                }
            }

            const [result] = await connection.query(SQL);
            connection.end();
            console.log(result)
            if (result.affectedRows > 0) {
                console.log("Medicamento/s cargado!")
                return result.insertId
            } else {
                return -1
            }
        } catch (e){
            console.log(e)
        }

    }

}
module.exports = Medicamentos;