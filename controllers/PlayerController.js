const mongoose = require('mongoose');
const User = mongoose.model('users');

exports.PointSave = async (req, res) => {
    let { point, sessionPoint } = req.body;
    point = Number(point);

    sessionPoint = sessionPoint > req.user.sessionPoint ? sessionPoint : req.user.sessionPoint;

    try {
        await User.findByIdAndUpdate(req.user._id, {
            point,
            sessionPoint,
            isPlay: true
        });

        res.send({ status: 'success', point });

    } catch (error) {
        res.status(422).send(error);
    }
}

exports.ChangePlayStatus = async (req, res) => {
    const { isPlay } = req.body;

    try {
        await User.findByIdAndUpdate(req.user._id, { isPlay });

        res.send({ status: 'success' });
    } catch (error) {
        res.status(422).send(error);
    }

}