-- Create main database
CREATE DATABASE IF NOT EXISTS `samsblog_db`;
-- Create shadow database for prisma
CREATE DATABASE IF NOT EXISTS `samsblog_shadow_db`;

-- To GRANT ALL privileges to a user(mysql), allowing that user full control over a shadow database
GRANT ALL PRIVILEGES ON samsblog_shadow_db.* TO 'mysql'@'%';

