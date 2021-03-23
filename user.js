import {TaskList} from "./tasklist.js"

export class User{
    constructor(name){
        this.name=name;
        this.tasklists=[];

        this.container=document.createElement("div");
        this.container.classList.add("user-div");
    }

    addTaskList(tsList){
        this.tasklists.push(tsList);
        tsList.draw(this.container);
    }

    saveToDB(link){

    }

    loadFromDB(link){

    }

    draw(parentContainer){
        let titleDiv=document.createElement("div");
        titleDiv.classList.add("user-title");
        titleDiv.innerHTML=this.name;

        this.container.appendChild(titleDiv);

        parentContainer.appendChild(this.container);
    }
}