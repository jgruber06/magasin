use magasin;

create table client(
	Id int auto_increment primary key,
	Nom varchar(100) not null,
	Prenom varchar(100) not null,
	MDP_hash varchar(255) not null,
	Email varchar(100) not null unique,
	Adresse_livraison varchar(255) not null
);

create table commande(
	Id int auto_increment primary key,
	Date_commande date not null,
	Statut varchar(20) not null default 'En cours',
	Montant_total decimal(10,2) not null default 0,
	Id_client int not null,
	foreign key (Id_client) references client(Id)
);

create table categorie(
	Id int auto_increment primary key,
	Nom varchar(100) not null
);

create table produit(
	Id int auto_increment primary key,
	Nom varchar(100) not null,
	Description varchar(255),
	Prix decimal(10,2) not null,
	Stock int unsigned not null default 0,
	Id_categorie int not null,
	foreign key (Id_categorie) references categorie(Id)
);

create table contient(
	Id_commande int,
	Id_produit int,
	Quantite int unsigned not null,
	Prix_unitaire decimal(10,2) not null,
	primary key (Id_commande, Id_produit),
	foreign key (Id_commande) references commande(Id) on delete cascade,
	foreign key (Id_produit) references produit(Id)
);
