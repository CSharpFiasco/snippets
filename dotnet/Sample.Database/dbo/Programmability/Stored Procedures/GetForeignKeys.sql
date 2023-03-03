CREATE PROCEDURE [dbo].[GetForeignKeys]
AS
BEGIN

    /* 
        This is frrom the following StackOverflow answer:
        https://stackoverflow.com/questions/1229968/is-it-possible-to-list-all-foreign-keys-in-a-database 
    */
    SELECT RC.CONSTRAINT_NAME FK_Name,
        KF.TABLE_SCHEMA FK_Schema,
        KF.table_name FK_Table,
        KF.column_name FK_Column,
        RC.UNIQUE_CONSTRAINT_NAME PK_Name,
        KP.TABLE_SCHEMA PK_Schema,
        KP.table_name PK_Table,
        KP.column_name PK_Column,
        RC.MATCH_OPTION MatchOption,
        RC.UPDATE_RULE UpdateRule,
        RC.DELETE_RULE DeleteRule
    FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS RC
    JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE KF
        ON RC.CONSTRAINT_NAME=KF.CONSTRAINT_NAME
    JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE KP
        ON RC.UNIQUE_CONSTRAINT_NAME=KP.CONSTRAINT_NAME;

END