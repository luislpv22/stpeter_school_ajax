SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

DROP DATABASE IF EXISTS `stpeter_school`;
CREATE DATABASE `stpeter_school`;
USE `stpeter_school`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `dni` varchar(9) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellidos` varchar(60) NOT NULL,
  `usuario` varchar(60) NOT NULL UNIQUE,
  `password` varchar(30) NOT NULL,
  `email` varchar(60) NOT NULL,
  `telefono` int(9) NOT NULL,
  `direccion` varchar(60) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `tipo` varchar(30) NOT NULL,
  PRIMARY KEY (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`dni`, `nombre`, `apellidos`, `usuario`, `password`, `email`, `telefono`, `direccion`, `activo`, `tipo`) VALUES
('23420102E', 'Carlos', 'Prieto', 'Carlos1', '1234', 'carlos@gmail.com', 624153852, 'C/ Mandel', 1, 'profesor'),
('54629812T', 'Rocio', 'Villar', 'Rocio1', '1234', 'rocio@gmail.com', 978645312, 'C/ Avenida del Salesman 23', 1, 'profesor'),
('42010210B', 'Sonia', 'Sanchez', 'Sonia1', '1234', 'sonia@gmail.com', 912345678, 'C/ Capitán Apodaca 4', 1, 'alumno'),
('24568716R', 'Juan', 'Perez', 'Juan1', '1234', 'juan@gmail.com', 912546212, 'C/ Avenida del Cid', 1, 'profesor'),
('12456879E', 'Diego', 'García', 'Diego1', '1234', 'diego@gmail.com', 689124653, 'C/  Amoral', 1, 'alumno'),
('68789122A', 'David', 'Alves', 'David1', '1234', 'david@gmail.com', 687562300, 'C/ Estepa', 0, 'alumno'),
('46231111Z', 'Luis', 'Dominguez', 'Luis1', '1234', 'luis@gmail.com', 900156112, 'C/ Avenida de Javascript', 1, 'profesor'),
('98765432D', 'Adrian', 'Gonzalez', 'Adrian1', '1234', 'adrian@gmail.com', 900012345, 'C/ PHP 7', 0, 'alumno'),
('85214796Y', 'Clara', 'De Guis', 'Clara1', '1234', 'clara@gmail.com', 910289463, 'C/ Montreal', 1, 'alumno'),
('45625815Q', 'Emilio', 'Marquez', 'Emilio1', '1234', 'emilio@gmail.com', 901023567, 'C/ Avenida del Insert', 0, 'profesor'),
('66666666B', 'profesor', 'profesor', 'profesor', 'profesor', 'profesor@gmail.com', 901023567, 'C/ Undefined', 1, 'profesor'),
('88888888P', 'alumno', 'alumno', 'alumno', 'alumno', 'alumno@gmail.com', 910289463, 'C/ alumno', 1, 'alumno'),
('72158961T', 'Ivan', 'Mendez', 'Ivan1', '1234', 'ivanSales@gmail.com', 612458910, 'C/ Puerto Delete', 1, 'alumno'),
('11111111R', 'Andrea', 'Villar', 'Andrea1', '1234', 'andreaAd@gmail.com', 978645312, 'C/ Avenida del Salesman 23', 1, 'administrador'),
('33333333P', 'Manuel', 'Perez', 'Manuel1', '1234', 'manuelAd@gmail.com', 912546212, 'C/ Avenida del Cid 29', 1, 'administrador'),
('44444444C', 'administrador', 'administrador', 'administrador', 'administrador', 'administrador@gmail.com', 612458910, 'C/ Puerto Rico 14', 1, 'administrador');


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `dni` varchar(9) NOT NULL,
  `estadoCobro` varchar(60) NOT NULL,
  FOREIGN KEY (`dni`) REFERENCES `usuarios` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`dni`, `estadoCobro`) VALUES
('23420102E', 'pendiente'),
('54629812T', 'pendiente'),
('42010210B', 'pendiente'),
('24568716R', 'pagado'),
('12456879E', 'pendiente'),
('68789122A', 'pagado'),
('46231111Z', 'pendiente'),
('98765432D', 'pagado'),
('85214796Y', 'pendiente'),
('45625815Q', 'pagado'),
('88888888P', 'pendiente'),
('72158961T', 'pendiente');


--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE `profesores` (
  `dni` varchar(9) CHARACTER SET utf8 NOT NULL,
  `salario` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `profesores` (`dni`, `salario`) VALUES
('23420102E', 700),
('24568716R', 1000),
('45625815Q', 900),
('46231111Z', 1000),
('54629812T', 1700),
('66666666B', 1500);

--
-- Índices para tablas volcadas
--
--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`dni`);
--
-- Restricciones para tablas volcadas
--
--
-- Filtros para la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD CONSTRAINT `profesores_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `usuarios` (`dni`);
COMMIT;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `codigo` varchar(60) NOT NULL,
  `idioma` varchar(40) NOT NULL,
  `duracion` varchar(60) NOT NULL,
  `precio` int(10) NOT NULL,
  `tipo` varchar(60) NOT NULL,
  `nivel` varchar(60) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `profesor` varchar(9) NOT NULL,
  PRIMARY KEY (`codigo`),
  FOREIGN KEY (`profesor`) REFERENCES `usuarios` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`codigo`, `idioma`, `duracion`, `precio`, `tipo`, `nivel`, `activo`, `profesor`) VALUES
('DEA2P', 'Aleman', '4 meses', 500, 'Presencial', 'A2', 1, '45625815Q'),
('DEB1P', 'Aleman', '8 meses', 1000, 'Presencial', 'B1', 0, '46231111Z'),
('DEB2P', 'Aleman', '12 meses', 1500, 'Presencial', 'B2', 0, '46231111Z'),
('ENB1S', 'Inglés', '8 meses', 1200, 'Semipresencial', 'B1', 1, '66666666B'),
('ENA2P', 'Inglés', '4 meses', 400, 'Presencial', 'A2', 1, '45625815Q'),
('ENB2D', 'Inglés', '4 meses', 400, 'Presencial', 'A2', 1, '45625815Q'),
('FRB1S', 'Francés', '5 meses', 500, 'Semipresencial', 'B1', 1, '66666666B'),
('FRA2P', 'Francés', '10 meses', 900, 'Presencial', 'A2', 1, '66666666B');


-- -------------------------------------------------------

--
-- Estructura de tabla para la tabla `matriculas`
--

CREATE TABLE `matriculas` (
  `numero` int(20) NOT NULL,
  `alumno` varchar(9) NOT NULL,
  `curso` varchar(60) NOT NULL,
  `estado` varchar(60) NOT NULL,
  PRIMARY KEY (`numero`),
  FOREIGN KEY (`alumno`) REFERENCES `usuarios` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `matriculas`
--

INSERT INTO `matriculas` (`numero`, `alumno`, `curso`, `estado`) VALUES
(1, '12456879E', 'DEA2P', 'activa'),
(2, '12456879E', 'ENB1S', 'activa'),
(7, '42010210B', 'FRA2P', 'inactiva'),
(12, '68789122A', 'ENA2P', 'inactiva'),
(13, '85214796Y', 'DEB2P', 'activa'),
(14, '98765432D', 'FRB1S', 'activa'),
(15, '88888888P', 'DEB2P', 'activa'),
(16, '88888888P', 'FRB1S', 'inactiva');


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas`
--

CREATE TABLE `notas` (
  `matricula` int(20) NOT NULL,
  `tarea` varchar(60) NOT NULL,
  `nota` decimal(2,0) NOT NULL,
  UNIQUE (`matricula`, `tarea`),
  FOREIGN KEY (`matricula`) REFERENCES `matriculas` (`numero`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `notas`
--

INSERT INTO `notas` (`matricula`, `tarea`, `nota`) VALUES
(1, 'Examen 1', '8'),
(1, 'Examen 2', '5'),
(1, 'Examen 3', '9'),
(1, 'Examen 4', '4'),
(2, 'Examen 1', '2'),
(2, 'Examen 2', '5'),
(2, 'Examen 3', '6'),
(2, 'Examen 4', '7'),
(7, 'Examen 1', '5'),
(7, 'Examen 2', '6'),
(7, 'Examen 3', '8'),
(12, 'Examen 1', '9'),
(12, 'Examen 2', '1'),
(13, 'Examen 1', '2'),
(13, 'Examen 2', '3'),
(13, 'Examen 3', '6'),
(15, 'Examen 1', '6'),
(15, 'Examen 2', '8'),
(15, 'Examen 3', '4');

-- --------------------------------------------------------


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
