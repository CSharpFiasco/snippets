SELECT session_id
	, OBJECT_NAME(sqltext.objectid) AS obj_name
	,start_time
	,total_elapsed_time
	,wait_type
	,wait_time
	,cpu_time
	,reads
	,writes
	,logical_reads
	,CASE WHEN blocking_session_id = 0 THEN 'N\A' 
		ELSE CAST(session_id as varchar)
	END "blocked_by_session"
	,sqltext.text,sqlplan.query_plan
FROM sys.dm_exec_requests 
--CROSS APPLY sys.dm_exec_query_stats
CROSS APPLY sys.dm_exec_sql_text(sql_handle) AS sqltext
CROSS APPLY sys.dm_exec_query_plan(plan_handle) as sqlplan
WHERE status not in ('sleeping','background')
