const AuthController = require('./controllers/AuthController');
const HomeController = require('./controllers/HomeController');
const UserController = require('./controllers/UserController');
const PlayerController = require('./controllers/PlayerController');

const requireLogin = require('./middlewares/requireLogin');
const requireIsPlay = require('./middlewares/requireIsPlay');

module.exports = (app) => {
    app.get('/auth/google', AuthController.GoogleAuth);
    app.get('/auth/google/callback', AuthController.GoogleAuthMiddleware, AuthController.GoogleAuthCallback);
    app.get('/api/logout', AuthController.Logout);
    app.get('/api/current_user', AuthController.CurrentUser);

    app.get('/', HomeController.Index);

    app.get('/users', requireLogin, UserController.List);

    app.post('/api/point/save', requireLogin, requireIsPlay, PlayerController.PointSave);
    app.post('/api/player/status', requireLogin, PlayerController.ChangePlayStatus);
};