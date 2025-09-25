alert('good to go!');


// Get references to HTML elements we'll need
const coordinatesDisplay = document.getElementById('coordinates');
const flowersContainer = document.getElementById('flowers-container');
const butterfliesContainer = document.getElementById('butterflies-container');
const rightGarden = document.getElementById('rightGarden');

// Array of flower emojis to randomly choose from
const flowerTypes = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '🌿', '🍀'];

// Array of sparkle emojis for effects
const sparkles = ['✨', '⭐', '🌟', '💫'];

// Counter to keep track of flowers created
let flowerCount = 0;

// Display mouse position as it moves
// This event listener tracks the mouse movement across the entire page
document.addEventListener('mousemove', function(event) {
    // Get the X and Y coordinates of the mouse
    const x = event.clientX;  // Horizontal position
    const y = event.clientY;  // Vertical position
    
    // Update the coordinates display with current position
    coordinatesDisplay.textContent = `${x}, ${y}`;
    
    // Log event object to console
    // This helps us see all the information the event contains
    console.log('Mouse move event:', event);
    
    // Add some sparkles that follow the mouse 
    createSparkle(x, y);
});

// Click to trigger flower animation
// This event listener responds to clicks anywhere on the page
document.addEventListener('click', function(event) {
    // Get click coordinates
    const x = event.clientX;
    const y = event.clientY;
    
    // Create a flower at the click location
    createFlower(x, y);
    
    // Log event object to console
    console.log('Click event:', event);
    console.log(`Flower #${flowerCount} created at position: ${x}, ${y}`);
});

// butterfly animation
// Mouse enter event: when mouse enters the butterfly garden area
rightGarden.addEventListener('mouseenter', function(event) {
    console.log('Mouse entered butterfly grove:', event);
    activateButterflies();
});

// Mouse leave event: when mouse leaves the butterfly garden area
rightGarden.addEventListener('mouseleave', function(event) {
    console.log('Mouse left butterfly grove:', event);
    deactivateButterflies();
});

// Create a flower at specified coordinates
function createFlower(x, y) {
    // Increment our flower counter
    flowerCount++;
    
    // Create a new div element for the flower
    const flower = document.createElement('div');
    
    // Add the flower class for styling
    flower.className = 'flower';
    
    // Choose a random flower emoji from our array
    const randomFlower = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
    flower.textContent = randomFlower;
    
    // Position the flower at the click coordinates
    // We subtract half the flower size to center it on the click
    flower.style.left = (x - 15) + 'px';
    flower.style.top = (y - 15) + 'px';
    
    // Add the flower to our flowers container
    flowersContainer.appendChild(flower);
    
    // Remove the flower after 5 seconds to keep the page clean
    setTimeout(function() {
        if (flower.parentNode) {
            flower.parentNode.removeChild(flower);
        }
    }, 5000);
}

// Create sparkle effects that follow the mouse
function createSparkle(x, y) {
    // Only create sparkles occasionally to avoid too many
    if (Math.random() > 0.9) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Choose random sparkle emoji
        const randomSparkle = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.textContent = randomSparkle;
        
        // Position sparkle near mouse with slight random offset
        sparkle.style.left = (x + Math.random() * 20 - 10) + 'px';
        sparkle.style.top = (y + Math.random() * 20 - 10) + 'px';
        
        // Add to page
        document.body.appendChild(sparkle);
        
        // Remove after animation completes
        setTimeout(function() {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
}

// 🦋 FUNCTION: Activate butterflies with random positions
function activateButterflies() {
    const butterflies = document.querySelectorAll('.butterfly');
    
    butterflies.forEach(function(butterfly) {
        // Add active class to make butterflies visible
        butterfly.classList.add('active');
        
        // Position butterflies randomly in the right half of screen
        const randomX = Math.random() * (window.innerWidth / 2) + (window.innerWidth / 2);
        const randomY = Math.random() * (window.innerHeight / 2) + 100;
        
        butterfly.style.left = randomX + 'px';
        butterfly.style.top = randomY + 'px';
        
        // Move butterflies around every 2 seconds
        butterfly.moveInterval = setInterval(function() {
            const newX = Math.random() * (window.innerWidth / 2) + (window.innerWidth / 2);
            const newY = Math.random() * (window.innerHeight / 2) + 100;
            
            butterfly.style.left = newX + 'px';
            butterfly.style.top = newY + 'px';
        }, 2000);
    });
}

// Deactivate butterflies
function deactivateButterflies() {
    const butterflies = document.querySelectorAll('.butterfly');
    
    butterflies.forEach(function(butterfly) {
        // Remove active class to hide butterflies
        butterfly.classList.remove('active');
        
        // Clear the movement interval
        if (butterfly.moveInterval) {
            clearInterval(butterfly.moveInterval);
        }
    });
}

//Welcome message when page loads
window.addEventListener('load', function() {
    console.log('🌟 Welcome to the Magical Garden Adventure! 🌟');
    console.log('Move your mouse around and click to create flowers!');
    console.log('Hover over the Butterfly Grove to see butterflies dance!');
});

// Handle window resize for responsive design
window.addEventListener('resize', function() {
    console.log('Window resized. New dimensions:', window.innerWidth, 'x', window.innerHeight);
});