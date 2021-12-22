CREATE TABLE [dbo].[City]
(
  [Id]          [INT]          IDENTITY (1, 1) NOT NULL,
  [Name]        [VARCHAR](255) NOT NULL,
  [StateId]     [TINYINT]      NOT NULL,
  [CountryId]   [INT]          NULL,
  [DateCreated] DATETIME2(7)   NOT NULL CONSTRAINT [DF_City_DateCreated] DEFAULT GETUTCDATE( )
  CONSTRAINT [PK_City] PRIMARY KEY CLUSTERED ([Id] ASC)
);