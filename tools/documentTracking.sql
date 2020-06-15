-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 09, 2020 at 07:18 AM
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
CREATE DATABASE documentTracking;USE documentTracking;
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
  `notification` varchar(11) NOT NULL,
  `date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `level` varchar(11) NOT NULL,
  `ref` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `documentLogs`
--

INSERT INTO `documentLogs` (`trans_id`, `document_id`, `user_id`, `remarks`, `destinationType`, `destination`, `status`, `notification`, `date_time`, `level`, `ref`) VALUES
(1, '1000000000', '49', 'none', 'Internal', 'none', '5', '0', '2020-06-09 09:19:10', '0', '0'),
(2, '1000000000', '49', 'none', 'Internal', 'MRDD', '2', '0', '2020-06-09 09:19:10', '0', '0'),
(3, '1000000000', '59', 'none', 'Internal', 'none', '1', '1', '2020-06-09 09:19:28', '0', '2'),
(4, '1000000000', '59', 'qwerty', '', 'none', '4', '0', '2020-06-09 10:35:34', '0', '2'),
(5, '1000000001', '49', 'none', 'Internal', 'none', '5', '0', '2020-06-09 13:01:56', '0', '0'),
(6, '1000000001', '49', 'none', 'Internal', 'IMS', '2', '0', '2020-06-09 13:01:56', '0', '0'),
(7, '1000000001', '58', 'none', 'Internal', 'none', '1', '0', '2020-06-09 13:05:03', '0', '6');

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
(1000000000, '49', 'Sample Doc', '12', 'Amet facere mollit ', '2020-06-09 01:19:10', '1'),
(1000000001, '49', '361', '6', 'Maxime reprehenderit', '2020-06-09 05:01:56', '1');

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
(1, 'received'),
(2, 'forwarded'),
(3, 'pending'),
(4, 'completed'),
(5, 'created'),
(6, 'external'),
(7, 'MRDD Canvasser'),
(9, 'General Canvasser'),
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
(1, '1000000000', 'For Endorsement'),
(2, '1000000000', 'For Action'),
(3, '1000000001', 'For Approval'),
(4, '1000000001', 'For Signature'),
(5, '1000000001', 'For Recommendation'),
(6, '1000000001', 'For Action'),
(7, '1000000001', 'For Comment'),
(8, '1000000001', 'For Information');

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
(16, 'Unclassified'),
(18, 'Travel Documents');

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
(49, '123456789', 'Research', 'sample', '$2b$10$TfF0JvjQ3YIGcA1gV36lluYdncF7TAhZERrrtFfrtjG9Gbs8A9HVC', '789456132', 'research@gmail.com', '2', 'sample', '1', '1'),
(50, '456789', 'actwhitehat27', 'user', '$2b$10$A81EDBjfGpq6WYLnA71HIu6qyK.3cpDbVAFbEKop9BdIniuaIBLcW', '789465132', 'user@user.com', '1', 'programmer', '2', '1'),
(51, '20140153', 'Jerson', 'jerson', '$2b$10$e.6vn.xXgQg6asyhHu/7eOlFsDJL.ZfMhjIVnI2etjXsw974DddfC', '09175252025', 'jerson@gmail.com', '7', 'Admin Officer IV', '2', '1'),
(52, '04', 'Jessa', 'jessa', '$2b$10$hqjfRJJA7rJa7f9WsBnnd.YddnJjAHcmmgOlB7D128t5SvKerGJba', '0919', 'jessa@gmail.com', '6', 'Accountant III', '1', '1'),
(53, '789465132', 'Andrew', 'andrew', '$2b$10$Pw/rtlU338lfZSTLFiY.E.0qHkGWx2eBpyz1y9/ICy1DmX2k0uMcq', '123456', 'andrew@soledad.com', '1', 'IMS Head', '1', '1'),
(56, '20140156', 'Daniel Gerard Diaz', 'dpdiaz', '$2b$10$QmC.D7Hk8NRBEykszfQ1Ju/Mp5O6GeZiVuggC3a1HbcLLWOo.v34W', '09196969696', 'dpdiaz69@gmail.com', '1', 'ISR V', '1', '1'),
(57, '10', 'Lordelita Marcos', 'lor', '$2b$10$WNPONUvCN77Bfa6GwEo8ieDs0rExeRCFefM24xeNa4MwubPF6C902', '091912', 'lordelita@gmail.com', '5', 'Admin', '2', '1'),
(58, '20140155', 'Jarydd', 'jarydd', '$2b$10$kTFs74Rkdjz2QNpwyrg/DeqI/zP.TDyUwMvc16kBCQdm8s2UCNGw.', '09175252025', 'jaryddcinco@gmail.com', '1', 'Computer Programmer II', '1', '1'),
(59, '21', 'mel', 'mel', '$2b$10$cgAdAfPaBE.4UFZXsyN2Ee3lc35N3Vh4oOvp0Ykp.2QbCxQLf.uAu', '091923123', 'mel@gmail.com', '27', 'lalala', '2', '1'),
(60, '28', 'cherry', 'cherry', '$2b$10$QRvf/UeBdaoclzAzgPtXcunOtrJiAx6kVPkpRtUbBwbtbzi/TD94m', '09562784572', 'cherry@gmail.com', '3', 'Admin Assistant III', '2', '1'),
(61, '12345', 'lrs', 'lrs', '$2b$10$0a1g8OW/OXSTkyX2OlU/CuzPHPvof2yzJXYBfKHSqGdZr9FZF.MS2', '456745674567', 'lrs@gmail.com', '12', 'lrs', '2', '1');

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
(1, '3', '2020-06-08 06:11:48', '1'),
(2, '49', '2020-06-09 05:02:02', '1'),
(3, '50', '2020-06-01 07:37:56', '1'),
(4, '51', '2020-06-08 06:55:46', '1'),
(5, '52', '2020-06-09 00:00:04', '1'),
(6, '53', '2020-06-01 07:38:03', '1'),
(7, '57', '2020-05-29 02:45:30', '1'),
(8, '58', '2020-06-09 05:02:13', '0'),
(9, '59', '2020-06-09 02:35:43', '1'),
(10, '60', '2020-06-02 05:32:56', '1'),
(11, '61', '2020-06-08 06:18:26', '1');

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
-- AUTO_INCREMENT for table `documentLogs`
--
ALTER TABLE `documentLogs`
  MODIFY `trans_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `documentStatus`
--
ALTER TABLE `documentStatus`
  MODIFY `statid` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `document_action_req`
--
ALTER TABLE `document_action_req`
  MODIFY `document_action_req_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `document_type`
--
ALTER TABLE `document_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

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
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `users_role`
--
ALTER TABLE `users_role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users_session`
--
ALTER TABLE `users_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users_status`
--
ALTER TABLE `users_status`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
