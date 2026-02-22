
let interviewList = [];
let rejectedList = [];
let currentStatus = "all";

const totalCount = document.getElementById("totalCount");
const totalCountJobs = document.getElementById("totalCountJobs");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");

const allCardSection = document.getElementById("allCards");
const mainContainer = document.querySelector("main");
const filteredSection = document.getElementById("filtered-section");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");


// Count Function
function calculateCount() {
  totalCount.innerText = allCardSection.children.length;
  totalCountJobs.innerText =
    currentStatus === "interview"
      ? interviewList.length
      : currentStatus === "rejected"
      ? rejectedList.length
      : allCardSection.children.length;

  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}

calculateCount();

// Filter Toggle

function toggleStyle(id) {
  allFilterBtn.classList.remove("bg-blue-600", "text-white");
  interviewFilterBtn.classList.remove("bg-blue-600", "text-white");
  rejectedFilterBtn.classList.remove("bg-blue-600", "text-white");

  allFilterBtn.classList.add("bg-gray-200", "text-gray-700");
  interviewFilterBtn.classList.add("bg-gray-200", "text-gray-700");
  rejectedFilterBtn.classList.add("bg-gray-200", "text-gray-700");

  const selected = document.getElementById(id);
  selected.classList.remove("bg-gray-200", "text-gray-700");
  selected.classList.add("bg-blue-600", "text-white");

  if (id === "interview-filter-btn") {
    currentStatus = "interview";
    allCardSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderInterview();
  } else if (id === "rejected-filter-btn") {
    currentStatus = "rejected";
    allCardSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderRejected();
  } else {
    currentStatus = "all";
    allCardSection.classList.remove("hidden");
    filteredSection.classList.add("hidden");
  }

  calculateCount();
}

// Main 


mainContainer.addEventListener("click", function (event) {
  const card = event.target.parentNode.parentNode.parentNode;
  if (!card) return;

  const companyName = card.querySelector(".companyName")?.innerText;
  if (!companyName) return;

  const position = card.querySelector(".position")?.innerText;
  const location = card.querySelector(".location")?.innerText;
  const type = card.querySelector(".type")?.innerText;
  const salary = card.querySelector(".salary")?.innerText;
  const description = card.querySelector(".description")?.innerText;

  // ================= Interview =================
  if (event.target.classList.contains("interview-btn")) {
    card.querySelector(".status").innerText = "Interview";

    const cardInfo = {
      companyName,
      position,
      location,
      type,
      salary,
      status: "Interview",
      description,
    };

    if (!interviewList.find((item) => item.companyName === companyName)) {
      interviewList.push(cardInfo);
    }

    rejectedList = rejectedList.filter(
      (item) => item.companyName !== companyName
    );

    if (currentStatus === "interview") {
        renderInterview();
    }
    if (currentStatus === "rejected") {
        renderRejected();
    }

    calculateCount();
  }

  //  Rejected
  else if (event.target.classList.contains("rejected-btn")) {
    card.querySelector(".status").innerText = "Rejected";

    const cardInfo = {
      companyName,
      position,
      location,
      type,
      salary,
      status: "Rejected",
      description,
    };

    if (!rejectedList.find((item) => item.companyName === companyName)) {
      rejectedList.push(cardInfo);
    }

    interviewList = interviewList.filter(
      (item) => item.companyName !== companyName
    );

    if (currentStatus === "interview"){
         renderInterview();
    }
    if (currentStatus === "rejected") {
        renderRejected();
    }

    calculateCount();
  }

  // Delete
  else if (event.target.classList.contains("delete-btn")) {
    interviewList = interviewList.filter(
      (item) => item.companyName !== companyName
    );

    rejectedList = rejectedList.filter(
      (item) => item.companyName !== companyName
    );

    card.remove();

    if (currentStatus === "interview"){
         renderInterview();
    }
    if (currentStatus === "rejected"){
         renderRejected();
    }

    calculateCount();
  }
});

// Render Interview


function renderInterview() {
  filteredSection.innerHTML = "";

  if (interviewList.length === 0) {
    filteredSection.innerHTML = noJobMessage();
    return;
  }

  interviewList.forEach((job) => {
    filteredSection.appendChild(createCard(job));
  });
}

// Render Rejected


function renderRejected() {
  filteredSection.innerHTML = "";

  if (rejectedList.length === 0) {
    filteredSection.innerHTML = noJobMessage();
    return;
  }

  rejectedList.forEach((job) => {
    filteredSection.appendChild(createCard(job));
  });
}


// Create Card


function createCard(job) {
  const div = document.createElement("div");
  div.className =
    "bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300 rounded-xl p-6";

  div.innerHTML = `
      <h3 class="companyName text-xl font-semibold text-gray-800">
        ${job.companyName}
      </h3>
      <p class="position text-gray-500 text-sm">${job.position}</p>
      <p class="text-gray-400 text-sm mt-1">
        <span class="location">${job.location}</span> • 
        <span class="type">${job.type}</span> • 
        <span class="salary">${job.salary}</span>
      </p>

      <span class="status inline-block mt-3 text-xs font-medium bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
        ${job.status}
      </span>

      <p class="description text-gray-600 text-sm mt-4 leading-relaxed">
        ${job.description}
      </p>

      <div class="flex gap-3 mt-4">
        <button class="interview-btn px-5 py-2 text-sm font-medium rounded-lg bg-green-500 text-white">
          Interview
        </button>
        <button class="rejected-btn px-5 py-2 text-sm font-medium rounded-lg bg-red-500 text-white">
          Rejected
        </button>
        <p class="delete-btn cursor-pointer text-red-500 font-medium">delete</p>
      </div>
    `;

  return div;
}

// ================================
// No Job UI


function noJobMessage() {
  return `
    <div class="bg-white rounded-xl shadow-md p-10 text-center">
    <div class="flex justify-center mb-6"> <img src="/assets/jobs.png" alt="" /> </div>
      <h3 class="text-xl font-semibold text-gray-800">
        No jobs available
      </h3>
      <p class="text-gray-500 mt-2">
        Check back soon for new job opportunities
      </p>
    </div>
  `;
}

