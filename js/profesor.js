var sesion = JSON.parse(sessionStorage.usuario);

if (sesion.tipo != 'profesor')
	location.href = "index.html";

document.querySelector('#sidebar .usuario .nombre').appendChild(document.createTextNode(sesion.nombre));

var btnCerrarSesion = document.querySelector("#btnCerrarSesion");
btnCerrarSesion.addEventListener("click", cerrarSesion, false);

function cargarFormMisDatos()
{
	// Verifico si ya he cargado el formulario antes
	if ($('#frmMisDatos').length == 0)
	{
		$("<div>").appendTo('#capaMisDatos').load("html/misdatos.html", function()
		{
			let form = document.getElementById("frmMisDatos");

			form.nombre.value = sesion.nombre;
			form.apellidos.value = sesion.apellidos;
			form.dni.value = sesion.dni;
			form.password.value = sesion.password;
			form.telefono.value = sesion.telefono;
			form.direccion.value = sesion.direccion;
			form.email.value = sesion.correo;
		});
	}
	else
	{
		$('.alert').remove();
		$('#frmMisDatos').show();
	}
}

function modificarMisDatos()
{
	let form = document.getElementById("frmMisDatos");

	if (validarFormUsuario(form))
	{
		sNombre = form.nombre.value;
		sPassword = form.password.value;
		sApellidos = form.apellidos.value;
		sDni = form.dni.value;
		sTelefono = form.telefono.value;
		sDireccion = form.direccion.value;
		sEmail = form.email.value;
		let oProfesor = new Profesor(sNombre, sPassword, sApellidos, sDni, sTelefono, sDireccion, sEmail, 1, 800);
		academia.modificarUsuario(oProfesor);

		let alert = $('<div class="alert alert-success alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Datos modificados.</div>');
		$('#capaMisDatos').append(alert);
	}
}

var btnAddNota = document.getElementById("btnAddNota");
btnAddNota.addEventListener("click", mostrarFormularioCalificar, false);

var selectCursoConsultar = document.getElementById("selectCursoConsultar");

selectCursoConsultar.addEventListener("click", actualizaSelectConsultar, false);
document.querySelector('#enlaceMisDatos').addEventListener("click", mostrarPagina, false);
document.querySelector('#enlaceAlumnos').addEventListener("click", mostrarPagina, false);
document.querySelector('#enlaceCursos').addEventListener("click", mostrarPagina, false);

document.querySelector('#enlaceCursos').click();

function actualizaSelectConsultar()
{
	var selectCursoConsultar = document.getElementById("selectCursoConsultar");
	var oTabla = consultarNotas(sesion.dni, selectCursoConsultar.value);
	var oFieldset = document.querySelectorAll("div #capaNotas");
	oFieldset[0].appendChild(oTabla);
}

function mostrarPagina(oEvento)
{
	oE = oEvento || window.event;
	var menus = document.querySelectorAll('nav li');
		for (var i=0; i<menus.length; i++)
			menus[i].classList.remove('active');

	if (oE.target.id == "enlaceAlumnos")
	{
		document.getElementById("capaMisDatos").classList.add("ocultar");
		document.getElementById("capaConsultarNotas").classList.remove("ocultar");
		document.getElementById("capaConsultarCursos").classList.add("ocultar");
		document.querySelector('#enlaceAlumnos').parentNode.classList.add('active');
		var oTabla = consultarNotas(sesion.dni, "todo");
		var oFieldset = document.querySelectorAll("div #capaNotas");
		oFieldset[0].appendChild(oTabla);

		var oProfesor = academia.getUsuario(sesion.dni);
		var tCursos = oProfesor.getCursos();
		var oSelec = document.querySelector("#selectCursoConsultar");
		var bEnc = false;

		for (var i=0; i<tCursos.length; i++)
		{
			var oCurso = academia.getCurso(tCursos[i]);
			var oOption = document.createElement("option");
			oOption.text = capitalize(oCurso.idioma)+" "+oCurso.nivel+" "+capitalize(oCurso.tipo);
			oOption.value = oCurso.codigo;
			for (var j=0; j<oSelec.options.length && !bEnc; j++)
				if(oSelec.options[j].value == oOption.value)
					bEnc = true;

			if(!bEnc)
				oSelec.add(oOption);
		}
	}
	else if (oE.target.id == "enlaceMisDatos")
	{
		document.getElementById("capaConsultarNotas").classList.add("ocultar");
		document.getElementById("capaMisDatos").classList.remove("ocultar");
		document.getElementById("capaConsultarCursos").classList.add("ocultar");
		document.querySelector('#enlaceMisDatos').parentNode.classList.add('active');
		cargarFormMisDatos();
	}
	else if (oE.target.id == "enlaceCursos")
	{
		document.getElementById("capaConsultarNotas").classList.add("ocultar");
		document.getElementById("capaMisDatos").classList.add("ocultar");
		document.getElementById("capaConsultarCursos").classList.remove("ocultar");
		document.querySelector('#enlaceCursos').parentNode.classList.add('active');
		var oTabla = consultarCursos(sesion.dni);
		var oFieldset = document.querySelectorAll("div #capaCursos");
		oFieldset[0].appendChild(oTabla);
	}
}

function actualizaSelectCalificar(sDni)
{
	var oAlumno = academia.getUsuario(sDni);
	var oProfesor = academia.getUsuario(sesion.dni);
	var oTablaActu = oAlumno.listaCursos;
	var oTablaActuProf = oProfesor.getCursos();
	var oSelec = document.querySelector("#selectCursoCalificar");
	var bEnc = false;

	for (var i=0; i<oTablaActu.length; i++)
	{
		for (var j = 0; j < oTablaActuProf.length; j++)
		{	
			if(oTablaActu[i]==oTablaActuProf[j])
			{
				var oOption = document.createElement("option");
				var oCurso = academia.getCurso(oTablaActu[i]);
				oOption.text = capitalize(oCurso.idioma)+" "+oCurso.nivel+" "+capitalize(oCurso.tipo);
				oOption.value = oCurso.codigo;
				for (var j=0; j<oSelec.options.length && !bEnc; j++)
					 if(oSelec.options[j].value == oOption.value)
						bEnc = true;

				if(!bEnc)
					oSelec.add(oOption);
			}
		}
	}
}

function actualizaSelectModificar()
{
	document.getElementById("selectAlumnoModificar").remove(0);

	var oSelectCurso = document.getElementById("selectCursoModificar");
	var oSelectAlumno = document.getElementById("selectAlumnoModificar");
	var tAlumnos = academia.getCurso(oSelectCurso.value).listaAlumnos;

	document.getElementById("capaSelectAlumnoModificar").classList.remove("ocultar");
	document.getElementById("CapNotaAluModificar").classList.remove("ocultar");

	var bAluEnc=false;
	for (var i=0; i<tAlumnos.length; i++)
	{
		var oAlumno = academia.getUsuario(tAlumnos[i]);
		var tCalificaciones = oAlumno.listaCalificaciones;

		for (var k=0; k<tCalificaciones.length; k++)
		{
			if(tCalificaciones[k].codCurso == oSelectCurso.value)
			{
				var oOption = document.createElement("option");
				oOption.text = oAlumno.nombre+", "+oAlumno.apellidos;
				oOption.value = oAlumno.dni;
			}
		}

		for (var j=0; j<oSelectAlumno.options.length && !bAluEnc; j++)
			if(oSelectAlumno.options[j].value == oOption.value)
				bAluEnc = true;

		if(!bAluEnc && oOption != null)
			oSelectAlumno.add(oOption);
	}
}

function addCalificacion()
{
	var sCurso = frmAddNotaAlumno.selectCursoCalificar.value;
	var dni = this.getAttribute("data-dni");
	var curso = this.getAttribute("data-curso");
	var sDescripcion = frmAddNotaAlumno.txtDescr.value;
	var fNota = frmAddNotaAlumno.txtNota.value;

	let matriculas = academia.getMatriculas();
	let oMatricula = null
	for (let i=0; i<matriculas.length && oMatricula == null; i++)
		if (matriculas[i].dniAlumno == dni && matriculas[i].curso == sCurso)
			oMatricula = matriculas[i];

	var mensajes = document.querySelectorAll('#frmAddNotaAlumno .text-error');
	for (var i=0; i<mensajes.length; i++)
		mensajes[i].remove();

	var inputs = document.querySelectorAll('#frmAddNotaAlumno .errorFormulario');
	for (var i=0; i<inputs.length; i++)
		inputs[i].classList.remove("errorFormulario");

	if (sDescripcion == "" || fNota == "")
	{
		if (sDescripcion == "") {
			var div = document.createElement("div");
			div.textContent = "Debe introducir el nombre de la tarea";
			div.classList.add("text-error");
			frmAddNotaAlumno.txtDescr.classList.add("errorFormulario");
			frmAddNotaAlumno.txtDescr.parentNode.appendChild(div);
		}

		if (fNota == "") {
			var div = document.createElement("div");
			div.textContent = "Debe introducir una nota de 0 a 10";
			div.classList.add("text-error");
			frmAddNotaAlumno.txtNota.classList.add("errorFormulario");
			frmAddNotaAlumno.txtNota.parentNode.appendChild(div);
		}
	}
	else
	{
		var bEnc = false;
		var oAlumno = academia.getUsuario(dni);
		var oListaNotas = oAlumno.listaCalificaciones;

		for (var i=0; i<oListaNotas.length; i++)
		{
			if(oListaNotas[i].curso == sCurso && oListaNotas[i].tarea == sDescripcion)
				bEnc = true;
		}

		if (bEnc)
		{
			var div = document.createElement("div");
			div.textContent = "Ya existe una tarea con ese nombre y curso";
			div.classList.add("text-danger");
			frmAddNotaAlumno.txtDescr.classList.add("errorFormulario");
			frmAddNotaAlumno.txtDescr.parentNode.appendChild(div);
		}
		else
		{
			academia.addCalificacionesAlu(dni, new Calificacion(oMatricula.numero, sDescripcion, fNota));
			frmAddNotaAlumno.txtDescr.value = "";
			frmAddNotaAlumno.txtNota.value = "";
			ocultarFormularioCalificar();
			actualizarTablaNotas(dni,curso);
			
		}
	}
}

function modificarCalificacion()
{
	var dni = this.getAttribute("data-dni");
	var oAlumno = academia.getUsuario(dni);
	var desc = this.getAttribute("data-desc");
	var nota = this.parentNode.parentNode.querySelector('input[type="number"]');
	var curso = this.getAttribute("data-curso");

	let matriculas = academia.getMatriculas();
	let oMatricula = null
	for (let i=0; i<matriculas.length && oMatricula == null; i++)
	{

		if (matriculas[i].dniAlumno == dni && matriculas[i].curso == curso)
			oMatricula = matriculas[i];
	}

	var mensajes = document.querySelectorAll('#tablaNotasAlumno .text-error');
	for (var i=0; i<mensajes.length; i++)
		mensajes[i].remove();

	var inputs = document.querySelectorAll('#tablaNotasAlumno .errorFormulario');
	for (var i=0; i<inputs.length; i++)
		inputs[i].classList.remove("errorFormulario");

	if (nota.value == "")
	{
		var div = document.createElement("div");
		div.textContent = "Debe introducir una nota de 0 a 10";
		div.classList.add("text-error");
		nota.classList.add("errorFormulario");
		nota.parentNode.appendChild(div);
	}
	else
		academia.modificarCalificacion(oAlumno.dni, new Calificacion(oMatricula.numero, desc, nota.value));

}

function consultarNotas(sDni,SFiltro)
{
	var oProfesor = academia.getUsuario(sDni);
	var oTablaCurProv = oProfesor.getCursos();

	var oTabla = document.querySelector("#tablaListadoAlumnos");
	if (oTabla != null)
		oTabla.remove();

	// Creacion de la tabla 
	oTabla = document.createElement("table");
	oTabla.id = "tablaListadoAlumnos";
	oTabla.classList.add("table");
	oTabla.classList.add("table-hover");

	var oTHead = oTabla.createTHead();
	var oFila = oTHead.insertRow(-1);

	var oTH = document.createElement("th");
	oTH.textContent = "DNI";
	oFila.appendChild(oTH);
	oTH = document.createElement("th");
	oTH.textContent = "Nombre";
	oFila.appendChild(oTH);
	oTH = document.createElement("th");
	oTH.textContent = "Apellidos";
	oFila.appendChild(oTH);
	oTH = document.createElement("th");
	oTH.textContent = "Curso";
	oFila.appendChild(oTH);
	oTH = document.createElement("th");
	oTH.textContent = "Email";
	oFila.appendChild(oTH);
	oTH = document.createElement("th");
	oTH.textContent = "Telefono";
	oFila.appendChild(oTH);
	oTH = document.createElement("th");
	oTH.textContent = "Acciones";
	oFila.appendChild(oTH);

	// Cuerpo de la tabla
	var oTBody = oTabla.createTBody();

	for (var i=0; i<oTablaCurProv.length; i++)
	{
		var oCurso = academia.getCurso(oTablaCurProv[i]);
		if(oCurso.codigo == SFiltro || SFiltro == "todo")
		{
			var oTablaCurAlumProv = oCurso.listaAlumnos;

			for (var j=0; j<oTablaCurAlumProv.length; j++)
			{
				oFila = oTBody.insertRow(-1);

				var oUsuario = academia.getUsuario(oTablaCurAlumProv[j]);
				var oCelda = oFila.insertCell(-1);
				oCelda.textContent = oUsuario.dni;
				oCelda = oFila.insertCell(-1);
				oCelda.textContent = oUsuario.nombre;
				oCelda = oFila.insertCell(-1);
				oCelda.textContent = oUsuario.apellidos;
				oCelda = oFila.insertCell(-1);
				oCelda.textContent = oCurso.codigo;
				oCelda = oFila.insertCell(-1);
				oCelda.textContent = oUsuario.correo;
				oCelda = oFila.insertCell(-1);
				oCelda.textContent = oUsuario.telefono;

				oCelda = oFila.insertCell(-1);
				var btn = document.createElement("input");
				btn.type = "button";
				btn.value = "Ver notas";
				btn.classList.add("btn", "btn-warning", "btn-sm");
				btn.setAttribute("data-toggle", "modal");
				btn.setAttribute("data-target", "#modal");
				btn.setAttribute("data-curso", oCurso.codigo);
				btn.setAttribute("data-dni", oUsuario.dni);
				btn.addEventListener("click", verNotasAlumno);
				oCelda.appendChild(btn);
			}
		}
	}

	return oTabla;
}

function verNotasAlumno()
{
	var dni = this.getAttribute("data-dni");
	var curso = this.getAttribute("data-curso");
	actualizarTablaNotas(dni,curso);
}

function actualizarTablaNotas(dni,curso)
{
	var oAlumno = academia.getUsuario(dni);

	document.querySelector('.modal-title').textContent = "Notas de "+oAlumno.nombre+" "+oAlumno.apellidos;

	var oTabla = document.querySelector("#modal #tablaNotasAlumno");

	for (var i=oTabla.rows.length-1; i>0; i--)
		oTabla.deleteRow(i);

	var tNotas = oAlumno.listaCalificaciones;
	
	
	for (var i=0; i<tNotas.length; i++)
	{
		var oMatricula =academia.getMatricula(tNotas[i].matricula);

		if(oMatricula.curso==curso)
		{
			var fila = oTabla.insertRow(-1);
			fila.insertCell(-1).appendChild(document.createTextNode(tNotas[i].tarea));
			var oCeldaInput=fila.insertCell(-1)
			var input = document.createElement("input");
			input.setAttribute("data-numero", i);
			input.type = "number";
			input.value = tNotas[i].nota;
			input.setAttribute("min", "0");
			input.setAttribute("max", "10");
			input.setAttribute("step", "0.05");
			input.classList.add("form-control");
			oCeldaInput.appendChild(input);

			var oCelda=fila.insertCell(-1);
			var btn = document.createElement("input");
			btn.type = "button";
			btn.value = "Modificar";
			btn.classList.add("btn", "btn-warning", "btn-sm");
			btn.setAttribute("data-dni", oAlumno.dni);
			btn.setAttribute("data-desc", tNotas[i].tarea);
			btn.setAttribute("data-curso", curso);
			btn.addEventListener("click", modificarCalificacion);
			oCelda.appendChild(btn);

			var btn2 = document.createElement("input");
			btn2.type = "button";
			btn2.value = "Borrar";
			btn2.classList.add("btn", "btn-danger", "btn-sm");
			btn2.setAttribute("data-dni", oAlumno.dni);
			btn2.setAttribute("data-desc", tNotas[i].tarea);
			btn2.setAttribute("data-curso", curso);
			btn2.addEventListener("click", BorrarNota);
			oCelda.appendChild(btn2);
		}
	}

	document.getElementById("btnAddNota").setAttribute("data-dni", oAlumno.dni);
	document.getElementById("btnAddNota").setAttribute("data-curso", curso);
	actualizaSelectCalificar(oAlumno.dni);

}

function BorrarNota()
{
	var fila = this.parentNode.parentNode;
	var dni = this.getAttribute("data-dni");
	var curso = this.getAttribute("data-curso");
	var tarea = this.getAttribute("data-desc");
	fila.classList.add("ocultar");

	academia.borrarCalificacion(dni, curso, tarea);
}

function mostrarFormularioCalificar()
{
	document.querySelector("#modal #tablaNotasAlumno").classList.add("ocultar");
	document.querySelector("#modal #frmAddNotaAlumno").classList.remove("ocultar");

	this.classList.add("ocultar");
	document.getElementById("btnCerrarModal").classList.add("ocultar");

	var dni = document.querySelector("#btnAddNota").getAttribute("data-dni");
	var curso = document.querySelector("#btnAddNota").getAttribute("data-curso");

	var btnGuardar = document.createElement("button");
	btnGuardar.id = "btnGuardarNota";
	btnGuardar.type = "button";
	btnGuardar.classList.add("btn", "btn-success");
	btnGuardar.textContent = "Guardar";
	btnGuardar.setAttribute("data-dni", dni);
	btnGuardar.setAttribute("data-curso", curso);
	btnGuardar.addEventListener("click", addCalificacion);

	var btnCancelar = document.createElement("button");
	btnCancelar.id = "btnCancelarNota";
	btnCancelar.type = "button";
	btnCancelar.classList.add("btn", "btn-danger");
	btnCancelar.textContent = "Cancelar";
	btnCancelar.addEventListener("click", ocultarFormularioCalificar);

	document.querySelector("#modal .modal-footer").appendChild(btnGuardar);
	document.querySelector("#modal .modal-footer").appendChild(btnCancelar);
}

function ocultarFormularioCalificar()
{
	document.querySelector("#modal #frmAddNotaAlumno").classList.add("ocultar");
	document.querySelector("#modal #tablaNotasAlumno").classList.remove("ocultar");

	var btnGuardar = document.getElementById("btnGuardarNota");
	var btnCancelar = document.getElementById("btnCancelarNota");

	if (btnGuardar != null)
		btnGuardar.remove();
	if (btnCancelar != null)
		btnCancelar.remove();

	document.getElementById("btnAddNota").classList.remove("ocultar");
	document.getElementById("btnCerrarModal").classList.remove("ocultar");
}

function consultarCursos(sDni)
{
	var oProfesor = academia.getUsuario(sDni);
	var oTablaCurProv = oProfesor.getCursos();

	var oTabla = document.querySelector("#tablaListadoCursos");
	if (oTabla != null)
		oTabla.remove();

	// Creacion de la tabla 
	oTabla = document.createElement("table");
	oTabla.id = "tablaListadoCursos";
	oTabla.classList.add("table");
	oTabla.classList.add("table-hover");

	var oTHead = oTabla.createTHead();
	var oFila = oTHead.insertRow(-1);

	var oTH = document.createElement("th");
	oTH.textContent = "Codigo";
	oFila.appendChild(oTH);
	oTH = document.createElement("th");
	oTH.textContent = "Idioma";
	oFila.appendChild(oTH);
	oTH = document.createElement("th");
	oTH.textContent = "Tipo";
	oFila.appendChild(oTH);
	oTH = document.createElement("th");
	oTH.textContent = "Nivel";
	oFila.appendChild(oTH);
	oTH = document.createElement("th");
	oTH.textContent = "Duración";
	oFila.appendChild(oTH);

	// Cuerpo de la tabla
	var oTBody = oTabla.createTBody();

	for (var i=0; i<oTablaCurProv.length; i++)
	{
		var oCurso = academia.getCurso(oTablaCurProv[i]);
	
		oFila = oTBody.insertRow(-1);
		var oCelda = oFila.insertCell(-1);
		oCelda.textContent = oCurso.codigo;
		oCelda = oFila.insertCell(-1);
		oCelda.textContent = oCurso.idioma;
		oCelda = oFila.insertCell(-1);
		oCelda.textContent = oCurso.tipo;
		oCelda = oFila.insertCell(-1);
		oCelda.textContent = oCurso.nivel;
		oCelda = oFila.insertCell(-1);
		oCelda.textContent = oCurso.duracion;
	}

	return oTabla;
}


