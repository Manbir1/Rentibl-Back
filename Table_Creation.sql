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
    REFERENCES Admin(Admin_ID),
);

CREATE TABLE Publisher
(
    Name VARCHAR(255) NOT NULL,
    Location VARCHAR(50),
    PRIMARY KEY (Name)
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
    Username VARCHAR(20) NOT NULL,
    ID INT(10) NOT NULL AUTO_INCREMENT,
    ReviewNumber INT(10) NOT NULL AUTO_INCREMENT,
    Rating INT(1),
    Comment TEXT(65535),
    Title VARCHAR(255),
    DateWritten DATE,
    PRIMARY KEY (Username,ID,ReviewNumber),
    FOREIGN KEY (Username)
    REFERENCES Customer(Username),
    FOREIGN KEY (ID)
    REFERENCES Video_Game(ID),
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
    REFERENCES Video_Game(ID),
);

CREATE TABLE Manages
(
    Location VARCHAR(50) NOT NULL,
    Admin_ID INT(10) NOT NULL,
    PRIMARY KEY (Location,Admin_ID),
    FOREIGN KEY (Location)
    REFERENCES Warehouse(Location),
    FOREIGN KEY (Admin_ID)
    REFERENCES Admin(Admin_ID),
);

CREATE TABLE Categorized
(
    GenreName VARCHAR(255) NOT NULL,
    ID INT(10) NOT NULL,
    PRIMARY KEY (GenreName,ID),
    FOREIGN KEY (GenreName)
    REFERENCES Genre(GenreName),
    FOREIGN KEY (ID)
    REFERENCES Video_Game(ID),
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
    REFERENCES Video_Game(ID),
);

CREATE TABLE Makes_Offers
(
    Username VARCHAR(255) NOT NULL,
    ID INT(10) NOT NULL,
    OfferValue DECIMAL(6, 2),
    PRIMARY KEY (Username,ID),
    FOREIGN KEY (Username)
    REFERENCES Customer(Username),
    FOREIGN KEY (ID)
    REFERENCES Video_Game(ID),
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
    REFERENCES Video_Game(ID),
);

CREATE TABLE Renter
(
    Username VARCHAR(255) NOT NULL,
    ShippingAddress VARCHAR(255),
    PRIMARY KEY (Username,ID),
    FOREIGN KEY (Username)
    REFERENCES Customer(Username)
);

CREATE TABLE Seller
(
    Username VARCHAR(255) NOT NULL,
    PRIMARY KEY (Username,ID),
    FOREIGN KEY (Username)
    REFERENCES Customer(Username)
);