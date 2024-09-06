This is a project I made following the tutorial by "As a Programmer": https://youtu.be/HwCqsOis894?si=bh6gJSb5NEs22kEV

It is a chat app with authentication. 

It is a chat app that uses the MERN stack, Socket.io, tailwind, JWT.

Create a vite React folder for frontend with npm create vite@latest .

Go into the root and set up the package.json folder there (that way is easier for deployment) with npm init -y

Create server.js and install the necessary packages (still from the root directory): express (initialize the express server), dotenv (read environment variables), cookie-parser (parse the cookies), bcryptjs (hashing password), mongoose (interacting with database), socket.io (real time communication), jsonwentoken (for creating tokens).

Create a script for starting development server with nodemon. 

You can use the cls command for cleaning the terminal.

Instead of commonjs, set the "type" to modules so that you can import things into the nodejs application. 

Create a routes folder with auth.routes.js file for the router. 

Then create a controller folder and a file auth.controller.js

The controller will have methods: login, logout, signup. All three for POST method. They will be prefixed with '/api/auth'

Use postman (or thunder client) for testing the API. 

Get the mongodn connection url and input it into .env. 

Make sure that MERN accepts all the IP addresses. 

Create a folder db with a file connectToMongoDB.js 

In this file, we connect to the database. Create an async function connectToDB() that has a try-catch block. Use this function to connect to the databse inside app.listen. 

Create a folder models. Create a file user.model.js. Import the mongoose package. The userSchema will have fields for full name, username, password, gender, profilePic.The gender field has enum:["male", "female"] for specifying certain possibe values. Profile picture string. Then create the "User" model. 

Don't forget to include json-parsing middleware for incoming requests. 

Start with the signup controller. The incoming fields in the body are {fullName, username, password, confirmPassword, gender}.

Check if the password matches the confirmPassword. Check if user exists by trying to find someone with the given username. 

We will get the profilePick URL by modifiying parameters of a URL of a website that returns avataers based on parameters passed: username, gender (boy or girl).

Create a new user with the keyword "new" and the User model. Save it with await and .save(). Send back json with user id, full name, user name and profile picture. If error, send and error message with status code 500. 

Test with thunder client. 

Now, it is time to enable the password hashing functionality. Import bcryptjs into the controller. 

Generate the salt, hash the password and pass the hashed value as a password into the user object created with new User({...}).

I will now try to implement this in code myself before watching the tutorial further.

I have implemented the signup functionality. I can add users into the database. What is interesting is that unlike before, I don't send back the wholse user document as a server response. I only send the relevant data: user id, profile picture link, full name and the user name. 