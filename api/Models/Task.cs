using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


namespace api.Models
{

    [Table("Task")]
    public class Task
    {
        [Key]
        [Column("ID")]
        public int ID {get; set;}

        [Column("Description")]
        public string Description {get; set;}

        [Column("Date")]
        public string Date {get; set;}


        [Column("IsDone")]
        public bool IsDone {get; set;}

        [JsonIgnore]
        public TaskList TaskList {get; set;}

    }

}
