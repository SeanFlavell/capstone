// putJSONDataMarker.js - Function to update the data in JSONbin

const putJSONDataMarker = async (updatedData) => {

	const binId = ''; 
  
	const apiKey = ''; 
  
   
  
	const url = "https://api.jsonbin.io/v3/b/"+binId+"?meta=false";	
  
   
  
	try {
  
			  
  
   
  
			  // Log the updated data for debugging purposes
  
			  console.log('Updated data to be saved:', updatedData);
  
   
  
			  // Save the updated array back to JSONbin
  
			  const response = await fetch(url, {
  
				method: 'PUT',  // Use PUT to overwrite the existing data
  
				headers: {
  
						  'X-Master-Key': apiKey,
  
						  'Content-Type': 'application/json',
  
						  'X-Bin-Versioning': 'false',  // Prevent versioning if necessary
  
				},
  
				body: JSON.stringify(updatedData),  // Send the full updated data array
  
			  });
  
   
  
			  if (response.status !== 200) {
  
				throw new Error('Failed to update data');
  
			  }
  
   
  
			  const result = await response.json();
  
			  
  
			  // Successfully saved data - trigger success message
  
			  alert('Location saved to library successfully!');
  
			  
  
			  document.getElementById('response').innerHTML = 'Data successfully submitted! Response: ' + JSON.stringify(result);
  
	} catch (error) {
  
			  document.getElementById('response').innerHTML = 'Error: ' + error.message;
  
	}
  
  };