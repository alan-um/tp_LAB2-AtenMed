const Agenda = require("../models/agenda");
//const Turno = require("../models/turno");

class AtencionController{

    async index(req,res){
        const HOY = `${new Date(Date.now()).getFullYear()}-${new Date(Date.now()).getMonth()+1}-${new Date(Date.now()).getDate()}`;

        const  idAgenda = req.params.idAgenda;
        let  fecha = req.query.fecha;
        if(!fecha) fecha = HOY;
        
        const agendas =[1,2,3];

        const turnos = await Agenda.listarTurnos(idAgenda,fecha);
        //console.log(turnos);

        res.render("../views/agenda/index",{idAgenda,fecha,agendas,turnos});
    }
}

module.exports= new AtencionController;