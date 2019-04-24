-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 23, 2019 at 10:23 AM
-- Server version: 5.7.24
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `luun_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `commentID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `photoID` int(11) NOT NULL,
  `content` text NOT NULL,
  `timeComment` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`commentID`, `userID`, `photoID`, `content`, `timeComment`) VALUES
(6, 13, 6, 'Bla bla bla', '2019-04-11 16:46:28'),
(8, 13, 6, 'Ok bla bla bla again', '2019-04-11 16:52:47'),
(9, 13, 6, 'inner html checking', '2019-04-11 16:53:33'),
(11, 13, 6, 'Test arranged', '2019-04-11 17:13:07'),
(12, 13, 6, 'Bla blas bla bla', '2019-04-11 17:19:11'),
(13, 13, 6, 'Testing', '2019-04-11 17:19:47'),
(15, 15, 8, 'Beautiful!!!', '2019-04-11 19:33:11'),
(16, 15, 8, 'I love it!', '2019-04-11 19:47:07'),
(17, 14, 10, 'Awwww....', '2019-04-11 19:53:09'),
(18, 14, 8, 'Beautiful!', '2019-04-11 19:56:56');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `photoID` int(11) NOT NULL,
  `caption` varchar(512) DEFAULT NULL,
  `description` text,
  `userID` int(11) DEFAULT NULL,
  `likeCount` int(11) NOT NULL DEFAULT '0',
  `cmtCount` int(11) NOT NULL DEFAULT '0',
  `thumb` varchar(2083) DEFAULT NULL,
  `url` varchar(2083) NOT NULL,
  `timeUpload` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`photoID`, `caption`, `description`, `userID`, `likeCount`, `cmtCount`, `thumb`, `url`, `timeUpload`) VALUES
(6, 'First Image', 'Test', 13, 5, 7, NULL, 'public/images/user12024_181822Dreamweaver.jpg', '2019-04-08 18:18:22'),
(8, 'Atlas Mountain', 'In Imlil', 13, 3, 3, NULL, 'public/images/user12027_184257pic2.jpg', '2019-04-11 18:42:57'),
(10, 'Just chilling', 'Me, just chilling on a nice spring day', 15, 1, 1, NULL, 'public/images/user32027_195133bronson.jpg', '2019-04-11 19:51:33'),
(11, 'Nice day', 'Still me, waiting for some hoomans', 15, 0, 0, NULL, 'public/images/user32027_19527more bronson.jpg', '2019-04-11 19:52:07'),
(12, 'Friends in Hanoi', 'Dinner at Mau Dich', 14, 0, 0, NULL, 'public/images/user22027_201636pic.jpg', '2019-04-11 20:16:36');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `password` varchar(256) NOT NULL,
  `username` varchar(512) NOT NULL,
  `email` varchar(512) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `picURL` varchar(512) DEFAULT NULL,
  `intro` text,
  `startdate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `password`, `username`, `email`, `firstname`, `lastname`, `picURL`, `intro`, `startdate`) VALUES
(13, '$2b$10$r/cCBqpVd2fdJaA/EiCkPeTC6iK5KPplAMfQWhVHxSuzJ2M0yKvCK', 'user1', 'bla@bla.com', 'Nhung', 'Luu', 'public/images/user12024_181822pic.jpg', NULL, '2019-04-08 16:39:16'),
(14, '$2b$10$SWHCQJPWvilkmdV8I28OaObsoPfWtYE9ITU/oI1MCp4zfC1gm.X1S', 'user2', 'user2@gmail.com', 'David', 'McCaskey', 'public/users/undefineddavid.jpg', NULL, '2019-04-11 18:24:52'),
(15, '$2b$10$TiMl1ob8.DHbv5USnh74Tesm2pLZZBrMWQhsRzDUS4pTFetVVFjoy', 'user3', 'user3@gmail.com', 'Mimi', 'The Cat', 'public/users/undefinedpic4.jpg', NULL, '2019-04-11 19:05:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`commentID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `photoID` (`photoID`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`photoID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `commentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `photoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`photoID`) REFERENCES `photos` (`photoID`);

--
-- Constraints for table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
