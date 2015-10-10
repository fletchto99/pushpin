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
        if (button.classList.contains('pushpin-loading') || button.classList.contains('pushpin-success')) {
            return;
        }
        $(button).removeClassesWithPrefix('pushpin-');
        button.classList.add('pushpin-button', 'pushpin-loading');

        if (button.pins) {
            var push = function (secondAttempt) {
                $.ajax({
                    type: "POST",
                    url: "https://fletchto99.com/other/pebble/pushpin/web/pinapi/api.php",
                    data: JSON.stringify({
                        method: 'push_pin',
                        site: site,
                        data: button.pins
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
                                    console.log('hi');
                                    clearInterval(timer);
                                    push(true);
                                }
                            }
                        } else if (data.status == 1 && secondAttempt) {
                            console.log('here');
                            button.classList.remove('pushpin-loading');
                            button.classList.add('pushpin-error');
                        } else {
                            button.classList.remove('pushpin-loading');
                            button.classList.add('pushpin-success');
                        }


                    },
                    failure: function () {
                        button.classList.remove('pushpin-loading');
                        button.classList.add('pushpin-error');
                    }
                });
            };
            push(false);
        } else {
            button.classList.remove('pushpin-loading');
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