-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 04, 2020 at 04:45 PM
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
  `depid` int(11) NOT NULL,
  `department` varchar(120) NOT NULL,
  `depshort` varchar(120) NOT NULL,
  `payrollshort` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- Table structure for table `documentDrafts`
--

CREATE TABLE `documentDrafts` (
  `draft_id` int(11) NOT NULL,
  `documentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `documentLogs`
--

CREATE TABLE `documentLogs` (
  `trans_id` int(11) NOT NULL,
  `document_id` varchar(11) NOT NULL,
  `user_id` varchar(11) NOT NULL,
  `remarks` varchar(120) NOT NULL,
  `destinationType` varchar(120) NOT NULL,
  `destination` varchar(120) NOT NULL,
  `status` varchar(11) NOT NULL,
  `date_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `documentLogs`
--

INSERT INTO `documentLogs` (`trans_id`, `document_id`, `user_id`, `remarks`, `destinationType`, `destination`, `status`, `date_time`) VALUES
(1, '1000000000', '3', 'none', 'Internal', 'Registrar', '2', '2020-04-27 09:46:41'),
(2, '1000000000', '3', 'none', 'Internal', 'none', '5', '2020-04-27 09:46:41'),
(3, '1000000000', '3', 'none', 'Internal', 'GSAS', '2', '2020-04-27 09:46:41');

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `documentID` int(11) NOT NULL,
  `creator` varchar(11) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `doc_type` varchar(11) NOT NULL,
  `note` varchar(200) NOT NULL,
  `date_time_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`documentID`, `creator`, `subject`, `doc_type`, `note`, `date_time_created`, `status`) VALUES
(1000000000, '3', '402', '9', 'Impedit dicta quia ', '2020-04-27 09:46:41', '1');

-- --------------------------------------------------------

--
-- Table structure for table `documentStatus`
--

CREATE TABLE `documentStatus` (
  `statid` int(5) NOT NULL,
  `status` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `documentStatus`
--

INSERT INTO `documentStatus` (`statid`, `status`) VALUES
(1, 'receive'),
(2, 'forwarded'),
(3, 'return'),
(4, 'completed'),
(5, 'created'),
(6, 'external'),
(7, 'MRDD Canvasser'),
(9, 'General Canvasser'),
(10, 'COMPLETED'),
(11, 'CANCELLED'),
(99, 'System Admin');

-- --------------------------------------------------------

--
-- Table structure for table `document_action_req`
--

CREATE TABLE `document_action_req` (
  `document_action_req_id` int(11) NOT NULL,
  `documentID` varchar(11) NOT NULL,
  `action_req` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `document_action_req`
--

INSERT INTO `document_action_req` (`document_action_req_id`, `documentID`, `action_req`) VALUES
(1, '1000000000', 'For Approval'),
(2, '1000000000', 'For Signature'),
(3, '1000000000', 'For Action'),
(4, '1000000000', 'For Comment'),
(5, '1000000000', 'For Information'),
(6, '1000000000', 'For File');

-- --------------------------------------------------------

--
-- Table structure for table `document_type`
--

CREATE TABLE `document_type` (
  `id` int(11) NOT NULL,
  `type` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `document_type`
--

INSERT INTO `document_type` (`id`, `type`) VALUES
(1, 'Certificate of Service'),
(2, 'Disbursement Voucher'),
(3, 'Inventory and Inspection Report'),
(4, 'Letter'),
(5, 'Liquidation Report'),
(6, 'Memorandum'),
(7, 'Memorandum of Agreement'),
(8, 'Memorandum Receipt'),
(9, 'Official Cash Book'),
(10, 'Personal Data Sheet'),
(11, 'Purchase Order'),
(12, 'Purchase Request'),
(13, 'Referral Slip'),
(14, 'Request for Obligation of Allotments'),
(15, 'Requisition and Issue Voucher'),
(16, 'Unclassified');

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `secid` int(5) NOT NULL,
  `divid` int(4) NOT NULL,
  `section` varchar(50) NOT NULL,
  `secshort` varchar(20) NOT NULL,
  `active` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`secid`, `divid`, `section`, `secshort`, `active`) VALUES
(1, 2, 'Information and Marketing Section', 'IMS', 1),
(2, 2, 'Research Section', 'Research', 1),
(3, 4, 'Office of the Executive Director', 'OED', 1),
(4, 4, 'Deputy Executive Directors Office', 'DED', 1),
(5, 3, 'Cash Section', 'Cash', 1),
(6, 3, 'Accounting Unit', 'Accounting', 1),
(7, 2, 'Planning Section', 'Planning', 1),
(8, 4, 'NMP Manila Office', 'NMPMNL', 1),
(9, 4, 'Quality Management Section', 'QMS', 1),
(10, 1, 'Maritime Training Section', 'MTS', 1),
(11, 4, 'Bids and Awards Committee', 'BAC', 1),
(12, 2, 'Learning Resource Section', 'LRS', 1),
(13, 3, 'Domiciliary Section', 'Dorm', 1),
(14, 3, 'Human Resource Management Section', 'HRMS', 1),
(15, 3, 'Office of the Head, AFMD', 'AFMD', 1),
(16, 3, 'General Services and Auxiliary Section', 'GSAS', 1),
(17, 3, 'Budget Unit', 'Budget', 1),
(18, 3, 'Material Resource Management Section', 'MRMS', 1),
(19, 3, 'Records Section', 'Records', 1),
(20, 3, 'Motor Pool Unit', 'Motor Pool', 1),
(21, 1, 'Office of the Head, MTAD', 'MTAD', 1),
(22, 1, 'PDC Unit', 'PDC', 1),
(23, 1, 'Maritime Assessment Section', 'MAS', 1),
(24, 1, 'Support to MTAD Operations Section', 'SMOS', 1),
(25, 1, 'Registration and Certification Unit', 'Registrar', 1),
(26, 1, 'Technical Operations and Secretarial Pool Unit', 'TOS', 1),
(27, 2, 'Office of the Head, MRDD', 'MRDD', 1),
(28, 0, 'COA', 'COA', 1),
(29, 3, 'Finance Section', 'Finance', 1),
(30, 0, 'Various Sections', 'Various Sec', 1),
(31, 1, '29', 'Cedric Acosta', 1),
(33, 2, 'Naida Mann', 'Sybil Cohen', 1),
(34, 3, 'Aaron Brock', 'Melanie King', 1);

-- --------------------------------------------------------

--
-- Table structure for table `system_logs`
--

CREATE TABLE `system_logs` (
  `system_logs_id` int(11) NOT NULL,
  `user_id` varchar(11) NOT NULL,
  `activity` varchar(120) NOT NULL,
  `date_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `role` varchar(11) NOT NULL,
  `status` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `employeeId`, `name`, `username`, `password`, `contact`, `email`, `section`, `position`, `role`, `status`) VALUES
(3, '1246579', 'Aljon C. Tocayon', 'kixomadiso', '$2b$10$Ua01PGxt4Jh46MA91UtS4O68HxIx/EsylWXg/D2k1BDXRohWAnqce', '819', 'atocayon27@gmail.com', '1', 'Delectus velit mag', '3', '1'),
(5, '32', 'Ahmed Lambasdd', 'kixomadiso', '$2b$10$9z1b7mdDFs5b5D819wrWTe3UB.rWMNDu9jii2U9e4oEBA2RPaMX6y', '819', 'wefezez@mailinator.com', '12', 'Delectus velit mag', '3', '1'),
(7, '32', 'Ahmed Lambasdd', 'kixomadiso', '$2b$10$wIoEgbeN3YfeWRK75CxbqeBhKCbmtHmP2B0xNdTepH6i..TP0ystS', '819', 'wefezez@mailinator.com', '5', 'Delectus velit mag', '1', '3'),
(9, '32', 'Ahmed Lambasdd', 'kixomadiso', '$2b$10$bDqhM9nKpL5t/.7Ijpx/WODLN38ngzNsMgN.ai1XWrQsWX1TmefA6', '819', 'wefezez@mailinator.com', '5', 'Delectus velit mag', '2', '1'),
(12, '32', 'Ahmed Lambasddqwert', 'kixomadiso', '$2b$10$YhzEHCruGsyj1.y9XIJrhOXaxxi46JeJVNYhsLJkIQ9M.sBD5dssu', '819', 'wefezez@mailinator.com', '5', 'Delectus velit mag', '1', '1'),
(14, '32123344', 'Ahmed Lambasdd', 'kixomadiso', '$2b$10$WC/sstI4UMjOQ/4J4QGkJebdkRZu/f4JVJj7eVcyYRI3DCQUFk832', '819', 'wefezez@mailinator.com', '5', 'Delectus velit mag', '2', '1'),
(16, '32', 'Ahmed Lambasddasdd', 'kixomadiso', '$2b$10$y3L7XiC0UxHyq/X6cB8UbuohgmuppyGSViXkEZkDpbBdzVBRGu4Zi', '819', 'wefezez@mailinator.com', '5', 'Delectus velit mag', '1', '1'),
(17, '32', 'Ahmed Lambasdd', 'kixomadiso', '$2b$10$hfHkZheFBiIZKuw24CjCJuyUXKZSmpH1uBjb62T1ImzvV01ssDHx6', '819', 'wefezez@mailinator.com', '5', 'Delectus velit mag', '1', '1'),
(18, '32', 'Ahmed Lambasdd', 'kixomadiso', '$2b$10$.Mk656fY0go05skBJJRHTunnCUg3bEpCSYLIYIxAePrI9XAPyUvOi', '819', 'wefezez@mailinator.com', '5', 'Delectus velit mag', '1', '1'),
(20, '12', 'Ahmed Lambasdd', 'kixomadiso', '$2b$10$e/CpdYhCzvboBbVV.7b8MOkJ1HQLwyv28X919WTmICGWK4YnElYAS', '819', 'wefezez@mailinator.com', '10', 'Delectus velit mag', '1', '1'),
(21, '32', 'Ahmed Lambasdd', 'kixomadiso', '$2b$10$471/iMXLwaCpq3UG0NxbA.1uShH2aX42COOtgD.ZvcLjTdwMB.Vty', '819', 'wefezez@mailinator.com', '5', 'Delectus velit mag', '1', '1'),
(22, '32', 'Ahmed Lambasdd', 'kixomadiso', '$2b$10$H5TLJuMSXeubqCk3zeyLAunol07QqqQoLjyXJIdAv.7e.yPnoRrzm', '819', 'wefezez@mailinator.com', '6', 'Delectus velit mag', '1', '1'),
(25, '32', 'Ahmed Lambasdd', 'kixomadiso', '$2b$10$Ft11BD7iD6TtVerko5FYR.bKpBsEzXzYyFMN5O7IoRZaBQF1G.dBm', '819', 'wefezez@mailinator.com', '5', 'Delectus velit mag', '2', '1'),
(31, '32', 'Ahmed Lambasddop', 'kixomadiso', '$2b$10$sPk1L/EWivjEvqkidf408O8O84mVoRXdp3x1ZYzVFpSkV/9mHl7h.', '819', 'wefezez@mailinator.com', '5', 'Delectus velit mag', '1', '1'),
(34, '32', 'Ahmedasdasd', 'kixomadisoasdasd', '$2b$10$Per9ar/I4FjxWo8Ery.WSeCMg37hEpLjEwkozLSSW9WS6YqwINyCK', '819', 'wefezez@mailinator.com', '5', 'Delectus velit mag', '1', '1'),
(36, '32', 'Ahmed sddd', 'kixomadiso', '$2b$10$ALNbinyMFUdY1Zg0lm5qU.CGkQno/lGAoWSQJh0NaVD.IRNZnwt.i', '819', 'wefezez@mailinator.com', '5', 'Delectus velit mag', '1', '1'),
(37, '7895456', 'Ahmed Lambasdd', 'kixomadiso', '$2b$10$sthMqzu1bCupzP3uB7MakO4vOsi8kBw5zDALdK7veGfIriA5BYio6', '819', 'wefezez@mailinator.com', '13', 'Delectus velit mag', '1', '1'),
(38, '32', 'Ahmed Lambasdd', 'kixomadiso', '$2b$10$Sp9v2NsySFbKYv5PLJ0D6eHfskZ0TGsBq.c6pcHKYasn6jxxy3ppe', '819', 'wefezez@mailinator.com', '5', 'Delectus velit mag', '1', '1'),
(39, '32', 'Ahmed Lambasdd', 'kixomadiso', '$2b$10$VbFoNWKo.0jNifPpj.0Z8Ohjg8D720fYTM1ynXTegQENQYMGt/bxi', '819', 'wefezez@mailinator.com', '17', 'Delectus velit mag', '1', '1'),
(41, '32', 'Ahmed Lambasdd', 'kixomadiso', '$2b$10$cpDUNhP0tXrfjbssE3iOMeoa.65N5oJWx5UUZY4nVHGx0Rs7s9P3O', '819', 'wefezez@mailinator.com', '5', 'Delectus velit mag', '1', '1'),
(42, '3212', 'Ahmed Lambasddzxcc', 'kixomadisozxcc', '$2b$10$1NFtuTfW/4WntYSjWYwS2.F9SLV9TryTtC2C/qymdqYeLkfduxLZ.', '819', 'wefezez@mailinator.com', '5', 'Delectus velit mag', '1', '1'),
(44, '47', 'Judah Washington', 'qaqul', '$2b$10$Nb9V/sxTuOhBuJG17WkFLOgx8P7QmUMJQD6b7viuKdD9lYeQO96uW', '16', 'limut@mailinator.net', '22', 'Vel aliquip non dolo', '1', '1'),
(45, '96', 'Camden Roberts', 'fatetyqi', '$2b$10$.hcvR3Op7bXRP6GdYaOkUuT3mW8zmkdt96VrI09FTK.Aofq3LjK7a', '328', 'sizadu@mailinator.net', '24', 'Minim do asperiores ', '1', '1');

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
(2, 'member'),
(3, 'super_admin');

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
(1, '3', '2020-05-03 03:09:11', 0);

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
-- Indexes for table `documentDrafts`
--
ALTER TABLE `documentDrafts`
  ADD PRIMARY KEY (`draft_id`);

--
-- Indexes for table `documentLogs`
--
ALTER TABLE `documentLogs`
  ADD PRIMARY KEY (`trans_id`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`documentID`);

--
-- Indexes for table `documentStatus`
--
ALTER TABLE `documentStatus`
  ADD PRIMARY KEY (`statid`);

--
-- Indexes for table `document_action_req`
--
ALTER TABLE `document_action_req`
  ADD PRIMARY KEY (`document_action_req_id`);

--
-- Indexes for table `document_type`
--
ALTER TABLE `document_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`secid`),
  ADD UNIQUE KEY `section` (`section`),
  ADD KEY `divid` (`divid`);

--
-- Indexes for table `system_logs`
--
ALTER TABLE `system_logs`
  ADD PRIMARY KEY (`system_logs_id`);

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
  MODIFY `depid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `documentDrafts`
--
ALTER TABLE `documentDrafts`
  MODIFY `draft_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `documentLogs`
--
ALTER TABLE `documentLogs`
  MODIFY `trans_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `documentStatus`
--
ALTER TABLE `documentStatus`
  MODIFY `statid` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `document_action_req`
--
ALTER TABLE `document_action_req`
  MODIFY `document_action_req_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `document_type`
--
ALTER TABLE `document_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `secid` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `system_logs`
--
ALTER TABLE `system_logs`
  MODIFY `system_logs_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `users_role`
--
ALTER TABLE `users_role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
