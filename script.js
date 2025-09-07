const screens = ['screen-welcome','screen-method','screen-email','screen-personalize','screen-complete'];
const progressBar = document.getElementById('progress');
const backBtn = document.getElementById('backBtn');
let currentIndex = 0; // track current screen

// Ensure currentIndex is always in sync with the visible screen
function getCurrentScreenId() {
    return screens[currentIndex];
}

backBtn.addEventListener('click', () => goBack());

// Show a screen by its id
function showScreen(id) {
    // hide all screens
    screens.forEach(s => {
        const sc = document.getElementById(s);
        sc.classList.remove('active');
        sc.style.display = 'none';
    });

    const screen = document.getElementById(id);
    screen.style.display = 'block';
    setTimeout(() => screen.classList.add('active'), 50);


    // Update current index
    currentIndex = screens.indexOf(id);

    // Hide back button on the first and last screen
    if(currentIndex === 0 || currentIndex === screens.length - 1) {
        backBtn.style.display = 'none';
    } else {
        backBtn.style.display = 'block';
    }

    updateProgress();
}

// Progress bar
function updateProgress() {
    progressBar.style.width = `${(currentIndex)/(screens.length-1)*100}%`;
}

// Go back to previous screen
function goBack() {
    if(currentIndex > 0) {
        showScreen(screens[currentIndex - 1]);
    }
}

// Form validation
function validateForm() {
    let valid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    if(!name.value.trim()) { document.getElementById('name-error').style.display='block'; valid=false; }
    else { document.getElementById('name-error').style.display='none'; }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email.value)) { document.getElementById('email-error').style.display='block'; valid=false; }
    else { document.getElementById('email-error').style.display='none'; }

    if(password.value.length < 8) { document.getElementById('password-error').style.display='block'; valid=false; }
    else { document.getElementById('password-error').style.display='none'; }

    if(valid) showScreen('screen-personalize');
}

// Toggle option selection
function toggleSelection(card) {
    card.classList.toggle('selected');
}

// Reset the entire flow
function resetFlow() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
    currentIndex = 0;
    showScreen('screen-welcome');
}

// Initialize
// On page load, show the first screen and set currentIndex

// Password show/hide toggle
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const togglePasswordIcon = document.getElementById('togglePasswordIcon');
    if (togglePassword && passwordInput && togglePasswordIcon) {
        function updateEyeGlow() {
            if (passwordInput.type === 'text') {
                togglePasswordIcon.classList.add('eye-glow');
            } else {
                togglePasswordIcon.classList.remove('eye-glow');
            }
        }
        togglePassword.addEventListener('click', function() {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                togglePasswordIcon.classList.remove('fa-eye');
                togglePasswordIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                togglePasswordIcon.classList.remove('fa-eye-slash');
                togglePasswordIcon.classList.add('fa-eye');
            }
            updateEyeGlow();
        });
        updateEyeGlow();
    }
});

currentIndex = 0;
showScreen('screen-welcome');
