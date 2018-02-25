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
}else if(!empty($_POST['notas']))
{
$sCalificacion=$_POST['notas'];
$oCalificacion= json_decode($sCalificacion);

$sql = "UPDATE notas SET nota = ".$oCalificacion->nota." WHERE matricula = '".$oCalificacion->matricula."'";
$sql .="AND tarea ='".$oCalificacion->tarea."'";
$query = $db->query($sql);
}else if (!empty($_POST["add"]))
{
	
	$sCalificacion=$_POST['add'];
	$oCalificacion= json_decode($sCalificacion);

	$sql = "INSERT INTO NOTAS (matricula, tarea, nota) values ('".$oCalificacion->matricula."','".$oCalificacion->tarea."',".$oCalificacion->nota.")";

	$query = $db->query($sql);
	/*
	if ( $db->affected_rows == 0)
	{
		$info=false;
	}
	else
	{
		$info=true;
	}
	echo json_encode($info);
	*/
}


?>
