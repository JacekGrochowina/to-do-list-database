import * as fnc from './functions.js';

document.getElementById('btn-signin').addEventListener('click', function (e) {
    e.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    console.log(email + ", " + password)

    if (email != "" && password != "") {
        var result = firebase.auth().signInWithEmailAndPassword(email, password);

        result.catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);

            fnc.showPopup.info(`Błąd: ${errorMessage}`)
        })
    } else {
        fnc.showPopup.info('Proszę wypełnić wszystkie pola.')
    }
});