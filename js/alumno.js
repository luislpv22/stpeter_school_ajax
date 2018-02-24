
 $( function() 
 {

	$("#enlaceMisDatos").click(cargaDatosAlumno);
	$("#enlaceMatricular").click(cargaAltaMatricula);
	/*$("#mnuAltaCasa").click(cargaAltaCasa);*/ //aqui iria la de curso, dejarlo para el último
	$("#enlaceBaja").click(cargarBajaMatricula);


	function cargaDatosAlumno() {
	    // Oculto todos los formularios menos este
	    $("form:not('#frmModUsuario')").hide("normal");


	    // Verifico si ya he cargado el formulario antes
	   if ($('#frmModUsuario').length == 0) {
	        $("<div>").appendTo('#formularios').load("html/alumno/alumoddatos.html",
	            function() {
	                $.getScript("html/alumno/alumoddatos.js");
	                 cargarDatosUsuario();
	            });

	    } else {
	        // Lo muestro si está oculto
	        $('#frmModUsuario').show("normal");

	    }
	}

	function cargaAltaMatricula() {
	    // Oculto todos los formularios menos este
	    $("form:not('#frmAltaMod')").hide("normal");

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



	function cargarBajaMatricula() {
	    // Oculto todos los formularios menos este
	    $("form:not('#frmDarBaja')").hide("normal");

	    // Verifico si ya he cargado el formulario antes
	    if ($('#frmDarBaja').length == 0) {
	        $("<div>").appendTo('#formularios').load("html/alumno/alueliminar.html", function(){$.getScript("html/alumno/alueliminar.js"); });

	    } else {
	        // Lo muestro si está oculto
	        $('#frmDarBaja').show("normal");
	    }
	}

   } );



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


function cargarNivel()
{
	oListaCursos = academia.getCursos();
	oSelectIdioma = document.querySelector("#selectIdioma");
	oSelectNivel = document.querySelector("#selectNivel");
	resetearSelectNivel();
	resetearCamposDatosCurso();
	if (oSelectIdioma.value != "seleIdi")
	{
		var arrayNivel=[];
		for (var i=0; i<oListaCursos.length; i++) 
		{
			if (oListaCursos[i].idioma == oSelectIdioma.value && !arrayNivel.includes(oListaCursos[i].nivel))
				arrayNivel.push(oListaCursos[i].nivel);
		}

		for (var i=0; i<arrayNivel.length; i++) 
		{
			oOption = document.createElement("OPTION");
			oOption.textContent = arrayNivel[i];
			oOption.value = arrayNivel[i];
			oSelectNivel.appendChild(oOption);      
		}
	}
}

function resetearSelectIdiomas()
{
	listaOptions=document.querySelectorAll("#selectIdioma OPTION");
	for (var i=0; i<listaOptions.length; i++) 
		listaOptions[i].parentNode.removeChild(listaOptions[i]);

	oOption = document.createElement("OPTION");
	oOption.textContent = "Seleccione Idioma";
	oOption.value = "seleIdioma";
	document.querySelector("#selectIdioma").appendChild(oOption); 

}

function resetearSelectNivel()
{
	listaOptions=document.querySelectorAll("#selectNivel OPTION");
	for (var i=0; i<listaOptions.length; i++) 
		listaOptions[i].parentNode.removeChild(listaOptions[i]);

	oOption = document.createElement("OPTION");
	oOption.textContent = "Seleccione Nivel";
	oOption.value = "seleNi";
	oSelectNivel.appendChild(oOption); 
}

function cargarTipo()
{
	oListaCursos = academia.getCursos();
	oSelectIdioma = document.querySelector("#selectIdioma");
	oSelectNivel = document.querySelector("#selectNivel");
	oSelctTipo = document.querySelector("#selectTipo");

	resetearSelectTipo();
	resetearCamposDatosCurso();

	if (oSelectIdioma.value != "seleIdi" && oSelectNivel.value != "seleNi" )
	{
		var arrayTipo=[];
		for (var i = 0; i < oListaCursos.length; i++) 
		{
			if (oListaCursos[i].idioma== oSelectIdioma.value && oListaCursos[i].nivel == oSelectNivel.value)
				if (!arrayTipo.includes(oListaCursos[i].tipo))
					arrayTipo.push(oListaCursos[i].tipo);
		}

		for (var i = 0; i < arrayTipo.length; i++) 
		{
			oOption=document.createElement("OPTION");
			oOption.textContent = arrayTipo[i];
			oOption.value = arrayTipo[i];
			oSelctTipo.appendChild(oOption);    
		}

		oSelctTipo.removeAttribute("disabled"); 
		
	 }
	 else
	 {
		oSelctTipo.disabled="disabled"; 
		document.querySelector("#btnAddCursoMatri").disabled="disabled";    
	 }
}

function resetearSelectTipo()
{
	document.querySelector("#txtInformacion span").textContent = "";
	document.querySelector("#txtInformacion").classList.add("hide");
	oSelctTipo = document.querySelector("#selectTipo");
	listaOptions = document.querySelectorAll("#selectTipo OPTION");
	for (var i=0; i<listaOptions.length; i++) 
		listaOptions[i].parentNode.removeChild(listaOptions[i]);

	oOption=document.createElement("OPTION");
	oOption.textContent = "Seleccione Tipo";
	oOption.value = "seleTipo";
	oSelctTipo.appendChild(oOption); 

}

function resetearCamposDatosCurso()
{
	oDuracinCurso= document.querySelector("#duraCurso").value = "";
	oPrecioCurso= document.querySelector("#preCurso").value = "";
}

function cargarCurso()
{
	resetearCamposDatosCurso();

	sSelectIdioma = document.querySelector("#selectIdioma").value;
	sSelectNivel = document.querySelector("#selectNivel").value;
	sSelctTipo = document.querySelector("#selectTipo").value;

	var tCursos = academia.getCursos();
	var oCurso = null;
	for (var i=0; i<tCursos.length && oCurso==null; i++) 
		if (tCursos[i].idioma == sSelectIdioma && tCursos[i].nivel == sSelectNivel && tCursos[i].tipo == sSelctTipo)
			oCurso= tCursos[i];

	oDuracionCurso = document.querySelector("#duraCurso").value = oCurso.duracion;
	oPrecioCurso = document.querySelector("#preCurso").value = oCurso.precio;
	
	document.querySelector("#btnAddCursoMatri").removeAttribute("disabled"); 
}

function addCursoMatri(oEvento)
{
	sSelectIdioma = document.querySelector("#selectIdioma").value;
	sSelectNivel = document.querySelector("#selectNivel").value;
	sSelctTipo = document.querySelector("#selectTipo").value;

	var tCursos = academia.getCursos();
	var oCurso = null;
	for (var i=0; i<tCursos.length && oCurso==null; i++) 
		if (tCursos[i].idioma == sSelectIdioma && tCursos[i].nivel == sSelectNivel && tCursos[i].tipo == sSelctTipo)
			oCurso= tCursos[i];

	if (oSelctTipo != "seleTipo")
	{
		var oE = oEvento || window.event;
		oE.preventDefault();

		if (typeof(cursosElegidos) === "undefined")
			cursosElegidos = [];

		// ver si el curso ya está en la array
		if (!cursosElegidos.includes(oCurso))
		{
			// ver si no estaba ya matriculado en el curso
			if (!sesion.listaCursos.includes(oCurso.codigo))
			{
				resetearCamposDatosCurso();         
				oSelectIdioma = document.querySelector("#selectIdioma").selectedIndex = 0;
				oSelectNivel = document.querySelector("#selectNivel");
				oSelectNivel.selectedIndex = 0;

				oSelctTipo = document.querySelector("#selectTipo");
				oSelctTipo.selectedIndex = 0;
				oSelctTipo.disabled = "disabled";   
				document.querySelector("#btnAddCursoMatri").disabled = "disabled";  

				cursosElegidos.push(oCurso);
				document.querySelector("#txtInformacion span").textContent = "Curso añadido a la matrícula";
				document.querySelector("#txtInformacion").classList.remove("alert-success", "alert-warning", "alert-danger", "hide");
				document.querySelector("#txtInformacion").classList.add("alert-success");

				borrartabla();
				crearTabla(cursosElegidos);
				document.querySelector("#btnEnviarMatri").removeAttribute("disabled");
				resetearSelectNivel();
			}
			else
			{
				document.querySelector("#txtInformacion span").textContent = "Ya estás matriculado en ese curso";
				document.querySelector("#txtInformacion").classList.remove("alert-success", "alert-warning", "alert-danger", "hide");
				document.querySelector("#txtInformacion").classList.add("alert-danger");
			}
		}
		else
		{
			document.querySelector("#txtInformacion span").textContent = "Ya has seleccionado ese curso";
			document.querySelector("#txtInformacion").classList.remove("alert-success", "alert-warning", "alert-danger", "hide");
			document.querySelector("#txtInformacion").classList.add("alert-warning");
		}
	}
	else
	{
		document.querySelector("#txtInformacion span").textContent = "Debes seleccionar un tipo de curso";
		document.querySelector("#txtInformacion").classList.remove("alert-success", "alert-warning", "alert-danger", "hide");
		document.querySelector("#txtInformacion").classList.add("alert-danger");
	}
}

function realizarMatricula(oEvento)
{
	var oE = oEvento || window.event;

	var tCursos = [];
	for (var i=0; i<cursosElegidos.length; i++)
		tCursos.push(cursosElegidos[i].codigo);

	oMatricula = new Matricula(academia.codNuevaMatri(), "activa", sesion.dni, tCursos);

	academia.addMatricula(oMatricula);
	sessionStorage.setItem('usuario', JSON.stringify(academia.getUsuario(sesion.dni)));
	document.querySelector("#txtInformacion span").textContent = "";
	document.querySelector("#txtInformacion").classList.add("hide");
	borrartabla();
	document.getElementById("capaMatriCurso").classList.add("ocultar");
	cursosElegidos = []; // resetear el array de los cursos elegidos
	resetearSelectIdiomas();
	menuCursoUsuario();
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
			oCelda.textContent = listaNotas[i].descripcion;
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
	oDiv = document.createElement("DIV");
	oDiv.id = "listaCalificaciones";
	oDivBorrar = document.querySelector("#listaCalificaciones");
	oDivBorrar.parentNode.replaceChild(oDiv, oDivBorrar);
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
