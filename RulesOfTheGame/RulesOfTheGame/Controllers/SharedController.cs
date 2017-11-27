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

        public class Comment
        {
            public string message { get; set; }
        }

        public void submitComment(Comment newComment)
        {
            try
            {
                string userID = User.Identity.Name;

                string insertCommand = "INSERT INTO USERCOMMENT (UserName, Comment) VALUES ('" + userID + "', '" + newComment.message + "')";

                SqlCommand ins = new SqlCommand(insertCommand);

                ins.Connection = new SqlConnection(connectionString);

                ins.Connection.Open();

                ins.ExecuteNonQuery();
            }
            catch
            {

            }
        }

        public class Score
        {
            public double Val { get; set; }

            public string User { get; set; }

            public string Game { get; set; }
        }

        public void newScore(Score newScore)
        {
            try
            {
                DataTable gameScore = new DataTable();
                string getGameBestScore = "SELECT MAX(Score) FROM HighScores WHERE Game='" + newScore.Game + "'";

                SqlDataAdapter dataAdapter = new SqlDataAdapter(getGameBestScore, connectionString);

                SqlCommandBuilder commandBuilder = new SqlCommandBuilder(dataAdapter);

                gameScore.Locale = System.Globalization.CultureInfo.InvariantCulture;

                dataAdapter.Fill(gameScore);

                int temp = 0;
                Int32.TryParse(gameScore.Rows[0][0].ToString(), out temp);

                if (newScore.Val > temp)
                {

                    string userID = User.Identity.Name;

                    int scoreVal = (int)newScore.Val;

                    string insertCommand = "INSERT INTO HighScores (Score, UserName, Game) VALUES ('" + scoreVal + "', '" + userID + "', '" + newScore.Game + "')";

                    SqlCommand ins = new SqlCommand(insertCommand);

                    ins.Connection = new SqlConnection(connectionString);

                    ins.Connection.Open();

                    ins.ExecuteNonQuery();
                }
            }
            catch (Exception e)
            {

            }
        }

        public string getBestScores()
        {
            DataTable scores = new DataTable();
            try
            {
                string getBestScores = @"SELECT * FROM HighScores
                                          WHERE Score IN(
                                            SELECT DISTINCT MAX(Score)
                                            FROM HighScores GROUP BY Game
                                          )
                                        ORDER BY Game ASC";

                SqlDataAdapter dataAdapter = new SqlDataAdapter(getBestScores, connectionString);

                SqlCommandBuilder commandBuilder = new SqlCommandBuilder(dataAdapter);

                scores.Locale = System.Globalization.CultureInfo.InvariantCulture;

                dataAdapter.Fill(scores);

                List<Score> listScores = new List<Score>();

                foreach (DataRow r in scores.Rows)
                {
                    Score aScore = new Score();
                    foreach (DataColumn c in scores.Columns)
                    {
                        if (c.ColumnName.Equals("Score"))
                        {
                            int temp = 0;
                            Int32.TryParse(r[c.ColumnName.ToString()].ToString(), out temp);
                            aScore.Val = temp;
                        }
                        if (c.ColumnName.Equals("UserName"))
                            aScore.User = r[c.ColumnName.ToString()].ToString();
                        if (c.ColumnName.Equals("Game"))
                            aScore.Game = r[c.ColumnName.ToString()].ToString();
                    }
                    listScores.Add(aScore);
                }

                string json = JsonConvert.SerializeObject(listScores);
                return json;
            }
            catch
            {
                return "";
            }
        }
        public string getComments()
        {
            DataTable comments = new DataTable();
            try
            {
                string getComments = "SELECT * FROM USERCOMMENT";
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
