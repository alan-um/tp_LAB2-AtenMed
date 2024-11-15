const pug = require("pug");
const express = require("express");
const app = express();
const atencionRouter=require("./routes/atencion");
const loginRouter=require("./routes/login");
const agendaRouter=require("./routes/agenda");
const usuarioRouter=require("./routes/usuario");

//Configuración de PUG
app.set("view engine","pug");
app.set("views","./views");

//Declaración para servir los archivos publicos
app.use("/public",express.static("public"));
//app.use(express.urlencoded());
app.use(express.json());

//Declaración de ROUTES
//app.use("/",loginRouter);
app.use("/usuario",usuarioRouter);
app.use("/atenciones",atencionRouter);

//GET a index
app.get("/",(req,res)=>res.redirect("/usuario/1"))

//Habilitar el PUERTO 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});