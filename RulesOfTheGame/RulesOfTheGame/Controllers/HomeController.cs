using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO.Compression;
using System.IO;
using Microsoft.VisualBasic;

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

        [HttpPost]
        public ActionResult Games(HttpPostedFileBase zip)
        {
            ViewBag.Message = "Where the fun begins!";

            var uploads = Server.MapPath("~/Content/TempAddGame");
            using (ZipArchive archive = new ZipArchive(zip.InputStream))
            {
                foreach (ZipArchiveEntry entry in archive.Entries)
                {
                    if (!string.IsNullOrEmpty(Path.GetExtension(entry.FullName))) //make sure it's not a folder
                    {
                        entry.ExtractToFile(Path.Combine(uploads, entry.FullName));
                    }
                    else
                    {
                        Directory.CreateDirectory(Path.Combine(uploads, entry.FullName));
                    }
                }
            }
            ViewBag.Files = Directory.EnumerateFiles(uploads);

            try
            {
                NewGame myNewGame = new NewGame();
                ProcessDirectory(uploads, ref myNewGame);

                var newGameLoc = Server.MapPath("~/Content/");
                if (myNewGame.gamemanifest && myNewGame.gamescript && myNewGame.ContentFolder && myNewGame.ImagesFolder && myNewGame.ScreenshotFolder && myNewGame.screenshot)
                {
                    using (StreamWriter sw = System.IO.File.AppendText(Server.MapPath("~/Views/Home/gamesmanifest.txt")))
                    {
                        string[] manifestInfo = System.IO.File.ReadAllLines(myNewGame.ManifestLocation);
                        //sw.WriteLine();
                        sw.WriteLine("\n" + manifestInfo[0]);
                    }
                    new Microsoft.VisualBasic.Devices.Computer().FileSystem.CopyDirectory(myNewGame.ContentFolderLocation, newGameLoc);
                }
            }
            catch (Exception e){ }

            System.IO.DirectoryInfo di = new DirectoryInfo(uploads);

            foreach (FileInfo file in di.GetFiles())
            {
                file.Delete();
            }
            foreach (DirectoryInfo dir in di.GetDirectories())
            {
                dir.Delete(true);
            }
            //Array.ForEach(Directory.GetFiles((string)uploads), System.IO.File.Delete);
            //string[] filePaths = Directory.GetFiles(uploads);
            //foreach (string filePath in filePaths)
            //    System.IO.File.Delete(filePath);

            return View();
        }

        public class NewGame
        {
            public string ContentFolderLocation { get; set; }

            public string ManifestLocation { get; set; }
            public bool gamemanifest { get; set; }

            public bool gamescript { get; set; }

            public bool screenshot { get; set; }

            public bool ContentFolder { get; set; }

            public bool ImagesFolder { get; set; }

            public bool ScreenshotFolder { get; set; }
        }

        public void ProcessDirectory(string targetDirectory, ref NewGame myNewGame)
        {
            // Process the list of files found in the directory.
            string[] fileEntries = Directory.GetFiles(targetDirectory);
            foreach (string fileName in fileEntries)
            {
                //ProcessFile(fileName, ref myNewGame);

                if (fileName.Contains("screenshot"))
                {
                    myNewGame.screenshot = true;
                }
                if (fileName.Contains("gamesmanifest"))
                {
                    myNewGame.ManifestLocation = fileName;
                    myNewGame.gamemanifest = true;
                }
                if (fileName.Contains("gamescript"))
                {
                    myNewGame.gamescript = true;
                }
            }

            // Recurse into subdirectories of this directory.
            string[] subdirectoryEntries = Directory.GetDirectories(targetDirectory);
            foreach (string subdirectory in subdirectoryEntries)
            {
                if (subdirectory.Contains("Content\\images\\screenshots"))
                {
                    myNewGame.ContentFolder = true;
                    myNewGame.ImagesFolder = true;
                    myNewGame.ScreenshotFolder = true;
                    myNewGame.ContentFolderLocation = subdirectory.Replace("\\images\\screenshots", string.Empty);
                }
                ProcessDirectory(subdirectory, ref myNewGame);
            }
        }

        public void ProcessFile(string path, ref NewGame myNewGame)
        {
            Console.WriteLine("Processed file '{0}'.", path);
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