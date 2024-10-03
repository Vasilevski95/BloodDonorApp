using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class DCandidate
    {
        [Key]
        public int id { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string? fullName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(16)")]
        public string? mobile { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string? email { get; set; }

        [Required]
        public int age { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(3)")]
        public string? bloodGroup { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string? address { get; set; }
    }
}
