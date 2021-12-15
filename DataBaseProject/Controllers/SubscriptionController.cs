using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using DataBaseProject.Models;

namespace DataBaseProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public SubscriptionController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                SELECT ID_Subscription, Description, StartDate, EndDate, Price, ID_Hall, ID_Client, Frozen
                FROM dbo.Subscription
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DevConnection");
            SqlDataReader sqlReader;
            using (SqlConnection sqlCon = new SqlConnection(sqlDataSource))
            {
                sqlCon.Open();

                using (SqlCommand sqlComm = new SqlCommand(query, sqlCon))
                {
                    sqlReader = sqlComm.ExecuteReader();
                    table.Load(sqlReader);
                    sqlReader.Close();
                    sqlCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Subscription subs)
        {
            string query = @"
                INSERT INTO dbo.Subscription VALUES (@Description, @StartDate, @EndDate, @Price, @ID_Hall, @ID_Client, @Frozen);
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DevConnection");
            SqlDataReader sqlReader;
            using (SqlConnection sqlCon = new SqlConnection(sqlDataSource))
            {
                sqlCon.Open();

                using (SqlCommand sqlComm = new SqlCommand(query, sqlCon))
                {
                    sqlComm.Parameters.AddWithValue("@Description", subs.Description);
                    sqlComm.Parameters.AddWithValue("@StartDate", subs.StartDate);
                    sqlComm.Parameters.AddWithValue("@EndDate", subs.EndDate);
                    sqlComm.Parameters.AddWithValue("@Price", subs.Price);
                    sqlComm.Parameters.AddWithValue("@ID_Hall", subs.ID_Hall);
                    sqlComm.Parameters.AddWithValue("@ID_Client", subs.ID_Client);
                    sqlComm.Parameters.AddWithValue("@Frozen", subs.Frozen);
                    sqlReader = sqlComm.ExecuteReader();
                    table.Load(sqlReader);
                    sqlReader.Close();
                    sqlCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Subscription subs)
        {
            string query = @"
                UPDATE dbo.Subscription
                SET Description = @Description, StartDate = @StartDate, EndDate = @EndDate, Price = @Price, ID_Hall = @ID_Hall, ID_Client = @ID_Client, Frozen = @Frozen
                WHERE ID_Subscription = @ID_Subscription
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DevConnection");
            SqlDataReader sqlReader;
            using (SqlConnection sqlCon = new SqlConnection(sqlDataSource))
            {
                sqlCon.Open();

                using (SqlCommand sqlComm = new SqlCommand(query, sqlCon))
                {
                    sqlComm.Parameters.AddWithValue("@ID_Subscription", subs.ID_Subscription);
                    sqlComm.Parameters.AddWithValue("@Description", subs.Description);
                    sqlComm.Parameters.AddWithValue("@StartDate", subs.StartDate);
                    sqlComm.Parameters.AddWithValue("@EndDate", subs.EndDate);
                    sqlComm.Parameters.AddWithValue("@Price", subs.Price);
                    sqlComm.Parameters.AddWithValue("@ID_Hall", subs.ID_Hall);
                    sqlComm.Parameters.AddWithValue("@ID_Client", subs.ID_Client);
                    sqlComm.Parameters.AddWithValue("@Frozen", subs.Frozen);
                    sqlReader = sqlComm.ExecuteReader();
                    table.Load(sqlReader);
                    sqlReader.Close();
                    sqlCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                DELETE FROM dbo.Subscription
                WHERE ID_Subscription = @ID_Subscription
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DevConnection");
            SqlDataReader sqlReader;
            using (SqlConnection sqlCon = new SqlConnection(sqlDataSource))
            {
                sqlCon.Open();

                using (SqlCommand sqlComm = new SqlCommand(query, sqlCon))
                {
                    sqlComm.Parameters.AddWithValue("@ID_Subscription", id);
                    sqlReader = sqlComm.ExecuteReader();
                    table.Load(sqlReader);
                    sqlReader.Close();
                    sqlCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }
    }
}
