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


// ~~~ DATE SEARCH  ~~~ 

// Select the button
var button = d3.select("#filter-btn");
// Select the form
var form = d3.select("#date");

// Create event handlers 
button.on("click", searchDate);
form.on("submit", searchDate);

// Complete the event handler function for the form
function searchDate() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");
  
    // Get the value property of the input element
    var inputValue = inputElement.property("value");
  
    console.log(inputValue);

    // Check if the input field is not empty
    if (inputValue) {
        // Filter data to the input field value
        var filteredData = tableData.filter(event => event.datetime === inputValue);
  
        console.log(filteredData);
      
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
    } else {
        // If input is empty render full table 
        loadMainTable();
    }
};
  