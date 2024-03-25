let form  = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("errmsg");
let tasks = document.getElementById("tasks")
let add = document.getElementById("add");


form.addEventListener('submit', (e)=>{
    e.preventDefault(); //event listener to occur on add button click
    formValidation();
});

let formValidation = () =>{
if(textInput.value === ""){
    msg.innerHTML = "Please enter a task name";
    console.log('failure'); //function to check if an entry for task name has been made
}else{
    console.log('success');
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss","modal") /* this updates the attribute at the add bootstrap*/
    add.click(); 
    (()=>{
        add.setAttribute("data-bs-dismiss","") /* immediately invoked function*/
    })()
}
};

let data = {};



let acceptData = () =>{
    data["text"] = textInput.value;
    data["date"] = dateInput.value;  //accepting the task that is being inputted by bootstrap
    data["description"] = textarea.value;

    console.log(data);
    createTasks();
};


let createTasks = () =>{
    tasks.innerHTML +=
    `
    <div>
                <span class="fw-bold">${data.text}</span>
                <span class="small text-secondary">${data.date}</span>
                <p>${data.description}</p>

                <span class="options">
                    <i data-bs-toggle="modal" data-bs-target="#form" onClick = "editTask(this)" class="fa-solid fa-pen-to-square"></i>
                    <i onClick = "deleteTask(this)" class="fa-solid fa-trash-can"></i> 
                </span>
            </div>
    `;
    resetForm();
};


let resetForm = () =>{
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
}

let deleteTask = (e) =>{
    e.parentElement.parentElement.remove(); //targets 2 parents levels above to delete each individual task.
    //deleteTask(this). the this allowsit to only target that specific task
}

let editTask = (e) =>{
    let selectedTask = e.parentElement.parentElement;
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML; //these target the children inside the div for each task
    textarea.value = selectedTask.children[2].innerHTML;

    selectedTask.remove();
 };