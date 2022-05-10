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

| METHOD | ENDPOINT | AUTHENTICATION? | BODY FORMAT | OUTCOME |
| :----: | -------- | :-------------: | ----------- | ------- |
| POST | /auth/local | No | `{ "email": "user@email.com", "password": "pwd" }` | Returns a token for auth, unless data is incorrect |
| GET | api/users   | Yes | NA | Returns all users |
| POST | api/users   | Yes | `{ "email": "user@email.com", "password": "pwd" }` | Creates a new user |
| GET | api/lists   | Yes | NA | Returns all lists from all users |
| GET | api/lists/user | Yes | NA | Returns all lists of the user logged in |
| GET | api/lists/:id | Yes | NA | Returns a list if the user logged in is the owner of the list |
| POST | api/lists | Yes | `{ "name": "name", "favs": ["Favorites"] }` see note | Creates a new list for the user logged in |
| PATCH | api/lists/:id | Yes | `Custom, depends on the information to update` | Updates a list as long as the user logged in is the owner of the list |
| PATCH | api/lists/:id/add_favs | Yes | `["Favorites"]` see note | Adds the list of favorites as long as the user logged in is the owner of the list |
| DELETE | api/lists/:id | Yes | NA | Deletes a list as long as the user logged in is the owner of the list |

Note: ["Favorites"] is an embedded list. This means we can input as many "Favorites" as we want, we only need to separate them with a comma (,). Also the body of a favorite itself is the following: `{ "title": "title", "description": "description", "link": "link" }`

### TESTING USERS
| EMAIL | PASSWORD |
| ----- | -------- |
| this980@email.com | 12345 |
| thisc3a@email.com | 12345 |
| this625@email.com | 12345 |
**All passwords are encrypted**

### Questions
1. Indicate which are the parts of the following url: `https://backend.mega-app.com.co:8080/api/articles/search?docid=1020&hl=en#dayone`
   - The sections of the url are the following:
     - `https`: The transfer protocol, in this case is `Hypertext Transfer Protocol Secure`
     - `backend.mega-app.com.co`: The domain
     - `:8080`: The port
     - `/api/articles/search`: The endpoint
     - `?docid=1020&hl=en#dayone`: The query string, in this case and object `{ "docid": "1020", "hl": "en#dayone" }`
2. Define what is a Web API, Restful and what are the statusCode 200-, 400-, 500-
   - Web API: `Application Programming Interface` as the name implies is an interface usable to access functions from a given library. Instances such as STRIPE API, JWT API, CLOUDINARY API, etc. allows us to interact with these platforms and use their functionalities.
   - Restful: Is a client-server architecture, in which clients can interact with the server through different endpoints. Restful is not a protocol but instead a rule-set for good practices.
   - Status codes:
     - 200- : Success
     - 400- : Client errors
     - 500- : Server errors
3. When we talk about CRUD, what does it mean?
   - CRUD is an acronym we use to reference the 4 main actions performed with a Restful API
     - C: Create, refers to a `POST` METHOD
     - R: Read, refers to a `GET` METHOD
     - U: Update, refers to either a `PUT` or `PATCH` METHOD
     - D: Delete, refers to a `DELETE` METHOD