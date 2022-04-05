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
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Email VARCHAR(255),
    Password VARCHAR(255),
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
    Price DECIMAL(6, 2),
    Title VARCHAR(255),
    ESRB_Rating VARCHAR(10),
    Description TEXT(65535),
    PublisherName VARCHAR(255),
    ConsoleName VARCHAR(30),
    Admin_ID INT(10),
    IMG_URL VARCHAR(1000),
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

CREATE TABLE Shopping_Cart
(
    Username VARCHAR(20) NOT NULL,
    PRIMARY KEY (Username),
    FOREIGN KEY (Username)
    REFERENCES Customer(Username)
);

CREATE TABLE Review
(
    ReviewNumber INT(10) NOT NULL,
    Username VARCHAR(20) NOT NULL,
    ID INT(10) NOT NULL,
    Rating INT(1),
    Comment TEXT(65535),
    Title VARCHAR(255),
    DateWritten DATE,
    PRIMARY KEY (Username,ID,ReviewNumber),
    FOREIGN KEY (Username)
    REFERENCES Customer(Username),
    FOREIGN KEY (ID)
    REFERENCES Video_Game(ID)
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
    REFERENCES Video_Game(ID),
    FOREIGN KEY (Location)
    REFERENCES Warehouse(Location)
);

CREATE TABLE Contains
(
    Username VARCHAR(255) NOT NULL,
    ID INT(10) NOT NULL,
    StartDate DATE,
    DueDate DATE,
    PRIMARY KEY (Username,ID),
    FOREIGN KEY (Username)
    REFERENCES Customer(Username),
    FOREIGN KEY (ID)
    REFERENCES Video_Game(ID)
);

CREATE TABLE Renter
(
    Username VARCHAR(255) NOT NULL,
    ShippingAddress VARCHAR(255),
    PRIMARY KEY (Username),
    FOREIGN KEY (Username)
    REFERENCES Customer(Username)
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
    'Red Dead Redemption 2 ',
    'M',
    'The end of the Wild West era has begun. After a robbery gone wrong in the western town of Blackwater, Arthur Morgan and the Van der Linde gang are forced to flee. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him.
Now featuring additional Story Mode content and a fully-featured Photo Mode, Red Dead Redemption 2 also includes free access to the shared living world of Red Dead Online, where players take on an array of roles to carve their own unique path on the frontier as they track wanted criminals as a Bounty Hunter, create a business as a Trader, unearth exotic treasures as a Collector or run an underground distillery as a Moonshiner and much more.',
    'Blizzard',
    'Xbox One',
    1,
    'https://media.gamestop.com/i/gamestop/10138093/Red-Dead-Redemption-2---Xbox-One?$pdp2x$'
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

INSERT INTO Has_Stock (Location,ID,Quantity)
VALUES ("Crowfoot",1,10);

INSERT INTO Has_Stock (Location,ID,Quantity)
VALUES ("Webber",2,10);

INSERT INTO Manages(Location, Admin_ID)
VALUES ("Crowfoot",1);

INSERT INTO Manages(Location, Admin_ID)
VALUES ("Crowfoot",2);





