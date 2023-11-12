const serviceCategories = [
  "Administrative",
  "Creative",
  "Customer Service",
  "Customer Success",
  "Education",
  "Engineering",
  "Entrepreneur",
  "Executive Management",
  "Finance",
  "Human Resources",
  "Information Technology",
  "Legal",
  "Marketing",
  "Media And Communications",
  "Medical",
  "Personal Development",
  "Public Relations",
  "Real Estate",
  "Religious Services",
  "Retail",
  "Sales",
];

function setupInput(inputElement, suggestionsElement, arrowElement) {
  function toggleArrowAndSuggestions() {
    arrowElement.classList.toggle("rotated");
    suggestionsElement.classList.toggle("show");
  }
  arrowElement.addEventListener("click", toggleArrowAndSuggestions);
  inputElement.addEventListener("click", toggleArrowAndSuggestions);

  // Add click event listener to each li in the suggestions list
  suggestionsElement.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      // Set the input value to the clicked li's text content
      inputElement.value = event.target.textContent;
      suggestionsElement.classList.remove("show");
      arrowElement.classList.remove("rotated");
    }
  });
  // Add input event listener to filter suggestions while typing
  inputElement.addEventListener("input", function () {
    filterSuggestions(inputElement.value.trim().toLowerCase());
  });

  // Add mouseover and mouseout event listeners to change background color on hover
  suggestionsElement.addEventListener("mouseover", function (event) {
    if (event.target.tagName === "LI") {
      event.target.classList.add("hovered");
    }
  });

  suggestionsElement.addEventListener("mouseout", function (event) {
    if (event.target.tagName === "LI") {
      event.target.classList.remove("hovered");
    }
  });

  function filterSuggestions(filterText) {
    const suggestions = suggestionsElement.querySelectorAll("li");
    suggestions.forEach((li) => {
      const suggestionText = li.textContent.toLowerCase();
      if (suggestionText.includes(filterText)) {
        li.style.display = "block"; // Show the suggestion
      } else {
        li.style.display = "none"; // Hide the suggestion
      }
    });
  }

  // Add global click event listener to close suggestions when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !inputElement.contains(event.target) &&
      !suggestionsElement.contains(event.target)
    ) {
      suggestionsElement.classList.remove("show");
      arrowElement.classList.remove("rotated");
    }
  });
}

// Setup for the first input
const promptType = document.getElementById("promptType");
const suggestionsType = document.querySelector(".suggestionsType");
const arrowType = document.querySelector(".arrowDownType");

setupInput(promptType, suggestionsType, arrowType);

// Setup for the second input
const promptCatg = document.getElementById("promptCatg");
const suggestionsCatg = document.querySelector(".suggestionsCatg");
const arrowCatg = document.querySelector(".arrowDownCatg");

setupInput(promptCatg, suggestionsCatg, arrowCatg);

// Setup for the third input
const promptIndustry = document.getElementById("promptIndustry");
const suggestionsIndustry = document.querySelector(".suggestionsIndustry");
const arrowIndustry = document.querySelector(".arrowDownIndustry");

setupInput(promptIndustry, suggestionsIndustry, arrowIndustry);

// Setup for the fourth input
const promptDept = document.getElementById("promptDept");
const suggestionsDept = document.querySelector(".suggestionsDept");
const arrowDept = document.querySelector(".arrowDownDept");

setupInput(promptDept, suggestionsDept, arrowDept);

// Setup for the fifth input
const promptRole = document.getElementById("promptRole");
const suggestionsRole = document.querySelector(".suggestionsRole");
const arrowRole = document.querySelector(".arrowDownRole");

setupInput(promptRole, suggestionsRole, arrowRole);

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
  document.getElementById("addCategory").addEventListener("click", function () {
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
