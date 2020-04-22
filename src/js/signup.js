import * as fnc from './functions.js';

document.getElementById('btn-signup').addEventListener('click', function (e) {
    e.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var cPassword = document.getElementById('confirmPassword').value;

    if (email != "" & password != "" && cPassword != "") {
        if (password == cPassword) {
            var result = firebase.auth().createUserWithEmailAndPassword(email, password);

            result.catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);

                fnc.showPopup.info(`Błąd: ${errorMessage}`)
            })
        } else {
            fnc.showPopup.info('Hasło nie zgadza się z Potwierdzeniem Hasła')
        }
    } else {
        fnc.showPopup.info('Proszę wypełnić wszystkie pola.')
    }
});