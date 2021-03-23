using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace api.Models
{
    [Table("User")]
    public class User
    {

        [Key]
        [Column("ID")]
        public int ID {get; set;}

        [Column("Name")]
        public string Name {get; set;}

        [Column("TaskLists")]
        public virtual List<TaskList> TaskLists {get; set;}

    }


}