const express=require("express");
const usuarioRouter=express.Router();
const usuarioController=require("../controllers/usuario");

//agendaRouter.get("/:idAgenda",agendaController.index);

usuarioRouter.get("/:idUsuario",usuarioController.index);

module.exports=usuarioRouter;