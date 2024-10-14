// Change Navbar background on scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
// Floating symbols movement in hero section
const symbols = document.querySelectorAll('.symbol');

symbols.forEach((symbol, index) => {
    const animationDelay = Math.random() * 5;
    symbol.style.animationDelay = `${animationDelay}s`;

    symbol.addEventListener('mouseover', () => {
        symbol.style.color = "rgba(255, 255, 255, 0.6)";
    });

    symbol.addEventListener('mouseleave', () => {
        symbol.style.color = "rgba(255, 255, 255, 0.15)";
    });
});
// Login and Sign-up Modals


document.querySelector('.btn-warning').addEventListener('click', () => {
    alert('Sign-up form will be displayed here.');
});
// Animate floating symbols in background
const moveSymbols = () => {
    symbols.forEach(symbol => {
        const xMove = Math.random() * window.innerWidth;
        const yMove = Math.random() * window.innerHeight;
        symbol.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
};

setInterval(moveSymbols, 4000);
// Function to handle login form submission
async function loginUser(event) {
    event.preventDefault();

    const loginData = {
        username: document.querySelector('#username').value,
        password: document.querySelector('#password').value,
    };

    try {
        const response = await fetch('https://your-backend-url/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Login successful!');
            // Handle success - perhaps redirect or update the UI
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

document.querySelector('#login-form').addEventListener('submit', loginUser);
// Function to fetch user profile data
async function fetchUserProfile(userId) {
    try {
        const response = await fetch(`https://your-backend-url/api/users/${userId}`);
        const userData = await response.json();

        if (response.ok) {
            document.querySelector('#user-profile').textContent = `Welcome, ${userData.name}`;
            // Display user data in the UI
        } else {
            alert(`Error fetching user data: ${userData.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function on page load or event
fetchUserProfile(123);  // Replace 123 with the actual user ID
// Function to update user data
async function updateUserProfile(userId, updatedData) {
    try {
        const response = await fetch(`https://your-backend-url/api/users/${userId}`, {
            method: 'PUT',  // Or 'PATCH' for partial updates
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Profile updated successfully');
            // Optionally refresh UI with new data
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Example call to update profile data
const updatedUserData = {
    name: 'New Name',
    email: 'newemail@example.com',
};
updateUserProfile(123, updatedUserData);  // Replace 123 with actual user ID
// Function to delete user account
async function deleteUserAccount(userId) {
    try {
        const response = await fetch(`https://your-backend-url/api/users/${userId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Account deleted successfully');
            // Optionally redirect or update UI
        } else {
            const result = await response.json();
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Example call to delete account
deleteUserAccount(123);  // Replace 123 with actual user ID
// Function to fetch and display products/courses
async function fetchCourses() {
    try {
        const response = await fetch('https://your-backend-url/api/courses');
        const courses = await response.json();

        const coursesContainer = document.querySelector('#courses-container');
        coursesContainer.innerHTML = '';  // Clear previous content

        courses.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.classList.add('course');
            courseElement.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <button onclick="enrollCourse(${course.id})">Enroll</button>
            `;
            coursesContainer.appendChild(courseElement);
        });
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
}

// Call the function on page load
fetchCourses();
