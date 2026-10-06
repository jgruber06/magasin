-- erreur cle etrangere
insert into commande (Date, Statut, Id_client) values ('2026-10-06', 'En cours', 99);

-- erreur not null
insert into client (Nom, Prenom) values ('Test', 'Test');

-- erreur cle etrangere
delete from categorie where Id = 1;

-- erreur cle etrangere
delete from client where Id = 1;

-- erreur cle etrangere
insert into produit (Nom, Prix, Stock, Id_categorie) values ('Fantome', 10, 5, 99);

-- erreur cle primaire
insert into contient (Id_commande, Id_produit) values (1, 1);

-- erreur overload
insert into produit (Nom, Prix, Stock, Id_categorie) values ('Trop', 10, 500, 1);

-- erreur unique
insert into client (Nom, Prenom, MDP, Email, Adresse_livraison)
values ('Autre', 'Alice', 'x', 'alice@mail.fr', 'ici');


select 'categorie' as `table`, count(*) as nb from categorie
union all select 'client',   count(*) from client
union all select 'produit',  count(*) from produit
union all select 'commande', count(*) from commande
union all select 'contient', count(*) from contient;

select c.Id as commande, cl.Nom as client, p.Nom as produit, p.Prix
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

select c.Id, c.Montant_total, sum(p.Prix) as total_calcule
from commande c
join contient ct on ct.Id_commande = c.Id
join produit p   on p.Id = ct.Id_produit
group by c.Id, c.Montant_total
having c.Montant_total <> sum(p.Prix);

select cat.Nom, sum(p.Prix) as ca
from contient ct
join produit p      on p.Id = ct.Id_produit
join categorie cat  on cat.Id = p.Id_categorie
join commande c     on c.Id = ct.Id_commande
where c.Statut <> 'Annulee'
group by cat.Nom
order by ca desc;

select Id, Nom from produit;
select Id from commande;