var sesion = JSON.parse(sessionStorage.usuario);
document.querySelector('#sidebar .usuario .nombre').appendChild(document.createTextNode(sesion.nombre));

if (sesion.tipo != 'administrador')
    location.href = "index.html";

var btnCerrarSesion= document.querySelector("#btnCerrarSesion");
btnCerrarSesion.addEventListener("click", cerrarSesion, false);

document.querySelector('#btnCursos').addEventListener("click", function () { mostrarPagina('cursos'); });
document.querySelector('#btnAlumnos').addEventListener("click", function () { mostrarPagina('alumnos'); });
document.querySelector('#btnProfesores').addEventListener("click", function () { mostrarPagina('profesores'); });
document.querySelector('#btnAdministradores').addEventListener("click", function () { mostrarPagina('administradores'); });
document.querySelector('#btnMatriculas').addEventListener("click", function () { mostrarPagina('matriculaciones'); });

document.querySelector('#btnAddCurso').addEventListener("click", crearCurso);
document.querySelector('#btnAddAlumno').addEventListener("click", crearAlumno);
document.querySelector('#btnAddProfesor').addEventListener("click", crearProfesor);
document.querySelector('#btnAddAdministrador').addEventListener("click", crearAdministrador);

document.querySelector("#selectFiltrarCursos").addEventListener("change", filtrarTablaCursos);
document.querySelector("#selectFiltrarAlumnos").addEventListener("change", filtrarTablaAlumnos);
document.querySelector("#selectFiltrarProfesores").addEventListener("change", filtrarTablaProfesores);
document.querySelector("#selectFiltrarAdministradores").addEventListener("change", filtrarTablaAdministradores);

mostrarPagina('cursos');

function mostrarPagina(pagina)
{
	if (pagina == 'cursos')
	{
		var tablaCursos = document.querySelector('#tablaCursos');

		for (var i=tablaCursos.rows.length-1; i>0; i--)
			tablaCursos.deleteRow(i);

		var tbody = tablaCursos.createTBody();
	
		var cursos = academia.getCursos();
		for (var i=0; i<cursos.length; i++)
		{
			var fila = tbody.insertRow(-1);
			fila.insertCell(-1).appendChild(document.createTextNode(cursos[i].codigo.toUpperCase()));
			fila.insertCell(-1).appendChild(document.createTextNode(capitalize(cursos[i].idioma)));
			fila.insertCell(-1).appendChild(document.createTextNode(cursos[i].nivel.toUpperCase()));
			fila.insertCell(-1).appendChild(document.createTextNode(capitalize(cursos[i].tipo)));
			fila.insertCell(-1).appendChild(document.createTextNode(cursos[i].duracion));
			fila.insertCell(-1).appendChild(document.createTextNode(cursos[i].precio+" €"));
			fila.insertCell(-1).appendChild(document.createTextNode(cursos[i].activo));

			fila.setAttribute("data-activo", cursos[i].activo);

			var acciones = fila.insertCell(-1);
			if (cursos[i].activo == 1)
			{
				var btnEditar = document.createElement("input");
				btnEditar.type = "button";
				btnEditar.value = "Editar";
				btnEditar.classList.add("btn", "btn-warning", "btn-sm");
				btnEditar.setAttribute("data-toggle", "modal");
				btnEditar.setAttribute("data-target", "#modal");
				btnEditar.setAttribute("data-codigo", cursos[i].codigo);
				btnEditar.addEventListener("click", editarCurso);
				acciones.appendChild(btnEditar);

				var btnEliminar = document.createElement("input");
				btnEliminar.type = "button";
				btnEliminar.value = "Eliminar";
				btnEliminar.classList.add("btn", "btn-danger", "btn-sm");
				btnEliminar.setAttribute("data-toggle", "confirmation");
				btnEliminar.setAttribute("data-btn-ok-label", "Eliminar");
				btnEliminar.setAttribute("data-btn-ok-class", "btn-danger btn-sm");
				btnEliminar.setAttribute("data-btn-cancel-label", "Cancelar");
				btnEliminar.setAttribute("data-btn-cancel-class", "btn-default btn-sm");
				btnEliminar.setAttribute("data-title", "¿Eliminar este curso?");
				btnEliminar.setAttribute("data-btn-ok-icon", "");
				btnEliminar.setAttribute("data-btn-cancel-icon", "");
				btnEliminar.setAttribute("data-curso", cursos[i].codigo);
				acciones.appendChild(btnEliminar);
			}
		}
		filtrarTablaCursos();

		var capas = document.querySelectorAll('#content > .container-fluid');
		for (var i=0; i<capas.length; i++)
			capas[i].classList.add('hidden'); 

		var menus = document.querySelectorAll('nav li');
		for (var i=0; i<menus.length; i++)
			menus[i].classList.remove('active');

		jQuery('[data-toggle=confirmation]').confirmation({rootSelector: '[data-toggle=confirmation]'});
		jQuery('[data-toggle=confirmation]').on("confirmed.bs.confirmation", borrarCurso);

		document.querySelector('#paginaCursos').classList.remove('hidden');
		document.querySelector('#btnCursos').parentNode.classList.add('active');
	}
	else if (pagina == 'alumnos')
	{
		var tablaAlumnos = document.querySelector('#tablaAlumnos');

		for (var i=tablaAlumnos.rows.length-1; i>0; i--)
			tablaAlumnos.deleteRow(i);

		var alumnos = academia.getAlumnos();
		for (var i=0; i<alumnos.length; i++)
		{
			var fila = tablaAlumnos.insertRow(-1);
			fila.insertCell(-1).appendChild(document.createTextNode(alumnos[i].dni.toUpperCase()));
			fila.insertCell(-1).appendChild(document.createTextNode(alumnos[i].nombre));
			fila.insertCell(-1).appendChild(document.createTextNode(alumnos[i].apellidos));
			fila.insertCell(-1).appendChild(document.createTextNode(alumnos[i].correo));
			fila.insertCell(-1).appendChild(document.createTextNode(alumnos[i].direccion));
			fila.insertCell(-1).appendChild(document.createTextNode(alumnos[i].activo));

			fila.setAttribute("data-activo", alumnos[i].activo);

			var acciones = fila.insertCell(-1);
			if (alumnos[i].activo == 1)
			{
				var btnEditar = document.createElement("input");
				btnEditar.type = "button";
				btnEditar.value = "Editar";
				btnEditar.classList.add("btn", "btn-warning", "btn-sm");
				btnEditar.setAttribute("data-toggle", "modal");
				btnEditar.setAttribute("data-target", "#modal");
				btnEditar.setAttribute("data-dni", alumnos[i].dni);
				btnEditar.addEventListener("click", editarAlumno);
				acciones.appendChild(btnEditar);

				var btnEliminar = document.createElement("input");
				btnEliminar.type = "button";
				btnEliminar.value = "Eliminar";
				btnEliminar.classList.add("btn", "btn-danger", "btn-sm");
				btnEliminar.setAttribute("data-toggle", "confirmation");
				btnEliminar.setAttribute("data-btn-ok-label", "Eliminar");
				btnEliminar.setAttribute("data-btn-ok-class", "btn-danger btn-sm");
				btnEliminar.setAttribute("data-btn-cancel-label", "Cancelar");
				btnEliminar.setAttribute("data-btn-cancel-class", "btn-default btn-sm");
				btnEliminar.setAttribute("data-title", "¿Eliminar este alumno?");
				btnEliminar.setAttribute("data-btn-ok-icon", "");
				btnEliminar.setAttribute("data-btn-cancel-icon", "");
				btnEliminar.setAttribute("data-dni", alumnos[i].dni);
				acciones.appendChild(btnEliminar);
			}
		}
		filtrarTablaAlumnos();

		var capas = document.querySelectorAll('#content > .container-fluid');
		for (var i=0; i<capas.length; i++)
			capas[i].classList.add('hidden'); 

		var menus = document.querySelectorAll('nav li');
		for (var i=0; i<menus.length; i++)
			menus[i].classList.remove('active');

		jQuery('[data-toggle=confirmation]').confirmation({rootSelector: '[data-toggle=confirmation]'});
		jQuery('[data-toggle=confirmation]').on("confirmed.bs.confirmation", borrarAlumno);

		document.querySelector('#paginaAlumnos').classList.remove('hidden');
		document.querySelector('#btnAlumnos').parentNode.classList.add('active');
	}
	else if (pagina == 'profesores')
	{
		var tablaProfesores = document.querySelector('#tablaProfesores');

		for (var i=tablaProfesores.rows.length-1; i>0; i--)
			tablaProfesores.deleteRow(i);

		var profesores = academia.getProfesores();
		for (var i=0; i<profesores.length; i++)
		{
			var fila = tablaProfesores.insertRow(-1);
			fila.insertCell(-1).appendChild(document.createTextNode(profesores[i].dni.toUpperCase()));
			fila.insertCell(-1).appendChild(document.createTextNode(profesores[i].nombre));
			fila.insertCell(-1).appendChild(document.createTextNode(profesores[i].apellidos));
			fila.insertCell(-1).appendChild(document.createTextNode(profesores[i].correo));
			fila.insertCell(-1).appendChild(document.createTextNode(profesores[i].activo));

			fila.setAttribute("data-activo", profesores[i].activo);

			var acciones = fila.insertCell(-1);
			if (profesores[i].activo == 1)
			{
				var btnEditar = document.createElement("input");
				btnEditar.type = "button";
				btnEditar.value = "Editar";
				btnEditar.classList.add("btn", "btn-warning", "btn-sm");
				btnEditar.setAttribute("data-toggle", "modal");
				btnEditar.setAttribute("data-target", "#modal");
				btnEditar.setAttribute("data-dni", profesores[i].dni);
				btnEditar.addEventListener("click", editarProfesor);
				acciones.appendChild(btnEditar);

				var btnEliminar = document.createElement("input");
				btnEliminar.type = "button";
				btnEliminar.value = "Eliminar";
				btnEliminar.classList.add("btn", "btn-danger", "btn-sm");
				btnEliminar.setAttribute("data-toggle", "confirmation");
				btnEliminar.setAttribute("data-btn-ok-label", "Eliminar");
				btnEliminar.setAttribute("data-btn-ok-class", "btn-danger btn-sm");
				btnEliminar.setAttribute("data-btn-cancel-label", "Cancelar");
				btnEliminar.setAttribute("data-btn-cancel-class", "btn-default btn-sm");
				btnEliminar.setAttribute("data-title", "¿Eliminar este profesor?");
				btnEliminar.setAttribute("data-btn-ok-icon", "");
				btnEliminar.setAttribute("data-btn-cancel-icon", "");
				btnEliminar.setAttribute("data-dni", profesores[i].dni);
				acciones.appendChild(btnEliminar);
			}
		}
		filtrarTablaProfesores();

		var capas = document.querySelectorAll('#content > .container-fluid');
		for (var i=0; i<capas.length; i++)
			capas[i].classList.add('hidden'); 

		var menus = document.querySelectorAll('nav li');
		for (var i=0; i<menus.length; i++)
			menus[i].classList.remove('active');

		jQuery('[data-toggle=confirmation]').confirmation({rootSelector: '[data-toggle=confirmation]'});
		jQuery('[data-toggle=confirmation]').on("confirmed.bs.confirmation", borrarProfesor);

		document.querySelector('#paginaProfesores').classList.remove('hidden');
		document.querySelector('#btnProfesores').parentNode.classList.add('active');
	}
	else if (pagina == 'administradores')
	{
		var tablaAdministradores = document.querySelector('#tablaAdministradores');

		for (var i=tablaAdministradores.rows.length-1; i>0; i--)
			tablaAdministradores.deleteRow(i);

		var administradores = academia.getAdministradores();
		for (var i=0; i<administradores.length; i++)
		{
			var fila = tablaAdministradores.insertRow(-1);
			fila.insertCell(-1).appendChild(document.createTextNode(administradores[i].dni.toUpperCase()));
			fila.insertCell(-1).appendChild(document.createTextNode(administradores[i].nombre));
			fila.insertCell(-1).appendChild(document.createTextNode(administradores[i].apellidos));
			fila.insertCell(-1).appendChild(document.createTextNode(administradores[i].correo));
			fila.insertCell(-1).appendChild(document.createTextNode(administradores[i].activo));

			fila.setAttribute("data-activo", administradores[i].activo);

			var acciones = fila.insertCell(-1);

			if (administradores[i].activo == 1)
			{
				var btnEditar = document.createElement("input");
				btnEditar.type = "button";
				btnEditar.value = "Editar";
				btnEditar.classList.add("btn", "btn-warning", "btn-sm");
				btnEditar.setAttribute("data-toggle", "modal");
				btnEditar.setAttribute("data-target", "#modal");
				btnEditar.setAttribute("data-dni", administradores[i].dni);
				btnEditar.addEventListener("click", editarAdministrador);
				acciones.appendChild(btnEditar);

				if (administradores[i].dni != sesion.dni)
				{
					var btnEliminar = document.createElement("input");
					btnEliminar.type = "button";
					btnEliminar.value = "Eliminar";
					btnEliminar.classList.add("btn", "btn-danger", "btn-sm");
					btnEliminar.setAttribute("data-toggle", "confirmation");
					btnEliminar.setAttribute("data-btn-ok-label", "Eliminar");
					btnEliminar.setAttribute("data-btn-ok-class", "btn-danger btn-sm");
					btnEliminar.setAttribute("data-btn-cancel-label", "Cancelar");
					btnEliminar.setAttribute("data-btn-cancel-class", "btn-default btn-sm");
					btnEliminar.setAttribute("data-title", "¿Eliminar este administrador?");
					btnEliminar.setAttribute("data-btn-ok-icon", "");
					btnEliminar.setAttribute("data-btn-cancel-icon", "");
					btnEliminar.setAttribute("data-dni", administradores[i].dni);
					acciones.appendChild(btnEliminar);
				}
			}
			else
				fila.insertCell(-1);
		}
		filtrarTablaAdministradores();

		var capas = document.querySelectorAll('#content > .container-fluid');
		for (var i=0; i<capas.length; i++)
			capas[i].classList.add('hidden'); 

		var menus = document.querySelectorAll('nav li');
		for (var i=0; i<menus.length; i++)
			menus[i].classList.remove('active');

		jQuery('[data-toggle=confirmation]').confirmation({rootSelector: '[data-toggle=confirmation]'});
		jQuery('[data-toggle=confirmation]').on("confirmed.bs.confirmation", borrarAdministrador);

		document.querySelector('#paginaAdministradores').classList.remove('hidden');
		document.querySelector('#btnAdministradores').parentNode.classList.add('active');
	}
	else if (pagina == 'matriculaciones')
	{
		var tablaMatriculas = document.querySelector('#tablaMatriculas');

		for (var i=tablaMatriculas.rows.length-1; i>0; i--)
			tablaMatriculas.deleteRow(i);

		var matriculas = academia.getMatriculas();
		for (var i=0; i<matriculas.length; i++)
		{
			var oAlumno = academia.getUsuario(matriculas[i].dniAlumno);
			var fila = tablaMatriculas.insertRow(-1);
			fila.insertCell(-1).appendChild(document.createTextNode(matriculas[i].numero));
			fila.insertCell(-1).appendChild(document.createTextNode(matriculas[i].dniAlumno));
			fila.insertCell(-1).appendChild(document.createTextNode(oAlumno.nombre));
			fila.insertCell(-1).appendChild(document.createTextNode(oAlumno.apellidos));
			fila.insertCell(-1).appendChild(document.createTextNode(matriculas[i].curso));

			var swActivo = switchActivo();
			var sEstado = "";
			var btnClass = "";
			if (matriculas[i].estado == "activa") {
				swActivo.querySelector('.switch-activo').checked = "checked";
				swActivo.setAttribute("data-btn-ok-label", "Desactivar");
				swActivo.setAttribute("data-btn-ok-class", "btn-danger btn-sm");
				swActivo.setAttribute("data-title", "¿Desactivar esta matrícula?");
			}
			else {
				swActivo.setAttribute("data-btn-ok-label", "Activar");
				swActivo.setAttribute("data-btn-ok-class", "btn-success btn-sm");
				swActivo.setAttribute("data-title", "¿Activar esta matrícula?");	
			}

			swActivo.setAttribute("data-toggle", "confirmation");
			swActivo.setAttribute("data-btn-cancel-label", "Cancelar");
			swActivo.setAttribute("data-btn-cancel-class", "btn-default btn-sm");
			swActivo.setAttribute("data-btn-ok-icon", "");
			swActivo.setAttribute("data-btn-cancel-icon", "");
			swActivo.setAttribute("data-matricula", matriculas[i].numero);
			oFila = fila.insertCell(-1).appendChild(swActivo);
			

			var btn = document.createElement("input");
			btn.type = "button";
			btn.value = "Editar";
			btn.classList.add("btn", "btn-warning", "btn-sm");
			btn.setAttribute("data-toggle", "modal");
			btn.setAttribute("data-target", "#modal");
			btn.setAttribute("data-matricula", matriculas[i].numero);
			btn.addEventListener("click", editarMatricula);
			fila.insertCell(-1).appendChild(btn);
		}

		jQuery('[data-toggle=confirmation]').confirmation({rootSelector: '[data-toggle=confirmation]'});
		jQuery('[data-toggle=confirmation]').on("confirmed.bs.confirmation", desactivarMatricula);

	    var capas = document.querySelectorAll('#content > .container-fluid');
		for (var i=0; i<capas.length; i++)
			capas[i].classList.add('hidden'); 

		var menus = document.querySelectorAll('nav li');
		for (var i=0; i<menus.length; i++)
			menus[i].classList.remove('active');
		
		document.querySelector('#paginaMatriculaciones').classList.remove('hidden');
		document.querySelector('#btnMatriculas').parentNode.classList.add('active');
		filtrarTabla();
	}
}

function editarCurso()
{
	document.querySelector('.modal-title').textContent = "Editar curso";
	let forms = document.querySelectorAll('#modal form');
	for (let i=0; i<forms.length; i++)
		forms[i].style.display = "none";

	let codigo = this.getAttribute("data-codigo");
	let oCurso = academia.getCurso(codigo);
	let form = document.getElementById("formEditarCurso");

	limpiarErrores(form);

	form.codigo.value = oCurso.codigo;
	form.idioma.value = oCurso.idioma;
	form.nivel.value = oCurso.nivel;
	form.tipo.value = oCurso.tipo;

	let duracion = oCurso.duracion.split(" ");
	form.duracion1.value = duracion[0];
	form.duracion2.value = duracion[1];

	form.precio.value = oCurso.precio;
	form.activo.value = oCurso.activo;

	$('#modal .btn-success').unbind("click");
	document.querySelector('#modal .btn-success').id = "btnGuardarCurso";
	document.querySelector('#btnGuardarCurso').setAttribute("data-codigo", codigo);
	$('#btnGuardarCurso').click(guardarCurso);

	form.style.display = "block";
}

function crearCurso()
{
	document.querySelector('.modal-title').textContent = "Crear curso";
	let forms = document.querySelectorAll('#modal form');
	for (let i=0; i<forms.length; i++)
		forms[i].style.display = "none";

	let form = document.getElementById("formEditarCurso");
	$('#modal .btn-success').unbind("click");
	document.querySelector('#modal .btn-success').id = "btnGuardarCurso";
	document.querySelector('#btnGuardarCurso').removeAttribute("data-codigo");
	$('#btnGuardarCurso').click(guardarCurso);

	limpiarErrores(form);

	form.codigo.removeAttribute("readonly");
	form.codigo.value = "";
	form.idioma.value = "Inglés";
	form.nivel.value = "A1";
	form.tipo.value = "Presencial";
	form.duracion1.value = "1";
	form.duracion2.value = "meses";
	form.precio.value = "0.00";
	form.activo.value = 1;
	form.style.display = "block";
}

function desactivarMatricula(e)
{
	let numero = this.getAttribute("data-matricula");
	let oMatricula = academia.getMatricula(numero);

	if (oMatricula.estado == "activa") {
		oMatricula.estado = "inactiva";
		this.click();
	}
	else {
		oMatricula.estado = "activa";
		this.click();
	}

	// llamada ajax post para cambiar en la base de dato el estado de la matrícula
	let oDatos={matricula:numero, estado:oMatricula.estado};
	let sDatos = "cambiarEstado=" + JSON.stringify(oDatos);
	$.post("api/matriculas.php", sDatos);

	academia.modificarMatricula(oMatricula);
	mostrarPagina('matriculaciones');
}

function guardarCurso()
{
	let form = document.getElementById("formEditarCurso");

	if (validarFormCurso(form))
	{
		let sCodigo = form.codigo.value;

		let dataCod = this.getAttribute("data-codigo");
		if (dataCod != null)
			sCodigo = dataCod;

		let sIdioma = form.idioma.value;
		let sNivel = form.nivel.value;
		let sTipo = form.tipo.value;
		let fPrecio = parseFloat(form.precio.value);
		let sDuracion = form.duracion1.value + " " + form.duracion2.value;
		let bActivo = form.activo.value;

		let oCurso = new Curso(sCodigo, sIdioma, sDuracion, fPrecio, sTipo, sNivel, bActivo);

		if (dataCod != null)
			academia.modificarCurso(oCurso);
		else
			academia.addCurso(oCurso);

		mostrarPagina('cursos');
		document.querySelector('#modal .close').click();
	}
}


function editarAlumno()
{
	document.querySelector('.modal-title').textContent = "Editar alumno";
	let forms = document.querySelectorAll('#modal form');
	for (let i=0; i<forms.length; i++)
		forms[i].style.display = "none";

	let dni = this.getAttribute("data-dni");
	let oAlumno = academia.getUsuario(dni);
	let form = document.getElementById("formEditarAlumno");

	limpiarErrores(form);

	form.dni.value = oAlumno.dni;
	form.password.value = oAlumno.password;
	form.nombre.value = oAlumno.nombre;
	form.apellidos.value = oAlumno.apellidos;
	form.email.value = oAlumno.correo;
	form.telefono.value = oAlumno.telefono;
	form.direccion.value = oAlumno.direccion;

	$('#modal .btn-success').unbind("click");
	document.querySelector('#modal .btn-success').id = "btnGuardarAlumno";
	document.querySelector('#btnGuardarAlumno').setAttribute("data-dni", dni);
	$('#btnGuardarAlumno').click(guardarAlumno);

	form.style.display = "block";
}

function crearAlumno()
{
	document.querySelector('.modal-title').textContent = "Nuevo alumno";
	let forms = document.querySelectorAll('#modal form');
	for (let i=0; i<forms.length; i++)
		forms[i].style.display = "none";

	let form = document.getElementById("formEditarAlumno");
	$('#modal .btn-success').unbind("click");
	document.querySelector('#modal .btn-success').id = "btnGuardarAlumno";
	document.querySelector('#btnGuardarAlumno').removeAttribute("data-dni");
	$('#btnGuardarAlumno').click(guardarAlumno);

	limpiarErrores(form);

	form.dni.removeAttribute("readonly");
	form.dni.value = "";
	form.password.value = "";
	form.nombre.value = "";
	form.apellidos.value = "";
	form.email.value = "";
	form.telefono.value = "";
	form.direccion.value = "";
	form.style.display = "block";
}

function guardarAlumno()
{
	let form = document.getElementById("formEditarAlumno");

	if (validarFormUsuario(form))
	{
		let sDNI = form.dni.value;

		let dataDNI = this.getAttribute("data-dni");
		if (dataDNI != null)
			sDNI = dataDNI;

		let sPassword = form.password.value;
		let sNombre = form.nombre.value;
		let sApellidos = form.apellidos.value;
		let sCorreo = form.email.value;
		let sTelefono = form.telefono.value;
		let sDireccion = form.direccion.value;

		let oAlumno = new Alumno(sNombre, sPassword, sApellidos, sDNI, sTelefono, sDireccion, sCorreo, 1, "");

		if (dataDNI != null)
			academia.modificarUsuario(oAlumno);
		else
			academia.addUsuario(oAlumno);

		mostrarPagina('alumnos');
		document.querySelector('#modal .close').click();
	}
	
}

function editarProfesor()
{
	document.querySelector('.modal-title').textContent = "Editar profesor";
	let forms = document.querySelectorAll('#modal form');
	for (let i=0; i<forms.length; i++)
		forms[i].style.display = "none";

	let dni = this.getAttribute("data-dni");
	let oProfesor = academia.getUsuario(dni);
	let form = document.getElementById("formEditarProfesor");

	limpiarErrores(form);

	form.dni.value = oProfesor.dni;
	form.password.value = oProfesor.password;
	form.nombre.value = oProfesor.nombre;
	form.apellidos.value = oProfesor.apellidos;
	form.email.value = oProfesor.correo;
	form.telefono.value = oProfesor.telefono;
	form.direccion.value = oProfesor.direccion;

	$('#modal .btn-success').unbind("click");
	document.querySelector('#modal .btn-success').id = "btnGuardarProfesor";
	document.querySelector('#btnGuardarProfesor').setAttribute("data-dni", dni);
	$('#btnGuardarProfesor').click(guardarProfesor);

	form.style.display = "block";
}

function crearProfesor()
{
	document.querySelector('.modal-title').textContent = "Nuevo profesor";
	let forms = document.querySelectorAll('#modal form');
	for (let i=0; i<forms.length; i++)
		forms[i].style.display = "none";

	let form = document.getElementById("formEditarProfesor");
	$('#modal .btn-success').unbind("click");
	document.querySelector('#modal .btn-success').id = "btnGuardarProfesor";
	document.querySelector('#btnGuardarProfesor').removeAttribute("data-dni");
	$('#btnGuardarProfesor').click(guardarProfesor);

	limpiarErrores(form);

	form.dni.removeAttribute("readonly");
	form.dni.value = "";
	form.password.value = "";
	form.nombre.value = "";
	form.apellidos.value = "";
	form.email.value = "";
	form.telefono.value = "";
	form.direccion.value = "";

	form.style.display = "block";
}

function guardarProfesor()
{
	let form = document.getElementById("formEditarProfesor");

	if (validarFormUsuario(form))
	{
		let sDNI = form.dni.value;

		let dataDNI = this.getAttribute("data-dni");
		if (dataDNI != null)
			sDNI = dataDNI;

		let sPassword = form.password.value;
		let sNombre = form.nombre.value;
		let sApellidos = form.apellidos.value;
		let sCorreo = form.email.value;
		let sTelefono = form.telefono.value;
		let sDireccion = form.direccion.value;

		let oProfesor = new Profesor(sNombre, sPassword, sApellidos, sDNI, sTelefono, sDireccion, sCorreo, 1, "");

		if (dataDNI != null)
			academia.modificarUsuario(oProfesor);
		else
			academia.addUsuario(oProfesor);

		mostrarPagina('profesores');
		document.querySelector('#modal .close').click();
	}
}

function editarAdministrador()
{
	document.querySelector('.modal-title').textContent = "Editar administrador";
	let forms = document.querySelectorAll('#modal form');
	for (let i=0; i<forms.length; i++)
		forms[i].style.display = "none";

	let dni = this.getAttribute("data-dni");
	let oAdministrador = academia.getUsuario(dni);
	let form = document.getElementById("formEditarAdministrador");

	limpiarErrores(form);

	form.dni.value = oAdministrador.dni;
	form.password.value = oAdministrador.password;
	form.nombre.value = oAdministrador.nombre;
	form.apellidos.value = oAdministrador.apellidos;
	form.email.value = oAdministrador.correo;
	form.telefono.value = oAdministrador.telefono;
	form.direccion.value = oAdministrador.direccion;

	$('#modal .btn-success').unbind("click");
	document.querySelector('#modal .btn-success').id = "btnGuardarAdministrador";
	document.querySelector('#btnGuardarAdministrador').setAttribute("data-dni", dni);
	$('#btnGuardarAdministrador').click(guardarAdministrador);

	form.style.display = "block";
}

function crearAdministrador()
{
	document.querySelector('.modal-title').textContent = "Nuevo administrador";
	let forms = document.querySelectorAll('#modal form');
	for (let i=0; i<forms.length; i++)
		forms[i].style.display = "none";

	let form = document.getElementById("formEditarAdministrador");
	$('#modal .btn-success').unbind("click");
	document.querySelector('#modal .btn-success').id = "btnGuardarAdministrador";
	document.querySelector('#btnGuardarAdministrador').removeAttribute("data-dni");
	$('#btnGuardarAdministrador').click(guardarAdministrador);

	limpiarErrores(form);

	form.dni.removeAttribute("readonly");
	form.dni.value = "";
	form.password.value = "";
	form.nombre.value = "";
	form.apellidos.value = "";
	form.email.value = "";
	form.telefono.value = "";
	form.direccion.value = "";
	form.style.display = "block";
}

function guardarAdministrador()
{
	let form = document.getElementById("formEditarAdministrador");

	if (validarFormUsuario(form))
	{
		let sDNI = form.dni.value;

		let dataDNI = this.getAttribute("data-dni");
		if (dataDNI != null)
			sDNI = dataDNI;

		let sPassword = form.password.value;
		let sNombre = form.nombre.value;
		let sApellidos = form.apellidos.value;
		let sCorreo = form.email.value;
		let sTelefono = form.telefono.value;
		let sDireccion = form.direccion.value;

		let oAdministrador = new Administrador(sNombre, sPassword, sApellidos, sDNI, sTelefono, sDireccion, sCorreo, 1, "");

		if (dataDNI != null)
			academia.modificarUsuario(oAdministrador);
		else
			academia.addUsuario(oAdministrador);

		mostrarPagina('administradores');
		document.querySelector('#modal .close').click();
	}
}

function switchActivo()
{
	let lblActivo = document.createElement("label");
	lblActivo.classList.add("switch-container");
	let chkActivo = document.createElement("input");
	chkActivo.type = "checkbox";
	chkActivo.classList.add("switch-activo");
	let divOuter = document.createElement("div");
	divOuter.classList.add("switch-outer");
	let divInner = document.createElement("div");
	divInner.classList.add("switch-inner");
	divOuter.appendChild(divInner);
	lblActivo.appendChild(chkActivo);
	lblActivo.appendChild(divOuter);

	return lblActivo;
}

function editarMatricula()
{
	let numero = this.getAttribute('data-matricula');
	oMatricula = academia.getMatricula(numero);
  	document.querySelector('.modal-title').textContent = "Editar matrícula";
	let forms = document.querySelectorAll('#modal form');

	for (let i=0; i<forms.length; i++)
		forms[i].style.display = "none";

	let codigo = numero;
	let dni = oMatricula.dniAlumno;
	let form = document.getElementById("formModMatri");
	form.numMatri.value = codigo;
	form.dniMatri.value = dni;
	let listaCursos = academia.getCursos();

	limpiarErrores(form);

	let oP = document.querySelectorAll("OPTION");
	for (let i=0; i<oP.length; i++) 
		oP[i].parentNode.removeChild(oP[i]);

	for (let i=0; i<listaCursos.length; i++) 
	{
		oP = document.createElement("OPTION");
		oP.value = listaCursos[i].codigo;
		oP.textContent = listaCursos[i].idioma+", "+listaCursos[i].nivel+", "+listaCursos[i].tipo;

		if (oMatricula.curso == listaCursos[i].codigo)
			oP.selected = "selected";

		form.seleCurMatri.appendChild(oP);
	}

	$('#modal .btn-success').unbind("click");
	document.querySelector('#modal .btn-success').id = "btnGuardarMatricula";
	document.querySelector('#btnGuardarMatricula').setAttribute("data-estado", oMatricula.estado);
	$('#btnGuardarMatricula').click(guardarMatricula);

	form.style.display = "block";
}

function guardarMatricula()
{
	let form = document.getElementById("formModMatri");

	if (validarCampoCursos(form))
	{
		let dataEstado = this.getAttribute("data-estado");

		let sNumero = form.numMatri.value;
		let sDni = form.dniMatri.value;
		let sCurso = "";

		listaOp=document.querySelectorAll("OPTION");
		for (let i = 0; i < listaOp.length; i++) {
			if (listaOp[i].selected)
				sCurso = listaOp[i].value;
		}

		let oMatricula = new Matricula(sNumero, dataEstado, sDni, sCurso);
		let oAlumno = academia.getUsuario(sDni); 

		if (sNumero != null)
		{
			// quitar curso y notas que se hayan quitado
			oAlumno.listaCursos.splice(oAlumno.listaCursos.indexOf(sCurso), 1);
			academia.modificarMatricula(oMatricula);
		}
		else
		{
			oAlumno.listaCursos.push(sCurso);
			academia.addMatricula(oMatricula);
		}
		academia.modificarAlumno(oAlumno);

		mostrarPagina('matriculaciones');
		document.querySelector('#modal .close').click();
	}
}

function borrarCurso()
{
	let codigo = this.getAttribute("data-curso");
	let oCurso = academia.getCurso(codigo);
	oCurso.activo = 0;

	academia.modificarCurso(oCurso);
	mostrarPagina('cursos');
}

function borrarAlumno()
{
	let dni = this.getAttribute("data-dni");
	let oUsuario = academia.getUsuario(dni);
	oUsuario.activo = 0;

	academia.modificarUsuario(oUsuario);
	mostrarPagina('alumnos');
}

function borrarProfesor()
{
	let dni = this.getAttribute("data-dni");
	let oUsuario = academia.getUsuario(dni);
	oUsuario.activo = 0;

	academia.modificarUsuario(oUsuario);
	mostrarPagina('profesores');
}

function borrarAdministrador()
{
	let dni = this.getAttribute("data-dni");
	let oUsuario = academia.getUsuario(dni);
	oUsuario.activo = 0;

	academia.modificarUsuario(oUsuario);
	mostrarPagina('administradores');
}

function filtrarTablaCursos()
{
	let filtro = document.querySelector("#selectFiltrarCursos");
	filtrarTabla(filtro.value);
}

function filtrarTablaAlumnos()
{
	let filtro = document.querySelector("#selectFiltrarAlumnos");
	filtrarTabla(filtro.value);
}

function filtrarTablaProfesores()
{
	let filtro = document.querySelector("#selectFiltrarProfesores");
	filtrarTabla(filtro.value);
}

function filtrarTablaAdministradores()
{
	let filtro = document.querySelector("#selectFiltrarAdministradores");
	filtrarTabla(filtro.value);
}

function filtrarTabla(filtro)
{
	let filas = document.querySelectorAll("tr");

	if (filtro != "todo")
	{
		for (let i=0; i<filas.length; i++)
		{
			if (filas[i].getAttribute("data-activo") != null)
			{
				if (filas[i].getAttribute("data-activo") == filtro)
					filas[i].classList.remove("ocultar");
				else
					filas[i].classList.add("ocultar");
			}
		}
	}
	else
	{
		for (let i=0; i<filas.length; i++)
			filas[i].classList.remove("ocultar");	
	}
}