import {Task} from "./task.js"

export class TaskList{
    constructor(name){

        this.name=name;
        this.tasks = [];
        this.container=document.createElement("div");
        this.container.classList.add("tasklist");
    }

    addTask(task){
        this.tasks.push(task);

        task.draw(this.container);
    }

    draw(parentContainer){
        let titleDiv=document.createElement("div");
        titleDiv.classList.add("tasklist-title");
        titleDiv.innerHTML=this.name;

        this.container.appendChild(titleDiv);

        parentContainer.appendChild(this.container);
    }

}