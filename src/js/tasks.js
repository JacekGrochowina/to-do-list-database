import * as fnc from './functions.js';


document.getElementById('btn-add-task').addEventListener('click', () => {

    var inputValue = document.getElementById('task').value;
    var userID = firebase.auth().currentUser.uid;

    // Add new task to firebase
    if (inputValue != "") {

        var data = {
            "content": inputValue
        };

        firebase.database().ref().child('Users').child(userID).child('to-do').push(data);

    } else {
        fnc.showPopup.info('Najpierw podaj treść zadania.');
    }
})

function getInputValue() {
    return document.getElementById('task').value;
}

function generateToDoTask(key, taskValue) {

    if (taskValue != "") {
        document.getElementById('task').value = "";

        const task = document.createElement('div');
        task.classList.add('task');
        task.classList.add('task--todo');
        task.setAttribute('key', key);

        const content = document.createElement('div');
        content.classList.add('task__span');
        content.textContent = taskValue.content;

        const icons = document.createElement('div');
        icons.classList.add('task__icons');

        const iconTrash = document.createElement('div');
        iconTrash.classList.add('task__icon');
        iconTrash.innerHTML = '<i class="fas fa-trash-alt"></i>';

        const iconCheck = document.createElement('div');
        iconCheck.classList.add('task__icon');
        iconCheck.innerHTML = '<i class="fas fa-check"></i>';

        //  Assemble Task
        icons.appendChild(iconTrash);
        icons.appendChild(iconCheck);

        task.appendChild(content);
        task.appendChild(icons);


        // Add Events
        iconTrash.addEventListener('click', () => {
            var userID = firebase.auth().currentUser.uid;
            firebase.database().ref('/Users/' + userID).child('to-do').child(key).remove();
            firebaseReadData();
        })

        iconCheck.addEventListener('click', () => {
            var userID = firebase.auth().currentUser.uid;
            firebase.database().ref('/Users/' + userID).child('to-do').child(key).remove();
            firebase.database().ref('/Users/' + userID).child('done').push(taskValue);
            firebaseReadData();
        })


        const sectionParent = document.querySelector('[data-tasks="tasks-to-do"]');

        sectionParent.appendChild(task);
    }
}

function generateDoneTask(key, taskValue) {

    const task = document.createElement('div');
    task.classList.add('task');
    task.classList.add('task--done');
    task.setAttribute('key', key);

    const content = document.createElement('div');
    content.classList.add('task__span');
    content.textContent = taskValue.content;

    const icons = document.createElement('div');
    icons.classList.add('task__icons');

    const iconTrash = document.createElement('div');
    iconTrash.classList.add('task__icon');
    iconTrash.innerHTML = '<i class="fas fa-trash-alt"></i>';


    //  Assemble Task
    icons.appendChild(iconTrash);
    task.appendChild(content);
    task.appendChild(icons);


    // Add Events
    iconTrash.addEventListener('click', () => {
        var userID = firebase.auth().currentUser.uid;
        firebase.database().ref('/Users/' + userID).child('done').child(key).remove();
        firebaseReadData();
    })

    const sectionParent = document.querySelector('[data-tasks="tasks-done"]');

    sectionParent.appendChild(task);
}

// Read Firebase Data on Load
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        firebaseReadData()
    }
});
document.getElementById('btn-add-task').addEventListener('click', firebaseReadData);

// Read Firebase Data
function firebaseReadData() {
    var userID = firebase.auth().currentUser.uid;

    // Display To Do Tasks
    document.querySelector('[data-tasks="tasks-to-do"]').innerHTML = null;
    firebase.database().ref('/Users/' + userID).child('to-do')
        .once('value')
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                generateToDoTask(childKey, childData);
            });
        });

    // Display Done Tasks
    document.querySelector('[data-tasks="tasks-done"]').innerHTML = null;
    firebase.database().ref('/Users/' + userID).child('done')
        .once('value')
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                generateDoneTask(childKey, childData);
            });
        });
}