-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema shakkikanta
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `shakkikanta` ;

-- -----------------------------------------------------
-- Schema shakkikanta
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `shakkikanta` ;
USE `shakkikanta` ;

-- -----------------------------------------------------
-- Table `shakkikanta`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `shakkikanta`.`user` ;

CREATE TABLE IF NOT EXISTS `shakkikanta`.`user` (
  `userID` INT NOT NULL AUTO_INCREMENT,
  `EmailAddress` VARCHAR(100) NOT NULL,
  `Firstname` VARCHAR(35) NULL,
  `Lastname` VARCHAR(35) NULL,
  `UserName` VARCHAR(100) NOT NULL,
  `Password` CHAR(40) NOT NULL,
  `elo` INT NOT NULL,
  `unranked` INT NOT NULL,
  PRIMARY KEY (`userID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shakkikanta`.`game`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `shakkikanta`.`game` ;

CREATE TABLE IF NOT EXISTS `shakkikanta`.`game` (
  `gameID` INT NOT NULL AUTO_INCREMENT,
  `moves` VARCHAR(5000) NULL,
  `winner` VARCHAR(100) NULL,
  `location` VARCHAR(255) NULL,
  `time` DATE NULL,
  `white` INT NULL,
  `black` INT NULL,
  PRIMARY KEY (`gameID`),
  INDEX `fk_game_user_idx` (`white` ASC),
  INDEX `fk_game_user1_idx` (`black` ASC),
  CONSTRAINT `fk_game_user`
    FOREIGN KEY (`white`)
    REFERENCES `shakkikanta`.`user` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_game_user1`
    FOREIGN KEY (`black`)
    REFERENCES `shakkikanta`.`user` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `shakkikanta`.`user`
-- -----------------------------------------------------
START TRANSACTION;
USE `shakkikanta`;
INSERT INTO `shakkikanta`.`user` (`userID`, `EmailAddress`, `Firstname`, `Lastname`, `UserName`, `Password`, `elo`, `unranked`) VALUES (1, 'imkonsza@gmail.com', 'Konsta', 'Korpela', 'Konstaaaa', 'salasana', 1200, 1200);
INSERT INTO `shakkikanta`.`user` (`userID`, `EmailAddress`, `Firstname`, `Lastname`, `UserName`, `Password`, `elo`, `unranked`) VALUES (2, 'jaakko@gmail.com', 'Jaakko', 'Jakomäki', 'Jaakkoooo', 'salasana2', 1200, 1200);

COMMIT;


-- -----------------------------------------------------
-- Data for table `shakkikanta`.`game`
-- -----------------------------------------------------
START TRANSACTION;
USE `shakkikanta`;
INSERT INTO `shakkikanta`.`game` (`gameID`, `moves`, `winner`, `location`, `time`, `white`, `black`) VALUES (1, 'd7-d6-P, d2-d4-P ', NULL, NULL, NULL, NULL, NULL);

COMMIT;

