
// ---------- ShowPopup Functions ---------- //

export const showPopup = {
    info: function (message) {
        const overlay = document.createElement('div');
        overlay.setAttribute('data-type', 'overlay');
        overlay.classList.add('overlay');

        const closeBtn = document.createElement('div');
        closeBtn.setAttribute('data-type', 'close');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.classList.add('close');

        const popup = document.createElement('div');
        popup.setAttribute('data-type', 'popup');
        popup.textContent = message;
        popup.classList.add('popup');
        popup.appendChild(closeBtn);

        overlay.addEventListener('click', function () {
            popup.remove();
            overlay.remove();
        })

        closeBtn.addEventListener('click', function () {
            popup.remove();
            overlay.remove();
        })

        const parent = document.querySelector('.app');

        parent.appendChild(overlay);
        parent.appendChild(popup);
    },

    dialog: function (message, ok, cancel, actionOK, actionCANCEL) {

        const overlay = document.createElement('div');
        overlay.setAttribute('data-type', 'overlay');
        overlay.classList.add('popup__overlay');

        const closeBtn = document.createElement('div');
        closeBtn.setAttribute('data-type', 'close');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.classList.add('popup__close');

        const buttons = document.createElement('div');
        buttons.setAttribute('data-type', 'buttons');
        buttons.classList.add('popup__buttons');

        const buttonOK = document.createElement('div');
        buttonOK.setAttribute('data-type', 'true');
        buttonOK.classList.add('popup__button');
        buttonOK.textContent = ok;

        const buttonCANCEL = document.createElement('div');
        buttonCANCEL.setAttribute('data-type', 'false');
        buttonCANCEL.classList.add('popup__button');
        buttonCANCEL.textContent = cancel;

        buttons.appendChild(buttonOK);
        buttons.appendChild(buttonCANCEL);

        const popup = document.createElement('div');
        popup.setAttribute('data-type', 'popup');
        popup.innerHTML = `<p class="popup__title">${message}</p>`;
        popup.classList.add('popup');
        popup.appendChild(closeBtn);
        popup.appendChild(buttons);


        const close = () => {
            popup.remove();
            overlay.remove();
        }

        overlay.addEventListener('click', function () {
            close();
        })

        closeBtn.addEventListener('click', function () {
            close();
        })

        buttonOK.addEventListener('click', function () {
            close();
            actionOK();
        })
        buttonCANCEL.addEventListener('click', function () {
            close();
            actionCANCEL();
        })


        const parent = document.querySelector('.app');
        parent.appendChild(overlay);
        parent.appendChild(popup);
    }
}

// ----------------------------------------- //