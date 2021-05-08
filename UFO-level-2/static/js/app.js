// from data.js
var tableData = data;

// YOUR CODE HERE!

// Define function which loads full table
function loadMainTable() {
    // Get a reference to the table body
    var tbody = d3.select("tbody");

    // Remove any data from the table if already exist
    tbody.html("");

    // Loop through every element in the data array and create new rows and columns with values
    data.forEach((event) => {

        var row = tbody.append("tr");

        Object.values(event).forEach(value => {
        row.append("td").text(value);
        });
    });
}

// Call function in order to render full table 
loadMainTable();


// ~~~ CUSTOM SEARCH  ~~~ 

// Select the button
var button = d3.select("#filter-btn");
// Select the forms
var dateForm = d3.select("#date");
var cityForm = d3.select("#city");
var stateForm = d3.select("#state");
var countryForm = d3.select("#country");
var shapeForm = d3.select("#shape");

// Create event handlers 
button.on("click", searchDate);
dateForm.on("submit", searchDate);
cityForm.on("submit", searchDate);
stateForm.on("submit", searchDate);
countryForm.on("submit", searchDate);
shapeForm.on("submit", searchDate);

// Complete the event handler function for the form
function searchDate() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Select all input elements and get the raw HTML node
    var datetime = d3.select("#datetime");
    var city = d3.select("#cityinput");
    var state = d3.select("#stateinput");
    var country = d3.select("#countryinput");
    var shape = d3.select("#shapeinput");

    // Create an object with input elements
    var inputs = {
        "datetime": datetime, 
        "city": city, 
        "state": state, 
        "country": country, 
        "shape": shape};

    // Create an empty object for input values
    var query = {};

    // For each input element:
    Object.entries(inputs).forEach(([key, value]) => {

        // Get the value property of the input element
        var input = value.property("value");
        
        // Check if input is not empty
        if (input) {

            // If input is not empty push the value into query object
            query[key] = input;
        }
    });
  
    // Print current query for the record
    console.log(query);

    // Check if query object is empty
    if (Object.keys(query).length === 0) {

        // If query object is empty render full table 
        loadMainTable();

    } else {
        // If query object is not empty filter data using search function
        filteredData = tableData.filter(search, query);
        
        // Return data object entries if any of their values are matching query object values
        function search(entries){
            return Object.keys(this).every((key) => entries[key] === this[key]);
          }

        // Get a reference to the table body
        var tbody = d3.select("tbody");
    
        // Remove any data from the table if already exist
        tbody.html("");
    
        // Loop through every element in the filtered data array and create new rows and columns with values
        filteredData.forEach((event) => {
    
            var row = tbody.append("tr");
    
            Object.values(event).forEach(value => {
            row.append("td").text(value);
            });
        }); 

    }

};
  