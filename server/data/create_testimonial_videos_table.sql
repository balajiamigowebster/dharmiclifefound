-- Dharmic Life Foundation
-- Table definition for Testimonials Videos (Udaliyal Dharmam & Manoviyal Dharmam)

CREATE TABLE IF NOT EXISTS `testimonial_videos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(255) NOT NULL COMMENT 'udaliyal-dharmam-classes or manoviyal-dharmam-classes',
  `categoryName` VARCHAR(255) DEFAULT 'Udaliyal Dharmam Classes',
  `title` TEXT NOT NULL COMMENT 'Video title or topic',
  `speakerName` VARCHAR(255) DEFAULT NULL COMMENT 'Student / Speaker name',
  `videoUrl` TEXT NOT NULL COMMENT 'Relative path (/uploads/videos/...) or video URL',
  `thumbnailUrl` TEXT DEFAULT NULL COMMENT 'Optional thumbnail/poster image',
  `description` TEXT DEFAULT NULL COMMENT 'Student reflection quote or notes',
  `duration` VARCHAR(100) DEFAULT NULL COMMENT 'e.g. 05:20',
  `orderIndex` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

