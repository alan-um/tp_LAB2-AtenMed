//funciones del Rich Text Editor---------------------------------------------
const quill = new Quill("#editor", {
    theme: "snow",
});
let texto, formato;
//------------------------------------------------------------------------------

mostrarOcultar("AtPrevias")
mostrarOcultar("Alergias")
mostrarOcultar("Antecedentes")
mostrarOcultar("Habitos")
mostrarOcultar("Medicamentos")

function mostrarOcultar(contenido) {
    const s = document.getElementById(`span${contenido}`);
    const e = document.getElementById(`cont${contenido}`);
    if (e.classList.contains("ocultar")) {
        s.innerHTML = "&#9650";
        e.classList.remove("ocultar");
    } else {
        s.innerHTML = "&#9660";
        e.classList.add("ocultar");
    }
}
//------------------------------------------------------------------
//Funciones para agregar diagnósticos, antecedentes, hábitos, etc.
const HCE = {
    idTurno: document.getElementById("idTurno").innerHTML,
    evolucion: '',
    diagnostico: {},
    alergias: [],
    antecedentes: [],
    habitos: [],
    medicamentos: []
};
console.log(HCE);


//----------------Captura evolucion-----------------------
quill.on('text-change', (delta, oldDelta, source) => {
    HCE.evolucion = quill.getText().trim();
    console.log(HCE.evolucion);
  });


//---------------------Agrega diagnostico----------------
function agregarDiagnostico() {
    document.getElementById("formDiagnostico").noValidate = true;

    //Get datos del form
    if(document.getElementById("descDiagnostico").value.trim()){
        HCE.diagnostico.descDiagnostico = document.getElementById("descDiagnostico").value.trim();
        HCE.diagnostico.tipoDiagnostico = document.getElementById("tipoDiagnostico").value;
        return true;
    }else{
        return false;
    }
}

//---------------Funciones de agregar/borrar ALERGIAS-----------------------------
let indexAlergias = 0;
function agregarAlergias() {
    document.getElementById("formAlergias").noValidate = true;
    const alergia = {};
    let fechaHasta = "-----";
    //Tomar los datos del form
    const idNombreAlergia = document.getElementById("descAlergia").value.trim();
    const descNombreAlergia = document.getElementById("descAlergia").options[idNombreAlergia].text;
    const idImportancia = document.getElementById("importanciaAlergia").value.trim();
    const descImportancia = document.getElementById("importanciaAlergia").options[idImportancia].text;
    let fechaDesde = document.getElementById("fechaDesdeAler").value;
    if (document.getElementById("fechaHastaAler").value) {
        fechaHasta = document.getElementById("fechaHastaAler").value;
    }

    //Chequear los datos y cargarlos a HCE
    if (descNombreAlergia && descImportancia && fechaDesde) {
        //Agregar los datos a la tabla
        let tabla = document.getElementById("nuevasAlergias");
        const cantRow = tabla.getElementsByTagName('tr').length;
        let row = tabla.insertRow(cantRow)
        row.setAttribute("id", `alergia${indexAlergias}`);
        row.innerHTML = `
                <td class=${idNombreAlergia}>${descNombreAlergia}</td>
                <td class=${idImportancia}>${descImportancia}</td>
                <td>${fechaDesde}</td>
                <td>${fechaHasta}</td>
                <td style="border:none">
                    <button class="btn-accion" onclick="borrarAlergia(${indexAlergias})">Borrar</button></td>`;

        //Borrar los elementos del form
        indexAlergias++;
        document.getElementById("descAlergia").value = "";
        document.getElementById("importanciaAlergia").value = "";
        document.getElementById("fechaDesdeAler").value = "";
        document.getElementById("fechaHastaAler").value = "";
    }
    return false;
}

function borrarAlergia(index) {
    //Eliminar los datos de la tabla
    document.getElementById(`alergia${index}`).remove();
}

function cargarNuevasAlergias() {
    const tablaAlergias = document.getElementById("nuevasAlergias");
    //const antecedentes=[]
    for (let i = 0, row; row = tablaAlergias.rows[i]; i++) {
        //alert(cell[i].innerText);
        const alergia = {};
        alergia.idNombreAlergia = Number(row.cells[0].className);
        alergia.descNombreAlergia = row.cells[0].innerHTML;
        alergia.idImportancia = Number(row.cells[1].className);
        alergia.descImportancia = row.cells[1].innerHTML;
        alergia.fechaDesde = new Date(row.cells[2].innerHTML + "T00:00:00").toISOString();
        if (row.cells[3].innerHTML == "-----") {
            alergia.fechaHasta = null;
        } else {
            alergia.fechaHasta = new Date(row.cells[2].innerHTML + "T00:00:00").toISOString();
        }
        HCE.alergias.push(alergia)
    }
    //console.log(HCE);
}
//----------------------------------------------------------------------------------------------------

//---------------Funciones de agregar/borrar ANTECEDENTES-----------------------------
let indexAntecedentes = 0;
function agregarAntecedente() {
    document.getElementById("formAntecedentes").noValidate = true;
    const antecedente = {};
    let fechaHasta = "-----";
    //Tomar los datos del form
    const descAntecedente = document.getElementById("descAntecedentes").value.trim();
    let fechaDesde = document.getElementById("fechaDesdeAnt").value;
    if (document.getElementById("fechaHastaAnt").value) {
        fechaHasta = document.getElementById("fechaHastaAnt").value;
    }

    //Chequear los datos y cargarlos a HCE
    if (descAntecedente && fechaDesde) {
        //Agregar los datos a la tabla
        let tabla = document.getElementById("nuevosAntecedentes");
        const cantRow = tabla.getElementsByTagName('tr').length;
        let row = tabla.insertRow(cantRow)
        row.setAttribute("id", `antecedente${indexAntecedentes}`);
        row.innerHTML = `
                <td>${descAntecedente}</td>
                <td>${fechaDesde}</td>
                <td>${fechaHasta}</td>
                <td style="border:none">
                    <button class="btn-accion" onclick="borrarAntecedente(${indexAntecedentes})">Borrar</button></td>`;

        //Borrar los elementos del form
        indexAntecedentes++;
        document.getElementById("descAntecedentes").value = "";
        document.getElementById("fechaDesdeAnt").value = "";
        document.getElementById("fechaHastaAnt").value = "";
    }
    return false;
}

function borrarAntecedente(index) {
    //Eliminar los datos de la tabla
    document.getElementById(`antecedente${index}`).remove();
}

function cargarNuevosAntecedentes() {
    const tablaAntecedentes = document.getElementById("nuevosAntecedentes");
    //const antecedentes=[]
    for (let i = 0, row; row = tablaAntecedentes.rows[i]; i++) {
        //alert(cell[i].innerText);
        const antecedente = {};
        antecedente.descAntecedente = row.cells[0].innerHTML;
        antecedente.fechaDesde = new Date(row.cells[1].innerHTML + "T00:00:00").toISOString();
        if (row.cells[2].innerHTML == "-----") {
            antecedente.fechaHasta = null;
        } else {
            antecedente.fechaHasta = new Date(row.cells[2].innerHTML + "T00:00:00").toISOString();
        }
        HCE.antecedentes.push(antecedente)
    }
    //console.log(HCE);
}
//----------------------------------------------------------------------------------------------------
//---------------Funciones de agregar/borrar HABITOS-----------------------------
let indexHabitos = 0;
function agregarHabito() {
    document.getElementById("formHabitos").noValidate = true;
    const habito = {};
    let fechaHasta = "-----";
    //Tomar los datos del form
    const descHabito = document.getElementById("descHabitos").value.trim();
    let fechaDesde = document.getElementById("fechaDesdeHab").value;
    if (document.getElementById("fechaHastaHab").value) {
        fechaHasta = document.getElementById("fechaHastaHab").value;
    }

    //Chequear los datos y cargarlos a HCE
    if (descHabito && fechaDesde) {
        //Agregar los datos a la tabla
        let tabla = document.getElementById("nuevosHabitos");
        const cantRow = tabla.getElementsByTagName('tr').length;
        let row = tabla.insertRow(cantRow)
        row.setAttribute("id", `habito${indexHabitos}`);
        row.innerHTML = `
                <td>${descHabito}</td>
                <td>${fechaDesde}</td>
                <td>${fechaHasta}</td>
                <td style="border:none">
                    <button class="btn-accion" onclick="borrarHabito(${indexHabitos})">Borrar</button></td>`;

        //Borrar los elementos del form
        indexHabitos++;
        document.getElementById("descHabitos").value = "";
        document.getElementById("fechaDesdeHab").value = "";
        document.getElementById("fechaHastaHab").value = "";
    }
    return false;
}

function borrarHabito(index) {
    //Eliminar los datos de la tabla
    document.getElementById(`habito${index}`).remove();
}

function cargarNuevosHabitos() {
    const tablaHabitos = document.getElementById("nuevosHabitos");
    //const antecedentes=[]
    for (let i = 0, row; row = tablaHabitos.rows[i]; i++) {
        //alert(cell[i].innerText);
        const habito = {};
        habito.descHabito = row.cells[0].innerHTML;
        habito.fechaDesde = new Date(row.cells[1].innerHTML + "T00:00:00").toISOString();
        if (row.cells[2].innerHTML == "-----") {
            habito.fechaHasta = null;
        } else {
            habito.fechaHasta = new Date(row.cells[2].innerHTML + "T00:00:00").toISOString();
        }
        HCE.habitos.push(habito)
    }
    //console.log(HCE);
}
//----------------------------------------------------------------------------------------------------
//---------------Funciones de agregar/borrar MEDICAMENTOS-----------------------------
let indexMedicamentos = 0;
function agregarMedicamento() {
    document.getElementById("formMedicamentos").noValidate = true;
    //Tomar los datos del form
    const descMedicamento = document.getElementById("descMedicamentos").value.trim();

    //Chequear los datos y cargarlos a HCE
    if (descMedicamento) {
        //Agregar los datos a la tabla
        let tabla = document.getElementById("nuevosMedicamentos");
        const cantRow = tabla.getElementsByTagName('tr').length;
        let row = tabla.insertRow(cantRow)
        row.setAttribute("id", `medicamento${indexMedicamentos}`);
        row.innerHTML = `
                <td>${descMedicamento}</td>
                <td style="border:none">
                    <button class="btn-accion" onclick="borrarMedicamento(${indexMedicamentos})">Borrar</button></td>`;

        //Borrar los elementos del form
        indexMedicamentos++;
        document.getElementById("descMedicamentos").value = "";
    }
    return false;
}

function borrarMedicamento(index) {
    //Eliminar los datos de la tabla
    document.getElementById(`medicamento${index}`).remove();
}

function cargarNuevosMedicamentos() {
    const tablaMedicamentos = document.getElementById("nuevosMedicamentos");
    //const antecedentes=[]
    for (let i = 0, row; row = tablaMedicamentos.rows[i]; i++) {
        //alert(cell[i].innerText);
        const medicamento = {};
        medicamento.descMedicamento = row.cells[0].innerHTML;
        console.log(medicamento)
        HCE.medicamentos.push(medicamento)
    }
    //console.log(HCE);
}
//----------------------------------------------------------------------------------------------------



function guardarDatos() {
    //Valida  y carga evolucion
    if(!HCE.evolucion){
        alert("Debe ingresar la evolucion del paciente!");
        return;
    }
    //Valida  y carga diagnostico
    if(!agregarDiagnostico()){
        alert("Debe ingresar el diagnóstico del paciente!");
        return;
    }
    //Valida y carga alergias
    cargarNuevasAlergias();
    //Valida y carga antecedentes
    cargarNuevosAntecedentes();
    //Valida y carga habitos
    cargarNuevosHabitos();
    //Valida y carga medicamentos
    cargarNuevosMedicamentos();

    //Arma el paquete para enviar por POST
    const URL = "../cargarAtencion";
    return fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},//'application/x-www-form-urlencoded;charset=UTF-8' },
        //credentials: 'include',
        body: JSON.stringify(HCE)
    })
        .then(result => result.json())
        .then(data => {
            //Esperamos que la API envíe un JSON con errores, sino lo hace cartelito de confirmación y listo.
            if (data.estado) {
                alert("Se ha cargado todo de diez");
                document.getElementById("formCerrar").submit();
            } else {
                alert("Rayos!!!");
            }
        })
}

function confirmaSalir() {
    if (window.confirm("¿Está seguro que desea salir?\nSe perderán los datos que no haya guardado.")) {
        document.getElementById("formCerrar").submit();
    }
    return false;
}
