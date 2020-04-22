import * as fnc from './functions.js';


document.getElementById('btn-resetPassword').addEventListener('click', function (e) {
    e.preventDefault();
    var auth = firebase.auth();
    var email = document.getElementById('email').value;

    if (email != "") {
        auth.sendPasswordResetEmail(email).then(function () {
            fnc.showPopup.info('Email został wysłany na podany adres. Sprawdź proszę swoją skrzynkę i kliknij w link, żeby zresetować hasło.')
        })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);

                fnc.showPopup.info(`Błąd: ${errorMessage}`)
            })
    } else {
        fnc.showPopup.info('Proszę wpisz najpierw swój email.');
    }
});