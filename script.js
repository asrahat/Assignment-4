// ===============================
// 1️⃣ Data Storage
// ===============================

let interviewList = [];
let rejectedList = [];
let currentFilter = "all";


// ===============================
// 2️⃣ Select Important Elements
// ===============================

const totalCount = document.getElementById("totalCount");
const totalCountJobs = document.getElementById("totalCountJobs");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");

const allCardsSection = document.getElementById("allCards");
const filteredSection = document.getElementById("filtered-section");
const mainContainer = document.querySelector("main");


// ===============================
// 3️⃣ Count Update Function
// ===============================

function updateCounts() {
  totalCount.innerText = allCardsSection.children.length;

  if (currentFilter === "interview") {
    totalCountJobs.innerText = interviewList.length;
  } 
  else if (currentFilter === "rejected") {
    totalCountJobs.innerText = rejectedList.length;
  } 
  else {
    totalCountJobs.innerText = allCardsSection.children.length;
  }

  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}

updateCounts();


// ===============================
// 4️⃣ Filter Button Function
// ===============================

function toggleStyle(id) {

  const allBtn = document.getElementById("all-filter-btn");
  const interviewBtn = document.getElementById("interview-filter-btn");
  const rejectedBtn = document.getElementById("rejected-filter-btn");

  // Reset all button styles
  allBtn.classList.remove("bg-blue-600", "text-white");
  interviewBtn.classList.remove("bg-blue-600", "text-white");
  rejectedBtn.classList.remove("bg-blue-600", "text-white");

  allBtn.classList.add("bg-gray-200", "text-gray-700");
  interviewBtn.classList.add("bg-gray-200", "text-gray-700");
  rejectedBtn.classList.add("bg-gray-200", "text-gray-700");

  const clickedBtn = document.getElementById(id);
  clickedBtn.classList.remove("bg-gray-200", "text-gray-700");
  clickedBtn.classList.add("bg-blue-600", "text-white");


  // Show correct section
  if (id === "interview-filter-btn") {
    currentFilter = "interview";
    allCardsSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderInterview();
  } 
  else if (id === "rejected-filter-btn") {
    currentFilter = "rejected";
    allCardsSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderRejected();
  } 
  else {
    currentFilter = "all";
    allCardsSection.classList.remove("hidden");
    filteredSection.classList.add("hidden");
  }

  updateCounts();
}


// ===============================
// 5️⃣ Main Click Event (Event Delegation)
// ===============================

mainContainer.addEventListener("click", function (event) {

  const card = event.target.closest(".bg-white");
  if (!card) return;

  const companyName = card.querySelector(".companyName")?.innerText;
  if (!companyName) return;

  const position = card.querySelector(".position")?.innerText;
  const location = card.querySelector(".location")?.innerText;
  const type = card.querySelector(".type")?.innerText;
  const salary = card.querySelector(".salary")?.innerText;
  const description = card.querySelector(".description")?.innerText;


  // ================= Interview Button =================
  if (event.target.classList.contains("interview-btn")) {

    card.querySelector(".status").innerText = "Interview";

    const job = {
      companyName,
      position,
      location,
      type,
      salary,
      status: "Interview",
      description
    };

    // Add to interview list if not exists
    const exists = interviewList.find(item => item.companyName === companyName);
    if (!exists) {
      interviewList.push(job);
    }

    // Remove from rejected list
    rejectedList = rejectedList.filter(item => item.companyName !== companyName);

    if (currentFilter === "interview") renderInterview();
    if (currentFilter === "rejected") renderRejected();

    updateCounts();
  }


  // ================= Rejected Button =================
  else if (event.target.classList.contains("rejected-btn")) {

    card.querySelector(".status").innerText = "Rejected";

    const job = {
      companyName,
      position,
      location,
      type,
      salary,
      status: "Rejected",
      description
    };

    const exists = rejectedList.find(item => item.companyName === companyName);
    if (!exists) {
      rejectedList.push(job);
    }

    interviewList = interviewList.filter(item => item.companyName !== companyName);

    if (currentFilter === "interview") renderInterview();
    if (currentFilter === "rejected") renderRejected();

    updateCounts();
  }


  // ================= Delete Button =================
  else if (event.target.classList.contains("delete-btn")) {

    // Remove from both lists
    interviewList = interviewList.filter(item => item.companyName !== companyName);
    rejectedList = rejectedList.filter(item => item.companyName !== companyName);

    // Remove from DOM
    card.remove();

    if (currentFilter === "interview") renderInterview();
    if (currentFilter === "rejected") renderRejected();

    updateCounts();
  }

});


// ===============================
// 6️⃣ Render Interview Section
// ===============================

function renderInterview() {

  filteredSection.innerHTML = "";

 

  interviewList.forEach(job => {
    filteredSection.appendChild(createCard(job));
  });
}


// ===============================
// 7️⃣ Render Rejected Section
// ===============================

function renderRejected() {

  filteredSection.innerHTML = "";

  

  rejectedList.forEach(job => {
    filteredSection.appendChild(createCard(job));
  });
}


// ===============================
// 8️⃣ Create Card Function
// ===============================

function createCard(job) {

  const div = document.createElement("div");
  div.className = "bg-white shadow-md rounded-xl p-6";

  div.innerHTML = `
    <h3 class="companyName text-xl font-semibold">${job.companyName}</h3>
    <p class="position text-sm text-gray-500">${job.position}</p>
    <p class="text-sm text-gray-400 mt-1">
      <span class="location">${job.location}</span> •
      <span class="type">${job.type}</span> •
      <span class="salary">${job.salary}</span>
    </p>

    <span class="status inline-block mt-3 text-xs bg-gray-200 px-3 py-1 rounded-full">
      ${job.status}
    </span>

    <p class="description text-sm text-gray-600 mt-4">
      ${job.description}
    </p>

    <div class="flex gap-3 mt-4">
      <button class="interview-btn bg-green-500 text-white px-4 py-2 rounded">
        Interview
      </button>
      <button class="rejected-btn bg-red-500 text-white px-4 py-2 rounded">
        Rejected
      </button>
      <p class="delete-btn text-red-500 cursor-pointer">delete</p>
    </div>
  `;

  return div;
}

