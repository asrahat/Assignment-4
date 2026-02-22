// array for list

let interviewList = [];
let rejectedList = [];

let currentStatus = 'all';

// get total count element by id
const totalCount = document.getElementById("totalCount");
const totalCountJobs = document.getElementById("totalCountJobs");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");

//
const allCardSection = document.getElementById("allCards");
const mainContainer = document.querySelector("main");
const filteredSection = document.getElementById('filtered-section')

// get buttons for toggle

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

// calculate count

function calculateCount() {
  totalCount.innerText = allCardSection.children.length;
  totalCountJobs.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}
calculateCount();

// toggle buttons style

function toggleStyle(id) {
  // remove  bg-blue-600 text-white
  allFilterBtn.classList.remove("bg-blue-600", "text-white");
  interviewFilterBtn.classList.remove("bg-blue-600", "text-white");
  rejectedFilterBtn.classList.remove("bg-blue-600", "text-white");

  // add  bg-gray-200 text-gray-700

  allFilterBtn.classList.add("bg-gray-200", "text-gray-700");
  interviewFilterBtn.classList.add("bg-gray-200", "text-gray-700");
  rejectedFilterBtn.classList.add("bg-gray-200", "text-gray-700");

  // remove bg-gray-200 text-gray-700 and adding bg-blue-600 text-white just for clicked one

  const selected = document.getElementById(id);
  currentStatus = id;
  selected.classList.remove("bg-gray-200", "text-gray-700");
  selected.classList.add("bg-blue-600", "text-white");


  if(id == 'interview-filter-btn'){
    allCardSection.classList.add('hidden')
    filteredSection.classList.remove('hidden')
    randarInterView();
  }else if(id == 'all-filter-btn'){
    allCardSection.classList.remove('hidden')
    filteredSection.classList.add('hidden')
  
  }else if(id == 'rejected-filter-btn'){
     allCardSection.classList.add('hidden')
    filteredSection.classList.remove('hidden')
     randarRejected()
  }

}

mainContainer.addEventListener("click", function (event) {
  // console.log(event.target.parentNode.parentNode);

  if (event.target.classList.contains("interview-btn")) {
    const parentNode = event.target.parentNode.parentNode;
    console.log(parentNode);
    const companyName = parentNode.querySelector(".companyName").innerText;
    const position = parentNode.querySelector(".position").innerText;
    const location = parentNode.querySelector(".location").innerText;
    const type = parentNode.querySelector(".type").innerText;
    const salary = parentNode.querySelector(".salary").innerText;
    const status = parentNode.querySelector(".status").innerText;
    const description = parentNode.querySelector(".description").innerText;
    console.log(
      companyName,
      position,
      location,
      type,
      salary,
      status,
      description,
    );

    parentNode.querySelector(".status").innerText = "Interview";

    const cardInfo = {
      companyName,
      position,
      location,
      type,
      salary,
      status:'Interview',
      description,
    };
        console.log(cardInfo);

        const jobExist = interviewList.find(
          (item) => item.companyName == cardInfo.companyName,
        );

        if (!jobExist) {
          interviewList.push(cardInfo);
        }

        rejectedList = rejectedList.filter(item => item.companyName != cardInfo.companyName)
        
        calculateCount();

        if(currentStatus == 'rejected-filter-btn'){

            randarRejected()
        }
    
   
  }else if (event.target.classList.contains("rejected-btn")) {
    const parentNode = event.target.parentNode.parentNode;
    console.log(parentNode);
    const companyName = parentNode.querySelector(".companyName").innerText;
    const position = parentNode.querySelector(".position").innerText;
    const location = parentNode.querySelector(".location").innerText;
    const type = parentNode.querySelector(".type").innerText;
    const salary = parentNode.querySelector(".salary").innerText;
    const status = parentNode.querySelector(".status").innerText;
    const description = parentNode.querySelector(".description").innerText;
   
    parentNode.querySelector(".status").innerText = "rejected";

    const cardInfo = {
      companyName,
      position,
      location,
      type,
      salary,
      status:'rejected',
      description,
    };
        // console.log(cardInfo);

        const jobExist = rejectedList.find(
          (item) => item.companyName == cardInfo.companyName,
        );

        if (!jobExist) {
          rejectedList.push(cardInfo);
        }

        interviewList = interviewList.filter(item =>item.companyName != cardInfo.companyName)

        if(currentStatus == 'interview-filter-btn'){
            randarInterView();
        }

        calculateCount();

  }

 
});


// rander data for interview

function randarInterView(){
    if(interviewList.length == '0'){

        filteredSection.innerHTML = `
        <div class="bg-white rounded-xl shadow-md p-10 text-center">
            <div class="flex justify-center mb-6">
              <img src="/assets/jobs.png" alt="" />
            </div>
            <h3 class="text-xl sm:text-2xl font-semibold text-gray-800">
              No jobs available
            </h3>
    
            <p class="text-gray-500 mt-2 text-sm sm:text-base">
              Check back soon for new job opportunities
            </p>
          </div>
        `;
    }else{

        for(let interview of interviewList){
            console.log(interview);
            const div = document.createElement('div');
            div.className =('bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300 rounded-xl p-6');
    
            div.innerHTML = `
                <div class="flex flex-col lg:flex-row lg:justify-between gap-6">
                <div>
                  <h3 class="companyName text-xl font-semibold text-gray-800">
                    ${interview.companyName}
                  </h3>
                  <p class="position text-gray-500 text-sm">${interview.position}</p>
                  <p class=" text-gray-400 text-sm mt-1">
                    <span class="location">${interview.location}</span> • <span class="type">${interview.type}</span> • <span class="salary">${interview.salary}</span>
                  </p>
    
                  <span
                    class="status inline-block mt-3 text-xs font-medium bg-gray-200 text-gray-600 px-3 py-1 rounded-full"
                  >
                    ${interview.status}
                  </span>
    
                  <p class="description text-gray-600 text-sm mt-4 leading-relaxed">
                    ${interview.description}
                  </p>
                  <div class="flex gap-3 mt-4">
                    <button
                      class="interview-btn px-5 py-2 text-sm font-medium rounded-lg bg-green-500 text-white hover:bg-green-600 hover:shadow-lg transform hover:-translate-y-1 active:scale-95 transition duration-300"
                    >
                      Interview
                    </button>
    
                     <button
                      class="rejected-btn px-5 py-2 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 hover:shadow-lg transform hover:-translate-y-1 active:scale-95 transition duration-300"
                    >
                      Rejected
                    </button>
                  </div>
                </div>
              </div>
            `;
            filteredSection.appendChild(div)
        }
    }

}
// rander data for rejected

function randarRejected(){
    if(rejectedList.length == '0'){

        filteredSection.innerHTML = `
        <div class="bg-white rounded-xl shadow-md p-10 text-center">
            <div class="flex justify-center mb-6">
              <img src="/assets/jobs.png" alt="" />
            </div>
            <h3 class="text-xl sm:text-2xl font-semibold text-gray-800">
              No jobs available
            </h3>
    
            <p class="text-gray-500 mt-2 text-sm sm:text-base">
              Check back soon for new job opportunities
            </p>
          </div>
        `;
    }else{
for(let rejected of rejectedList){
        // console.log(rejected);
        const div = document.createElement('div');
        div.className =('bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300 rounded-xl p-6');

        div.innerHTML = `
            <div class="flex flex-col lg:flex-row lg:justify-between gap-6">
            <div>
              <h3 class="companyName text-xl font-semibold text-gray-800">
                ${rejected.companyName}
              </h3>
              <p class="position text-gray-500 text-sm">${rejected.position}</p>
              <p class=" text-gray-400 text-sm mt-1">
                <span class="location">${rejected.location}</span> • <span class="type">${rejected.type}</span> • <span class="salary">${rejected.salary}</span>
              </p>

              <span
                class="status inline-block mt-3 text-xs font-medium bg-gray-200 text-gray-600 px-3 py-1 rounded-full"
              >
                ${rejected.status}
              </span>

              <p class="description text-gray-600 text-sm mt-4 leading-relaxed">
                ${rejected.description}
              </p>
              <div class="flex gap-3 mt-4">
                <button
                  class="interview-btn px-5 py-2 text-sm font-medium rounded-lg bg-green-500 text-white hover:bg-green-600 hover:shadow-lg transform hover:-translate-y-1 active:scale-95 transition duration-300"
                >
                  Interview
                </button>

                 <button
                  class="rejected-btn px-5 py-2 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 hover:shadow-lg transform hover:-translate-y-1 active:scale-95 transition duration-300"
                >
                  Rejected
                </button>
              </div>
            </div>
          </div>
        `;
        filteredSection.appendChild(div)
    }
    }

    
}