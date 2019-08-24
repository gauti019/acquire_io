File structure:
---------------


--/api
   |
   |--/config
       |===> DB.js                   						               	// contains the mongoDB url
       |===> passport.js     									                  // contains passport-strategy configuration.
   |
   |--/models                                                   // contains Model and other methods for hashing e.t.c.
       |===> Transaction.js                                                     
       |===> Post.js                                                     
   |
   |
   |--/routes
       |---api
           |===> users.js                                       // contains API-routes for login/reg.
           |===> posts.js                                       // contains API-routes for post.
           |===> index.js
       |===> auth.js                                            // for authenticating using tokens( in future).
       |===> index.js                                           // definition of api routes.
   |
   |===> server.js                                              // entry-point to our Application.
