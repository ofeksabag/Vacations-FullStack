-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 10, 2023 at 12:27 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationsdatabase`
--
CREATE DATABASE IF NOT EXISTS `vacationsdatabase` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacationsdatabase`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(2, 6),
(2, 7),
(2, 9),
(2, 12),
(2, 19),
(4, 7),
(4, 8),
(4, 9),
(4, 10),
(4, 13),
(4, 14),
(4, 15),
(4, 19);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(256) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(1, 'Menashe', 'Kadishman', 'admin@gmail.com', 'e5a90c351f38ff167d226e1a64797f935baf5efdc6d2ae6af2bf916b71a8719064c76b287c8ee2c7c28531c6737f73ac64d7b3ad5ca53b9f8e96d5de388e883b', 'Admin'),
(2, 'Bart', 'Simpson', 'Bart@Simpson.com', 'e5a90c351f38ff167d226e1a64797f935baf5efdc6d2ae6af2bf916b71a8719064c76b287c8ee2c7c28531c6737f73ac64d7b3ad5ca53b9f8e96d5de388e883b', 'User'),
(4, 'Moishe', 'Ofnik', 'moishe@gmail.com', 'e5a90c351f38ff167d226e1a64797f935baf5efdc6d2ae6af2bf916b71a8719064c76b287c8ee2c7c28531c6737f73ac64d7b3ad5ca53b9f8e96d5de388e883b', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(5,2) NOT NULL,
  `imageFile` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageFile`) VALUES
(6, 'Paris', 'Paris, the city of light, is known for its stunning architecture, world-renowned museums, rich cultural heritage and beautiful gardens. Whether you are an art lover, a foodie, or just looking to explore a new city, Paris has something to offer everyone. The Eiffel Tower is one of the most iconic landmarks in the world and is a must-visit when in Paris. Another famous attraction is the Louvre Museum, which houses thousands of works of art including the Mona Lisa. The Notre-Dame Cathedral, Sainte-Chapelle, and Basilica of the Sacré-Cœur are other notable examples of the city\'s stunning architecture. Paris is also famous for its haute cuisine and patisseries, where you can indulge in delicious croissants, macarons, and other sweet treats. The Seine River offers a romantic boat tour, and the city\'s parks and gardens, including the Luxembourg Garden and the Tuileries, are perfect for a leisurely stroll or a picnic.', '2023-03-09', '2023-03-22', '570.00', 'e93f6c2e-3132-4008-a4d8-26ae253b29e9.jpg'),
(7, 'Rome', 'Rome, the capital city of Italy, is a must-visit destination for travelers. With its rich history, stunning architecture, and delicious cuisine, Rome offers a unique blend of cultural and artistic experiences that are sure to leave a lasting impression.\r\n\r\nThe city is home to numerous historical landmarks, including the Colosseum, one of the most iconic symbols of ancient Rome, the Pantheon, a well-preserved temple dedicated to all the gods of ancient Rome, and the Roman Forum, a vast archaeological site that was once the center of political and social life in ancient Rome. Visitors can also explore the Vatican City, the smallest country in the world and home to the Vatican Museums and St. Peter\'s Basilica.', '2023-02-20', '2023-02-24', '200.00', '73adfb90-f104-48b8-9cf1-fd4870dbbf0e.jpg'),
(8, 'New York', 'New York City, also known as the city that never sleeps, is a must-visit destination for travelers. With its bustling energy, iconic landmarks, and diverse cultures, New York offers a unique blend of excitement, history, and adventure.\r\n\r\nOne of the most recognizable landmarks in New York is the Statue of Liberty, a symbol of freedom and democracy, located on Liberty Island. The Empire State Building, another famous landmark, offers breathtaking views of the city from its observation deck. Times Square, with its bright lights, billboards, and bustling energy, is a vibrant hub of activity that is a must-see for any first-time visitor to the city.', '2023-02-06', '2023-02-22', '999.99', 'fed4a1f4-08dc-4871-bd4a-9e6e8931f5f1.jpg'),
(9, 'Budapest', 'Budapest, the capital city of Hungary, is a must-visit destination for travelers. With its stunning architecture, rich history, and beautiful scenery, Budapest offers a unique blend of culture and natural beauty that is sure to leave a lasting impression.\r\n\r\nOne of the most recognizable landmarks in Budapest is the Hungarian Parliament Building, a stunning example of neo-Gothic architecture located on the banks of the Danube River. The Buda Castle, located on the hill overlooking the city, offers breathtaking views of the city and houses several museums and galleries. The thermal baths, including the famous Gellért Baths and Széchenyi Baths, are a must-visit for anyone looking to experience the city\'s famous thermal waters.', '2023-03-12', '2023-03-17', '340.00', '94f58e06-cda1-489d-aa6f-0431622cc011.jpg'),
(10, 'Germany', 'Germany is a must-visit destination for travelers, offering a rich cultural heritage, stunning scenery, and diverse attractions. From its historic cities and medieval castles to its beautiful landscapes and modern architecture, Germany has something to offer for everyone.\r\n\r\nBerlin, the capital city, is a hub of cultural and historical significance, with landmarks such as the Brandenburg Gate, Reichstag building, and Checkpoint Charlie Museum. The city is also renowned for its vibrant street art and thriving music and nightlife scenes.', '2023-02-02', '2023-02-05', '490.00', '71d743ab-ce59-4042-92f0-c9f9c805443d.jpg'),
(11, 'Madrid', 'Madrid, the capital city of Spain, is a must-visit destination for travelers. With its rich cultural heritage, stunning architecture, and vibrant atmosphere, Madrid offers a unique blend of history and modernity that is sure to leave a lasting impression.\r\n\r\nOne of the most recognizable landmarks in Madrid is the Royal Palace of Madrid, a stunning example of Baroque architecture that serves as the official residence of the Spanish royal family. The Prado Museum, one of the largest art museums in the world, houses an impressive collection of works by Spanish masters such as Velázquez and Goya.', '2023-03-08', '2023-03-16', '700.00', '98352af2-6cb1-4d0f-9a62-88a8db54d5d0.jpeg'),
(12, 'London', 'London, the capital city of England, is a must-visit destination for travelers. With its rich history, stunning architecture, and vibrant cultural scene, London offers a unique blend of tradition and modernity that is sure to leave a lasting impression.\r\n\r\nOne of the most recognizable landmarks in London is Buckingham Palace, the official residence of the British monarch. Other historic landmarks in the city include the Tower of London, Westminster Abbey, and St. Paul\'s Cathedral.\r\n\r\nLondon is also renowned for its thriving cultural scene, with numerous museums, galleries, and theaters offering a wealth of entertainment and education opportunities. The city is also famous for its shopping, with Oxford Street, Regent Street, and Camden Market being just a few of the many shopping destinations that the city has to offer.', '2023-03-14', '2023-03-22', '800.00', '563ed467-8f3b-4bbe-9914-c974dc8af5bc.jpg'),
(13, 'Tokio', 'Tokyo, the capital city of Japan, is a must-visit destination for travelers. With its unique blend of modernity and tradition, cutting-edge technology, and rich cultural heritage, Tokyo offers an unforgettable experience for visitors of all ages.\r\n\r\nOne of the most recognizable landmarks in Tokyo is the Tokyo Tower, a 333-meter tall structure that offers stunning views of the city. Another must-visit destination is the Imperial Palace, the official residence of the Japanese imperial family, surrounded by beautiful gardens.\r\n\r\nTokyo is also renowned for its cutting-edge technology, with numerous electronics shops and gadget-filled arcades that offer a glimpse into the city\'s innovation-driven culture. In addition, Tokyo is home to some of the world\'s best shopping, with numerous department stores, boutiques, and street markets offering a wide range of products and unique shopping experiences.', '2023-04-05', '2023-05-05', '999.99', '27816285-0134-4770-9959-03f901678748.jpeg'),
(14, 'Amsterdam', 'Amsterdam, the capital city of the Netherlands, is a must-visit destination for travelers. With its picturesque canals, beautiful architecture, and rich cultural heritage, Amsterdam offers a unique blend of history and modernity that is sure to leave a lasting impression.\r\n\r\nOne of the most recognizable landmarks in Amsterdam is the Anne Frank House, a museum dedicated to the famous Jewish diarist who lived in hiding in the city during World War II. Another must-visit destination is the Rijksmuseum, which houses an extensive collection of Dutch art and history, including works by Rembrandt and Vermeer.\r\n\r\nAmsterdam is also renowned for its vibrant and inclusive culture, with numerous LGBTQ-friendly bars, clubs, and cultural events that celebrate the city\'s diverse and accepting community. In addition, the city is famous for its coffee shops, which offer a unique experience for those interested in exploring the city\'s relaxed and open-minded culture.', '2023-04-06', '2023-04-14', '570.00', 'cee31a66-791e-42b7-9b24-e7961cbe9d12.jpg'),
(15, 'Dubai', 'Dubai, the largest city in the United Arab Emirates, is a must-visit destination for travelers. With its modern architecture, luxurious lifestyle, and unique blend of desert landscapes and cityscapes, Dubai offers an unforgettable experience for visitors of all ages.\r\n\r\nOne of the most recognizable landmarks in Dubai is the Burj Khalifa, the world\'s tallest building, which offers stunning views of the city from its observation deck. Another must-visit destination is the Dubai Mall, one of the largest shopping centers in the world, which offers a diverse range of shops, restaurants, and entertainment options.', '2023-03-15', '2023-03-21', '650.00', '7a39945a-a38c-4fda-be44-41985f77da59.jpg'),
(16, 'Sofia', 'Sofia, the capital city of Bulgaria, is a must-visit destination for travelers interested in exploring Eastern Europe. With its rich history, diverse cultural heritage, and vibrant atmosphere, Sofia offers an unforgettable experience for visitors of all ages.\r\n\r\nOne of the most recognizable landmarks in Sofia is the Alexander Nevsky Cathedral, a stunning Orthodox cathedral that dominates the city\'s skyline. Another must-visit destination is the National Palace of Culture, a cultural and conference center that hosts numerous exhibitions, concerts, and events throughout the year.', '2023-04-03', '2023-04-07', '400.00', '79402444-7a41-4335-bbca-e651206c7979.jpg'),
(17, 'Thailand', 'Thailand, a Southeast Asian country known for its stunning beaches, rich cultural heritage, and delicious cuisine, is a must-visit destination for travelers. From the bustling city of Bangkok to the tropical islands of Phuket and Koh Samui, Thailand offers a diverse range of experiences for visitors of all ages.\r\n\r\nOne of the most recognizable landmarks in Thailand is the Wat Arun, also known as the Temple of Dawn, a stunning Buddhist temple located on the west bank of the Chao Phraya River in Bangkok. Another must-visit destination is the Chiang Mai Night Bazaar, a bustling outdoor market that offers a diverse range of shopping, dining, and entertainment options.', '2023-02-18', '2023-04-04', '890.00', 'ee62bab7-4393-4066-bc49-ea3077090855.jpg'),
(18, 'Los Angeles', 'Los Angeles, the largest city in California and the entertainment capital of the world, is a must-visit destination for travelers. With its stunning beaches, vibrant cultural scene, and rich history, Los Angeles offers an unforgettable experience for visitors of all ages.\r\n\r\nOne of the most recognizable landmarks in Los Angeles is the Hollywood Sign, an iconic symbol of the entertainment industry located in the Hollywood Hills. Another must-visit destination is the Sunset Strip, a legendary stretch of Sunset Boulevard that is home to numerous music venues, bars, and clubs.\r\n\r\nLos Angeles is also renowned for its rich cultural scene, with numerous museums, theaters, and art galleries that offer a diverse range of cultural experiences. In addition, the city is famous for its stunning beaches, such as Venice Beach and Santa Monica Beach, which offer a unique blend of sun, sand, and surf.', '2023-03-13', '2023-03-28', '900.00', 'd2bf77ef-d201-4b8c-8ba7-8564f23365c4.jpg'),
(19, 'Bucharest', 'Bucharest, the capital city of Romania, is a must-visit destination for travelers interested in exploring Eastern Europe. With its rich history, diverse cultural heritage, and vibrant atmosphere, Bucharest offers an unforgettable experience for visitors of all ages.\r\n\r\nOne of the most recognizable landmarks in Bucharest is the Palace of the Parliament, the second largest administrative building in the world after the Pentagon. Another must-visit destination is the Old Town, a historic neighborhood that is home to numerous historical sites, museums, and cultural landmarks, including the Stavropoleos Monastery and the National Museum of Romanian History.', '2023-04-20', '2023-04-23', '290.00', '17f36dc1-8462-49d8-9807-13a9c5d680d8.jpg'),
(20, 'Prague', 'Prague, the capital city of the Czech Republic, is a must-visit destination for travelers interested in exploring Eastern Europe. With its stunning architecture, rich history, and vibrant cultural scene, Prague offers an unforgettable experience for visitors of all ages.\r\n\r\nOne of the most recognizable landmarks in Prague is the Charles Bridge, a historic bridge that spans the Vltava River and offers breathtaking views of the city. Another must-visit destination is the Prague Castle, a historic castle complex that is home to numerous museums, galleries, and cultural landmarks, including St. Vitus Cathedral and the Old Royal Palace.', '2023-04-11', '2023-04-14', '230.00', 'e9474908-426c-4cd2-9bfe-949d64de0603.jpeg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
