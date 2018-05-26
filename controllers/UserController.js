const mongoose = require('mongoose');
const User = mongoose.model('users');

exports.List = async (req, res) => {
    const users = await User.find().sort({point: 'desc' });
    
    res.render('user/list.pug', { user: req.user, userlist: users });
};