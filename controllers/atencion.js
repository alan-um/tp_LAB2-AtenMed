const Atencion = require("../models/atencion");
const Turno = require("../models/turno");
const Antecedentes = require("../models/antecedentes");
const Alergias = require("../models/alergias");
const Habitos = require("../models/habitos");
const Medicamentos = require("../models/medicamentos");
const Paciente = require("../models/paciente");

class AtencionController {

    async atender(req, res) {
        const idTurno = req.params.idTurno;

        const turno = await Turno.buscarPorId(idTurno);
        //const turno = await Turno.buscarPorAtencion(idAtencion);
        //const turno = await Turno.buscarPorId(idTurno);
        console.log(turno);


        //CARGA HCE
        const atPrevias = await Atencion.listarAtPrevias(turno.idPaciente);
        //console.log(atPrevias);

        const alergias = await Alergias.listar(turno.idPaciente);
        //console.log(alergias);

        const antecedentes = await Antecedentes.listar(turno.idPaciente);
        //console.log(antecedentes);

        const habitos = await Habitos.listar(turno.idPaciente);
        //console.log(habitos);

        const medicamentos = await Medicamentos.listar(turno.idPaciente);
        //console.log(medicamentos);

        //Datos de Nomenclador
        const nombresAlergias = await Alergias.nomenclador();
        const importanciasAlergias = await Alergias.listarImportancias();

        res.render("../views/atencion/index", { turno, atPrevias, alergias, antecedentes, habitos, medicamentos, nombresAlergias, importanciasAlergias });
    }

    async verHCE(req, res) {
        const idPaciente = req.params.idPaciente;
        const idMedico = req.query.medico;
        

        const [paciente] = await Paciente.buscarPorId(idPaciente);
        //const turno = await Turno.buscarPorAtencion(idAtencion);
        //const turno = await Turno.buscarPorId(idTurno);
        console.log(paciente);


        //CARGA HCE
        const atPrevias = await Atencion.listarAtPrevias(idPaciente);
        //console.log(atPrevias);

        const alergias = await Alergias.listar(idPaciente);
        //console.log(alergias);

        const antecedentes = await Antecedentes.listar(idPaciente);
        //console.log(antecedentes);

        const habitos = await Habitos.listar(idPaciente);
        //console.log(habitos);

        const medicamentos = await Medicamentos.listar(idPaciente);
        //console.log(medicamentos);

        //Datos de Nomenclador
        const nombresAlergias = await Alergias.nomenclador();
        const importanciasAlergias = await Alergias.listarImportancias();

        res.render("../views/atencion/HCE", { idMedico, paciente, atPrevias, alergias, antecedentes, habitos, medicamentos, nombresAlergias, importanciasAlergias });
    }
    //Atender con una sola connection
    /* async atender(req, res) {
        const connection = await crearConexion();
        const idTurno = req.params.idTurno;

        const SQLturno = Turno.buscarPorId(idTurno);
        const [[turno]] = await connection.query(SQLturno, idTurno);
        
        //const turno = await Turno.buscarPorAtencion(idAtencion);
        //const turno = await Turno.buscarPorId(idTurno);
        console.log(turno);


        //CARGA HCE
        const atPrevias = {}//await Atencion.listarAtPrevias(turno.idPaciente);
        //console.log(atPrevias);

        const alergias = {}//await Atencion.listarAlergias(turno.idPaciente);
        //console.log(alergias);

        const antecedentes = {}//await Antecedentes.listarAntecedentes(turno.idPaciente);
        //console.log(antecedentes);

        const habitos = {}//await Atencion.listarHabitos(turno.idPaciente);
        //console.log(habitos);

        const medicamentos ={}//await Atencion.listarMedicamentos(turno.idPaciente);
        //console.log(medicamentos);

        //Datos de Nomenclador
        const nombresAlergias = await Alergias.nomenclador();
        const importanciasAlergias = await Alergias.listarImportancias();

        res.render("../views/atencion/index", { turno, atPrevias, alergias, antecedentes, habitos, medicamentos, nombresAlergias, importanciasAlergias});
    } */

    async cargarAtencion(req, res) {
        console.log(req.body)
        const data = {};
        data.estado = false;

        if (req.body.evolucion && req.body.diagnostico.descDiagnostico) {
            //Crea atencion!
            const idAtencion = await Atencion.generar(req.body.idTurno);
            //Carga evolucion
            await Atencion.cargarEvolucion(req.body.evolucion, idAtencion);
            //Carga diagnostico
            await Atencion.cargarDiagnostico(req.body.diagnostico, idAtencion);
            //Actualiza estado de TURNO
            await Turno.cambiarEstado(req.body.idTurno)
        } else {
            console.log("error!!")
            data.estado = false;
        }


        if (req.body.alergias.length > 0) {
            await Alergias.cargar(req.body.alergias, req.body.idTurno);
        }

        if (req.body.antecedentes.length>0) {
            await Antecedentes.cargar(req.body.antecedentes, req.body.idTurno);
        }

        if (req.body.habitos.length>0) {
            await Habitos.cargar(req.body.habitos, req.body.idTurno);
        }

        if (req.body.medicamentos.length>0) {
            await Medicamentos.cargar(req.body.medicamentos, req.body.idTurno);
        }

        res.send(data);
    }



    async agregarDiagnostico(req, res) {
        const descDiagnostico = req.body.descDiagnostico;
        const tipoDiagnostico = req.body.tipoDiagnostico;

        if (Atencion.crearDiagnostico(descDiagnostico, tipoDiagnostico)) {
            res.redirect("../../atenciones/turno/1");
        }
    }

    async agregarAntecedente(req, res) {
        //console.log("mostrando body:")
        //console.log(req.body)
        try {
            let fechaHasta = null;
            if (req.body.fechaHasta) { fechaHasta = new Date(req.body.fechaHasta + "T00:00:00") }

            const antecedente = {
                descAntecedente: `${req.body.descAntecedente} de la DB`,
                fechaDesde: new Date(req.body.fechaDesde + "T00:00:00"),
                fechaHasta
            }
            const antecedentes = []
            antecedentes.push(antecedente)
            console.log("mostrando antecedentes:")
            console.log(antecedentes);

            const result = await Antecedentes.crear(antecedente.descAntecedente, antecedente.fechaDesde, antecedente.fechaHasta, 9);
            console.log(result)//.affectedRows);
            //console.log(result.insertId);
            if (result.affectedRows > 0) res.send(antecedente);
        } catch {
            res.end();
        }
    }

    /*  async agregarDiagnostico(req,res){
         const descDiagnostico = req.body.descDiagnostico;
         const tipoDiagnostico = req.body.tipoDiagnostico;
         console.log(req);
         /* if(Atencion.crearDiagnostico(descDiagnostico,tipoDiagnostico)){
             res.redirect("../../atenciones/turno/1");
         }
     } */

    /* async agregarDiagnostico2(req,res){
        const descDiagnostico = req.body.descDiagnostico;
        const tipoDiagnostico = req.body.tipoDiagnostico;

        if(Atencion.crearDiagnostico(descDiagnostico,tipoDiagnostico)){
            res.redirect("../../atenciones/turno/1");
        }
    } */
}

module.exports = new AtencionController;