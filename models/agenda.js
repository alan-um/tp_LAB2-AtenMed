const crearConexion = require("../config/DBconfig");

class Agenda{

    /*constructor(fecha, paciente,motivo){
        fecha=new Date("2024-09-03");
        paciente="Pedro";
        motivo="Dolor de piernas";

    }*/

    static async listarTurnos(idAgenda,fecha){
        const connection = await crearConexion();
        
        //Revisar\/
        const SQL=`SELECT
                    idAgenda, idTurno, fecha, horario, nombre, apellido, motivo 
                    FROM turno NATURAL JOIN paciente NATURAL JOIN persona
                    WHERE idAgenda=? AND fecha LIKE ?;`;
        const [turnos] = await connection.query(SQL, [idAgenda,fecha/*'2023-05-13'*/]);
        //console.log(turnos);
        return turnos;
    }    
}
module.exports = Agenda;