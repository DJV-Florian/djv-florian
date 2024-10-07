document.addEventListener('DOMContentLoaded', function () {
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    const sidebar = document.getElementById('sidebar');

    sidebarCollapse.addEventListener('click', function () {
        sidebar.classList.toggle('active');
        this.classList.toggle('active');
    });

    function fadeOut(element) {
        element.style.transition = 'opacity 1s ease';
        element.style.opacity = '0';
    }

    function fadeIn(element) {
        element.style.transition = 'opacity 1s ease';
        element.style.opacity = '1';
    }

    setTimeout(function () {
        fadeOut(sidebarCollapse);
    }, 3000);

    ['mousemove', 'scroll', 'touchstart', 'touchmove'].forEach(function (event) {
        document.addEventListener(event, function () {
            fadeIn(sidebarCollapse);
        });
    });

    let fadeTimer;
    document.addEventListener('mousemove', resetFadeTimer);
    document.addEventListener('scroll', resetFadeTimer);
    document.addEventListener('touchstart', resetFadeTimer);
    document.addEventListener('touchmove', resetFadeTimer);

    function resetFadeTimer() {
        clearTimeout(fadeTimer);
        fadeTimer = setTimeout(function () {
            fadeOut(sidebarCollapse);
        }, 1000);
    }
    document.addEventListener('touchend', function (e) {
        if (!sidebar.classList.contains('active')) {
            if (!sidebar.contains(e.target) && !sidebarCollapse.contains(e.target)) {
                sidebar.classList.add('active');
                sidebarCollapse.classList.add('active');
            }
        }
    });
});



document.addEventListener('DOMContentLoaded', function () {
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
            localStorage.setItem('theme', newTheme);
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-bs-theme', savedTheme);

    document.getElementById('theme-toggle-btn').addEventListener('click', toggleTheme);
});

        // Function to set the sidebar height dynamically
        function updateSidebarHeight() {
            const sidebar = document.getElementById('sidebar');
            sidebar.style.height = `${window.innerHeight}px`;
        }

        // Set initial height
        updateSidebarHeight();

        // Update height on window resize
        window.addEventListener('resize', updateSidebarHeight);

// function adjustViewportForSmartphone() {
//     function isSmartphone() {
//         return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//     }

//     function setViewport(content) {
//         let viewport = document.querySelector("meta[name='viewport']");
//         if (!viewport) {
//             viewport = document.createElement('meta');
//             viewport.name = 'viewport';
//             document.head.appendChild(viewport);
//         }
//         viewport.setAttribute("content", content);
//     }

//     function adjustViewportOnResize() {
//         if (isSmartphone()) {
//             // Adjust the viewport only if needed to accommodate dynamic changes
//             setViewport("width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes");
//         }
//     }

//     if (isSmartphone()) {
//         setViewport("width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
//         window.addEventListener('resize', adjustViewportOnResize);
//     }
// }

// document.addEventListener("DOMContentLoaded", adjustViewportForSmartphone);
