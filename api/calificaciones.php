<?php
include('database.php');

$db = conexion_db();

if (!empty($_GET['calificaciones']))
{

	$sql = "SELECT matricula, tarea, nota FROM notas";
	$query = $db->query($sql);

	header("Content-Type: text/xml");
	$calificaciones= '<?xml version="1.0" encoding="UTF-8"?>';
	$calificaciones .="<listaNotas>";
	while ($fila = $query->fetch_object())
	{
		$calificaciones .="<nota>";
		$calificaciones .="<matricula>".$fila->matricula."</matricula>";
		$calificaciones .="<tarea>".$fila->tarea."</tarea>";
		$calificaciones .="<nota>".$fila->nota."</nota>";
		$calificaciones .="</nota>";
	}
	$calificaciones .="</listaNotas>";
	echo $calificaciones;
}

?>

	