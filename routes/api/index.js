const router = require("express").Router(); // import the Express router
const userRoutes = require("./userRoutes"); // import the userRoutes

router.use("/users", userRoutes); // add prefix of `/users` to routes created in `userRoutes.js`

module.exports = router; // export the router
