-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-02-2025 a las 13:23:13
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cutulu`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hoja`
--

CREATE TABLE `hoja` (
  `id_sheet` int(11) NOT NULL,
  `id_character` int(11) NOT NULL,
  `sheet` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`sheet`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hoja`
--

INSERT INTO `hoja` (`id_sheet`, `id_character`, `sheet`) VALUES
(20, 34, '{\"data\":{\"name\":\"Marina\",\"age\":29,\"occupation\":\"Anticuario\",\"sex\":\"Mujer\",\"residence\":\"Aranjuez\",\"birthplace\":\"Madrid\"},\"characteristics\":{\"FUE\":15,\"DES\":45,\"POD\":65,\"CON\":75,\"APA\":50,\"EDU\":90,\"TAM\":75,\"INT\":60,\"Mov\":7},\"stats\":{\"currentStats\":{\"hp\":15,\"mp\":13,\"sanity\":65,\"luck\":80},\"maxStats\":{\"hpMax\":15,\"mpMax\":13,\"sanityMax\":65,\"luckMax\":45}},\"skills\":{\"Esquivar\":22},\"successSkills\":[],\"objects\":{\"Petaca\":3},\"weapons\":[],\"cash\":{\"spendingLevel\":50,\"cash\":350,\"assets\":35000},\"combat\":{\"damageBonus\":{\"modifyer\":0,\"dice\":null},\"build\":0},\"conditions\":[]}'),
(21, 35, '{\"data\":{\"name\":\"Skain\",\"age\":25,\"occupation\":\"Abogado\",\"sex\":\"Hombre\",\"residence\":\"Pekin\",\"birthplace\":\"Arganda\"},\"characteristics\":{\"FUE\":99,\"DES\":99,\"POD\":99,\"CON\":99,\"APA\":99,\"EDU\":99,\"TAM\":99,\"INT\":99,\"Mov\":8},\"stats\":{\"currentStats\":{\"hp\":19,\"mp\":19,\"sanity\":99,\"luck\":60},\"maxStats\":{\"hpMax\":19,\"mpMax\":19,\"sanityMax\":99,\"luckMax\":90}},\"skills\":{\"Antropología\":100,\"Arma_corta\":100,\"Fusil_o_Escopeta\":100,\"Arqueología\":100,\"Arte_o_Artesanía\":100,\"Buscar_libros\":100,\"Cerrajería\":100,\"Charlatanería\":100,\"Ciencia\":100,\"Pelea\":100,\"Conducir_automóvil\":100,\"Conducir_maquinaria\":100,\"Contabilidad\":100,\"Derecho\":100,\"Descubrir\":100,\"Disfrazarse\":100,\"Electricidad\":100,\"Encanto\":100,\"Equitación\":100,\"Escuchar\":100,\"Esquivar\":100,\"Historia\":100,\"Intimidar\":100,\"Juego_de_manos\":100,\"Lanzar\":100,\"Otras_lenguas\":100,\"Mecánica\":100,\"Medicina\":100,\"Mitos_de_Cthulhu\":100,\"Nadar\":100,\"Naturaleza\":100,\"Ocultismo\":100,\"Orientarse\":100,\"Persuasión\":100,\"Pilotar\":100,\"Primeros_auxilios\":100,\"Psicoanálisis\":100,\"Psicología\":100,\"Saltar\":100,\"Seguir_rastros\":100,\"Sigilo\":100,\"Supervivencia\":100,\"Tasación\":100,\"Trepar\":100},\"successSkills\":[],\"objects\":{\"\":1},\"weapons\":[],\"cash\":{\"spendingLevel\":10,\"cash\":60,\"assets\":1500},\"combat\":{\"damageBonus\":{\"modifyer\":1,\"dice\":6},\"build\":2},\"conditions\":[]}'),
(22, 36, '{\"data\":{\"name\":\"Marina\",\"age\":29,\"occupation\":\"Anticuario\",\"sex\":\"Mujer\",\"residence\":\"Aranjuez\",\"birthplace\":\"Madrid\"},\"characteristics\":{\"FUE\":15,\"DES\":45,\"POD\":65,\"CON\":75,\"APA\":50,\"EDU\":90,\"TAM\":75,\"INT\":60,\"Mov\":7},\"stats\":{\"currentStats\":{\"hp\":15,\"mp\":13,\"sanity\":65,\"luck\":80},\"maxStats\":{\"hpMax\":15,\"mpMax\":13,\"sanityMax\":65,\"luckMax\":45}},\"skills\":{\"Esquivar\":22},\"successSkills\":[],\"objects\":{},\"weapons\":[],\"cash\":{\"spendingLevel\":50,\"cash\":350,\"assets\":35000},\"combat\":{\"damageBonus\":{\"modifyer\":0,\"dice\":null},\"build\":0},\"conditions\":[]}'),
(23, 37, '{\"data\":{\"name\":\"Nacho\",\"age\":15,\"occupation\":\"Diletante\",\"sex\":\"Hombre\",\"residence\":\"Madrid\",\"birthplace\":\"Madrid\"},\"characteristics\":{\"FUE\":40,\"DES\":60,\"POD\":90,\"CON\":65,\"APA\":70,\"EDU\":50,\"TAM\":55,\"INT\":55,\"Mov\":8},\"stats\":{\"currentStats\":{\"hp\":12,\"mp\":18,\"sanity\":90,\"luck\":65},\"maxStats\":{\"hpMax\":12,\"mpMax\":18,\"sanityMax\":90,\"luckMax\":80}},\"skills\":{\"Esquivar\":30},\"successSkills\":[],\"objects\":{},\"weapons\":[],\"cash\":{\"spendingLevel\":50,\"cash\":250,\"assets\":25000},\"combat\":{\"damageBonus\":{\"modifyer\":0,\"dice\":null},\"build\":0},\"conditions\":[]}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `occupations`
--

CREATE TABLE `occupations` (
  `id_occupation` int(11) NOT NULL,
  `occupationName` varchar(30) NOT NULL,
  `minCredit` int(2) NOT NULL,
  `maxCredit` int(2) NOT NULL,
  `occupationSkills` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`occupationSkills`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `occupations`
--

INSERT INTO `occupations` (`id_occupation`, `occupationName`, `minCredit`, `maxCredit`, `occupationSkills`) VALUES
(1, 'Abogado', 30, 80, '{\n    \"occupationSkill\": {\n        \"number\":\"100\",\n        \"skills\":[\n            \"Buscar_libros\",\n            \"Contabilidad\",\n            \"Derecho\",\n            \"Psicología\"\n        ]\n    },\n    \"interpersonalSkills\": {\n        \"number\": \"2\",\n        \"skills\": [\n            \"Charlatanería\",\n            \"Encanto\",\n            \"Intimidar\",\n            \"Persuasión\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"2\"\n    },\n    \"occupationPoints\":1\n}'),
(2, 'Agente de policía', 9, 30, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",        \n        \"skills\":[\n            \"Arma_corta\",\n            \"Fusil_o_Escopeta\",\n            \"Pelea\",\n            \"Derecho\",\n            \"Descubrir\",\n            \"Primeros_auxilios\",\n            \"Psicología\"\n        ]\n    },\n    \"interpersonalSkills\": {\n        \"number\": \"1\",\n        \"skills\": [\n            \"Charlatanería\",\n            \"Encanto\",\n            \"Intimidar\",\n            \"Persuasión\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"2\"\n    },\n    \"personalSkill\":{\n        \"number\": \"1\",\n        \"skills\": [\n            \"Conducir_automóvil\",\n            \"Equitación\"\n        ]\n    },\n    \"occupationPoints\":2\n}'),
(3, 'Anticuario', 30, 70, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Arte_o_Artesanía\",\n            \"Buscar_libros\",\n            \"Descubrir\",\n            \"Historia\",\n            \"Otras_lenguas\",\n            \"Tasación\"\n        ]\n    },\n    \"interpersonalSkills\": {\n        \"number\": \"1\",\n        \"skills\": [\n            \"Charlatanería\",\n            \"Encanto\",\n            \"Intimidar\",\n            \"Persuasión\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"1\"\n    },\n    \"occupationPoints\":1\n}'),
(4, 'Artista', 9, 50, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Arte_o_Artesanía\",\n            \"Descubrir\",\n            \"Historia\",\n            \"Naturaleza\",\n            \"Otras_lenguas\",\n            \"Psicología\"\n        ]\n    },\n    \"interpersonalSkills\": {\n        \"number\": \"1\",\n        \"skills\": [\n            \"Charlatanería\",\n            \"Encanto\",\n            \"Intimidar\",\n            \"Persuasión\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"2\"\n    },\n    \"occupationPoints\":3\n}'),
(5, 'Atleta profesional', 9, 70, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Pelea\",\n            \"Equitación\",\n            \"Lanzar\",\n            \"Nadar\",\n            \"Saltar\",\n            \"Trepar\"\n        ]\n    },\n    \"interpersonalSkills\": {\n        \"number\": \"1\",\n        \"skills\": [\n            \"Charlatanería\",\n            \"Encanto\",\n            \"Intimidar\",\n            \"Persuasión\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"1\"\n    },\n    \"occupationPoints\":2\n}'),
(6, 'Bibliotecario', 9, 35, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\":[\n            \"Buscar_libro\",\n            \"Contabilidad\",\n            \"Lengua_propia\",\n            \"Otras_lenguas\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"4\"\n    },\n    \"occupationPoints\":1\n}'),
(7, 'Clérigo', 9, 60, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Buscar_libros\",\n            \"Contabilidad\",\n            \"Escuchar\",\n            \"Historia\",\n            \"Otras_lenguas\",\n            \"Psicología\"\n       ]\n    },\n    \"interpersonalSkills\": {\n        \"number\": \"1\",\n        \"skills\": [\n            \"Charlatanería\",\n            \"Encanto\",\n            \"Intimidar\",\n            \"Persuasión\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"1\"\n    },\n    \"occupationPoints\":1\n}'),
(8, 'Criminal', 5, 65, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Descubrir\",\n            \"Psicología\",\n            \"Sigilo\"\n        ]\n    },\n    \"interpersonalSkills\": {\n        \"number\": \"1\",\n        \"skills\": [\n            \"Charlatanería\",\n            \"Encanto\",\n            \"Intimidar\",\n            \"Persuasión\"\n        ]\n    },\n    \"personalSkill\":{\n        \"number\": \"4\",\n        \"skills\": [\n            \"Arma_corta\",\n            \"Fusil_o_Escopeta\",\n            \"Cerrajería\",\n            \"Pelea\",\n            \"Disfrazarse\",\n            \"Juego_de_manos\",\n            \"Mecánica\",\n            \"Tasación\"\n        ]\n    },\n    \"occupationPoints\":2\n}'),
(9, 'Diletante', 50, 99, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Arma_corta\",\n            \"Fusil_o_Escopeta\",\n            \"Arte_o_Artesanía\",\n            \"Equitación\",\n            \"Otras_lenguas\"\n        ]\n    },\n    \"interpersonalSkills\": {\n        \"number\": \"1\",\n        \"skills\": [\n            \"Charlatanería\",\n            \"Encanto\",\n            \"Intimidar\",\n            \"Persuasión\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"3\"\n    },\n    \"occupationPoints\":4\n}'),
(10, 'Escritor', 9, 30, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Literatura\",\n            \"Buscar_libros\",\n            \"Historia\",\n            \"Lengua_propia\",\n            \"Naturaleza\",\n            \"Ciencias_ocultas\",\n            \"Otras_lenguas\",\n            \"Psicología\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"1\"\n    },\n    \"occupationPoints\":1\n}'),
(11, 'Fanático', 0, 30, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Historia\",\n            \"Psicología\",\n            \"Sigilo\"\n        ]\n    },\n    \"interpersonalSkills\": {\n        \"number\": \"2\",\n        \"skills\": [\n            \"Charlatanería\",\n            \"Encanto\",\n            \"Intimidar\",\n            \"Persuasión\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"3\"\n    },\n    \"occupationPoints\":5\n}'),
(12, 'Granjero', 9, 30, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Agricultura\",\n            \"Conducir_automóvil\",\n            \"Conducir_maquinaria\",\n            \"Mecánica\",\n            \"Naturaleza\",\n            \"Seguir_rastros\",\n            \"Psicología\"\n        ]\n    },\n    \"interpersonalSkills\": {\n        \"number\": \"1\",\n        \"skills\": [\n            \"Charlatanería\",\n            \"Encanto\",\n            \"Intimidar\",\n            \"Persuasión\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"1\"\n    },\n    \"occupationPoints\":2\n}'),
(13, 'Ingeniero', 30, 60, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Dibujo_técnico\",\n            \"Buscar_libros\",\n            \"Ingeniería\",\n            \"Física\",\n            \"Conducir_maquinaria\",\n            \"Electricidad\",\n            \"Mecánica\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"1\"\n    },\n    \"occupationPoints\":1\n}'),
(14, 'Inspector de policía', 20, 50, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Arma_corta\",\n            \"Fusil_o_Escopeta\",\n            \"Interpretación\",\n            \"Disfrazarse\",\n            \"Derecho\",\n            \"Descubrir\",\n            \"Escuchar\",\n            \"Psicología\"\n        ]\n    },\n    \"interpersonalSkills\": {\n        \"number\": \"1\",\n        \"skills\": [\n            \"Charlatanería\",\n            \"Encanto\",\n            \"Intimidar\",\n            \"Persuasión\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"1\"\n    },\n    \"occupationPoints\":1\n}'),
(15, 'Intérprete', 9, 70, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Interpretación\",\n            \"Disfrazarse\",\n            \"Escuchar\",\n            \"Psicología\"\n        ]\n    },\n    \"interpersonalSkills\": {\n        \"number\": \"2\",\n        \"skills\": [\n            \"Charlatanería\",\n            \"Encanto\",\n            \"Intimidar\",\n            \"Persuasión\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"2\"\n    },\n    \"occupationPoints\":4\n}'),
(16, 'Investigador privado', 9, 30, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Fotografía\",\n            \"Buscar_libros\",\n            \"Derecho\",\n            \"Descubrir\",\n            \"Disfrazarse\",\n            \"Psicología\"\n        ]\n    },\n    \"interpersonalSkills\": {\n        \"number\": \"1\",\n        \"skills\": [\n            \"Charlatanería\",\n            \"Encanto\",\n            \"Intimidar\",\n            \"Persuasión\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"1\"\n    },\n    \"occupationPoints\":2\n}'),
(17, 'Médico', 30, 80, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Biología\",\n            \"Farmacología\",\n            \"Medicina\",\n            \"Latín\",\n            \"Primeros_auxilios\",\n            \"Psicología\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"2\"\n    },\n    \"occupationPoints\":1\n}'),
(18, 'Miembro de una tribu', 0, 15, '{\n    \"occupationSkill\": {\n        \"number\":\"100\",\n        \"skills\": [\n            \"Ciencias_ocultas\",\n            \"Pelea\",\n            \"Lanzar\",\n            \"Descubrir\",\n            \"Escuchar\",\n            \"Naturaleza\",\n            \"Supervivencia\",\n            \"Trepas\"\n        ]\n    },\n    \"occupationPoints\":2\n}'),
(19, 'Misionero', 0, 30, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Arte_o_Artesanía\",\n            \"Medicina\",\n            \"Mecánica\",\n            \"Naturaleza\"\n        ]\n    },\n    \"interpersonalSkills\": {\n        \"number\": \"1\",\n        \"skills\": [\n            \"Charlatanería\",\n            \"Encanto\",\n            \"Intimidar\",\n            \"Persuasión\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"2\"\n    },\n    \"occupationPoints\":1\n}'),
(20, 'Músico', 9, 30, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Instrumento\",\n            \"Escuchar\",\n            \"Psicología\"\n        ]\n    },\n    \"interpersonalSkills\": {\n        \"number\": \"1\",\n        \"skills\": [\n            \"Charlatanería\",\n            \"Encanto\",\n            \"Intimidar\",\n            \"Persuasión\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"4\"\n    },\n    \"occupationPoints\":3\n}'),
(21, 'Oficial militar', 20, 70, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Arma_corta\",\n            \"Fusil_o_Escopeta\",\n            \"Contabilidad\",\n            \"Orientarse\",\n            \"Psicología\",\n            \"Supervivencia\"\n       ]\n    },\n    \"interpersonalSkills\": {\n        \"number\": \"2\",\n        \"skills\": [\n            \"Charlatanería\",\n            \"Encanto\",\n            \"Intimidar\",\n            \"Persuasión\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"1\"\n    },\n    \"occupationPoints\":2\n}'),
(22, 'Parapsicólogo', 9, 30, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Antropología\",\n            \"Fotografía\",\n            \"Buscar_libros\",\n            \"Ciencias_ocultas\",\n            \"Historia\",\n            \"Otras_lenguas\",\n            \"Psicología\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"1\"\n    },\n    \"occupationPoints\":1\n}'),
(23, 'Periodista', 9, 30, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Fotografía\",\n            \"Buscar_libros\",\n            \"Historia\",\n            \"Lengua_propia\",\n            \"Psicología\"\n        ]\n    },\n    \"interpersonalSkills\": {\n        \"number\": \"1\",\n        \"skills\": [\n            \"Charlatanería\",\n            \"Encanto\",\n            \"Intimidar\",\n            \"Persuasión\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"2\"\n    },\n    \"occupationPoints\":1\n}'),
(24, 'Piloto', 20, 70, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Astronomía\",\n            \"Conducir_maquinaria\",\n            \"Electricidad\",\n            \"Mecánica\",\n            \"Orientarse\",\n            \"Pilotar_aeronave\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"2\"\n    },\n    \"occupationPoints\":6\n}'),
(25, 'Profesor de universidad', 20, 70, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Buscar_libros\",\n            \"Lengua_propia\",\n            \"Otras_lenguas\",\n            \"Psicología\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"4\"\n    },\n    \"occupationPoints\":1\n}'),
(26, 'Soldado', 9, 30, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Arma_corta\",\n            \"Fusil_o_Escopeta\",\n            \"Pelea\",\n            \"Esquivar\",\n            \"Sigilo\",\n            \"Supervivencia\",\n            \"Trepar\",\n            \"Nadar\"\n        ]\n    },\n    \"personalSkill\":{\n        \"number\": \"2\",\n        \"skills\": [\n            \"Mecánica\",\n            \"Otras_lenguas\",\n            \"Primeros_auxilios\"\n        ]\n    },\n    \"occupationPoints\":2\n}'),
(27, 'Vagabundo', 0, 5, '{\n    \"occupationSkill\": {\n        \"number\": \"100\",\n        \"skills\": [\n            \"Escuchar\",\n            \"Orientarse\",\n            \"Saltar\",\n            \"Sigilo\",\n            \"Trepar\"\n        ]\n    },\n    \"interpersonalSkills\": {\n        \"number\": \"1\",\n        \"skills\": [\n            \"Charlatanería\",\n            \"Encanto\",\n            \"Intimidar\",\n            \"Persuasión\"\n        ]\n    },\n    \"extraSkills\": {\n        \"number\": \"2\"\n    },\n    \"occupationPoints\":7\n}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personajes`
--

CREATE TABLE `personajes` (
  `id_character` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personajes`
--

INSERT INTO `personajes` (`id_character`, `name`, `id_user`) VALUES
(34, 'Toad', 3),
(35, 'Skain', 3),
(36, 'Marina', 3),
(37, 'Nacho', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_user` int(11) NOT NULL,
  `userName` varchar(8) NOT NULL,
  `pass` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_user`, `userName`, `pass`) VALUES
(1, 'Pedro', '1234'),
(3, 'Paco', '12345'),
(5, 'Daniel', '12345'),
(26, 'pochipoo', '1725'),
(27, 'Toad', 'Amarillo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `hoja`
--
ALTER TABLE `hoja`
  ADD PRIMARY KEY (`id_sheet`),
  ADD KEY `id_character_id_sheet` (`id_character`);

--
-- Indices de la tabla `occupations`
--
ALTER TABLE `occupations`
  ADD PRIMARY KEY (`id_occupation`);

--
-- Indices de la tabla `personajes`
--
ALTER TABLE `personajes`
  ADD PRIMARY KEY (`id_character`),
  ADD KEY `id_user_id_character` (`id_user`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `hoja`
--
ALTER TABLE `hoja`
  MODIFY `id_sheet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `occupations`
--
ALTER TABLE `occupations`
  MODIFY `id_occupation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `personajes`
--
ALTER TABLE `personajes`
  MODIFY `id_character` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `hoja`
--
ALTER TABLE `hoja`
  ADD CONSTRAINT `id_character_id_sheet` FOREIGN KEY (`id_character`) REFERENCES `personajes` (`id_character`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `personajes`
--
ALTER TABLE `personajes`
  ADD CONSTRAINT `id_user_id_character` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
