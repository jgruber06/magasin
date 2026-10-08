use magasin;

-- erreur cle etrangere
insert into commande (Date_commande, Statut, Id_client) values ('2026-10-06', 'En cours', 99);

-- erreur not null
insert into client (Nom, Prenom, MDP_hash, Email, Adresse_livraison) values ('Test', 'Test', null, null, null);

-- erreur cle etrangere
delete from categorie where Id = 1;

-- erreur cle etrangere
delete from client where Id = 1;

-- erreur cle etrangere
insert into produit (Nom, Prix, Stock, Id_categorie) values ('Fantome', 10, 5, 99);

-- erreur cle primaire
insert into contient (Id_commande, Id_produit, Quantite, Prix_unitaire) values (1, 1, 1, 36);

-- erreur not null (stock obligatoire)
insert into produit (Nom, Prix, Stock, Id_categorie) values ('Trop', 10, null, 1);

-- erreur unique
insert into client (Nom, Prenom, MDP_hash, Email, Adresse_livraison)
values ('Autre', 'Alice', 'x', 'alice@mail.fr', 'ici');

select 'categorie' as `table`, count(*) as nb from categorie
union all select 'client',   count(*) from client
union all select 'produit',  count(*) from produit
union all select 'commande', count(*) from commande
union all select 'contient', count(*) from contient;

select c.Id as commande, cl.Nom as client, p.Nom as produit, ct.Quantite, ct.Prix_unitaire
from commande c
join client cl   on cl.Id = c.Id_client
join contient ct on ct.Id_commande = c.Id
join produit p   on p.Id = ct.Id_produit
order by c.Id;

select cl.Nom, cl.Prenom
from client cl
left join commande c on c.Id_client = cl.Id
where c.Id is null;

select cat.Nom
from categorie cat
left join produit p on p.Id_categorie = cat.Id
where p.Id is null;

select Nom from produit where Stock = 0;

select p.Nom
from produit p
left join contient ct on ct.Id_produit = p.Id
where ct.Id_commande is null;

select c.Id, c.Montant_total, sum(ct.Quantite * ct.Prix_unitaire) as total_calcule
from commande c
join contient ct on ct.Id_commande = c.Id
group by c.Id, c.Montant_total
having c.Montant_total <> sum(ct.Quantite * ct.Prix_unitaire);

select cat.Nom, sum(ct.Quantite * ct.Prix_unitaire) as ca
from contient ct
join produit p      on p.Id = ct.Id_produit
join categorie cat  on cat.Id = p.Id_categorie
join commande c     on c.Id = ct.Id_commande
where c.Statut <> 'Annulée'
group by cat.Nom
order by ca desc;
