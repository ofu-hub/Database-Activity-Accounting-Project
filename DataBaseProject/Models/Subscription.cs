using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataBaseProject.Models
{
    public class Subscription
    {
        public int SubscriptionID { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Price { get; set; }
        public int Hall { get; set; }
        public int Client { get; set; }
        public bool Frozen { get; set; }

    }
}
