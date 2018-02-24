<?php

include('lib/password.php');

$db = new mysqli('localhost', 'root', '', 'stpeter_school');
$db->set_charset("utf8");

if (!empty($_GET['usuarios']))
{
	$sql = "SELECT * FROM usuarios";
	$query = $db->query($sql);
	$usuarios = array();
	while($fila = $query->fetch_object())
		$usuarios[] = $fila;

	echo json_encode($usuarios);
}
else if (!empty($_GET['alumno']))
{
	$sql = "SELECT estadoCobro FROM alumnos WHERE dni='".$_GET['alumno']."'";
	$query = $db->query($sql);
	$result = $query->fetch_object();
	echo $result->estadoCobro;
}

?>
