-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 09, 2020 at 04:30 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `documentTracking`
--

-- --------------------------------------------------------

--
-- Table structure for table `divisions`
--

CREATE TABLE `divisions` (
  `depid` int(3) NOT NULL,
  `department` varchar(50) NOT NULL,
  `depshort` varchar(20) NOT NULL,
  `payrollshort` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `divisions`
--

INSERT INTO `divisions` (`depid`, `department`, `depshort`, `payrollshort`) VALUES
(1, 'Maritime Training and Assessment Division', 'MTAD', 'A11a'),
(2, 'Maritime Research and Development Division', 'MRDD', 'Allb'),
(3, 'Administrative and Financial Management Division', 'AFMD', 'A1a	'),
(4, 'Office of the Executive Director', 'OED', 'OED/DED');

-- --------------------------------------------------------

--
-- Table structure for table `documentStatus`
--

CREATE TABLE `documentStatus` (
  `statid` int(5) NOT NULL,
  `stat_remarks` varchar(150) NOT NULL,
  `on_remarks` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `documentStatus`
--

INSERT INTO `documentStatus` (`statid`, `stat_remarks`, `on_remarks`) VALUES
(1, 'MRMS', 1),
(2, 'BAC', 1),
(3, 'AFMD', 1),
(4, 'END USER', 1),
(5, 'AFMD Canvasser', 1),
(6, 'MTAD Canvasser', 1),
(7, 'MRDD Canvasser', 1),
(9, 'General Canvasser', 1),
(10, 'COMPLETED', 1),
(11, 'CANCELLED', 1),
(99, 'System Admin', 0);

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `secid` int(5) NOT NULL,
  `divid` int(4) NOT NULL,
  `section` varchar(50) NOT NULL,
  `secshort` varchar(20) NOT NULL,
  `active` int(1) NOT NULL,
  `types` int(11) NOT NULL,
  `orderby` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`secid`, `divid`, `section`, `secshort`, `active`, `types`, `orderby`) VALUES
(1, 2, 'Information and Marketing Section', 'IMS', 1, 0, 0),
(2, 2, 'Research Section', 'Research', 1, 0, 0),
(3, 4, 'Office of the Executive Director', 'OED', 1, 0, 2),
(4, 4, 'Deputy Executive Directors Office', 'DED', 1, 0, 1),
(5, 3, 'Cash Section', 'Cash', 1, 0, 0),
(6, 3, 'Accounting Unit', 'Accounting', 1, 29, 0),
(7, 2, 'Planning Section', 'Planning', 1, 0, 0),
(8, 4, 'NMP Manila Office', 'NMPMNL', 1, 0, 0),
(9, 4, 'Quality Management Section', 'QMS', 1, 0, 0),
(10, 1, 'Maritime Training Section', 'MTS', 1, 0, 0),
(11, 4, 'Bids and Awards Committee', 'BAC', 1, 0, 0),
(12, 2, 'Learning Resource Section', 'LRS', 1, 0, 0),
(13, 3, 'Domiciliary Section', 'Dorm', 1, 0, 0),
(14, 3, 'Human Resource Management Section', 'HRMS', 1, 0, 0),
(15, 3, 'Office of the Head, AFMD', 'AFMD', 1, 0, 1),
(16, 3, 'General Services and Auxiliary Section', 'GSAS', 1, 0, 0),
(17, 3, 'Budget Unit', 'Budget', 1, 29, 0),
(18, 3, 'Material Resource Management Section', 'MRMS', 1, 0, 0),
(19, 3, 'Records Section', 'Records', 1, 0, 0),
(20, 3, 'Motor Pool Unit', 'Motor Pool', 1, 0, 0),
(21, 1, 'Office of the Head, MTAD', 'MTAD', 1, 0, 1),
(22, 1, 'PDC Unit', 'PDC', 1, 0, 0),
(23, 1, 'Maritime Assessment Section', 'MAS', 1, 0, 0),
(24, 1, 'Support to MTAD Operations Section', 'SMOS', 1, 0, 0),
(25, 1, 'Registration and Certification Unit', 'Registrar', 1, 0, 0),
(26, 1, 'Technical Operations and Secretarial Pool Unit', 'TOS', 1, 0, 0),
(27, 2, 'Office of the Head, MRDD', 'MRDD', 1, 0, 1),
(28, 0, 'COA', 'COA', 1, 0, 0),
(29, 3, 'Finance Section', 'Finance', 1, 0, 0),
(30, 0, 'Various Sections', 'Various Sec', 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `employeeId` varchar(120) NOT NULL,
  `name` varchar(120) NOT NULL,
  `username` varchar(120) NOT NULL,
  `password` varchar(120) NOT NULL,
  `contact` varchar(120) NOT NULL,
  `email` varchar(120) NOT NULL,
  `section` varchar(11) NOT NULL,
  `position` varchar(120) NOT NULL,
  `address` varchar(120) NOT NULL,
  `gender` varchar(120) NOT NULL,
  `bdate` varchar(120) NOT NULL,
  `role` varchar(11) NOT NULL,
  `status` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `employeeId`, `name`, `username`, `password`, `contact`, `email`, `section`, `position`, `address`, `gender`, `bdate`, `role`, `status`) VALUES
(3, '20190931', 'Aljon C. Tocayon', 'actWhiteHat27', '$2b$10$Ua01PGxt4Jh46MA91UtS4O68HxIx/EsylWXg/D2k1BDXRohWAnqce', '09051680244', 'atocayon27@gmail.com', '1', 'Computer Programmer', 'Jaro, Leyte', 'Male', '1996-10-05', '1', '1'),
(4, 'Voluptatem omnis ab', 'Keegan Craft', 'luligyb', '$2b$10$IwL0xBwUoJpXbudPV1tHreW8IsSaAyODtRn5NeOxdHCpUTe3Sy6u6', '752', 'xyxu@mailinator.com', '1', 'Nostrum quis est ut ', 'Cupiditate aut dolor', '29-Jan-1973', 'female', '2', '1'),
(5, 'Blanditiis quo venia', 'Pandora Morse', 'qowukev', '$2b$10$9z1b7mdDFs5b5D819wrWTe3UB.rWMNDu9jii2U9e4oEBA2RPaMX6y', '589', 'vodunonem@mailinator.net', '1', 'Vel officia sunt quo', 'Consectetur et atqu', '18-Feb-2017', 'other', '1', '1'),
(6, 'Consequatur blandit', 'Tarik Silva', 'jaxirynu', '$2b$10$To7uZxVVIYsjzVzkMJA2S.IxlbnmvMSOgw3OXzqCZxsJhvfToUHEq', '955', 'wowog@mailinator.com', '1', 'Impedit excepteur s', 'Sit ut et quae exce', '20-Aug-1970', 'male', '1', '1'),
(7, '', '', '', '$2b$10$wIoEgbeN3YfeWRK75CxbqeBhKCbmtHmP2B0xNdTepH6i..TP0ystS', '', '', '1', '', '', '', '', '1', '3');

-- --------------------------------------------------------

--
-- Table structure for table `users_role`
--

CREATE TABLE `users_role` (
  `role_id` int(11) NOT NULL,
  `role` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_role`
--

INSERT INTO `users_role` (`role_id`, `role`) VALUES
(1, 'admin'),
(2, 'member');

-- --------------------------------------------------------

--
-- Table structure for table `users_session`
--

CREATE TABLE `users_session` (
  `id` int(11) NOT NULL,
  `userId` varchar(11) NOT NULL,
  `timeStamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDeleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_session`
--

INSERT INTO `users_session` (`id`, `userId`, `timeStamp`, `isDeleted`) VALUES
(1, '3', '2020-04-08 13:25:29', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users_status`
--

CREATE TABLE `users_status` (
  `status_id` int(11) NOT NULL,
  `status` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_status`
--

INSERT INTO `users_status` (`status_id`, `status`) VALUES
(1, 'active'),
(2, 'deactivated'),
(3, 'deleted');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `divisions`
--
ALTER TABLE `divisions`
  ADD PRIMARY KEY (`depid`);

--
-- Indexes for table `documentStatus`
--
ALTER TABLE `documentStatus`
  ADD PRIMARY KEY (`statid`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`secid`),
  ADD UNIQUE KEY `section` (`section`),
  ADD KEY `divid` (`divid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `users_role`
--
ALTER TABLE `users_role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `users_session`
--
ALTER TABLE `users_session`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_status`
--
ALTER TABLE `users_status`
  ADD PRIMARY KEY (`status_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `divisions`
--
ALTER TABLE `divisions`
  MODIFY `depid` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `documentStatus`
--
ALTER TABLE `documentStatus`
  MODIFY `statid` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `secid` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users_role`
--
ALTER TABLE `users_role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users_session`
--
ALTER TABLE `users_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users_status`
--
ALTER TABLE `users_status`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
