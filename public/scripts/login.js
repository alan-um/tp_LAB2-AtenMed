function accederAgenda() {
    document.getElementById("formu").noValidate = true;

    const usser = document.getElementById("usser").value;
    const pass = document.getElementById("pass").value;
    //console.log(usser);
    //console.log(pass);
    const URL_Validar = `/validar/?usser=${usser}&pass=${pass}`;
    const URL_Agenda = `/atenciones/turno/1`;
    console.log(URL_Validar);
    fetch(URL_Validar)
        .then((response) => response.json())
        .then((data)=>{
            console.log(data);
            if(data.E.length>0){
                mostrarErrores(data.E);
                return false;
            }else{
                return true;
            }

            //fetch(URL_Agenda)
            //Si no hay errores cargar la página de agendas
        })

    return false;
}

function mostrarErrores(errores){
    console.log("Errores->");
    console.log(errores);
    document.getElementById("passError").innerHTML=errores;

}
