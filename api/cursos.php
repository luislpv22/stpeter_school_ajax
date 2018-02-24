<?php

header('Content-type: application/json; charset=utf-8');

$db = new mysqli('localhost', 'root', '', 'stpeter_school');
$db->set_charset("utf8");

if (!empty($_GET['cursos']))
{
	$sql = "SELECT * FROM cursos";
	$query = $db->query($sql);
	$cursos = array();
	while($fila = $query->fetch_object())
		$cursos[] = $fila;

	echo json_encode($cursos, JSON_UNESCAPED_UNICODE);
}

?>
