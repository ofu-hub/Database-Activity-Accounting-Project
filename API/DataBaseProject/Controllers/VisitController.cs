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
    public class VisitController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public VisitController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                SELECT *
                FROM dbo.Visit
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
        public JsonResult Post(Visit visit)
        {
            string query = @"
                INSERT INTO dbo.Visit
                (ID_Subscription, DateTime)
                VALUES (@ID_Subscription, @DateTime)
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DevConnection");
            SqlDataReader sqlReader;
            using (SqlConnection sqlCon = new SqlConnection(sqlDataSource))
            {
                sqlCon.Open();

                using (SqlCommand sqlComm = new SqlCommand(query, sqlCon))
                {
                    sqlComm.Parameters.AddWithValue("@ID_Subscription", visit.ID_Subscription);
                    sqlComm.Parameters.AddWithValue("@DateTime", visit.VisitDateTime);
                    sqlReader = sqlComm.ExecuteReader();
                    table.Load(sqlReader);
                    sqlReader.Close();
                    sqlCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Visit visit)
        {
            string query = @"
                UPDATE dbo.Visit
                SET ID_Subscription = @ID_Subscription, DateTime = @DateTime
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
                    sqlComm.Parameters.AddWithValue("@ID_Subscription", visit.ID_Subscription);
                    sqlComm.Parameters.AddWithValue("@DateTime", visit.VisitDateTime);
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
                DELETE FROM dbo.Visit
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
