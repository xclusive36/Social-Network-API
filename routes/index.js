const router = require("express").Router(); // import the Express router
const apiRoutes = require("./api"); // import the API routes from the `api` directory

router.use("/api", apiRoutes); // add prefix of `/api` to all of the api routes imported from the `api` directory
router.use((req, res) => res.send("Wrong route!")); // if a request is made to any endpoint that doesn't exist, return a 404 error

module.exports = router; // export the router
