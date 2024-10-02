document.addEventListener('DOMContentLoaded', function () {
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    const sidebar = document.getElementById('sidebar');

    // Toggle sidebar and button active class on click
    sidebarCollapse.addEventListener('click', function () {
        sidebar.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Function to fade out the element
    function fadeOut(element) {
        element.style.transition = 'opacity 1s ease'; // 1-second fade-out
        element.style.opacity = '0'; // Fade out
    }

    // Function to fade in the element
    function fadeIn(element) {
        element.style.transition = 'opacity 1s ease'; // 1-second fade-in
        element.style.opacity = '1'; // Fade in
    }

    // Automatically fade out the button after 3 seconds of page load
    setTimeout(function () {
        fadeOut(sidebarCollapse);
    }, 3000); // 3 seconds delay

    // Fade in when user moves the mouse, scrolls the page, or touches the screen
    ['mousemove', 'scroll', 'touchstart', 'touchmove'].forEach(function (event) {
        document.addEventListener(event, function () {
            fadeIn(sidebarCollapse);
        });
    });

    // Optionally, you can reset the fade-out timer after activity
    let fadeTimer;
    document.addEventListener('mousemove', resetFadeTimer);
    document.addEventListener('scroll', resetFadeTimer);
    document.addEventListener('touchstart', resetFadeTimer); // Reset timer on touch
    document.addEventListener('touchmove', resetFadeTimer); // Reset timer on touch move

    function resetFadeTimer() {
        clearTimeout(fadeTimer); // Clear the previous timer
        fadeTimer = setTimeout(function () {
            fadeOut(sidebarCollapse);
        }, 1000); // Reset the timer to fade out after 3 seconds of inactivity
    }
});


document.addEventListener('DOMContentLoaded', function () {
    // Function to toggle the theme
    function toggleTheme() {
        const currentTheme = document.body.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-bs-theme', newTheme);

        const themeIcon = document.getElementById('theme-toggle-btn').querySelector('i');
        if (newTheme === 'dark') {
            themeIcon.classList.remove('bi-lightbulb');
            themeIcon.classList.add('bi-lightbulb-fill');
        } else {
            themeIcon.classList.remove('bi-lightbulb-fill');
            themeIcon.classList.add('bi-lightbulb');
        }
        
        // Save the theme to localStorage for persistence
        localStorage.setItem('theme', newTheme);
    }

    // Load the saved theme from localStorage on page load
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-bs-theme', savedTheme);

    // Add event listener to the theme toggle button
    document.getElementById('theme-toggle-btn').addEventListener('click', toggleTheme);
});