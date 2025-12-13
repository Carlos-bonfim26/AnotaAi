create database anotaAi_db;

use anotaAi_db;
CREATE TABLE Usuario_tb (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    nome_user VARCHAR(255) NOT NULL,
    email_user VARCHAR(255) NOT NULL UNIQUE,
    data_nasc_user DATE NOT NULL,
    senha_user VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE Anotacao_tb (
    id_anotacao INT AUTO_INCREMENT PRIMARY KEY,
    titulo_anotacao VARCHAR(255) NOT NULL,
    data_create DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_target DATETIME,
    descricao_anotacao TEXT NOT NULL,
    user_ID INT NOT NULL,
 FOREIGN KEY (user_ID) REFERENCES Usuario_tb(id_user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

alter table Anotacao_tb add column finalizada boolean default false;
