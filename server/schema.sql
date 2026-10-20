-- MariaDB Schema for Dharmic Life Foundation
-- Character Set: utf8mb4, Collation: utf8mb4_unicode_ci

CREATE DATABASE IF NOT EXISTS `dharmic_life_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `dharmic_life_db`;

-- 1. Site Settings
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `setting_key` VARCHAR(100) NOT NULL UNIQUE,
  `setting_value` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Core Activities
CREATE TABLE IF NOT EXISTS `activities` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `tagline` VARCHAR(255) DEFAULT '',
  `description` TEXT NOT NULL,
  `full_content` LONGTEXT,
  `image` VARCHAR(255) NOT NULL,
  `icon` VARCHAR(50) DEFAULT 'Heart',
  `order_index` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Events & Impact
CREATE TABLE IF NOT EXISTS `events` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `event_date` VARCHAR(50) NOT NULL,
  `location` VARCHAR(255) DEFAULT 'Pondicherry',
  `summary` TEXT NOT NULL,
  `full_content` LONGTEXT,
  `image` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) DEFAULT 'Community',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Testimonials
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `author_name` VARCHAR(150) NOT NULL,
  `author_role` VARCHAR(150) DEFAULT 'Supporter',
  `quote` TEXT NOT NULL,
  `rating` INT DEFAULT 5,
  `avatar` VARCHAR(255) DEFAULT '/images/testimonial.jpg',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Blog Posts & News
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `excerpt` TEXT NOT NULL,
  `content` LONGTEXT,
  `author` VARCHAR(100) DEFAULT 'admin',
  `post_date` VARCHAR(50) NOT NULL,
  `comments_count` INT DEFAULT 0,
  `image` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Team & Trustees
CREATE TABLE IF NOT EXISTS `team_members` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `role` VARCHAR(100) DEFAULT 'Trustee',
  `image` VARCHAR(255) NOT NULL,
  `facebook` VARCHAR(255) DEFAULT '#',
  `twitter` VARCHAR(255) DEFAULT '#',
  `instagram` VARCHAR(255) DEFAULT '#',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Donations
CREATE TABLE IF NOT EXISTS `donations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `donor_name` VARCHAR(150) NOT NULL,
  `donor_email` VARCHAR(150) NOT NULL,
  `donor_phone` VARCHAR(50) DEFAULT '',
  `amount` DECIMAL(10,2) NOT NULL,
  `cause` VARCHAR(150) DEFAULT 'General Donation',
  `payment_method` VARCHAR(50) DEFAULT 'UPI',
  `transaction_ref` VARCHAR(100) DEFAULT '',
  `status` VARCHAR(50) DEFAULT 'completed',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Volunteers
CREATE TABLE IF NOT EXISTS `volunteers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `skills` VARCHAR(255) DEFAULT '',
  `message` TEXT,
  `status` VARCHAR(50) DEFAULT 'pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. Contact Messages
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) DEFAULT '',
  `subject` VARCHAR(255) DEFAULT '',
  `message` TEXT NOT NULL,
  `status` VARCHAR(50) DEFAULT 'unread',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. Newsletter Subscribers
CREATE TABLE IF NOT EXISTS `subscribers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
