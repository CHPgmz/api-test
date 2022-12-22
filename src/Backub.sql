-- --------------------------------------------------------
-- Host:                         10.60.63.106
-- Versión del servidor:         10.5.15-MariaDB-0+deb11u1 - Debian 11
-- SO del servidor:              debian-linux-gnu
-- HeidiSQL Versión:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para dev
CREATE DATABASE IF NOT EXISTS `dev` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `dev`;

-- Volcando estructura para tabla dev.actividades
CREATE TABLE IF NOT EXISTS `actividades` (
  `id_actividad` int(11) NOT NULL AUTO_INCREMENT,
  `nom_actividades` varchar(50) NOT NULL,
  `horaini` datetime DEFAULT NULL,
  `horafin` datetime DEFAULT NULL,
  PRIMARY KEY (`id_actividad`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla dev.actividades: ~7 rows (aproximadamente)
DELETE FROM `actividades`;
INSERT INTO `actividades` (`id_actividad`, `nom_actividades`, `horaini`, `horafin`) VALUES
	(1, 'Actividad en curso 1', '2022-12-22 16:39:06', '2022-12-22 16:39:07'),
	(2, 'Actividad 2', '2022-12-22 16:39:06', '2022-12-22 16:39:07'),
	(3, 'Actividad 3', '2022-12-22 22:39:06', '2022-12-22 22:39:06'),
	(6, 'Proyecto 5', '2022-12-22 22:39:07', '2022-12-22 22:39:07'),
	(7, 'Proyecto 7', '2022-12-22 22:39:07', '2022-12-22 22:39:07'),
	(8, 'Proyecto 7', '2022-12-22 22:39:07', '2022-12-22 22:39:07');

-- Volcando estructura para tabla dev.catalog
CREATE TABLE IF NOT EXISTS `catalog` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `colaboradores` int(11) DEFAULT NULL,
  `proyectos` int(11) DEFAULT NULL,
  `actividades` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_catalog_colaboradores_idx` (`colaboradores`),
  KEY `fk_catalog_proyectos1_idx` (`proyectos`),
  KEY `fk_catalog_actividades1_idx` (`actividades`),
  CONSTRAINT `FK_catalog_colaboradores` FOREIGN KEY (`colaboradores`) REFERENCES `colaboradores` (`id_colaborador`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_catalog_actividades1` FOREIGN KEY (`actividades`) REFERENCES `actividades` (`id_actividad`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_catalog_proyectos1` FOREIGN KEY (`proyectos`) REFERENCES `proyectos` (`id_proyecto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla dev.catalog: ~3 rows (aproximadamente)
DELETE FROM `catalog`;
INSERT INTO `catalog` (`ID`, `colaboradores`, `proyectos`, `actividades`) VALUES
	(6, 2, 1, 1),
	(7, 1, 1, 1);

-- Volcando estructura para tabla dev.colaboradores
CREATE TABLE IF NOT EXISTS `colaboradores` (
  `id_colaborador` int(11) NOT NULL AUTO_INCREMENT,
  `nom_colaborador` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `cargo_colaborador` varchar(50) NOT NULL,
  `fechaini` datetime DEFAULT NULL,
  `fechafin` datetime DEFAULT NULL,
  `mail` varchar(100) DEFAULT NULL,
  `telefono` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_colaborador`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla dev.colaboradores: ~6 rows (aproximadamente)
DELETE FROM `colaboradores`;
INSERT INTO `colaboradores` (`id_colaborador`, `nom_colaborador`, `apellido`, `cargo_colaborador`, `fechaini`, `fechafin`, `mail`, `telefono`) VALUES
	(1, 'Abiud GGG', 'Marquez', 'ArquitectoDB', '2022-12-22 16:10:04', '2022-12-22 16:10:06', NULL, NULL),
	(2, 'Alfredo', 'Gómez', 'ArquitectoDB', '2022-12-22 10:12:05', '2022-12-22 10:12:06', NULL, NULL),
	(3, 'Dzul', 'Dzul', 'ArquitectoDB', '2022-12-22 10:17:54', '2022-12-22 10:17:55', NULL, NULL),
	(5, 'Dzul', 'Dzul', 'ArquitectoDB', '2022-12-22 16:17:54', '2022-12-22 16:17:55', NULL, NULL),
	(6, 'Garin', 'Dzul', 'ArquitectoDB', '2022-12-22 16:10:04', '2022-12-22 16:10:04', NULL, NULL),
	(11, 'Garin', 'Dzul', 'ArquitectoDB', '2022-12-22 16:10:04', '2022-12-22 16:10:04', NULL, NULL);

-- Volcando estructura para tabla dev.proyectos
CREATE TABLE IF NOT EXISTS `proyectos` (
  `id_proyecto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_proyecto` varchar(50) NOT NULL,
  `tipo_proyecto` varchar(50) NOT NULL,
  `descripcion_proyecto` varchar(50) NOT NULL,
  `fechaini` datetime DEFAULT NULL,
  `fechafin` datetime DEFAULT NULL,
  PRIMARY KEY (`id_proyecto`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla dev.proyectos: ~1 rows (aproximadamente)
DELETE FROM `proyectos`;
INSERT INTO `proyectos` (`id_proyecto`, `nombre_proyecto`, `tipo_proyecto`, `descripcion_proyecto`, `fechaini`, `fechafin`) VALUES
	(1, 'Desarrollo', 'Desarrollo', 'Creacion de api', '2022-12-22 11:16:27', '2022-12-22 11:16:29');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
