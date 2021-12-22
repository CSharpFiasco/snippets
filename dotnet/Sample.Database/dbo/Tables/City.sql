CREATE TABLE [dbo].[City]
(
  [Id]          INT          IDENTITY (1, 1) NOT NULL,
  [Name]        VARCHAR(255) NOT NULL,
  [StateId]     SMALLINT      NOT NULL,
  [CountryId]   INT          NULL,
  [DateCreated] DATETIME2(7)   NOT NULL CONSTRAINT [DF_City_DateCreated] DEFAULT GETUTCDATE( )
  CONSTRAINT [PK_City] PRIMARY KEY CLUSTERED ([Id] ASC),
  CONSTRAINT [FK_City_State] FOREIGN KEY ([StateId]) REFERENCES [State](Id),
  CONSTRAINT [FK_City_Country] FOREIGN KEY ([CountryId]) REFERENCES [Country](Id),
);

GO
CREATE NONCLUSTERED INDEX [IX_City_01] ON [dbo].[City] ([StateId]);

GO
CREATE NONCLUSTERED INDEX [IX_City_02] ON [dbo].[City] ([CountryId]);