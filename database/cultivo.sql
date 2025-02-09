-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2025 at 06:50 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cultivo`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`id`, `name`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Edukasi', 'tes', '2024-11-18 09:45:49', '2024-11-18 09:45:49'),
(2, 'Perkebunan', 'tes', '2024-11-26 04:10:48', '2024-11-26 04:10:48'),
(3, 'Wisata Alam', '-', '2024-11-26 05:14:24', '2024-11-26 05:14:24');

-- --------------------------------------------------------

--
-- Table structure for table `agrotourism`
--

CREATE TABLE `agrotourism` (
  `id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `activities_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `include` varchar(255) DEFAULT NULL,
  `exclude` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `url_image` varchar(255) NOT NULL,
  `price` varchar(255) DEFAULT NULL,
  `gallery` varchar(255) DEFAULT NULL,
  `url_gallery` text NOT NULL,
  `address` varchar(255) NOT NULL,
  `url_gmaps` varchar(255) NOT NULL,
  `rating` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `agrotourism`
--

INSERT INTO `agrotourism` (`id`, `city_id`, `activities_id`, `name`, `description`, `include`, `exclude`, `image`, `url_image`, `price`, `gallery`, `url_gallery`, `address`, `url_gmaps`, `rating`, `created_at`, `updated_at`) VALUES
(1, 4, 2, 'Agrowisata Selo Tumpang Boyolali', 'Masuki dunia alam yang menakjubkan di Agrowisata Selo Tumpang Boyolali, destinasi di pegunungan yang menawarkan keindahan lanskap hijau serta udara segar pedesaan. Nikmati keseruan memetik buah segar langsung dari kebun.  Pengalaman ini tidak hanya memberikan wawasan tentang cara bercocok tanam, tetapi juga kesempatan untuk terlibat langsung dalam prosesnya.\r\nDengan latar belakang indah Gunung Merapi dan Merbabu, Anda bisa merasakan ketenangan alam sambil menikmati kegiatan edukatif. Setelah menjelajahi kebun, cobalah hidangan lokal yang sehat di kafe setempat, atau bawa pulang produk pertanian sebagai oleh-oleh. Habiskan hari penuh edukasi dan petualangan yang memperkenalkan Anda pada pentingnya pertanian berkelanjutan, ideal untuk dinikmati bersama keluarga atau teman!\r\n', 'Petik buah, Berfoto di taman bunga\r\n', 'Camping, Resto, Buah\r\n', 'public\\images\\1738942395559.png', 'http://localhost:5000/images/1738942395559.png', '5000', '[\"public\\\\images\\\\1738942395567.png\",\"public\\\\images\\\\1738942395575.png\",\"public\\\\images\\\\1738942395576.png\",\"public\\\\images\\\\1738942395578.png\"]', '[\"http://localhost:5000/images/1738942395567.png\",\"http://localhost:5000/images/1738942395575.png\",\"http://localhost:5000/images/1738942395576.png\",\"http://localhost:5000/images/1738942395578.png\"]', 'Dusun Tretes, Desa Samiran, Kecamatan Selo, Boyolali.', 'https://maps.app.goo.gl/CKdyvhhx5cr55mXq9', NULL, '2025-02-07 22:33:15', '2025-02-07 22:33:15'),
(2, 4, 1, 'Kampoeng Karet Karanganyar', 'Kampoeng Karet Karanganyar menawarkan wisata edukatif yang unik, di mana pengunjung dapat belajar langsung tentang budidaya karet dari awal hingga akhir. Wisatawan akan diajak menyaksikan proses penyadapan karet, dari teknik penyadapan pohon hingga pengolahan getah menjadi bahan dasar produk industri. Pengalaman ini memberikan wawasan mendalam tentang pentingnya industri karet di Indonesia, sekaligus membuka kesempatan untuk berinteraksi dengan petani setempat, memahami tantangan, dan belajar mengenai teknik pengelolaan perkebunan karet.\r\nSelain pengalaman edukatif, Kampoeng Karet Karanganyar juga menawarkan berbagai aktivitas rekreasi yang menyenangkan. Pengunjung dapat menikmati kegiatan outbond seperti flying fox, berkemah di alam terbuka, hingga menyusuri sungai menggunakan ban karet. Aktivitas ini cocok bagi mereka yang ingin merasakan petualangan seru di tengah suasana alam yang sejuk dan hijau. Dengan kombinasi edukasi dan rekreasi, tempat ini menjadi pilihan ideal bagi keluarga, sekolah, atau komunitas yang ingin merasakan liburan sekaligus belajar tentang pertanian karet.', 'Berfoto di kebun karet, Kolam renang, Playground, Spot foto\r\n', 'Camping, Terapi Kolam Ikan, Naik Kuda, Resto, Outbound\r\n', 'public\\images\\1738942525670.png', 'http://localhost:5000/images/1738942525670.png', '10000', '[\"public\\\\images\\\\1738942525673.png\",\"public\\\\images\\\\1738942525684.png\",\"public\\\\images\\\\1738942525688.png\",\"public\\\\images\\\\1738942525705.png\"]', '[\"http://localhost:5000/images/1738942525673.png\",\"http://localhost:5000/images/1738942525684.png\",\"http://localhost:5000/images/1738942525688.png\",\"http://localhost:5000/images/1738942525705.png\"]', 'Kenteng, Puntukrejo, Ngargoyoso, Karanganyar Regency, Central Java 57793', 'https://maps.app.goo.gl/3fHpHQZNqXoV3j5AA', NULL, '2025-02-07 22:35:25', '2025-02-07 22:35:25'),
(3, 4, 2, 'Agrowisata Pasung, Klaten', 'Desa Pasung telah menjadi desa agrowisata yang menarik dengan lebih dari 1.000 pohon buah yang ditanam di sepanjang jalan utama desa. Buah-buahan yang ditanam meliputi berbagai jenis seperti nangka, kelengkeng, mangga, belimbing, dan jambu. Para pengunjung dapat menikmati pemandangan hijau dan suasana pedesaan yang asri, sembari mengenal lebih dekat berbagai jenis tanaman buah tropis yang ada di desa tersebut.\r\nPengelolaan desa agrowisata ini dilakukan oleh BUMDesa Lumintu, yang sudah berdiri sejak tiga tahun lalu dan aktif memajukan perekonomian desa. Ke depan, agrowisata Pasung akan terus dikembangkan dengan menambahkan fasilitas seperti rest area, sentra kuliner yang menawarkan makanan lokal, serta kolam pancing. Dengan pengembangan ini, Desa Pasung diharapkan menjadi salah satu destinasi favorit bagi wisatawan yang ingin merasakan agrowisata sekaligus menikmati kuliner dan kegiatan rekreasi keluarga.', 'Berfoto di kebun desa, Petik buah, Memancing\r\n', 'Jeep Offroad, Resto, Ikan, Buah\r\n', 'public\\images\\1738942663037.png', 'http://localhost:5000/images/1738942663037.png', '5000', '[\"public\\\\images\\\\1738942663063.png\",\"public\\\\images\\\\1738942663082.png\",\"public\\\\images\\\\1738942663087.png\",\"public\\\\images\\\\1738942663115.png\"]', '[\"http://localhost:5000/images/1738942663063.png\",\"http://localhost:5000/images/1738942663082.png\",\"http://localhost:5000/images/1738942663087.png\",\"http://localhost:5000/images/1738942663115.png\"]', 'Pasung, Klaten Regency, Central Java', 'https://maps.app.goo.gl/ZxGKrXkK9xL1e3ACA', NULL, '2025-02-07 22:37:43', '2025-02-07 22:37:43'),
(4, 4, 2, 'Agrowisata Jambu Merah “PUJA”', 'Wisata Petik Jambu Ngargoyoso di Karanganyar menawarkan pengalaman unik bagi pengunjung yang ingin menikmati buah segar langsung dari pohonnya. Dengan pilihan jambu kristal dan jambu merah, tempat ini menyediakan berbagai aktivitas menarik seperti memetik buah sendiri, belajar tentang budidaya jambu, hingga menikmati olahan jambu yang dibuat langsung dari hasil kebun. Harga yang ditawarkan pun terjangkau, mulai dari Rp 10.000 hingga Rp 25.000 per kilogram untuk jambu kristal, sementara jambu merah bisa didapatkan hanya dengan Rp 1.000 per kilogram saat musim hujan.\r\nSelain pengalaman petik buah, wisatawan juga bisa menikmati fasilitas tambahan di beberapa agrowisata kebun jambu di Ngargoyoso. Di Agrowisata Jambu Merah \"PUJA\", pengunjung bisa mencicipi olahan seperti es krim dan keripik jambu. Kebun Jambu Kristal Pak Minto terkenal dengan produksi jambunya yang tidak mengenal musim, sementara Wisata Kebun Jambu Helena menawarkan fasilitas seperti jembatan swafoto, taman bermain, dan jus jambu merah gratis untuk setiap tiket masuk. Wisata petik jambu ini menjadi destinasi sempurna bagi keluarga dan teman-teman yang ingin berlibur sambil belajar tentang pertanian.\r\n', 'Berfoto di kebun jambu, Memetik buah, Belajar budidaya, Makan jambu di tempat, Jus jambu\r\n', 'Buah jambu, Es krim dan keripik\r\n', 'public\\images\\1738942805772.png', 'http://localhost:5000/images/1738942805772.png', '5000', '[\"public\\\\images\\\\1738942805778.png\",\"public\\\\images\\\\1738942805783.png\"]', '[\"http://localhost:5000/images/1738942805778.png\",\"http://localhost:5000/images/1738942805783.png\"]', 'Candi, RT.02/RW.04, Candi, Jatirejo, Kec. Ngargoyoso, Kabupaten Karanganyar, Jawa Tengah 57793', 'https://maps.app.goo.gl/SnMLefXDUiwASbZDA', NULL, '2025-02-07 22:40:05', '2025-02-07 22:40:05'),
(5, 4, 1, 'Agrowisata Amanah', 'Agrowisata Amanah, yang berdiri sejak akhir tahun 2004, adalah destinasi wisata keluarga yang menawarkan pengalaman unik di tengah alam yang sejuk dan segar, berjarak sekitar 34,4 km dari Kota Surakarta. Dengan latar pemandangan Gunung Lawu yang indah, tempat ini menjadi pilihan tepat bagi mereka yang ingin melepas penat dari hiruk pikuk kehidupan kota. Udara pegunungan yang segar membuat para pengunjung merasa kembali bugar. Di sini, para pengunjung tidak hanya dapat menikmati keindahan alam, tetapi juga belajar tentang sektor pertanian dan peternakan melalui wisata edukatif.\r\n\r\nAgrowisata Amanah menawarkan berbagai kegiatan seru dan edukatif, mulai dari berkebun, menyusuri sungai yang indah, hingga berinteraksi langsung dengan hewan ternak. Tempat ini juga menyediakan aktivitas outbond yang menantang serta permainan pinball, cocok untuk keluarga maupun rombongan yang ingin berlibur sambil belajar dan menikmati petualangan. Dengan berbagai fasilitas yang ditawarkan, Agrowisata Amanah menjadi tempat ideal bagi wisatawan yang ingin merasakan perpaduan antara edukasi, rekreasi, dan relaksasi di tengah keindahan alam.\r\n', 'Menyusuri Sungai, Outbond, Bermain dengan Hewan, Makan pagi, Makan Siang', 'Pinball', 'public\\images\\1738942952862.png', 'http://localhost:5000/images/1738942952862.png', '115000', '[\"public\\\\images\\\\1738942952869.png\",\"public\\\\images\\\\1738942952877.png\",\"public\\\\images\\\\1738942952899.png\",\"public\\\\images\\\\1738942952905.png\",\"public\\\\images\\\\1738942952920.png\",\"public\\\\images\\\\1738942952924.png\",\"public\\\\images\\\\1738942952930.png\"]', '[\"http://localhost:5000/images/1738942952869.png\",\"http://localhost:5000/images/1738942952877.png\",\"http://localhost:5000/images/1738942952899.png\",\"http://localhost:5000/images/1738942952905.png\",\"http://localhost:5000/images/1738942952920.png\",\"http://localhost:5000/images/1738942952924.png\",\"http://localhost:5000/images/1738942952930.png\"]', 'Jl. Raya Solo - Tawangmangu KM. 34, 3, RT. 01/03, Karang Wetan, Karang, Kec. Karangpandan, Kabupaten Karanganyar, Jawa Tengah 57791', 'https://maps.app.goo.gl/Hu5VZwF9EB9gxLQW8', NULL, '2025-02-07 22:42:32', '2025-02-07 22:42:32'),
(6, 3, 2, 'Kusuma Agrowisata', 'Kusuma Agrowisata berdiri pada 1991 dan merupakan salah satu pioneer Wisata Agro di Indonesia. Kami adalah satu-satunya wisata agro yang berfasilitas hotel. Kami juga menawarkan wisata petik di kebun apel, jeruk, jambu merah, buah naga, strawberry dan sayur hidroponik bebas pestisida.\r\n\r\nArea wisata kami terletak pada ketinggian ± 1000 meter dari permukaan laut dan berudara sejuk. Anda dapat memetik sendiri buah-buah tersebut FRESH langsung dari pohon sambil berkeliling ditemani oleh pemandu kami. Pemandu kami akan menjelaskan tentang budidaya tanaman dan hal-hal yang berkaitan tentang buah-buah tersebut.\r\n\r\nSelain wisata petik, kami juga menawarkan wisata outbound dimana Anda dapat bermain War Game di arena airsoft gun kami, mengendarai ATV di mini off-road track kami atau bergelantungan dan meluncur dari menara Flying Fox.\r\n\r\nAnda juga dapat berkunjung pada \'specialty\' restaurant kami, Apple House dan Strawberry House dimana kami menyajikan menu-menu special kami mengunakan bahan buah apel atau strawberry.\r\n', 'Petik Buah Apel, Juice, Snack Box, Lunch Box, Mineral Water', 'Flying Fox, ATV & Off-road Adventure, Paintball War, Game, Jungle Trekking', 'public\\images\\1738943667679.jpg', 'http://localhost:5000/images/1738943667679.jpg', '50000', '[\"public\\\\images\\\\1738943667683.jpg\",\"public\\\\images\\\\1738943667683.jpg\",\"public\\\\images\\\\1738943667684.jpg\",\"public\\\\images\\\\1738943667685.jpg\",\"public\\\\images\\\\1738943667686.jpeg\",\"public\\\\images\\\\1738943667686.jpg\",\"public\\\\images\\\\1738943667687.png\",\"', '[\"http://localhost:5000/images/1738943667683.jpg\",\"http://localhost:5000/images/1738943667683.jpg\",\"http://localhost:5000/images/1738943667684.jpg\",\"http://localhost:5000/images/1738943667685.jpg\",\"http://localhost:5000/images/1738943667686.jpeg\",\"http://localhost:5000/images/1738943667686.jpg\",\"http://localhost:5000/images/1738943667687.png\",\"http://localhost:5000/images/1738943667688.jpg\",\"http://localhost:5000/images/1738943667689.jpg\",\"http://localhost:5000/images/1738943667691.jpg\"]', 'Jl. Abdul Gani, Ngaglik, Kec. Batu, Kota Batu, Jawa Timur 65311, Indonesia', 'https://maps.app.goo.gl/43hvJyHpoaFESdBT8', NULL, '2025-02-07 22:54:27', '2025-02-07 22:54:27'),
(7, 3, 3, 'Wisata Talaga Madiredo', 'Telaga Madiredo terletak di Desa Madiredo, Kecamatan Pujon, Kabupaten Malang merupakan kolam pemandian alami.\r\n\r\nTelaga Madiredo memiliki kejernihan air dengan ikan-ikan menghiasi kolam alami ini, para wisatawan dapat bermain air atau berenang. Coba juga foto underwater untuk pengalaman yang tidak terlupakan. Setiap sudut di dalam telaga bisa dijadikan latar foto menarik. Selain itu para wisatawan dapat merasakan menginap berkemah di tepi telaga. Jika malam tiba nyalakan api unggun dan menikmati pemandangan bintang-bintang di langit cerah.\r\n', 'Agrowisata, Spot foto, Taman Bunga', 'Camping, Naik Perahu', 'public\\images\\1738944508993.jpg', 'http://localhost:5000/images/1738944508993.jpg', '45000', '[\"public\\\\images\\\\1738944509006.jpg\",\"public\\\\images\\\\1738944509010.jpg\",\"public\\\\images\\\\1738944509022.jpg\",\"public\\\\images\\\\1738944509024.jpg\",\"public\\\\images\\\\1738944509025.jpg\",\"public\\\\images\\\\1738944509027.jpg\",\"public\\\\images\\\\1738944509029.jpg\"]', '[\"http://localhost:5000/images/1738944509006.jpg\",\"http://localhost:5000/images/1738944509010.jpg\",\"http://localhost:5000/images/1738944509022.jpg\",\"http://localhost:5000/images/1738944509024.jpg\",\"http://localhost:5000/images/1738944509025.jpg\",\"http://localhost:5000/images/1738944509027.jpg\",\"http://localhost:5000/images/1738944509029.jpg\"]', 'Madiredo, Pujon, Kabupaten Malang, Jawa Timur, 65391', 'https://maps.app.goo.gl/u6w4vALvnNY8eo8u9', NULL, '2025-02-07 23:08:29', '2025-02-07 23:08:29'),
(8, 3, 2, 'Petik Apel Green Garden', 'Wisata Petik Apel Green Garden merupakan lokasi pertama yang wajib kamu kunjungi untuk menikmati aktivitas petik apel selama berada di Malang. Lokasi ini beralamat lengkap di Jl. Pangeran Diponegoro, Tulungrejo, Kec. Bumiaji, Kota Batu, Jawa Timur 65336.\r\nDestinasi ini buka setiap hari mulai pukul 07.30 hingga 17.00. Bagi kamu yang akan berkunjung, siapkan dana untuk tiket masuk sebesar Rp 25.000 per orang. Selain dapat menyantap apel sepuasnya secara gratis, kamu juga dapat membawa pulang apel pilihan kamu dengan membayar Rp 12.000 per kilo.\r\n', 'Petik apel, Makan apel sepuasnya', '-', 'public\\images\\1738954034639.jpg', 'http://localhost:5000/images/1738954034639.jpg', '25000', '[\"public\\\\images\\\\1738954034642.png\",\"public\\\\images\\\\1738954034648.jpg\",\"public\\\\images\\\\1738954034649.jpg\",\"public\\\\images\\\\1738954034652.jpg\"]', '[\"http://localhost:5000/images/1738954034642.png\",\"http://localhost:5000/images/1738954034648.jpg\",\"http://localhost:5000/images/1738954034649.jpg\",\"http://localhost:5000/images/1738954034652.jpg\"]', 'Jalan Abdul Gani Atas, Kota Batu, Malang', 'https://maps.app.goo.gl/UsvxJSUYj8iiYtpG9', NULL, '2025-02-07 23:11:51', '2025-02-08 01:47:14'),
(9, 3, 1, 'Rimba Raya Bee Farm', 'Rimba Raya Bee Farm merupakan peternakan tawon yang memproduksi madu beserta produk-produk olahannya dengan kualitas tinggi dan menyehatkan. Rimba Raya mengembangkan 3 jenis lebih madu yaitu:\r\n◉ Apis Trigona\r\n◉ Apis Melifera\r\n◉ Apis Indica / Apis Cerana\r\n\r\nRimba Raya Bee Farm menyediakan berbagai produk hasil lebah seperti:\r\n◉ Bee Pollen untuk Anti Aging\r\n◉ Bee Pollen untuk Diabetes\r\n◉ Bee Pollen untuk Jantung Koroner\r\n◉ Bee Pollen untuk Kesuburan\r\n◉ Bee Pollen Plus CMP untuk Asam Urat\r\n◉ Bee Pollen Plus CMP untuk Batu Ginjal\r\n◉ Bee Pollen Plus Royal Jelly untuk Anti Aging\r\n◉ Bee Pollen Plus Royal Jelly untuk Diabetes\r\n◉ Bee Pollen Plus Royal Jelly untuk Fatty Liver\r\n◉ Bee Pollen Plus Royal Jelly untuk Jantung Koroner\r\n◉ Bee Pollen Plus Royal Jelly untuk Kesuburan\r\n◉ Bee Pollen Plus Royal Jelly untuk Nyeri Sendi dan Osteoporosis\r\n◉ Madu Kaliandra\r\n◉ Madu Kelengkeng\r\n◉ Madu Klanceng\r\n◉ Madu Multiflora\r\n◉ Madu Nektar Singkong\r\n◉ Madu Propolis Alergi\r\n◉ Madu Propolis Infeksi\r\n◉ Madu Randu\r\n◉ Madu Royal Jelly\r\n◉ Madu Sarang\r\n◉ Madu Susu Ratu\r\n◉ Lilin Lebah\r\n◉ Dan Lain-lain\r\n\r\nRimba Raya Bee Farm didukung oleh tim management yang profesional, solid dan berpengalaman akan berpartisipasi untuk memenuhi kebutuhan Produk Hasil Lebah Terlengkap hingga Agro Tawon Wisata Petik Madu di Lawang Malang. Rimba Raya Bee Farm selalu bertekad untuk melayani dan memuaskan pelanggan dengan mutu dan kualitas produk serta harga yang kompetitif.\r\n', 'Melihat peternakan madu, Petik madu ', 'Olahan madu', 'public\\images\\1738944995180.jpeg', 'http://localhost:5000/images/1738944995180.jpeg', '10000', '[\"http://localhost:5000/images/1738944995182.jpeg\",\"http://localhost:5000/images/1738944995182.jpeg\",\"http://localhost:5000/images/1738944995185.jpeg\"]', '[\"public\\\\images\\\\1738944995182.jpeg\",\"public\\\\images\\\\1738944995182.jpeg\",\"public\\\\images\\\\1738944995185.jpeg\"]', 'Jl. DR. Wahidin No.8 (120, Polaman, Bedali, Kec. Lawang, Kabupaten Malang, Jawa Timur 65215, Indonesia', 'https://maps.app.goo.gl/pY3Ky2vap6CLDMyn8', NULL, '2025-02-07 23:16:35', '2025-02-07 23:16:35'),
(10, 3, 2, 'Wisata Petik Jeruk Bedengan ', 'Wisata Petik Jeruk Bedengan merupakan tempat wisata yang cocok bagi keluarga, pelajar serta masyarakat umum dikarenakan Wisata Petik Jeruk Selorejo memberikan fasilitas edukasi bagi wisatawan tentang buah jeruk dari bagaimana penanaman hingga wisatawan mendapatkan pengalaman unik dan berkesan dengan memetik jeruk dari pohon secara langsung.\r\n\r\nLokasinya yang sangat strategis karena terletak tidak jauh dari Pusat Kota Malang, dan dapat dicapai dengan melalui jalan raya antara Malang dan Batu atau sekitar 8 km dari Kantor Kecamatan Dau. Lokasinya dari arah Taman Rekreasi Sengkaling menuju ke arah selatan lalu berbelok ke barat menuju Desa Selorejo. \r\n\r\nDi sini wisatawan akan menemukan destinasi wisata yang tidak kalah indahnya dengan tempat wisata agro lainnya karena lebih alami dan kental dengan aroma pedesaan. Topografi Desa Selorejo yang berada di daerah dataran tinggi atau perbukitan dengan ketinggian 800-1.200 mdpl menyebabkan daerah ini memiliki tingkat curah hujan hingga 100 mm/tahun sehingga wisatawan dapat menikmati kesejukan alam yang asri.\r\n\r\nWisata Petik Jeruk Bedengan memiliki jam buka 08.00 hingga 15.00 WIB dengan tarif tiket masuk yang cukup murah yaitu sebesar Rp. 20.000 / orang dewasa; Rp. 10.000 / orang untuk anak-anak, dimana tarif tersebut sudah termasuk welcome drink jus jeruk yang segar dan fasilitas menunjang lainnya yang sangat lengkap.\r\n', 'Petik Buah jeruk', '-', 'public\\images\\1738946448091.jpg', 'http://localhost:5000/images/1738946448091.jpg', '20000', '[\"public\\\\images\\\\1738946448096.jpg\",\"public\\\\images\\\\1738946448101.jpg\",\"public\\\\images\\\\1738946448103.jpg\",\"public\\\\images\\\\1738946448106.jpg\",\"public\\\\images\\\\1738946448107.jpg\"]', '[\"http://localhost:5000/images/1738946448096.jpg\",\"http://localhost:5000/images/1738946448101.jpg\",\"http://localhost:5000/images/1738946448103.jpg\",\"http://localhost:5000/images/1738946448106.jpg\",\"http://localhost:5000/images/1738946448107.jpg\"]', 'Jl. Watu Gede, RT.01/RW.01, Selorejo, Kec. Dau, Kabupaten Malang, Jawa Timur 65151, Indonesia', 'https://maps.app.goo.gl/rM1JRbwNyH3tx7bJ6', NULL, '2025-02-07 23:40:48', '2025-02-07 23:40:48'),
(11, 2, 1, 'Agrowisata Bhumi Merapi', 'Selain menyajikan wisata edukasi budidaya ternak dan perkebunan, Bhumi Merapi juga sangat populer akan spot-spot foto bertema Santorini, Alpen, dll. Harga tiket masuknya 30 rb saja dan tidak perlu bayar lagi untuk berfoto di spot-spotnya. Puas banget!\r\n\r\nPerpaduan wisata edukasi dengan spot-spot foto yang cantik di Agrowisata Bhumi Merapi menjadikannya sangat populer sebagai tempat wisata keluarga. Berbeda dengan banyak tempat wisata di Kaliurang yang tutup pada hari Senin, Agrowisata Bhumi Merapi buka setiap hari.\r\n\r\nRute paling mudah adalah lewat Jl. Kaliurang. Sebelum gerbang retribusi kawasan wisata Kaliurang, ada billboard besar yang menunjukkan jalan masuk ke Agrowisata Bhumi Merapi.\r\n', 'Spot Foto, Gazebo untuk istirahat\r\n', 'Parkir, Pakan hewan \r\n', 'public\\images\\1738946611971.png', 'http://localhost:5000/images/1738946611971.png', '30000', '[\"public\\\\images\\\\1738946611974.png\",\"public\\\\images\\\\1738946611978.png\",\"public\\\\images\\\\1738946611982.png\",\"public\\\\images\\\\1738946611985.png\"]', '[\"http://localhost:5000/images/1738946611974.png\",\"http://localhost:5000/images/1738946611978.png\",\"http://localhost:5000/images/1738946611982.png\",\"http://localhost:5000/images/1738946611985.png\"]', 'Jl. Kaliurang No.Km.20, Sawungan, Hargobinangun, Kec. Pakem, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55582, Indonesia ', 'https://maps.app.goo.gl/LNZXu5AqA9LdGgpe9', NULL, '2025-02-07 23:43:31', '2025-02-07 23:43:31'),
(12, 2, 2, 'Kebun Buah Mangunan', 'Kebun Buah Mangunan dapat menjadi alternatif wisata pegunungan bagi yang tidak suka mendaki. Pemandangan dari atas perbukitan setinggi 150-200 Mdpl ini begitu memesona. Terlebih saat pagi hari, waktu menikmati matahari terbit dengan udara yang sangat segar. Apalagi ketika cerah, pengunjung dapat menikmati indahnya kabut yang menyelimuti sebelum munculnya matahari.\r\nKebun seluas kurang lebih 23 hektar ini begitu memesona. Dari atas perbukitan, pengunjung dapat menyaksikan indahnya hijau pepohonan di bawah. Liukkan Sungai Oyo yang melintang menjadi pembatas desa-desa pun tak kalah indahnya. Membawa air yang jernih khas warna sungai, yang menjadikan perpaduan alam menjadi sempurna.\r\n', 'Menyaksikan Hewan satwa, Memancing, Taman bermain\r\n', 'Parkir, Memetik buah \r\n', 'public\\images\\1738946703531.png', 'http://localhost:5000/images/1738946703531.png', '5000', '[\"public\\\\images\\\\1738946703535.png\",\"public\\\\images\\\\1738946703538.png\"]', '[\"http://localhost:5000/images/1738946703535.png\",\"http://localhost:5000/images/1738946703538.png\"]', 'Jl. Imogiri - Dlingo, Sukorame, Mangunan, Kec. Dlingo, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55783, Indonesia ', 'https://maps.app.goo.gl/cRAA8VDKSj88N44p8', NULL, '2025-02-07 23:45:03', '2025-02-07 23:45:03'),
(13, 2, 1, 'Agrowisata Turi Sleman', 'Agrowisata Turi Sleman adalah sebuah destinasi wisata yang terletak di Dusun Gadung, Desa Bangun Kerto, Kecamatan Turi, Kabupaten Sleman, Yogyakarta. Tempat ini terkenal dengan perkebunan salak dan berada di ketinggian 200 mdpl dengan luas area sekitar 27 hektare.\r\n\r\nSelain keunikan perkebunan salaknya, Agrowisata Turi juga menawarkan pemandangan indah dan suasana yang sejuk dan asri. Hal ini menjadi daya tarik tambahan bagi pengunjung.\r\n', 'Memancing, Memetik buah, Mengamati burung, Gazebo\r\n', 'Parkir', 'public\\images\\1738946799830.png', 'http://localhost:5000/images/1738946799830.png', '15000', '[\"public\\\\images\\\\1738946799847.jpg\",\"public\\\\images\\\\1738946799847.png\",\"public\\\\images\\\\1738946799850.png\"]', '[\"http://localhost:5000/images/1738946799847.jpg\",\"http://localhost:5000/images/1738946799847.png\",\"http://localhost:5000/images/1738946799850.png\"]', 'Gadung, Bangun Kerto, Kec. Turi, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55551, Indonesia ', 'https://maps.app.goo.gl/L5AkhssEhRQgKTUx7', NULL, '2025-02-07 23:46:39', '2025-02-07 23:46:39'),
(14, 2, 3, 'Agrowisata Banyu Sumilir', 'Outbound centre berada dalam lahan yang cukup luas dengan panorama alam, angin, air dan udara pegunungan yang masih asli menyatu dengan lingkungan komplek Desa wisata Pasar Kasultanan Sorowulan. Merupakan bagian dari CSR Rumah Sakit PURI HUSADA yang menampilkan berbagai macam wahana permainan edukasi yang dapat menggali potensi, kepercayaan dan jati diri.\r\nMelihat dari animo yang begitu besar dari masyarakat atau wisatawan yang datang serta masukan yang diberikan kepada Banyu Sumilir Outbond Centre, akhirnya manajemen melengkapi fasilitas wisma, penginapan juga ruang pertemuan (sebagai sarana dan prasarana bagi pengunjung yang hendak menikmati suasana bernuansa alam).\r\n', 'Lahan camping, Air minum\r\n', 'Snack, Paket logistik\r\n', 'public\\images\\1738946933451.png', 'http://localhost:5000/images/1738946933451.png', '45000', '[\"public\\\\images\\\\1738946933454.png\",\"public\\\\images\\\\1738946933459.png\",\"public\\\\images\\\\1738946933463.png\",\"public\\\\images\\\\1738946933464.png\"]', '[\"http://localhost:5000/images/1738946933454.png\",\"http://localhost:5000/images/1738946933459.png\",\"http://localhost:5000/images/1738946933463.png\",\"http://localhost:5000/images/1738946933464.png\"]', 'Desa Srowolan, Karanggeneng, Purwobinangun, Kec. Pakem, Kabupaten Sleman, Daerah Istimewa Yogyakarta', 'https://maps.app.goo.gl/hmBjTg41U5bmcLhn6', NULL, '2025-02-07 23:48:53', '2025-02-07 23:48:53'),
(15, 2, 3, 'Agrowisata Kalibiru ', 'Kami ada di Kalibiru, sebuah desa di Pegunungan Menoreh yang menjadi pagar sisi barat Yogyakarta. Di pegunungan inilah 200 tahun silam Pangeran Diponegoro bersama pasukannya pernah berjuang melawan Belanda, sebelum akhirnya ditipu dan kemudian dibuang ke Sulawesi hingga akhir hayat. Kalibiru menjadi sebuah desa yang terkenal karena ekoturismenya. Hal itu tidak begitu saja terjadi, perlu berpuluh tahun mengembalikan keelokan Kalibiru yang sebelumnya sempat tandus karena aksi pembalakan hutan. Kini, berkat usaha penduduk menghutankan desa, wisata Kalibiru dapat menggerakkan perekonomian dan menjadi sumber penghidupan warga. Begitulah antara alam dan manusia, saling menghidupi.', 'Menikmati pemandangan perbukitan, Pendopoan, Arena outbond\r\n', 'Wahana flying fox', 'public\\images\\1738947123069.png', 'http://localhost:5000/images/1738947123069.png', '10000', '[\"public\\\\images\\\\1738947123072.png\",\"public\\\\images\\\\1738947123077.png\"]', '[\"http://localhost:5000/images/1738947123072.png\",\"http://localhost:5000/images/1738947123077.png\"]', 'Jalan Waduk Sermo, Kalibiru, Hargowilis, Kec. Kokap, Kabupaten Kulon Progo, Daerah Istimewa Yogyakarta 55653, Indonesia', 'https://maps.app.goo.gl/MAhBX18BoeHT2buW9', NULL, '2025-02-07 23:52:03', '2025-02-07 23:52:03'),
(16, 1, 2, 'Vin’s Berry Park', 'Kebun berry seluas 2 hektar di lokasi berudara dingin khas pegunungan itu tumbuh sekitar 60 ribuan pohon yang terdiri atas pohon strawberry,raspberry dan blackberry, Agar anda bisa merasakan pengalaman memetik dan merasakan buah segar yang baru dipetik.\r\nDi lokasi ini juga terdapat 6 green house yang bibitnya berasal dari amerika serikat dan inggris,Di vin’s berry park para pengunjung bisa menikmati pengalaman berwisata sekaligus belajar banyak hal, terutama tentang cara menanam,merawat buah strawberry, raspberry dan blackberry hingga berbuah, termasuk cara membuat berbagai olahan lezat berbahan dasar strawberry.\r\n', 'Hak untuk memetik buah stroberi hingga 1 kilogram, Akses ke green house untuk penjelasan lebih detail tentang budidaya stroberi, Alat bantu untuk memetik buah\r\n', 'Produk olahan buah beri lainnya\r\n', 'public\\images\\1738947452288.jpg', 'http://localhost:5000/images/1738947452288.jpg', '70000', '[\"public\\\\images\\\\1738947452290.jpg\",\"public\\\\images\\\\1738947452291.jpg\",\"public\\\\images\\\\1738947452291.jpg\",\"public\\\\images\\\\1738947452292.jpg\",\"public\\\\images\\\\1738947452293.jpg\"]', '[\"http://localhost:5000/images/1738947452290.jpg\",\"http://localhost:5000/images/1738947452291.jpg\",\"http://localhost:5000/images/1738947452291.jpg\",\"http://localhost:5000/images/1738947452292.jpg\",\"http://localhost:5000/images/1738947452293.jpg\"]', 'Jl. Kolonel Masturi No.577, Jambudipa, Cisarua, Jambudipa, Kec. Cisarua, Kabupaten Bandung Barat, Jawa Barat 40551', 'https://maps.app.goo.gl/TAC8JX1y2KhWreqS8', NULL, '2025-02-07 23:57:32', '2025-02-07 23:57:32'),
(17, 1, 2, 'Mupu jeruk ', 'Tempat wisata ini sudah dibuka sejak tahun 2018 ini. Kebun jeruk ini buka setiap hari Selasa hingga Minggu mulai pukul 08.00 hingga 17.00 WIB. Dikutip dari Instagram @mupu_jeruk, wisata ini berlokasi di Jl. Setiabudhi Atas No. 380 B Bandung.\r\nTerbentuknya wisata ini berawal dari kecintaan pemilik terhadap tanaman. Salah satunya tanaman jeruk dekopon yang jarang dibudidayakan. Sejak saat itu, tercipta agro wisata jeruk Dekopon di kota Bandung.\r\nDekopon adalah salah satu jenis jeruk tanpa biji dan manis Jepang. Jeruk tersebut adalah hibrida antara Kiyomi dan Ponkan. Jeruk Dekopon memiliki ciri khas pangkal buah yang menyembul seperti buah pir.\r\n', 'Petik buah max 1 kg, Pemandu, Keranjang, Gunting\r\n', 'Bibit jeruk dekopon, Makan, minuman\r\n', 'public\\images\\1738947867657.jpg', 'http://localhost:5000/images/1738947867657.jpg', '70000', '[\"public\\\\images\\\\1738947867659.jpg\",\"public\\\\images\\\\1738947867660.jpg\",\"public\\\\images\\\\1738947867661.jpg\",\"public\\\\images\\\\1738947867662.jpg\",\"public\\\\images\\\\1738947867664.jpg\",\"public\\\\images\\\\1738947867665.png\"]', '[\"http://localhost:5000/images/1738947867659.jpg\",\"http://localhost:5000/images/1738947867660.jpg\",\"http://localhost:5000/images/1738947867661.jpg\",\"http://localhost:5000/images/1738947867662.jpg\",\"http://localhost:5000/images/1738947867664.jpg\",\"http://localhost:5000/images/1738947867665.png\"]', 'Jl. Dr. Setiabudi No.380B, Ledeng, Kec. Cidadap, Kota Bandung, Jawa Barat', 'https://maps.app.goo.gl/Tkd5TbeCa9X7sjiz9', NULL, '2025-02-08 00:04:27', '2025-02-08 00:04:27'),
(18, 1, 3, 'Pesona pandawas', 'Pesona Padaawas menawarkan wisata perkebunan teh di ketinggian hampir 1500 Mdpl. Berada di dataran tinggi Bandung yang sekelilingnya berupa perbukitan hijau. Sangat cocok bagi yang ingin mencari udara segar dan bersih. Selain itu bentang alamnya pun memesona dengan pemandangan hijau dan asri.\r\nSelama berada di sini tersedia berbagai aktivitas menarik. Pengunjung bisa berfoto di instalasi yang tersedia. Berpiknik dan berkeliling di tengah sejuknya perkebunan teh. Hingga berkemah dan glamping untuk menikmati suasana malam.\r\n', 'Bisa berfoto-foto di area yang telah disediakan.', 'Parkir, Sewa gazebo\r\n', 'public\\images\\1738948106140.jpg', 'http://localhost:5000/images/1738948106140.jpg', '10000', '[\"public\\\\images\\\\1738948106141.jpg\",\"public\\\\images\\\\1738948106142.jpg\",\"public\\\\images\\\\1738948106142.jpg\",\"public\\\\images\\\\1738948106143.jpg\",\"public\\\\images\\\\1738948106144.jpg\",\"public\\\\images\\\\1738948106145.jpg\",\"public\\\\images\\\\1738948106146.jpeg\"]', '[\"http://localhost:5000/images/1738948106141.jpg\",\"http://localhost:5000/images/1738948106142.jpg\",\"http://localhost:5000/images/1738948106142.jpg\",\"http://localhost:5000/images/1738948106143.jpg\",\"http://localhost:5000/images/1738948106144.jpg\",\"http://localhost:5000/images/1738948106145.jpg\",\"http://localhost:5000/images/1738948106146.jpeg\"]', 'RHMV+35, Margamulya, Pangalengan, Bandung Regency, West Java', 'https://maps.app.goo.gl/CHNp8vRoCX7f1kjq7', NULL, '2025-02-08 00:08:26', '2025-02-08 00:08:26'),
(19, 1, 1, 'Tani Kota', 'Agrowisata ini sangat cocok untuk anak-anak yang akan menjadi generasi penerus nantinya. Tani Kota dapat menjadi inspirasi bagi kita semua untuk melakukan kegiatan pertanian di perkotaan. Kegiatan wisata pertanian di Tani Kota masih tradisional dimana pengunjung akan dikenalkan dengan hortikultura, budidaya tanaman kebun seperti sayuran. \r\nDi Tani Kota, kita akan dijelaskan budidaya tanaman selada, bayam, cabai, kangkung, dan lainnya. Jika kebetulan sedang saatnya panen, pengunjung dapat ikut merasakan memanen sayuran. Asyiknya lagi, sayuran yang kita petik sendiri dapat dibawa pulang. Di Tani Kota juga terdapat sawah. Anak-anak kota yang lebih sering berjalan di pertokoan di dalam mal, kali ini akan diajak berjalan menyusuri pematang sawah. Tidak hanya merasakan suasana yang berbeda, tapi juga sekaligus belajar mencintai alam.\r\n', 'Pemandu, Peralatan kebun, Bibit tanaman, Petunjuk berkebun, Pengalaman praktis\r\n', 'Makanan, Minuman, Souvenir\r\n', 'public\\images\\1738948470023.jpg', 'http://localhost:5000/images/1738948470023.jpg', '50000', '[\"public\\\\images\\\\1738948470024.jpg\",\"public\\\\images\\\\1738948470026.jpg\",\"public\\\\images\\\\1738948470027.jpg\",\"public\\\\images\\\\1738948470028.jpg\",\"public\\\\images\\\\1738948470030.jpg\",\"public\\\\images\\\\1738948470032.jpg\",\"public\\\\images\\\\1738948470034.jpg\",\"p', '[\"http://localhost:5000/images/1738948470024.jpg\",\"http://localhost:5000/images/1738948470026.jpg\",\"http://localhost:5000/images/1738948470027.jpg\",\"http://localhost:5000/images/1738948470028.jpg\",\"http://localhost:5000/images/1738948470030.jpg\",\"http://localhost:5000/images/1738948470032.jpg\",\"http://localhost:5000/images/1738948470034.jpg\",\"http://localhost:5000/images/1738948470035.jpg\"]', 'Jl. Cisitu Indah VI, Dago, Kecamatan Coblong, Kota Bandung, Jawa Barat 40135', 'https://maps.app.goo.gl/Y18R3A3L8pZE1wWR9', NULL, '2025-02-08 00:14:30', '2025-02-08 00:14:30'),
(20, 5, 1, 'Scientia Square Park Jabodetabek', 'Scientia Square Park merupakan sebuah ruang terbuka hijau di Tangerang yang memiliki banyak wahana dan fasilitas. Di sana para pengunjung bisa melakukan aktivitas dengan hewan seperti menunggangi kuda, memberi makan kelinci, memegang kerbau dan lainnya. Tempat wisata yang satu ini berlokasi di Jalan Scientia Boulevard, Curug Sangereng, Kelapa Dua, Kabupaten Tangerang. Posisinya dekat dengan Universitas Multimedia Nusantara (UMN) Tangerang. Pada akhir pekan, Scientia Square Park banyak dipenuhi pengunjung. Rata-rata wisatawan yang datang membawa anak-anak. Sebab disini terdapat banyak wahana yang disukai anak-anak.\r\n', 'Foto foto di area science square park, Fasilitas umum, Pengalaman edukasi\r\n', 'Makanan dan Minuman, Fasilitas Premium, Wahana\r\n', 'public\\images\\1738948592369.jpg', 'http://localhost:5000/images/1738948592369.jpg', '45000', '[\"public\\\\images\\\\1738948592371.jpg\",\"public\\\\images\\\\1738948592371.jpg\",\"public\\\\images\\\\1738948592372.jpg\",\"public\\\\images\\\\1738948592373.jpg\",\"public\\\\images\\\\1738948592373.jpg\",\"public\\\\images\\\\1738948592374.jpg\"]', '[\"http://localhost:5000/images/1738948592371.jpg\",\"http://localhost:5000/images/1738948592371.jpg\",\"http://localhost:5000/images/1738948592372.jpg\",\"http://localhost:5000/images/1738948592373.jpg\",\"http://localhost:5000/images/1738948592373.jpg\",\"http://localhost:5000/images/1738948592374.jpg\"]', 'Jl. Scientia Boulevard, Curug Sangereng, Kec. Klp. Dua, Kabupaten Tangerang, Banten 15810', 'https://maps.app.goo.gl/TESKafHXRPLtW39q6', NULL, '2025-02-08 00:16:32', '2025-02-08 00:16:32'),
(21, 5, 1, 'Kebun Wisata Pasirmukti', 'Ada sebuah pondokkan yang punya desain interior dan eksterior khas Minahasa. Selama berada di sekitar pondokkan tersebut, pengunjung bebas untuk melakukan kegiatan luar ruangan seperti berjalan di pinggir sawah yang hijau, camping, hingga memancing ikan. Jika kamu datang dengan rombongan berjumlah banyak, bisa melakukan olahraga beregu secara mandiri seperti futsal atau sepakbola dan senam bersama. Bagi pengunjung dari rombongan anak sekolah, ada pembelajaran dan pengetahuan seputar biopori, daur ulang sampah, hingga bahaya penggunaan kemasan plastik. Sesuai dengan namanya, Kebun Wisata Pasirmukti juga memiliki area perkebunan untuk buah. Ada, Duku Rambutan Manggis Mangga Jambu air Jeruk katsuri Jeruk kasturi atau lemon cui menjadi salah satu produk hasil panen Kebun Wisata Pasirmukti yang diunggulkan. Bahkan, tempat wisata Bogor seru yang satu ini, memproduksi sendiri Sirup dan Selai dari jeruk kasturi. Setiap pengunjung yang datang akan mendapatkan minuman selamat datang dari sirup jeruk kasturi.\r\n', 'Agrowisata max 30 orang', '-', 'public\\images\\1738948908330.png', 'http://localhost:5000/images/1738948908330.png', '160000', '[\"public\\\\images\\\\1738948908331.png\",\"public\\\\images\\\\1738948908333.png\",\"public\\\\images\\\\1738948908335.png\",\"public\\\\images\\\\1738948908338.png\",\"public\\\\images\\\\1738948908340.png\",\"public\\\\images\\\\1738948908351.png\",\"public\\\\images\\\\1738948908358.png\",\"p', '[\"http://localhost:5000/images/1738948908331.png\",\"http://localhost:5000/images/1738948908333.png\",\"http://localhost:5000/images/1738948908335.png\",\"http://localhost:5000/images/1738948908338.png\",\"http://localhost:5000/images/1738948908340.png\",\"http://localhost:5000/images/1738948908351.png\",\"http://localhost:5000/images/1738948908358.png\",\"http://localhost:5000/images/1738948908366.png\",\"http://localhost:5000/images/1738948908368.png\",\"http://localhost:5000/images/1738948908371.png\"]', 'Jalan Raya Tajur Pasirmukti KM. 4 Citeureup, Bogor.', 'https://maps.app.goo.gl/a4C9kn1DBeyMKEiE8', NULL, '2025-02-08 00:21:48', '2025-02-08 00:21:48'),
(22, 5, 3, 'Taman Wisata Alam Mangrove', 'Merupakan ekosistem lahan basah yang didominasi oleh pepopohonan mangrove. Kawasan konservasi sangat dibutuhkan di Jakarta, kota Indonesia yang sangat kekurangan akan lahan hijau terbuka, memiliki tingkat polusi udara yang cukup tinggi serta mulai mengalami erosi dan abrasi garis pantai. Surga hijau seluas 99,82 hektar ini terletak di kelurahan Kamal Muara yang bersebelahan dengan kawasan elit Pantai Indah Kapuk di Jakarta Utara. Lokasinya membuat sangat mudah untuk dikunjungi baik melalui akses Tol dalam kota maupun Tol JORR atau dengan Transportasi Umum seperti Bis TransJakarta.', 'Penanaman Mangrove\r\n\r\n', 'Parkir, Penyewaan Perahu dan Kano, Penginapan\r\n', 'public\\images\\1738949118040.jpg', 'http://localhost:5000/images/1738949118040.jpg', '30000', '[\"public\\\\images\\\\1738949118071.jpg\",\"public\\\\images\\\\1738949118127.jpg\",\"public\\\\images\\\\1738949118129.jpg\",\"public\\\\images\\\\1738949118130.jpg\",\"public\\\\images\\\\1738949118132.jpg\"]', '[\"http://localhost:5000/images/1738949118071.jpg\",\"http://localhost:5000/images/1738949118127.jpg\",\"http://localhost:5000/images/1738949118129.jpg\",\"http://localhost:5000/images/1738949118130.jpg\",\"http://localhost:5000/images/1738949118132.jpg\"]', 'Taman Wisata Alam Mangrove Angke Kapuk Jl. Mualim Teko, Pantai Indah Kapuk Jakarta Utara, 14470', 'https://maps.app.goo.gl/BHBrkv8JHgVbABts5', NULL, '2025-02-08 00:25:18', '2025-02-08 00:25:18'),
(23, 5, 3, 'Sunge Jingkem Sembilangan', 'Sunge jingkem sembilanagn salah satu tempat ekowisata mangrove yang di bangun secara swadaya dan swadana oleh forum pemuda dan masyarakat bertujuan mengangkat perekonomian dan meningkatkan kreatifitas masyarakat. Dengan aliran sungai yang di tepiannya di tumbuhi pohon mangrove mampu memanjakan para wisatawan untuk menikmati alam dan menikmati kuliner khas di daerah kampung terpencil, Dari awal di buka tahun 2019 ekowisata Sunge Jingkem Sembilangan yang di bangun dan dikelola oleh forum pemuda kampung setempat mampu mendatangkan wisatawan 6000-10.000 pengunjung/ bulannya.\r\n', 'Wisata perahu, Wisata jembatan kembar, Spot foto', '-', 'public\\images\\1738949266541.jpg', 'http://localhost:5000/images/1738949266541.jpg', '50000', '[\"public\\\\images\\\\1738949266543.jpg\",\"public\\\\images\\\\1738949266544.webp\",\"public\\\\images\\\\1738949266545.jpg\",\"public\\\\images\\\\1738949266546.webp\",\"public\\\\images\\\\1738949266546.jpg\"]', '[\"http://localhost:5000/images/1738949266543.jpg\",\"http://localhost:5000/images/1738949266544.webp\",\"http://localhost:5000/images/1738949266545.jpg\",\"http://localhost:5000/images/1738949266546.webp\",\"http://localhost:5000/images/1738949266546.jpg\"]', 'Kp. Sembilangan, RT.01/RW.RT.09, Samudra Jaya, Kec. Tarumajaya, Kabupaten Bekasi, Jawa Barat 17217', 'https://maps.app.goo.gl/snUNEoGzTKdExxyt9', NULL, '2025-02-08 00:27:46', '2025-02-08 00:27:46'),
(29, 6, 3, 'Eco Wisata Mangrove Gunung Anyar', 'Terletak di kawasan pesisir, Mangrove Gunung Anyar menyuguhkan panorama alam yang memukau serta pengalaman ekowisata yang berbeda dari biasanya. Di tempat ini, kamu dapat menjelajahi hamparan hutan mangrove yang rimbun sambil menyusuri jembatan kayu yang membentang di tengah keindahan alamnya.\r\nMangrove Gunung Anyar juga mengedepankan konsep wisata edukasi, memberikan kesempatan bagi pengunjung untuk belajar tentang pentingnya pelestarian mangrove sembari menikmati suasana yang tenang. Dengan fasilitas yang memadai, pengalamanmu di sini akan terasa nyaman dan penuh kesan.\r\nDestinasi ini sangat cocok bagi kamu yang ingin sejenak menjauh dari hiruk-pikuk perkotaan dan merasakan ketenangan alam yang masih terjaga keasriannya. Jangan ragu untuk merencanakan perjalanan ke Surabaya dan temukan pesona Mangrove Gunung Anyar sekarang juga!\r\n', 'Jogging track, Menara pantau, Spot foto\r\n', 'Wisata perahu, ATV, Wisata air, Penanaman dan Pembibitan mangrove\r\n', 'public\\images\\1738949463673.png', 'http://localhost:5000/images/1738949463673.png', '15000', '[\"public\\\\images\\\\1738949463676.png\",\"public\\\\images\\\\1738949463682.png\",\"public\\\\images\\\\1738949463685.png\",\"public\\\\images\\\\1738949463688.png\",\"public\\\\images\\\\1738949463697.png\"]', '[\"http://localhost:5000/images/1738949463676.png\",\"http://localhost:5000/images/1738949463682.png\",\"http://localhost:5000/images/1738949463685.png\",\"http://localhost:5000/images/1738949463688.png\",\"http://localhost:5000/images/1738949463697.png\"]', 'Jl. Wisata Mangrove Gunung Anyar Tambak, Surabaya, East Java 60294', 'https://www.google.com/maps?hl=en&gl=id&um=1&ie=UTF-8&fb=1&sa=X&ftid=0x2dd7f009d2865ff9:0x129ac3af639d83e5', NULL, '2025-02-08 00:31:03', '2025-02-08 00:31:03'),
(30, 6, 3, 'Wisata Perahu Kalimas Rute Monkasel - Siola', 'Wisata perahu kalimas rute ini menawarkan nuansa lampu lampion di sepanjang rute perjalanan. Anda dapat menikmati spot foto di menarik dalam perjalanannya.\r\n\r\nLetak Kalimas memang sangat strategis dan memegang peranan penting dalam perjalanan sejarah Kota Surabaya.\r\nPada masa kerajaan Majapahit, muara Kalimas menjadi pintu gerbang menuju ibu kota di Trowulan. Sedangkan pada masa VOC, Kalimas menjadi salah satu prasarana transportasi air untuk beragam komoditas.\r\n\r\nPelabuhan rakyat Kalimas juga menjadi jantung perdagangan Kota Surabaya. Pada masa pemerintah kolonial Hindia Belanda, infrastruktur air maupun darat dibenahi yang menandakan posisi Kalimas yang vital bagi pemerintah kolonial.\r\n', 'Naik perahu', '-', 'public\\images\\1738949640370.webp', 'http://localhost:5000/images/1738949640370.webp', '7000', '[\"public\\\\images\\\\1738949640370.jpg\",\"public\\\\images\\\\1738949640373.webp\",\"public\\\\images\\\\1738949640374.webp\",\"public\\\\images\\\\1738949640374.jpg\",\"public\\\\images\\\\1738949640375.png\",\"public\\\\images\\\\1738949640397.png\",\"public\\\\images\\\\1738949640425.png\",', '[\"http://localhost:5000/images/1738949640370.jpg\",\"http://localhost:5000/images/1738949640373.webp\",\"http://localhost:5000/images/1738949640374.webp\",\"http://localhost:5000/images/1738949640374.jpg\",\"http://localhost:5000/images/1738949640375.png\",\"http://localhost:5000/images/1738949640397.png\",\"http://localhost:5000/images/1738949640425.png\",\"http://localhost:5000/images/1738949640456.png\",\"http://localhost:5000/images/1738949640460.png\"]', 'Jl. Pemuda No.39, Ketabang, Kec. Genteng, Surabaya, Jawa Timur 60271', 'https://maps.app.goo.gl/Ze9c5szJtn94wm2DA', NULL, '2025-02-08 00:34:00', '2025-02-08 00:34:00'),
(31, 6, 3, 'Taman Hiburan Pantai Kenjeran', 'Taman Hiburan Pantai Kenjeran menyuguhkan daya tarik wisata pesisir pantai di utara Kota Surabaya. Keindahan pesona pantai dengan pemandangan berlatar belakang Jembatan Suramadu bisa dinikmati dari sini. Beragam fasilitas seperti playground, gazebo, anjungan, stan – stan souvenir produk UMKM, dan foodcourt yang menawarkan berbagai pilihan kuliner khas pesisir wajib dicoba saat berwisata di THP Kenjeran.\r\n', 'Playground, Gazebo\r\n', 'Souvenir, Makanan\r\n', 'public\\images\\1738949761776.png', 'http://localhost:5000/images/1738949761776.png', '15000', '[\"public\\\\images\\\\1738949761778.png\",\"public\\\\images\\\\1738949761784.png\",\"public\\\\images\\\\1738949761788.png\",\"public\\\\images\\\\1738949761793.png\",\"public\\\\images\\\\1738949761798.png\"]', '[\"http://localhost:5000/images/1738949761778.png\",\"http://localhost:5000/images/1738949761784.png\",\"http://localhost:5000/images/1738949761788.png\",\"http://localhost:5000/images/1738949761793.png\",\"http://localhost:5000/images/1738949761798.png\"]', 'Jl. Pantai Lama Kenjeran No. 1', 'https://maps.app.goo.gl/dZpwiP6kfoFA2iDE9', NULL, '2025-02-08 00:36:01', '2025-02-08 00:36:01'),
(32, 6, 3, 'Ekowisata Mangrove Wonorejo', 'Ekowisata Mangrove Wonorejo merupakan area konservasi Hutan Bakau kurang lebih seluas 200 hektar yang terletak di Surabaya Timur. Secara geografis dan ekologis, wilayah ini memiliki fungsi yang sangat penting bagi Kota Surabaya. Salah satu fungsi adalah untuk mencegah ancaman intrusi air laut. Keberadaan hutan mangrove juga menjadi rumah bagi ratusan spesies burung yang bermigrasi. Keindahan hutan bakau ini dapat dinikmati dengan melewati area jogging track sepanjang ±1 km atau dengan menyusuri sungai menggunakan perahu yang tersedia di area Ekowisata Mangrove Wonorejo.', 'Jogging Track, Spot foto\r\n', 'Menanam mangrove, Menaiki Perahu\r\n', 'public\\images\\1738949874020.png', 'http://localhost:5000/images/1738949874020.png', '25000', '[\"public\\\\images\\\\1738949874024.png\",\"public\\\\images\\\\1738949874036.png\",\"public\\\\images\\\\1738949874041.png\",\"public\\\\images\\\\1738949874045.png\",\"public\\\\images\\\\1738949874053.png\",\"public\\\\images\\\\1738949874064.png\",\"public\\\\images\\\\1738949874068.png\"]', '[\"http://localhost:5000/images/1738949874024.png\",\"http://localhost:5000/images/1738949874036.png\",\"http://localhost:5000/images/1738949874041.png\",\"http://localhost:5000/images/1738949874045.png\",\"http://localhost:5000/images/1738949874053.png\",\"http://localhost:5000/images/1738949874064.png\",\"http://localhost:5000/images/1738949874068.png\"]', 'Jl. Wonorejo Timur No.1, Wonorejo, Kec. Rungkut, Surabaya, Jawa Timur 60296', 'https://maps.google.com/maps?hl=en&gl=id&um=1&ie=UTF-8&fb=1&sa=X&ftid=0x2dd7f064d69009bd:0xb47f9fdd085dae10', NULL, '2025-02-08 00:37:54', '2025-02-08 00:37:54'),
(33, 6, 1, 'Peternakan Susu Sapi Perah Barokah', 'Peternakan susu sapi perah Barokah tetap eksis di tengah persaingan industri susu modern yang menawarkan berbagai varian rasa dan kemasan yang lebih menarik.\r\nHingga saat ini, peternakan milik Ubaid ini kerap menjadi tujuan kunjungan, baik dari mahasiswa kedokteran yang ingin mempelajari proses produksi susu secara langsung maupun anak-anak yang mengikuti kegiatan study tour. Dengan sikapnya yang ramah dan terbuka, Ubaid selalu menyambut baik kunjungan tersebut, menjadikan tempat ini sebagai destinasi edukasi yang menarik dan informatif.\r\n', 'Peras susu sapi', 'Susu sapi', 'public\\images\\1738949964003.jpg', 'http://localhost:5000/images/1738949964003.jpg', '10000', '[\"public\\\\images\\\\1738949964005.jpg\",\"public\\\\images\\\\1738949964005.webp\",\"public\\\\images\\\\1738949964006.jpg\"]', '[\"http://localhost:5000/images/1738949964005.jpg\",\"http://localhost:5000/images/1738949964005.webp\",\"http://localhost:5000/images/1738949964006.jpg\"]', 'Platuk, Surabaya Utara', '#', NULL, '2025-02-08 00:39:24', '2025-02-08 00:39:24');

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `provinces` varchar(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`id`, `name`, `provinces`, `image`, `url`, `created_at`, `updated_at`) VALUES
(1, 'Bandung', 'Jawa Barat', 'public\\images\\1738936654099.jpg', 'http://localhost:5000/images/1738936654099.jpg', '2025-02-07 20:57:34', '2025-02-07 20:57:34'),
(2, 'Yogyakarta', 'Daerah Istimewa Yogyakarta', 'public\\images\\1738938481386.jpg', 'http://localhost:5000/images/1738938481386.jpg', '2025-02-07 21:18:06', '2025-02-07 21:28:01'),
(3, 'Malang', 'Jawa Timur', 'public\\images\\1738939714826.jpg', 'http://localhost:5000/images/1738939714826.jpg', '2025-02-07 21:37:47', '2025-02-07 21:48:34'),
(4, 'Solo', 'Jawa Tengah', 'public\\images\\1738939757072.jpg', 'http://localhost:5000/images/1738939757072.jpg', '2025-02-07 21:44:18', '2025-02-07 21:49:17'),
(5, 'Jakarta', 'Jawa Barat', 'public\\images\\1738941035333.jpg', 'http://localhost:5000/images/1738941035333.jpg', '2025-02-07 21:55:26', '2025-02-07 22:10:35'),
(6, 'Surabaya', 'Jawa Timur', 'public\\images\\1738950462887.jpg', 'http://localhost:5000/images/1738950462887.jpg', '2025-02-07 22:14:21', '2025-02-08 00:47:42');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `agrotourism_id` int(11) NOT NULL,
  `selected_date` date NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `review_text` text DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('NJLE5-h9YKJ-GWLIfoZc5mW5aulXdM2U', 1739126564, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2025-02-09T18:42:44.160Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"id\":24,\"name\":\"as\",\"firstname\":null,\"lastname\":null,\"phonenumber\":null,\"email\":\"official.cultivo@gmail.com\",\"password\":\"$2a$10$V9MARLaWPA6q3Non6dC4F.Qyo785DYj5r5VwvN5MUmjWzIgyhjDZi\",\"role_id\":null,\"created_at\":\"2025-02-09T17:41:00.000Z\",\"updated_at\":\"2025-02-09T17:41:33.000Z\",\"google_id\":null,\"isverified\":1,\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsImVtYWlsIjoib2ZmaWNpYWwuY3VsdGl2b0BnbWFpbC5jb20iLCJpYXQiOjE3MzkxMjI5NjQsImV4cCI6MTczOTEyNjU2NH0.QIH4X8kZt3di1Q95bsjxknSS9mvpwuRcVWHukcS7S7M\"}}}'),
('xrOZ5ar73F-w4PapPjbKY06HITxa4sux', 1739126410, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2025-02-09T18:40:10.174Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"id\":2,\"name\":\"kuncoro.portofolio\",\"firstname\":\"Khitana\",\"lastname\":\"hesthi kuncoro\",\"phonenumber\":\"+62 21 21212212\",\"email\":\"kuncorokhitan271@gmail.com\",\"password\":\"$2a$10$poG4HlpUaHKJwc4IggBnIu3zuTb4EgEMaG.68JpkVVsZW/LYCf9yK\",\"role_id\":2,\"created_at\":\"2025-02-05T14:11:13.000Z\",\"updated_at\":\"2025-02-09T15:27:00.000Z\",\"google_id\":\"116206141915778468963\",\"isverified\":1,\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJrdW5jb3Jva2hpdGFuMjcxQGdtYWlsLmNvbSIsImlhdCI6MTczOTEyMjgwOSwiZXhwIjoxNzM5MTI2NDA5fQ.JsjKTk-9YlUBrI-MfN4wH7dWS53hdIm_3Aagsc8S37k\"}}}');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `ticket_code` varchar(255) NOT NULL,
  `status` enum('Active','Used','Expired') DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('pending','success','failed') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `phonenumber` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `google_id` varchar(255) DEFAULT NULL,
  `isverified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `firstname`, `lastname`, `phonenumber`, `email`, `password`, `role_id`, `created_at`, `updated_at`, `google_id`, `isverified`) VALUES
(1, 'Kansha Hasri Ainun', 'Kansha', 'Ainun', NULL, 'hasriainun@gmail.com', '$2y$10$yE/duVdpz5rjan7gf5TaqOnOPuUYj/nKFGpSs4hyZcKbawxYoYed6', 1, '2025-02-10 00:48:50', '2025-02-10 00:48:50', NULL, 1),
(2, 'Khitan Hesthi Kuncoro', NULL, NULL, NULL, 'khitanhk@gmail.com', '$2y$10$17wAZaTa4T3kWgP0xdXETuCJRUT.jBnbjjJlF/Rjhz9Qr35IKPq7C', 2, '2025-02-10 00:49:51', '2025-02-10 00:49:51', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `agrotourism_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `agrotourism`
--
ALTER TABLE `agrotourism`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activites_id` (`activities_id`) USING BTREE,
  ADD KEY `city_id` (`city_id`) USING BTREE;

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `agrotourism_id` (`agrotourism_id`),
  ADD KEY `order_id` (`order_id`) USING BTREE;

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `ticket_id` (`ticket_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `ticket_id` (`ticket_code`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_id` (`order_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`name`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `google_id` (`google_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `agrotourism_id` (`agrotourism_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `agrotourism`
--
ALTER TABLE `agrotourism`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `agrotourism`
--
ALTER TABLE `agrotourism`
  ADD CONSTRAINT `agrotourism_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `agrotourism_ibfk_2` FOREIGN KEY (`activities_id`) REFERENCES `activities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`agrotourism_id`) REFERENCES `agrotourism` (`id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`agrotourism_id`) REFERENCES `agrotourism` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
