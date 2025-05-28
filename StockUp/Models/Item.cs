using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockUp.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Dispositivo { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string Responsavel { get; set; }
        public string Local { get; set; }
    }
}