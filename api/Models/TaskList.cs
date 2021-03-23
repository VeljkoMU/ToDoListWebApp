using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


namespace api.Models
{
    [Table("TaskList")]
    public class TaskList
    {
        [Key]
        [Column("ID")]
        public int ID {get; set;}

        [Column("Name")]
        public string Name {get; set;}

        [Column("Tasks")]
        public virtual List<Task> Tasks {get; set;}

       // [Column("User")]
       [JsonIgnore]
        public User User {get; set;}
    }

}