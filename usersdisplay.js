import {User} from "./user.js"

export class UserDisplay{
    constructor(){
        this.users= [];

        this.container=document.createElement("div");
        this.container.classList.add("user-list-div");
    }

    add(user){
        this.users.push(user);
        user.draw(this.container);
    }

    saveToDB(link){

    }

    loadFromDB(link){

    }

    draw(parentContainer){
        parentContainer.appendChild(this.container);
        console.log(this.users);
        this.users.forEach(el => el.draw(this.container));
    }
}