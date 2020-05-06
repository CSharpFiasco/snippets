<%
Class Database
    Function Sanitize(byval val, length)
        val = left(val, length)
        val = replace(val, "'", "''")
        
        Sanitize = val
    End Function

    Function GetRecords(byval connectionString, byval sql)
        dim connection,rs
        set connection=Server.Createobject("ADODB.Connection")
        connection.Provider="Microsoft.Jet.OLEDB.4.0"
        connection.Open connectionString

        Set GetRecords = connection.Execute(sql)
    End Function

    Sub SetRecords(byval connectionstring, byval sql)
        set connection=Server.Createobject("ADODB.Connection")
        connection.Provider="Microsoft.Jet.OLEDB.4.0"
        connection.Open connectionString

        DIM command
        SET command = Server.CreateObject("ADODB.Command")
        SET command.ActiveConnection = connection

        command.CommandText = sql
        command.CommandType = 1 ' adCmdText

        command.Execute
    End Sub
End Class
%>