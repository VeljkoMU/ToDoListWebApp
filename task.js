

export class Task{
    constructor(descrition, date, isdone){
        this.descrition=descrition;
        this.date=date;
        this.isDone=isdone;

        this.container=document.createElement("div");
        this.container.classList.add("task");
    }

    saveToDb(link){

    }

    draw(parentContainer){
        let descDiv=document.createElement("div");
        descDiv.innerHTML=this.descrition;
        
        let dateDiv=document.createElement("div");
        dateDiv.innerHTML=this.date;

        let doneButton=document.createElement("button");
        doneButton.classList.add("done-task-button");
        doneButton.innerHTML="Mark As Done";

        if(this.isDone)
        this.container.style.backgroundColor = "green";

        doneButton.onclick = (ev) =>{
            this.isDone=true;
            
            fetch("https://localhost:5001/TodoList/UpdateTask", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    description: this.descrition,
                    date: this.date,
                    isDone: true
                })
            });
            this.container.style.backgroundColor = "green";
        }

        this.container.appendChild(descDiv);
        this.container.appendChild(dateDiv);
        this.container.appendChild(doneButton);

        parentContainer.appendChild(this.container);
    }

}