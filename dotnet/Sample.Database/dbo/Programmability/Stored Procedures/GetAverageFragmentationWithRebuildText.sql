CREATE PROCEDURE [dbo].[GetAverageFragmentationWithRebuildText]
AS
BEGIN

SELECT dbschemas.[Name] AS 'Schema',
       dbtables.[Name] AS 'Table',
       dbindexes.[Name] AS 'Index',
       indexstats.avg_fragmentation_in_percent,
       indexstats.page_count,
       CONCAT( 'ALTER INDEX [', dbindexes.[Name], '] ON [', dbtables.[Name], '] REBUILD' ) AS RebuildQuery
FROM sys.dm_db_index_physical_stats( DB_ID( ), NULL, NULL, NULL, NULL ) AS indexstats
INNER JOIN sys.tables dbtables
    ON dbtables.[object_id]=indexstats.[object_id]
INNER JOIN sys.schemas dbschemas
    ON dbtables.[schema_id]=dbschemas.[schema_id]
INNER JOIN sys.indexes AS dbindexes
    ON dbindexes.[object_id]=indexstats.[object_id]
       AND indexstats.index_id=dbindexes.index_id
WHERE indexstats.database_id=DB_ID( )
      AND dbindexes.[Name] IS NOT NULL
      AND indexstats.page_count>10
ORDER BY indexstats.avg_fragmentation_in_percent DESC;

END