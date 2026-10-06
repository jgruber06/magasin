drop table contient;
drop table produit;
drop table commande;
drop table categorie;
drop table client;

set foreign_key_checks = 0;
truncate table contient;
truncate table commande;
truncate table produit;
truncate table client;
truncate table categorie;
set foreign_key_checks = 1;