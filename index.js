// ========================================
// index.js - MAIN SERVER FILE
// ========================================
// This is the entry point of our booking application.
// It sets up the web server and connects to the database.

// ------------------
// IMPORTING PACKAGES
// ------------------
// These are external libraries (like tools/helpers) that we need for our app:

// 1. EXPRESS: This is a framework that helps us create a web server easily
//    Think of it as a pre-built foundation for building websites/APIs
import express from "express";

// 2. DOTENV: This helps us load secret configuration data (like passwords, API keys)
//    from a file called .env, so we don't hardcode sensitive information
import dotenv from "dotenv";

// 3. MONGOOSE: This is a tool that helps us talk to MongoDB database
//    MongoDB is where we store all our booking data (hotels, users, reservations, etc.)
import mongoose from "mongoose";

// 4. AUTHROUTE: This imports our authentication routes from the routes/auth.js file
//    We organize our code by putting related routes in separate files
//    This contains routes for user login, registration, etc.
import authRoute from "./routes/auth";

// ---------------------------
// INITIALIZATION AND SETUP
// ---------------------------

// Print a message to the console (terminal) so we know the file started running
console.log("✅ Server file started executing...");

// Load environment variables from the .env file
// dotenv.config() reads the .env file and makes those values available via process.env
// Example: if .env has "MONGO=mongodb://localhost", we can access it as process.env.MONGO
dotenv.config();
console.log("✅ Loaded environment variables...");

// Create an Express application instance
// "app" is like the brain of our web server - it will handle all incoming web requests
const app = express();

// ----------------------------------
// DATABASE CONNECTION FUNCTION
// ----------------------------------
// This function connects our application to the MongoDB database
// "async" means this function can perform operations that take time (like connecting to internet)
const connect = async () => {
  try {
    // "try" block: Code inside here will be attempted
    console.log("🔁 Trying to connect to MongoDB...");
    
    // mongoose.connect() establishes a connection to MongoDB
    // process.env.MONGO contains the database URL from our .env file
    // "await" means "wait for this to finish before moving to the next line"
    await mongoose.connect(process.env.MONGO);
    
    console.log("✅ Connected to mongoDB");
  } catch (error) {
    // "catch" block: If anything goes wrong in the "try" block, code here runs
    // This helps us handle errors gracefully instead of crashing
    console.error("❌ MongoDB connection error:", error.message);
    
    // process.exit(1) stops the entire application
    // We do this because if database connection fails, the app can't work properly
    // The number 1 indicates the app stopped due to an error
    process.exit(1);
  }
};

// ----------------------------------
// DATABASE EVENT LISTENERS
// ----------------------------------
// These are "event handlers" - they listen for specific events and react to them

// This listener triggers when Mongoose successfully connects to MongoDB
// Think of it like a doorbell - when the "connected" event happens, this function runs
mongoose.connection.on("connected", () => {
  console.log("✅ Mongoose connected");
});

// This listener triggers when Mongoose loses connection to MongoDB
// This helps us know if something goes wrong with the database connection
mongoose.connection.on("disconnected", () => {
  console.log("⚠️ Mongoose disconnected");
});


//time for Middlewear
//When ever we visit /auth that is visit that end point
//it shall use authRoute 
app.user("/auth",authRoute);




// ----------------------------------
// START THE SERVER
// ----------------------------------
// app.listen() starts our web server and makes it listen for incoming requests
// 8800 is the "port number" - think of it like a specific door on your computer
// When someone visits http://localhost:8800, our server will respond

// The second parameter is an "async callback function" - code that runs after server starts
app.listen(8800, async () => {
  console.log("🚀 Starting server...");
  
  // Call our connect function to establish database connection
  // "await" means wait for the connection to complete before continuing
  await connect();
  
  console.log("✅ Connected to backend!");
});
