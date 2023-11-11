const apiKey =
"patMrA1yTk0zv7iVa.7f023b4c27161b1c55d49f923c65cbb82aeca4e0842b44a6aca1f984edac12ca";
const baseId = "app7VXdu27jaUQjIV";
const tableId = "tblWxjOgN18FFMQ6k";
const airtableApiUrl = `https://api.airtable.com/v0/${baseId}/${tableId}`;
const populateDropdown = async (elementId, tableName) => {
try {
  const response = await fetch(`${airtableApiUrl}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    method: "GET",
  });
  const data = await response.json();
  console.log(data);

  // Now you can populate the dropdown with the retrieved data
  const selectElement = document.getElementById(elementId);
  data.records.forEach((record) => {
    let option = document.createElement("option");
    option.value = record.id;
    option.textContent = record.fields["Name"];
    selectElement.appendChild(option);
  });
  console.log(data.records);
} catch (error) {
  console.error("Error:", error);
}
};

function addNewEntry(tableName, entryName, callback) {
fetch(`${airtableApiUrl}/${tableName}`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ fields: { Name: entryName } }),
})
  .then((response) => response.json())
  .then((data) => {
    callback(data);
  })
  .catch((error) => console.error("Error:", error));
}

document.addEventListener("DOMContentLoaded", function () {
// Populate dropdowns when the document is loaded
populateDropdown("promptCategory", "Categories");
populateDropdown("promptType", "Prompt Types");
populateDropdown("industry", "Industry");
populateDropdown("department", "Departments");
// ... add more dropdown populations as needed

// Event listeners for adding new entries
document
  .getElementById("addCategory")
  .addEventListener("click", function () {
    const newCategory = prompt("Enter new category name:");
    if (newCategory) {
      addNewEntry("Categories", newCategory, function (data) {
        // Update the 'promptCategory' dropdown
        populateDropdown("promptCategory", "Categories");
      });
    }
  });
// ... similar event listeners for other add buttons

// Handle form submission
document
  .getElementById("promptForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Handle form data submission to Airtable
    // ... this would be similar to the createRecord function in the previous example
  });
});