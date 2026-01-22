// ========================================
// auth.js - AUTHENTICATION ROUTES FILE
// ========================================
// This file handles all authentication-related routes (login, register, logout, etc.)
// Think of routes as different pages or endpoints of your website

// ------------------
// IMPORTING PACKAGES
// ------------------

// EXPRESS: We need this to create a router
// A router is like a mini-application that handles a specific set of related routes
import express from "express";

// ----------------------------------
// CREATE A ROUTER INSTANCE
// ----------------------------------
// express.Router() creates a new router object
// A ROUTER is like a traffic controller - it directs incoming web requests to the right handler
// Instead of putting all routes in index.js, we organize them into separate files
// This router will handle routes like: /auth/login, /auth/register, etc.
const router = express.Router();

// ----------------------------------
// DEFINE ROUTES
// ----------------------------------

// This is a GET route (GET is a type of HTTP request, like asking to "view" a page)
// When someone visits this endpoint, this code runs

// router.get() means: "When someone makes a GET request to this path, do something"
// Parameters explained:
//   - First parameter "/" is the PATH (the URL endpoint)
//     Since this router will be mounted at /auth in index.js, 
//     this "/" actually means /auth/ in the full URL
//
//   - Second parameter is a CALLBACK FUNCTION that runs when this route is accessed
//     It has two parameters:
//       * req (request): Contains information about the incoming request
//         - Like what data the user sent, what browser they're using, etc.
//       * res (response): Used to send back a response to the user
//         - Think of it like a reply letter you're sending back
router.get("/", (req, res) => {
    // res.send() sends a response back to the user's browser
    // In this case, we're sending a simple text message
    // When someone visits http://localhost:8800/auth/, they'll see this message
    res.send("Hello, this is auth endpoint");
});

// ----------------------------------
// EXPORT THE ROUTER
// ----------------------------------
// "export default router" makes this router available to other files
// In index.js, we'll import this router and use it
// This is like packaging up our authentication routes so they can be used elsewhere
export default router;