const Atencion = require("../models/atencion");
const Turno = require("../models/turno");
const Antecedentes = require("../models/antecedentes");
const Usuario = require("../models/usuario");

class UsuarioController {

    async index(req, res) {
        const HOY = `${new Date(Date.now()).getFullYear()}-${new Date(Date.now()).getMonth()+1}-${new Date(Date.now()).getDate()}`;

        const idUsuario = req.params.idUsuario;
        let idAgendaSelec = req.query.idAgenda;
        let  fechaSelec = req.query.fecha;
        if(!fechaSelec) fechaSelec = HOY;

        console.log(idUsuario)
        console.log(idAgendaSelec)
        console.log(fechaSelec)

        const [medico] = await Usuario.buscarMedico(idUsuario);
        console.log(medico)
        console.log(medico.nombre)

        const agendas = await Usuario.listarAgendas(idUsuario);
        if (!idAgendaSelec) idAgendaSelec=agendas[0].idAgenda;
        console.log(agendas)
        console.log(idAgendaSelec)

        const turnos = await Turno.listar(idAgendaSelec,fechaSelec);
        console.log(turnos);

        res.render("../views/usuario/index", { idUsuario,idAgendaSelec, fechaSelec, HOY, medico, agendas, turnos});
        //res.end();
    }

}

module.exports = new UsuarioController;