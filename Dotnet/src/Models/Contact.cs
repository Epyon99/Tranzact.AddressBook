using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace tranzactestapi
{
    [Table("Contacts")]
    public class Contact
    {
        [Key]
        public Guid ContactId { get; set; }
        public string ContactName { get; set; }
        public string MobilePhone { get; set; }
        public string Email { get; set; }
        public string Owner { get; set; }
        public bool isOwner { get; set; } = false;
        public bool IsPublic { get; set; } = false;
    }
}