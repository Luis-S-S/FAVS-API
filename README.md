# FAVS-API
Restful API implementation.

### Usage
- Clone the git repository
- With the assistance of the development team, verify all environmental variables are set. Follow .env.example file for guidance
- On the root folder execute `npm install` in the terminal to ensure all dependencies are available
- Execute either of the following:
  - `npm run dev` to use nodemon. This will allow you to save and see changes immediately
  - `npm start` to use node. This will run the server yet any changes will apply until you close and reopen the server
  - NOTE: Both commands point to index.js
- Most of the times the server will be located at port **8080**, still verify the port by checking at the terminal logs.
  - Once the right port is identified go to [http://localhost:port](http://localhost:8080) _link points to default port 8080_
- Use the following chart to modify the URL depending on which action you want to perform

| METHOD | endpoint | Authentication? | Body format | Outcome |
| :----: | -------- | :-------------: | ----------- | ------- |
| POST | /auth/local | No | { "email": "user@email.com", "password": "pwd" } | Returns a token for auth, unless data is incorrect |
| GET | api/users   | Yes | NA | Returns all users |
| GET | api/lists   | Yes | NA | Returns all lists from all users |
| GET | api/lists/user | Yes | NA | Returns all lists of the user logged in |
| GET | api/lists/:id | Yes | NA | Returns a list if the user logged in is the owner of the list |
| POST | api/lists | Yes | { "name": "name", "favs": ["Favorites"]* } | Creates a new list for the user logged in |
