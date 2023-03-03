CREATE TABLE Country
(
  [Id]                 INT          IDENTITY (1, 1) NOT NULL,
  [IsoCountryCode]     VARCHAR(2)   NOT NULL,
  [Name]               VARCHAR(80)  NOT NULL,
  [Iso3IsoCountryCode] VARCHAR(3)   NULL,
  [NumberCode]         INT          NULL,
  [PhoneCode]          INT          NOT NULL,
  [DateCreated]        DATETIME2(7) NOT NULL CONSTRAINT [DF_Country_DateCreated] DEFAULT GETUTCDATE( ),
  CONSTRAINT [PK_Countries] PRIMARY KEY CLUSTERED ([Id] ASC),
  CONSTRAINT [UC_Countries_IsoCountryCode] UNIQUE NONCLUSTERED ([IsoCountryCode] ASC)
);