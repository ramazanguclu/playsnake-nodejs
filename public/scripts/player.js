var player = (function () {
    var isLogin = false;
    var point = 0;
    var pointCount = 0;

    return {
        loginControl: function (callback) {
            var ajax = new Ajax();

            ajax.get('/api/current_user', false, function (r) {
                if (r) {
                    isLogin = true;
                    var user = JSON.parse(r);

                    if (user.isPlay) player.setPlayStatus(false);

                    point = user.point;
                }

                callback();
            });
        },
        setPlayStatus: function (status) {
            if (!isLogin) return;

            var ajax = new Ajax();
            ajax.post('/api/player/status', { isPlay: status });
        },
        savePoint: function (type) {
            if (!isLogin) return;

            var ajax = new Ajax();

            if (type === 'sessionEnd') {
                ajax.post('/api/point/save', { point: point, sessionPoint: this.sessionPoint() });
                pointCount = 0;
                return;
            }

            ajax.post('/api/point/save', { point: point });
        },
        setPoint: function () {
            point += 10;
            pointCount += 1;
        },
        getPoint: function () {
            return point;
        },
        sessionPoint: function () {
            return pointCount * 10;
        }
    };
})();