function seleccionarFecha(){
    const fecha = document.getElementById("fecha").value;
    console.log(fecha);
    const formu = document.getElementById("formu");
    formu.submit();
    
}

function seleccionarAgenda(idAgenda){
    console.log(idAgenda);
    document.getElementById("idAgenda").value=idAgenda;
    const formu = document.getElementById("formu");
    //formu.setAttribute("action",`/agenda/${idAgenda}`);
    formu.submit();
}