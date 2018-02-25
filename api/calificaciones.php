<?php

header('Content-type: application/json; charset=utf-8');

include('database.php');

$db = conexion_db();

if (!empty($_GET['calificaciones']))
{
	$sql = "SELECT * FROM notas";
	$query = $db->query($sql);
	$calificaciones = array();
	while ($fila = $query->fetch_object())
		$calificaciones[] = $fila;

	echo json_encode($calificaciones, JSON_UNESCAPED_UNICODE);
}

?>
