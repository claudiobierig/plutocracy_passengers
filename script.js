function handleClick(asd) {
    alert('Clicked on the specified area!' + asd);
    // You can replace the alert with your custom logic
}

function getImagePosition() {
    // Get the image element by ID
    var image = document.getElementById('mainboard');

    // Get the bounding rectangle of the image
    var rect = image.getBoundingClientRect();

    var square = document.getElementById('clickable_square');
    console.log('square position - Top: ' + square.style.top + ', Left: ' + square.style.left);
    square.style.top = rect.top + 'px'
    square.style.left = rect.left + 'px'
    console.log('square position - Top: ' + square.style.top + ', Left: ' + square.style.left);

    var hex = document.getElementById('clickable_hexagon');
    hex.style.top = rect.top + 30 + 'px'
    hex.style.left = rect.left + 20 + 'px'

    // Log the absolute position
    console.log('Image position - Top: ' + rect.top + ', Left: ' + rect.left);
}

// Call the function when the page is loaded
window.onload = function () {
    getImagePosition();
};
