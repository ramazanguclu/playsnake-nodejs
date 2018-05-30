var ajax = (function () {
    var urlRequest;
    var params = '';
    var callbackRequest;
    var isPost = false;

    return {
        post: function (url, params, callback) {
            isPost = true;
            urlRequest = url;
            if (typeof params === 'object') this.generateParams(params);
            callbackRequest = callback;
            this.sendRequest('POST');
        },
        get: function (url, params, callback) {
            urlRequest = url;
            if (typeof params === 'object') this.generateParams(params);
            callbackRequest = callback;

            this.sendRequest('GET');
        },
        generateParams: function (params) {
            var arr = [];
            for (var k in params) { arr.push(k + '=' + params[k]) };

            params = (isPost ? '' : '?') + arr.join('&');
        },
        sendRequest: function (type) {
            var http = new XMLHttpRequest();
            
            http.open(type, urlRequest + (isPost ? '' : params), true);

            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            var callback = callbackRequest;
            http.onreadystatechange = function () {
                if (http.readyState == XMLHttpRequest.DONE && http.status == 200) {
                    if (typeof callback === 'function') {
                        callback(http.responseText);
                    }
                }
            }
        
            isPost ? http.send(params) : http.send();
        }
    }
})();