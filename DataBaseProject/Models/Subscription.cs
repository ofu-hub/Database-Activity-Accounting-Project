using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataBaseProject.Models
{
    public class Subscription
    {
        public int ID_Subscription { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Price { get; set; }
        public int ID_Hall { get; set; }
        public int ID_Client { get; set; }
        public bool Frozen { get; set; }

    }
}
