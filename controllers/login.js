//const Atencion = require("../models/atencion");
//const Turno = require("../models/turno");
const atencionController = require("../controllers/atencion");


class LoginController {

    index(req, res) {
        res.render("../views/login/index.pug");
    }

    validarUsserPass(req, res,next) {
        const obj = {
            U: req.query.usser,
            P: req.query.pass,
            E: []
        }


        console.log("GET->validar");
        console.log("Usser: " + obj.U);
        console.log("Pass: " + obj.P);

        if (obj.U != "usuario") obj.E.push("Usuario incorrecto");
        if (obj.P != "123") obj.E.push("Password incorrecto");
        if (obj.E.length > 0){
            res.send(obj);
        }else{
            //next();
        }
        
        //res.redirect("../atenciones/turno/1");
        /*const q = {params:{}};
        q.params.idTurno = 1;
        console.log(q);
        atencionController.index(q);*/
        //fetch(`./atenciones/turno/1`)


    }

    /* async index(req,res){
        const  idTurno = req.params.idTurno;

        const turno = await Turno.buscarPorId(idTurno);
        //console.log(turno);

        res.render("../views/atencion/index",{turno, atPrevias, alergias, antecedentes, habitos, medicamentos});
    } */
}

module.exports = new LoginController;