const crearConexion = require("../config/DBconfig");

class Turno {
    static async listar(idAgenda, fecha) {
        const connection = await crearConexion();
        const SQL = `SELECT idAgenda, t.idTurno, fecha, horario, idPaciente, nombre, apellido, dni, motivo, estado, idAtencion
                    FROM turno t NATURAL JOIN paciente NATURAL JOIN persona
                    LEFT OUTER JOIN atencion a ON (t.idTurno=a.idTurno)
                    WHERE idAgenda=? AND fecha LIKE ?;`;
        const [turnos] = await connection.query(SQL, [idAgenda, fecha/*'2023-05-13'*/]);
        connection.end();
        //console.log(turnos);
        return turnos;
    }

    //Esta OK!!
    static async buscarPorId(id) {
        const connection = await crearConexion();

        const SQLturno = `SELECT
                        idTurno, fecha, horario, idAgenda, motivo, estado, 
                        idPaciente, dni dniPaciente, nombre nombrePaciente, apellido apellidoPaciente
                        FROM turno NATURAL JOIN paciente NATURAL JOIN persona
                        WHERE idTurno=?;`;
        //return SQLturno;
        const [turno] = await connection.query(SQLturno, id);

        const SQLmedico = `SELECT
                            idTurno, idAgenda,
                            idMedico, nombre nombreMedico, apellido apellidoMedico, idEspecialidad
                            FROM turno NATURAL JOIN agenda NATURAL JOIN espmedico NATURAL JOIN medico NATURAL JOIN persona
                        WHERE idTurno=?;`;
        const [medico] = await connection.query(SQLmedico, id);
        connection.end();
        //console.log(turno);
        //console.log(medico);
        turno[0].idMedico = medico[0].idMedico;
        turno[0].idEspecialidad = medico[0].idEspecialidad;
        turno[0].nombreMedico = medico[0].nombreMedico;
        turno[0].apellidoMedico = medico[0].apellidoMedico;
        //console.log(turno);
        return turno[0];
    }

    static async buscarPorAtencion(idAtencion) {
        const connection = await crearConexion();

        const SQLturno = `SELECT
                            idTurno, fecha, horario, idAgenda, motivo, estado, idAtencion,
                            idPaciente, dni dniPaciente, nombre nombrePaciente, apellido apellidoPaciente
                            FROM turno NATURAL JOIN paciente NATURAL JOIN persona NATURAL JOIN atencion
                            WHERE idAtencion=?;`;
        const [turno] = await connection.query(SQLturno, idAtencion);

        const SQLmedico = `SELECT
                                idTurno, idAgenda,
                                idMedico, nombre nombreMedico, apellido apellidoMedico, idEspecialidad
                                FROM turno NATURAL JOIN agenda NATURAL JOIN espmedico NATURAL JOIN medico NATURAL JOIN persona
                            WHERE idTurno=?;`;
        const [medico] = await connection.query(SQLmedico, turno[0].idTurno);
        connection.end();

        console.log(turno);
        //console.log(medico);
        turno[0].idMedico = medico[0].idMedico;
        turno[0].idEspecialidad = medico[0].idEspecialidad;
        turno[0].nombreMedico = medico[0].nombreMedico;
        turno[0].apellidoMedico = medico[0].apellidoMedico;
        //console.log(turno);
        return turno[0];
    }

    static async cambiarEstado(idTurno){
        const connection = await crearConexion();
        const SQL = `UPDATE turno SET estado='Atendido' WHERE idTurno=?;`;
        const [result] = await connection.query(SQL, [idTurno]);
        connection.end();
        //console.log(turnos);
        if (result.affectedRows>0){
            console.log("Turno actualizado!")
            return true;
        }
    }
}
module.exports = Turno;