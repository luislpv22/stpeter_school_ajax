<?php

include('lib/password.php');

$db = new mysqli('localhost', 'root', '', 'stpeter_school');
$db->set_charset("utf8");

if (!empty($_POST['datos']))
{
	header('Content-type: application/json; charset=utf-8');
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
	echo $sRespuesta;
}
else if (!empty($_REQUEST["usu"]))
{
	$sDni= $_REQUEST["usu"];
	$sql = "UPDATE usuarios SET activo = 0 WHERE dni = '".$sDni."'";
	$query = $db->query($sql);
	$respuesta = "Se ha dado de baja";
	echo $respuesta;
}

/*else if (!empty($_GET['alumno']))
{
	$sql = "SELECT estadoCobro FROM alumnos WHERE dni='".$_GET['alumno']."'";
	$query = $db->query($sql);
	$result = $query->fetch_object();
	echo $result->estadoCobro;
}*/

?>





