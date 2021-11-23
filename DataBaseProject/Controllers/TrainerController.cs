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
    public class TrainerController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public TrainerController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                SELECT ID_Trainer, FIO
                FROM dbo.Trainer
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
        public JsonResult Post(Trainer trainer)
        {
            string query = @"
                INSERT INTO dbo.Trainer VALUES (@FIO)
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DevConnection");
            SqlDataReader sqlReader;
            using (SqlConnection sqlCon = new SqlConnection(sqlDataSource))
            {
                sqlCon.Open();

                using (SqlCommand sqlComm = new SqlCommand(query, sqlCon))
                {
                    sqlComm.Parameters.AddWithValue("@FIO", trainer.FIO);
                    sqlReader = sqlComm.ExecuteReader();
                    table.Load(sqlReader);
                    sqlReader.Close();
                    sqlCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Trainer trainer)
        {
            string query = @"
                UPDATE dbo.Trainer
                SET FIO = @FIO
                WHERE ID_Trainer = @ID_Trainer
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DevConnection");
            SqlDataReader sqlReader;
            using (SqlConnection sqlCon = new SqlConnection(sqlDataSource))
            {
                sqlCon.Open();

                using (SqlCommand sqlComm = new SqlCommand(query, sqlCon))
                {
                    sqlComm.Parameters.AddWithValue("@ID_Trainer", trainer.ID_Trainer);
                    sqlComm.Parameters.AddWithValue("@FIO", trainer.FIO);
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
                DELETE FROM dbo.Trainer
                WHERE ID_Trainer = @ID_Trainer
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DevConnection");
            SqlDataReader sqlReader;
            using (SqlConnection sqlCon = new SqlConnection(sqlDataSource))
            {
                sqlCon.Open();

                using (SqlCommand sqlComm = new SqlCommand(query, sqlCon))
                {
                    sqlComm.Parameters.AddWithValue("@ID_Trainer", id);
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
