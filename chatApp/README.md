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

Add a post request handler for "/sednd/:id". The :id parameter is id of the user to send the message to. This handler uses the sendMessage controller from message.controller.js file 

Inside the sendMessage controller, we get the message from the request body, id from request parameters. We will also need the id of the sender. The way we get is by adding middleware that checks is user is logged in using the jwt cookie. If yes, it gets the id from the cookie and attaches it to the request object that will be then accessible inside the sendMessage controller. 

To implement it in code, go to the router and modify the post handler: router.post('/send/:id', protectRoutes, sendMessage); We have added the protectRoutes function. 

Create a folder middleware and add a file protectRoutes.js

Define the function protectRoute that takes in request, response and next.

Inside, add a try-catch block. Get the token from the request object with req.cookie.jwt. 

If it exists, get decoded value with jwt.verify. If decoded value is valid, get the user from the database using the decoded id. Add this to get the user from the database without the password: .select('-password');

If the user exists, attach it to the request object with req.user = user; and then call next(); 

It might be wise to rename the id's inside sendMessage to not confuse anything:
    const {id:receiverId} = req.params;
    const senderId = req.user._id;

Then you need to find a conversation in the database that contains both the sender and the user id inside the participants field.

You do it using the Conversation model: let conversation = await Conversation.findOne({participants: {$all: [senderId, receiverId]}});

$all is a mongoDB operator that matches a field to an array that contains all of the values specified with the operator. 

Notice that we use the 'let' keyword to get the conversation from the database instead of const, because we are going to change the conversation. 

Check if conversation is null. If it is, then we create a new one with Conversation.create();

Then, create a new messgae using the Message model. If the message is successfully created, push the message id into the conversation's  messages array. 

Don't forget to save the conversation and the message. You can do it in a concise way with:
    Promise.all([conversation.save(), newMessage.save()]); 
This way, those promises will be done in parallel, compared to sequentially if we used await for each separate save. 

Now, I will try to implement this code myself. But to be honest, I feel a bit lost/overwhelmed/confused. Let's recap.

We want to add functionality to an endpoint that get a user id as a request parameter and a message inside the request body. For now, all we want is to add the new message to the database and also create/update the conversation between two users. 


I have done it. Had some difficultie but all is resolved.

Next thing to do is make an endpoint for getting messages from two users. 

We want to get a message from the current user (id is tored in cookie jwt) and the user whose id is passed as a request parameter.
 
The request handler uses the same protectRoute middleware to get decode the cookie file and attach its contents to req.userId. 

But we create a new request handler getMessages. 

You search the conversation of two users using their id's and get the messages array. But remember that this array contains id's and not the messages themselves. We want to have an array of messages. We can do it using the populate() method provided by mongoose:
await Conversation.findOne({participants: {$all: [senderId, receiverId]}}).populate("messages");

The populate methods wills in the messages field with an array of objects, each object corresponging to the message id that it originally had. 

I implemented it. 

Now, it is time to make the user controllers and routes to CRUD users. The endpoint is "/api/routes". The router is userRoutes. The point of this is to get users to be displayed on the sidebar.

Create user.routes.js; Add user.controller.js; We do not need to create a new model. We will use the existing User model.

Then create a controller file with a function getUsersForSidebar.

Typically, add a try-catch block.

get the logged in user id -> find all conversations where the user is present -> get the other user's id and compose and array of all user's that the logged in has conversations with 

First, we get filteredUsers. We use the $ne: loggedInUserId to get all user values that do not match the specified value. 

Use the field selection by adding select(["-password"]) to the query.



It is now time to make the frontend. 

Go into the frontend folder, launch the development server. 

Then install tailwind for vite. Paste necessary stuff into tailwind.config.js. Paste code into index.css. 

Then you also need to install daisy UI. Run the command in terminal, add plugins into tailwind.config.js. 

Make sure that daisy ui compnents and tailwind css with some buttons. 

You can download tailwind intellisence extension to see what is applied to elements with tailwind. 

We will have several pages with navigation relying on react-router-dom. 

Add folders pages and components. 

We will have three different pages: signup, login, home. Each page has a separate folder. 

Set up the App component. It has a main div with some padding, height set to screen height, display is flex, items are centered on both main and cross axis. 

First, let's develop the Login page. 

We will use a background image for the body. Use index.css. It is stored in the 'public' folder.

Go into index.css and add some styling to the body to set the image as the background:
    background with gradient and image, no-repeat, size that covers, position center, attachment fixed. 

For some reason, the app does not cover whole page. Only a small narrow stripe. 

I fixed it. I wrote h-scren instead of h-screen for the App component. Now it takes p the whole height of the screen. Nice. 


For the Login page, create an enclosing div with flex display, items centered vertically and horizontally. Main axis is vertical. 

Create a rectngle/window with transparent effect. You can get the tailwind classes required from tailwind glassmorphism generator. 

Add a heading Login ChatApp. 

Below the heading, create a form. 

Use label tags and modify them with daisu UI. className = "label"

You know, I think I am doing it wrong with all this. Trying to memorize everything. It's not possible. And it's not wise. My notes should contain more declarative statements and only necessary imperative statements. 

That is, describe the essential components/parts of the project, but only decsribe code when necessary. Don't turn this documentation into a 1000-step manual. 

We make a form. With cool transparent background (get classnames from tailwind glassmorphism generator). It has a header at the top. 

I will now try to implement the form with one input field. 

Add a link "not registered yet?" that underlines on hover. Also add a login button. 


The SignUp page is made the same way but with more fields. There will be a sepatare component for GenderChecBox.

I couldn't increase the size of checkboxes using vanilla css so I used the checkbox component from daisy. 

Now, we shall start creating the homepage. 

The homepage is a transparent rectangle with search and sidebar for chats on the left and a certain chat/conversatino on the right. 

The homepage is wrapped in div. This div is essentially the rectangle dispalyed on the backgrond image that is always present on the back. The div has a bunch of tailwind classes applied to it:
    flex display, responsive height that increases with screen dimensions, rounded corners, hidden overflow, bg-clip-padding to ensure that the gray transparent background spreeds beyon content onto padding, backgrop-filter applies a filter effect and backgrop-blur-lg specifies that it is a blur effect, background-opacity-0 makes the background transparent. 

Basically, on a high level, Home is a rectangle with responsive height that has blurry/transparent background that spreads to padding.

The Sidebar and the MessageContainer are going to be two separate ocmponents that we add into the components folder with each component having its own folder 

Inside the sidebar, we have three components. The search input field. The conversations. And at the bottom there is a logout button. 

We split this into three different components. What is interesting about this tutorial is that the author ("As a Programer") has folder for each page/major component and the folder containes the parent and the relevant children. It seems to be convenient. 

Below the SearchInput component there is a divider (use little tailwind/daisy to make it from div).

And then there is the Conversations component and LogoutButton bellow it. 

SearchInput is relatively simple. A parent form component with an input from daisyUI. 
To the right of the input field is the search button. Use daisyUI and react icons. 

The form itself is flexible with items center on cross axis and some gaps. 

Get the Home into the App and see how it all works. 

I think that when working on stuff with different files, it might be wise to locate the files with decreasing parentship from left to right. Like Home -> Sidebar -> SearchInput 

I installed react-icons from the root folder using npm install react-icons --prefix frontend. This is cool. I am getting stronger.

Now let's proceed to make the Conversations component. We will also create a component Conversation. 

Conversations is a parent div with flexible display, vertical padding, vertical axis, automatic overflow and a bunch of Conversation components inside (for now just input them). Automatic overflow fits perfectly because it will output conversation components without scroll first but then add it if necessary. 

The Covnersation component is basically a horizontal stripe with an icon, a name and an emoji. There is a divider bellow each Conversation.

The Conversation component is a parent fragment <></> with two divs inside. It changes background on hover. 

DaisyUI has an avatar component that can dispay online/offline status.

On the same level with the avatar is a div for full name and emoji.

After adding the Conversations component, let's work on the LogoutButton component. 

Don't forget to add a border to the sidebar. 

I ditched using the divider between search input and conversations because I couldn't set the color I want. Instead I just used a div with bottom border. 

For making the logout button, we have a parent div with margin-top set to auto. That way, the button is automatically at the bottom. 

I added overflow:hidden to the body to avoid white shit appearing when someone scrolls too much. 

The next step is to create the MessageContainer component. 

Create a new folder inside components for messages and a new component file for MessageContainer. 

The MessageContainer has a header (who is receiver of the message), messages (in clouds; right from you; left from receiver; Messages have icons and time codes;), input field for new message with a send button. 

The MessageContainer has responsive width that increases with screen size. 

Again, MessageContainer has three components: header (made directly in the container), Messages component, and the MessageInput component. 

We will start with making the Messages component. We set overflow to auto so that a scrollbar appears when there are too many messages. 

Initially, just wrap a bunch of hardcoded Message components inside the main parent div of the Messages. 

Now let's create the Message component. 

Turns out, the Message itself is done pretty simply: there is a component for that in DaisyUI. The component has class "chat". "chat-start" and "chat-end" position the messages to the left and to the right. 

You then use classes like "chat-bubble" and "chat-image avatar" to build the message that you like. 

"chat-footer" is used for displaying the time code. 

The scrollbar that appears by default as a result of setting "overflow-auto" is quite ugly. So we change it inside index.css with a  bunch of interesting CSS I don't understand. The author added stuff like ::-webkit-scrollbar{...}. Need to check that probably. 

I will now try to implement the MessageContainer.

I encountered a challenge with the Message and Messages compnents. Message was too big for some reason and different Message components overlapped each other. I fixed it by setting the icon's height to fit. The overflow-auto property of Messages did not work after that. I fixed it by specifying the height of the Messages component. 

Now let's create the MessageInput component. 

It will have a parent form. Inside is a div that has input and button with a send icon. 

I will now try to add the header and the bottom input field. 

I need to read bout this ::-webkit-... css stuff.

:: denotes a pseudo-element. The essence of a pseudo-element is that we treat a part of some existing element (p, h1, div, etc.) like a separate element on its own. Imagine that we want to style the first line/letter of the p tag and treat it like an element on its own. That is why it is called a pseudo-element.

The webkit part referse to the rendering engine used by Chrome, Safari and Opera. We use it because it lets us style the scrollbar. 

I have a problem. I can't manage to put the input field at the bottom of the window. Margin top-auto does not work. Position relative does not work. 

I found out why. I set fixed height on the parent element and the form could not go beyond it. I found it out by using the elements tab in dev console. 


Now, let's add a componen for display of message "Select a chat to start messaging" at the start of website usage. 

We can do it with a component inside MessageContainer.jsx. Just define and use a function that is conditionally swapped with contents of the MessageContainer if no chat is selected. 

We will now proceed to work on the functionality of frontend. We want to make it communicate with the backend. 

First, let's add some routing with react-router-dom. 

Install the package with npm. Go into main.jsx and wrap the App into the BrowserRouter component. Wrapping the BrowserRouter lets us use the package's components inside App.jsx.

Inside App.jsx, we add the Routes component. Within the Routes component, we use the Route components. Each corresponde to an element displaeted on a certain path. 

We want Route components for the Home, Signup and Login pages. 

Add a link to don't have an account that leads to signup page. And similar link to login page if you have account. 


Now let's add the signup functionality. 

We need to set up a state that tracks the user input. 

Create a handleSubmit function.

I am not sure how to track input from the GenderBox. It is a separate component. Do we pass the state as a prop that it can edit? 

Yes. In the tutorial, author creates and passes a callback function as a prop. And he also passes the input state as a prop too: so that the GenderBox component shows which gender is selected. 

I got some eslint prop validation error. It is solved in the tutorial by adding some settings to the eslint.config.js: "react/prop-types":"off". 

Next step is to make actually write code for signing up the user. While we could define the functionality in Signup.jsx, a custom hook will be created.

Create a folder called hooks. Create a file called useSignup.jsx. 

The custom hook defines a loading state. An asynchronous function called signup that takes in the inputs. This function will later be called inside handleSubmit using await. 

We  define and use a validation function called handleInputErrors() that takes in all the inputs and returns a boolean value. It checks if all the fields are not empty. In case of error, it raises a toast with error message using package called react hot toast. 

It also checks if provided passwords match. 

Add a try-catch-finally block that sends the fetch request or raises an error toast. In the finally section set the loading state to false (makes sense because request ends whether successful or not).

The hook itself returns the loading state and the signup function. 

You will probably get a CORS error if you try to send the request. To fix this, you go to the vite.config file and add a proxy field. 

One of the common challenges I encounter while making websites is being lost when adding new features. It is hard to decide what to work on next and what does that mean to the rest of the code already written. 
 
But I think I can overcome this by keeping the big picture in my head. I think I will always be slightly (or significantly) lost, but by keeping the big blurru picture of what I want to build I will probably make necessary adjustments sooner or later. 

Right now, the goal is to sign up a user to the database using the signup form. 

I made a mistake by returning loading state and signup function in round braces instead of {}. As a result, the signup function was undefined or something. 

I had a problem setting up the vite proxy because I forgot to wrap the proxy {} part into server{} part inside vite.config.js 

Now, if the user is signed up/logged in, we do not want to show him the signup page. In order to determine whether the user is in the system, we will create a global context.

Create a folder called context. In this tutorial, author uses createContext from react. I think that I will use Zustand, as it is the package recommended y frontend devs and I want to be more familiar with it. 

The global state we create is authUser. The default value is derived from the local storage: useState(JSON.parse(localstorage.getItem("authUser")) || null). If the value is empty we use null.

JSON.parse takes in a string value returned from the localstorage and turns it into an object. 

The global context provider feeds the state and a method that lets you change the state. 

Inside useSignup, we save the object returned from the backend that contains _id, username, fullname, profilePic and gender. 

After we save the data in localstorage, we also update the globar authUser state. 

Now, we go to App.jsx and get the authUser state. We want to tweak the routing. If authUser is not null, we should be navigated into the homepage using Navigate from react-router-dom: element={authUser ? <Navigate to='home'/> : <Signup/>}. Do similar stuff to Home and Login pages. 

I got errors because I forget to specify name of data stored in localStorage. 


Next step is to add the logout functionality.

We create a hook useLogout.js

The hook has a loading state. It has an async function logout with a try-catch-finally block. 

Basically, we need to send a fetch request to the server to delete the cookie containing the JWT. If the request is successful, we remove the chatUser state from localStorage and update the authUser state to null. Also add some toasts. 

Lastly, we call the logout function using the Logout button component. If the logout request is loading, we show a loading spinner from daisyUI. 

Had problems with making ternary operator thing in logout. You should wrap conditionally render shit in a stable parent div.



I have a problem that I can't quite figure out. When you refreh the web page, it has some kind of problem reading the data from localStorage.

I fixed it. The problem was that I was storing an object that contains user data and called json without converting it to actual json. When I used JSON.parse to retrieve it, it got error because of receiving an object instead of a string.

I also need to fix color of the text in the input field. 


Nice. fixed it all. I am genius (yesterday I felt the dumbest f*ck on the planet).

I am going to try to do it myself. It is essentially same stuff. You add state to track inputs. You create a hook that returns asynchronous login function and a loading state. And perhas raise a toast on success/error. 

Next part is getting the users for the sidebar conversations. 

The author in the video wants to use zustand to store conversations in a glbal state. 

Create a file useConversation.js. 

The hook stores selectedConversations and messages states. 

We will use the hook for this state in Conversations.jsx

We also create a custom hook useGetConversations.js 

The hook useGetConversations has a loading state, a conversatins state.

There is a useEffect hook that defines function getConversations. This function gets the conversations/users from endpoint 'api/users'.

The hook returns the loading state and the conversations.



I was able to fancily change the code on several lines simultaneously after selecting them while holding the option key. I feel the power now. 


Let's get back to building the funcitonality of the website.  

We create a zustand hook with a state for selected conversation and messages. 

We also create a hook for fetching data on users from the api with endpoint "/api/users"

We call the hook to get the conversations inside Conversations.jsx component. 

The useGetConversations() returns a loading state and a conversations state. 

It also has a useEffect() hook with empty [] that runs on every render. The useEffect() hoos sends the request to the API. Note that it is a GET request: we don't need to send anything. Even though the backend needs to know the specific user whose conversations we are getting, it can get it from the jwt cookie that contains the id of a logged in user. 

The function used in the useEffect is asynchronous. We define it within useEffect to not have to pass it inside []. I don't understand why, but we don't need to pass setLoading and setConversations inside useEffect. 

Once you get the conversations, you map them inside Conversations.jsx. 

The author decided to add an emoji for each conversation. At first I thought we would need to use an external API, but it is much more straightforward. He madea file inside utils folder called emoji.js

It has a lot of emojis in "" quotes, stored in an array. The file exports a funtion that returns a random emojy by generating a random index with Math.floor and Math.random. 

There is also a prop passed to a Conversation component called lastIdx that corresponds to the index of the last element in the array of conversations. It is used to remove the divider line bellow the conversation displayed at the bottom.

I added the array that I copied from the internet. And I beatifully formatted it using "format selection" and choosing "Prettier". Amazing power. 

Next step is to enable the user to select the conversation/chat. 

We just need to use the useSelectedConversation hook we created with zustand inside every Conversation component.

Now, when there is a selected conversation, we want to get the messages from the conversation and display them inside the MessageContainer. 

import and use the selectedConversation state inside the MessageContainer.

Note that you also must make sure that the selectedConversation state is erased when you LogOut.  

You can also add an unmounting cleanup function for clearing the selectedConversation state once the components are not displayed. 

The unmounting function is a funciton that is returned by the useEffect hook: return ()=>{...}


Next step is to make sure we can send messages. 

We create a custom hook for sending messages useSendMessage 

Essentially, we retrieve the selected conversation, and use its info to send a message. The receiver id is in request parameters, sender id is inside the cookie file and is enabled by backend middleware and the message itself is in request body. 

We will also use the useSelectedConversation for the messages state.

useSendMessage returns a sendMessage function that sends the message. 

Remember that when you send messages, the conversations get updated.