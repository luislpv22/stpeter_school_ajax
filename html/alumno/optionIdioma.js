
$.get("api/alumno.php?idioma=idioma",cargarOption);

 	btnEnviarMatri= document.querySelector("#btnEnviarMatri");
	btnEnviarMatri.addEventListener("click", addCursoMatri, false);

function cargarOption(oDatosDevueltos, sStatus, oAjax)
{
	$("#selectIdioma").empty(); 
	$("#selectIdioma").append("<option value='0'>Seleccione idioma</option>");
		optIdiomas=JSON.parse(oDatosDevueltos);
		for (var i = 0; i < optIdiomas.length; i++) {
			$("#selectIdioma").append(optIdiomas[i]);
		}
}

$("#selectIdioma").change(function()
{
	var idioma= $('#selectIdioma').serialize();

	cambiarEstadoBoton();

	if ($("#selectIdioma").val() ==0)
	{
		resetDatos();
		$("#selectTipo").empty(); 
		$("#selectTipo").append("<option value='0'>Seleccione Tipo</option>");
	}


	$.post("api/alumno.php", idioma, cargarOptionNivel);				
});


function cargarOptionNivel(oDatosDevueltos, sStatus, oAjax)
{
	$("#selectNivel").empty(); 
	$("#selectNivel").append("<option value='0'>Seleccione Nivel</option>");
	optNivel=JSON.parse(oDatosDevueltos);
	for (var i = 0; i < optNivel.length; i++) {
		$("#selectNivel").append(optNivel[i]);
	}
}

$("#selectNivel").change(function()
{
	var idioma= $('#selectIdioma').val();
	var nivel= $('#selectNivel').val();
	var oDatos={idioma:idioma, nivel:nivel};
	cambiarEstadoBoton();

	if (nivel ==0)
		resetDatos();
	
	 var sDatos = "datosOption=" + JSON.stringify(oDatos);

	$.post("api/alumno.php", sDatos, cargarOptionTipo);				
});

function cargarOptionTipo(oDatosDevueltos, sStatus, oAjax)
{
	$("#selectTipo").empty(); 
	$("#selectTipo").append("<option value='0'>Seleccione Tipo</option>");

	optTipo=JSON.parse(oDatosDevueltos);
		for (var i = 0; i < optTipo.length; i++) {
			$("#selectTipo").append(optTipo[i]);
		}
}

$("#selectTipo").change(function()
{
	var idioma= $('#selectIdioma').val();
	var nivel= $('#selectNivel').val();
	var tipo= $('#selectTipo').val();
	cambiarEstadoBoton();
	if (tipo ==0)
		resetDatos();
	
	var oDatos={idioma:idioma, nivel:nivel, tipo:tipo};	
	var sDatos = "datosCurso=" + JSON.stringify(oDatos);
	$.post("api/alumno.php", sDatos, cargarDatosCurso, "json");				
});

function cargarDatosCurso(oDatosDevueltos, sStatus, oAjax)
{
	$("#duraCurso").val(""); 
	$("#preCurso").val(""); 
	$("#duraCurso").val(oDatosDevueltos[0]);
	$("#preCurso").val(oDatosDevueltos[1]);
	document.querySelector("#preCurso").dataset.codigo = oDatosDevueltos[2];
}


function resetDatos()
{
	$("#duraCurso").val(""); 
	$("#preCurso").val(""); 
}

function cambiarEstadoBoton()
{
	var idioma= $('#selectIdioma').val();
	var nivel= $('#selectNivel').val();
	var tipo= $('#selectTipo').val();
}











