using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ToDoListController : ControllerBase
    {

        public ToDoListContext Context {get; set;}

        public ToDoListController(ToDoListContext context)
        {
            Context=context;
        }

        [HttpGet]
        [Route("WhoIsKing")]
        public string GetTheKing()
        {
            return "Jesus Christ is King!";
        }

        [HttpGet]
        [Route("GetUsers")]
        public async Task<List<User>> GetUsers()
        {
            return await Context.Users.Include(p=> p.TaskLists).ThenInclude(it=> it.Tasks).ToListAsync();
        }

        [HttpPost]
        [Route("AddUser")]
        public async System.Threading.Tasks.Task AddUser([FromBody] User user)
        {

            if(!ValidateUserName(user.Name))
                return;


            Context.Users.Add(user);
            await Context.SaveChangesAsync();
        }

        [HttpPut]
        [Route("UpdateTask")]
        public async System.Threading.Tasks.Task UpdateTask([FromBody] api.Models.Task task)
        {

            var tsk= Context.Task.Where(p=> p.Description == task.Description).ToList().First();
            tsk.IsDone=task.IsDone;
            await Context.SaveChangesAsync();
        }

        [HttpPost]
        [Route("AddTask/{name}")]
        public async System.Threading.Tasks.Task AddTask(string name, [FromBody] api.Models.Task task)
        {
            if(!ValidateDate(task.Date))
                return;
    
            var tasklist= Context.TaskLists.Where(p=> p.Name==name).ToList().Last();
            task.TaskList=tasklist;
            Context.Task.Add(task);
            await Context.SaveChangesAsync();
        }

        [HttpPost]
        [Route("AddTaskList/{name}")]
        public async System.Threading.Tasks.Task AddTaskList(string name, [FromBody] TaskList tasklist)
        {

            if(!ValidateTaskListName(tasklist.Name))
                return;

            var user= Context.Users.Where(p=> p.Name==name).ToList().First();
            tasklist.User=user;
            Context.TaskLists.Add(tasklist);
            await Context.SaveChangesAsync();
        }

        [HttpGet]
        [Route("GetTaskLists")]
        public async Task<List<TaskList>> GetTaskLists()
        {
            return await Context.TaskLists.Include(p=>p.Tasks).ToListAsync();
        }

        [HttpDelete]
        [Route("DeleteUser")]
        public async System.Threading.Tasks.Task DeleteUser([FromBody] User user)
        {

          var taskListsOfUser =  Context.TaskLists.Where(p=> p.User.ID==user.ID).ToList();
          foreach(var tasklist in taskListsOfUser)
          {
              var tasksOfTaskList = Context.Task.Where(p=> p.TaskList.ID==tasklist.ID).ToList();
              foreach (var task in tasksOfTaskList)
              {
                  Context.Task.Remove(task);
              }
              Context.TaskLists.Remove(tasklist);
          }
            Context.Users.Remove(user);
            await Context.SaveChangesAsync();
        }

        [HttpDelete]
        [Route("DeleteTaskList")]
        public async System.Threading.Tasks.Task DeleteTaskList([FromBody] TaskList tskList)
        {
            var tasksOfTaskList= Context.Task.Where(p=> p.TaskList.ID==tskList.ID).ToList();
            foreach(var task in tasksOfTaskList)
            {
                Context.Remove(task);
            }

            Context.Remove(tskList);
            await Context.SaveChangesAsync();
        }

        [HttpDelete]
        [Route("DeleteTask")]
        public async System.Threading.Tasks.Task DleteTask([FromBody] api.Models.Task task)
        {
            Context.Remove(task);
            Context.SaveChangesAsync();
        }


        private bool ValidateDate(string date)
        {
            foreach (char c in date)
            {
                if(!Char.IsDigit(c) && c!='.')
                    return false;
            }
            return true;
        }

        private bool ValidateUserName(string name)
        {
            if(String.IsNullOrEmpty(name))
                return false;

            foreach (var user in Context.Users)
            {
                if(user.Name==name)
                    return false;
            }

            return true;
        }

        private bool ValidateTaskListName(string name)
        {
            if(String.IsNullOrEmpty(name))
                return false;

            foreach (var taskList in Context.TaskLists)
            {
                if(taskList.Name==name)
                    return false;
            }

            return true;
        }
    }
}
