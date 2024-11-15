const crearConexion = require("../config/DBconfig");

class Usuario{

    /*constructor(fecha, paciente,motivo){
        fecha=new Date("2024-09-03");
        paciente="Pedro";
        motivo="Dolor de piernas";

    }*/

    static async buscarMedico(idUsuario){
        const connection = await crearConexion();
        const SQL=`SELECT idMedico, dni, nombre, apellido
                    FROM usuario NATURAL JOIN medico NATURAL JOIN persona
                    WHERE idUsuario=?`;
        const [medico] = await connection.query(SQL, idUsuario);
        connection.end();
        return medico;
    }

    static async listarAgendas(idUsuario){
        const connection = await crearConexion();
        const SQL=`SELECT idAgenda, idEspecialidad, descEspecialidad
                    FROM usuario NATURAL JOIN medico NATURAL JOIN espmedico NATURAL JOIN especialidad NATURAL JOIN agenda
                    WHERE idUsuario=?`;
        const [agendas] = await connection.query(SQL, idUsuario);
        connection.end();
        return agendas;
    }
    
}
module.exports = Usuario;