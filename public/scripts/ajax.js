function Ajax() {
    this.url;
    this.params = '';
    this.callback;
    this.isPost = false;

    this.post = function (url, params, callback) {
        this.isPost = true;
        this.url = url;
        if (typeof params === 'object') this.generateParams(params);
        this.callback = callback;
        this.sendRequest('POST');
    }

    this.get = function (url, params, callback) {
        this.url = url;
        if (typeof params === 'object') this.generateParams(params);
        this.callback = callback;

        this.sendRequest('GET');
    }

    this.generateParams = function (params) {
        var arr = [];
        for (var k in params) { arr.push(k + '=' + params[k]) };

        this.params = (this.isPost ? '' : '?') + arr.join('&');
    }

    this.sendRequest = function (type) {
        var http = new XMLHttpRequest();

        http.open(type, this.url + (this.isPost ? '' : this.params), true);

        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var callback = this.callback;
        http.onreadystatechange = function () {
            if (http.readyState == XMLHttpRequest.DONE && http.status == 200) {
                if (typeof callback === 'function') {
                    callback(http.responseText);
                }
            }
        }

        this.isPost ? http.send(this.params) : http.send();
    }
}