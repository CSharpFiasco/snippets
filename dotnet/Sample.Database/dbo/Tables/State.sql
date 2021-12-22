CREATE TABLE [dbo].[State]
(
  [Id]          SMALLINT          NOT NULL IDENTITY,
  [Name]        VARCHAR(255),
  [StateCode]   CHAR(2),
  [DateCreated] DATETIME2(7) NOT NULL CONSTRAINT [DF_State_DateCreated] DEFAULT GETUTCDATE( )
  CONSTRAINT [PK_State] PRIMARY KEY CLUSTERED ([Id] ASC)
)
