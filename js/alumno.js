function quitarActiveMenu()
{
	$('.alert').remove();

	var menus = document.querySelectorAll('nav li');
	for (var i=0; i<menus.length; i++)
		menus[i].classList.remove('active');
}

$("#enlaceMisDatos").click(cargaDatosAlumno);
$("#enlaceMatricular").click(cargaAltaMatricula);
$("#enlaceBaja").click(cargarBajaMatricula);
$("#enlaceMatricular").parent().next().click(function() { quitarActiveMenu(); });

function cargaDatosAlumno() {
	quitarActiveMenu();
	document.querySelector('#enlaceMisDatos').parentNode.classList.add('active');

	// Oculto todos los formularios menos este
	$("form:not('#frmMisDatos')").hide("normal");
	$('#listaCalificaciones').hide("normal");

	// Verifico si ya he cargado el formulario antes
	if ($('#frmMisDatos').length == 0)
	{
		$("<div>").appendTo('#formularios').load("html/misdatos.html", function()
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
		$('#frmMisDatos').show();
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
		let oAlumno = new Alumno(sNombre, sPassword, sApellidos, sDni, sTelefono, sDireccion, sEmail, 1, "");
		academia.modificarUsuario(oAlumno);

		let alert = $('<div class="alert alert-success alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Datos modificados.</div>');
		$('#formularios').append(alert);
	}
}

function cargaAltaMatricula()
{
	quitarActiveMenu();
	document.querySelector('#enlaceMatricular').parentNode.classList.add('active');

	// Oculto todos los formularios menos este
	$("form:not('#frmAltaMod')").hide("normal");
	$('#listaCalificaciones').hide("normal");

	// Verifico si ya he cargado el formulario antes
	if ($('#frmAltaMod').length == 0) {
		$("<div>").appendTo('#formularios').load("html/alumno/alumatricula.html",
			function() {
				$.getScript("html/alumno/optionIdioma.js");
			});

	} else {
		// Lo muestro si está oculto
		$('#frmAltaMod').show("normal");
	}
}

function cargarBajaMatricula()
{
	quitarActiveMenu();
	document.querySelector('#enlaceBaja').parentNode.classList.add('active');
	// Oculto todos los formularios menos este
	$("form:not('#frmDarBaja')").hide("normal");
	 $('#listaCalificaciones').hide("normal");

	// Verifico si ya he cargado el formulario antes
	if ($('#frmDarBaja').length == 0) {
		$("<div>").appendTo('#formularios').load("html/alumno/alueliminar.html", 
			function(){
				$.getScript("html/alumno/alueliminar.js"); 
			});

	} else {
		// Lo muestro si está oculto
		$('#frmDarBaja').show("normal");
	}
}

function resetearCamposModMatricula()
{
	var input = document.querySelectorAll('#frmModUsuario input');
	for (var i=0; i<input.length; i++)
	input[i].classList.remove("errorFormulario");

	var mensajes = document.querySelectorAll('#frmModUsuario .text-error');
	for (var i=0; i<mensajes.length; i++)
	mensajes[i].remove();
}


function mensaje(sTexto)
{
	document.getElementById("pTextoMensaje").appendChild(sTexto);
	document.getElementById("panelMensajes").style.display = 'block';
	document.getElementById("btnCerrar").addEventListener("click", cerrarMensaje, false);;

}

function cerrarMensaje()
{
	document.getElementById("pTextoMensaje").textContent = "";
	document.getElementById("panelMensajes").style.display = 'none';
}

/*******************************Cargar datos Usuario ********************************/
function cargarDatosUsuario()
{
	document.querySelector("#frmModUsuario #nombreUsu").value = sesion.nombre;
	document.querySelector("#frmModUsuario #apellidosUsu").value = sesion.apellidos;
	document.querySelector("#frmModUsuario #dniUsu").value = sesion.dni;
	document.querySelector("#frmModUsuario #passUsu").value = sesion.password;
	document.querySelector("#frmModUsuario #telefonoUsu").value = sesion.telefono;
	document.querySelector("#frmModUsuario #direUsu").value = sesion.direccion;
	document.querySelector("#frmModUsuario #emailUsu").value = sesion.correo;
}

//método que carga los cursos que existan en los distintos select del div de matriculación
function cargarCursos()
{
	oSelectIdioma = document.querySelector("#selectIdioma");
	oListaCursos = academia.getCursos();
	var arrayCurso = [];

	for (var i=0; i<oListaCursos.length; i++) 
	{
		if (!arrayCurso.includes(oListaCursos[i].idioma))
			arrayCurso.push(oListaCursos[i].idioma);
	}

	for (var i = 0; i < arrayCurso.length; i++) 
	{
		oOption = document.createElement("OPTION");
		oOption.textContent = arrayCurso[i];
		oOption.value = arrayCurso[i];
		oSelectIdioma.appendChild(oOption);     
	}
}

function resetearDatosAltaMatricula()
{
	$("#selectIdioma").empty(); 
	$("#selectIdioma").append("<option value='0'>Seleccione idioma</option>");
	$("#selectTipo").empty(); 
	$("#selectTipo").append("<option value='0'>Seleccione Tipo</option>");
	$("#selectNivel").empty(); 
	$("#selectNivel").append("<option value='0'>Seleccione Nivel</option>");
	$("#duraCurso").val("");
	$("#preCurso").val("");
}

function addCursoMatri(oEvento)
{
	sSelectIdioma = document.querySelector("#selectIdioma").value;
	sSelectNivel = document.querySelector("#selectNivel").value;
	sSelctTipo = document.querySelector("#selectTipo").value;
   if (sSelectIdioma  != 0 && sSelectNivel != 0 && sSelctTipo  !=0 )
   {
		var tCursos = academia.getCursos();
		var oCurso = null;
		for (var i=0; i<tCursos.length && oCurso==null; i++) 
			if (tCursos[i].idioma == sSelectIdioma && tCursos[i].nivel == sSelectNivel && tCursos[i].tipo == sSelctTipo)
				oCurso= tCursos[i];


		if (oCurso  != null)
		{
			var oE = oEvento || window.event;
			oE.preventDefault();

			if (!sesion.listaCursos.includes(oCurso.codigo))
			{
				oMatricula = new Matricula(academia.codNuevaMatri(), "activa", sesion.dni, oCurso);
				$.ajax(
				{
					url: "api/alumno.php",
					type: "POST",
					aysnc: true,
					data: {'matricular': JSON.stringify(oMatricula)},
					dataType: "JSON",
					success: function(result)
					{
						if (result == true)
						{
								resetearDatosAltaMatricula();
								$.get("api/alumno.php?idioma=idioma",cargarOption);
								sesion.listaCursos.push(oCurso.codigo);
								sessionStorage.usuario= JSON.stringify(sesion);

								cargarMatriculas();
								menuCursoUsuario();
								oAlumno= academia.getUsuario(sesion.dni);
								oAlumno.addCurso(oCurso.codigo);
						}
						else
						{
							document.querySelector("#txtInformacion span").textContent = "Se ha producido un error al insertar";
							document.querySelector("#txtInformacion").classList.remove("alert-success", "alert-warning", "alert-danger", "hide");
							document.querySelector("#txtInformacion").classList.add("alert-danger");
						}
					}
				});
			}
			else
			{
				document.querySelector("#txtInformacion span").textContent = "Ya estás matriculado en ese curso";
				document.querySelector("#txtInformacion").classList.remove("alert-success", "alert-warning", "alert-danger", "hide");
				document.querySelector("#txtInformacion").classList.add("alert-danger");
			}
		}
	}
	else
	{
		document.querySelector("#txtInformacion span").textContent = "Error al elegir la configuración del curso";
		document.querySelector("#txtInformacion").classList.remove("alert-success", "alert-warning", "alert-danger", "hide");
		document.querySelector("#txtInformacion").classList.add("alert-danger");
	}
}


function cargarListadoCurso(oEvento)

{
	//tengo que hacer un método que replace el nodo div por otro nuevo cada vez que se inicie este método
	limpiarListadoCurso();
	oE = oEvento || window.event;
	var listaNotas = academia.getCalificaciones(oE.target.value, sesion.dni);
	if (listaNotas.length == 0)
	{
		var div = document.createElement("div");
		div.classList.add("alert", "alert-danger");
		div.textContent = "No hay calificaciones disponibles";
		document.querySelector("#listaCalificaciones").appendChild(div);
	}
	else
	{

		oBr= document.createElement("BR");
		document.querySelector("#listaCalificaciones").appendChild(oBr);
		oParrafo= document.createElement("P");
		oParrafo.textContent="Opciones de filtrado y ordenación";
		document.querySelector("#listaCalificaciones").appendChild(oParrafo);

		$("#listaCalificaciones").append('<table id="tablaMatriCurso" class="table table-hover">');

		//crear select para los filtrados
		oSelect = document.createElement("SELECT");
		oSelect.id ="filtraNotas";
		oSelect.classList.add("form-control");
		oSelect.style.display = "inline";
		oSelect.style.width = "220px";
		oSelect.style.marginRight = "5px";
		oP = document.createElement("OPTION");
		oP.value = "99";
		oP.textContent = "Seleccione filtrado";
		oSelect.appendChild(oP);
		oP = document.createElement("OPTION");
		oP.value = "5";
		oP.textContent = "Aprobados";
		oSelect.appendChild(oP);
		oP = document.createElement("OPTION");
		oP.value = "4.99";
		oP.textContent = "Suspensos";
		oSelect.appendChild(oP);
		document.querySelector("#listaCalificaciones").appendChild(oSelect);
		document.querySelector("#filtraNotas").addEventListener("change", filtaTabla, false);

		//crear select para ordenar notas
		oSelect = document.createElement("SELECT");
		oSelect.id = "ordenaNotas";
		oSelect.classList.add("form-control");
		oSelect.style.display = "inline";
		oSelect.style.width = "220px";
		oP = document.createElement("OPTION");
		oP.value = "nulo";
		oP.textContent = "Seleccione tipo de orden";
		oSelect.appendChild(oP);
		oP = document.createElement("OPTION");
		oP.value="creciente";
		oP.textContent = "De menor a mayor";
		oSelect.appendChild(oP);
		oP = document.createElement("OPTION");
		oP.value = "decreciente";
		oP.textContent = "De mayor a menor";
		oSelect.appendChild(oP);
		document.querySelector("#listaCalificaciones").appendChild(oSelect);
		document.querySelector("#ordenaNotas").addEventListener("change", ordenaTabla, false);

		oBr = document.createElement("BR");
		document.querySelector("#listaCalificaciones").appendChild(oBr);
		oBr = document.createElement("BR");
		document.querySelector("#listaCalificaciones").appendChild(oBr);


		borrartabla();
		oTabla = document.createElement("TABLE");
		oTabla.classList.add("table", "table-hover");
		oTabla.style.maxWidth = "300px";
		oTHead = oTabla.createTHead();
		oFila = oTHead.insertRow(-1);
		oCelda = document.createElement("th");
		oCelda.textContent = " ";
		oFila.appendChild(oCelda);
		oCelda = document.createElement("th");
		oCelda.textContent = "Tarea";
		oFila.appendChild(oCelda);
		oCelda = document.createElement("th");
		oCelda.textContent = "Calificación";
		oCelda.style.textAlign = "center";
		oFila.appendChild(oCelda);

		oTBody = oTabla.createTBody();

		for (var i=0; i<listaNotas.length; i++) 
		{
			oFila = oTBody.insertRow(-1);
			oCelda = oFila.insertCell(-1);
			oCelda.textContent = " ";
			oCelda = oFila.insertCell(-1);
			oCelda.textContent = listaNotas[i].tarea;
			oCelda = oFila.insertCell(-1);
			oCelda.textContent = listaNotas[i].nota;
			oCelda.dataset.nota = listaNotas[i].nota;
			oCelda.id = "nota";
			oCelda.style.textAlign = "center";
		}

		document.querySelector("#listaCalificaciones").appendChild(oTabla);
	}							
}

function limpiarListadoCurso()
{
	$('#listaCalificaciones').empty();
}


function filtaTabla()
{
	iSele= parseFloat(document.querySelector("#filtraNotas").value);
	var oTabla= document.querySelector("TABLE");
	var oTBody= document.querySelector("TBODY");
	var oFilas = oTBody.rows; //el número de filas de una tabla
	borrarFiltro(oFilas);

	if (iSele!= 99)
	{
		if (iSele == 5)
		{
			for (var i=0; i<oFilas.length; i++) 
			{
				var oCeldas = oTBody.rows[i].cells;  // las celdas de una fila en concreto
				for (var j=0; j<oCeldas.length; j++) 
					if (parseFloat(oCeldas[j].dataset.nota)<iSele)
						oFilas[i].classList.add("ocultar");
			}
		}
		else
		{
			for (var i=0; i<oFilas.length; i++) 
			{
				var oCeldas = oTBody.rows[i].cells;  // las celdas de una fila en concreto
				for (var j=0; j<oCeldas.length; j++) 
					if (parseInt(oCeldas[j].dataset.nota) > iSele)
						oFilas[i].classList.add("ocultar");
			}
		}
	}
}


function borrartabla()
{
	oTabla = document.querySelector('#tablaMatriCurso');
	for (var i=oTabla.rows.length-1; i>0; i--)
		oTabla.deleteRow(i);
}

function crearTabla(cursos)
{
	var oTabla = document.querySelector('#tablaMatriCurso');
	oTBody = oTabla.createTBody();

	for (var i=0; i<cursos.length; i++)
	{
		oFila = oTabla.insertRow(-1);       
		oCelda = oFila.insertCell(-1);
		oCelda.textContent = cursos[i].tipo;
		oCelda = oFila.insertCell(-1);
		oCelda.textContent = cursos[i].idioma;
		oCelda = oFila.insertCell(-1);
		oCelda.textContent = cursos[i].nivel;
		oCelda = oFila.insertCell(-1);
		oCelda.textContent = cursos[i].duracion;
		oCelda = oFila.insertCell(-1);
		oCelda.textContent = cursos[i].precio;
	}
}


function borrarFiltro(oFilas)
{
	for (var i=0; i<oFilas.length; i++) 
		oFilas[i].classList.remove("ocultar");
}

function ordenaTabla()
{
	sSele= document.querySelector("#ordenaNotas").value;
	if (sSele =="creciente" || sSele =="decreciente" )
	{
		var oTabla= document.querySelector("TABLE");
		var oTBody=document.querySelector("TBODY");

		var arrayTrNotas= document.querySelectorAll("#nota");
		var arrayNotas=[];

		for (var i = 0; i < arrayTrNotas.length; i++)
		{
			arrayNotas[i]=parseInt(arrayTrNotas[i].dataset.nota);
		}

		if (sSele == "creciente" )
			var arrayNotaOrdenado = arrayNotas.sort(function(a, b){return a-b}); // ordena de menor a mayor;
		else
			var arrayNotaOrdenado = arrayNotas.sort(function(a, b){return a<b}); // ordena de menor a mayor;

		var oFilas = oTBody.rows; // el número de filas de una tabla

		for (var i=0; i<arrayNotaOrdenado.length; i++) 
		{
			for (var j=0; j<oFilas.length; j++) 
			{
				var oCeldas = oFilas[j].cells;  // las celdas de una fila en concreto
				for (var k=0; k<oCeldas.length; k++) 
				{
					if (parseInt(oCeldas[k].dataset.nota )== arrayNotaOrdenado[i])
					{
						oTBody.appendChild(oFilas[j]);
					}
				}
			}
		}
	}	
}
