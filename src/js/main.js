"use strict"

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
                    <td><a href="#" onClick="getCourse(${course.id})">Ändra</a> | <a href="#" onClick="deleteCourse(${course.id})">Radera</td>
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
        courseForm.addEventListener("submit", function(e) {
            editCourse(id);
        });

        // Creating a button to offer abort feature
        let button = document.createElement("button");
        button.innerHTML = "Avbryt";
        let buttonPlacement = document.getElementById("abort");
        buttonPlacement.appendChild(button);
        button.addEventListener ("click", function() {
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
function addCourse() {
    let code = codeInput.value;
    let name = nameInput.value;
    let progression = progressionInput.value;
    let link = linkInput.value;
    let course = {
        "code": code,
        "name": name,
        "progression": progression,
        "link": link 
    }

    fetch("https://webicon.se/tweug/dt173g/moment5/rest/index.php", {
        mode: "cors",
        method: "POST",
        body: JSON.stringify(course),
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

// REST request using PUT header to edit existing course
function editCourse(id) {
    let code = codeInput.value;
    let name = nameInput.value;
    let progression = progressionInput.value;
    let link = linkInput.value;
    let course = {
        "code": code,
        "name": name,
        "progression": progression,
        "link": link 
    }

    fetch("https://webicon.se/tweug/dt173g/moment5/rest/index.php?id=" + id, {
        method: "PUT",
        body: JSON.stringify(course),
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