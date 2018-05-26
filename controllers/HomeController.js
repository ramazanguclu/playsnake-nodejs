exports.Index = (req, res) => {
    res.render('home/index.pug', { user: req.user });
};