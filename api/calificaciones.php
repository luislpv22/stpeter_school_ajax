<?php

header('Content-type: application/json; charset=utf-8');

$db = new mysqli('localhost', 'root', '', 'stpeter_school');
$db->set_charset("utf8");

if (!empty($_GET['dni']))
{
	$sql = "SELECT n.matricula, n.tarea, n.nota FROM notas n, matriculas m WHERE m.alumno='".$_GET['dni']."' AND n.matricula=m.numero";
	$query = $db->query($sql);
	$calificaciones = array();
	while ($fila = $query->fetch_object())
		$calificaciones[] = $fila;

	echo json_encode($calificaciones, JSON_UNESCAPED_UNICODE);
}

?>
