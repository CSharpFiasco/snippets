select * from
   (select blockeds.session_id,blockedr.blocking_session_id,start_time,blockedr.total_elapsed_time,
           wait_type,wait_time,blockedr.cpu_time,blockedr.reads,blockedr.writes,
           blockedr.logical_reads,
           case when blocking_session_id = 0 then 'HEAD' 
           else CAST(blockedr.session_id as varchar) end "blocked_by_session"
      from sys.dm_exec_sessions blockeds
      left join sys.dm_exec_requests blockedr ON 
             blockeds.session_id = blockedr.session_id) blocked
inner join 
   (select blockings.session_id,blockingr.blocking_session_id,start_time,
           blockingr.total_elapsed_time,wait_type,wait_time,          
           blockingr.cpu_time,blockingr.reads,blockingr.writes,blockingr.logical_reads,
           case when blocking_session_id = 0 then 'HEAD'
           else CAST(blockingr.session_id as varchar) end "blocked_by_session"
      from sys.dm_exec_sessions blockings
      left join sys.dm_exec_requests blockingr ON 
             blockings.session_id = blockingr.session_id) blocking
on blocked.blocking_session_id=blocking.session_id;
			