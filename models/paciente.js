const crearConexion = require("../config/DBconfig");

class Paciente{

    /*constructor(fecha, paciente,motivo){
        fecha=new Date("2024-09-03");
        paciente="Pedro";
        motivo="Dolor de piernas";

    }*/

    static async buscarPorId(idPaciente){
        const connection = await crearConexion();
        
        const SQL=`SELECT 
                    idPaciente, dni, nombre, apellido 
                    FROM paciente NATURAL JOIN persona
                    WHERE idPaciente=?;`;
        const [turnos] = await connection.query(SQL, [idPaciente]);
        //console.log(turnos);
        return turnos;
    }    
}
module.exports = Paciente;