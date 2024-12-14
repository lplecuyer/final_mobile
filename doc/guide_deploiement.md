# Guide de déploiement

### L'utilisateur de test est 
    - username: test
    -pwd: test
    la cle API du compte est la mienne et lew steam_id est aussi le mien

### donnees de depart :
    - Sql Dump

    [{"name":"insert-user","string":"INSERT INTO Users(username, pwd, token, steam_id) VALUES (\"?username\", SHA2(\"?password\", 256), \"?token\", \"?steam_id\");","type":1},{"name":"select-user-auth","string":"SELECT * FROM Users WHERE username=\"?username\" AND pwd=SHA2(\"?password\", 256);","type":0},{"name":"select-all-reviews-for-game","string":"SELECT \r\n    Reviews.id, \r\n    Reviews.title, \r\n    Reviews.description, \r\n    Reviews.user_id, \r\n    Reviews.rating,\r\n    Users.username AS authorName\r\nFROM \r\n    Reviews\r\nLEFT JOIN Users ON Reviews.user_id = Users.id\r\nWHERE \r\n    Reviews.game_id = \"?game_id\"\r\nORDER BY \r\n    Reviews.user_id = \"?user_id\" DESC;","type":0},{"name":"select-review","string":"SELECT title. description, rating FROM Reviews WHERE id=\"?id\";","type":0},{"name":"select-all-comments-for-reviews","string":"select *\r\nfrom Comments\r\nwhere review_id = \"?review_id\";","type":0},{"name":"insert-game","string":"INSERT INTO Games (name, image_url, steam_game_id)\r\nVALUES (\"?name\", \"?header_image\", \"?appid\")\r\nON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id);\r\n\r\nINSERT INTO Users_Games (user_id, game_id)\r\nVALUES (\"?user_id\", LAST_INSERT_ID())\r\nON DUPLICATE KEY UPDATE user_id = user_id;","type":1},{"name":"select-game-by-id","string":"SELECT * FROM Games where Games.steam_game_id = \"?steam_game_id\"","type":0},{"name":"select-all-games","string":"SELECT * FROM Games","type":0},{"name":"create-new-comment","string":"INSERT INTO Comments (user_id, review_id, comment)\r\nVALUES (\"?user_id\", \"?review_id\", \"?newText\");","type":1},{"name":"check_user_owns_game_and_reviewed","string":"SELECT \r\n    (SELECT COUNT(*) FROM Users_Games WHERE user_id = \"?user_id\" AND game_id = \"?game_id\") AS owns_game,\r\n    (SELECT COUNT(*) FROM Reviews WHERE user_id = \"?user_id\" AND game_id = \"?game_id\") AS has_reviewed;","type":0},{"name":"select-review-writer","string":"SELECT * FROM Users WHERE id = \"?user_id\"","type":0},{"name":"update-review","string":"UPDATE Reviews SET title = \"?title\", description = \"?description\", rating = \"?rating\"\r\nWHERE id = \"?id\" AND user_id = \"?user_id\"","type":1},{"name":"select-comment-writer","string":"SELECT * FROM Users WHERE id = \"?user_id\"","type":0},{"name":"create-new-review","string":"insert into Reviews (title, description, user_id, game_id, rating)\r\nvalues (\"?title\", \"?description\", \"?user_id\", \"?game_id\", \"?rating\");","type":0},{"name":"update-comment","string":"UPDATE Reviews SET description = \"?newText\" WHERE id = \"?id\"","type":0},{"name":"delete-review","string":"DELETE FROM Reviews where id = \"?reviewId\" AND user_id = \"?userid\"","type":1},{"name":"delete-game","string":"DELETE FROM Users_Games\r\nWHERE user_id = \"?user_id\" \r\nAND game_id = (SELECT id FROM Games WHERE steam_game_id = \"?appid\");","type":1},{"name":"user-owns-game","string":"SELECT *\r\nFROM Users_Games \r\nWHERE user_id = \"?user_id\" \r\nAND game_id = (SELECT id FROM Games WHERE steam_game_id = \"?appid\");","type":0},{"name":"select-all-reviews-for-user","string":"SELECT * FROM Reviews WHERE user_id = \"?user_id\"","type":0},{"name":"select-game","string":"SELECT * FROM Games WHERE id = \"?id\"","type":0},{"name":"select-usersgames-status","string":"SELECT game_completed FROM Users_Games WHERE game_id = \"?game_id\" AND user_id = \"?user_id\"","type":0},{"name":"insert-usersgames-status","string":"UPDATE Users_Games \r\nSET game_completed = \"?gameStatus\"\r\nWHERE game_id = \"?game_id\" AND user_id = \"?user_id\";","type":1},{"name":"select-game-by-name","string":"SELECT * FROM Games WHERE name = \"?name\"","type":0}]

    -- Tables et insertions
    CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        pwd VARCHAR(255) NOT NULL,
        token VARCHAR(255) NOT NULL,
        steam_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS Games (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        steam_game_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS Users_Games (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        game_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
        FOREIGN KEY (game_id) REFERENCES Games(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        user_id INT NOT NULL,
        game_id INT NOT NULL,
        rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
        FOREIGN KEY (game_id) REFERENCES Games(id) ON DELETE CASCADE
    );

    -- Insertion des données
    INSERT INTO Users (username, pwd, token, steam_id) 
    VALUES ('test', SHA2("test", 256), 'DC8DD54601F99078367C3B2305FFC527', '76561199006028856');

    SET @user_id = LAST_INSERT_ID();

    INSERT INTO Games (name, image_url, steam_game_id) 
    VALUES ('Call of Duty: Black Ops II - Zombies', 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/212910/header.jpg?t=1447355898', '212910');

    SET @game_id = LAST_INSERT_ID();

    INSERT INTO Users_Games (user_id, game_id) 
    VALUES (@user_id, @game_id);

    INSERT INTO Reviews (title, description, user_id, game_id, rating) 
    VALUES ('incroyable jeu', 'c\'est le meilleur jeu de tous les temps', @user_id, @game_id, 5);
