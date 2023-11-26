document
  .getElementById("sourceLink")
  .addEventListener("input", function (event) {
    let currentValue = event.target.value;

    if (currentValue.startsWith("https://")) {
      currentValue = currentValue.replace(/^http:\/\//, "https://");
    } else if (currentValue.startsWith("www.")) {
      currentValue = "http://" + currentValue;
    }

    event.target.value = currentValue;
  });

const apiKey =
  "patMrA1yTk0zv7iVa.7f023b4c27161b1c55d49f923c65cbb82aeca4e0842b44a6aca1f984edac12ca";
const baseId = "app7VXdu27jaUQjIV";
const airtableApiUrl = `https://api.airtable.com/v0/${baseId}/`;

let dropdownItems = {};

const populateDropdown = async (tableId, htmlTag, fieldName, items) => {
  const suggestionsElement = document.querySelector(`.${htmlTag}`);
  suggestionsElement.innerHTML = "<li>Loading...</li>";

  const response = await fetch(`${airtableApiUrl}${tableId}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    method: "GET",
  });

  if (!response.ok) {
    const errorMessage = `Error: ${response.status} - ${response.statusText}`;
    console.error(errorMessage);
    suggestionsElement.innerHTML = `<li>${errorMessage}</li>`;
    return null;
  }

  const data = await response.json();
  console.log(data);

  dropdownItems[fieldName] =
    items || data.records.map((record) => record.fields);

  suggestionsElement.innerHTML = "";

  dropdownItems[fieldName].forEach((item) => {
    const li = document.createElement("li");
    if (fieldName === "promptType") {
      li.textContent = item["Prompt Type Names"];
    } else if (fieldName === "promptIndustry") {
      li.textContent = item["Industry Name"];
    } else if (fieldName === "promptCatg") {
      li.textContent = item["Name"];
    } else {
      li.textContent = item[fieldName];
    }
    suggestionsElement.appendChild(li);
  });

  return dropdownItems[fieldName];
};

let promptRoleOptions;

async function updateSuggestions(departments) {
  const existingPromptRoleOptions = dropdownItems["Role Name"];
  await populateDropdown(
    "tblWxjOgN18FFMQ6k",
    "suggestionsRole ul",
    "Role Name"
  );

  const promptRoleOptions = dropdownItems["Role Name"].filter((role) => {
    const roleDepartments = role["Departments"];
    if (roleDepartments) {
      return roleDepartments.some((dept) => departments.includes(dept));
    } else {
      return false;
    }
  });

  const filteredPromptRoleOptions = await populateDropdown(
    "tblNOSfTqt31iJZY8",
    "suggestionsRole ul",
    "Role Name",
    promptRoleOptions
  );

  const updatedPromptRoleOptions = existingPromptRoleOptions.concat(
    filteredPromptRoleOptions
  );

  if (updatedPromptRoleOptions.length > 0) {
    const roleRecord = updatedPromptRoleOptions.map((role) => {
      dropdownItems["Role Name"] = roleRecord;

      return role;
    });
  }
}

async function updateSuggestionsSingle() {
  dropdownItems["promptType"];
  dropdownItems["promptIndustry"];
  dropdownItems["promptCatg"];
  populateDropdown("tbldLUtMAk0sfvwIF", "suggestionsType ul", "promptType");
  populateDropdown(
    "tblcQPjP9SPEEXmph",
    "suggestionsIndustry ul",
    "promptIndustry"
  );
  populateDropdown("tblFJNzh7J8Bv2Uip", "suggestionsCatg ul", "promptCatg");
}

let selectedPromptType = [];
let selectedCatg = [];
function setupInput(inputElement, suggestionsElement, arrowElement) {
  function toggleArrowAndSuggestions(eventTargetValue) {
    updateSuggestionsSingle();
    arrowElement.classList.toggle("rotated");
    suggestionsElement.classList.toggle("show");
    console.log(eventTargetValue);
  }

  arrowElement.addEventListener("click", toggleArrowAndSuggestions);
  inputElement.addEventListener("click", toggleArrowAndSuggestions);

  // Add click event listener to each li in the suggestions list
  suggestionsElement.addEventListener("click", function (event) {
    if (
      event.target.tagName === "LI" &&
      event.target.textContent !== "Loading..."
    ) {
      // Set the input value to the clicked li's text content
      inputElement.value = event.target.textContent;
      toggleArrowAndSuggestions(event.target.textContent);
      suggestionsElement.classList.remove("show");
      arrowElement.classList.remove("rotated");

      const matchingPromptType =
        dropdownItems["promptType"] &&
        dropdownItems["promptType"].filter((obj) => {
          return event.target.textContent.includes(obj["Prompt Type Names"]);
        });

      console.log(matchingPromptType);
      if (matchingPromptType.length > 0) {
        selectedPromptType = matchingPromptType;
        dropdownItems["SelectedPromptType"] = selectedPromptType;
        updateSuggestions(dropdownItems["SelectedPromptType"]);
      }

      const matchingCatg =
        dropdownItems["promptCatg"] &&
        dropdownItems["promptCatg"].filter((obj) => {
          return event.target.textContent.includes(obj.Name);
        });
      if (matchingCatg.length > 0) {
        selectedCatg = matchingCatg;
        dropdownItems["SelectedCatg"] = selectedCatg;
        updateSuggestions(dropdownItems["SelectedCatg"]);
      }
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
        li.style.display = "block";
      } else {
        li.style.display = "none";
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

let selectedDepartments = [];
let selectedRoles = [];
// Multiselect input
function setupMultiSelectInput(inputElement, suggestionsElement, arrowElement) {
  populateDropdown("tbl1L1BhG3RIFZPl9", "suggestionsDept ul", "Department");
  populateDropdown("tblNOSfTqt31iJZY8", "suggestionsRole ul", "Role Name");

  const selectedSuggestions = [];
  const allowedSelectors = [
    ".suggestionsDept ul",
    ".suggestionsCatg ul",
    ".suggestionsRole ul",
  ];

  function toggleArrowAndSuggestions(eventTargetValue) {
    arrowElement.classList.add("rotated");
    if (
      !allowedSelectors.some((selector) => {
        return event.target.closest(selector);
      })
    ) {
      suggestionsElement.classList.toggle("show");
    }

    const matchingDepartments =
      dropdownItems["Department"] &&
      dropdownItems["Department"].filter((obj) =>
        eventTargetValue.includes(obj.Department)
      );
    if (matchingDepartments.length > 0) {
      selectedDepartments = matchingDepartments;
      dropdownItems["SelectedDept"] = selectedDepartments;
      updateSuggestions(dropdownItems["SelectedDept"]);
    }

    const matchingRole =
      dropdownItems["Role Name"] &&
      dropdownItems["Role Name"].filter((obj) =>
        eventTargetValue.includes(obj["Role Name"])
      );
    selectedRoles = matchingRole;
    dropdownItems["SelectedRole"] = selectedRoles;

    if (matchingDepartments.length > 0) {
      const departmentRecordIds = matchingDepartments.map(
        (dept) => dept["Record ID"]
      );
      dropdownItems["Record IDs"] = departmentRecordIds;
      updateSuggestions(dropdownItems["Record IDs"]);
    }
  }

  arrowElement.addEventListener("click", toggleArrowAndSuggestions);
  inputElement.addEventListener("click", toggleArrowAndSuggestions);

  // Add click event listener to each li in the suggestions list
  suggestionsElement.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (
      event.target.tagName === "LI" &&
      event.target.textContent !== "Loading..."
    ) {
      const clickedSuggestion = event.target.textContent;

      const index = selectedSuggestions.indexOf(clickedSuggestion);
      if (index === -1) {
        selectedSuggestions.push(clickedSuggestion);
        event.target.classList.add("selected");
      } else {
        selectedSuggestions.splice(index, 1);
        event.target.classList.remove("selected");
      }
      toggleArrowAndSuggestions(selectedSuggestions);
      updateInputValue();
    }
  });

  // Update the input value based on selected suggestions
  function updateInputValue() {
    inputElement.value = selectedSuggestions.join(", ");
  }

  // Add input event listener to filter suggestions while typing
  inputElement.addEventListener("input", function () {
    filterSuggestions(inputElement.value.trim().toLowerCase());
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

promptType.addEventListener(
  "focus",
  setupInput(promptType, suggestionsType, arrowType)
);

// Setup for the second input
const promptCatg = document.getElementById("promptCatg");
const suggestionsCatg = document.querySelector(".suggestionsCatg");
const arrowCatg = document.querySelector(".arrowDownCatg");

promptCatg.addEventListener(
  "focus",
  setupInput(promptCatg, suggestionsCatg, arrowCatg)
);

// Setup for the third input
const promptIndustry = document.getElementById("promptIndustry");
const suggestionsIndustry = document.querySelector(".suggestionsIndustry");
const arrowIndustry = document.querySelector(".arrowDownIndustry");

promptIndustry.addEventListener(
  "focus",
  setupInput(promptIndustry, suggestionsIndustry, arrowIndustry)
);

// Setup for the fourth input
const promptDept = document.getElementById("promptDept");
const suggestionsDept = document.querySelector(".suggestionsDept");
const arrowDept = document.querySelector(".arrowDownDept");

promptDept.addEventListener(
  "focus",
  setupMultiSelectInput(promptDept, suggestionsDept, arrowDept)
);

// Setup for the fifth input
const promptRole = document.getElementById("promptRole");
const suggestionsRole = document.querySelector(".suggestionsRole");
const arrowRole = document.querySelector(".arrowDownRole");

promptRole.addEventListener(
  "focus",
  setupMultiSelectInput(promptRole, suggestionsRole, arrowRole)
);

document.addEventListener("DOMContentLoaded", function () {
  const sourceLinkInput = document.getElementById("sourceLink");
  const errorMessage = document.querySelector(".errorMssg");

  function validateInput() {
    if (!sourceLinkInput.checkValidity()) {
      errorMessage.style.display = "flex";
    } else {
      errorMessage.style.display = "none";
    }
  }
  sourceLinkInput.addEventListener("blur", validateInput);
  sourceLinkInput.addEventListener("input", validateInput);
});

const addNewEntry = async (formData) => {
  const sourceLink = formData.get("sourceLink");
  const promptCatg = [formData.get("promptCatg")];

  const promptTitle = formData.get("promptTitle");
  const promptText = formData.get("promptText");
  const promptType = formData.get("promptType");
  console.log(promptType);
  const formattedPromptText = `{"prompt":"${promptText}}`;
  const formattedSourceLink = `${sourceLink}`;

  console.log(dropdownItems);
  const selectedDeptRecordIds =
    dropdownItems["SelectedDept"]?.map((obj) => obj["Record ID"]) || [];
  console.log(selectedDeptRecordIds);
  const selectedRoleRecordIds = dropdownItems["SelectedRole"]?.map(
    (obj) => obj["Record ID"] || []
  );
  const selectedCatgIds = dropdownItems["SelectedCatg"]?.map(
    (obj) => obj["Record ID"] || []
  );
  const selectedPromptType = dropdownItems["SelectedPromptType"]?.map(
    (obj) => obj["Record ID"] || []
  );

  console.log(selectedRoleRecordIds);

  try {
    const tableId = "tblWxjOgN18FFMQ6k";

    const response = await fetch(`${airtableApiUrl}${tableId}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              "Prompt Departments": selectedDeptRecordIds,
              "Prompt Roles": selectedRoleRecordIds,
              "Prompt Category": selectedCatgIds,
              "Prompt Title": promptTitle,
              "Prompt Link": formattedSourceLink,
              "Prompt Text": formattedPromptText,
              "Prompt Type": selectedPromptType,
            },
          },
        ],
      }),
      method: "POST",
    });
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  addNewEntry(formData);
});
