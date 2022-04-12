DROP DATABASE rentibldb;

CREATE DATABASE rentibldb;

USE rentibldb;

CREATE TABLE Warehouse
(
    Location VARCHAR(50) NOT NULL,
    Name VARCHAR(255),
    PRIMARY KEY (Location) 
);

CREATE TABLE Admin
(
    Admin_ID INT(10) NOT NULL AUTO_INCREMENT,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Username VARCHAR(20),
    Password VARCHAR(30),
    PRIMARY KEY (Admin_ID)
);

CREATE TABLE Genre 
(
    GenreName VARCHAR(255) NOT NULL,
    ParentGenre VARCHAR(255),
    PRIMARY KEY (GenreName),
    FOREIGN KEY (ParentGenre) REFERENCES Genre(GenreName)
);

CREATE TABLE Console
(
    Name VARCHAR(30) NOT NULL,
    PRIMARY KEY (Name)
);

CREATE TABLE Customer
(
    Username VARCHAR(20) NOT NULL,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(20),
    PRIMARY KEY (Username)
);

CREATE TABLE Publisher
(
    Name VARCHAR(255) NOT NULL,
    Location VARCHAR(50),
    PRIMARY KEY (Name)
);

CREATE TABLE Video_Game
(
    ID INT(10) NOT NULL AUTO_INCREMENT,
    Price DECIMAL(6, 2) NOT NULL,
    Title VARCHAR(255) NOT NULL,
    ESRB_Rating VARCHAR(10) NOT NULL,
    Description TEXT(65535),
    PublisherName VARCHAR(255) NOT NULL,
    ConsoleName VARCHAR(30) NOT NULL,
    Admin_ID INT(10) NOT NULL,
    IMG_URL VARCHAR(1000) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (PublisherName)
    REFERENCES Publisher(Name),
    FOREIGN KEY (ConsoleName)
    REFERENCES Console(Name),
    FOREIGN KEY (Admin_ID)
    REFERENCES Admin(Admin_ID)
);

CREATE TABLE Banking_Info
(
    CardNumber CHAR(16) NOT NULL,
    CardholderName VARCHAR(255),
    ExpiryDate CHAR(4),
    CVV CHAR(3),
    Username VARCHAR(20),
    PRIMARY KEY (CardNumber),
    FOREIGN KEY (Username)
    REFERENCES Customer(Username)
);

CREATE TABLE Renter
(
    Username VARCHAR(255) NOT NULL,
    ShippingAddress VARCHAR(255),
    PRIMARY KEY (Username),
    FOREIGN KEY (Username)
    REFERENCES Customer(Username)
);


CREATE TABLE Shopping_Cart
(
    Username VARCHAR(20) NOT NULL,
    PRIMARY KEY (Username),
    FOREIGN KEY (Username)
    REFERENCES Renter(Username)
);

CREATE TABLE Review
(
    ReviewNumber INT(10) NOT NULL,
    Username VARCHAR(20) NOT NULL,
    ID INT(10) NOT NULL,
    Rating INT(1) NOT NULL,
    Comment TEXT(65535) NOT NULL,
    Title VARCHAR(255) NOT NULL,
    DateWritten DATE,
    PRIMARY KEY (Username,ID,ReviewNumber),
    FOREIGN KEY (Username)
    REFERENCES Customer(Username),
    FOREIGN KEY (ID)
    REFERENCES Video_Game(ID)
    ON DELETE CASCADE
);

CREATE TABLE Has_Stock
(
    Location VARCHAR(50) NOT NULL,
    ID INT(10) NOT NULL,
    Quantity INT(5),
    PRIMARY KEY (Location,ID),
    FOREIGN KEY (Location)
    REFERENCES Warehouse(Location),
    FOREIGN KEY (ID)
    REFERENCES Video_Game(ID)
    ON DELETE CASCADE
);

CREATE TABLE Manages
(
    Location VARCHAR(50) NOT NULL,
    Admin_ID INT(10) NOT NULL,
    PRIMARY KEY (Location,Admin_ID),
    FOREIGN KEY (Location)
    REFERENCES Warehouse(Location),
    FOREIGN KEY (Admin_ID)
    REFERENCES Admin(Admin_ID)
);

CREATE TABLE Categorized
(
    GenreName VARCHAR(255) NOT NULL,
    ID INT(10) NOT NULL,
    PRIMARY KEY (GenreName,ID),
    FOREIGN KEY (GenreName)
    REFERENCES Genre(GenreName),
    FOREIGN KEY (ID)
    REFERENCES Video_Game(ID)
    ON DELETE CASCADE
);

CREATE TABLE Rents
(
    Username VARCHAR(255) NOT NULL,
    ID INT(10) NOT NULL,
    DeliveryDate DATE,
    StartDate DATE,
    DueDate DATE,
    PRIMARY KEY (Username,ID),
    FOREIGN KEY (Username)
    REFERENCES Customer(Username),
    FOREIGN KEY (ID)
    REFERENCES Video_Game(ID)
    ON DELETE CASCADE
);

CREATE TABLE Makes_Offers
(
    Username VARCHAR(255) NOT NULL,
    ID INT(10) NOT NULL,
    Location VARCHAR(50) NOT NULL,
    OfferValue DECIMAL(6, 2),
    Status VARCHAR(255) DEFAULT 'Pending',
    PRIMARY KEY (Username,ID,Location),
    FOREIGN KEY (Username)
    REFERENCES Customer(Username),
    FOREIGN KEY (ID)
    REFERENCES Video_Game(ID)
    ON DELETE CASCADE,
    FOREIGN KEY (Location)
    REFERENCES Warehouse(Location)
);

CREATE TABLE Contains
(
    Username VARCHAR(255) NOT NULL,
    ID INT(10) NOT NULL,
    Location VARCHAR(50) NOT NULL,
    StartDate DATE,
    DueDate DATE,
    PRIMARY KEY (Username,ID,Location),
    FOREIGN KEY (Username)
    REFERENCES Customer(Username),
    FOREIGN KEY (ID)
    REFERENCES Video_Game(ID)
    ON DELETE CASCADE,
    FOREIGN KEY (Location)
    REFERENCES Warehouse(Location)
);

CREATE TABLE Seller
(
    Username VARCHAR(255) NOT NULL,
    PRIMARY KEY (Username),
    FOREIGN KEY (Username)
    REFERENCES Customer(Username)
);

INSERT INTO Warehouse (Location, Name) VALUES ("Crowfoot","W1");
INSERT INTO Warehouse (Location, Name) VALUES ("Brentwood","W2");
INSERT INTO Warehouse (Location, Name) VALUES ("Forest Lawn","W3");
INSERT INTO Warehouse (Location, Name) VALUES ("Webber","W4");

INSERT 
INTO Admin 
(FirstName,LastName,Username,Password)
VALUES
("Jake","Kim","JakeK1m","val");

INSERT 
INTO Admin 
(FirstName,LastName,Username,Password)
VALUES
("Sami","Zeremariam","SamiZ1","aram");

INSERT INTO Genre (GenreName,ParentGenre) VALUES ("RPG",NULL);
INSERT INTO Genre (GenreName,ParentGenre) VALUES ("JRPG","RPG");
INSERT INTO Genre (GenreName,ParentGenre) VALUES ("MMORPG","RPG");
INSERT INTO Genre (GenreName,ParentGenre) VALUES ("Shooter",NULL);
INSERT INTO Genre (GenreName,ParentGenre) VALUES ("Arcarde Shooter","Shooter");

INSERT INTO Console (Name) VALUES ("Playstation 5");
INSERT INTO Console (Name) VALUES ("Playstation 4");
INSERT INTO Console (Name) VALUES ("Playstation 3");
INSERT INTO Console (Name) VALUES ("Playstation 2");
INSERT INTO Console (Name) VALUES ("Playstation 1");
INSERT INTO Console (Name) VALUES ("Xbox");
INSERT INTO Console (Name) VALUES ("Xbox 360");
INSERT INTO Console (Name) VALUES ("Xbox One");
INSERT INTO Console (Name) VALUES ("Nintendo Gamecube");
INSERT INTO Console (Name) VALUES ("Nintendo Wii");
INSERT INTO Console (Name) VALUES ("Nintendo Switch");

INSERT INTO Customer (Username, FirstName,LastName,Email,Password,PhoneNumber)
VALUES ("mana24129","Manbir","Sandhu","manbir.ssandhu1@gmail.com","123456",
"587-830-3897");

INSERT INTO Publisher (Name, Location) VALUES ("Nintendo","Japan");
INSERT INTO Publisher (Name, Location) VALUES ("Ubisoft","France");
INSERT INTO Publisher (Name, Location) VALUES ("Blizzard","USA");
INSERT INTO Publisher (Name, Location) VALUES ("Sony","USA");
INSERT INTO Publisher (Name, Location) VALUES ("EA Sports","USA");
INSERT INTO Publisher (Name, Location) VALUES ("Bandai Namco","Japan");
INSERT INTO Publisher (Name, Location) VALUES ("Xbox Game Studios","USA");
INSERT INTO Publisher (Name, Location) VALUES ("Bethesda","USA");
INSERT INTO Publisher (Name, Location) VALUES ("Rockstar Games","USA");

INSERT INTO Video_Game (Price,Title,ESRB_Rating,Description,PublisherName,ConsoleName,Admin_ID,IMG_URL)
VALUES (
    29.99,
    'The Legend of Zelda: Breath of the Wild',
    'E',
    'Forget everything you know about The Legend of Zelda games. Step into a world of discovery, exploration, and adventure in The Legend of Zelda: Breath of the Wild, a boundary-breaking new game in the acclaimed series. Travel across vast fields, through forests, and to mountain peaks as you discover what has become of the kingdom of Hyrule in this stunning Open-Air Adventure. Now on Nintendo Switch, your journey is freer and more open than ever. Take your system anywhere, and adventure as Link any way you like.
© 2017 Nintendo. The Legend of Zelda and Nintendo Switch are trademarks of Nintendo.',
    'Nintendo',
    'Nintendo Switch',
    1,
    'https://i.ebayimg.com/images/g/ibwAAOSw245gWz0W/s-l500.jpg'
    );

INSERT INTO Video_Game (Price,Title,ESRB_Rating,Description,PublisherName,ConsoleName,Admin_ID,IMG_URL)
VALUES (
    5.00,
    'Red Dead Redemption 2',
    'M',
    'The end of the Wild West era has begun. After a robbery gone wrong in the western town of Blackwater, Arthur Morgan and the Van der Linde gang are forced to flee. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him.
Now featuring additional Story Mode content and a fully-featured Photo Mode, Red Dead Redemption 2 also includes free access to the shared living world of Red Dead Online, where players take on an array of roles to carve their own unique path on the frontier as they track wanted criminals as a Bounty Hunter, create a business as a Trader, unearth exotic treasures as a Collector or run an underground distillery as a Moonshiner and much more.',
    'Blizzard',
    'Xbox One',
    1,
    'https://media.gamestop.com/i/gamestop/10138093/Red-Dead-Redemption-2---Xbox-One?$pdp2x$'
    );

INSERT INTO Video_Game (Price,Title,ESRB_Rating,Description,PublisherName,ConsoleName,Admin_ID,IMG_URL)
VALUES (
    5.75,
    'The Elder Scrolls V: Skyrim Anniversary Edition',
    'M',
    'The Elder Scrolls V: Skyrim is an action role-playing game, playable from either a first or third-person perspective. The player may freely roam over the land of Skyrim—an open world environment consisting of wilderness expanses, dungeons, caves, cities, towns, fortresses, and villages.',
    'Bethesda',
    'Playstation 3',
    2,
    'https://static-ca.gamestop.ca/images/products/702219/3max.jpg'
    );

INSERT INTO Video_Game (Price,Title,ESRB_Rating,Description,PublisherName,ConsoleName,Admin_ID,IMG_URL)
VALUES (
    40.00,
    'Grand Theft Auto V',
    'M',
    "Experience Rockstar Games' critically acclaimed open world game, Grand Theft Auto V. When a young street hustler, a retired bank robber and a terrifying psychopath find themselves entangled with some of the most frightening and deranged elements of the criminal underworld, the U.S. government and the entertainment industry, they must pull off a series of dangerous heists to survive in a ruthless city in which they can trust nobody, least of all each other.
    Explore the stunning world of Los Santos and Blaine County in the ultimate Grand Theft Auto V experience, featuring a range of technical upgrades and enhancements for new and returning players.",
    'Rockstar Games',
    'Playstation 5',
    2,
    'https://static-ca.gamestop.ca/images/products/769862/3max.jpg'
    );


INSERT INTO Video_Game (Price,Title,ESRB_Rating,Description,PublisherName,ConsoleName,Admin_ID,IMG_URL)
VALUES (
    3.99,
    'Mario Kart',
    'E',
    "Mario, Luigi, Peach, Yoshi, Donkey Kong, Wario, Bowser and Toad are back with their finely tuned racing Karts in Mario Kart Wii for the Nintendo Wii.Mario Kart Wii will include 16 new courses and 16 classic courses from previous Mario Kart games. For the first time ever, players have the option of racing with either karts or motorbikes.Players can also hit the road as their personalized Mii caricatures in addition to the handful of classic Nintendo characters found in the game. True to the series, the game features tons of racing, plenty of power-ups and oodles of objects for players to use to slow down other drivers.",
    'Nintendo',
    'Nintendo Wii',
    1,
    'https://multimedia.bbycastatic.ca/multimedia/products/500x500/147/14763/14763855.jpg'
    );


INSERT INTO Video_Game (Price,Title,ESRB_Rating,Description,PublisherName,ConsoleName,Admin_ID,IMG_URL)
VALUES (
    3.99,
    "Luigi's Mansion",
    'E',
    "Luigi’s invited to the towering Last Resort hotel, but when Mario and friends go missing, our green-clad hero will have to conquer his fears to save them! Slam, blow away, and vacuum up ghosts with the all-new Poltergust G-00, and join forces with Gooigi to overcome the puzzling contraptions and mischievous boss on each themed floor.",
    'Nintendo',
    'Nintendo Gamecube',
    1,
    'https://m.media-amazon.com/images/I/51sm9T0oDQL._AC_.jpg'
    );

INSERT INTO Video_Game (Price,Title,ESRB_Rating,Description,PublisherName,ConsoleName,Admin_ID,IMG_URL)
VALUES (
    12.99,
    "FIFA 18",
    'E',
    "Powered by Frostbite™, EA SPORTS™ FIFA 18 blurs the line between the virtual and real worlds, bringing to life the players, teams, and atmospheres that immerse you in the emotion of The World’s Game. The biggest step in gameplay innovation in franchise history, FIFA 18 introduces Real Player Motion Technology, an all-new animation system which unlocks a new level of responsiveness, and player personality – now Cristiano Ronaldo and other top players feel and move exactly like they do on the real pitch. Player Control combined with new Team Styles and Positioning give you the tools to deliver Dramatic Moments that ignite Immersive Atmospheres around the world.",
    'EA Sports',
    'Xbox 360',
    2,
    'https://static-ca.gamestop.ca/images/products/732252/3max.jpg'
    );


INSERT INTO Video_Game (Price,Title,ESRB_Rating,Description,PublisherName,ConsoleName,Admin_ID,IMG_URL)
VALUES (
    3.79,
    "The Simpsons: Hit & Run",
    'T',
    "When mysterious surveillance equipment, mind control cola and aliens terrorize Springfield, only the Simpsons can find out why and save the town.",
    'Xbox Game Studios',
    'Xbox',
    1,
    'https://m.media-amazon.com/images/I/5135P1RZWYL._AC_.jpg'
    );

INSERT INTO Video_Game (Price,Title,ESRB_Rating,Description,PublisherName,ConsoleName,Admin_ID,IMG_URL)
VALUES (
    3.79,
    "Star Wars Episode I: The Phantom Menace",
    'T',
    "A Jedi attempts to protect Naboo from the greedy Trade Federation and, as they soon learn, the Sith.",
    'Sony',
    'Playstation 1',
    1,
    'https://m.media-amazon.com/images/I/81N3fe4DrpL._AC_SX522_.jpg'
    );

INSERT INTO Video_Game (Price,Title,ESRB_Rating,Description,PublisherName,ConsoleName,Admin_ID,IMG_URL)
VALUES (
    14.99,
    "Grand Theft Auto: San Andreas",
    'M',
    "Five years ago, Carl ‘CJ’ Johnson escaped the haze of Los Santos, San Andreas...a city tearing itself apart with gang trouble, drugs, and corruption. Now, it's the early 90s. CJ’s got to go home - his mother has been murdered, his family has fallen apart, and his childhood friends are all heading towards disaster. On his return to the neighborhood, a couple of cops frame him for homicide, forcing CJ on a journey that takes him across the entire state of San Andreas, to save his family and to take control of the streets in the next iteration of the series that changed everything.",
    'Rockstar Games',
    'Playstation 2',
    1,
    'https://m.media-amazon.com/images/I/61N9DX5CRKL._AC_.jpg'
    );

INSERT INTO Video_Game (Price,Title,ESRB_Rating,Description,PublisherName,ConsoleName,Admin_ID,IMG_URL)
VALUES (
    14.99,
    "Naruto Shippuden Ultimate Ninja Storm 4",
    'T',
    "Play as one of 124 ninjas in Naruto Shippuden: Ultimate Ninja Storm 4. The latest entry into the franchise lets you relive all the action of the Fourth Great Ninja War as you follow the story of Naruto Uzumaki. It comes with all DLC for enhanced and expanded gameplay.",
    'Bandai Namco',
    'Playstation 4',
    1,
    'https://static-ca.gamestop.ca/images/products/719651/3max.jpg'
    );

INSERT INTO Video_Game (Price,Title,ESRB_Rating,Description,PublisherName,ConsoleName,Admin_ID,IMG_URL)
VALUES (
    20.99,
    "Overwatch Legendary Edition",
    'T',
    "Overwatch™ is a team-based shooter where heroes do battle in a world of conflict. Welcome to Overwatch™. Soldiers. Scientists. Adventurers. Oddities. In a time of global crisis, an international task force of heroes banded together to restore peace to a war-torn world : OVERWATCH. It ended the crisis and helped to maintain peace in the decades that followed, inspiring an era of exploration, innovation, and discovery. But after many years, Overwatch's influence waned, and it was eventually disbanded. Overwatch is gone… but the world still needs heroes.",
    'Blizzard',
    'Xbox One',
    1,
    'https://static-ca.gamestop.ca/images/products/742681/3max.jpg'
    );

INSERT INTO Video_Game (Price,Title,ESRB_Rating,Description,PublisherName,ConsoleName,Admin_ID,IMG_URL)
VALUES (
    16.99,
    "Kirby and the Forgotten Land",
    'E10+',
    "Join Kirby in an unforgettable journey through a mysterious world in a 3D platforming adventure. Float off on an all-new adventure as the powerful puffball, Kirby. Explore in 3D stages as you discover a mysterious world with abandoned structures from a past civilization—like a shopping mall?! Copy enemies’ abilities like the new Drill and Ranger and use them to attack, explore your surroundings, and save the kidnapped Waddle Dees from the ferocious Beast Pack alongside the mysterious Elfilin. Hope you’re hungry for an unforgettable adventure!",
    'Nintendo',
    'Nintendo Switch',
    2,
    'https://static-ca.gamestop.ca/images/products/765007/3max.jpg'
    );

INSERT INTO Video_Game (Price,Title,ESRB_Rating,Description,PublisherName,ConsoleName,Admin_ID,IMG_URL)
VALUES (
    35.99,
    "Marvel’s Spider-Man: Miles Morales",
    'T',
    "In the latest adventure in the Marvel’s Spider-Man universe, teenager Miles Morales is adjusting to his new home while following in the footsteps of his mentor, Peter Parker, as a new Spider-Man. But when a fierce power struggle threatens to destroy his new home, the aspiring hero realizes that with great power, there must also come great responsibility. To save all of Marvel’s New York, Miles must take up the mantle of Spider-Man and own it.",
    'Sony',
    'Playstation 5',
    2,
    'https://static-ca.gamestop.ca/images/products/756489/3max.jpg'
    );


INSERT INTO Review (ReviewNumber,Username,ID,Rating,Comment,Title,DateWritten)
VALUES (
    1,
    "mana24129",
    1,
    3,
    "Love the zombies. The multiplayer feature added a large scale advance, multiple vehicles, fast paced action, great stage layouts.",
    'This is some review ahhh',
    CURDATE()
);

INSERT INTO Review (ReviewNumber,Username,ID,Rating,Comment,Title,DateWritten)
VALUES (
    1,
    "mana24129",
    2,
    4,
    "Love the zombies. The multiplayer feature added a large scale advance, multiple vehicles, fast paced action, great stage layouts.",
    'Some new review',
    CURDATE()
);

INSERT INTO Makes_Offers(Username,ID,Location,OfferValue,Status) 
VALUES ("mana24129",1,"Crowfoot",29.99,"Pending");

INSERT INTO Has_Stock (Location,ID,Quantity)
VALUES ("Crowfoot",1,10);

INSERT INTO Has_Stock (Location,ID,Quantity)
VALUES ("Webber",2,10);

INSERT INTO Has_Stock (Location,ID,Quantity)
VALUES ("Brentwood",3,10);

INSERT INTO Has_Stock (Location,ID,Quantity)
VALUES ("Forest Lawn",4,10);

INSERT INTO Has_Stock (Location,ID,Quantity)
VALUES ("Webber",5,10);

INSERT INTO Has_Stock (Location,ID,Quantity)
VALUES ("Crowfoot",7,10);

INSERT INTO Manages(Location, Admin_ID)
VALUES ("Crowfoot",1);

INSERT INTO Manages(Location, Admin_ID)
VALUES ("Crowfoot",2);





