using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StockUp.Data;
using StockUp.Models;

namespace StockUp.Controllers
{
        [ApiController]
        [Route("api/[controller]")]

    public class ItemController : ControllerBase
    {
        private readonly AppDbContext _appDbcontext;

        public ItemController(AppDbContext appDbContext)
        {
            _appDbcontext = appDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddItem([FromBody] Item item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            _appDbcontext.StockUpDB.Add(item);
            await _appDbcontext.SaveChangesAsync();
            return Created("Item criado com sucesso!", item);
        }
    }
}