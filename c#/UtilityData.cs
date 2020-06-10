using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject
{
    public class UtilityData
    {
        public UtilityData()
        {

        }

        public DataSet GetDataSet(string sql)
        {
            string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
            return GetDataSet(connectionString, sql);
        }
        
        public DataTable GetDataTable(string sql)
        {
            string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
            DataSet ds = GetDataSet(connectionString, sql);
            if (ds.Tables.Count == 0) return null;
            return ds.Tables[0];
        }

        public DataSet GetDataSet(string connectionString, string sql)
        {
            SqlConnection connection = new SqlConnection(connectionString);
            SqlDataAdapter adapter = new SqlDataAdapter();
            DataSet ds = new DataSet();

            adapter.SelectCommand = new SqlCommand(sql, connection);
            adapter.Fill(ds);

            return ds;
        }

        public void SetData(string sql)
        {
            var ConnectionStrings = ConfigurationManager.ConnectionStrings;
            string connectionString = ConnectionStrings["ConnectionString"].ConnectionString;
            
            SetData(connectionString, sql);
        }
        public void SetData(string sql, SqlParameter[] sqlParameters)
        {
            var ConnectionStrings = ConfigurationManager.ConnectionStrings;
            string connectionString = ConnectionStrings["ConnectionString"].ConnectionString;
            
            SetData(connectionString, sql, sqlParameters);
        }

        public void SetData(string connectionString, string sql)
        {
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand cmd = new SqlCommand(sql, connection);

            connection.Open();
            cmd.ExecuteNonQuery();
            connection.Close();
        }
        
        public void SetData(string connectionString, string sql, SqlParameter[] sqlParameters)
        {
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand cmd = new SqlCommand(sql, connection);

            foreach (SqlParameter sqlParameter in sqlParameters) {
                cmd.Parameters.Add(sqlParameter);
            }

            connection.Open();
            cmd.ExecuteNonQuery();
            connection.Close();
        }

        public string Sanitize(string sql)
        {
            if (sql == null) { return "NULL"; }
            return sql.Replace("'", "''");
        }

        public string Sanitize(bool sql = false)
        {
            return (sql ? "1" : "0").ToString();
        }
        public string Sanitize(int? sql)
        {
            return (sql == null ? "null" : sql.ToString());
        }
        public string Sanitize(long? sql)
        {
            return (sql == null ? "null" : sql.ToString());
        }
        public string Sanitize(decimal? sql)
        {
            return (sql == null ? "null" : sql.ToString());
        }
        public string Sanitize(bool? sql)
        {
            return ((sql == null) ? "null" : SanitizeElseZero(sql));
        }
        public string SanitizeElseZero(bool? sql)
        {
            return ((sql ?? false) ? "1" : "0").ToString();
        }
        public string SanitizeElseZero(int? sql)
        {
            return (sql ?? 0).ToString();
        }
        public string SanitizeElseZero(long? sql)
        {
            return (sql ?? 0).ToString();
        }
        public string SanitizeElseZero(decimal? sql)
        {
            return (sql ?? 0).ToString();
        }
        public string ToSQLString(string sql)
        {
            if (Sanitize(sql) == "NULL") { return Sanitize(sql); }
            return "'" + Sanitize(sql) + "'";
        }
    }
}
