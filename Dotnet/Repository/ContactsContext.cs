using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace tranzactestapi.Repository
{
    public class ContactsContext : DbContext
    {
        public ContactsContext(DbContextOptions<ContactsContext> options)
            : base(options)
        {
        }

        private DbSet<Contact> Contacts { get; set; }

        public Contact GetContact(string owner, Guid id)
        {
            return Contacts.FirstOrDefault(g => g.ContactId == id && g.Owner == owner);
        }
        public List<Contact> GetContacts(string owner)
        {
            var contacts = Contacts.Where(g => g.Owner == owner || g.IsPublic).ToList();
            contacts.ForEach(g =>
            {
                if (g.Owner == owner)
                {
                    g.isOwner = true;
                }
            });
            return contacts;
        }

        public Contact AddContact(Contact contact)
        {
            contact.ContactId = Guid.NewGuid();
            Contacts.Add(contact);
            this.SaveChanges();
            return contact;
        }

        public Contact UpdateContact(Contact contact)
        {
            if (!Contacts.Any(g => g.ContactId == contact.ContactId))
            {
                return null;
            }
            Contacts.Update(contact);
            this.SaveChanges();
            return contact;
        }

        public bool DeleteContact(Guid contact)
        {
            if (!Contacts.Any(g => g.ContactId == contact))
            {
                return false;
            }
            var c = this.Contacts.FirstOrDefault(g => g.ContactId == contact);
            Contacts.Remove(c);
            this.SaveChanges();
            return true;
        }
    }
}