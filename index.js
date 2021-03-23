

import {UserDisplay} from "./usersdisplay.js";
import {InputForm} from "./inputform.js";
import { User } from "./user.js";
import {TaskList} from "./tasklist.js"
import { Task } from "./task.js";

let u = new UserDisplay();

let f = new InputForm(u);

let ucount=0;
let tcount=0;

fetch("https://localhost:5001/TodoList/GetUsers")
.then(value=>value.json())
.then(data => {
    console.log(data);
data.forEach(dataEl=>{
    u.add(new User(dataEl.name));
    dataEl.taskLists.forEach(tslEl=>{
        u.users[ucount].addTaskList(new TaskList(tslEl.name));
        tslEl.tasks.forEach(tskEl=>{
        u.users[ucount].tasklists[tcount].addTask(new Task(tskEl.description, tskEl.date, tskEl.isDone));
        });
        tcount++;
    });
    ucount++;
    tcount=0;
});
console.log(data);})
.catch(err => alert("Greska u pribavljanju podataka iz baze   " + err));

f.draw(document.body);
u.draw(document.body);

