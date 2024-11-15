const express=require("express");
const atencionRouter=express.Router();
const atencionController=require("../controllers/atencion");
const pug = require("pug");


//Recibe turno pendiente y genera la atención!!
atencionRouter.get("/atender/:idTurno",atencionController.atender);
atencionRouter.get("/verHCE/:idPaciente",atencionController.verHCE);
atencionRouter.post("/cargarAtencion",atencionController.cargarAtencion);



atencionRouter.post("/diagnostico",atencionController.agregarDiagnostico);
atencionRouter.post("/nuevoAntecedente",atencionController.agregarAntecedente);

module.exports=atencionRouter;