using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RulesOfTheGame.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Games()
        {
            ViewBag.Message = "Where the fun begins!";

            return View();
        }

        public ActionResult HighScore()
        {
            return View();
        }
    
        public ActionResult DynamicGamePage(string id)
        {
            ViewData["Webpage"] = id;
            return View();
        }

    }
}