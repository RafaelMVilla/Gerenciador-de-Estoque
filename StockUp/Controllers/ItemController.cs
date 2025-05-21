using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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


        // CRUD - POST
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


        // CRUD - GET ALL
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>>
        GetItem()
        {
            var itens = await _appDbcontext.StockUpDB.ToListAsync();

            return Ok(itens);
        }


        // CRUD - GET BY ID
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Item>>>
        GetItem(int id)
        {
            var item = await _appDbcontext.StockUpDB.FindAsync(id);

            if (item == null)
            {
                return NotFound("Dados inválidos!");
            }

            return Ok(item);
        }


        // CRUD - PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, [FromBody] Item itemAtualizado)
        {
            var itemExistente = await _appDbcontext.StockUpDB.FindAsync(id);
            if (itemExistente == null)
            {
                return NotFound("Item não encontrado!");
            }

            itemExistente.Dispositivo = itemAtualizado.Dispositivo;
            itemExistente.Marca = itemAtualizado.Marca;
            itemExistente.Modelo = itemAtualizado.Modelo;
            itemExistente.Responsavel = itemAtualizado.Responsavel;
            itemExistente.Local = itemAtualizado.Local;

            await _appDbcontext.SaveChangesAsync();

            return Ok(itemAtualizado);
        }


        // CRUD - DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _appDbcontext.StockUpDB.FindAsync(id);

            if (item == null)
            {
                return NotFound("Item não encontrado!");
            }

            _appDbcontext.Remove(item);

            await _appDbcontext.SaveChangesAsync();

            return Ok("Item deletado com sucesso!");
        }
    }
}