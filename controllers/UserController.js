const mongoose = require('mongoose');
const User = mongoose.model('users');

const getListByPoint = (req) => {
    return User.find().sort({ point: 'desc' });
}

exports.getListByPoint = getListByPoint;

exports.List = async (req, res) => {
    res.render('user/list.pug', { user: req.user, userlist: await getListByPoint() });
};