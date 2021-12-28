using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataBaseProject.Models
{
    public class Payment
    {
        public int ID_Subscription { get; set; }
        public DateTime Date { get; set; }
        public string Price { get; set; }
    }
}
