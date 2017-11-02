using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RulesOfTheGame.Controllers
{
    public class GameController : Controller
    {
        // GET: Game
        public ActionResult Flappy_Bird()
        {
            return View();
        }
        public ActionResult Guide_The_Goat()
        {
            return View();
        }
    }
}