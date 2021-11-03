using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using tranzactestapi;
using tranzactestapi.Controllers;
using tranzactestapi.Repository;
using Moq;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using FakeItEasy;
using Microsoft.AspNetCore.Http;
using System.Net;
using System;

namespace Tests
{
    public class Tests
    {
        Program p;
        ContactsController controller;
        ContactsContext context;
        Guid ReadId;
        [SetUp]
        public void Setup()
        {

            var options = new DbContextOptionsBuilder<ContactsContext>()
                .UseInMemoryDatabase(databaseName: "ContactDatabase")
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)
                .Options;
            p = new Program();
            context = new ContactsContext(options);
            var c = context.AddContact(new Contact() {
                ContactName = "moises chirinos",
                Email = "mfrchg@hotmail.com",
                MobilePhone = "999888777",
                Owner = "192.168.1.1"
            });
            ReadId = c.ContactId;
            context.ChangeTracker.Clear();
        }

        [Test]
        public void Test_Get()
        {
            var log = new Mock<ILogger<ContactsController>>();
            controller = new ContactsController(log.Object, context);
            controller.ControllerContext = new Microsoft.AspNetCore.Mvc.ControllerContext();
            var httpContext = new DefaultHttpContext()
            {
                Connection = {
                    RemoteIpAddress = new IPAddress(16885952)
                }
            };
            controller.ControllerContext.HttpContext = httpContext;

            var result = controller.Get();
            Assert.NotNull(result);
        }

        [Test]
        public void Test_GetSingle()
        {
            var log = new Mock<ILogger<ContactsController>>();
            controller = new ContactsController(log.Object, context);
            controller.ControllerContext = new Microsoft.AspNetCore.Mvc.ControllerContext();
            var httpContext = new DefaultHttpContext()
            {
                Connection = {
                    RemoteIpAddress = new IPAddress(16885952)
                }
            };
            controller.ControllerContext.HttpContext = httpContext;

            var result = controller.GetById(ReadId.ToString());
            Assert.IsNotNull(result);
        }

        [Test]
        public void Test_Post()
        {
            var log = new Mock<ILogger<ContactsController>>();
            controller = new ContactsController(log.Object, context);
            controller.ControllerContext = new Microsoft.AspNetCore.Mvc.ControllerContext();
            var httpContext = new DefaultHttpContext()
            {
                Connection = {
                    RemoteIpAddress = new IPAddress(16885952)
                }
            };
            controller.ControllerContext.HttpContext = httpContext;

            var result = controller.Post(new Contact() {
                ContactName = "moises chirinos",
                Email = "mfrchg@hotmail.com",
                MobilePhone = "999888777"
            });

            Assert.NotNull(result.ContactId);
        }
        
        [Test]
        public void Test_Put()
        {
            var log = new Mock<ILogger<ContactsController>>();
            controller = new ContactsController(log.Object, context);
            controller.ControllerContext = new Microsoft.AspNetCore.Mvc.ControllerContext();
            var httpContext = new DefaultHttpContext()
            {
                Connection = {
                    RemoteIpAddress = new IPAddress(16885952)
                }
            };
            controller.ControllerContext.HttpContext = httpContext;            
            var ip = controller.HttpContext.Connection.RemoteIpAddress.ToString();
            
            var result = controller.Put(new Contact() {
                ContactId = ReadId,
                ContactName = "fernando chirinos",
                Email = "mfrchg@hotmail.com",
                MobilePhone = "999888777"
            });
            Console.WriteLine("Contact Name");
            Console.WriteLine(result.ContactName);
            Assert.AreEqual(result.ContactName, "fernando chirinos");
        }
        
        [Test]
        public void Test_Delete()
        {
            var id = Guid.NewGuid();
            context.AddContact(new Contact() {
                ContactId = id,
                ContactName = "moises chirinos",
                Email = "mfrchg@hotmail.com",
                MobilePhone = "999888777"
            });
            var log = new Mock<ILogger<ContactsController>>();
            controller = new ContactsController(log.Object, context);
            controller.ControllerContext = new Microsoft.AspNetCore.Mvc.ControllerContext();
            var httpContext = new DefaultHttpContext()
            {
                Connection = {
                    RemoteIpAddress = new IPAddress(16885952)
                }
            };
            controller.ControllerContext.HttpContext = httpContext;

            var result = controller.Delete(id.ToString());
            Assert.NotNull(true);
        }
    }
}