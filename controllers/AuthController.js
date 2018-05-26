const passport = require('passport');

//login
exports.GoogleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

//google login callback
exports.GoogleAuthMiddleware = passport.authenticate('google', { failureRedirect: '/' });

exports.GoogleAuthCallback = (req, res) => {
    res.redirect('/');
};

//logout
exports.Logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

//current user
exports.CurrentUser = (req, res) => {
    res.send(req.user);
};