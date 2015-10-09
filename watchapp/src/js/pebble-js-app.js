var token = null;

Pebble.addEventListener('ready', function() {
    Pebble.getTimelineToken(function(watchtoken) {
        token = watchtoken;
    }, function() {
    });
});

Pebble.addEventListener('showConfiguration', function() {
    if (token) {
        Pebble.openURL('https://fletchto99.com/other/pebble/pushpin/web/settings.html?watchtoken='+token);
    } else {
        Pebble.openURL('https://fletchto99.com/other/pebble/pushpin/web/settings.html');
    }
});