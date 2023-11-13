const serviceCategories = [
  {
    dept: "Administrative",
    roles: [
      "Administrative Assistant",
      "Data Entry Clerk",
      "Executive Assistant",
      "Office Manager",
      "Receptionist",
    ],
  },

  {
    dept: "Creative",
    roles: [
      "Art Director",
      "Video Editor",
      "Web Designer",
      "Graphic Designer",
      "UX Designer",
      "Illustrator",
      "Animator",
    ],
  },

  {
    dept: "Customer Service",
    roles: [
      "Technical Support Specialist",
      "Customer Service Team Lead",
      "Customer Service Rep",
      "Call Center Agent",
    ],
  },

  {
    dept: "Customer Success",
    roles: [
      "Account Manager",
      "Onboarding Specialist",
      "Customer Success Manager",
      "Customer Success Coordinator",
      "Customer Success Analyst",
    ],
  },

  {
    dept: "Education",
    roles: ["Teacher", "Curriculum Developer", "Professor", "Tutor"],
  },

  {
    dept: "Engineering",
    roles: [
      "Software Engineer",
      "Civil Engineer",
      "Mechanical Engineer",
      "Electrical Engineer",
    ],
  },

  {
    dept: "Entrepreneur",
    roles: [
      "Startup Advisor",
      "Founder",
      "Chief Marketing Officer (CMO)",
      "Chief Technology Officer (CTO)",
      "Chief Operating Officer (COO)",
      "Chief Strategy Officer (CSO)",
      "Chief Executive Officer (CEO)",
      "Chief Human Resources Officer (CHRO)",
      "Chief Financial Officer (CFO)",
      "Chief Information Security Officer (CISO)",
    ],
  },

  {
    dept: "Executive Management",
    roles: [
      "Chief Information Security Officer (CISO)",
      "Chief Executive Officer (CEO)",
      "Chief Human Resources Officer (CHRO)",
      "Chief Operating Officer (COO)",
      "Chief Financial Officer (CFO)",
      "Chief Marketing Officer (CMO)",
      "Chief Technology Officer (CTO)",
      "Chief Strategy Officer (CSO)",
    ],
  },
  {
    dept: "Finance",
    roles: [
      "Accountant",
      "Accounts Receivable Specialist",
      "Accounts Payable Specialist",
      "Financial Planner",
      "Financial Analyst",
      "Chief Financial Officer (CFO)",
    ],
  },

  {
    dept: "Human Resources",
    roles: [
      "Recruiter",
      "Employee Relations Specialist",
      "HRIS Specialist",
      "Compensation And Benefits Specialist",
      "Training And Development Specialist",
      "HR Analyst",
      "HR Manager",
      "Chief Human Resources Officer (CHRO)",
    ],
  },

  {
    dept: "Information Technology",
    roles: [],
  },

  {
    dept: "Legal",
    roles: [
      "Securities Lawyer",
      "Personal Injury Lawyer",
      "Family Lawyer",
      "Criminal Defense Lawyer",
      "Real Estate Lawyer",
      "Trust And Estates Lawyer",
      "Civil Rights Lawyer",
      "Bankruptcy Lawyer",
      "Immigration Lawyer",
      "Paralegal",
      "Intellectual Property Lawyer",
      "Employment Lawyer",
      "Tax Lawyer",
      "Corporate Lawyer",
    ],
  },

  {
    dept: "Marketing",
    roles: [
      "Marketing Analyst",
      "Event Marketing Specialist",
      "E-Commerce Manager",
      "SEO Specialist",
      "Social Media Manager",
      "PPC Specialist",
      "Digital Marketing Specialist",
      "Amazon FBA Ecommerce Manager",
      "Influencer Marketing Specialist",
      "Lead Generation Specialist",
      "B2B Marketing Specialist",
      "Paid Social Media Specialist",
      "B2B Content Marketing Manager",
      "Account-Based Marketing Manager",
      "Product Marketing Manager",
      "Creative Strategist",
      "Brand Manager",
      "Marketing Manager",
      "Email Marketing Specialist",
      "Content Marketing Specialist",
      "Marketing Coordinator",
      "Market Research Analyst",
      "Copywriter",
      "Marketing Operations",
      "Content Creator",
      "Chief Marketing Officer (CMO)",
    ],
  },

  {
    dept: "Media And Communication",
    roles: ["Content Writer", "Journalist", "Public Relations Specialist"],
  },

  {
    dept: "Medical",
    roles: [
      "Registered Nurse",
      "Obstetrician-Gynecologist (OB-GYN)",
      "Family Doctor",
      "Pediatrician",
      "Counseling Psychologist",
      "Physical Therapist",
      "Pharmacist",
      "Physician",
      "Dentist",
      "Chiropractor",
      "Psychiatrist",
      "Neurosurgeon",
      "Medical Technologist",
      "Clinical Psychologist",
      "Speech-Language Pathologist",
      "Occupational Therapist",
      "Psychologist",
      "Dietitian",
    ],
  },

  {
    dept: "Personal Development",
    roles: [
      "Mindfulness Or Meditation Coach",
      "Art Or Creativity Coach",
      "Relationship Coach",
      "Financial Coach",
      "Career Coach",
      "Image Consultant Or Personal Stylist",
      "Executive Coach",
      "Sports Coach",
      "Fitness Trainer",
      "Parenting Coach",
      "Professional Organizer",
      "Life Coach",
      "Nutritionist",
      "Health Coach",
      "Strategic Thinking",
    ],
  },

  {
    dept: "Public Relations",
    roles: [
      "PR Specialist",
      "Crisis Communications Manager",
      "Social Media Strategist",
      "PR Manager",
    ],
  },

  {
    dept: "Real Estate",
    roles: [
      "Leasing Agent",
      "Real Estate Analyst",
      "Mortgage Loan Officer",
      "Real Estate Developer",
      "Property Manager",
      "Real Estate Broker",
      "Real Estate Investor",
      "Mortgage Broker",
      "Real Estate Appraiser",
      "Real Estate Agent",
    ],
  },

  {
    dept: "Religious Services",
    roles: ["Priest", "Religious Educator", "Youth Minister", "Imam", "Rabbi"],
  },

  {
    dept: "Retail",
    roles: [
      "Assistant Store Manager",
      "Retail Buyer",
      "Store Operations Manager",
      "Store Manager",
      "Department Manager",
      "District Or Regional Manager",
      "Inventory Specialist",
      "Visual Merchandiser",
      "Sales Associate",
    ],
  },

  {
    dept: "Sales",
    roles: [
      "Sales Engineer",
      "Sales Manager",
      "Inside Sales Representative",
      "Outside Sales Representative",
      "Business Development Manager",
      "Sales Development Representative",
      "Account Executive",
      "Sales Analyst",
      "Sales Operations",
    ],
  },
];

const promptTypeOptions = ["Free", "Membership", "Paid"];
const suggestionsTypeLists = document.querySelector(".suggestionsType ul");
suggestionsTypeLists.innerHTML = "";
promptTypeOptions.forEach((option) => {
  const li = document.createElement("li");
  li.textContent = option;
  suggestionsTypeLists.appendChild(li);
});

const promptCatgOptions = ["Marketing", "Options", "Strategy"];
const suggestionsCatgLists = document.querySelector(".suggestionsCatg ul");
suggestionsCatgLists.innerHTML = "";
promptCatgOptions.forEach((option) => {
  const li = document.createElement("li");
  li.textContent = option;
  suggestionsCatgLists.appendChild(li);
});

const promptIndustryOptions = ["Education", "Entertainment", "Hospitality"];
const suggestionIndustryLists = document.querySelector(
  ".suggestionsIndustry ul"
);
suggestionIndustryLists.innerHTML = "";
promptIndustryOptions.forEach((option) => {
  const li = document.createElement("li");
  li.textContent = option;
  suggestionIndustryLists.appendChild(li);
});

const promptDeptOptions = [
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
const suggestionsDeptLists = document.querySelector(".suggestionsDept ul");
suggestionsDeptLists.innerHTML = "";
promptDeptOptions.forEach((option) => {
  const li = document.createElement("li");
  li.textContent = option;
  suggestionsDeptLists.appendChild(li);
});

function updateSuggestions(department) {
  const suggestionsRoleLists = document.querySelector(`.suggestionsRole ul`);
  const promptRoleOptions =
    serviceCategories.find((category) => category.dept === department)?.roles ||
    [];
  suggestionsRoleLists.innerHTML = "";
  if (promptRoleOptions.length > 0) {
    promptRoleOptions.forEach((role) => {
      const li = document.createElement("li");
      li.textContent = role;
      suggestionsRoleLists.appendChild(li);
    });
  }
}
function setupInput(inputElement, suggestionsElement, arrowElement) {
  function toggleArrowAndSuggestions(eventTargetValue) {
    if (promptDeptOptions.includes(eventTargetValue)) {
      updateSuggestions(eventTargetValue);
    }
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
      toggleArrowAndSuggestions(event.target.textContent);
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

// Multiselect input
function setupMultiSelectInput(inputElement, suggestionsElement, arrowElement) {
  const selectedSuggestions = [];

  function toggleArrowAndSuggestions(eventTargetValue) {
    arrowElement.classList.toggle("rotated");
    suggestionsElement.classList.toggle("show");
  }

  arrowElement.addEventListener("click", toggleArrowAndSuggestions);
  inputElement.addEventListener("click", toggleArrowAndSuggestions);

  // Add click event listener to each li in the suggestions list
  suggestionsElement.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      const clickedSuggestion = event.target.textContent;

      // Toggle the suggestion's selection state
      const index = selectedSuggestions.indexOf(clickedSuggestion);
      if (index === -1) {
        selectedSuggestions.push(clickedSuggestion);
        event.target.classList.add("selected");
      } else {
        selectedSuggestions.splice(index, 1);
        event.target.classList.remove("selected");
      }

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

setupInput(promptType, suggestionsType, arrowType);

// Setup for the second input
const promptCatg = document.getElementById("promptCatg");
const suggestionsCatg = document.querySelector(".suggestionsCatg");
const arrowCatg = document.querySelector(".arrowDownCatg");

setupMultiSelectInput(promptCatg, suggestionsCatg, arrowCatg);

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

const apiKey =
  "patMrA1yTk0zv7iVa.7f023b4c27161b1c55d49f923c65cbb82aeca4e0842b44a6aca1f984edac12ca";
const baseId = "app7VXdu27jaUQjIV";
const tableId = "tblWxjOgN18FFMQ6k";
const airtableApiUrl = `https://api.airtable.com/v0/${baseId}/${tableId}`;

const addNewEntry = async (formData) => {
  const role = formData.get("promptRole");
  const sourceLink = formData.get("sourceLink");
  const promptCatg = formData.get("promptCatg");
  const promptTitle = formData.get("promptTitle");
  const promptText = formData.get("promptText");
  const promptDept = formData.get("promptDept");
  const promptType = formData.get("promptType");
  const formattedPromptText = `{"prompt":"${promptText}}`;
  const formattedSourceLink = `${sourceLink}`;

  console.log(formattedSourceLink);

  try {
    const roleIds = [role];
    console.log(roleIds);
    const arrayCatg = promptCatg.split(", ");
    const deptIds = [promptDept];

    const response = await fetch(`${airtableApiUrl}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              "Prompt Departments": ["recDcw7umqLC4uT7f"],
              // "Prompt Ratings": ["reccgfs7FsYjNvNjP"],
              "Prompt Roles": ["HR Manager"],
              "Prompt Category": arrayCatg,
              "Prompt Title": promptTitle,
              "Prompt Link": formattedSourceLink,
              "Prompt Text": formattedPromptText,
              // "Prompt Type": promptType,
              // "Record ID": deptIds,
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
