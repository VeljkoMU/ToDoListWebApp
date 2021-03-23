

export class Task{
    constructor(descrition, date, isdone){
        this.descrition=descrition;
        this.date=date;
        this.isDone=isdone;

        this.container=document.createElement("div");
        this.container.classList.add("task");
    }


    draw(parentContainer){
        let descDiv=document.createElement("div");
        descDiv.innerHTML=this.descrition;
        
        let dateDiv=document.createElement("div");
        dateDiv.innerHTML=this.date;

        let doneButton=document.createElement("button");
        doneButton.classList.add("done-task-button");
        doneButton.innerHTML="Mark As Done";

        let buttonDelete=document.createElement("button");
        buttonDelete.classList.add("button");
        buttonDelete.innerHTML="X";

        buttonDelete.onclick = (ev) =>{
            fetch("https://localhost:5001/ToDoList/DeleteTask", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: this.descrition,
                isDone: true
            })
            });

            parentContainer.removeChild(this.container);
    
        }

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
            this.container.removeChild(doneButton);
        }

        this.container.appendChild(descDiv);
        this.container.appendChild(dateDiv);
        if(!this.isDone){
        this.container.appendChild(doneButton);
        }
        this.container.appendChild(buttonDelete);

        parentContainer.appendChild(this.container);
    }

}