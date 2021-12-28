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
    public class PaymentController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public PaymentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                SELECT ID_Subscription, Date, Price
                FROM dbo.Payment
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
        public JsonResult Post(Payment pay)
        {
            string query = @"
                INSERT INTO dbo.Payment VALUES (@ID_Subscription, @Date, @Price);
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DevConnection");
            SqlDataReader sqlReader;
            using (SqlConnection sqlCon = new SqlConnection(sqlDataSource))
            {
                sqlCon.Open();

                using (SqlCommand sqlComm = new SqlCommand(query, sqlCon))
                {
                    sqlComm.Parameters.AddWithValue("@ID_Subscription", pay.ID_Subscription);
                    sqlComm.Parameters.AddWithValue("@Date", pay.Date);
                    sqlComm.Parameters.AddWithValue("@Price", pay.Price);
                    sqlReader = sqlComm.ExecuteReader();
                    table.Load(sqlReader);
                    sqlReader.Close();
                    sqlCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Payment pay)
        {
            string query = @"
                UPDATE dbo.Payment
                SET ID_Subscription = @ID_Subscription, Date = @Date, Price = @Price
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
                    sqlComm.Parameters.AddWithValue("@ID_Subscription", pay.ID_Subscription);
                    sqlComm.Parameters.AddWithValue("@Date", pay.Date);
                    sqlComm.Parameters.AddWithValue("@Price", pay.Price);
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
                DELETE FROM dbo.Payment
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
