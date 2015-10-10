$(function () {

    var loginButton = document.getElementById('Login');
    var username = document.getElementById('Username');
    var password = document.getElementById('Password');

    var errorContainer = document.getElementById('ErrorContainer');
    var errorMessage = document.getElementById('ErrorMessage');

    loginButton.addEventListener('click', function() {
        if (!errorContainer.classList.contains('item-hidden')) {
            errorContainer.classList.add('item-hidden');
        }
        $.ajax({
            type: "POST",
            url: "pinapi/api.php",
            dataType: "json",
            data: {
                method: 'login',
                username: username.value,
                password: password.value
            },
            success: function (data) {
                if (data.error) {
                    errorMessage.innerText = data.error;
                    errorContainer.classList.remove('item-hidden');
                } else if (data.Login === false) {
                    errorMessage.innerText = 'Invalid username or password!';
                    errorContainer.classList.remove('item-hidden');
                } else if (data.Login) {
                    window.close();
                }
            },
            error: function () {
            }
        });
    });

});