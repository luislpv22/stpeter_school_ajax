<?php

header('Content-type: application/json; charset=utf-8');

include('database.php');

$db = conexion_db();

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
else if (!empty($_POST))
{
	$sql = "UPDATE matriculas SET curso='".$_POST['curso']."', estado='".$_POST['estado']."' WHERE numero = ".$_POST['numero'];
	if ($db->query($sql))
		echo true;
	else
		echo false;
}

?>
