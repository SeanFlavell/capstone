var locations = [];
var markers = [];
var datas = [];

// Used to place the markers currently in the JSON bin though only works for Sean Flavell's so far since the JSON bin isn't the final one.
async function placeJSONMarkers() {

	jsonDataString = await getJSONData();
		  datas = JSON.parse(jsonDataString);

		  datas.forEach(function(data) {
			var latLng = {
				lat: parseFloat(data.location.split(',')[0]),
				lng: parseFloat(data.location.split(',')[1])
			};

			var marker = new google.maps.marker.AdvancedMarkerElement({
				position: latLng,
				map: map,
				title: data.title
			});

			let content = '<div class="info-window-content">' +
  '<div><strong><h1>' + data.title + '</h1></strong></div><br>' +
						  '<img class="info-window-image" src="' + data.image + '" alt="' + data.title + '">' +
						  
						  '<div>' + data.about + '</div>' +
						  '</div>';

			var infowindow = new google.maps.InfoWindow({
				content: content
			});

			marker.addListener('click', function() {
				infowindow.open(map, marker);
			});

			markers.push(marker);
		});
}

// Adds to the location array.
function addLocation() {
	const title = document.getElementById('title').value;
	const location = document.getElementById('location').value;
	const image = document.getElementById('image').value;
	const about = document.getElementById('about').value;

	if (title && location && about) {
	  const latLngArray = location.split(',');
	  if (latLngArray.length !== 2) {
		alert('Invalid Lat, Lng format. Please use the format: 39.9666, -75.5908');
		return;
	  }

	  const latLng = {
		lat: parseFloat(latLngArray[0]),
		lng: parseFloat(latLngArray[1])
	  };

	  if (isNaN(latLng.lat) || isNaN(latLng.lng)) {
		alert('Invalid latitude or longitude values.');
		return;
	  }

	  const newLocation = {
		title: title,
		image: image,
		location: `${latLng.lat}, ${latLng.lng}`,
		about: about
	  };

	  locations.push(newLocation); // Add the new location to the locations array
	  addMarker(`${latLng.lat}, ${latLng.lng}`, title, image, about); // Add a marker for the new location

	  // Clear the form inputs
	  document.getElementById('title').value = '';
	  document.getElementById('location').value = '';
	  document.getElementById('image').value = '';
	  document.getElementById('about').value = '';
	}
  }

  // Adds the marker to the datas array and puts it into the JSON bin.
  async function addMarker(latLng, title, image, about) {
	const [lat, lng] = latLng.split(',').map(Number);

	const marker = new google.maps.marker.AdvancedMarkerElement({
	  position: { lat, lng },
	  map: map,
	  title: title
	});
	var tempArray = {
		"title": title,
    	"location": latLng,
    	"image": image,
    	"about": about
}

	// html for the box that opens when a user clicks on a marker
	let content = '<div class="info-window-content">' +
  '<div><strong><h1>' + title + '</h1></strong></div><br>' +
						  '<img class="info-window-image" src="' + image + '" alt="' + title + '">' +
						  
						  '<div>' + about + '</div>' +
						  '</div>';



	const infowindow = new google.maps.InfoWindow({
	  content: content
	});

	marker.addListener('click', () => {
	  infowindow.open(map, marker);
	});

	datas.push(marker);

	putJSONData(tempArray)
		.then(() => {console.log("Sent updated user data to jsonbin:", updatedUser);}).catch(error => {
		console.error("Error updating jsonbin.io:", error.message);
		document.getElementById('response').innerHTML = 'Error: ' + error.message;});

  }