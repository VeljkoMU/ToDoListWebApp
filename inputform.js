import { Task } from "./task.js";
import { TaskList } from "./tasklist.js";
import { User } from "./user.js";
import { UserDisplay } from "./usersdisplay.js";

export class InputForm{

    constructor(userdisplay) {

        this.userDisplayRefference=userdisplay;

        this.container=document.createElement("div");
        this.container.classList.add("input-form-div");
    }

    draw(parentContainer){

        this.drawUserCreationForm();

        this.drawTaskListCreationForm();

        this.drawTaskCreationForm();

        parentContainer.appendChild(this.container);

    }

    drawUserCreationForm(){
        let userCreationForm=document.createElement("div");
        userCreationForm.classList.add("form");

        let userNameInput=document.createElement("input");
        userNameInput.placeholder="Enter a unique username";

        let userCreateButton=document.createElement("button");
        userCreateButton.innerHTML="Create User";

        userCreateButton.onclick = (ev) =>{
            console.log("U dugmetu sam!!");
            if(!this.validateUserName(userNameInput.value))
                return;

                console.log("Preso validaciju!!");
            this.createUser(userNameInput.value);
        }

        userCreationForm.appendChild(userNameInput);
        userCreationForm.appendChild(userCreateButton);
   
        this.container.appendChild(userCreationForm);
    }
    
    drawTaskListCreationForm(){
        let taskListCreationForm=document.createElement("div");
        taskListCreationForm.classList.add("form");

        let userSelection=document.createElement("input");
        userSelection.placeholder="Select an existing user by username";

        let tslNameSelection=document.createElement("input");
        tslNameSelection.placeholder="Enter the topic of the task list"

        let tslCreateButton=document.createElement("button");
        tslCreateButton.innerHTML="Create A Task List For This User";

        tslCreateButton.onclick = (ev) =>{
            this.userDisplayRefference.users.forEach(element => {
                if(element.name===userSelection.value){
                    if(!this.validateTaskListName(tslNameSelection.value, element))
                        return;

                    this.createTaskList(element, tslNameSelection.value);
                }
            });
        }


        taskListCreationForm.appendChild(userSelection);
        taskListCreationForm.appendChild(tslNameSelection);
        taskListCreationForm.appendChild(tslCreateButton);


        this.container.appendChild(taskListCreationForm);
    }


    drawTaskCreationForm(){
        let taskCreationForm = document.createElement("div");
        taskCreationForm.classList.add("form");

        let userSelection=document.createElement("input");
        userSelection.placeholder="Select an existing user by name";
        let taskListSelection=document.createElement("input");
        taskListSelection.placeholder="Select an existing task list by name";

        let taskDescriptionInput=document.createElement("input");
        taskDescriptionInput.placeholder="Describe the task";
        let taskDateInput=document.createElement("input")
        taskDateInput.placeholder="What date is this task due?";
        taskDateInput.type="datetime";

        let taskCreationButton=document.createElement("button");
        taskCreationButton.innerHTML="Create Task";


        taskCreationButton.onclick = (ev) =>{
           let user= this.userDisplayRefference.users.find(el => el.name===userSelection.value);
           if(user===undefined){
            alert("Invalid user!");
            return;
           }
        
            let taskList= user.tasklists.find(ev => ev.name === taskListSelection.value);
            if(taskList===undefined){
                alert("Invalid tasklist!")
                return;
            }

               if(!this.validateTaskDate(taskDateInput.value))
                    return;

                this.createTask(taskList, taskDescriptionInput.value, taskDateInput.value);
        }

        taskCreationForm.appendChild(userSelection);
        taskCreationForm.appendChild(taskListSelection);
        taskCreationForm.appendChild(taskDescriptionInput);
        taskCreationForm.appendChild(taskDateInput);
        taskCreationForm.appendChild(taskCreationButton);

        this.container.appendChild(taskCreationForm);
    }

    createUser(id, name){
        let user=new User(id, name);
        this.userDisplayRefference.add(user);
        
        fetch("https://localhost:5001/TodoList/AddUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: user.name
            })
        }).catch("Greska");
    }

    createTaskList(user, tslName){
        let tasklist= new TaskList(tslName);
        user.addTaskList(tasklist);

        fetch("https://localhost:5001/TodoList/AddTaskList/" + user.name, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: tasklist.name

            })
        }).catch("Greska");
    }

    createTask(taskList, desc, date){
        let task=new Task(desc, date, false)
        taskList.addTask(task);

        
        fetch("https://localhost:5001/TodoList/AddTask/" + taskList.name, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: task.descrition,
                date: task.date,
                isDone: false
            })
        }).catch("Greska");
    }


    validateUserName(username){
        console.log("U user validaciji sam !");
        let valid=true;

        if(username==="")
            return;

        
        this.userDisplayRefference.users.forEach(el=>{
            if(el.name===username)
            {
                alert("The username is not unique.");
                valid=false;
            }
        });
        console.log("U user validciji sam 2 !");
        return valid;
    }



    validateTaskListName(name, user){
        let valid=true;

        if(name==="")
            return;


user.tasklists.forEach(el=>{
            if(el.name===name){
                alert("The username is not unique.");
            valid=false;
        }
        });
        return valid;
    }

    validateTaskDate(date){
        let valid=true;
        console.log("ovde sam 1");

        if(date==="")
            return false;
        
        Array.from(date).forEach(el => {
            if(Number.isNaN(parseInt(el)) && el!=".")
            {
                console.log("ovde sam 2");
                alert("Date format is incorrect.");
                valid=false;
            }
        });
        console.log("ovde sam 3");
        return valid;
    }

    valdiateTaskDescription(desc)
    {
        if(desc==="")
            return false;
    }

}