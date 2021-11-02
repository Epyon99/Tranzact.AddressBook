using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using tranzactestapi.Repository;

namespace tranzactestapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly ContactsContext _context;

        private readonly ILogger<ContactsController> _logger;

        public ContactsController(ILogger<ContactsController> logger, ContactsContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            string owner = Request.HttpContext.Connection.RemoteIpAddress.ToString();
            return _context.GetContacts(owner);
        }

        [HttpGet]
        [Route("/[controller]/single")]
        public Contact GetById(string contactId = "")
        {
            string owner = Request.HttpContext.Connection.RemoteIpAddress.ToString();
            var contact = _context.GetContact(owner,Guid.Parse(contactId));
            return contact;
        }


        [HttpPost]
        public async Task<Contact> Post([FromBody] Contact contact)
        {
            contact.Owner = Request.HttpContext.Connection.RemoteIpAddress.ToString();
            return _context.AddContact(contact);
        }


        [HttpPut]
        public Contact Put(Contact contact)
        {
            contact.Owner = Request.HttpContext.Connection.RemoteIpAddress.ToString();
            return _context.UpdateContact(contact);
        }


        [HttpDelete]
        public bool Delete([FromQuery] string contact)
        {
            return _context.DeleteContact(Guid.Parse(contact));
        }


    }
}
