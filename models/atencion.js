const crearConexion = require("../config/DBconfig");

class Atencion {

    /*constructor(fecha, paciente,motivo){
        fecha=new Date("2024-09-03");
        paciente="Pedro";
        motivo="Dolor de piernas";

    }*/

    static async generar(idTurno) {
        const fechaInicio = new Date(Date.now());
        const fechaFin = fechaInicio;
        console.log(fechaInicio)

        try {
            const connection = await crearConexion();
            const SQL = `INSERT INTO atencion(fechaInicio, fechaFin, idTurno)
                            VALUES (?,?,?)`;
            const [result] = await connection.query(SQL, [fechaInicio, fechaFin, idTurno]);
            connection.end();
            console.log(result)
            if (result.affectedRows > 0) {
                console.log("Atencion creada!")
                return result.insertId
            } else {
                return -1
            }
        } catch (e) {
            console.log(e)
        }

    }








    static async listarAtPrevias(idPaciente) {
        const connection = await crearConexion();
        const SQL = `SELECT
                        idPaciente, idMedico, fechaInicio, motivo, descEvolucion, descDiagnostico, tipo 
                    FROM turno NATURAL JOIN atencion NATURAL JOIN evolucion NATURAL JOIN diagnostico
                    NATURAL JOIN agenda NATURAL JOIN espmedico
                    WHERE idPaciente=?
                    ORDER BY atencion.fechaInicio DESC`;
        const [atPrevias] = await connection.query(SQL, idPaciente);
        connection.end();
        //console.log(atPrevias);
        return atPrevias;
    }

    /* static async listarAntecedentes(idPaciente){
        const connection = await crearConexion();
        const SQL=`SELECT 
                    idPaciente, idMedico, descAntecedentes, fechaDesde, fechaHasta
                    FROM turno NATURAL JOIN atencion NATURAL JOIN agenda NATURAL JOIN espmedico
                    NATURAL JOIN antecedentes
                    WHERE idPaciente=?;`;
        //const antecedentes =[];
        const [antecedentes] = await connection.query(SQL, idPaciente);
        console.log(antecedentes);
        return antecedentes;
    } */

    /* static async listarHabitos(idPaciente) {
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
    } */

    /* static async listarMedicamentos(idPaciente) {
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
    } */

    static async cargarEvolucion(descEvolucion, idAtencion) {
        try {
            const connection = await crearConexion();
            const SQL = `INSERT INTO evolucion(descEvolucion, idAtencion)
                        VALUES (?,?)`;
            const [result] = await connection.query(SQL, [descEvolucion, idAtencion]);
            connection.end();
            console.log(result)
            if (result.affectedRows > 0) {
                console.log("Evolución cargada!")
                return result.insertId
            } else {
                return -1
            }
        } catch (e) {
            console.log(e)
        }
    }


    static async cargarDiagnostico(diagnostico, idAtencion) {
        try {
            const connection = await crearConexion();
            const SQL = `INSERT INTO diagnostico(descDiagnostico, tipo, idAtencion)
                    VALUES (?,?,?)`;
            const [result] = await connection.query(SQL, [diagnostico.descDiagnostico, diagnostico.tipoDiagnostico, idAtencion]);
            connection.end();
            console.log(result)
            if (result.affectedRows > 0) {
                console.log("Diagnostico cargado!")
                return result.insertId
            } else {
                return -1
            }
        } catch (e) {
            console.log(e)
        }
    }

}
module.exports = Atencion;