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


Now it is time to implement the JWT functionality. If the new user is created successfully with new User() we create the json web token.

We create a separate folder utils with a file generateToken.js 

Inside we create a function that accepts user id and the response object. It creates the token with jwt.sign. Don't forget to add a secret word in the .env file. 

In the tutorial, he opens a bash terminal and creates a random key with this command: openssl rand -base64 32

In the options object of jwt.sign, you can specify the expiration date.

After the token is created, we want to engrain it into the cookie using the response object with the name of "jwt" with some options: res.cookie("jwt", token, {maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true /*users can't access this code with javascript XSS cross-site scripting atacks */, sameSite: "strict" //CSRF attacks cross-site request forgery attacks
secure: node.env.NODE_ENV !== "development })

Then you export this function. In order for cookies to work, don't forget to add middleware that parses the cookies: app.use(cookeParser()). cookieParser is exported by default by the cookie-parser package. 

Now go on to create the login handler. Set up a try-catch block. Get email and passwod from the request body. Get a user with User.findOne(). Then check password with bcrypt.compare(password, user?.password || "");

Notice this interesting things: user?.password. If the user is null or undefined, trying to access the password will not throw an error because of the .? optional chaining operator. 

If user is null or password is incorrect, respond with an error. 

If all is well, generate the token and send back the user data (same as for signup).

I will now try to implement the JWT and login part in code myself.

First, I don't really understand how the cookie is set. Like we get the token, right? How do we store it as cookie? In tutorial, he simply sets res.cookie("jwt", token). But I can't find it in documentation for cooke-parser.

I found out that res.cookie is actually part of express. I thought that the cookie parser middleware modifies the response object, but setting a cookie with res.cookie() is actually part of express functionality. 

I also made a mistake by trying to use httpOnly property when singing the jwt, not when creating a cookie. I must understand that httpOnly is a property relevant to cookies: you limit access to them. htttOnly means that the cookie is only accessible with GET/POST/etc requests, and not by javascript run on the browser.

The sameSite:"strict" property makes sure that cookies are only sent with requests that originate from the same site as the cookie. It prevents from exploits by cross-site requests.

The secure flag ensures that if we are not in development, the cookie is only sent with HTTPS connections. 

I have enabled the login functionality. Next step is logout. 

Log out is simply setting the "jwt" cookie to an empty string with a maxAge of 0 and sendign a json message of success. 

I was wrong for thinking that the next step is the frontend. While we are doen with the auth part API, we now need to build the backend for storing and receiving messages. 

We will have two models. Conversations with an id, array of participants' id's and array messages sent. Then there is also the message model with id, sender and receiver id, and the message itself. 

Go into the model folder, create message.model.js. The schema has senderId, receiverId, message. senderId and receiverID have same settings: type is referenced to the schemaType mongoose.Schema.types.ObjectId, ref:"User" and required: true. Also add the timestamps. 

Now create the coversation model file. 

There is a participants array with objects of type mongoose.Schema.types.objectId and ref:"User"

The messages field is also an array of objects of type ObjectId schema type and referenced to the "Message model. Default value is and empty array []. 

Also create add the timestamps.

Next step is to add the message functionality for this backend API. Add an "/api/messages" endpoint that uses the messageRouter. 

Create message.router.js 

Add a post request handler for "/sednd/:id". The :id parameter is id of  auser that wants to send a message. This handler uses the sendMessage controller from message.controller.js file 

