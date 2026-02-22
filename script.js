// get total count element by id
const totalCount = document.getElementById('totalCount')
const totalCountJobs = document.getElementById('totalCountJobs')
const interviewCount = document.getElementById('interviewCount')
const rejectedCount = document.getElementById('rejectedCount')

// get all caard section bt id
const allCardSection = document.getElementById('allCards')


// get buttons for toggle

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');


// calculate count

function calculateCount(){
    totalCount.innerText = allCardSection.children.length;
    totalCountJobs.innerText = allCardSection.children.length;
}
calculateCount()

// toggle buttons style

function toggleStyle(id){
    // remove  bg-blue-600 text-white 
    allFilterBtn.classList.remove("bg-blue-600", "text-white")
    interviewFilterBtn.classList.remove("bg-blue-600" ,"text-white")
    rejectedFilterBtn.classList.remove("bg-blue-600", "text-white")

    // add  bg-gray-200 text-gray-700

     allFilterBtn.classList.add("bg-gray-200", "text-gray-700")
    interviewFilterBtn.classList.add("bg-gray-200" ,"text-gray-700")
    rejectedFilterBtn.classList.add("bg-gray-200", "text-gray-700")

    // remove bg-gray-200 text-gray-700 and adding bg-blue-600 text-white just for clicked one

    const selected = document.getElementById(id);
    selected.classList.remove('bg-gray-200', 'text-gray-700')
    selected.classList.add('bg-blue-600', 'text-white')

}