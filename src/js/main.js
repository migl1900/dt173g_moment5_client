
// Variables
let coursesEl           = document.getElementById("courses");
let errorEl             = document.getElementById("error");
let formHeader          = document.getElementById("formHeader");
let tableMessageEL      = document.getElementById("tableMessage");
let courseForm          = document.getElementById("courseForm");
let codeInput           = document.getElementById("code");
let nameInput           = document.getElementById("name");
let progressionInput    = document.getElementById("progression");
let linkInput           = document.getElementById("link");
let formButton          = document.getElementById("saveCourse");
let buttonPlacement     = document.getElementById("abort");

// Event listeners
window.addEventListener("load", getAllCourses);
courseForm.addEventListener("submit", addCourse, false);

// Functions

// REST request using GET printing all courses
function getAllCourses() {
    coursesEl.innerHTML = "";

    fetch("https://webicon.se/tweug/dt173g/moment5/rest/index.php")
    .then(resp => resp.json())
    .then(data => {
        data.forEach(course => {
            coursesEl.innerHTML += `
                <tr>
                    <td>${course.code}</td>
                    <td>${course.name}</td>
                    <td>${course.progression}</td>
                    <td><a href="${course.link}">Läs mer</a></td>
                    <td><a href="javascript:void(0)" onClick="getCourse(${course.id})">Ändra</a> | <a href="javascript:void(0)" onClick="deleteCourse(${course.id})">Radera</td>
                </tr>
            `;
        })
    })
    .catch(error => {
        errorEl.innerHTML = error;
    })
}

// REST request using GET for specific course
function getCourse(id) {
    fetch("https://webicon.se/tweug/dt173g/moment5/rest/index.php?id=" + id)
    .then(resp => resp.json())
    .then(data => {

        // Setting form filed values
        codeInput.value = data.code;
        nameInput.value = data.name;
        progressionInput.value = data.progression;
        linkInput.value = data.link;

        // Changing header and button text
        formHeader.innerHTML = "Uppdatera kurs"
        formButton.value = "Spara ändring";
        
        // Changing event listener to use editCourse function
        courseForm.removeEventListener("submit", addCourse, false);
        courseForm.addEventListener("submit", function(event) {
            editCourse(id, event);
        }, false);

        // Creating a button to offer abort feature
        buttonPlacement.innerHTML = "";
        let button = document.createElement("button");
        button.innerHTML = "Avbryt";
        buttonPlacement.appendChild(button);
        button.addEventListener ("click", function() {
            codeInput.value = "";
            nameInput.value = "";
            progressionInput.value = "";
            linkInput.value = "";
            location.reload();
        });
    })
}

// REST request using DELETE header to delete specific course
function deleteCourse(id) {
    fetch("https://webicon.se/tweug/dt173g/moment5/rest/index.php?id=" + id, {
        method: "DELETE"
    })
    .then(resp => resp.json())
    .then(data => {
        tableMessageEL.innerHTML = data.message;
        getAllCourses();
    })
    .catch(error => {
        errorEl.innerHTML = error;
    })
}

// REST request using POST header to add new course
function addCourse(event) {
    let code = codeInput.value;
    let name = nameInput.value;
    let progression = progressionInput.value;
    let link = linkInput.value;
    let newCourse = {
        "code": code,
        "name": name,
        "progression": progression,
        "link": link 
    }
    event.preventDefault();
    fetch("https://webicon.se/tweug/dt173g/moment5/rest/index.php", {
        method: "POST",
        body: JSON.stringify(newCourse),
    })
    .then(resp => resp.json())
    .then(data => {
        console.log("success: " + data);
        tableMessageEL.innerHTML = data.message;
        getAllCourses();
    })
    .catch(error => {
        console.log("Create error: " + error);
        errorEl.innerHTML = error;
    })
}

// REST request using PUT header to edit existing course
function editCourse(id, event) {
    let code = codeInput.value;
    let name = nameInput.value;
    let progression = progressionInput.value;
    let link = linkInput.value;
    let editCourse = {
        "code": code,
        "name": name,
        "progression": progression,
        "link": link 
    }

    event.preventDefault();
    fetch("https://webicon.se/tweug/dt173g/moment5/rest/index.php?id=" + id, {
        method: "PUT",
        body: JSON.stringify(editCourse),
    })
    .then(resp => resp.json())
    .then(data => {
        tableMessageEL.innerHTML = data.message;
        window.location.href = "index.html";
    })
    .catch(error => {
        console.log("Edit error: " + error);
        errorEl.innerHTML = error;
    })
}