Project Description: 

This is a Product Store project based on the YouTube tutorial of "As a Programmer"
channel: https://youtu.be/Dukz-3mS3Us?si=Ked52cWa72t4G1qT 

There is a frontend and a backend folder. 

The backend is an API that connects to a mongodb database. The databse saves products. Each product has 
a name, price, and an image (link to an image). 

The backend API lets us retrieve the products, add new prducts, delete existing products and update existing products. 

Backend uses the following packages: express, mongoose, dotenv, ... 

The frontend is implemented with React. There are two pages. The homepage that displays the products and a page with a form to create new products. 

For faster development and cleaner UI, we will sue Chakra UI for making and styling components. 

There will be a global state that stores the products retrieved from the databse. To implement this state, a package called zustand is used. 

For deployment, we add a configuration code that checks the environement in which node runs. 
If it is the production environment, the backend will also serve the frontend build files. 

Application will be deployed with Render.com. You will have to push your code to GitHub (after deleting unncecessary files, like node_modules). Then you use the repository in render.com. You will need to specify build and start commands (that we will add to package.json beforehand). We will also need to specify environment variables (don't forget to add .env in .gitignore).


Notes: 

The packages for the backend API are stored in the root folder. That is, go to the root folder, run npm i -y, install necessary packeges like express and mongoose, and whevenever you want to run the application you run it from the root folder: nodemon backend/server.js. To enable ES modules in backend, add "type":"module" in package.json in the root folder. T

Build the backend API first and test how it works with POSTMAN or thunder client. 

Add a package.json at the root folder that contains the backend and the frontend: npm init -y

In package.json, specify that you will use ES modules instead of common.js with: "type":"module"

Install nodemon as a dev dependency: npm install nodemon -D

Create a  config folder with db.js for connecting to the database with a try-catch block. In case of error, use process.exit(1) 

Implement the following format of naming for the files: product.model.js, product.route.js, product.controller.js, etc. 

React application is created using Vite with: npm create vite@latest . 

Run npm install after that to get the required node modules. 

For Chakra UI, go to their website, "get started" and find a command used for Vite. 

In order to use Chakra, you will need to wrap the App into ChakraProvider. 

Delete unnecessary frontend files: only App.jsx and main.jsx will be used.

The Navbar component is put outside of the BrowserRouter. It is always present. Navbar consists of Chakra UI buttons and react-router-dom Links. 

There will be a toggle button using useColorMode(); 

zustand is used for global state management. You use it to create a custom hook that lets you access and chagne the state. We will create useProductStore. 

To proxy our requests to the backend, go to vite.config.js and add: {"proxy": "/api": {target: "http://localhost:5000"}}

For image url's, you can go to Unsplash. 

For a proper display of elements on the homepage, we will use the SimpleGird component.

If when creating a product card you get an error that product.name is missing in props validation, go to file .eslinctr.cjs and add "react/prop-types": "off"

If you want to edit a product in place, a Modal will pop up with a form that you can fill. 

For deployment, we will also use the "path" module. 

Separate parts of the project that I need to understand:
    zustand 
    Chakra UI 
    basic API building 

When you import, don't forget to add .js to the filename. 

If you are exporting something without the default keyword, don't forget to use curly braces for destructuring. 

When making checks in endpoint handlers inside the controller file with an if statement, use the return 
keyword. Otherwise you might get an error because headers will be modified after the response is sent. 


If you want to set up Vite react template inside the current folder, write npm create vite@lastest . 


useColorMode hook is used to implement the dark/light mode toggle button. 



Topics I am still not very confident about:

-How mongodb works exactly? 

-How Chakra UI works? How does the provider work? 

-Advanced usage of Vite. 

-How does the process object work? How can it access the .env file data? process.exit, process.env seem interesting. 

-How does the path module work? How can I use it? 




Deployment:
Go into the server.js file. Import the path module. 

Get this: const __dirname = path.resolve(); 

Check if the process is run as production. 

If it is, we want the frontend folder to be a static asset. 

When you run npm run build, it gives you a dist folder. 

The dist folder is the one that you will use in production. 

You make the dist folder a static asset with this:
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

For all the requests other than to '/api/products', we want to send the React's index.js file:
    app.get("*", (req,res)=>{res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))})

For deployment, delete both node_modules folders, delete the dist folder 

In the root folder's package.json create a script for building:
    "build": "NODE_ENV=development npm install && npm install --prefix frontend && npm run build --prefix frontend"

Check if the command works. 

Once the application is built, we need to start it. We do it with another script:
    "start": "NODE_ENV=production node backend/server.js"

Eventually, you push the code to GitHub. 

Then you go to render.com. 
