SET NUMERIC_ROUNDABORT OFF
GO
SET ANSI_PADDING, ANSI_WARNINGS, CONCAT_NULL_YIELDS_NULL, ARITHABORT, QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
SET XACT_ABORT ON
GO
SET TRANSACTION ISOLATION LEVEL Serializable
GO
BEGIN TRANSACTION
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating schemas'
GO
CREATE SCHEMA [books]
AUTHORIZATION [dbo]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
CREATE SCHEMA [customers]
AUTHORIZATION [dbo]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [books].[BookCategory]'
GO
CREATE TABLE [books].[BookCategory]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[ParentID] [int] NULL,
[Name] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_BookCategory_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_BookCategory_UpdatedAt] DEFAULT (getdate()),
[DisplayRank] [int] NULL CONSTRAINT [DF_BookCategory_DisplayRank] DEFAULT ((100))
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [pkey_BookCategory] on [books].[BookCategory]'
GO
ALTER TABLE [books].[BookCategory] ADD CONSTRAINT [pkey_BookCategory] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [books].[Book]'
GO
CREATE TABLE [books].[Book]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[BookCategoryID] [int] NOT NULL,
[Name] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CoverImageURL] [nvarchar] (1000) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Pages] [int] NOT NULL,
[FullText] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_Book_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_Book_UpdatedAt] DEFAULT (getdate()),
[Price] [money] NOT NULL CONSTRAINT [DF_Book_Price] DEFAULT ((0)),
[DiscountAmount] [money] NULL CONSTRAINT [DF_Book_DiscountAmount] DEFAULT ((0)),
[Author] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL CONSTRAINT [DF_Book_Author] DEFAULT (N'Jane Doe'),
[Language] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL CONSTRAINT [DF_Book_Language] DEFAULT (N'English')
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [pkey_Book] on [books].[Book]'
GO
ALTER TABLE [books].[Book] ADD CONSTRAINT [pkey_Book] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [books].[Topic]'
GO
CREATE TABLE [books].[Topic]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_Topic_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_Topic_UpdatedAt] DEFAULT (getdate()),
[DisplayRank] [int] NULL CONSTRAINT [DF_Topic_DisplayRank] DEFAULT ((100))
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [pkey_Topic] on [books].[Topic]'
GO
ALTER TABLE [books].[Topic] ADD CONSTRAINT [pkey_Topic] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [books].[BookTopic]'
GO
CREATE TABLE [books].[BookTopic]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[BookID] [int] NOT NULL,
[TopicID] [int] NOT NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_BookTopic_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_BookTopic_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [pkey_BookTopic] on [books].[BookTopic]'
GO
ALTER TABLE [books].[BookTopic] ADD CONSTRAINT [pkey_BookTopic] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [books].[BookTopic]'
GO
ALTER TABLE [books].[BookTopic] ADD CONSTRAINT [fkey_BookTopic_BookID] FOREIGN KEY ([BookID]) REFERENCES [books].[Book] ([ID])
GO
ALTER TABLE [books].[BookTopic] ADD CONSTRAINT [fkey_BookTopic_TopicID] FOREIGN KEY ([TopicID]) REFERENCES [books].[Topic] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [customers].[Person]'
GO
CREATE TABLE [customers].[Person]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[FirstName] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[LastName] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[OrganizationID] [int] NULL,
[Email] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Phone] [nvarchar] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_Person_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_Person_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [pkey_Person] on [customers].[Person]'
GO
ALTER TABLE [customers].[Person] ADD CONSTRAINT [pkey_Person] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [customers].[PersonTopic]'
GO
CREATE TABLE [customers].[PersonTopic]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[PersonID] [int] NOT NULL,
[TopicID] [int] NOT NULL,
[InterestLevel] [int] NOT NULL CONSTRAINT [DF_PersonTopic_InterestLevel] DEFAULT ((0)),
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_PersonTopic_CreatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [pkey_PersonTopic] on [customers].[PersonTopic]'
GO
ALTER TABLE [customers].[PersonTopic] ADD CONSTRAINT [pkey_PersonTopic] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [customers].[Purchase]'
GO
CREATE TABLE [customers].[Purchase]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Date] [date] NOT NULL,
[PersonID] [int] NOT NULL,
[GrandTotal] [money] NOT NULL CONSTRAINT [DF_Purchase_GrandTotal] DEFAULT ((0)),
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_Purchase_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_Purchase_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [pkey_Purchase] on [customers].[Purchase]'
GO
ALTER TABLE [customers].[Purchase] ADD CONSTRAINT [pkey_Purchase] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [customers].[PurchaseDetail]'
GO
CREATE TABLE [customers].[PurchaseDetail]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[PurchaseID] [int] NOT NULL,
[BookID] [int] NOT NULL,
[Quantity] [decimal] (28, 4) NOT NULL CONSTRAINT [DF_PurchaseDetail_Quantity] DEFAULT ((1)),
[Amount] [money] NOT NULL CONSTRAINT [DF_PurchaseDetail_Amount] DEFAULT ((0)),
[Discount] [money] NOT NULL CONSTRAINT [DF_PurchaseDetail_Discount] DEFAULT ((0)),
[Total] [money] NOT NULL CONSTRAINT [DF_PurchaseDetail_Total] DEFAULT ((0)),
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_PurchaseDetail_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_PurchaseDetail_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [pkey_PurchaseDetail] on [customers].[PurchaseDetail]'
GO
ALTER TABLE [customers].[PurchaseDetail] ADD CONSTRAINT [pkey_PurchaseDetail] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [customers].[Organization]'
GO
CREATE TABLE [customers].[Organization]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Address] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[City] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[StateProvince] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[PostalCode] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Country] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Website] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Phone] [nvarchar] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_Organization_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_Organization_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [pkey_Organization] on [customers].[Organization]'
GO
ALTER TABLE [customers].[Organization] ADD CONSTRAINT [pkey_Organization] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [books].[BookCategory]'
GO
ALTER TABLE [books].[BookCategory] ADD CONSTRAINT [fkey_BookCategory_ParentID] FOREIGN KEY ([ParentID]) REFERENCES [books].[BookCategory] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [books].[Book]'
GO
ALTER TABLE [books].[Book] ADD CONSTRAINT [fkey_Book_BookCategoryID] FOREIGN KEY ([BookCategoryID]) REFERENCES [books].[BookCategory] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [customers].[PersonTopic]'
GO
ALTER TABLE [customers].[PersonTopic] ADD CONSTRAINT [fkey_PersonTopic_PersonID] FOREIGN KEY ([PersonID]) REFERENCES [customers].[Person] ([ID])
GO
ALTER TABLE [customers].[PersonTopic] ADD CONSTRAINT [fkey_PersonTopic_TopicID] FOREIGN KEY ([TopicID]) REFERENCES [books].[Topic] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [customers].[PurchaseDetail]'
GO
ALTER TABLE [customers].[PurchaseDetail] ADD CONSTRAINT [fkey_PurchaseDetail_BookID] FOREIGN KEY ([BookID]) REFERENCES [books].[Book] ([ID])
GO
ALTER TABLE [customers].[PurchaseDetail] ADD CONSTRAINT [fkey_PurchaseDetail_PurchaseID] FOREIGN KEY ([PurchaseID]) REFERENCES [customers].[Purchase] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [customers].[Purchase]'
GO
ALTER TABLE [customers].[Purchase] ADD CONSTRAINT [fkey_Purchase_PersonID] FOREIGN KEY ([PersonID]) REFERENCES [customers].[Person] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
COMMIT TRANSACTION
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
-- This statement writes to the SQL Server Log so SQL Monitor can show this deployment.
IF HAS_PERMS_BY_NAME(N'sys.xp_logevent', N'OBJECT', N'EXECUTE') = 1
BEGIN
    DECLARE @databaseName AS nvarchar(2048), @eventMessage AS nvarchar(2048)
    SET @databaseName = REPLACE(REPLACE(DB_NAME(), N'\', N'\\'), N'"', N'\"')
    SET @eventMessage = N'Redgate SQL Compare: { "deployment": { "description": "Redgate SQL Compare deployed to ' + @databaseName + N'", "database": "' + @databaseName + N'" }}'
    EXECUTE sys.xp_logevent 55000, @eventMessage
END
GO
DECLARE @Success AS BIT
SET @Success = 1
SET NOEXEC OFF
IF (@Success = 1) PRINT 'The database update succeeded'
ELSE BEGIN
	IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION
	PRINT 'The database update failed'
END
GO