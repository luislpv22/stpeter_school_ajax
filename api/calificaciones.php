<?php

header('Content-type: application/json; charset=utf-8');

$db = new mysqli('localhost', 'root', '', 'stpeter_school');
$db->set_charset("utf8");

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
