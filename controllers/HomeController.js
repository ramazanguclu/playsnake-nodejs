const mongoose = require('mongoose');
const User = mongoose.model('users');
const { getListByPoint } = require('./UserController');

getOrderByPoint = async (req) => {
    const list = await getListByPoint();
    let order = 0;

    list.forEach((v, k) => {
        if (req.user.googleId === v.googleId) {
            order = k + 1;
        }
    });

    return order + '.';
}

exports.Index = async (req, res) => {
    res.render('home/index.pug', { user: req.user, order: req.user ? await getOrderByPoint(req) : '' });
};