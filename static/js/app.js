// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // clear out any existing data 
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    let row = tbody.append("tr"); // Append a row to the table body
    Object.values(dataRow).forEach((val) => {       // Loop through each field in the dataRow and add
      let cell = row.append("td");  // each value as a table cell (td)
      cell.text(val);
    });
  });
}

// Create a variable to keep track of all the filters as an object.

 var filters = {};

// Use this function to update the filters. 
function updateFilters() {

    // Save the element that was changed as a variable.
    let changedElemnt  = d3.select(this);
    console.log(changedElemnt);

    // Save the value that was changed as a variable.
    let elementValue = changedElemnt.property("value");
    // console.log(elementValue);

    // Save the id of the filter that was changed as a variable.
    let filterId = changedElemnt.attr("id");
    // console.log(filterId);
  
    // If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if(elementValue){
      filters[filterId] = elementValue;
    }
    else{
      delete filters[filterId];
    }
    // console.log(filters);
    // Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // Use this function to filter the table when data is entered.
  function filterTable() {
  
    // Set the filtered data to the tableData.
    let filterData = tableData
    
    
  
    // Loop through all of the filters and keep any data that
    // matches the filter values
    Object.entries(filters).forEach(([key,value])=> {
      filterData =  filterData.filter(row => row[key]=== value);
      console.log(filterData);
    });  
    
  
    // Finally, rebuild the table using the filtered data
    buildTable(filterData);
  }
  
  // Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change",updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);
