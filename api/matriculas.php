<?php

header('Content-type: application/json; charset=utf-8');

$db = new mysqli('localhost', 'root', '', 'stpeter_school');
$db->set_charset("utf8");

if (!empty($_GET['matriculas']))
{
	$sql = "SELECT * FROM matriculas";
	$query = $db->query($sql);
	$matriculas = array();
	while ($fila = $query->fetch_object())
		$matriculas[] = $fila;

	echo json_encode($matriculas, JSON_UNESCAPED_UNICODE);
}
else if (!empty($_GET['curso']))
{
	$sql = "SELECT alumno FROM matriculas WHERE curso='".$_GET['curso']."'";
	$query = $db->query($sql);
	$alumnos = array();
	while ($fila = $query->fetch_object())
		$alumnos[] = $fila->alumno;

	echo json_encode($alumnos, JSON_UNESCAPED_UNICODE);
}
else if (!empty($_POST['cambiarEstado']))
{
	$oEstado=json_decode($_POST['cambiarEstado']);
	$sql= "UPDATE matriculas set estado = '".$oEstado->estado."' where numero = ".$oEstado->matricula;
	$query = $db->query($sql);
	$info= "Se ha realizado el cambio en el estado de la matrícula";
	echo json_encode($info, JSON_UNESCAPED_UNICODE);
}

?>
