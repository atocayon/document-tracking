-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 09, 2020 at 08:29 AM
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
  `division` varchar(120) NOT NULL,
  `section` varchar(120) NOT NULL,
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

INSERT INTO `users` (`user_id`, `employeeId`, `name`, `username`, `password`, `contact`, `email`, `division`, `section`, `position`, `address`, `gender`, `bdate`, `role`, `status`) VALUES
(3, '20190931', 'Aljon C. Tocayon', 'actWhiteHat27', '$2b$10$Ua01PGxt4Jh46MA91UtS4O68HxIx/EsylWXg/D2k1BDXRohWAnqce', '09051680244', 'atocayon27@gmail.com', 'MRDD', 'IMS', 'Computer Programmer', 'Jaro, Leyte', 'Male', '1996-10-05', 'admin', 'active'),
(4, 'Voluptatem omnis ab', 'Keegan Craft', 'luligyb', '$2b$10$IwL0xBwUoJpXbudPV1tHreW8IsSaAyODtRn5NeOxdHCpUTe3Sy6u6', '752', 'xyxu@mailinator.com', 'MRDD', 'IMS', 'Nostrum quis est ut ', 'Cupiditate aut dolor', '29-Jan-1973', 'female', 'admin', 'active'),
(5, 'Blanditiis quo venia', 'Pandora Morse', 'qowukev', '$2b$10$9z1b7mdDFs5b5D819wrWTe3UB.rWMNDu9jii2U9e4oEBA2RPaMX6y', '589', 'vodunonem@mailinator.net', 'MRDD', 'IMS', 'Vel officia sunt quo', 'Consectetur et atqu', '18-Feb-2017', 'other', 'admin', 'active'),
(6, 'Consequatur blandit', 'Tarik Silva', 'jaxirynu', '$2b$10$To7uZxVVIYsjzVzkMJA2S.IxlbnmvMSOgw3OXzqCZxsJhvfToUHEq', '955', 'wowog@mailinator.com', 'MRDD', 'IMS', 'Impedit excepteur s', 'Sit ut et quae exce', '20-Aug-1970', 'male', 'member', 'active'),
(7, '', '', '', '$2b$10$wIoEgbeN3YfeWRK75CxbqeBhKCbmtHmP2B0xNdTepH6i..TP0ystS', '', '', 'MRDD', 'IMS', '', '', '', '', '', '');

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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `users_session`
--
ALTER TABLE `users_session`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users_session`
--
ALTER TABLE `users_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
