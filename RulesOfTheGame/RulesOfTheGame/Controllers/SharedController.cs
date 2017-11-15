using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json.Serialization;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

namespace RulesOfTheGame.Controllers
{
    public class SharedController : Controller
    {
        string connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        public class Comments
        {
            public int Id { get; set; }
            public string UserName { get; set; }
            public string Comment { get; set; }
        }
        // GET: Shared
        public ActionResult Index()
        {
            return View();
        }

        // GET: Shared/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Shared/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Shared/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Shared/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Shared/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Shared/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Shared/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
        public string getComments()
        {
            DataTable comments = new DataTable();
            try
            {
                string getComments = "SELECT DISTINCT Id FROM USERCOMMENT";
                SqlDataAdapter dataAdapter = new SqlDataAdapter(getComments, connectionString);

                SqlCommandBuilder commandBuilder = new SqlCommandBuilder(dataAdapter);

                comments.Locale = System.Globalization.CultureInfo.InvariantCulture;

                dataAdapter.Fill(comments);

                List<Comments> messages = new List<Comments>();

                foreach (DataRow r in comments.Rows)
                {
                    Comments message = new Comments();
                    foreach (DataColumn c in comments.Columns)
                    {
                        if (c.ColumnName.Equals("UserName"))
                            message.UserName = r[c.ColumnName.ToString()].ToString();
                        if (c.ColumnName.Equals("Comment"))
                            message.Comment = r[c.ColumnName.ToString()].ToString();
                    }
                    messages.Add(message);
                }

                string json = JsonConvert.SerializeObject(messages);
                return json;
            }
            catch
            {
                return "";
            }
        }
    }
}
