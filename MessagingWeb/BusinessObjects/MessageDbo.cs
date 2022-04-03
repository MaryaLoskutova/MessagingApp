using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System;
using Microsoft.EntityFrameworkCore;

namespace MessagingWeb.BusinessObjects
{
    [Table("MessageHistory")]
    [Index(nameof(MessageId), IsUnique = true, Name = "Idx_MessageId")]
    [Index(nameof(SendDate), IsUnique = false)]
    public class MessageDbo
    {
        [Key]
        public Guid MessageId { get; set; }

        [Column(TypeName = "varchar(15)")]
        public string Phone { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string Message { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime SendDate { get; set; }

        [Column(TypeName = "bigint"), Required, ConcurrencyCheck, DefaultValue(0)]
        public long Timestamp { get; set; }
    }
}
