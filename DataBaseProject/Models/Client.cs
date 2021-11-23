using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataBaseProject.Models
{
    public class Client
    {
        public int ID_Client { get; set; }
        public string FIO { get; set; }
        public string Phone { get; set; }
        public int? ID_Trainer { get; set; }
    }
}
