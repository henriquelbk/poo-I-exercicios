-- Active: 1698107750378@@127.0.0.1@3306
CREATE TABLE videos (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    titulo TEXT NOT NULL,
    duracao_em_segundos REAL NOT NULL,
    data_de_upload TEXT NOT NULL
);

INSERT INTO videos (id, titulo, duracao_em_segundos, data_de_upload)
VALUES 
('v001', 'praia dos sonhos', 87, '2011'),
('v002', 'é deus mamae', 483, '2013'),
('v003', 'pederneiras', 42, '2011');

DROP TABLE videos;