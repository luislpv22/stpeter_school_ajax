

$("#btnDarBajaAca").click(eliminarAlumno);

function eliminarAlumno (oEvento)
{
    oEvento.preventDefault ();
           var oAjax = instanciarXHR();
            //1. Preparar parametros
            var sDatosEnvio = "usu="+ sesion.dni;
            //2. Configurar la llamada --> Asincrono por defecto
             oAjax.open("GET", encodeURI("api/alumno.php?"+sDatosEnvio)); 
            //3. Asociar manejador de evento de la respuesta
            oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            oAjax.addEventListener("readystatechange", procesoRespuesta, false);
            //4. Hacer la llamada
            oAjax.send(null);
        

}
        function procesoRespuesta() {

            var oAjax = this;
            // 5. Proceso la respuesta cuando llega
            if (oAjax.readyState == 4 && oAjax.status == 200)
            {
                 alert(oAjax.responseText);
                 cerrarSesion();
                 location.href = "index.html";
            }
        }


           function instanciarXHR() {
            var xhttp = null;

            if (window.XMLHttpRequest) {
                xhttp = new XMLHttpRequest();
            } else // code for IE5 and IE6
            {
                xhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }

            return xhttp;
        }


