-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2024 at 07:19 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `angelpvtltd`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `departmant_name` varchar(30) NOT NULL DEFAULT 'IT Department',
  `department_id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`departmant_name`, `department_id`) VALUES
('IT Department', 'D001'),
('HR Department', 'D002'),
('Construction Department', 'D003');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `message_id` int(200) NOT NULL,
  `message_content` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `sender` varchar(10) NOT NULL,
  `receiver` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`message_id`, `message_content`, `date`, `sender`, `receiver`) VALUES
(65, 'hello', '2024-04-25 10:34:15', 'A001', 'E001');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `project_id` varchar(20) NOT NULL,
  `project_name` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `description` varchar(255) NOT NULL,
  `department_id` varchar(20) NOT NULL,
  `eid` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_id`, `project_name`, `start_date`, `end_date`, `description`, `department_id`, `eid`) VALUES
('P001', 'Angel (pvt) ltd. Employee management system', '2024-04-03', '2024-04-30', 'Create a web site using React JS, Node JS, Express JS and MySQL Database. This is a web application to manage employees in 3 categories as Admins, Managers and Employees.', 'D001', 'M001'),
('P002', 'test ', '2024-04-11', '2024-04-27', 'test 1', 'D002', 'M001');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `task_id` int(11) NOT NULL,
  `task_name` varchar(100) DEFAULT NULL,
  `task_description` text DEFAULT NULL,
  `date` date DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `review` varchar(200) DEFAULT NULL,
  `progress` varchar(200) DEFAULT NULL,
  `eid` varchar(20) DEFAULT NULL,
  `project_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`task_id`, `task_name`, `task_description`, `date`, `start_time`, `end_time`, `review`, `progress`, `eid`, `project_id`) VALUES
(26, 'Implement Management Component', 'Management component should have google form adding, vacation requesting and approving. ', '2024-04-24', '08:00:00', '13:00:00', 'Still going', 'Not started', 'M001', 'P001');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `eid` varchar(10) NOT NULL,
  `employee_name` varchar(200) NOT NULL,
  `dob` date NOT NULL,
  `email` varchar(30) NOT NULL,
  `mobile` int(10) NOT NULL,
  `address` varchar(220) NOT NULL,
  `password` varchar(15) NOT NULL,
  `position` varchar(10) DEFAULT 'Admin',
  `job` varchar(50) NOT NULL DEFAULT 'Admin Work',
  `department_id` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`eid`, `employee_name`, `dob`, `email`, `mobile`, `address`, `password`, `position`, `job`, `department_id`) VALUES
('A001', 'Chathuranga Niroshana', '1998-10-21', 'niroshana.c.n.j@gmail.com', 787767237, 'Malabe', 'chathu niro75', 'Admin', 'HR', NULL),
('A002', 'Admin 2', '1111-11-11', 'kent@gmail.com', 1109, 'bhbh', '123456', 'Admin', '1njn', NULL),
('E001', 'Clark Kent', '1992-02-23', 'clark@gmail.com', 712384734, 'Kandy', '123456', 'Employee', 'Web designer', 'D001'),
('M001', 'John Doe', '2002-12-13', 'john@gmail.com', 112948376, 'Colombo,Sri Lanka', 'chathu niro75', 'Manager', 'frontend engineer', 'D001');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `sender` (`sender`),
  ADD KEY `receiver` (`receiver`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `eid` (`eid`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `eid` (`eid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`eid`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `department_id` (`department_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `message_id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `user` (`eid`),
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`receiver`) REFERENCES `user` (`eid`);

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`),
  ADD CONSTRAINT `project_ibfk_2` FOREIGN KEY (`eid`) REFERENCES `user` (`eid`);

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`),
  ADD CONSTRAINT `task_ibfk_2` FOREIGN KEY (`eid`) REFERENCES `user` (`eid`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
