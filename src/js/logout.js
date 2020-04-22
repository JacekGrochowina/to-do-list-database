document.getElementById('btn-logout').addEventListener('click', function () {
    console.log('click')
    firebase.auth().signOut();
});