<?php

header('Content-type: application/json; charset=utf-8');

include('database.php');

$db = conexion_db();

if (!empty($_GET['profesor']))
{
	$sql = "SELECT codigo FROM cursos WHERE profesor='".$_GET['profesor']."'";
	$query = $db->query($sql);
	$cursos = array();
	while($fila = $query->fetch_object())
		$cursos[] = $fila;
	
	echo json_encode($cursos, JSON_UNESCAPED_UNICODE);	
}
else if(!empty($_POST['notas']))
{
	$sCalificacion=$_POST['notas'];
	$oCalificacion= json_decode($sCalificacion);

	$sql = "UPDATE notas SET nota = ".$oCalificacion->nota." WHERE matricula = '".$oCalificacion->matricula."'";
	$sql .="AND tarea ='".$oCalificacion->tarea."'";
	$query = $db->query($sql);
}
else if (!empty($_POST["add"]))
{
	$sCalificacion=$_POST['add'];
	$oCalificacion= json_decode($sCalificacion);

	$sql = "INSERT INTO NOTAS (matricula, tarea, nota) values ('".$oCalificacion->matricula."','".$oCalificacion->tarea."',".$oCalificacion->nota.")";

	$query = $db->query($sql);
}
else if (!empty($_GET["dni"]))
{
	$sql = "SELECT n.matricula, n.tarea FROM notas n,matriculas m WHERE m.numero=n.matricula AND m.alumno='".$_GET["dni"]."'";
	$sql .="AND n.tarea='".$_GET["tarea"]."' AND m.curso='".$_GET["curso"]."'";
	$query = $db->query($sql);
	$fila = $query->fetch_object();
	$sql = "DELETE FROM notas WHERE matricula=".$fila->matricula." AND tarea='".$fila->tarea."'";	
	$query = $db->query($sql);
}

?>
