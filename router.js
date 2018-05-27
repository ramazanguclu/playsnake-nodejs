const AuthController = require('./controllers/AuthController');
const HomeController = require('./controllers/HomeController');
const UserController = require('./controllers/UserController');

const requireLogin = require('./middlewares/requireLogin');

module.exports = (app) => {
    app.get('/auth/google', AuthController.GoogleAuth);
    app.get('/auth/google/callback', AuthController.GoogleAuthMiddleware, AuthController.GoogleAuthCallback);
    app.get('/api/logout', AuthController.Logout);
    app.get('/api/current_user', AuthController.CurrentUser);

    app.get('/', HomeController.Index);
    
    app.get('/users', requireLogin, UserController.List);
};