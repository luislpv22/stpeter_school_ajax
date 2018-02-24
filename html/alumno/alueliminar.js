

$("#btnDarBajaAca").click(eliAlumno);

function eliAlumno (oEvento)
{
    
	oDatos = {"activo": "no", "dni":"localstoragedelasesion"};
	var sDatos = "datos=" + JSON.stringify(oDatos);
	$.post("php/eliAlu.php", sDatos, respuestaEliAlu, 'json');
}


function respuestaEliAlu(oDatosDevueltos, sStatus, oAjax) {


    // oDatosDevueltos[0]  --- si hay o no error
    if (oDatosDevueltos[0] == false) {
        // Mensaje
        alert(oDatosDevueltos[1]);

    } else {
        alert(oDatosDevueltos[1]);
    }
}




