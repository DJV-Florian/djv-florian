document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('sidebarCollapse').addEventListener('click', function () {
        document.getElementById('sidebar').classList.toggle('active');
        this.classList.toggle('active');
    });
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