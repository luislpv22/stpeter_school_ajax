<?php

header('Content-type: application/json; charset=utf-8');

$db = new mysqli('localhost', 'root', '', 'stpeter_school');
$db->set_charset("utf8");



if (!empty($_GET['profesor']))
{
	$sql = "SELECT codigo FROM cursos WHERE profesor='".$_GET['profesor']."'";
	$query = $db->query($sql);
			$cursos = array();
	while($fila = $query->fetch_object())
		$cursos[] = $fila;
	
	echo json_encode($cursos, JSON_UNESCAPED_UNICODE);	
}


?>
