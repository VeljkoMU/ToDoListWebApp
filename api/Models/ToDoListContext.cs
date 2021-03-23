using Microsoft.EntityFrameworkCore;


namespace api.Models
{


public class ToDoListContext : DbContext
{


    public DbSet<User> Users {get; set;}
    public DbSet<TaskList> TaskLists {get; set;}
    public DbSet<Task> Task {get; set;}

    public ToDoListContext(DbContextOptions options) : base(options)
    {



    }
}

}