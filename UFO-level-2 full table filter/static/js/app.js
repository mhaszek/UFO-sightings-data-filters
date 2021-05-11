// from data.js
var tableData = data;

// Initiate base inputs object to handle dropdown menus
var inputs = {
    "datetime": "All",
    "city": "All",
    "state": "All",
    "country": "All",
    "shape": "All"};

// Create an empty object for all query values
var query = {};

// ~~~ CUSTOM FILTERS IN TABLE ~~~ 

// Get references to the drowpdown menus
var dateMenu = d3.select(".dropdown-menu-date");
var cityMenu = d3.select(".dropdown-menu-city");
var stateMenu = d3.select(".dropdown-menu-state");
var countryMenu = d3.select(".dropdown-menu-country");
var shapeMenu = d3.select(".dropdown-menu-shape");

// Create an object with drowpdown menus references
var menus = {
    "datetime": dateMenu, 
    "city": cityMenu, 
    "state": stateMenu, 
    "country": countryMenu, 
    "shape": shapeMenu
};

// ~~~ SEARCH TEXT FILTERS IN TABLE ~~~ 

// Select the list items
var durationForm = d3.select("#duration-form");
var commentsForm = d3.select("#comments-form");

// Create event handlers 
durationForm.on("submit", searchText);
commentsForm.on("submit", searchText);

// Define function which selects dropdown menu elements and creates event handlers for them
function load() {

    // Select the list items
    var dateItems = dateMenu.selectAll("li");
    var cityItems = cityMenu.selectAll("li");
    var stateItems = stateMenu.selectAll("li");
    var countryItems = countryMenu.selectAll("li");
    var shapeItems = shapeMenu.selectAll("li");

    // Create event handlers 
    dateItems.on("click", dropdownSearch);
    cityItems.on("click", dropdownSearch);
    stateItems.on("click", dropdownSearch);
    countryItems.on("click", dropdownSearch);
    shapeItems.on("click", dropdownSearch);

};


// ~~~ OTHER FUNCTIONS ~~~ 

// Define function which loads table
function loadTable(table) {

    // Get a reference to the table body
    var tbody = d3.select("tbody");

    // Remove any data from the table if already exist
    tbody.html("");

    // Loop through every element in the data array and create new rows and columns with values
    table.forEach((event) => {

        var row = tbody.append("tr");

        Object.values(event).forEach(value => {
        row.append("td").text(value);
        });
    });
};


// Define function which loads filtered table
function filterTable(query) {

    // Filter data using search function
    var filteredData = tableData.filter(search, query);
            
    // Return data object entries if any of their values are matching query object values
    function search(entries){
        return Object.keys(this).every((key) => entries[key].toString().includes(this[key]));
    }
    
    // Call function in order to render filtered table 
    loadTable(filteredData);

    // Call function in order to populate all dropdown menu lists with new available options
    dropdownMenus(menus, filteredData); 

    // Re-load dropdown menus
    load();
};

// Define function which creates a list of items for dropdown menus
function dropdownMenus(dropdownMenus, dataset) {

    // For each dropdown menu element:
    Object.entries(dropdownMenus).forEach(([key, value]) => {

        // Remove any data from the dropdown list if already exist
        value.html("");

        // Create set of unique values from dataset for each filter
        var unique = new Set(dataset.map(x => x[key]));

        // Get unique set values
        var setValues= unique.values();

        // Create empty array to store unique values
        uniqueValues = [];

        // Save each unique value in an array
        for (var i = 0; i < unique.size; i++) {
            uniqueValues.push(setValues.next().value);
        };

        // Create a list item with 'All' option
        emptylistItem = value.append("li");
        emptylistItem.append("a").text("All");

        // Append unique values for each dropdown menu
        uniqueValues.forEach(uniqueval => {
            var listItem = value.append("li");
            listItem.append("a").text(uniqueval);
        });

    });

};

// Create the event handler function for the dropdown menu lists
function dropdownSearch() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Select currently clicked input element and get the value
    var currentValue = d3.select(this);

    // Select the list of the currently clicked input element
    var currentList = d3.select(this.parentNode);
    
    // Get the id from the current list
    var key = currentList.attr("id");

    // Get the value from the currently clicked input element
    var value = currentValue.text();
    
    // Update inputs object with currently selected value
    inputs[key] = value;

    // Select current div element
    var currentDiv = currentList.select(function() { return this.parentNode; });

    // Check if currently selected filter is not set to 'All'
    if (value !== 'All') {
        // change filter color to active
        currentDiv.select("button>img").attr("src", "static/images/filter-active.jpg");
    } else {
        // change filter color to white
        currentDiv.select("button>img").attr("src", "static/images/filter.jpg");
    }

    // For each element in current inputs object update query:
    Object.entries(inputs).forEach(([key, value]) => {

          // Check if value is different than 'All'
        if (value !== 'All') {
            // If value is different than 'All' push the value into query object
            query[key] = value;
        } else {
            query[key] = "";
        }
    });
  
    // Print current query for the record
    console.log(query);

    // Call function in order to update table
    filterTable(query);

};

// Create the event handler function for the text search fields
function searchText() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Select input element and get the raw HTML node
    var duration = d3.select("#duration");
    var comments = d3.select("#comments");

    // Get the value property of the input element
    var durationinput = duration.property("value");
    var commentsinput = comments.property("value");

    //update query
    query["durationMinutes"] = durationinput;
    query["comments"] = commentsinput;

    // Print current query for the record
    console.log(query);

    // Call function in order to update table
    filterTable(query);
};


// Call function in order to render full table 
loadTable(tableData);

// Call function in order to populate all dropdown menu lists with all available options
dropdownMenus(menus, tableData); 

// Call function in order to define dropdown menus
load();