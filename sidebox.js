function createBox() {
	var container = document.getElementById('container');
	var boxContents = '<div id="side-panel"> <div id="add-site-text">ADD SITE</div> <form id="location-form"> <label for="title">Title:</label> <input type="text" id="title" name="title" required> <br> <label for="location">Location (Lat, Lng):</label> <input type="text" id="location" name="location" placeholder="e.g., 39.9666, -75.5908" required> <br> <label for="image">Image URL:</label> <input type="text" id="image" name="image"> <br> <label for="about">About:</label> <textarea id="about" name="about" required></textarea> <button type="button" onclick="addLocation()">Add Location</button> </form> </div>'

	var box = document.createElement('div');
	box.id = 'box';
	box.innerHTML = boxContents;

	container.appendChild(box);
}

// Code for the box moving to the side
function moveBox() {
	var box = document.getElementById('box');
	var moveBoxButton = document.getElementById('moveBoxButton');
	if (box.style.left === '-40%' || box.style.left === '') {
		box.style.left = '0px';
		moveBoxButton.textContent = 'Move Back';
	} else {
		box.style.left = '-40%';
		moveBoxButton.textContent = 'Move Box';
}
}
window.onload = createBox;