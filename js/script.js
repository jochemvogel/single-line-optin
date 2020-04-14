const formBox = document.getElementById('form-box');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const iconUser = document.getElementById('icon-user');
const inputGroup = document.getElementById('input-group');
const inputField = document.getElementById('input-group__field');
const inputLabel = document.getElementById('input-group__label');
const inputProgress = document.getElementById('input-group__progress');
const progress = document.getElementById('progress-bar');

// Fields array
const fields = [
    { field: 'Enter your first name' },
    { field: 'Enter your email', pattern: /\S+@\S+\.\S+/ }
];

const shakeTime = 100; // Shake transition time
const switchTime = 200; // Time between displaying fields
let position = 0; // Init position at first field

// Get field from array & add markup
function getField() {
    inputLabel.innerHTML = fields[position].field;
    inputField.value = fields[position].answer || '';
    inputField.focus();

    progress.style.width = (position * 100) / fields.length + '%';

    // Disable prevBtn on first 'slide' and iconUser on the rest
    prevBtn.style.display = position ? '' : 'none';
    iconUser.style.display = position ? 'none' : '';

    showField()
}

// Display field to user
function showField() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transform = '';
    inputProgress.style.width = '100%';
}

// Hide field from user 
function hideField() {
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 'none'
    inputGroup.style.border = 'none';
}

// Transform to create shake motion
function transform(x, y) {
    formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Validate field
function validate() {
    // Match pattern if there is
    if(!inputField.value.match(fields[position].pattern || /.+/)) {
        inputFail();
    } else {
        inputPass();
    }
}

// Field input fail
function inputFail() {
    formBox.classList.add('error');
    for(let i = 0; i < 6; i++) {
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
        setTimeout(transform, shakeTime * 6, 0, 0);
        inputField.focus();
    }
}

// Field input pass
function inputPass() {
    formBox.classList.remove('error');
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);

    fields[position].answer = inputField.value;

    // Make email field personal
    fields[1].field = `Hi ${fields[0].answer}, please enter your email`;

    // Increment position
    position++;

    if(fields[position]) {
        hideField();
        getField();
    } else {
        hideField();
        formBox.classList.add('close');
        progress.style.width = '100%';

        formComplete();
    }
}

// All fields complete
function formComplete() {
    let name = fields[0].answer;
    let email = fields[1].answer;
    console.log(`Name: ${name}\nEmail: ${email}`);

    const h2 = document.createElement('h2');
    h2.classList.add('end');
    h2.appendChild(document.createTextNode(`Congratulations ${name}, your gift is on his way to ${email}`));
    setTimeout(() => {
        formBox.parentElement.appendChild(h2);
        setTimeout(() => h2.style.opacity = 1, 50);
    }, 1000);
}

// EVENT LISTENERS

// Get field on dom load
document.addEventListener('DOMContentLoaded', getField);

// Next btn click
nextBtn.addEventListener('click', validate);

// Input field enter click
inputField.addEventListener('keyup', e => {
    if(e.keyCode == 13) {
        validate();
    }
});

// Add previous button
prevBtn.addEventListener("click", () => {
    position = position - 1;
    getField();
  });