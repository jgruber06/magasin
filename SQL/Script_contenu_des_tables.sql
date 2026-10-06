insert into categorie (Nom) values
  ('Livres'),         
  ('Informatique'),    
  ('Jeux'),            
  ('Maison'),          
  ('Sport');           

insert into client (Nom, Prenom, MDP, Email, Adresse_livraison) values
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

insert into commande (Date, Statut, Montant_total, Id_client) values
  ('2026-09-01', 'Livree',    51, 1),
  ('2026-09-05', 'Livree',    45, 2),
  ('2026-09-12', 'Livree',   129, 1),
  ('2026-09-20', 'Annulee',   40, 4),
  ('2026-09-28', 'Expediee',  67, 5),
  ('2026-10-01', 'En cours',  65, 2),
  ('2026-10-03', 'En cours',  48, 6),
  ('2026-10-05', 'En cours', 188, 4);

insert into contient (Id_commande, Id_produit) values
  (1, 1), (1, 3),
  (2, 4),
  (3, 5),
  (4, 7), (4, 8),
  (5, 6), (5, 10),
  (6, 2), (6, 1),
  (7, 9), (7, 10), (7, 3),
  (8, 5), (8, 6);