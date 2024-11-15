const express=require("express");
const agendaRouter=express.Router();
const agendaController=require("../controllers/agenda");

//agendaRouter.get("/:idAgenda",agendaController.index);

agendaRouter.get("/:idAgenda",agendaController.index);

module.exports=agendaRouter;