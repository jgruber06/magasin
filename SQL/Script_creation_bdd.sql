use magasin;

create table client(
	Id int auto_increment primary key,
	Nom varchar(20) not null,
	Prenom varchar(20) not null,
	MDP varchar(20) not null,
	Email varchar(50) not null unique,
	Adresse_livraison varchar(50) not null
);

create table commande(
	Id int auto_increment primary key,
	Date date,
	Statut varchar(10) not null,
	Montant_total int,
	Id_client int not null,
	foreign key (Id_client) references client(Id)
);

create table categorie(
	Id int auto_increment primary key,
	Nom varchar(20) not null
);

create table produit(
	Id int auto_increment primary key,
	Nom varchar(20) not null,
	Description varchar(100),
	Prix int not null,
	Stock tinyint not null,
	ID_categorie int,
	foreign key (Id_categorie) references categorie(Id)
);

create table contient(
	Id_commande int,
	Id_produit int,
	primary key (Id_commande,Id_produit),
	foreign key (Id_commande) references commande(Id),
	foreign key (Id_produit) references produit(Id)
);