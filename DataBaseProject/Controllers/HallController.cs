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
    public class HallController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public HallController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                SELECT *
                FROM dbo.Hall
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
        public JsonResult Post(Hall hall)
        {
            string query = @"
                INSERT INTO dbo.Hall VALUES (@Name)
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DevConnection");
            SqlDataReader sqlReader;
            using (SqlConnection sqlCon = new SqlConnection(sqlDataSource))
            {
                sqlCon.Open();

                using (SqlCommand sqlComm = new SqlCommand(query, sqlCon))
                {
                    sqlComm.Parameters.AddWithValue("@Name", hall.Name);
                    sqlReader = sqlComm.ExecuteReader();
                    table.Load(sqlReader);
                    sqlReader.Close();
                    sqlCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Hall hall)
        {
            string query = @"
                UPDATE dbo.Hall
                SET Name = @Name
                WHERE ID_Hall = @ID_Hall
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DevConnection");
            SqlDataReader sqlReader;
            using (SqlConnection sqlCon = new SqlConnection(sqlDataSource))
            {
                sqlCon.Open();

                using (SqlCommand sqlComm = new SqlCommand(query, sqlCon))
                {
                    sqlComm.Parameters.AddWithValue("@ID_Hall", hall.ID_Hall);
                    sqlComm.Parameters.AddWithValue("@Name", hall.Name);
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
                DELETE FROM dbo.Hall
                WHERE ID_Hall = @ID_Hall
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DevConnection");
            SqlDataReader sqlReader;
            using (SqlConnection sqlCon = new SqlConnection(sqlDataSource))
            {
                sqlCon.Open();

                using (SqlCommand sqlComm = new SqlCommand(query, sqlCon))
                {
                    sqlComm.Parameters.AddWithValue("@ID_Hall", id);
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
