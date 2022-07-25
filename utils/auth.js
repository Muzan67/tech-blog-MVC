// If the user is not logged in, redirect the user to the login page
// This is directly from the `/gallery/:id` and `/painting/:id` routes
const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    // If the user is logged in, execute the route function that will allow them to view the gallery
    // We call next() if the user is authenticated
    next();
  }
};

// This is a check to see if the user is authorized to an API
//  and returns 401 not authorized if not logged in
const apiAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.status(401).json({ message: "Please log in!" });
  } else {
    next();
  }
};

module.exports = { withAuth, apiAuth };
