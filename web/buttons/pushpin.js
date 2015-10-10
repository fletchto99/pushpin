$.fn.removeClassesWithPrefix = function(prefix) {
    this.each(function(i, el) {
        var classes = el.className.split(" ").filter(function(c) {
            return c.lastIndexOf(prefix, 0) !== 0;
        });
        el.className = $.trim(classes.join(" "));
    });
    return this;
};

var PushPin = {};

PushPin.addPin = function(buttonID, pinData) {
    var button = document.getElementById(buttonID);
    if (!button.pins) {
        button.pins = [];
    }
    button.pins.push(pinData);
};

PushPin.initilize = function(site) {
    var clickEvent = function(button) {
        if (button.classList.contains('pushpin-sending') || button.classList.contains('pushpin-check')) {
            return;
        }
        $(button).removeClassesWithPrefix('pushpin-');
        button.classList.add('pushpin-button', 'pushpin-sending');
        button.innerText = 'Sending...';

        if (button.pins) {
            var push = function (secondAttempt) {
                $.ajax({
                    type: "POST",
                    url: "https://fletchto99.com/other/pebble/pushpin/web/pinapi/api.php",
                    data: JSON.stringify({
                        method: 'push_pin',
                        site: site,
                        data: JSON.stringify(button.pins),
                        timezone: new Date().getTimezoneOffset()
                    }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        if (data.status == 1 && !secondAttempt) {
                            var child = window.open('https://fletchto99.com/other/pebble/pushpin/web/login.html',
                                                    '',
                                                    'resizable=no,toolbar=0,status=0,width=626,height=436');
                            var timer = setInterval(checkChild, 500);

                            function checkChild() {
                                if (child.closed) {
                                    clearInterval(timer);
                                    push(true);
                                }
                            }
                        } else if (data.status == 1 && secondAttempt) {
                            button.classList.remove('pushpin-sending');
                            button.classList.add('pushpin-error');
                            button.innerText = 'Error. Retry?';
                        } else {
                            button.classList.remove('pushpin-sending');
                            button.classList.add('pushpin-check');
                            button.innerText = 'Sent to Pebble';
                        }


                    },
                    failure: function () {
                        button.classList.remove('pushpin-loading');
                        button.classList.add('pushpin-error');
                        button.innerText = 'Error. Retry?';
                    }
                });
            };
            push(false);
        } else {
            button.disabled = true;
            button.innerText = 'Error. No data :(';
            button.classList.remove('pushpin-sending');
            button.classList.add('pushpin-error');
        }

    };
    var buttons = document.getElementsByClassName('pushpin-button');
    [].forEach.call(buttons, function(button) {
        button.addEventListener('click', function() {
            clickEvent(button);
        });
    });
};