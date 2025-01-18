let currentUser = null; // Store the current user object

// Elements
const userNameElement = document.getElementById('user-name');
const userImageElement = document.getElementById('user-image');
const fetchUserButton = document.getElementById('getUser');
const infoDisplay = document.getElementById('info-display');
const infoButtons = document.querySelectorAll('.info-button');

// Function to fetch and display a random user
async function fetchRandomUser() {
  try {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    const user = data.results[0];
    currentUser = user;

    // Extract the required details
    const fullName = `${user.name.first} ${user.name.last}`;
    const imageUrl = user.picture.large;

    // Update the DOM
    userNameElement.textContent = fullName;
    userImageElement.src = imageUrl;

    // Reset additional info display
    infoDisplay.textContent = '';
  } catch (error) {
    console.error('Error fetching user:', error);
    userNameElement.textContent = 'Error loading user.';
    userImageElement.src = '';
  }
}

// Event listener for fetching a new user
fetchUserButton.addEventListener('click', fetchRandomUser);

// Event listener for info buttons (Age, Email, Phone)
infoButtons.forEach(button => {
  button.addEventListener('click', () => {
    const attribute = button.getAttribute('data-attr');
    
    // Remove any previously displayed info
    infoDisplay.textContent = '';

    // Check which attribute was clicked and display the relevant info
    if (currentUser) {
      if (attribute === 'age') {
        infoDisplay.textContent = `Age: ${currentUser.dob.age}`;
      } else if (attribute === 'email') {
        infoDisplay.textContent = `Email: ${currentUser.email}`;
      } else if (attribute === 'phone') {
        infoDisplay.textContent = `Phone: ${currentUser.phone}`;
      }
    }
  });
});

// Fetch the first user on page load
fetchRandomUser();
