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

		dim command
		set command = Server.CreateObject("ADODB.Command")
		set command.ActiveConnection = connection

		command.CommandText = sql
		command.CommandType = 1 ' adCmdText

		command.Execute
	End Sub

	Sub WriteRecordSet(byval rs)
		Dim fieldName
		If Not rs.EOF Then
			Response.Write "<table>"
			Response.Write "<tr>"
				For Each field in rs.fields
					Response.Write "<th>" & field.Name & "</th>"
				Next
			Response.Write "<tr>"
			Do While Not rs.EOF
				Response.Write "<tr>"
					For Each field in rs.fields
						fieldName = field.Name
						If vartype(rs(fieldName)) < 8192 Then'Not An Array
							Response.Write "<td>" & rs(fieldName) & "</td>"
						Else
							Response.Write "<td></td>"
						End If
						' Response.Write "<td>" & rs(cstr(fieldName)) & "</td>"
					Next
				Response.Write "</tr>"
				rs.MoveNext
			Loop
			Response.Write "</table>"
		End If
	End Sub
End Class
%>