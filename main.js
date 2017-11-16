// Since this is a public API that doesn't require OAuth, 
// we can send a request to the endpoint and parse through 
// the response data. 	
var request = require('request');


// We can set a variable to store the location we are 
// searching for, as well as the encoded string and url.
//
// This makes it easy to change our location and possibly
// transition into taking a user input for our location. 
const address = "Green Bay";
const encoded = encodeURI(address);
const url = `https://maps.googleapis.com/maps/api/geocode/json?&address=${encoded}`;

request(url, function(err, response, body) {
	if (err) {
		console.log("There has been an error connecting to the API.");
	} else {
		// Convert the response data into a JSON format
		const bodyJson = JSON.parse(body);

		// Check the status to see whether we should 
		// handle the error or parse our response text.
		if (bodyJson.status === ("OK")){
			const place_id = bodyJson.results[0].place_id;
			const location = bodyJson.results[0].geometry.location;

			// Now that we have the response data, what should we do with it?
			// 	1) Print out all the data
			// 	2) Encapsulate the request function call and return an object/array of the desired values.
			//
			// Option 2 is a good choice if we wanted this data for a simple UI (or any other reason).
			// We'll go with option 1 for now since we're not using the data elsewhere.
			
			console.log(address);
			console.log(`ID: ${place_id}`);
			console.log(`Latitude: ${location.lat}`);
			console.log(`Longitude: ${location.lng}`);
		} else {
			// We can handle the errors based on the 
			// status code. I chose to only print out
			// a custom message for now.
			console.log(errors[bodyJson.status]);
		}
	}
});


// Mapping of the status codes and their corresponding error messages.
const errors = {
	"ZERO_RESULTS" : "No results have been found. Input might have been a non-existent address.",
	"OVER_QUERY_LIMIT" : "You have reached your quota.",
	"REQUEST_DENIED" : "Request has been denied.",
	"INVALID_REQUEST" : "Required query component missing. Please include either 'address', 'components' or 'latlng'.",
	"UNKNOWN_ERROR" : "Request could not be processed due to a server error. Please try again."
}