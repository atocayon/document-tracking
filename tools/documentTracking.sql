-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 11, 2020 at 08:28 AM
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

--
-- Dumping data for table `documentDrafts`
--

INSERT INTO `documentDrafts` (`draft_id`, `documentID`) VALUES
(4, 1000000006);

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
(3, '1000000000', '3', 'none', 'Internal', 'GSAS', '2', '2020-04-27 09:46:41'),
(4, '1000000001', '3', 'none', 'External', 'asdd', '2', '2020-05-08 02:43:17'),
(5, '1000000002', '3', 'none', 'External', 'asdsd', '2', '2020-05-08 02:48:23'),
(6, '1000000003', '3', 'none', 'External', 'none', '5', '2020-05-08 02:52:03'),
(7, '1000000003', '3', 'none', 'External', 'asdd', '2', '2020-05-08 02:52:03'),
(8, '1000000004', '3', 'none', 'Internal', 'none', '5', '2020-05-08 02:52:52'),
(9, '1000000004', '3', 'none', 'Internal', 'Motor Pool', '2', '2020-05-08 02:52:52'),
(10, '1000000005', '3', 'none', 'External', 'none', '5', '2020-05-08 02:54:30'),
(11, '1000000005', '3', 'none', 'External', 'asdd', '2', '2020-05-08 02:54:30'),
(12, '1000000005', '3', 'none', 'External', 'asdd', '2', '2020-05-08 02:54:30'),
(13, '1000000007', '49', 'none', 'Internal', 'none', '5', '2020-05-08 05:47:46'),
(14, '1000000007', '49', 'none', 'Internal', 'IMS', '2', '2020-05-08 05:47:46'),
(15, '1000000007', '49', 'none', 'Internal', 'Planning', '2', '2020-05-08 05:47:46'),
(29, '1000000007', '50', 'none', 'Internal', 'none', '1', '2020-05-11 06:16:36');

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
(1000000000, '3', '402', '9', 'Impedit dicta quia ', '2020-04-27 09:46:41', '1'),
(1000000001, '3', '505', '14', 'Sapiente nisi sit ea', '2020-05-08 02:43:17', '1'),
(1000000002, '3', '892', '16', 'Blanditiis fugiat ha', '2020-05-08 02:48:23', '1'),
(1000000003, '3', '99', '6', 'Sint irure dolor off', '2020-05-08 02:52:03', '1'),
(1000000004, '3', '412', '5', 'Enim qui sunt id hic', '2020-05-08 02:52:52', '1'),
(1000000005, '3', '253', '14', 'Ab incididunt beatae', '2020-05-08 02:54:30', '1'),
(1000000006, '3', '560', '7', 'Soluta inventore off', '2020-05-08 03:19:29', '0'),
(1000000007, '49', '862', '7', 'Asperiores omnis qua', '2020-05-08 05:47:46', '1');

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
(6, '1000000000', 'For File'),
(7, '1000000001', 'For Approval'),
(8, '1000000001', 'For Endorsement'),
(9, '1000000001', 'For Action'),
(10, '1000000001', 'For File'),
(11, '1000000002', 'For Signature'),
(12, '1000000002', 'For Endorsement'),
(13, '1000000002', 'For Action'),
(14, '1000000002', 'For File'),
(15, '1000000003', 'For Approval'),
(16, '1000000003', 'For Signature'),
(17, '1000000003', 'For Endorsement'),
(18, '1000000003', 'For Recommendation'),
(19, '1000000003', 'For Action'),
(20, '1000000003', 'For Comment'),
(21, '1000000003', 'For File'),
(22, '1000000004', 'For Approval'),
(23, '1000000004', 'For Action'),
(24, '1000000004', 'For Comment'),
(25, '1000000004', 'For Information'),
(26, '1000000004', 'For File'),
(27, '1000000005', 'For Approval'),
(28, '1000000005', 'For Comment'),
(29, '1000000005', 'For File'),
(30, '1000000006', 'For Signature'),
(31, '1000000006', 'For Endorsement'),
(32, '1000000006', 'For Action'),
(33, '1000000007', 'For Action');

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
(1, 2, 'Information Marketing Section', 'IMS', 1),
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
(30, 0, 'Various Sections', 'Various Sec', 1);

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
(3, '20190410', 'Aljon C. Tocayon', 'actWhiteHat27', '$2b$10$Ua01PGxt4Jh46MA91UtS4O68HxIx/EsylWXg/D2k1BDXRohWAnqce', '09051680244', 'atocayon27@gmail.com', '1', 'Computer Programmer', '3', '1'),
(49, '123456789', 'sample', 'sample', '$2b$10$TfF0JvjQ3YIGcA1gV36lluYdncF7TAhZERrrtFfrtjG9Gbs8A9HVC', '789456132', 'sample@sample.com', '2', 'sample', '1', '1'),
(50, '456789', 'user', 'user', '$2b$10$A81EDBjfGpq6WYLnA71HIu6qyK.3cpDbVAFbEKop9BdIniuaIBLcW', '789465132', 'user@user.com', '1', 'user', '2', '1');

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
  `isDeleted` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_session`
--

INSERT INTO `users_session` (`id`, `userId`, `timeStamp`, `isDeleted`) VALUES
(1, '3', '2020-05-08 05:41:39', '1'),
(2, '49', '2020-05-11 06:16:21', '1'),
(3, '50', '2020-05-11 06:16:29', '0');

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
  MODIFY `draft_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `documentLogs`
--
ALTER TABLE `documentLogs`
  MODIFY `trans_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `documentStatus`
--
ALTER TABLE `documentStatus`
  MODIFY `statid` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `document_action_req`
--
ALTER TABLE `document_action_req`
  MODIFY `document_action_req_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `document_type`
--
ALTER TABLE `document_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `secid` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `system_logs`
--
ALTER TABLE `system_logs`
  MODIFY `system_logs_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `users_role`
--
ALTER TABLE `users_role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users_session`
--
ALTER TABLE `users_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users_status`
--
ALTER TABLE `users_status`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
