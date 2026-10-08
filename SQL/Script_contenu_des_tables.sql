use magasin;

insert into categorie (Nom) values
  ('Livres'),
  ('Informatique'),
  ('Jeux'),
  ('Maison'),
  ('Sport');

insert into client (Nom, Prenom, MDP_hash, Email, Adresse_livraison) values
  ('Martin',  'Alice',  'hash_alice',  'alice@mail.fr',  '12 rue des Lilas, Grenoble'),
  ('Durand',  'Paul',   'hash_paul',   'paul@mail.fr',   '3 av. de la Gare, Lyon'),
  ('Bernard', 'Sophie', 'hash_sophie', 'sophie@mail.fr', '8 place Victor Hugo, Paris'),
  ('Petit',   'Lucas',  'hash_lucas',  'lucas@mail.fr',  '25 rue Nationale, Lille'),
  ('Moreau',  'Emma',   'hash_emma',   'emma@mail.fr',   '7 bd Gambetta, Nice'),
  ('Leroy',   'Hugo',   'hash_hugo',   'hugo@mail.fr',   '14 rue du Port, Nantes');

insert into produit (Nom, Description, Prix, Stock, Id_categorie) values
  ('Clean Code',        'Livre de Robert Martin',  36,  10, 1),
  ('Java pour tous',    'Manuel d''initiation',    29,  25, 1),
  ('Souris USB',        'Souris optique',          15,  50, 2),
  ('Clavier mecanique', null,                      45,   0, 2),
  ('Ecran 24 pouces',   'Full HD',                129,   8, 2),
  ('Casque audio',      'Sans fil',                59,  20, 2),
  ('Jeu d''echecs',     'Plateau en bois',         22,  15, 3),
  ('Puzzle 1000 pieces','Paysage de montagne',     18,  30, 3),
  ('Lampe de bureau',   'LED reglable',            25,  12, 4),
  ('Mug',               null,                       8, 100, 4);

insert into commande (Date_commande, Statut, Montant_total, Id_client) values
  ('2026-09-01', 'Livrée',    51, 1),
  ('2026-09-05', 'Livrée',    45, 2),
  ('2026-09-12', 'Livrée',   129, 1),
  ('2026-09-20', 'Annulée',   40, 4),
  ('2026-09-28', 'Expédiée',  67, 5),
  ('2026-10-01', 'En cours',  65, 2),
  ('2026-10-03', 'En cours',  48, 6),
  ('2026-10-05', 'En cours', 188, 4);

insert into contient (Id_commande, Id_produit, Quantite, Prix_unitaire) values
  (1, 1, 1, 36), (1, 3, 1, 15),
  (2, 4, 1, 45),
  (3, 5, 1, 129),
  (4, 7, 1, 22), (4, 8, 1, 18),
  (5, 6, 1, 59), (5, 10, 1, 8),
  (6, 2, 1, 29), (6, 1, 1, 36),
  (7, 9, 1, 25), (7, 10, 1, 8), (7, 3, 1, 15),
  (8, 5, 1, 129), (8, 6, 1, 59);
