module.exports = (req, res, next) => {
    if (req.user.isPlay) {
        return res.status(403).send({ error: 'You must start!' });
    }

    next();
};