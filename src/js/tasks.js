import * as fnc from './functions.js';


document.getElementById('btn-add-task').addEventListener('click', () => {

    var inputValue = document.getElementById('task').value;
    var userID = firebase.auth().currentUser.uid;

    // Add new task to firebase
    if (inputValue != "") {

        var data = {
            "done": false,
            "content": inputValue
        };

        firebase.database().ref().child('Users').child(userID).push(data);

    } else {
        fnc.showPopup.info('Najpierw podaj treść zadania.');
    }
})

function getInputValue() {
    return document.getElementById('task').value;
}

// var inputValue = document.getElementById('task').value;

// document.getElementById('btn-add-task').addEventListener('click', function () {
//     generateToDoTask(getInputValue());
// });

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
            firebase.database().ref('/Users/' + userID).child(key).remove();
            firebaseReadData();
        })

        iconCheck.addEventListener('click', () => {
            var userID = firebase.auth().currentUser.uid;
            taskValue.done = true;
            console.log(firebase.database().ref('/Users/' + userID).child(key).set(taskValue));
        })


        const sectionParent = document.querySelector('[data-tasks="tasks-to-do"]');

        sectionParent.appendChild(task);
    }
}





setTimeout(function () {
    document.addEventListener('load', firebaseReadData());
}, 400)

document.getElementById('btn-add-task').addEventListener('click', firebaseReadData);


function firebaseReadData() {
    var userID = firebase.auth().currentUser.uid;
    document.querySelector('[data-tasks="tasks-to-do"]').innerHTML = null;

    firebase.database().ref('/Users/' + userID)
        .once('value')
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                generateToDoTask(childKey, childData);
            });
        });
}