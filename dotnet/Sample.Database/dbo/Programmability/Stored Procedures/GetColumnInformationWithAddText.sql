CREATE PROCEDURE [dbo].[GetColumnInformationWithAddText]
AS
BEGIN

    /* This can be used to get an alter table statement to add a column */
    SELECT CONCAT(
        'ALTER TABLE ', c.table_name, ' ADD ', c.column_name, ' ', c.data_type, CASE
                WHEN c.CHARACTER_MAXIMUM_LENGTH IS NOT NULL
                THEN CONCAT( '(', c.CHARACTER_MAXIMUM_LENGTH, ')' )
        END, ' ', CASE
                WHEN c.IS_NULLABLE='YES'
                THEN 'NULL'
                ELSE 'NOT NULL'
        END
        ) AS column_definition,
        OBJECT_ID( c.table_name ) AS TABLE_OBJECT_ID,
        c.*
    FROM INFORMATION_SCHEMA.COLUMNS c;

END