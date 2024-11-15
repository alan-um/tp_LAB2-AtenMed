const express=require("express");
const loginRouter=express.Router();
const loginController=require("../controllers/login");

//loginRouter.use("/?",loginController.validarUsserPass);
/*,function(req,res,next){
    console.log("Usando MIDLE");  
    next();
})*/

//En desarrollo para final
/* loginRouter.get("/validar",loginController.validarUsserPass/*(req,res)=>{
    console.log("Paso validar");
    res.send(req);
});
loginRouter.get("/",loginController.index); */

module.exports=loginRouter;