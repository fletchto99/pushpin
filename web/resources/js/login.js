$(function () {

    var loginButton = document.getElementById('Login');
    var username = document.getElementById('Username');
    var password = document.getElementById('Password');

    loginButton.addEventListener('click', function() {
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
                window.close();
            },
            error: function () {
            }
        });
    });

});