var speedSnake = 100;
var direction = 'right';
var prevDirection = 'right';
var storageTop;
var storageLeft;
var step = 20;
var initState = 3;
var lengthUnit = 'px';
var isForage = false;
var againText = 'Press enter to start';
var gameOverText = 'Game Over';
var liveCount = 3;

function Snake() {
    document.addEventListener('keydown', function (event) {
        listenButton(event.keyCode);
    });

    function detectKey(val) {
        var code = KEYS[val];
        listenButton(code);
    }

    listenButton = function (code) {
        switch (code) {
            case 13:
                setState();
                break;
            case 37:
                direction = prevDirection === 'right' ? 'right' : 'left';
                break;
            case 38:
                direction = prevDirection === 'down' ? 'down' : 'up';
                break;
            case 39:
                direction = prevDirection === 'left' ? 'left' : 'right';
                break;
            case 40:
                direction = prevDirection === 'up' ? 'up' : 'down';
                break;
        }
    };

    function setState() {
        switch (initState) {
            case 1:
                construct();
                break;
            case 2:
                initial();
                break;
            case 3:
                speedSet();
                break;
            case 4:
                gameOver();
                break
            default:
                break;
        }
    };

    var construct = (function cons() {
        initState = 2;

        direction = 'right';
        prevDirection = 'right';
        initial();

        return cons;
    })();

    function changeForagePosition() {
        window.x = setInterval(function () {
            foragePosition();
        }, 15000);
    }

    function initial() {
        initState = 3;
        segmentPosition();
    };

    function gameOver() {
        menuClose(writeNewPoint);
        initState = 1;

        var forageSegment = document.getElementsByClassName('forage-segment');
        var lg = forageSegment.length;
        for (var index = 0; index < lg; index++) {
            forageSegment[0].remove();
        }

        var liveContain = document.getElementsByClassName('live-info')[0];
        for (var index = 0; index < liveCount; index++) {
            liveContain.innerHTML += ' <div class="live"></div>';
        }
    };

    function destruct() {
        initState = 1;
        clearInterval(window.i);
        clearInterval(window.x);
        decreseLive(menuOpen);
    };

    function segmentPosition() {
        var segment = document.getElementsByClassName('snake-segment');
        var distance = -step;
        for (var index = 0; index < segment.length; index++) {
            var element = segment[index];
            element.style.top = '100px';
            element.style.left = (distance += step) + lengthUnit;
        }
    };

    function menuClose(callback) {
        document.getElementsByClassName('menu')[0].classList.remove('menu-visible');

        if (callback) {
            callback('0');
        }
    };

    function menuOpen(text) {
        document.getElementsByClassName('menu')[0].classList.add('menu-visible');
        document.getElementById('info-text').innerHTML = text;
    };

    function speedSet() {
        clearInterval(window.i);
        clearInterval(window.x);
        menuClose();
        changeForagePosition();
        window.i = setInterval(function () {
            var segment = document.getElementsByClassName('snake-segment');

            for (var index = segment.length; index > 0; index--) {
                var element = segment[index - 1];
                move(element);
            }

            if (isForage) {
                foragePosition();
                grow();
                writeNewPoint();

                isForage = false;
            }
        }, speedSnake);
    };

    function move(elem) {
        var style = elem.style;
        var top = convertNumber(style.top);
        var left = convertNumber(style.left);

        if (elem.classList.toString().indexOf('head') > -1) {
            var rightBorder = window.innerWidth - (window.innerWidth % step);
            var bottomtBorder = window.innerHeight - (window.innerHeight % step) - 160;

            switch (direction) {
                case 'right':
                    if (left == rightBorder)
                        left = -step;

                    elem.style.left = (left + step) + lengthUnit;
                    prevDirection = 'right';
                    break;
                case 'left':
                    if (left == 0)
                        left = rightBorder;

                    elem.style.left = (left - step) + lengthUnit;
                    prevDirection = 'left';
                    break;
                case 'down':
                    if (top == bottomtBorder)
                        top = -step + 100;

                    elem.style.top = (top + step) + lengthUnit;
                    prevDirection = 'down';
                    break;
                case 'up':
                    if (top == 100)
                        top = bottomtBorder;

                    elem.style.top = (top - step) + lengthUnit;
                    prevDirection = 'up';
                    break;
            }

            intersection(elem);
            checkSelfEaating();
        } else {
            elem.style.top = storageTop + lengthUnit;
            elem.style.left = storageLeft + lengthUnit;
        }
        storageTop = top;
        storageLeft = left;
    };

    function checkSelfEaating() {
        var segment = document.getElementsByClassName('snake-segment');
        var segmentFirst = document.getElementsByClassName('snake-segment head')[0];

        for (var index = 0; index < (segment.length - 1); index++) {
            var element = segment[index];
            if (segmentFirst.style.top === element.style.top &&
                segmentFirst.style.left === element.style.left) {
                destruct();
                return false;
            }
        }
    };

    function getRandomInt(min, max) {
        var rand = Math.floor(Math.random() * (max - min + 1)) + min;
        var mod = rand % step;
        return rand - mod;
    };

    var foragePosition = (function fp() {
        var forageElem = document.getElementsByClassName('forage')[0];

        forageElem.style.top = getRandomInt(100, window.innerHeight - step - 160) + lengthUnit;
        forageElem.style.left = getRandomInt(0, window.innerWidth - step) + lengthUnit;

        return fp;
    })();

    function intersection(elem) {
        var headTop = convertNumber(elem.style.top);
        var headLeft = convertNumber(elem.style.left);

        var forage = document.getElementsByClassName('forage')[0];
        var forageTop = convertNumber(forage.style.top);
        var forageLeft = convertNumber(forage.style.left);

        if (headTop === forageTop && headLeft === forageLeft) {
            isForage = true;
        }
    };

    function grow() {
        var firstElem = document.getElementsByClassName('snake-segment')[0];
        var section = document.getElementsByClassName("snake-body")[0];
        var node = document.createElement("div");
        node.className += "snake-segment forage-segment";
        node.style.top = firstElem.style.top;
        node.style.left = firstElem.style.left;

        section.insertBefore(node, section.firstChild);
    };

    function convertNumber(style) {
        return Number(style.replace(/[^0-9,]/g, ''));
    };

    function writeNewPoint(finish) {
        var elemMenu = document.getElementById('point');
        var elemMini = document.getElementById('point-mini');
        elemMenu.innerHTML = finish || Number(elemMenu.innerHTML) + 10;
        elemMini.innerHTML = finish || Number(elemMini.innerHTML) + 10;
    };

    function decreseLive(callback) {
        var elem = document.getElementsByClassName('live')[0];
        if (elem) {
            elem.remove();
            callback(againText);
        } else {
            initState = 4;
            callback(gameOverText);
        }
    };
}


document.addEventListener("DOMContentLoaded", Snake);