// Get query variables
function getQueryParam(variable, defaultValue) {
    var query = location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');

        if (pair[0] === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return defaultValue || false;
}

$(function () {

    var ERRORS = {
        'CONNECTION': 'There was an error communicating with the server. Please try again later.',
        'MISSING_WATCHTOKEN': 'Missing watchtoken!',
        'USERNAME_IN_USE': 'That username is already taken, sorry!',
        'INVALID_INPUT': 'Please enter a valid username and password!',
        'UNKNOWN': 'An unknown error has occurred!'
    };

    //Containers
    var loadingContainer = document.getElementById('LoadingContainer');
    var accountCreatedContainer = document.getElementById('AccountCreatedContainer');
    var accountCreationContainer = document.getElementById('AccountCreationContainer');
    var errorContainer = document.getElementById('ErrorContainer');


    //Componenets
    var username = document.getElementById('Username');
    var password = document.getElementById('Password');
    var createAccountButton = document.getElementById('CreateAccount');
    var errorMessage = document.getElementById('ErrorMessage');

    //Query parameters
    var token = getQueryParam('watchtoken', null);

    //Helper functions

    var displayError = function(error) {
        errorMessage.innerText = error;
        errorContainer.classList.toggle('item-hidden');
    };

    //Man
    if (token) {
        $.ajax({
            type: "POST",
            url: "pinapi/api.php",
            dataType: "json",
            data: {
                method: 'check_account',
                watchtoken: token
            },
            success: function (data) {
                console.log(data);
                if (data.AccountExists) {
                    loadingContainer.classList.toggle('item-hidden');
                    accountCreatedContainer.classList.toggle('item-hidden');
                } else {
                    loadingContainer.classList.toggle('item-hidden');
                    accountCreationContainer.classList.toggle('item-hidden');
                }
            },
            error: function (data) {
                loadingContainer.classList.toggle('item-hidden');
                displayError(ERRORS.CONNECTION);
            }
        });
    } else {
        loadingContainer.classList.toggle('item-hidden');
        displayError(ERRORS.MISSING_WATCHTOKEN);
    }

    createAccountButton.addEventListener('click', function() {
        if (!errorContainer.classList.contains('item-hidden')) {
            errorContainer.classList.add('item-hidden');
        }
        $.ajax({
            type: "POST",
            url: "pinapi/api.php",
            dataType: "json",
            data: {
                method: 'create_account',
                watchtoken: token,
                username: username.value,
                password: password.value
            },
            success: function (data) {
                console.log(username.value);
                if (data.Error) {
                    if (data.Error === 'account_exists') {
                        displayError(ERRORS.USERNAME_IN_USE);
                    } else if (data.Error = 'invalid_input') {
                        displayError(ERRORS.INVALID_INPUT)
                    } else {
                        displayError(ERRORS.UNKNOWN)
                    }
                } else {
                    window.location.href = 'pebblejs://close#success'
                }
            },
            error: function () {
                displayError(ERRORS.CONNECTION);
            }
        });
    });

});