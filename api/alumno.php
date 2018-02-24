<?php
header('Content-type: application/json; charset=utf-8');
include('lib/password.php');

$db = new mysqli('localhost', 'root', '', 'stpeter_school');
$db->set_charset("utf8");

if (!empty($_POST['datos']))
{
	$sDatos = $_POST["datos"];
	$oDatos = json_decode($sDatos);
	$sql = "UPDATE usuarios
        SET telefono = '".$oDatos->telefono."', direccion = '".$oDatos->direccion."', email = '".$oDatos->correo."', password = '".$oDatos->password."'
        WHERE dni = '".$oDatos->dni."'";


	$query = $db->query($sql);
	$afectados= $db->affected_rows;

	if ($afectados = 0)
	{
		$mensaje = "Error al modificar";
		$error =true;
	}
	else
	{
		$mensaje = "Usuario modificado";
		$error = false;
	}
	$respuesta = array($error, $mensaje);
	$sRespuesta = json_encode($respuesta);
	echo $sql;
	
}


/*else if (!empty($_GET['alumno']))
{
	$sql = "SELECT estadoCobro FROM alumnos WHERE dni='".$_GET['alumno']."'";
	$query = $db->query($sql);
	$result = $query->fetch_object();
	echo $result->estadoCobro;
}*/

?>





