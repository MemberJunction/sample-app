/*
Run this script on a database that has not yet had MemberJunction installed

****** IMPORTANT *****
MAKE SURE logins for the following are created on your SERVER before you run this script!
	 MJ_CodeGen
	 MJ_CodeGen_Dev
	 MJ_Connect
	 MJ_Connect_Dev

*/
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
DECLARE @associate bit
SELECT @associate = CASE SERVERPROPERTY('EngineEdition') WHEN 5 THEN 1 ELSE 0 END
IF @associate = 0 EXEC sp_executesql N'SELECT @count = COUNT(*) FROM master.dbo.syslogins WHERE loginname = N''MJ_CodeGen''', N'@count bit OUT', @associate OUT
IF @associate = 1
BEGIN
    PRINT N'Creating user [MJ_CodeGen] and mapping to the login [MJ_CodeGen]'
    CREATE USER [MJ_CodeGen] FOR LOGIN [MJ_CodeGen]
END
ELSE
BEGIN
    PRINT N'Creating user [MJ_CodeGen] without login'
    CREATE USER [MJ_CodeGen] WITHOUT LOGIN
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
DECLARE @associate bit
SELECT @associate = CASE SERVERPROPERTY('EngineEdition') WHEN 5 THEN 1 ELSE 0 END
IF @associate = 0 EXEC sp_executesql N'SELECT @count = COUNT(*) FROM master.dbo.syslogins WHERE loginname = N''MJ_CodeGen_Dev''', N'@count bit OUT', @associate OUT
IF @associate = 1
BEGIN
    PRINT N'Creating user [MJ_CodeGen_Dev] and mapping to the login [MJ_CodeGen_Dev]'
    CREATE USER [MJ_CodeGen_Dev] FOR LOGIN [MJ_CodeGen_Dev]
END
ELSE
BEGIN
    PRINT N'Creating user [MJ_CodeGen_Dev] without login'
    CREATE USER [MJ_CodeGen_Dev] WITHOUT LOGIN
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
DECLARE @associate bit
SELECT @associate = CASE SERVERPROPERTY('EngineEdition') WHEN 5 THEN 1 ELSE 0 END
IF @associate = 0 EXEC sp_executesql N'SELECT @count = COUNT(*) FROM master.dbo.syslogins WHERE loginname = N''MJ_Connect''', N'@count bit OUT', @associate OUT
IF @associate = 1
BEGIN
    PRINT N'Creating user [MJ_Connect] and mapping to the login [MJ_Connect]'
    CREATE USER [MJ_Connect] FOR LOGIN [MJ_Connect]
END
ELSE
BEGIN
    PRINT N'Creating user [MJ_Connect] without login'
    CREATE USER [MJ_Connect] WITHOUT LOGIN
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
DECLARE @associate bit
SELECT @associate = CASE SERVERPROPERTY('EngineEdition') WHEN 5 THEN 1 ELSE 0 END
IF @associate = 0 EXEC sp_executesql N'SELECT @count = COUNT(*) FROM master.dbo.syslogins WHERE loginname = N''MJ_Connect_Dev''', N'@count bit OUT', @associate OUT
IF @associate = 1
BEGIN
    PRINT N'Creating user [MJ_Connect_Dev] and mapping to the login [MJ_Connect_Dev]'
    CREATE USER [MJ_Connect_Dev] FOR LOGIN [MJ_Connect_Dev]
END
ELSE
BEGIN
    PRINT N'Creating user [MJ_Connect_Dev] without login'
    CREATE USER [MJ_Connect_Dev] WITHOUT LOGIN
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating role cdp_BI'
GO
CREATE ROLE [cdp_BI]
AUTHORIZATION [db_securityadmin]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating role cdp_CodeGen'
GO
CREATE ROLE [cdp_CodeGen]
AUTHORIZATION [db_securityadmin]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating role cdp_Developer'
GO
CREATE ROLE [cdp_Developer]
AUTHORIZATION [db_securityadmin]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating role cdp_Integration'
GO
CREATE ROLE [cdp_Integration]
AUTHORIZATION [db_securityadmin]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating role cdp_UI'
GO
CREATE ROLE [cdp_UI]
AUTHORIZATION [db_securityadmin]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering members of role cdp_UI'
GO
ALTER ROLE [cdp_UI] ADD MEMBER [MJ_Connect]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
ALTER ROLE [cdp_UI] ADD MEMBER [MJ_Connect_Dev]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating schemas'
GO
CREATE SCHEMA [admin]
AUTHORIZATION [dbo]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating types'
GO
CREATE TYPE [admin].[IDListTableType] AS TABLE
(
[ID] [int] NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[Conversation]'
GO
CREATE TABLE [admin].[Conversation]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[UserID] [int] NOT NULL,
[ExternalID] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Name] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_Conversation_DateCreated] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_Conversation_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_Conversation] on [admin].[Conversation]'
GO
ALTER TABLE [admin].[Conversation] ADD CONSTRAINT [PK_Conversation] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[ConversationDetail]'
GO
CREATE TABLE [admin].[ConversationDetail]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[ConversationID] [int] NOT NULL,
[ExternalID] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Role] [nvarchar] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL CONSTRAINT [DF_ConversationDetail_Role] DEFAULT (user_name()),
[Message] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Error] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_ConversationDetail_DateCreated] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_ConversationDetail_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_ConversationDetail] on [admin].[ConversationDetail]'
GO
ALTER TABLE [admin].[ConversationDetail] ADD CONSTRAINT [PK_ConversationDetail] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[User]'
GO
CREATE TABLE [admin].[User]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[FirstName] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[LastName] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Title] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Email] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Type] [nchar] (15) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[IsActive] [bit] NOT NULL CONSTRAINT [DF_User_IsActive] DEFAULT ((0)),
[LinkedRecordType] [nchar] (10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL CONSTRAINT [DF_User_LinkedRecordType] DEFAULT (N'None'),
[EmployeeID] [int] NULL,
[LinkedEntityID] [int] NULL,
[LinkedEntityRecordID] [int] NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_User_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_User_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_ApplicationUser] on [admin].[User]'
GO
ALTER TABLE [admin].[User] ADD CONSTRAINT [PK_ApplicationUser] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[Dashboard]'
GO
CREATE TABLE [admin].[Dashboard]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[UIConfigDetails] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[UserID] [int] NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_Dashboard] on [admin].[Dashboard]'
GO
ALTER TABLE [admin].[Dashboard] ADD CONSTRAINT [PK_Dashboard] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[Employee]'
GO
CREATE TABLE [admin].[Employee]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[BCMID] [uniqueidentifier] NOT NULL CONSTRAINT [DF_Employee_BCMID] DEFAULT (newid()),
[FirstName] [nvarchar] (30) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[LastName] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Title] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Email] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Phone] [nvarchar] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Active] [bit] NOT NULL CONSTRAINT [DF__Employee__Active__5D95E53A] DEFAULT ((1)),
[CompanyID] [int] NOT NULL,
[SupervisorID] [int] NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_Employee_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_Employee_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK__Employee__3214EC2755313CC7] on [admin].[Employee]'
GO
ALTER TABLE [admin].[Employee] ADD CONSTRAINT [PK__Employee__3214EC2755313CC7] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding constraints to [admin].[Employee]'
GO
ALTER TABLE [admin].[Employee] ADD CONSTRAINT [UQ__Employee__Email] UNIQUE NONCLUSTERED ([Email])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[EmployeeRole]'
GO
CREATE TABLE [admin].[EmployeeRole]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[EmployeeID] [int] NOT NULL,
[RoleID] [int] NOT NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_EmployeeRole_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_EmployeeRole_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK__Employee__C27FE3125986E6A3] on [admin].[EmployeeRole]'
GO
ALTER TABLE [admin].[EmployeeRole] ADD CONSTRAINT [PK__Employee__C27FE3125986E6A3] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[Role]'
GO
CREATE TABLE [admin].[Role]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (500) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[AzureID] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[SQLName] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_Role_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_Role_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK__Role__3214EC27B72328F8] on [admin].[Role]'
GO
ALTER TABLE [admin].[Role] ADD CONSTRAINT [PK__Role__3214EC27B72328F8] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding constraints to [admin].[Role]'
GO
ALTER TABLE [admin].[Role] ADD CONSTRAINT [UQ__Role__737584F6A210197E] UNIQUE NONCLUSTERED ([Name])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[EmployeeSkill]'
GO
CREATE TABLE [admin].[EmployeeSkill]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[EmployeeID] [int] NOT NULL,
[SkillID] [char] (36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_EmployeeSkill_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_EmployeeSkill_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK__Employee__172A46EF36387801] on [admin].[EmployeeSkill]'
GO
ALTER TABLE [admin].[EmployeeSkill] ADD CONSTRAINT [PK__Employee__172A46EF36387801] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[Skill]'
GO
CREATE TABLE [admin].[Skill]
(
[ID] [char] (36) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Name] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[ParentID] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_Skill_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_Skill_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK__Skill__3214EC2714679AE5] on [admin].[Skill]'
GO
ALTER TABLE [admin].[Skill] ADD CONSTRAINT [PK__Skill__3214EC2714679AE5] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[Report]'
GO
CREATE TABLE [admin].[Report]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[UserID] [int] NOT NULL,
[SharingScope] [nvarchar] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL CONSTRAINT [DF_Report_SharingScope] DEFAULT (N'Personal'),
[ConversationID] [int] NULL,
[ConversationDetailID] [int] NULL,
[ReportSQL] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[ReportConfiguration] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[OutputTriggerTypeID] [int] NULL,
[OutputFormatTypeID] [int] NULL,
[OutputDeliveryTypeID] [int] NULL,
[OutputEventID] [int] NULL,
[OutputFrequency] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[OutputTargetEmail] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[OutputWorkflowID] [int] NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_Report_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_Report_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_Report] on [admin].[Report]'
GO
ALTER TABLE [admin].[Report] ADD CONSTRAINT [PK_Report] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[OutputDeliveryType]'
GO
CREATE TABLE [admin].[OutputDeliveryType]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_OutputDeliveryType] on [admin].[OutputDeliveryType]'
GO
ALTER TABLE [admin].[OutputDeliveryType] ADD CONSTRAINT [PK_OutputDeliveryType] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[OutputFormatType]'
GO
CREATE TABLE [admin].[OutputFormatType]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[DisplayFormat] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_OutputFormatType] on [admin].[OutputFormatType]'
GO
ALTER TABLE [admin].[OutputFormatType] ADD CONSTRAINT [PK_OutputFormatType] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[OutputTriggerType]'
GO
CREATE TABLE [admin].[OutputTriggerType]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_OutputTriggerType] on [admin].[OutputTriggerType]'
GO
ALTER TABLE [admin].[OutputTriggerType] ADD CONSTRAINT [PK_OutputTriggerType] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[Workflow]'
GO
CREATE TABLE [admin].[Workflow]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[WorkflowEngineName] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[CompanyName] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[ExternalSystemRecordID] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_Workflow_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_Workflow_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_Workflow] on [admin].[Workflow]'
GO
ALTER TABLE [admin].[Workflow] ADD CONSTRAINT [PK_Workflow] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding constraints to [admin].[Workflow]'
GO
ALTER TABLE [admin].[Workflow] ADD CONSTRAINT [UQ_Workflow_Name] UNIQUE NONCLUSTERED ([Name])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[ReportSnapshot]'
GO
CREATE TABLE [admin].[ReportSnapshot]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[ReportID] [int] NOT NULL,
[ResultSet] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_ReportSnapshot_CreatedAt] DEFAULT (getdate()),
[UserID] [int] NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_ReportSnapshot] on [admin].[ReportSnapshot]'
GO
ALTER TABLE [admin].[ReportSnapshot] ADD CONSTRAINT [PK_ReportSnapshot] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[Entity]'
GO
CREATE TABLE [admin].[Entity]
(
[ID] [int] NOT NULL,
[ParentID] [int] NULL,
[Name] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[NameSuffix] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[BaseTable] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[BaseView] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[BaseViewGenerated] [bit] NOT NULL CONSTRAINT [DF_Entity_BaseViewGenerated] DEFAULT ((1)),
[SchemaName] [nvarchar] (25) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL CONSTRAINT [DF_Entity_Schema] DEFAULT (N'dbo'),
[VirtualEntity] [bit] NOT NULL CONSTRAINT [DF_Entity_VirtualEntity] DEFAULT ((0)),
[TrackRecordChanges] [bit] NOT NULL CONSTRAINT [DF_Entity_TrackRecordChanges] DEFAULT ((1)),
[AuditRecordAccess] [bit] NOT NULL CONSTRAINT [DF_Entity_AuditRecordAccess] DEFAULT ((1)),
[AuditViewRuns] [bit] NOT NULL CONSTRAINT [DF_Entity_AuditViewRuns] DEFAULT ((1)),
[IncludeInAPI] [bit] NOT NULL CONSTRAINT [DF_Entity_IncludeInAPI] DEFAULT ((0)),
[AllowAllRowsAPI] [bit] NOT NULL CONSTRAINT [DF_Entity_AllowReturnAllAPI] DEFAULT ((0)),
[AllowUpdateAPI] [bit] NOT NULL CONSTRAINT [DF_Entity_AllowEditsAPI] DEFAULT ((0)),
[AllowCreateAPI] [bit] NOT NULL CONSTRAINT [DF_Entity_AllowCreateAPI] DEFAULT ((0)),
[AllowDeleteAPI] [bit] NOT NULL CONSTRAINT [DF_Entity_AllowDeleteAPI] DEFAULT ((0)),
[CustomResolverAPI] [bit] NOT NULL CONSTRAINT [DF_Entity_CustomResolverAPI] DEFAULT ((0)),
[AllowUserSearchAPI] [bit] NOT NULL CONSTRAINT [DF_Entity_AllowUserSearchAPI] DEFAULT ((0)),
[FullTextSearchEnabled] [bit] NOT NULL CONSTRAINT [DF_Entity_FullTextSearchEnabled] DEFAULT ((0)),
[FullTextCatalog] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[FullTextCatalogGenerated] [bit] NOT NULL CONSTRAINT [DF_Entity_FullTextCatalogGenerated] DEFAULT ((1)),
[FullTextIndex] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[FullTextIndexGenerated] [bit] NOT NULL CONSTRAINT [DF_Entity_FullTextIndexGenerated] DEFAULT ((1)),
[FullTextSearchFunction] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[FullTextSearchFunctionGenerated] [bit] NOT NULL CONSTRAINT [DF_Entity_FullTextSearchFunctionGenerated] DEFAULT ((1)),
[UserViewMaxRows] [int] NULL CONSTRAINT [DF_Entity_UserViewMaxRows] DEFAULT ((1000)),
[spCreate] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[spUpdate] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[spDelete] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[spCreateGenerated] [bit] NOT NULL CONSTRAINT [DF_Entity_spCreateGenerated] DEFAULT ((1)),
[spUpdateGenerated] [bit] NOT NULL CONSTRAINT [DF_Entity_spUpdateGenerated] DEFAULT ((1)),
[spDeleteGenerated] [bit] NOT NULL CONSTRAINT [DF_Entity_spDeleteGenerated] DEFAULT ((1)),
[CascadeDeletes] [bit] NOT NULL CONSTRAINT [DF_Entity_CascadeDeletes] DEFAULT ((0)),
[UserFormGenerated] [bit] NOT NULL CONSTRAINT [DF_Entity_UserFormGenerated] DEFAULT ((1)),
[EntityObjectSubclassName] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[EntityObjectSubclassImport] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_Entity_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_Entity_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_Entity] on [admin].[Entity]'
GO
ALTER TABLE [admin].[Entity] ADD CONSTRAINT [PK_Entity] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating index [UQ_Entity_Name] on [admin].[Entity]'
GO
CREATE UNIQUE NONCLUSTERED INDEX [UQ_Entity_Name] ON [admin].[Entity] ([Name])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[ResourceType]'
GO
CREATE TABLE [admin].[ResourceType]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[DisplayName] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Icon] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[EntityID] [int] NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_ResourceType_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_ResourceType_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_ResourceType] on [admin].[ResourceType]'
GO
ALTER TABLE [admin].[ResourceType] ADD CONSTRAINT [PK_ResourceType] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding constraints to [admin].[ResourceType]'
GO
ALTER TABLE [admin].[ResourceType] ADD CONSTRAINT [UQ_ResourceType_Name] UNIQUE NONCLUSTERED ([Name])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[SystemEvent]'
GO
CREATE TABLE [admin].[SystemEvent]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Type] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[EntityID] [int] NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_SystemEvent] on [admin].[SystemEvent]'
GO
ALTER TABLE [admin].[SystemEvent] ADD CONSTRAINT [PK_SystemEvent] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[TaggedItem]'
GO
CREATE TABLE [admin].[TaggedItem]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[TagID] [int] NOT NULL,
[EntityID] [int] NOT NULL,
[RecordID] [int] NOT NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_TaggedItem] on [admin].[TaggedItem]'
GO
ALTER TABLE [admin].[TaggedItem] ADD CONSTRAINT [PK_TaggedItem] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[Tag]'
GO
CREATE TABLE [admin].[Tag]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[DisplayName] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[ParentID] [int] NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_Tag] on [admin].[Tag]'
GO
ALTER TABLE [admin].[Tag] ADD CONSTRAINT [PK_Tag] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[WorkspaceItem]'
GO
CREATE TABLE [admin].[WorkspaceItem]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[WorkSpaceID] [int] NOT NULL,
[ResourceTypeID] [int] NOT NULL,
[ResourceRecordID] [int] NULL,
[Sequence] [int] NOT NULL,
[Configuration] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_WorkspaceItem] on [admin].[WorkspaceItem]'
GO
ALTER TABLE [admin].[WorkspaceItem] ADD CONSTRAINT [PK_WorkspaceItem] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[Workspace]'
GO
CREATE TABLE [admin].[Workspace]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[UserID] [int] NOT NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_Workspace] on [admin].[Workspace]'
GO
ALTER TABLE [admin].[Workspace] ADD CONSTRAINT [PK_Workspace] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[AIModel]'
GO
CREATE TABLE [admin].[AIModel]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Vendor] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[AIModelTypeID] [int] NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[DriverClass] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[DriverImportPath] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[IsActive] [bit] NOT NULL CONSTRAINT [DF_AIModel_IsActive] DEFAULT ((1)),
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_AIModel_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_AIModel_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_AIModel] on [admin].[AIModel]'
GO
ALTER TABLE [admin].[AIModel] ADD CONSTRAINT [PK_AIModel] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[AIAction]'
GO
CREATE TABLE [admin].[AIAction]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[DefaultModelID] [int] NULL,
[DefaultPrompt] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[IsActive] [bit] NOT NULL CONSTRAINT [DF_AIAction_IsActive] DEFAULT ((1)),
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_AIAction_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_AIAction_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_AIAction] on [admin].[AIAction]'
GO
ALTER TABLE [admin].[AIAction] ADD CONSTRAINT [PK_AIAction] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[AIModelType]'
GO
CREATE TABLE [admin].[AIModelType]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_AIModelType] on [admin].[AIModelType]'
GO
ALTER TABLE [admin].[AIModelType] ADD CONSTRAINT [PK_AIModelType] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[AIModelAction]'
GO
CREATE TABLE [admin].[AIModelAction]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[AIModelID] [int] NOT NULL,
[AIActionID] [int] NOT NULL,
[IsActive] [bit] NOT NULL CONSTRAINT [DF_AIModelAction_IsActive] DEFAULT ((1)),
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_AIModelAction_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_AIModelAction_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_AIModelAction] on [admin].[AIModelAction]'
GO
ALTER TABLE [admin].[AIModelAction] ADD CONSTRAINT [PK_AIModelAction] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[Application]'
GO
CREATE TABLE [admin].[Application]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (500) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_Application_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_Application_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_Application] on [admin].[Application]'
GO
ALTER TABLE [admin].[Application] ADD CONSTRAINT [PK_Application] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding constraints to [admin].[Application]'
GO
ALTER TABLE [admin].[Application] ADD CONSTRAINT [UQ_Application_Name] UNIQUE NONCLUSTERED ([Name])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[ApplicationEntity]'
GO
CREATE TABLE [admin].[ApplicationEntity]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[ApplicationName] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[EntityID] [int] NOT NULL,
[Sequence] [int] NOT NULL,
[DefaultForNewUser] [bit] NOT NULL CONSTRAINT [DF_ApplicationEntity_DefaultForNewUser] DEFAULT ((0)),
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_ApplicationEntity_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_ApplicationEntity_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_ApplicationEntity] on [admin].[ApplicationEntity]'
GO
ALTER TABLE [admin].[ApplicationEntity] ADD CONSTRAINT [PK_ApplicationEntity] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[AuditLogType]'
GO
CREATE TABLE [admin].[AuditLogType]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[ParentID] [int] NULL,
[Name] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[AuthorizationName] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_AuditType_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_AuditType_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_AuditType] on [admin].[AuditLogType]'
GO
ALTER TABLE [admin].[AuditLogType] ADD CONSTRAINT [PK_AuditType] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding constraints to [admin].[AuditLogType]'
GO
ALTER TABLE [admin].[AuditLogType] ADD CONSTRAINT [UQ_AuditLogType] UNIQUE NONCLUSTERED ([Name])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[AuditLog]'
GO
CREATE TABLE [admin].[AuditLog]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[AuditLogTypeName] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[UserID] [int] NOT NULL,
[AuthorizationName] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Status] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL CONSTRAINT [DF_AuditLog_Status] DEFAULT (N'Allow'),
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Details] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[EntityID] [int] NULL,
[RecordID] [int] NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_AuditLog_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_AuditLog_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_AuditLog] on [admin].[AuditLog]'
GO
ALTER TABLE [admin].[AuditLog] ADD CONSTRAINT [PK_AuditLog] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[Authorization]'
GO
CREATE TABLE [admin].[Authorization]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[ParentID] [int] NULL,
[Name] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[IsActive] [bit] NOT NULL CONSTRAINT [DF_Authorization_IsActive] DEFAULT ((1)),
[UseAuditLog] [bit] NOT NULL CONSTRAINT [DF_Authorization_UseAuditLog] DEFAULT ((1)),
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_Authorization_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_Authorization_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_Authorization] on [admin].[Authorization]'
GO
ALTER TABLE [admin].[Authorization] ADD CONSTRAINT [PK_Authorization] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding constraints to [admin].[Authorization]'
GO
ALTER TABLE [admin].[Authorization] ADD CONSTRAINT [UQ_Authorization] UNIQUE NONCLUSTERED ([Name])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[AuthorizationRole]'
GO
CREATE TABLE [admin].[AuthorizationRole]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[AuthorizationName] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[RoleName] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Type] [nchar] (10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL CONSTRAINT [DF_AuthorizationRole_Type] DEFAULT (N'grant'),
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_AuthorizationRole_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_AuthorizationRole_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_AuthorizationRole] on [admin].[AuthorizationRole]'
GO
ALTER TABLE [admin].[AuthorizationRole] ADD CONSTRAINT [PK_AuthorizationRole] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[Company]'
GO
CREATE TABLE [admin].[Company]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (200) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Website] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[LogoURL] [nvarchar] (500) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_Company_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_Company_UpdatedAt] DEFAULT (getdate()),
[Domain] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK__Company__3214EC278DAF44DD] on [admin].[Company]'
GO
ALTER TABLE [admin].[Company] ADD CONSTRAINT [PK__Company__3214EC278DAF44DD] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding constraints to [admin].[Company]'
GO
ALTER TABLE [admin].[Company] ADD CONSTRAINT [UQ_Company_Name] UNIQUE NONCLUSTERED ([Name])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[CompanyIntegration]'
GO
CREATE TABLE [admin].[CompanyIntegration]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[CompanyName] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[IntegrationName] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[IsActive] [bit] NULL,
[AccessToken] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[RefreshToken] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[TokenExpirationDate] [datetime] NULL,
[APIKey] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_CompanyIntegration_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_CompanyIntegration_UpdatedAt] DEFAULT (getdate()),
[ExternalSystemID] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[IsExternalSystemReadOnly] [bit] NOT NULL CONSTRAINT [DF__CompanyIn__IsExt__6A07746E] DEFAULT ((0)),
[ClientID] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[ClientSecret] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CustomAttribute1] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK__CompanyI__3214EC2739C558AB] on [admin].[CompanyIntegration]'
GO
ALTER TABLE [admin].[CompanyIntegration] ADD CONSTRAINT [PK__CompanyI__3214EC2739C558AB] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[Integration]'
GO
CREATE TABLE [admin].[Integration]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[NavigationBaseURL] [nvarchar] (500) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[ClassName] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[ImportPath] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[BatchMaxRequestCount] [int] NOT NULL CONSTRAINT [DF__Integrati__Batch__522FEADD] DEFAULT ((-1)),
[BatchRequestWaitTime] [int] NOT NULL CONSTRAINT [DF__Integrati__Batch__53240F16] DEFAULT ((-1)),
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_Integration_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_Integration_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK__Integrat__3214EC27B672ECF0] on [admin].[Integration]'
GO
ALTER TABLE [admin].[Integration] ADD CONSTRAINT [PK__Integrat__3214EC27B672ECF0] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding constraints to [admin].[Integration]'
GO
ALTER TABLE [admin].[Integration] ADD CONSTRAINT [UQ_Integration_Name] UNIQUE NONCLUSTERED ([Name])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[CompanyIntegrationRecordMap]'
GO
CREATE TABLE [admin].[CompanyIntegrationRecordMap]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[CompanyIntegrationID] [int] NOT NULL,
[ExternalSystemRecordID] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[EntityID] [int] NOT NULL,
[EntityRecordID] [int] NOT NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_CompanyIntegrationRecordMap_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_CompanyIntegrationRecordMap_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_CompanyIntegrationRecordMap] on [admin].[CompanyIntegrationRecordMap]'
GO
ALTER TABLE [admin].[CompanyIntegrationRecordMap] ADD CONSTRAINT [PK_CompanyIntegrationRecordMap] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[CompanyIntegrationRun]'
GO
CREATE TABLE [admin].[CompanyIntegrationRun]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[CompanyIntegrationID] [int] NOT NULL,
[RunByUserID] [int] NOT NULL,
[StartedAt] [datetime] NULL,
[EndedAt] [datetime] NULL,
[TotalRecords] [int] NOT NULL,
[Comments] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_CompanyIntegrationRun] on [admin].[CompanyIntegrationRun]'
GO
ALTER TABLE [admin].[CompanyIntegrationRun] ADD CONSTRAINT [PK_CompanyIntegrationRun] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[CompanyIntegrationRunAPILog]'
GO
CREATE TABLE [admin].[CompanyIntegrationRunAPILog]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[CompanyIntegrationRunID] [int] NOT NULL,
[ExecutedAt] [datetime] NOT NULL CONSTRAINT [DF_CompanyIntegrationRunAPILog_ExecutedAt] DEFAULT (getdate()),
[IsSuccess] [bit] NOT NULL CONSTRAINT [DF__CompanyIn__IsSuc__753864A1] DEFAULT ((0)),
[RequestMethod] [nvarchar] (12) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[URL] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Parameters] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_CompanyIntegrationRunAPICall] on [admin].[CompanyIntegrationRunAPILog]'
GO
ALTER TABLE [admin].[CompanyIntegrationRunAPILog] ADD CONSTRAINT [PK_CompanyIntegrationRunAPICall] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[CompanyIntegrationRunDetail]'
GO
CREATE TABLE [admin].[CompanyIntegrationRunDetail]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[CompanyIntegrationRunID] [int] NOT NULL,
[EntityID] [int] NOT NULL,
[RecordID] [int] NOT NULL,
[Action] [nchar] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[ExecutedAt] [datetime] NOT NULL CONSTRAINT [DF_CompanyIntegrationRunDetail_ExecutedAt] DEFAULT (getdate()),
[IsSuccess] [bit] NOT NULL CONSTRAINT [DF__CompanyIn__IsSuc__2AA05119] DEFAULT ((0))
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_CompanyIntegrationRunDetail] on [admin].[CompanyIntegrationRunDetail]'
GO
ALTER TABLE [admin].[CompanyIntegrationRunDetail] ADD CONSTRAINT [PK_CompanyIntegrationRunDetail] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[Dataset]'
GO
CREATE TABLE [admin].[Dataset]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_Dataset_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_Dataset_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_Dataset] on [admin].[Dataset]'
GO
ALTER TABLE [admin].[Dataset] ADD CONSTRAINT [PK_Dataset] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding constraints to [admin].[Dataset]'
GO
ALTER TABLE [admin].[Dataset] ADD CONSTRAINT [UQ_Dataset_Name] UNIQUE NONCLUSTERED ([Name])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[DatasetItem]'
GO
CREATE TABLE [admin].[DatasetItem]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Code] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[DatasetName] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Sequence] [int] NOT NULL CONSTRAINT [DF_DatasetItem_Sequence] DEFAULT ((0)),
[EntityID] [int] NOT NULL,
[WhereClause] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[DateFieldToCheck] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_DatasetItem_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_DatasetItem_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_DatasetItem] on [admin].[DatasetItem]'
GO
ALTER TABLE [admin].[DatasetItem] ADD CONSTRAINT [PK_DatasetItem] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[EmployeeCompanyIntegration]'
GO
CREATE TABLE [admin].[EmployeeCompanyIntegration]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[EmployeeID] [int] NOT NULL,
[CompanyIntegrationID] [int] NOT NULL,
[ExternalSystemRecordID] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[IsActive] [bit] NOT NULL CONSTRAINT [DF__EmployeeC__IsAct__09FE775D] DEFAULT ((1)),
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_EmployeeCompanyIntegration_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_EmployeeCompanyIntegration_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_EmployeeCompanyIntegration] on [admin].[EmployeeCompanyIntegration]'
GO
ALTER TABLE [admin].[EmployeeCompanyIntegration] ADD CONSTRAINT [PK_EmployeeCompanyIntegration] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[EntityAIAction]'
GO
CREATE TABLE [admin].[EntityAIAction]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[EntityID] [int] NOT NULL,
[AIActionID] [int] NOT NULL,
[AIModelID] [int] NULL,
[Name] [nvarchar] (25) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Prompt] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[TriggerEvent] [nchar] (15) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL CONSTRAINT [DF_EntityAIAction_ExecutionTiming] DEFAULT (N'After Save'),
[UserMessage] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[OutputType] [nchar] (10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL CONSTRAINT [DF_EntityAIAction_OutputRoute] DEFAULT (N'FIeld'),
[OutputField] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[SkipIfOutputFieldNotEmpty] [bit] NOT NULL CONSTRAINT [DF_EntityAIAction_SkipIfOutputFieldNotEmpty] DEFAULT ((1)),
[OutputEntityID] [int] NULL,
[Comments] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_EntityAIAction] on [admin].[EntityAIAction]'
GO
ALTER TABLE [admin].[EntityAIAction] ADD CONSTRAINT [PK_EntityAIAction] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[EntityField]'
GO
CREATE TABLE [admin].[EntityField]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[EntityID] [int] NOT NULL,
[Sequence] [int] NOT NULL CONSTRAINT [DF_EntityField_Sequence] DEFAULT ((0)),
[Name] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[DisplayName] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Category] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Type] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Length] [int] NULL,
[Precision] [int] NULL,
[Scale] [int] NULL,
[AllowsNull] [bit] NOT NULL CONSTRAINT [DF_EntityField_AllowsNull] DEFAULT ((1)),
[DefaultValue] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[AutoIncrement] [bit] NOT NULL CONSTRAINT [DF_EntityField_AutoIncrement] DEFAULT ((0)),
[ValueListType] [nvarchar] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL CONSTRAINT [DF_EntityField_ValueListType] DEFAULT (N'None'),
[ExtendedType] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[DefaultInView] [bit] NOT NULL CONSTRAINT [DF_EntityField_DefaultInGrid] DEFAULT ((0)),
[ViewCellTemplate] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[DefaultColumnWidth] [int] NULL,
[AllowUpdateAPI] [bit] NOT NULL CONSTRAINT [DF_EntityField_AllowEditAPI] DEFAULT ((1)),
[AllowUpdateInView] [bit] NOT NULL CONSTRAINT [DF_EntityField_AllowViewEditing] DEFAULT ((1)),
[IncludeInUserSearchAPI] [bit] NOT NULL CONSTRAINT [DF_EntityField_IncludeInUserSearchAPI] DEFAULT ((0)),
[FullTextSearchEnabled] [bit] NOT NULL CONSTRAINT [DF_EntityField_FullTextSearchEnabled] DEFAULT ((0)),
[UserSearchParamFormatAPI] [nvarchar] (500) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[IncludeInGeneratedForm] [bit] NOT NULL CONSTRAINT [DF_EntityField_IncludeInGeneratedForm] DEFAULT ((1)),
[GeneratedFormSection] [nvarchar] (10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL CONSTRAINT [DF_EntityField_GeneratedFormSection] DEFAULT (N'Details'),
[IsVirtual] [bit] NOT NULL CONSTRAINT [DF_EntityField_IsVirtual] DEFAULT ((0)),
[IsNameField] [bit] NOT NULL CONSTRAINT [DF_EntityField_IsNameField] DEFAULT ((0)),
[RelatedEntityID] [int] NULL,
[RelatedEntityFieldName] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[IncludeRelatedEntityNameFieldInBaseView] [bit] NOT NULL CONSTRAINT [DF_EntityField_IncludeRelatedEntityNameFieldInBaseView] DEFAULT ((1)),
[RelatedEntityNameFieldMap] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_EntityField_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_EntityField_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_EntityField] on [admin].[EntityField]'
GO
ALTER TABLE [admin].[EntityField] ADD CONSTRAINT [PK_EntityField] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating index [UQ_EntityField_EntityID_Name] on [admin].[EntityField]'
GO
CREATE UNIQUE NONCLUSTERED INDEX [UQ_EntityField_EntityID_Name] ON [admin].[EntityField] ([EntityID], [Name])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[EntityFieldValue]'
GO
CREATE TABLE [admin].[EntityFieldValue]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[EntityID] [int] NOT NULL,
[EntityFieldName] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Sequence] [int] NOT NULL,
[Value] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Code] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_EntityFieldValue_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_EntityFieldValue_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_EntityFieldValue] on [admin].[EntityFieldValue]'
GO
ALTER TABLE [admin].[EntityFieldValue] ADD CONSTRAINT [PK_EntityFieldValue] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[RowLevelSecurityFilter]'
GO
CREATE TABLE [admin].[RowLevelSecurityFilter]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[FilterText] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_RowLevelSecurityFilter_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_RowLevelSecurityFilter_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_RowLevelSecurityFilter] on [admin].[RowLevelSecurityFilter]'
GO
ALTER TABLE [admin].[RowLevelSecurityFilter] ADD CONSTRAINT [PK_RowLevelSecurityFilter] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[EntityPermission]'
GO
CREATE TABLE [admin].[EntityPermission]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[EntityID] [int] NOT NULL,
[RoleName] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CanCreate] [bit] NOT NULL CONSTRAINT [DF_EntityPermission_CanCreate] DEFAULT ((0)),
[CanRead] [bit] NOT NULL CONSTRAINT [DF_EntityPermission_CanRead] DEFAULT ((0)),
[CanUpdate] [bit] NOT NULL CONSTRAINT [DF_EntityPermission_CanUpdate] DEFAULT ((0)),
[CanDelete] [bit] NOT NULL CONSTRAINT [DF_EntityPermission_CanDelete] DEFAULT ((0)),
[ReadRLSFilterID] [int] NULL,
[CreateRLSFilterID] [int] NULL,
[UpdateRLSFilterID] [int] NULL,
[DeleteRLSFilterID] [int] NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_EntityPermission_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_EntityPermission_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_EntityPermission] on [admin].[EntityPermission]'
GO
ALTER TABLE [admin].[EntityPermission] ADD CONSTRAINT [PK_EntityPermission] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[EntityRelationship]'
GO
CREATE TABLE [admin].[EntityRelationship]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[EntityID] [int] NOT NULL,
[RelatedEntityID] [int] NOT NULL,
[BundleInAPI] [bit] NOT NULL CONSTRAINT [DF_admin.EntityRelationships_BundleInAPI] DEFAULT ((1)),
[IncludeInParentAllQuery] [bit] NOT NULL CONSTRAINT [DF_EntityRelationship_IncludeInParentAllQuery] DEFAULT ((0)),
[Type] [nchar] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL CONSTRAINT [DF_EntityRelationship_Type] DEFAULT (N'One To Many'),
[EntityKeyField] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[RelatedEntityJoinField] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[JoinView] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[JoinEntityJoinField] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[JoinEntityInverseJoinField] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[DisplayInForm] [bit] NOT NULL CONSTRAINT [DF_EntityRelationship_DisplayInForm] DEFAULT ((1)),
[DisplayName] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[DisplayUserViewGUID] [uniqueidentifier] NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_EntityRelationship_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_EntityRelationship_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_admin.EntityRelationships] on [admin].[EntityRelationship]'
GO
ALTER TABLE [admin].[EntityRelationship] ADD CONSTRAINT [PK_admin.EntityRelationships] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[UserView]'
GO
CREATE TABLE [admin].[UserView]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[UserID] [int] NOT NULL,
[EntityID] [int] NOT NULL,
[Name] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[GUID] [uniqueidentifier] NOT NULL CONSTRAINT [DF_UserView_UniqueCode] DEFAULT (newid()),
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[IsShared] [bit] NOT NULL CONSTRAINT [DF_UserView_IsShared] DEFAULT ((0)),
[IsDefault] [bit] NOT NULL CONSTRAINT [DF_UserView_IsDefault] DEFAULT ((0)),
[GridState] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[FilterState] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CustomFilterState] [bit] NOT NULL CONSTRAINT [DF_UserView_CustomFilterState] DEFAULT ((0)),
[SmartFilterEnabled] [bit] NOT NULL CONSTRAINT [DF_UserView_SmartFilterEnabled] DEFAULT ((0)),
[SmartFilterPrompt] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[SmartFilterWhereClause] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[SmartFilterExplanation] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[WhereClause] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CustomWhereClause] [bit] NOT NULL CONSTRAINT [DF_UserView_CustomWhereClause] DEFAULT ((0)),
[SortState] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NULL CONSTRAINT [DF_UserView_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NULL CONSTRAINT [DF_UserView_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_UserView] on [admin].[UserView]'
GO
ALTER TABLE [admin].[UserView] ADD CONSTRAINT [PK_UserView] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding constraints to [admin].[UserView]'
GO
ALTER TABLE [admin].[UserView] ADD CONSTRAINT [UQ_UserView_GUID] UNIQUE NONCLUSTERED ([GUID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[ErrorLog]'
GO
CREATE TABLE [admin].[ErrorLog]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[CompanyIntegrationRunID] [int] NULL,
[CompanyIntegrationRunDetailID] [int] NULL,
[Code] [nchar] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Message] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_ErrorLog_CreatedAt] DEFAULT (getdate()),
[CreatedBy] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL CONSTRAINT [DF_ErrorLog_CreatedBy] DEFAULT (suser_name()),
[Status] [nvarchar] (10) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Category] [nvarchar] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Details] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_ErrorLog] on [admin].[ErrorLog]'
GO
ALTER TABLE [admin].[ErrorLog] ADD CONSTRAINT [PK_ErrorLog] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[IntegrationURLFormat]'
GO
CREATE TABLE [admin].[IntegrationURLFormat]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[IntegrationName] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[EntityID] [int] NOT NULL,
[URLFormat] [nvarchar] (500) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_IntegrationURLFormat] on [admin].[IntegrationURLFormat]'
GO
ALTER TABLE [admin].[IntegrationURLFormat] ADD CONSTRAINT [PK_IntegrationURLFormat] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[List]'
GO
CREATE TABLE [admin].[List]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[EntityID] [int] NULL,
[UserID] [int] NOT NULL,
[ExternalSystemRecordID] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CompanyIntegrationID] [int] NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_List_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_List_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_List] on [admin].[List]'
GO
ALTER TABLE [admin].[List] ADD CONSTRAINT [PK_List] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating index [IX_List_Name] on [admin].[List]'
GO
CREATE NONCLUSTERED INDEX [IX_List_Name] ON [admin].[List] ([Name])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[ListDetail]'
GO
CREATE TABLE [admin].[ListDetail]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[ListID] [int] NOT NULL,
[RecordID] [int] NOT NULL,
[Sequence] [int] NOT NULL CONSTRAINT [DF_ListDetail_Sequence] DEFAULT ((0))
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_ListDetail] on [admin].[ListDetail]'
GO
ALTER TABLE [admin].[ListDetail] ADD CONSTRAINT [PK_ListDetail] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[QueueType]'
GO
CREATE TABLE [admin].[QueueType]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[DriverClass] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[DriverImportPath] [nvarchar] (200) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[IsActive] [bit] NOT NULL CONSTRAINT [DF_QueueType_IsActive] DEFAULT ((1))
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_QueueType] on [admin].[QueueType]'
GO
ALTER TABLE [admin].[QueueType] ADD CONSTRAINT [PK_QueueType] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[Queue]'
GO
CREATE TABLE [admin].[Queue]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[QueueTypeID] [int] NOT NULL,
[IsActive] [bit] NOT NULL CONSTRAINT [DF_Queue_IsActive] DEFAULT ((0)),
[ProcessPID] [int] NULL,
[ProcessPlatform] [nvarchar] (30) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[ProcessVersion] [nvarchar] (15) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[ProcessCwd] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[ProcessIPAddress] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[ProcessMacAddress] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[ProcessOSName] [nvarchar] (25) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[ProcessOSVersion] [nvarchar] (10) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[ProcessHostName] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[ProcessUserID] [nvarchar] (25) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[ProcessUserName] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[LastHeartbeat] [datetime] NOT NULL CONSTRAINT [DF_Queue_LastHeartbeat] DEFAULT (getdate()),
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_Queue_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_Queue_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_Queue] on [admin].[Queue]'
GO
ALTER TABLE [admin].[Queue] ADD CONSTRAINT [PK_Queue] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[QueueTask]'
GO
CREATE TABLE [admin].[QueueTask]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[QueueID] [int] NOT NULL,
[Status] [nchar] (10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL CONSTRAINT [DF_QueueTask_Status] DEFAULT (N'Pending'),
[StartedAt] [datetime] NULL,
[EndedAt] [datetime] NULL,
[Data] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Options] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Output] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[ErrorMessage] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Comments] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_QueueTask] on [admin].[QueueTask]'
GO
ALTER TABLE [admin].[QueueTask] ADD CONSTRAINT [PK_QueueTask] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[RecordChange]'
GO
CREATE TABLE [admin].[RecordChange]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[EntityID] [int] NOT NULL,
[RecordID] [int] NOT NULL,
[UserID] [int] NOT NULL,
[ChangedAt] [datetime] NOT NULL CONSTRAINT [DF_RecordChange_ChangedAt] DEFAULT (getdate()),
[ChangesJSON] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[ChangesDescription] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[FullRecordJSON] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Status] [nchar] (15) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL CONSTRAINT [DF_RecordChange_Status] DEFAULT (N'Complete'),
[Comments] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_RecordChange] on [admin].[RecordChange]'
GO
ALTER TABLE [admin].[RecordChange] ADD CONSTRAINT [PK_RecordChange] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[RecordMergeLog]'
GO
CREATE TABLE [admin].[RecordMergeLog]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[EntityID] [int] NOT NULL,
[SurvivingRecordID] [int] NOT NULL,
[InitiatedByUserID] [int] NOT NULL,
[ApprovalStatus] [nvarchar] (10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL CONSTRAINT [DF_RecordMergeLog_ApprovalStatus] DEFAULT (N'Pending'),
[ApprovedByUserID] [int] NULL,
[ProcessingStatus] [nvarchar] (10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL CONSTRAINT [DF_RecordMergeLog_Status] DEFAULT (N'Pending'),
[ProcessingStartedAt] [datetime] NOT NULL CONSTRAINT [DF_RecordMergeLog_StartedAt] DEFAULT (getdate()),
[ProcessingEndedAt] [datetime] NULL,
[ProcessingLog] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Comments] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_RecordMergeLog_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NULL CONSTRAINT [DF_RecordMergeLog_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_RecordMergeLog] on [admin].[RecordMergeLog]'
GO
ALTER TABLE [admin].[RecordMergeLog] ADD CONSTRAINT [PK_RecordMergeLog] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[RecordMergeDeletionLog]'
GO
CREATE TABLE [admin].[RecordMergeDeletionLog]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[RecordMergeLogID] [int] NOT NULL,
[DeletedRecordID] [int] NOT NULL,
[Status] [nvarchar] (10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL CONSTRAINT [DF_RecordMergeDeletionLog_Status] DEFAULT (N'Pending'),
[ProcessingLog] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_RecordMergeDeletionLog_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_RecordMergeDeletionLog_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_RecordMergeDeletionLog] on [admin].[RecordMergeDeletionLog]'
GO
ALTER TABLE [admin].[RecordMergeDeletionLog] ADD CONSTRAINT [PK_RecordMergeDeletionLog] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[ResourceFolder]'
GO
CREATE TABLE [admin].[ResourceFolder]
(
[ID] [int] NOT NULL,
[ParentID] [int] NULL,
[Name] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[ResourceTypeName] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[UserID] [int] NOT NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_ResourceFolder_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_ResourceFolder_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_UserViewFolder] on [admin].[ResourceFolder]'
GO
ALTER TABLE [admin].[ResourceFolder] ADD CONSTRAINT [PK_UserViewFolder] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[UserApplication]'
GO
CREATE TABLE [admin].[UserApplication]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[UserID] [int] NOT NULL,
[ApplicationID] [int] NOT NULL,
[Sequence] [int] NOT NULL CONSTRAINT [DF_UserApplication_Sequence] DEFAULT ((0)),
[IsActive] [bit] NOT NULL CONSTRAINT [DF_UserApplication_IsActive] DEFAULT ((1))
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_UserApplication] on [admin].[UserApplication]'
GO
ALTER TABLE [admin].[UserApplication] ADD CONSTRAINT [PK_UserApplication] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[UserApplicationEntity]'
GO
CREATE TABLE [admin].[UserApplicationEntity]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[UserApplicationID] [int] NOT NULL,
[EntityID] [int] NOT NULL,
[Sequence] [int] NOT NULL CONSTRAINT [DF_UserApplicationEntity_Sequence] DEFAULT ((0))
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_UserApplicationEntity] on [admin].[UserApplicationEntity]'
GO
ALTER TABLE [admin].[UserApplicationEntity] ADD CONSTRAINT [PK_UserApplicationEntity] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[UserFavorite]'
GO
CREATE TABLE [admin].[UserFavorite]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[UserID] [int] NOT NULL,
[EntityID] [int] NOT NULL,
[RecordID] [int] NOT NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_UserFavorite_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_UserFavorite_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_UserFavorite_1] on [admin].[UserFavorite]'
GO
ALTER TABLE [admin].[UserFavorite] ADD CONSTRAINT [PK_UserFavorite_1] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[UserNotification]'
GO
CREATE TABLE [admin].[UserNotification]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[UserID] [int] NOT NULL,
[Title] [nvarchar] (255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Message] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[ResourceTypeID] [int] NULL,
[ResourceRecordID] [int] NULL,
[ResourceConfiguration] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[Unread] [bit] NOT NULL CONSTRAINT [DF_Table_1_MarkedAsRead] DEFAULT ((1)),
[ReadAt] [datetime] NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_UserNotification_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_UserNotification_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_UserNotification] on [admin].[UserNotification]'
GO
ALTER TABLE [admin].[UserNotification] ADD CONSTRAINT [PK_UserNotification] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[UserRecordLog]'
GO
CREATE TABLE [admin].[UserRecordLog]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[UserID] [int] NOT NULL,
[EntityID] [int] NOT NULL,
[RecordID] [int] NOT NULL,
[EarliestAt] [datetime] NOT NULL CONSTRAINT [DF_UserRecordLog_EarliestAt] DEFAULT (getdate()),
[LatestAt] [datetime] NOT NULL CONSTRAINT [DF_UserRecordLog_LatestAt] DEFAULT (getdate()),
[TotalCount] [int] NOT NULL CONSTRAINT [DF_UserRecordLog_TotalCount] DEFAULT ((0))
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_UserRecordLog] on [admin].[UserRecordLog]'
GO
ALTER TABLE [admin].[UserRecordLog] ADD CONSTRAINT [PK_UserRecordLog] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[UserRole]'
GO
CREATE TABLE [admin].[UserRole]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[UserID] [int] NOT NULL,
[RoleName] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_UserRole_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_UserRole_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_UserRole] on [admin].[UserRole]'
GO
ALTER TABLE [admin].[UserRole] ADD CONSTRAINT [PK_UserRole] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[UserViewRun]'
GO
CREATE TABLE [admin].[UserViewRun]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[UserViewID] [int] NOT NULL,
[RunAt] [datetime] NOT NULL,
[RunByUserID] [int] NOT NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_UserViewRun] on [admin].[UserViewRun]'
GO
ALTER TABLE [admin].[UserViewRun] ADD CONSTRAINT [PK_UserViewRun] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[UserViewRunDetail]'
GO
CREATE TABLE [admin].[UserViewRunDetail]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[UserViewRunID] [int] NOT NULL,
[RecordID] [int] NOT NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_UserViewRunDetail] on [admin].[UserViewRunDetail]'
GO
ALTER TABLE [admin].[UserViewRunDetail] ADD CONSTRAINT [PK_UserViewRunDetail] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[WorkflowEngine]'
GO
CREATE TABLE [admin].[WorkflowEngine]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[Name] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[Description] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[DriverPath] [nvarchar] (500) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[DriverClass] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_WorkflowEngine_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_WorkflowEngine_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_WorkflowEngine] on [admin].[WorkflowEngine]'
GO
ALTER TABLE [admin].[WorkflowEngine] ADD CONSTRAINT [PK_WorkflowEngine] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding constraints to [admin].[WorkflowEngine]'
GO
ALTER TABLE [admin].[WorkflowEngine] ADD CONSTRAINT [IX_WorkflowEngine] UNIQUE NONCLUSTERED ([Name])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[WorkflowRun]'
GO
CREATE TABLE [admin].[WorkflowRun]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[WorkflowName] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[ExternalSystemRecordID] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[StartedAt] [datetime] NOT NULL,
[EndedAt] [datetime] NULL,
[Status] [nchar] (10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL CONSTRAINT [DF_WorkflowRun_Status] DEFAULT (N'Pending'),
[Results] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_WorkflowRun] on [admin].[WorkflowRun]'
GO
ALTER TABLE [admin].[WorkflowRun] ADD CONSTRAINT [PK_WorkflowRun] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwAuthorizationRoles]'
GO


CREATE VIEW [dbo].[vwAuthorizationRoles]
AS
SELECT 
    a.*
FROM
    [admin].[AuthorizationRole] AS a
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [admin].[SchemaInfo]'
GO
CREATE TABLE [admin].[SchemaInfo]
(
[ID] [int] NOT NULL IDENTITY(1, 1),
[SchemaName] [nvarchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
[EntityIDMin] [int] NOT NULL,
[EntityIDMax] [int] NOT NULL,
[Comments] [nvarchar] (max) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
[CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_SchemaInfo_CreatedAt] DEFAULT (getdate()),
[UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_SchemaInfo_UpdatedAt] DEFAULT (getdate())
)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating primary key [PK_SchemaInfo] on [admin].[SchemaInfo]'
GO
ALTER TABLE [admin].[SchemaInfo] ADD CONSTRAINT [PK_SchemaInfo] PRIMARY KEY CLUSTERED ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding constraints to [admin].[SchemaInfo]'
GO
ALTER TABLE [admin].[SchemaInfo] ADD CONSTRAINT [IX_SchemaInfo] UNIQUE NONCLUSTERED ([SchemaName])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spGetNextEntityID]'
GO

CREATE PROC [dbo].[spGetNextEntityID]
    @schemaName NVARCHAR(255)
AS
BEGIN
    DECLARE @EntityIDMin INT;
    DECLARE @EntityIDMax INT;
    DECLARE @MaxEntityID INT;
	DECLARE @NextID INT;

    -- STEP 1: Get EntityIDMin and EntityIDMax from admin.SchemaInfo
    SELECT 
		@EntityIDMin = EntityIDMin, @EntityIDMax = EntityIDMax
    FROM 
		admin.SchemaInfo
    WHERE 
		SchemaName = @schemaName;

    -- STEP 2: If no matching schemaName, insert a new row into admin.SchemaInfo
    IF @EntityIDMin IS NULL OR @EntityIDMax IS NULL
    BEGIN
        -- Get the maximum ID from the admin.Entity table
		DECLARE @MaxEntityIDFromSchema INT;
        SELECT @MaxEntityID = ISNULL(MAX(ID), 0) FROM admin.Entity;
		SELECT @MaxEntityIDFromSchema = ISNULL(MAX(EntityIDMax),0) FROM admin.SchemaInfo;
		IF @MaxEntityIDFromSchema > @MaxEntityID 
			SELECT @MaxEntityID = @MaxEntityIDFromSchema; -- use the max ID From the schema info table if it is higher

        -- Calculate the new EntityIDMin
        SET @EntityIDMin = CASE 
                              WHEN @MaxEntityID >= 25000001 THEN @MaxEntityID + 1
                              ELSE 25000001
                            END;

        -- Calculate the new EntityIDMax
        SET @EntityIDMax = @EntityIDMin + 24999;

        -- Insert the new row into admin.SchemaInfo
        INSERT INTO admin.SchemaInfo (SchemaName, EntityIDMin, EntityIDMax)
        VALUES (@schemaName, @EntityIDMin, @EntityIDMax);
    END

    -- STEP 3: Get the maximum ID currently in the admin.Entity table within the range
    SELECT 
		@NextID = ISNULL(MAX(ID), @EntityIDMin - 1) -- we subtract 1 from entityIDMin as it will be used the first time if Max(EntityID) is null, and below we will increment it by one to be the first ID in that range
    FROM 
		admin.Entity
    WHERE 
		ID BETWEEN @EntityIDMin AND @EntityIDMax

    -- STEP 4: Increment to get the next ID
    SET @NextID = @NextID + 1;

    -- STEP 5: Check if the next ID is within the allowed range for the schema in question
    IF @NextID > @EntityIDMax
		BEGIN
			SELECT -1 AS NextID -- calling code needs to konw this is an invalid condition
		END
	ELSE
		SELECT @NextID AS NextID
END;
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwAuditLogTypes]'
GO


CREATE VIEW [dbo].[vwAuditLogTypes]
AS
SELECT 
    a.*,
    AuditLogType_ParentID.[Name] AS [Parent]
FROM
    [admin].[AuditLogType] AS a
LEFT OUTER JOIN
    [admin].[AuditLogType] AS AuditLogType_ParentID
  ON
    [a].[ParentID] = AuditLogType_ParentID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwRowLevelSecurityFilters]'
GO


CREATE VIEW [dbo].[vwRowLevelSecurityFilters]
AS
SELECT 
    r.*
FROM
    [admin].[RowLevelSecurityFilter] AS r
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwAuditLogs]'
GO


CREATE VIEW [dbo].[vwAuditLogs]
AS
SELECT 
    a.*,
    User_UserID.[Name] AS [User],
    Entity_EntityID.[Name] AS [Entity]
FROM
    [admin].[AuditLog] AS a
INNER JOIN
    [admin].[User] AS User_UserID
  ON
    [a].[UserID] = User_UserID.[ID]
LEFT OUTER JOIN
    [admin].[Entity] AS Entity_EntityID
  ON
    [a].[EntityID] = Entity_EntityID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwAuthorizations]'
GO


CREATE VIEW [dbo].[vwAuthorizations]
AS
SELECT 
    a.*
FROM
    [admin].[Authorization] AS a
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateAuditLog]'
GO


CREATE PROCEDURE [dbo].[spCreateAuditLog]
    @AuditLogTypeName nvarchar(50),
    @UserID int,
    @AuthorizationName nvarchar(100),
    @Status nvarchar(50),
    @Description nvarchar(MAX),
    @Details nvarchar(MAX),
    @EntityID int,
    @RecordID int
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[AuditLog]
        (
            [AuditLogTypeName],
            [UserID],
            [AuthorizationName],
            [Status],
            [Description],
            [Details],
            [EntityID],
            [RecordID]
        )
    VALUES
        (
            @AuditLogTypeName,
            @UserID,
            @AuthorizationName,
            @Status,
            @Description,
            @Details,
            @EntityID,
            @RecordID
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwAuditLogs WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateAuditLog]'
GO


CREATE PROCEDURE [dbo].[spUpdateAuditLog]
    @ID int,
    @AuditLogTypeName nvarchar(50),
    @UserID int,
    @AuthorizationName nvarchar(100),
    @Status nvarchar(50),
    @Description nvarchar(MAX),
    @Details nvarchar(MAX),
    @EntityID int,
    @RecordID int
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[AuditLog]
    SET 
        [AuditLogTypeName] = @AuditLogTypeName,
        [UserID] = @UserID,
        [AuthorizationName] = @AuthorizationName,
        [Status] = @Status,
        [Description] = @Description,
        [Details] = @Details,
        [EntityID] = @EntityID,
        [RecordID] = @RecordID,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwAuditLogs WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwAIActions]'
GO


CREATE VIEW [dbo].[vwAIActions]
AS
SELECT 
    a.*,
    AIModel_DefaultModelID.[Name] AS [DefaultModel]
FROM
    [admin].[AIAction] AS a
LEFT OUTER JOIN
    [admin].[AIModel] AS AIModel_DefaultModelID
  ON
    [a].[DefaultModelID] = AIModel_DefaultModelID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwAIModels]'
GO


CREATE VIEW [dbo].[vwAIModels]
AS
SELECT 
    a.*
FROM
    [admin].[AIModel] AS a
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwEntityFieldValues]'
GO


CREATE VIEW [dbo].[vwEntityFieldValues]
AS
SELECT 
    e.*,
    EntityField_EntityID.[Name] AS [Entity]
FROM
    [admin].[EntityFieldValue] AS e
INNER JOIN
    [admin].[EntityField] AS EntityField_EntityID
  ON
    [e].[EntityID] = EntityField_EntityID.[EntityID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwEntityAIActions]'
GO


CREATE VIEW [dbo].[vwEntityAIActions]
AS
SELECT 
    e.*,
    Entity_EntityID.[Name] AS [Entity],
    AIAction_AIActionID.[Name] AS [AIAction],
    AIModel_AIModelID.[Name] AS [AIModel],
    Entity_OutputEntityID.[Name] AS [OutputEntity]
FROM
    [admin].[EntityAIAction] AS e
INNER JOIN
    [admin].[Entity] AS Entity_EntityID
  ON
    [e].[EntityID] = Entity_EntityID.[ID]
INNER JOIN
    [admin].[AIAction] AS AIAction_AIActionID
  ON
    [e].[AIActionID] = AIAction_AIActionID.[ID]
LEFT OUTER JOIN
    [admin].[AIModel] AS AIModel_AIModelID
  ON
    [e].[AIModelID] = AIModel_AIModelID.[ID]
LEFT OUTER JOIN
    [admin].[Entity] AS Entity_OutputEntityID
  ON
    [e].[OutputEntityID] = Entity_OutputEntityID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwAIModelActions]'
GO


CREATE VIEW [dbo].[vwAIModelActions]
AS
SELECT 
    a.*,
    AIModel_AIModelID.[Name] AS [AIModel],
    AIAction_AIActionID.[Name] AS [AIAction]
FROM
    [admin].[AIModelAction] AS a
INNER JOIN
    [admin].[AIModel] AS AIModel_AIModelID
  ON
    [a].[AIModelID] = AIModel_AIModelID.[ID]
INNER JOIN
    [admin].[AIAction] AS AIAction_AIActionID
  ON
    [a].[AIActionID] = AIAction_AIActionID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateAIAction]'
GO


CREATE PROCEDURE [dbo].[spUpdateAIAction]
    @ID int,
    @Name nvarchar(50),
    @Description nvarchar(MAX),
    @DefaultModelID int,
    @DefaultPrompt nvarchar(MAX),
    @IsActive bit
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[AIAction]
    SET 
        [Name] = @Name,
        [Description] = @Description,
        [DefaultModelID] = @DefaultModelID,
        [DefaultPrompt] = @DefaultPrompt,
        [IsActive] = @IsActive,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwAIActions WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateEntityAIAction]'
GO


CREATE PROCEDURE [dbo].[spUpdateEntityAIAction]
    @ID int,
    @EntityID int,
    @AIActionID int,
    @AIModelID int,
    @Name nvarchar(25),
    @Prompt nvarchar(MAX),
    @TriggerEvent nchar(15),
    @UserMessage nvarchar(MAX),
    @OutputType nchar(10),
    @OutputField nvarchar(50),
    @SkipIfOutputFieldNotEmpty bit,
    @OutputEntityID int,
    @Comments nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[EntityAIAction]
    SET 
        [EntityID] = @EntityID,
        [AIActionID] = @AIActionID,
        [AIModelID] = @AIModelID,
        [Name] = @Name,
        [Prompt] = @Prompt,
        [TriggerEvent] = @TriggerEvent,
        [UserMessage] = @UserMessage,
        [OutputType] = @OutputType,
        [OutputField] = @OutputField,
        [SkipIfOutputFieldNotEmpty] = @SkipIfOutputFieldNotEmpty,
        [OutputEntityID] = @OutputEntityID,
        [Comments] = @Comments
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwEntityAIActions WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateAIModelAction]'
GO


CREATE PROCEDURE [dbo].[spUpdateAIModelAction]
    @ID int,
    @AIModelID int,
    @AIActionID int,
    @IsActive bit
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[AIModelAction]
    SET 
        [AIModelID] = @AIModelID,
        [AIActionID] = @AIActionID,
        [IsActive] = @IsActive,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwAIModelActions WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateAIModel]'
GO


CREATE PROCEDURE [dbo].[spUpdateAIModel]
    @ID int,
    @Name nvarchar(50),
    @Vendor nvarchar(50),
    @AIModelTypeID int,
    @Description nvarchar(MAX),
    @DriverClass nvarchar(100),
    @DriverImportPath nvarchar(255),
    @IsActive bit
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[AIModel]
    SET 
        [Name] = @Name,
        [Vendor] = @Vendor,
        [AIModelTypeID] = @AIModelTypeID,
        [Description] = @Description,
        [DriverClass] = @DriverClass,
        [DriverImportPath] = @DriverImportPath,
        [IsActive] = @IsActive,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwAIModels WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwQueues]'
GO


CREATE VIEW [dbo].[vwQueues]
AS
SELECT 
    q.*,
    QueueType_QueueTypeID.[Name] AS [QueueType]
FROM
    [admin].[Queue] AS q
INNER JOIN
    [admin].[QueueType] AS QueueType_QueueTypeID
  ON
    [q].[QueueTypeID] = QueueType_QueueTypeID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwApplications]'
GO


CREATE VIEW [dbo].[vwApplications]
AS
SELECT 
    a.*
FROM
    [admin].[Application] AS a
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateApplications]'
GO

CREATE PROCEDURE [dbo].[spUpdateApplications]
    @ID int,
    @Name nvarchar(100),
    @Description nvarchar(1000)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[Application]
    SET 
        Name = @Name,
        Description = @Description
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwApplications WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwQueueTypes]'
GO


CREATE VIEW [dbo].[vwQueueTypes]
AS
SELECT 
    q.*
FROM
    [admin].[QueueType] AS q
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwDashboards]'
GO


CREATE VIEW [dbo].[vwDashboards]
AS
SELECT 
    d.*,
    User_UserID.[Name] AS [User]
FROM
    [admin].[Dashboard] AS d
LEFT OUTER JOIN
    [admin].[User] AS User_UserID
  ON
    [d].[UserID] = User_UserID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwQueueTasks]'
GO


CREATE VIEW [dbo].[vwQueueTasks]
AS
SELECT 
    q.*
FROM
    [admin].[QueueTask] AS q
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwAIModelTypes]'
GO


CREATE VIEW [dbo].[vwAIModelTypes]
AS
SELECT 
    a.*
FROM
    [admin].[AIModelType] AS a
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateQueue]'
GO


CREATE PROCEDURE [dbo].[spCreateQueue]
    @Name nvarchar(50),
    @Description nvarchar(MAX),
    @QueueTypeID int,
    @IsActive bit,
    @ProcessPID int,
    @ProcessPlatform nvarchar(30),
    @ProcessVersion nvarchar(15),
    @ProcessCwd nvarchar(100),
    @ProcessIPAddress nvarchar(50),
    @ProcessMacAddress nvarchar(50),
    @ProcessOSName nvarchar(25),
    @ProcessOSVersion nvarchar(10),
    @ProcessHostName nvarchar(50),
    @ProcessUserID nvarchar(25),
    @ProcessUserName nvarchar(50),
    @LastHeartbeat datetime
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[Queue]
        (
            [Name],
            [Description],
            [QueueTypeID],
            [IsActive],
            [ProcessPID],
            [ProcessPlatform],
            [ProcessVersion],
            [ProcessCwd],
            [ProcessIPAddress],
            [ProcessMacAddress],
            [ProcessOSName],
            [ProcessOSVersion],
            [ProcessHostName],
            [ProcessUserID],
            [ProcessUserName],
            [LastHeartbeat]
        )
    VALUES
        (
            @Name,
            @Description,
            @QueueTypeID,
            @IsActive,
            @ProcessPID,
            @ProcessPlatform,
            @ProcessVersion,
            @ProcessCwd,
            @ProcessIPAddress,
            @ProcessMacAddress,
            @ProcessOSName,
            @ProcessOSVersion,
            @ProcessHostName,
            @ProcessUserID,
            @ProcessUserName,
            @LastHeartbeat
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwQueues WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateDashboard]'
GO


CREATE PROCEDURE [dbo].[spCreateDashboard]
    @Name nvarchar(255),
    @Description nvarchar(MAX),
    @UIConfigDetails nvarchar(MAX),
    @UserID int
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[Dashboard]
        (
            [Name],
            [Description],
            [UIConfigDetails],
            [UserID]
        )
    VALUES
        (
            @Name,
            @Description,
            @UIConfigDetails,
            @UserID
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwDashboards WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateQueueTask]'
GO


CREATE PROCEDURE [dbo].[spCreateQueueTask]
    @QueueID int,
    @Status nchar(10),
    @StartedAt datetime,
    @EndedAt datetime,
    @Data nvarchar(MAX),
    @Options nvarchar(MAX),
    @Output nvarchar(MAX),
    @ErrorMessage nvarchar(MAX),
    @Comments nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[QueueTask]
        (
            [QueueID],
            [Status],
            [StartedAt],
            [EndedAt],
            [Data],
            [Options],
            [Output],
            [ErrorMessage],
            [Comments]
        )
    VALUES
        (
            @QueueID,
            @Status,
            @StartedAt,
            @EndedAt,
            @Data,
            @Options,
            @Output,
            @ErrorMessage,
            @Comments
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwQueueTasks WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spSetDefaultColumnWidthWhereNeeded]'
GO
CREATE PROC [dbo].[spSetDefaultColumnWidthWhereNeeded]
AS
/**************************************************************************************/
/* Final step - generate default column widths for columns that don't have a width set*/
/**************************************************************************************/

UPDATE
	ef 
SET 
	DefaultColumnWidth =  
	IIF(ef.Type = 'int', 50, 
		IIF(ef.Type = 'datetimeoffset', 100,
			IIF(ef.Type = 'money', 100, 
				IIF(ef.Type ='nchar', 75,
					150)))
		), 
	UpdatedAt = GETDATE()
FROM 
	admin.EntityField ef
WHERE
    ef.DefaultColumnWidth IS NULL
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateAIModelType]'
GO


CREATE PROCEDURE [dbo].[spUpdateAIModelType]
    @ID int,
    @Name nvarchar(50),
    @Description nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[AIModelType]
    SET 
        [Name] = @Name,
        [Description] = @Description
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwAIModelTypes WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateDashboard]'
GO


CREATE PROCEDURE [dbo].[spUpdateDashboard]
    @ID int,
    @Name nvarchar(255),
    @Description nvarchar(MAX),
    @UIConfigDetails nvarchar(MAX),
    @UserID int
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[Dashboard]
    SET 
        [Name] = @Name,
        [Description] = @Description,
        [UIConfigDetails] = @UIConfigDetails,
        [UserID] = @UserID
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwDashboards WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spGetMatchingAccount]'
GO



CREATE PROCEDURE [dbo].[spGetMatchingAccount] 
	
    @BCMID NVARCHAR(255) = NULL,   
    @Domain NVARCHAR(255) = NULL,
	@Name NVARCHAR(255) = NULL,
	@TaxID NVARCHAR(50) = NULL,
	@IntegrationName NVARCHAR(255) = NULL,
	@ExternalSystemID VARCHAR(100) = NULL,
	@ExternalSystemRecordID NVARCHAR(100) = NULL,
	@AccountID INT OUTPUT
AS

SET @BCMID = TRIM(@BCMID)
SET @Domain = TRIM(@Domain)
SET @Name = TRIM(@Name)
SET @IntegrationName = TRIM(@IntegrationName)
SET @ExternalSystemRecordID = TRIM(@ExternalSystemRecordID)
SET @ExternalSystemID = TRIM(@ExternalSystemID)

--Find an Account by BCMID
IF LEN(@BCMID) > 0
	SELECT TOP 1 
		@AccountID = a.ID
	FROM 
		crm.Account a
	WHERE
		a.BCMID = TRY_CONVERT(UNIQUEIDENTIFIER, @BCMID)
	ORDER BY 
		a.ID DESC

--If no Account found, try by Domain
IF @AccountID IS NULL AND LEN(@Domain) > 0
	SELECT TOP 1 
		@AccountID = a.ID
	FROM 
		crm.Account a
	WHERE
		a.Domain = @Domain
	ORDER BY 
		a.ID DESC

--If no Account found, try by TaxID (added by Amith on 29 May 2023)
IF @AccountID IS NULL AND LEN(@TaxID) > 0
	SELECT TOP 1 
		@AccountID = a.ID
	FROM 
		crm.Account a
	WHERE
		a.TaxID = @TaxID
	ORDER BY 
		a.ID DESC


--If no Account found, try by ExternalSystemRecordID
IF @AccountID IS NULL AND LEN(@ExternalSystemID) > 0 AND LEN(@ExternalSystemRecordID) > 0 AND LEN(@IntegrationName) > 0
	SELECT TOP 1 
		@AccountID = a.ID
	FROM 
		crm.Account a
	JOIN crm.AccountCompanyIntegration aci
		ON aci.AccountID = a.ID
	JOIN admin.CompanyIntegration ci
		ON aci.CompanyIntegrationID = ci.ID
	JOIN admin.Integration i
		ON i.Name = ci.IntegrationName
	WHERE
		i.Name = @IntegrationName
		AND ci.ExternalSystemID = @ExternalSystemID
		AND aci.ExternalSystemRecordID = @ExternalSystemRecordID
	ORDER BY 
		a.ID DESC

--If no Account found, try by Name
IF @AccountID IS NULL AND LEN(@Name) > 0 
	SELECT TOP 1 
		@AccountID = a.ID
	FROM 
		crm.Account a
	WHERE
		a.Name = @Name
	ORDER BY 
		a.ID DESC
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateQueue]'
GO


CREATE PROCEDURE [dbo].[spUpdateQueue]
    @ID int,
    @Name nvarchar(50),
    @Description nvarchar(MAX),
    @QueueTypeID int,
    @IsActive bit,
    @ProcessPID int,
    @ProcessPlatform nvarchar(30),
    @ProcessVersion nvarchar(15),
    @ProcessCwd nvarchar(100),
    @ProcessIPAddress nvarchar(50),
    @ProcessMacAddress nvarchar(50),
    @ProcessOSName nvarchar(25),
    @ProcessOSVersion nvarchar(10),
    @ProcessHostName nvarchar(50),
    @ProcessUserID nvarchar(25),
    @ProcessUserName nvarchar(50),
    @LastHeartbeat datetime
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[Queue]
    SET 
        [Name] = @Name,
        [Description] = @Description,
        [QueueTypeID] = @QueueTypeID,
        [IsActive] = @IsActive,
        [ProcessPID] = @ProcessPID,
        [ProcessPlatform] = @ProcessPlatform,
        [ProcessVersion] = @ProcessVersion,
        [ProcessCwd] = @ProcessCwd,
        [ProcessIPAddress] = @ProcessIPAddress,
        [ProcessMacAddress] = @ProcessMacAddress,
        [ProcessOSName] = @ProcessOSName,
        [ProcessOSVersion] = @ProcessOSVersion,
        [ProcessHostName] = @ProcessHostName,
        [ProcessUserID] = @ProcessUserID,
        [ProcessUserName] = @ProcessUserName,
        [LastHeartbeat] = @LastHeartbeat,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwQueues WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spGetAuthenticationDataByExternalSystemID]'
GO
CREATE PROC [dbo].[spGetAuthenticationDataByExternalSystemID] 
	@IntegrationName NVARCHAR(100), 
	@ExternalSystemID NVARCHAR(100),
	@AccessToken NVARCHAR(255)=NULL OUTPUT,
	@RefreshToken NVARCHAR(255)=NULL OUTPUT,
	@TokenExpirationDate DATETIME=NULL OUTPUT,
	@APIKey NVARCHAR(255)=NULL OUTPUT
AS

SET @IntegrationName = TRIM(@IntegrationName)
SET @ExternalSystemID = TRIM(@ExternalSystemID)

SELECT
	@AccessToken = ci.AccessToken,
	@RefreshToken = ci.RefreshToken,
	@TokenExpirationDate = ci.TokenExpirationDate,
	@APIKey = ci.APIKey
FROM
	admin.CompanyIntegration ci
JOIN admin.Integration i
	ON i.Name = ci.IntegrationName
WHERE 
	i.Name = @IntegrationName
	AND ci.ExternalSystemID = @ExternalSystemID
	AND ci.IsActive = 1
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateQueueTask]'
GO


CREATE PROCEDURE [dbo].[spUpdateQueueTask]
    @ID int,
    @QueueID int,
    @Status nchar(10),
    @StartedAt datetime,
    @EndedAt datetime,
    @Data nvarchar(MAX),
    @Options nvarchar(MAX),
    @Output nvarchar(MAX),
    @ErrorMessage nvarchar(MAX),
    @Comments nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[QueueTask]
    SET 
        [QueueID] = @QueueID,
        [Status] = @Status,
        [StartedAt] = @StartedAt,
        [EndedAt] = @EndedAt,
        [Data] = @Data,
        [Options] = @Options,
        [Output] = @Output,
        [ErrorMessage] = @ErrorMessage,
        [Comments] = @Comments
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwQueueTasks WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteDashboard]'
GO


CREATE PROCEDURE [dbo].[spDeleteDashboard]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[Dashboard]
    WHERE 
        [ID] = @ID
    SELECT @ID AS ID -- Return the ID to indicate we successfully deleted the record
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwOutputFormatTypes]'
GO


CREATE VIEW [dbo].[vwOutputFormatTypes]
AS
SELECT 
    o.*
FROM
    [admin].[OutputFormatType] AS o
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteUserViews]'
GO

CREATE PROCEDURE [dbo].[spDeleteUserViews]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[UserView]
    WHERE 
        [ID] = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwCompanyIntegrationRunsRanked]'
GO
CREATE VIEW [dbo].[vwCompanyIntegrationRunsRanked] AS

SELECT
	ci.ID,
	ci.CompanyIntegrationID,
	ci.StartedAt,
	ci.EndedAt,
	ci.TotalRecords,
	ci.RunByUserID,
	ci.Comments,
	RANK() OVER(PARTITION BY ci.CompanyIntegrationID ORDER BY ci.ID DESC) [RunOrder]
 FROM
	admin.CompanyIntegrationRun ci
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwOutputDeliveryTypes]'
GO


CREATE VIEW [dbo].[vwOutputDeliveryTypes]
AS
SELECT 
    o.*
FROM
    [admin].[OutputDeliveryType] AS o
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteUserViewRuns]'
GO

CREATE PROCEDURE [dbo].[spDeleteUserViewRuns]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[UserViewRun]
    WHERE 
        [ID] = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwReports]'
GO


CREATE VIEW [dbo].[vwReports]
AS
SELECT 
    r.*,
    User_UserID.[Name] AS [User],
    Conversation_ConversationID.[Name] AS [Conversation],
    OutputTriggerType_OutputTriggerTypeID.[Name] AS [OutputTriggerType],
    OutputFormatType_OutputFormatTypeID.[Name] AS [OutputFormatType],
    OutputDeliveryType_OutputDeliveryTypeID.[Name] AS [OutputDeliveryType],
    OutputDeliveryType_OutputEventID.[Name] AS [OutputEvent]
FROM
    [admin].[Report] AS r
INNER JOIN
    [admin].[User] AS User_UserID
  ON
    [r].[UserID] = User_UserID.[ID]
LEFT OUTER JOIN
    [admin].[Conversation] AS Conversation_ConversationID
  ON
    [r].[ConversationID] = Conversation_ConversationID.[ID]
LEFT OUTER JOIN
    [admin].[OutputTriggerType] AS OutputTriggerType_OutputTriggerTypeID
  ON
    [r].[OutputTriggerTypeID] = OutputTriggerType_OutputTriggerTypeID.[ID]
LEFT OUTER JOIN
    [admin].[OutputFormatType] AS OutputFormatType_OutputFormatTypeID
  ON
    [r].[OutputFormatTypeID] = OutputFormatType_OutputFormatTypeID.[ID]
LEFT OUTER JOIN
    [admin].[OutputDeliveryType] AS OutputDeliveryType_OutputDeliveryTypeID
  ON
    [r].[OutputDeliveryTypeID] = OutputDeliveryType_OutputDeliveryTypeID.[ID]
LEFT OUTER JOIN
    [admin].[OutputDeliveryType] AS OutputDeliveryType_OutputEventID
  ON
    [r].[OutputEventID] = OutputDeliveryType_OutputEventID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteUserViewRunDetails]'
GO

CREATE PROCEDURE [dbo].[spDeleteUserViewRunDetails]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[UserViewRunDetail]
    WHERE 
        [ID] = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwOutputTriggerTypes]'
GO


CREATE VIEW [dbo].[vwOutputTriggerTypes]
AS
SELECT 
    o.*
FROM
    [admin].[OutputTriggerType] AS o
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwReportSnapshots]'
GO


CREATE VIEW [dbo].[vwReportSnapshots]
AS
SELECT 
    r.*,
    Report_ReportID.[Name] AS [Report],
    User_UserID.[Name] AS [User]
FROM
    [admin].[ReportSnapshot] AS r
INNER JOIN
    [admin].[Report] AS Report_ReportID
  ON
    [r].[ReportID] = Report_ReportID.[ID]
LEFT OUTER JOIN
    [admin].[User] AS User_UserID
  ON
    [r].[UserID] = User_UserID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteUserFavorites]'
GO

CREATE PROCEDURE [dbo].[spDeleteUserFavorites]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[UserFavorite]
    WHERE 
        [ID] = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateReport]'
GO


CREATE PROCEDURE [dbo].[spCreateReport]
    @Name nvarchar(255),
    @Description nvarchar(MAX),
    @UserID int,
    @SharingScope nvarchar(20),
    @ConversationID int,
    @ConversationDetailID int,
    @ReportSQL nvarchar(MAX),
    @ReportConfiguration nvarchar(MAX),
    @OutputTriggerTypeID int,
    @OutputFormatTypeID int,
    @OutputDeliveryTypeID int,
    @OutputEventID int,
    @OutputFrequency nvarchar(50),
    @OutputTargetEmail nvarchar(255),
    @OutputWorkflowID int
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[Report]
        (
            [Name],
            [Description],
            [UserID],
            [SharingScope],
            [ConversationID],
            [ConversationDetailID],
            [ReportSQL],
            [ReportConfiguration],
            [OutputTriggerTypeID],
            [OutputFormatTypeID],
            [OutputDeliveryTypeID],
            [OutputEventID],
            [OutputFrequency],
            [OutputTargetEmail],
            [OutputWorkflowID]
        )
    VALUES
        (
            @Name,
            @Description,
            @UserID,
            @SharingScope,
            @ConversationID,
            @ConversationDetailID,
            @ReportSQL,
            @ReportConfiguration,
            @OutputTriggerTypeID,
            @OutputFormatTypeID,
            @OutputDeliveryTypeID,
            @OutputEventID,
            @OutputFrequency,
            @OutputTargetEmail,
            @OutputWorkflowID
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwReports WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateReportSnapshot]'
GO


CREATE PROCEDURE [dbo].[spCreateReportSnapshot]
    @ReportID int,
    @ResultSet nvarchar(MAX),
    @UserID int
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[ReportSnapshot]
        (
            [ReportID],
            [ResultSet],
            [UserID]
        )
    VALUES
        (
            @ReportID,
            @ResultSet,
            @UserID
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwReportSnapshots WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateReport]'
GO


CREATE PROCEDURE [dbo].[spUpdateReport]
    @ID int,
    @Name nvarchar(255),
    @Description nvarchar(MAX),
    @UserID int,
    @SharingScope nvarchar(20),
    @ConversationID int,
    @ConversationDetailID int,
    @ReportSQL nvarchar(MAX),
    @ReportConfiguration nvarchar(MAX),
    @OutputTriggerTypeID int,
    @OutputFormatTypeID int,
    @OutputDeliveryTypeID int,
    @OutputEventID int,
    @OutputFrequency nvarchar(50),
    @OutputTargetEmail nvarchar(255),
    @OutputWorkflowID int
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[Report]
    SET 
        [Name] = @Name,
        [Description] = @Description,
        [UserID] = @UserID,
        [SharingScope] = @SharingScope,
        [ConversationID] = @ConversationID,
        [ConversationDetailID] = @ConversationDetailID,
        [ReportSQL] = @ReportSQL,
        [ReportConfiguration] = @ReportConfiguration,
        [OutputTriggerTypeID] = @OutputTriggerTypeID,
        [OutputFormatTypeID] = @OutputFormatTypeID,
        [OutputDeliveryTypeID] = @OutputDeliveryTypeID,
        [OutputEventID] = @OutputEventID,
        [OutputFrequency] = @OutputFrequency,
        [OutputTargetEmail] = @OutputTargetEmail,
        [OutputWorkflowID] = @OutputWorkflowID,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwReports WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteUserApplicationEntities]'
GO

CREATE PROCEDURE [dbo].[spDeleteUserApplicationEntities]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[UserApplicationEntity]
    WHERE 
        [ID] = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateReportSnapshot]'
GO


CREATE PROCEDURE [dbo].[spUpdateReportSnapshot]
    @ID int,
    @ReportID int,
    @ResultSet nvarchar(MAX),
    @UserID int
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[ReportSnapshot]
    SET 
        [ReportID] = @ReportID,
        [ResultSet] = @ResultSet,
        [UserID] = @UserID
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwReportSnapshots WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwSQLTablesAndEntities]'
GO
CREATE VIEW [dbo].[vwSQLTablesAndEntities]
AS
SELECT 
	e.ID EntityID,
	e.Name EntityName,
	e.VirtualEntity,
	t.name TableName,
	s.name SchemaName,
	t.*,
	v.object_id view_object_id,
	v.name ViewName
FROM 
	sys.all_objects t
INNER JOIN
	sys.schemas s 
ON
	t.schema_id = s.schema_id
LEFT OUTER JOIN
	admin.Entity e 
ON
	t.name = e.BaseTable AND
	s.name = e.SchemaName 
LEFT OUTER JOIN
	sys.all_objects v
ON
	e.BaseView = v.name AND v.type = 'V'
WHERE   
	t.TYPE = 'U' or (t.Type='V' and e.VirtualEntity=1) -- TABLE - non-virtual entities
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwSQLColumnsAndEntityFields]'
GO
CREATE VIEW [dbo].[vwSQLColumnsAndEntityFields]
AS
SELECT 
	e.EntityID,
	e.EntityName Entity,
	e.SchemaName,
	e.TableName TableName,
	ef.ID EntityFieldID,
	ef.Sequence EntityFieldSequence,
	ef.Name EntityFieldName,
	c.column_id Sequence,
	c.name FieldName,
	t.name Type,
	c.max_length Length,
	c.precision Precision,
	c.scale Scale,
	c.is_nullable AllowsNull,
	c.is_identity AutoIncrement,
	c.column_id,
	IIF(basetable_columns.column_id IS NULL OR cc.definition IS NOT NULL, 1, 0) IsVirtual, -- updated so that we take into account that computed columns are virtual always, previously only looked for existence of a column in table vs. a view
	basetable_columns.object_id,
	dc.name AS DefaultConstraintName,
    dc.definition AS DefaultValue,
	cc.definition ComputedColumnDefinition
FROM
	sys.all_columns c
INNER JOIN
	vwSQLTablesAndEntities e
ON
	c.object_id = IIF(e.view_object_id IS NULL, e.object_id, e.view_object_id)
INNER JOIN
	sys.types t 
ON
	c.user_type_id = t.user_type_id
INNER JOIN
	sys.all_objects basetable 
ON
	e.object_id = basetable.object_id
LEFT OUTER JOIN 
    sys.computed_columns cc 
ON 
	e.object_id = cc.object_id AND 
	c.name = cc.name
LEFT OUTER JOIN
	sys.all_columns basetable_columns -- join in all columns from base table and line them up - that way we know if a field is a VIEW only field or a TABLE field (virtual vs. in table)
ON
	basetable.object_id = basetable_columns.object_id AND
	c.name = basetable_columns.name 
LEFT OUTER JOIN
	admin.EntityField ef 
ON
	e.EntityID = ef.EntityID AND
	c.name = ef.Name
LEFT OUTER JOIN 
    sys.default_constraints dc 
ON 
    e.object_id = dc.parent_object_id AND
	c.column_id = dc.parent_column_id
WHERE 
	c.default_object_id IS NOT NULL
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwEntities]'
GO

CREATE VIEW [dbo].[vwEntities]
AS
SELECT 
	e.*,
	IIF(1 = ISNUMERIC(LEFT(e.Name, 1)),'_','') + REPLACE(e.Name, ' ', '') CodeName,
	IIF(1 = ISNUMERIC(LEFT(e.BaseTable, 1)),'_','') + e.BaseTable + IIF(e.NameSuffix IS NULL, '', e.NameSuffix) ClassName,
	IIF(1 = ISNUMERIC(LEFT(e.BaseTable, 1)),'_','') + e.BaseTable + IIF(e.NameSuffix IS NULL, '', e.NameSuffix) BaseTableCodeName,
	par.Name ParentEntity,
	par.BaseTable ParentBaseTable,
	par.BaseView ParentBaseView
FROM 
	[admin].Entity e
LEFT OUTER JOIN 
	[admin].Entity par
ON
	e.ParentID = par.ID
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwEntityFields]'
GO

CREATE VIEW [dbo].[vwEntityFields]
AS
SELECT
	ef.*,
	e.Name Entity,
	e.SchemaName,
	e.BaseTable,
	e.BaseView,
	e.CodeName EntityCodeName,
	e.ClassName EntityClassName,
	re.Name RelatedEntity,
	re.SchemaName RelatedEntitySchemaName,
	re.BaseTable RelatedEntityBaseTable,
	re.BaseView RelatedEntityBaseView,
	re.CodeName RelatedEntityCodeName,
	re.ClassName RelatedEntityClassName
FROM
	admin.EntityField ef
INNER JOIN
	vwEntities e ON ef.EntityID = e.ID
LEFT OUTER JOIN
	vwEntities re ON ef.RelatedEntityID = re.ID
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteUnneededEntityFields]'
GO
CREATE PROC [dbo].[spDeleteUnneededEntityFields]
AS
/****************************************************************/
-- Step #3 
-- Get rid of any EntityFields that are NOT virtual and are not part of the underlying VIEW or TABLE - these are orphaned meta-data elements
-- where a field once existed but no longer does either it was renamed or removed from the table or view
IF OBJECT_ID('tempdb..#ef_spDeleteUnneededEntityFields') IS NOT NULL
    DROP TABLE #ef_spDeleteUnneededEntityFields
IF OBJECT_ID('tempdb..#actual_spDeleteUnneededEntityFields') IS NOT NULL
    DROP TABLE #actual_spDeleteUnneededEntityFields

-- put these two views into temp tables, for some SQL systems, this makes the join below WAY faster
SELECT * INTO #ef_spDeleteUnneededEntityFields FROM vwEntityFields
SELECT * INTO #actual_spDeleteUnneededEntityFields FROM vwSQLColumnsAndEntityFields   

-- first update the entity UpdatedAt so that our metadata timestamps are right
UPDATE admin.Entity SET UpdatedAt=GETDATE() WHERE ID IN
(
	select 
	  ef.EntityID 
	FROM 
	  #ef_spDeleteUnneededEntityFields ef 
	LEFT JOIN
	  #actual_spDeleteUnneededEntityFields actual 
	  ON
	  ef.EntityID=actual.EntityID AND
	  ef.Name = actual.EntityFieldName
	WHERE 
	  actual.column_id IS NULL  
)

-- now delete the entity fields themsevles
DELETE FROM admin.EntityField WHERE ID IN
(
	select 
	  ef.ID 
	FROM 
	  #ef_spDeleteUnneededEntityFields ef 
	LEFT JOIN
	  #actual_spDeleteUnneededEntityFields actual 
	  ON
	  ef.EntityID=actual.EntityID AND
	  ef.Name = actual.EntityFieldName
	WHERE 
	  actual.column_id IS NULL  
)

-- clean up and get rid of our temp tables now
DROP TABLE #ef_spDeleteUnneededEntityFields
DROP TABLE #actual_spDeleteUnneededEntityFields
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteReport]'
GO


CREATE PROCEDURE [dbo].[spDeleteReport]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[Report]
    WHERE 
        [ID] = @ID
    SELECT @ID AS ID -- Return the ID to indicate we successfully deleted the record
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteReportSnapshot]'
GO


CREATE PROCEDURE [dbo].[spDeleteReportSnapshot]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[ReportSnapshot]
    WHERE 
        [ID] = @ID
    SELECT @ID AS ID -- Return the ID to indicate we successfully deleted the record
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwTaggedItems]'
GO


CREATE VIEW [dbo].[vwTaggedItems]
AS
SELECT 
    t.*,
    Tag_TagID.[Name] AS [Tag],
    Entity_EntityID.[Name] AS [Entity]
FROM
    [admin].[TaggedItem] AS t
INNER JOIN
    [admin].[Tag] AS Tag_TagID
  ON
    [t].[TagID] = Tag_TagID.[ID]
INNER JOIN
    [admin].[Entity] AS Entity_EntityID
  ON
    [t].[EntityID] = Entity_EntityID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwWorkspaces]'
GO


CREATE VIEW [dbo].[vwWorkspaces]
AS
SELECT 
    w.*,
    User_UserID.[Name] AS [User]
FROM
    [admin].[Workspace] AS w
INNER JOIN
    [admin].[User] AS User_UserID
  ON
    [w].[UserID] = User_UserID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwWorkspaceItems]'
GO


CREATE VIEW [dbo].[vwWorkspaceItems]
AS
SELECT 
    w.*,
    Workspace_WorkSpaceID.[Name] AS [WorkSpace],
    ResourceType_ResourceTypeID.[Name] AS [ResourceType]
FROM
    [admin].[WorkspaceItem] AS w
INNER JOIN
    [admin].[Workspace] AS Workspace_WorkSpaceID
  ON
    [w].[WorkSpaceID] = Workspace_WorkSpaceID.[ID]
INNER JOIN
    [admin].[ResourceType] AS ResourceType_ResourceTypeID
  ON
    [w].[ResourceTypeID] = ResourceType_ResourceTypeID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwTags]'
GO


CREATE VIEW [dbo].[vwTags]
AS
SELECT 
    t.*,
    Tag_ParentID.[Name] AS [Parent]
FROM
    [admin].[Tag] AS t
LEFT OUTER JOIN
    [admin].[Tag] AS Tag_ParentID
  ON
    [t].[ParentID] = Tag_ParentID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwResourceTypes]'
GO


CREATE VIEW [dbo].[vwResourceTypes]
AS
SELECT 
    r.*,
    Entity_EntityID.[Name] AS [Entity]
FROM
    [admin].[ResourceType] AS r
LEFT OUTER JOIN
    [admin].[Entity] AS Entity_EntityID
  ON
    [r].[EntityID] = Entity_EntityID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateWorkspace]'
GO


CREATE PROCEDURE [dbo].[spCreateWorkspace]
    @Name nvarchar(255),
    @Description nvarchar(MAX),
    @UserID int
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[Workspace]
        (
            [Name],
            [Description],
            [UserID]
        )
    VALUES
        (
            @Name,
            @Description,
            @UserID
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwWorkspaces WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateWorkspaceItem]'
GO


CREATE PROCEDURE [dbo].[spCreateWorkspaceItem]
    @Name nvarchar(255),
    @Description nvarchar(MAX),
    @WorkSpaceID int,
    @ResourceTypeID int,
    @ResourceRecordID int,
    @Sequence int,
    @Configuration nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[WorkspaceItem]
        (
            [Name],
            [Description],
            [WorkSpaceID],
            [ResourceTypeID],
            [ResourceRecordID],
            [Sequence],
            [Configuration]
        )
    VALUES
        (
            @Name,
            @Description,
            @WorkSpaceID,
            @ResourceTypeID,
            @ResourceRecordID,
            @Sequence,
            @Configuration
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwWorkspaceItems WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateWorkspace]'
GO


CREATE PROCEDURE [dbo].[spUpdateWorkspace]
    @ID int,
    @Name nvarchar(255),
    @Description nvarchar(MAX),
    @UserID int
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[Workspace]
    SET 
        [Name] = @Name,
        [Description] = @Description,
        [UserID] = @UserID
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwWorkspaces WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateWorkspaceItem]'
GO


CREATE PROCEDURE [dbo].[spUpdateWorkspaceItem]
    @ID int,
    @Name nvarchar(255),
    @Description nvarchar(MAX),
    @WorkSpaceID int,
    @ResourceTypeID int,
    @ResourceRecordID int,
    @Sequence int,
    @Configuration nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[WorkspaceItem]
    SET 
        [Name] = @Name,
        [Description] = @Description,
        [WorkSpaceID] = @WorkSpaceID,
        [ResourceTypeID] = @ResourceTypeID,
        [ResourceRecordID] = @ResourceRecordID,
        [Sequence] = @Sequence,
        [Configuration] = @Configuration
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwWorkspaceItems WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteWorkspace]'
GO


CREATE PROCEDURE [dbo].[spDeleteWorkspace]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[Workspace]
    WHERE 
        [ID] = @ID
    SELECT @ID AS ID -- Return the ID to indicate we successfully deleted the record
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteConversation]'
GO

CREATE PROCEDURE [dbo].[spDeleteConversation]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    -- Cascade update on Report - set FK to null before deleting rows in Conversation
    UPDATE 
        [admin].[Report] 
    SET 
        [ConversationID] = NULL 
    WHERE 
        [ConversationID] = @ID

	UPDATE 
        [admin].[Report] 
    SET 
        [ConversationDetailID] = NULL 
    WHERE 
        [ConversationDetailID] IN (SELECT ID FROM admin.ConversationDetail WHERE ConversationID = @ID)

    
    -- Cascade delete from ConversationDetail
    DELETE FROM 
        [admin].[ConversationDetail] 
    WHERE 
        [ConversationID] = @ID
    
    DELETE FROM 
        [admin].[Conversation]
    WHERE 
        [ID] = @ID
    SELECT @ID AS ID -- Return the ID to indicate we successfully deleted the record
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteWorkspaceItem]'
GO


CREATE PROCEDURE [dbo].[spDeleteWorkspaceItem]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[WorkspaceItem]
    WHERE 
        [ID] = @ID
    SELECT @ID AS ID -- Return the ID to indicate we successfully deleted the record
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwDatasets]'
GO


CREATE VIEW [dbo].[vwDatasets]
AS
SELECT 
    d.*
FROM
    [admin].[Dataset] AS d
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwUserNotifications]'
GO


CREATE VIEW [dbo].[vwUserNotifications]
AS
SELECT 
    u.*,
    User_UserID.[Name] AS [User]
FROM
    [admin].[UserNotification] AS u
INNER JOIN
    [admin].[User] AS User_UserID
  ON
    [u].[UserID] = User_UserID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteApplicationEntities]'
GO

CREATE PROCEDURE [dbo].[spDeleteApplicationEntities]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[ApplicationEntity]
    WHERE 
        [ID] = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwDatasetItems]'
GO


CREATE VIEW [dbo].[vwDatasetItems]
AS
SELECT 
    d.*,
    Entity_EntityID.[Name] AS [Entity]
FROM
    [admin].[DatasetItem] AS d
INNER JOIN
    [admin].[Entity] AS Entity_EntityID
  ON
    [d].[EntityID] = Entity_EntityID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwConversations]'
GO


CREATE VIEW [dbo].[vwConversations]
AS
SELECT 
    c.*,
    User_UserID.[Name] AS [User]
FROM
    [admin].[Conversation] AS c
INNER JOIN
    [admin].[User] AS User_UserID
  ON
    [c].[UserID] = User_UserID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwConversationDetails]'
GO


CREATE VIEW [dbo].[vwConversationDetails]
AS
SELECT 
    c.*,
    Conversation_ConversationID.[Name] AS [Conversation]
FROM
    [admin].[ConversationDetail] AS c
INNER JOIN
    [admin].[Conversation] AS Conversation_ConversationID
  ON
    [c].[ConversationID] = Conversation_ConversationID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwCompanies]'
GO


CREATE VIEW [dbo].[vwCompanies]
AS
SELECT 
    c.*
FROM
    [admin].[Company] AS c
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateUserNotification]'
GO


CREATE PROCEDURE [dbo].[spCreateUserNotification]
    @UserID int,
    @Title nvarchar(255),
    @Message nvarchar(MAX),
    @ResourceTypeID int,
    @ResourceRecordID int,
    @ResourceConfiguration nvarchar(MAX),
    @Unread bit,
    @ReadAt datetime
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[UserNotification]
        (
            [UserID],
            [Title],
            [Message],
            [ResourceTypeID],
            [ResourceRecordID],
            [ResourceConfiguration],
            [Unread],
            [ReadAt]
        )
    VALUES
        (
            @UserID,
            @Title,
            @Message,
            @ResourceTypeID,
            @ResourceRecordID,
            @ResourceConfiguration,
            @Unread,
            @ReadAt
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwUserNotifications WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwEmployees]'
GO

CREATE VIEW [dbo].[vwEmployees] 
AS
SELECT
	e.*,
	TRIM(e.FirstName) + ' ' + TRIM(e.LastName) FirstLast,
	TRIM(s.FirstName) + ' ' + TRIM(s.LastName) Supervisor,
	s.FirstName SupervisorFirstName,
	s.LastName SupervisorLastName,
	s.Email SupervisorEmail
FROM
	admin.Employee e
LEFT OUTER JOIN
	admin.Employee s
ON
	e.SupervisorID = s.ID

GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateEmployee]'
GO


CREATE PROCEDURE [dbo].[spCreateEmployee]
    @FirstName nvarchar(30),
    @LastName nvarchar(50),
    @Title nvarchar(50),
    @Email nvarchar(100),
    @Phone nvarchar(20),
    @Active bit,
    @CompanyID int,
    @SupervisorID int
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[Employee]
        (
            [FirstName],
            [LastName],
            [Title],
            [Email],
            [Phone],
            [Active],
            [CompanyID],
            [SupervisorID]
        )
    VALUES
        (
            @FirstName,
            @LastName,
            @Title,
            @Email,
            @Phone,
            @Active,
            @CompanyID,
            @SupervisorID
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwEmployees WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateConversation]'
GO


CREATE PROCEDURE [dbo].[spCreateConversation]
    @UserID int,
    @ExternalID nvarchar(100),
    @Name nvarchar(100)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[Conversation]
        (
            [UserID],
            [ExternalID],
            [Name]
        )
    VALUES
        (
            @UserID,
            @ExternalID,
            @Name
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwConversations WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwEmployeeCompanyIntegrations]'
GO


CREATE VIEW [dbo].[vwEmployeeCompanyIntegrations]
AS
SELECT 
    e.*
FROM
    [admin].[EmployeeCompanyIntegration] AS e
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateConversationDetail]'
GO


CREATE PROCEDURE [dbo].[spCreateConversationDetail]
    @ConversationID int,
    @ExternalID nvarchar(100),
    @Role nvarchar(20),
    @Message nvarchar(MAX),
    @Error nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[ConversationDetail]
        (
            [ConversationID],
            [ExternalID],
            [Role],
            [Message],
            [Error]
        )
    VALUES
        (
            @ConversationID,
            @ExternalID,
            @Role,
            @Message,
            @Error
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwConversationDetails WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwEmployeeRoles]'
GO


CREATE VIEW [dbo].[vwEmployeeRoles]
AS
SELECT 
    e.*,
    Role_RoleID.[Name] AS [Role]
FROM
    [admin].[EmployeeRole] AS e
INNER JOIN
    [admin].[Role] AS Role_RoleID
  ON
    [e].[RoleID] = Role_RoleID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateUserNotification]'
GO


CREATE PROCEDURE [dbo].[spUpdateUserNotification]
    @ID int,
    @UserID int,
    @Title nvarchar(255),
    @Message nvarchar(MAX),
    @ResourceTypeID int,
    @ResourceRecordID int,
    @ResourceConfiguration nvarchar(MAX),
    @Unread bit,
    @ReadAt datetime
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[UserNotification]
    SET 
        [UserID] = @UserID,
        [Title] = @Title,
        [Message] = @Message,
        [ResourceTypeID] = @ResourceTypeID,
        [ResourceRecordID] = @ResourceRecordID,
        [ResourceConfiguration] = @ResourceConfiguration,
        [Unread] = @Unread,
        [ReadAt] = @ReadAt,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwUserNotifications WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwUserFavorites]'
GO

CREATE VIEW [dbo].[vwUserFavorites]
AS
SELECT 
	uf.*,
	e.Name Entity,
	e.BaseTable EntityBaseTable,
	e.BaseView EntityBaseView
FROM 
	[admin].UserFavorite uf
INNER JOIN
	vwEntities e
ON
	uf.EntityID = e.ID
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateUserFavorite]'
GO


CREATE PROCEDURE [dbo].[spCreateUserFavorite]
    @UserID int,
    @EntityID int,
    @RecordID int
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[UserFavorite]
        (
            [UserID],
            [EntityID],
            [RecordID]
        )
    VALUES
        (
            @UserID,
            @EntityID,
            @RecordID
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwUserFavorites WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateConversation]'
GO


CREATE PROCEDURE [dbo].[spUpdateConversation]
    @ID int,
    @UserID int,
    @ExternalID nvarchar(100),
    @Name nvarchar(100)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[Conversation]
    SET 
        [UserID] = @UserID,
        [ExternalID] = @ExternalID,
        [Name] = @Name,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwConversations WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateCompany]'
GO


CREATE PROCEDURE [dbo].[spCreateCompany]
    @Name nvarchar(50),
    @Description nvarchar(200),
    @Website nvarchar(100),
    @LogoURL nvarchar(500),
    @Domain nvarchar(255)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[Company]
        (
            [Name],
            [Description],
            [Website],
            [LogoURL],
            [Domain]
        )
    VALUES
        (
            @Name,
            @Description,
            @Website,
            @LogoURL,
            @Domain
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwCompanies WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateConversationDetail]'
GO


CREATE PROCEDURE [dbo].[spUpdateConversationDetail]
    @ID int,
    @ConversationID int,
    @ExternalID nvarchar(100),
    @Role nvarchar(20),
    @Message nvarchar(MAX),
    @Error nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[ConversationDetail]
    SET 
        [ConversationID] = @ConversationID,
        [ExternalID] = @ExternalID,
        [Role] = @Role,
        [Message] = @Message,
        [Error] = @Error,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwConversationDetails WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateEmployeeCompanyIntegration]'
GO


CREATE PROCEDURE [dbo].[spUpdateEmployeeCompanyIntegration]
    @ID int,
    @EmployeeID int,
    @CompanyIntegrationID int,
    @ExternalSystemRecordID nvarchar(100),
    @IsActive bit
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[EmployeeCompanyIntegration]
    SET 
        [EmployeeID] = @EmployeeID,
        [CompanyIntegrationID] = @CompanyIntegrationID,
        [ExternalSystemRecordID] = @ExternalSystemRecordID,
        [IsActive] = @IsActive,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwEmployeeCompanyIntegrations WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteConversationDetail]'
GO


CREATE PROCEDURE [dbo].[spDeleteConversationDetail]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[ConversationDetail]
    WHERE 
        [ID] = @ID
    SELECT @ID AS ID -- Return the ID to indicate we successfully deleted the record
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateEmployeeRole]'
GO


CREATE PROCEDURE [dbo].[spUpdateEmployeeRole]
    @ID int,
    @EmployeeID int,
    @RoleID int
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[EmployeeRole]
    SET 
        [EmployeeID] = @EmployeeID,
        [RoleID] = @RoleID,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwEmployeeRoles WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwCompanyIntegrationRecordMaps]'
GO


CREATE VIEW [dbo].[vwCompanyIntegrationRecordMaps]
AS
SELECT 
    c.*,
    Entity_EntityID.[Name] AS [Entity]
FROM
    [admin].[CompanyIntegrationRecordMap] AS c
INNER JOIN
    [admin].[Entity] AS Entity_EntityID
  ON
    [c].[EntityID] = Entity_EntityID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateEmployee]'
GO


CREATE PROCEDURE [dbo].[spUpdateEmployee]
    @ID int,
    @FirstName nvarchar(30),
    @LastName nvarchar(50),
    @Title nvarchar(50),
    @Email nvarchar(100),
    @Phone nvarchar(20),
    @Active bit,
    @CompanyID int,
    @SupervisorID int
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[Employee]
    SET 
        [FirstName] = @FirstName,
        [LastName] = @LastName,
        [Title] = @Title,
        [Email] = @Email,
        [Phone] = @Phone,
        [Active] = @Active,
        [CompanyID] = @CompanyID,
        [SupervisorID] = @SupervisorID,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwEmployees WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwRecordMergeDeletionLogs]'
GO


CREATE VIEW [dbo].[vwRecordMergeDeletionLogs]
AS
SELECT 
    r.*
FROM
    [admin].[RecordMergeDeletionLog] AS r
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateUserFavorite]'
GO


CREATE PROCEDURE [dbo].[spUpdateUserFavorite]
    @ID int,
    @UserID int,
    @EntityID int,
    @RecordID int
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[UserFavorite]
    SET 
        [UserID] = @UserID,
        [EntityID] = @EntityID,
        [RecordID] = @RecordID,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwUserFavorites WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwResourceFolders]'
GO


CREATE VIEW [dbo].[vwResourceFolders]
AS
SELECT 
    r.*,
    ResourceFolder_ParentID.[Name] AS [Parent],
    User_UserID.[Name] AS [User]
FROM
    [admin].[ResourceFolder] AS r
LEFT OUTER JOIN
    [admin].[ResourceFolder] AS ResourceFolder_ParentID
  ON
    [r].[ParentID] = ResourceFolder_ParentID.[ID]
INNER JOIN
    [admin].[User] AS User_UserID
  ON
    [r].[UserID] = User_UserID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateCompany]'
GO


CREATE PROCEDURE [dbo].[spUpdateCompany]
    @ID int,
    @Name nvarchar(50),
    @Description nvarchar(200),
    @Website nvarchar(100),
    @LogoURL nvarchar(500),
    @Domain nvarchar(255)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[Company]
    SET 
        [Name] = @Name,
        [Description] = @Description,
        [Website] = @Website,
        [LogoURL] = @LogoURL,
        UpdatedAt = GETDATE(),
        [Domain] = @Domain
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwCompanies WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwRecordMergeLogs]'
GO


CREATE VIEW [dbo].[vwRecordMergeLogs]
AS
SELECT 
    r.*,
    Entity_EntityID.[Name] AS [Entity],
    User_InitiatedByUserID.[Name] AS [InitiatedByUser]
FROM
    [admin].[RecordMergeLog] AS r
INNER JOIN
    [admin].[Entity] AS Entity_EntityID
  ON
    [r].[EntityID] = Entity_EntityID.[ID]
INNER JOIN
    [admin].[User] AS User_InitiatedByUserID
  ON
    [r].[InitiatedByUserID] = User_InitiatedByUserID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteEmployee]'
GO


CREATE PROCEDURE [dbo].[spDeleteEmployee]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[Employee]
    WHERE 
        [ID] = @ID
    SELECT @ID AS ID -- Return the ID to indicate we successfully deleted the record
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwSchemaInfos]'
GO


CREATE VIEW [dbo].[vwSchemaInfos]
AS
SELECT 
    s.*
FROM
    [admin].[SchemaInfo] AS s
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteUserFavorite]'
GO


CREATE PROCEDURE [dbo].[spDeleteUserFavorite]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[UserFavorite]
    WHERE 
        [ID] = @ID
    SELECT @ID AS ID -- Return the ID to indicate we successfully deleted the record
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateCompanyIntegrationRecordMap]'
GO


CREATE PROCEDURE [dbo].[spCreateCompanyIntegrationRecordMap]
    @CompanyIntegrationID int,
    @ExternalSystemRecordID nvarchar(100),
    @EntityID int,
    @EntityRecordID int
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[CompanyIntegrationRecordMap]
        (
            [CompanyIntegrationID],
            [ExternalSystemRecordID],
            [EntityID],
            [EntityRecordID]
        )
    VALUES
        (
            @CompanyIntegrationID,
            @ExternalSystemRecordID,
            @EntityID,
            @EntityRecordID
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwCompanyIntegrationRecordMaps WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteCompany]'
GO


CREATE PROCEDURE [dbo].[spDeleteCompany]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[Company]
    WHERE 
        [ID] = @ID
    SELECT @ID AS ID -- Return the ID to indicate we successfully deleted the record
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateResourceFolder]'
GO


CREATE PROCEDURE [dbo].[spCreateResourceFolder]
    @ParentID int,
    @Name nvarchar(50),
    @ResourceTypeName nvarchar(255),
    @Description nvarchar(MAX),
    @UserID int
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[ResourceFolder]
        (
            [ParentID],
            [Name],
            [ResourceTypeName],
            [Description],
            [UserID]
        )
    VALUES
        (
            @ParentID,
            @Name,
            @ResourceTypeName,
            @Description,
            @UserID
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwResourceFolders WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwIntegrations]'
GO


CREATE VIEW [dbo].[vwIntegrations]
AS
SELECT 
    i.*
FROM
    [admin].[Integration] AS i
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateRecordMergeDeletionLog]'
GO


CREATE PROCEDURE [dbo].[spCreateRecordMergeDeletionLog]
    @RecordMergeLogID int,
    @DeletedRecordID int,
    @Status nvarchar(10),
    @ProcessingLog nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[RecordMergeDeletionLog]
        (
            [RecordMergeLogID],
            [DeletedRecordID],
            [Status],
            [ProcessingLog]
        )
    VALUES
        (
            @RecordMergeLogID,
            @DeletedRecordID,
            @Status,
            @ProcessingLog
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwRecordMergeDeletionLogs WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwSkills]'
GO


CREATE VIEW [dbo].[vwSkills]
AS
SELECT 
    s.*
FROM
    [admin].[Skill] AS s
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateRecordMergeLog]'
GO


CREATE PROCEDURE [dbo].[spCreateRecordMergeLog]
    @EntityID int,
    @SurvivingRecordID int,
    @InitiatedByUserID int,
    @ApprovalStatus nvarchar(10),
    @ApprovedByUserID int,
    @ProcessingStatus nvarchar(10),
    @ProcessingStartedAt datetime,
    @ProcessingEndedAt datetime,
    @ProcessingLog nvarchar(MAX),
    @Comments nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[RecordMergeLog]
        (
            [EntityID],
            [SurvivingRecordID],
            [InitiatedByUserID],
            [ApprovalStatus],
            [ApprovedByUserID],
            [ProcessingStatus],
            [ProcessingStartedAt],
            [ProcessingEndedAt],
            [ProcessingLog],
            [Comments]
        )
    VALUES
        (
            @EntityID,
            @SurvivingRecordID,
            @InitiatedByUserID,
            @ApprovalStatus,
            @ApprovedByUserID,
            @ProcessingStatus,
            @ProcessingStartedAt,
            @ProcessingEndedAt,
            @ProcessingLog,
            @Comments
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwRecordMergeLogs WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwIntegrationURLFormats]'
GO

CREATE VIEW [dbo].[vwIntegrationURLFormats]
AS
SELECT 
	iuf.*,
	i.ID IntegrationID,
	i.Name Integration,
	i.NavigationBaseURL,
	i.NavigationBaseURL + iuf.URLFormat FullURLFormat
FROM
	admin.IntegrationURLFormat iuf
INNER JOIN
	admin.Integration i
ON
	iuf.IntegrationName = i.Name
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateIntegrationURLFormat]'
GO


CREATE PROCEDURE [dbo].[spUpdateIntegrationURLFormat]
    @ID int,
    @IntegrationName nvarchar(100),
    @EntityID int,
    @URLFormat nvarchar(500)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[IntegrationURLFormat]
    SET 
        [IntegrationName] = @IntegrationName,
        [EntityID] = @EntityID,
        [URLFormat] = @URLFormat
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwIntegrationURLFormats WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateSchemaInfo]'
GO


CREATE PROCEDURE [dbo].[spCreateSchemaInfo]
    @SchemaName nvarchar(50),
    @EntityIDMin int,
    @EntityIDMax int,
    @Comments nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[SchemaInfo]
        (
            [SchemaName],
            [EntityIDMin],
            [EntityIDMax],
            [Comments]
        )
    VALUES
        (
            @SchemaName,
            @EntityIDMin,
            @EntityIDMax,
            @Comments
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwSchemaInfos WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwEmployeeSkills]'
GO


CREATE VIEW [dbo].[vwEmployeeSkills]
AS
SELECT 
    e.*,
    Skill_SkillID.[Name] AS [Skill]
FROM
    [admin].[EmployeeSkill] AS e
INNER JOIN
    [admin].[Skill] AS Skill_SkillID
  ON
    [e].[SkillID] = Skill_SkillID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateCompanyIntegrationRecordMap]'
GO


CREATE PROCEDURE [dbo].[spUpdateCompanyIntegrationRecordMap]
    @ID int,
    @CompanyIntegrationID int,
    @ExternalSystemRecordID nvarchar(100),
    @EntityID int,
    @EntityRecordID int
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[CompanyIntegrationRecordMap]
    SET 
        [CompanyIntegrationID] = @CompanyIntegrationID,
        [ExternalSystemRecordID] = @ExternalSystemRecordID,
        [EntityID] = @EntityID,
        [EntityRecordID] = @EntityRecordID,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwCompanyIntegrationRecordMaps WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwRoles]'
GO


CREATE VIEW [dbo].[vwRoles]
AS
SELECT 
    r.*
FROM
    [admin].[Role] AS r
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateRecordMergeDeletionLog]'
GO


CREATE PROCEDURE [dbo].[spUpdateRecordMergeDeletionLog]
    @ID int,
    @RecordMergeLogID int,
    @DeletedRecordID int,
    @Status nvarchar(10),
    @ProcessingLog nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[RecordMergeDeletionLog]
    SET 
        [RecordMergeLogID] = @RecordMergeLogID,
        [DeletedRecordID] = @DeletedRecordID,
        [Status] = @Status,
        [ProcessingLog] = @ProcessingLog,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwRecordMergeDeletionLogs WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateIntegration]'
GO


CREATE PROCEDURE [dbo].[spUpdateIntegration]
    @ID int,
    @Name nvarchar(100),
    @Description nvarchar(255),
    @NavigationBaseURL nvarchar(500),
    @ClassName nvarchar(100),
    @ImportPath nvarchar(100),
    @BatchMaxRequestCount int,
    @BatchRequestWaitTime int
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[Integration]
    SET 
        [Name] = @Name,
        [Description] = @Description,
        [NavigationBaseURL] = @NavigationBaseURL,
        [ClassName] = @ClassName,
        [ImportPath] = @ImportPath,
        [BatchMaxRequestCount] = @BatchMaxRequestCount,
        [BatchRequestWaitTime] = @BatchRequestWaitTime,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwIntegrations WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateResourceFolder]'
GO


CREATE PROCEDURE [dbo].[spUpdateResourceFolder]
    @ID int,
    @ParentID int,
    @Name nvarchar(50),
    @ResourceTypeName nvarchar(255),
    @Description nvarchar(MAX),
    @UserID int
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[ResourceFolder]
    SET 
        [ParentID] = @ParentID,
        [Name] = @Name,
        [ResourceTypeName] = @ResourceTypeName,
        [Description] = @Description,
        [UserID] = @UserID,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwResourceFolders WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateEmployeeSkill]'
GO


CREATE PROCEDURE [dbo].[spUpdateEmployeeSkill]
    @ID int,
    @EmployeeID int,
    @SkillID char(36)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[EmployeeSkill]
    SET 
        [EmployeeID] = @EmployeeID,
        [SkillID] = @SkillID,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwEmployeeSkills WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateErrorLog]'
GO

CREATE PROC [dbo].[spCreateErrorLog]
(
@CompanyIntegrationRunID AS INT = NULL,
@CompanyIntegrationRunDetailID AS INT = NULL,
@Code AS NCHAR(20) = NULL,
@Status AS NVARCHAR(10) = NULL,
@Category AS NVARCHAR(20) = NULL,
@Message AS NVARCHAR(MAX) = NULL,
@Details AS NVARCHAR(MAX) = NULL,
@ErrorLogID AS INT OUTPUT
)
AS


INSERT INTO [admin].[ErrorLog]
           ([CompanyIntegrationRunID]
           ,[CompanyIntegrationRunDetailID]
           ,[Code]
		   ,[Status]
		   ,[Category]
           ,[Message]
		   ,[Details])
     VALUES
           (@CompanyIntegrationRunID,
           @CompanyIntegrationRunDetailID,
           @Code,
		   @Status,
		   @Category,
           @Message,
		   @Details)

	--Get the ID of the new ErrorLog record
	SELECT @ErrorLogID = SCOPE_IDENTITY()
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateRecordMergeLog]'
GO


CREATE PROCEDURE [dbo].[spUpdateRecordMergeLog]
    @ID int,
    @EntityID int,
    @SurvivingRecordID int,
    @InitiatedByUserID int,
    @ApprovalStatus nvarchar(10),
    @ApprovedByUserID int,
    @ProcessingStatus nvarchar(10),
    @ProcessingStartedAt datetime,
    @ProcessingEndedAt datetime,
    @ProcessingLog nvarchar(MAX),
    @Comments nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[RecordMergeLog]
    SET 
        [EntityID] = @EntityID,
        [SurvivingRecordID] = @SurvivingRecordID,
        [InitiatedByUserID] = @InitiatedByUserID,
        [ApprovalStatus] = @ApprovalStatus,
        [ApprovedByUserID] = @ApprovedByUserID,
        [ProcessingStatus] = @ProcessingStatus,
        [ProcessingStartedAt] = @ProcessingStartedAt,
        [ProcessingEndedAt] = @ProcessingEndedAt,
        [ProcessingLog] = @ProcessingLog,
        [Comments] = @Comments,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwRecordMergeLogs WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateRole]'
GO


CREATE PROCEDURE [dbo].[spUpdateRole]
    @ID int,
    @Name nvarchar(50),
    @Description nvarchar(500),
    @AzureID nvarchar(50),
    @SQLName nvarchar(50)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[Role]
    SET 
        [Name] = @Name,
        [Description] = @Description,
        [AzureID] = @AzureID,
        [SQLName] = @SQLName,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwRoles WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateSchemaInfo]'
GO


CREATE PROCEDURE [dbo].[spUpdateSchemaInfo]
    @ID int,
    @SchemaName nvarchar(50),
    @EntityIDMin int,
    @EntityIDMax int,
    @Comments nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[SchemaInfo]
    SET 
        [SchemaName] = @SchemaName,
        [EntityIDMin] = @EntityIDMin,
        [EntityIDMax] = @EntityIDMax,
        [Comments] = @Comments,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwSchemaInfos WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwCompanyIntegrations]'
GO

CREATE VIEW [dbo].[vwCompanyIntegrations] 
AS
SELECT 
  ci.*,
  c.ID CompanyID,
  i.ID IntegrationID,
  c.Name Company,
  i.Name Integration,
  i.ClassName DriverClassName,
  i.ImportPath DriverImportPath,
  cir.ID LastRunID,
  cir.StartedAt LastRunStartedAt,
  cir.EndedAt LastRunEndedAt
FROM 
  admin.CompanyIntegration ci
INNER JOIN
  admin.Company c ON ci.CompanyName = c.Name
INNER JOIN
  admin.Integration i ON ci.IntegrationName = i.Name
LEFT OUTER JOIN
  admin.CompanyIntegrationRun cir 
ON 
  ci.ID = cir.CompanyIntegrationID AND
  cir.ID = (SELECT TOP 1 cirInner.ID FROM admin.CompanyIntegrationRun cirInner WHERE cirInner.CompanyIntegrationID = ci.ID ORDER BY StartedAt DESC)  
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateCompanyIntegration]'
GO


CREATE PROCEDURE [dbo].[spUpdateCompanyIntegration]
    @ID int,
    @CompanyName nvarchar(50),
    @IntegrationName nvarchar(100),
    @IsActive bit,
    @AccessToken nvarchar(255),
    @RefreshToken nvarchar(255),
    @TokenExpirationDate datetime,
    @APIKey nvarchar(255),
    @ExternalSystemID nvarchar(100),
    @IsExternalSystemReadOnly bit,
    @ClientID nvarchar(255),
    @ClientSecret nvarchar(255),
    @CustomAttribute1 nvarchar(255)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[CompanyIntegration]
    SET 
        [CompanyName] = @CompanyName,
        [IntegrationName] = @IntegrationName,
        [IsActive] = @IsActive,
        [AccessToken] = @AccessToken,
        [RefreshToken] = @RefreshToken,
        [TokenExpirationDate] = @TokenExpirationDate,
        [APIKey] = @APIKey,
        UpdatedAt = GETDATE(),
        [ExternalSystemID] = @ExternalSystemID,
        [IsExternalSystemReadOnly] = @IsExternalSystemReadOnly,
        [ClientID] = @ClientID,
        [ClientSecret] = @ClientSecret,
        [CustomAttribute1] = @CustomAttribute1
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwCompanyIntegrations WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateEntity]'
GO


CREATE PROCEDURE [dbo].[spCreateEntity]
    @ParentID int,
    @Name nvarchar(50),
    @NameSuffix nvarchar(50),
    @Description nvarchar(MAX),
    @BaseView nvarchar(50),
    @BaseViewGenerated bit,
    @VirtualEntity bit,
    @TrackRecordChanges bit,
    @AuditRecordAccess bit,
    @AuditViewRuns bit,
    @IncludeInAPI bit,
    @AllowAllRowsAPI bit,
    @AllowUpdateAPI bit,
    @AllowCreateAPI bit,
    @AllowDeleteAPI bit,
    @CustomResolverAPI bit,
    @AllowUserSearchAPI bit,
    @FullTextSearchEnabled bit,
    @FullTextCatalog nvarchar(50),
    @FullTextCatalogGenerated bit,
    @FullTextIndex nvarchar(100),
    @FullTextIndexGenerated bit,
    @FullTextSearchFunction nvarchar(100),
    @FullTextSearchFunctionGenerated bit,
    @UserViewMaxRows int,
    @spCreate nvarchar(100),
    @spUpdate nvarchar(100),
    @spDelete nvarchar(100),
    @spCreateGenerated bit,
    @spUpdateGenerated bit,
    @spDeleteGenerated bit,
    @CascadeDeletes bit,
    @UserFormGenerated bit,
    @EntityObjectSubclassName nvarchar(100),
    @EntityObjectSubclassImport nvarchar(100)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[Entity]
        (
            [ParentID],
            [Name],
            [NameSuffix],
            [Description],
            [BaseView],
            [BaseViewGenerated],
            [VirtualEntity],
            [TrackRecordChanges],
            [AuditRecordAccess],
            [AuditViewRuns],
            [IncludeInAPI],
            [AllowAllRowsAPI],
            [AllowUpdateAPI],
            [AllowCreateAPI],
            [AllowDeleteAPI],
            [CustomResolverAPI],
            [AllowUserSearchAPI],
            [FullTextSearchEnabled],
            [FullTextCatalog],
            [FullTextCatalogGenerated],
            [FullTextIndex],
            [FullTextIndexGenerated],
            [FullTextSearchFunction],
            [FullTextSearchFunctionGenerated],
            [UserViewMaxRows],
            [spCreate],
            [spUpdate],
            [spDelete],
            [spCreateGenerated],
            [spUpdateGenerated],
            [spDeleteGenerated],
            [CascadeDeletes],
            [UserFormGenerated],
            [EntityObjectSubclassName],
            [EntityObjectSubclassImport]
        )
    VALUES
        (
            @ParentID,
            @Name,
            @NameSuffix,
            @Description,
            @BaseView,
            @BaseViewGenerated,
            @VirtualEntity,
            @TrackRecordChanges,
            @AuditRecordAccess,
            @AuditViewRuns,
            @IncludeInAPI,
            @AllowAllRowsAPI,
            @AllowUpdateAPI,
            @AllowCreateAPI,
            @AllowDeleteAPI,
            @CustomResolverAPI,
            @AllowUserSearchAPI,
            @FullTextSearchEnabled,
            @FullTextCatalog,
            @FullTextCatalogGenerated,
            @FullTextIndex,
            @FullTextIndexGenerated,
            @FullTextSearchFunction,
            @FullTextSearchFunctionGenerated,
            @UserViewMaxRows,
            @spCreate,
            @spUpdate,
            @spDelete,
            @spCreateGenerated,
            @spUpdateGenerated,
            @spDeleteGenerated,
            @CascadeDeletes,
            @UserFormGenerated,
            @EntityObjectSubclassName,
            @EntityObjectSubclassImport
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwEntities WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwUsers]'
GO

CREATE VIEW [dbo].[vwUsers] 
AS
SELECT 
	u.*,
	u.FirstName + ' ' + u.LastName FirstLast,
	e.FirstLast EmployeeFirstLast,
	e.Email EmployeeEmail,
	e.Title EmployeeTitle,
	e.Supervisor EmployeeSupervisor,
	e.SupervisorEmail EmployeeSupervisorEmail
FROM 
	[admin].[User] u
LEFT OUTER JOIN
	vwEmployees e
ON
	u.EmployeeID = e.ID

GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateUser]'
GO


CREATE PROCEDURE [dbo].[spCreateUser]
    @Name nvarchar(100),
    @FirstName nvarchar(50),
    @LastName nvarchar(50),
    @Title nvarchar(50),
    @Email nvarchar(100),
    @Type nchar(15),
    @IsActive bit,
    @LinkedRecordType nchar(10),
    @EmployeeID int,
    @LinkedEntityID int,
    @LinkedEntityRecordID int
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[User]
        (
            [Name],
            [FirstName],
            [LastName],
            [Title],
            [Email],
            [Type],
            [IsActive],
            [LinkedRecordType],
            [EmployeeID],
            [LinkedEntityID],
            [LinkedEntityRecordID]
        )
    VALUES
        (
            @Name,
            @FirstName,
            @LastName,
            @Title,
            @Email,
            @Type,
            @IsActive,
            @LinkedRecordType,
            @EmployeeID,
            @LinkedEntityID,
            @LinkedEntityRecordID
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwUsers WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwEntityRelationships]'
GO

CREATE VIEW [dbo].[vwEntityRelationships]
AS
SELECT
	er.*,
	e.Name Entity,
	e.BaseTable EntityBaseTable,
	e.BaseView EntityBaseView,
	relatedEntity.Name RelatedEntity,
	relatedEntity.BaseTable RelatedEntityBaseTable,
	relatedEntity.BaseView RelatedEntityBaseView,
	relatedEntity.ClassName RelatedEntityClassName,
	relatedEntity.CodeName RelatedEntityCodeName,
	relatedEntity.BaseTableCodeName RelatedEntityBaseTableCodeName,
	uv.Name DisplayUserViewName,
	uv.ID DisplayUserViewID
FROM
	admin.EntityRelationship er
INNER JOIN
	admin.Entity e
ON
	er.EntityID = e.ID
INNER JOIN
	vwEntities relatedEntity
ON
	er.RelatedEntityID = relatedEntity.ID
LEFT OUTER JOIN
	admin.UserView uv
ON	
	er.DisplayUserViewGUID = uv.GUID
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateEntityRelationship]'
GO


CREATE PROCEDURE [dbo].[spCreateEntityRelationship]
    @EntityID int,
    @RelatedEntityID int,
    @BundleInAPI bit,
    @IncludeInParentAllQuery bit,
    @Type nchar(20),
    @EntityKeyField nvarchar(50),
    @RelatedEntityJoinField nvarchar(50),
    @JoinView nvarchar(50),
    @JoinEntityJoinField nvarchar(50),
    @JoinEntityInverseJoinField nvarchar(50),
    @DisplayInForm bit,
    @DisplayName nvarchar(50)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[EntityRelationship]
        (
            [EntityID],
            [RelatedEntityID],
            [BundleInAPI],
            [IncludeInParentAllQuery],
            [Type],
            [EntityKeyField],
            [RelatedEntityJoinField],
            [JoinView],
            [JoinEntityJoinField],
            [JoinEntityInverseJoinField],
            [DisplayInForm],
            [DisplayName]
        )
    VALUES
        (
            @EntityID,
            @RelatedEntityID,
            @BundleInAPI,
            @IncludeInParentAllQuery,
            @Type,
            @EntityKeyField,
            @RelatedEntityJoinField,
            @JoinView,
            @JoinEntityJoinField,
            @JoinEntityInverseJoinField,
            @DisplayInForm,
            @DisplayName
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwEntityRelationships WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateEntityField]'
GO


CREATE PROCEDURE [dbo].[spCreateEntityField]
    @DisplayName nvarchar(50),
    @Description nvarchar(MAX),
    @Category nvarchar(100),
    @ValueListType nvarchar(20),
    @ExtendedType nvarchar(50),
    @DefaultInView bit,
    @ViewCellTemplate nvarchar(MAX),
    @DefaultColumnWidth int,
    @AllowUpdateAPI bit,
    @AllowUpdateInView bit,
    @IncludeInUserSearchAPI bit,
    @FullTextSearchEnabled bit,
    @UserSearchParamFormatAPI nvarchar(500),
    @IncludeInGeneratedForm bit,
    @GeneratedFormSection nvarchar(10),
    @IsNameField bit,
    @RelatedEntityID int,
    @RelatedEntityFieldName nvarchar(50),
    @IncludeRelatedEntityNameFieldInBaseView bit,
    @RelatedEntityNameFieldMap nvarchar(50)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[EntityField]
        (
            [DisplayName],
            [Description],
            [Category],
            [ValueListType],
            [ExtendedType],
            [DefaultInView],
            [ViewCellTemplate],
            [DefaultColumnWidth],
            [AllowUpdateAPI],
            [AllowUpdateInView],
            [IncludeInUserSearchAPI],
            [FullTextSearchEnabled],
            [UserSearchParamFormatAPI],
            [IncludeInGeneratedForm],
            [GeneratedFormSection],
            [IsNameField],
            [RelatedEntityID],
            [RelatedEntityFieldName],
            [IncludeRelatedEntityNameFieldInBaseView],
            [RelatedEntityNameFieldMap]
        )
    VALUES
        (
            @DisplayName,
            @Description,
            @Category,
            @ValueListType,
            @ExtendedType,
            @DefaultInView,
            @ViewCellTemplate,
            @DefaultColumnWidth,
            @AllowUpdateAPI,
            @AllowUpdateInView,
            @IncludeInUserSearchAPI,
            @FullTextSearchEnabled,
            @UserSearchParamFormatAPI,
            @IncludeInGeneratedForm,
            @GeneratedFormSection,
            @IsNameField,
            @RelatedEntityID,
            @RelatedEntityFieldName,
            @IncludeRelatedEntityNameFieldInBaseView,
            @RelatedEntityNameFieldMap
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwEntityFields WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateEntity]'
GO


CREATE PROCEDURE [dbo].[spUpdateEntity]
    @ID int,
    @ParentID int,
    @Name nvarchar(50),
    @NameSuffix nvarchar(50),
    @Description nvarchar(MAX),
    @BaseView nvarchar(50),
    @BaseViewGenerated bit,
    @VirtualEntity bit,
    @TrackRecordChanges bit,
    @AuditRecordAccess bit,
    @AuditViewRuns bit,
    @IncludeInAPI bit,
    @AllowAllRowsAPI bit,
    @AllowUpdateAPI bit,
    @AllowCreateAPI bit,
    @AllowDeleteAPI bit,
    @CustomResolverAPI bit,
    @AllowUserSearchAPI bit,
    @FullTextSearchEnabled bit,
    @FullTextCatalog nvarchar(50),
    @FullTextCatalogGenerated bit,
    @FullTextIndex nvarchar(100),
    @FullTextIndexGenerated bit,
    @FullTextSearchFunction nvarchar(100),
    @FullTextSearchFunctionGenerated bit,
    @UserViewMaxRows int,
    @spCreate nvarchar(100),
    @spUpdate nvarchar(100),
    @spDelete nvarchar(100),
    @spCreateGenerated bit,
    @spUpdateGenerated bit,
    @spDeleteGenerated bit,
    @CascadeDeletes bit,
    @UserFormGenerated bit,
    @EntityObjectSubclassName nvarchar(100),
    @EntityObjectSubclassImport nvarchar(100)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[Entity]
    SET 
        [ParentID] = @ParentID,
        [Name] = @Name,
        [NameSuffix] = @NameSuffix,
        [Description] = @Description,
        [BaseView] = @BaseView,
        [BaseViewGenerated] = @BaseViewGenerated,
        [VirtualEntity] = @VirtualEntity,
        [TrackRecordChanges] = @TrackRecordChanges,
        [AuditRecordAccess] = @AuditRecordAccess,
        [AuditViewRuns] = @AuditViewRuns,
        [IncludeInAPI] = @IncludeInAPI,
        [AllowAllRowsAPI] = @AllowAllRowsAPI,
        [AllowUpdateAPI] = @AllowUpdateAPI,
        [AllowCreateAPI] = @AllowCreateAPI,
        [AllowDeleteAPI] = @AllowDeleteAPI,
        [CustomResolverAPI] = @CustomResolverAPI,
        [AllowUserSearchAPI] = @AllowUserSearchAPI,
        [FullTextSearchEnabled] = @FullTextSearchEnabled,
        [FullTextCatalog] = @FullTextCatalog,
        [FullTextCatalogGenerated] = @FullTextCatalogGenerated,
        [FullTextIndex] = @FullTextIndex,
        [FullTextIndexGenerated] = @FullTextIndexGenerated,
        [FullTextSearchFunction] = @FullTextSearchFunction,
        [FullTextSearchFunctionGenerated] = @FullTextSearchFunctionGenerated,
        [UserViewMaxRows] = @UserViewMaxRows,
        [spCreate] = @spCreate,
        [spUpdate] = @spUpdate,
        [spDelete] = @spDelete,
        [spCreateGenerated] = @spCreateGenerated,
        [spUpdateGenerated] = @spUpdateGenerated,
        [spDeleteGenerated] = @spDeleteGenerated,
        [CascadeDeletes] = @CascadeDeletes,
        [UserFormGenerated] = @UserFormGenerated,
        [EntityObjectSubclassName] = @EntityObjectSubclassName,
        [EntityObjectSubclassImport] = @EntityObjectSubclassImport,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwEntities WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateEntityRelationship]'
GO


CREATE PROCEDURE [dbo].[spUpdateEntityRelationship]
    @ID int,
    @EntityID int,
    @RelatedEntityID int,
    @BundleInAPI bit,
    @IncludeInParentAllQuery bit,
    @Type nchar(20),
    @EntityKeyField nvarchar(50),
    @RelatedEntityJoinField nvarchar(50),
    @JoinView nvarchar(50),
    @JoinEntityJoinField nvarchar(50),
    @JoinEntityInverseJoinField nvarchar(50),
    @DisplayInForm bit,
    @DisplayName nvarchar(50)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[EntityRelationship]
    SET 
        [EntityID] = @EntityID,
        [RelatedEntityID] = @RelatedEntityID,
        [BundleInAPI] = @BundleInAPI,
        [IncludeInParentAllQuery] = @IncludeInParentAllQuery,
        [Type] = @Type,
        [EntityKeyField] = @EntityKeyField,
        [RelatedEntityJoinField] = @RelatedEntityJoinField,
        [JoinView] = @JoinView,
        [JoinEntityJoinField] = @JoinEntityJoinField,
        [JoinEntityInverseJoinField] = @JoinEntityInverseJoinField,
        [DisplayInForm] = @DisplayInForm,
        [DisplayName] = @DisplayName,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwEntityRelationships WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateUser]'
GO


CREATE PROCEDURE [dbo].[spUpdateUser]
    @ID int,
    @Name nvarchar(100),
    @FirstName nvarchar(50),
    @LastName nvarchar(50),
    @Title nvarchar(50),
    @Email nvarchar(100),
    @Type nchar(15),
    @IsActive bit,
    @LinkedRecordType nchar(10),
    @EmployeeID int,
    @LinkedEntityID int,
    @LinkedEntityRecordID int
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[User]
    SET 
        [Name] = @Name,
        [FirstName] = @FirstName,
        [LastName] = @LastName,
        [Title] = @Title,
        [Email] = @Email,
        [Type] = @Type,
        [IsActive] = @IsActive,
        [LinkedRecordType] = @LinkedRecordType,
        [EmployeeID] = @EmployeeID,
        [LinkedEntityID] = @LinkedEntityID,
        [LinkedEntityRecordID] = @LinkedEntityRecordID,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwUsers WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateCompanyIntegrationRunDetail]'
GO


CREATE PROC [dbo].[spCreateCompanyIntegrationRunDetail]
@CompanyIntegrationRunID AS INT,
@EntityID INT=NULL,
@EntityName NVARCHAR(200)=NULL,
@RecordID INT,
@Action NCHAR(20),
@IsSuccess BIT,
@ExecutedAt DATETIMEOFFSET(7) = NULL,
@NewID AS INT OUTPUT
AS
INSERT INTO admin.CompanyIntegrationRunDetail
(  
  CompanyIntegrationRunID,
  EntityID,
  RecordID,
  Action,
  IsSuccess,
  ExecutedAt
)
VALUES
(
  @CompanyIntegrationRunID,
  IIF (@EntityID IS NULL, (SELECT ID FROM admin.Entity WHERE REPLACE(Name,' ', '')=@EntityName), @EntityID),
  @RecordID,
  @Action,
  @IsSuccess,
  IIF (@ExecutedAt IS NULL, GETDATE(), @ExecutedAt)
)

SELECT @NewID = SCOPE_IDENTITY()
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateEntityField]'
GO


CREATE PROCEDURE [dbo].[spUpdateEntityField]
    @ID int,
    @DisplayName nvarchar(50),
    @Description nvarchar(MAX),
    @Category nvarchar(100),
    @ValueListType nvarchar(20),
    @ExtendedType nvarchar(50),
    @DefaultInView bit,
    @ViewCellTemplate nvarchar(MAX),
    @DefaultColumnWidth int,
    @AllowUpdateAPI bit,
    @AllowUpdateInView bit,
    @IncludeInUserSearchAPI bit,
    @FullTextSearchEnabled bit,
    @UserSearchParamFormatAPI nvarchar(500),
    @IncludeInGeneratedForm bit,
    @GeneratedFormSection nvarchar(10),
    @IsNameField bit,
    @RelatedEntityID int,
    @RelatedEntityFieldName nvarchar(50),
    @IncludeRelatedEntityNameFieldInBaseView bit,
    @RelatedEntityNameFieldMap nvarchar(50)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[EntityField]
    SET 
        [DisplayName] = @DisplayName,
        [Description] = @Description,
        [Category] = @Category,
        [ValueListType] = @ValueListType,
        [ExtendedType] = @ExtendedType,
        [DefaultInView] = @DefaultInView,
        [ViewCellTemplate] = @ViewCellTemplate,
        [DefaultColumnWidth] = @DefaultColumnWidth,
        [AllowUpdateAPI] = @AllowUpdateAPI,
        [AllowUpdateInView] = @AllowUpdateInView,
        [IncludeInUserSearchAPI] = @IncludeInUserSearchAPI,
        [FullTextSearchEnabled] = @FullTextSearchEnabled,
        [UserSearchParamFormatAPI] = @UserSearchParamFormatAPI,
        [IncludeInGeneratedForm] = @IncludeInGeneratedForm,
        [GeneratedFormSection] = @GeneratedFormSection,
        [IsNameField] = @IsNameField,
        [RelatedEntityID] = @RelatedEntityID,
        [RelatedEntityFieldName] = @RelatedEntityFieldName,
        [IncludeRelatedEntityNameFieldInBaseView] = @IncludeRelatedEntityNameFieldInBaseView,
        [RelatedEntityNameFieldMap] = @RelatedEntityNameFieldMap,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwEntityFields WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateCompanyIntegrationRunAPILog]'
GO

CREATE PROC [dbo].[spCreateCompanyIntegrationRunAPILog](@CompanyIntegrationRunID INT, @RequestMethod NVARCHAR(12), @URL NVARCHAR(MAX), @Parameters NVARCHAR(MAX)=NULL, @IsSuccess BIT)
AS
INSERT INTO [admin].[CompanyIntegrationRunAPILog]
           ([CompanyIntegrationRunID]
           ,[RequestMethod]
		   ,[URL]
		   ,[Parameters]
           ,[IsSuccess])
     VALUES
           (@CompanyIntegrationRunID
           ,@RequestMethod
		   ,@URL
		   ,@Parameters
           ,@IsSuccess)
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteEntity]'
GO


CREATE PROCEDURE [dbo].[spDeleteEntity]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[Entity]
    WHERE 
        [ID] = @ID
    SELECT @ID AS ID -- Return the ID to indicate we successfully deleted the record
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateCompanyIntegrationRun]'
GO
CREATE PROC [dbo].[spCreateCompanyIntegrationRun]
@CompanyIntegrationID as INT,
@RunByUserID as INT,
@StartedAt as datetimeoffset(7) = NULL, 
@Comments as NVARCHAR(max) = NULL,
@TotalRecords INT = NULL,
@NewID as INT OUTPUT
AS
INSERT INTO admin.CompanyIntegrationRun
(  
  CompanyIntegrationID,
  RunByUserID,
  StartedAt,
  TotalRecords,
  Comments
)
VALUES
(
  @CompanyIntegrationID,
  @RunByUserID,
  IIF(@StartedAt IS NULL, GETDATE(), @StartedAt),
  IIF(@TotalRecords IS NULL, 0, @TotalRecords),
  @Comments 
)

SELECT @NewID = SCOPE_IDENTITY()
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteEntityRelationship]'
GO


CREATE PROCEDURE [dbo].[spDeleteEntityRelationship]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[EntityRelationship]
    WHERE 
        [ID] = @ID
    SELECT @ID AS ID -- Return the ID to indicate we successfully deleted the record
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteEntityField]'
GO


CREATE PROCEDURE [dbo].[spDeleteEntityField]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[EntityField]
    WHERE 
        [ID] = @ID
    SELECT @ID AS ID -- Return the ID to indicate we successfully deleted the record
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwErrorLogs]'
GO


CREATE VIEW [dbo].[vwErrorLogs]
AS
SELECT 
    e.*
FROM
    [admin].[ErrorLog] AS e
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwCompanyIntegrationRuns]'
GO


CREATE VIEW [dbo].[vwCompanyIntegrationRuns]
AS
SELECT 
    c.*,
    User_RunByUserID.[Name] AS [RunByUser]
FROM
    [admin].[CompanyIntegrationRun] AS c
INNER JOIN
    [admin].[User] AS User_RunByUserID
  ON
    [c].[RunByUserID] = User_RunByUserID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwCompanyIntegrationRunDetails]'
GO

CREATE VIEW [dbo].[vwCompanyIntegrationRunDetails]
AS
SELECT 
    cird.*,
	e.Name Entity,
	cir.StartedAt RunStartedAt,
	cir.EndedAt RunEndedAt
FROM
	admin.CompanyIntegrationRunDetail cird
INNER JOIN
    admin.CompanyIntegrationRun cir
ON
    cird.CompanyIntegrationRunID = cir.ID
INNER JOIN
	admin.Entity e
ON
	cird.EntityID = e.ID
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateCompanyIntegrationRunDetail]'
GO


CREATE PROCEDURE [dbo].[spUpdateCompanyIntegrationRunDetail]
    @ID int,
    @CompanyIntegrationRunID int,
    @EntityID int,
    @RecordID int,
    @Action nchar(20),
    @ExecutedAt datetime,
    @IsSuccess bit
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[CompanyIntegrationRunDetail]
    SET 
        [CompanyIntegrationRunID] = @CompanyIntegrationRunID,
        [EntityID] = @EntityID,
        [RecordID] = @RecordID,
        [Action] = @Action,
        [ExecutedAt] = @ExecutedAt,
        [IsSuccess] = @IsSuccess
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwCompanyIntegrationRunDetails WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwUserViews]'
GO

CREATE VIEW [dbo].[vwUserViews]
AS
SELECT 
	uv.*,
	u.Name UserName,
	u.FirstLast UserFirstLast,
	u.Email UserEmail,
	u.Type UserType,
	e.Name Entity,
	e.BaseView EntityBaseView
FROM
	admin.UserView uv
INNER JOIN
	vwUsers u
ON
	uv.UserID = u.ID
INNER JOIN
	admin.Entity e
ON
	uv.EntityID = e.ID


GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateUserView]'
GO


CREATE PROCEDURE [dbo].[spCreateUserView]
    @UserID int,
    @EntityID int,
    @Name nvarchar(100),
    @Description nvarchar(MAX),
    @IsShared bit,
    @IsDefault bit,
    @GridState nvarchar(MAX),
    @FilterState nvarchar(MAX),
    @CustomFilterState bit,
    @SmartFilterEnabled bit,
    @SmartFilterPrompt nvarchar(MAX),
    @SmartFilterWhereClause nvarchar(MAX),
    @SmartFilterExplanation nvarchar(MAX),
    @WhereClause nvarchar(MAX),
    @CustomWhereClause bit,
    @SortState nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[UserView]
        (
            [UserID],
            [EntityID],
            [Name],
            [Description],
            [IsShared],
            [IsDefault],
            [GridState],
            [FilterState],
            [CustomFilterState],
            [SmartFilterEnabled],
            [SmartFilterPrompt],
            [SmartFilterWhereClause],
            [SmartFilterExplanation],
            [WhereClause],
            [CustomWhereClause],
            [SortState]
        )
    VALUES
        (
            @UserID,
            @EntityID,
            @Name,
            @Description,
            @IsShared,
            @IsDefault,
            @GridState,
            @FilterState,
            @CustomFilterState,
            @SmartFilterEnabled,
            @SmartFilterPrompt,
            @SmartFilterWhereClause,
            @SmartFilterExplanation,
            @WhereClause,
            @CustomWhereClause,
            @SortState
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwUserViews WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwUserRecordLogs]'
GO

CREATE VIEW [dbo].[vwUserRecordLogs] 
AS
SELECT 
	ur.*,
	e.Name Entity,
	u.Name UserName,
	u.FirstLast UserFirstLast,
	u.Email UserEmail,
	u.EmployeeSupervisor UserSupervisor,
	u.EmployeeSupervisorEmail UserSupervisorEmail
FROM
	admin.UserRecordLog ur
INNER JOIN
	admin.Entity e 
ON
	ur.EntityID = e.ID
INNER JOIN
	vwUsers u
ON
	ur.UserID = u.ID


GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateUserRecordLog]'
GO


CREATE PROCEDURE [dbo].[spUpdateUserRecordLog]
    @ID int,
    @UserID int,
    @EntityID int,
    @RecordID int,
    @EarliestAt datetime,
    @LatestAt datetime,
    @TotalCount int
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[UserRecordLog]
    SET 
        [UserID] = @UserID,
        [EntityID] = @EntityID,
        [RecordID] = @RecordID,
        [EarliestAt] = @EarliestAt,
        [LatestAt] = @LatestAt,
        [TotalCount] = @TotalCount
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwUserRecordLogs WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateErrorLog]'
GO


CREATE PROCEDURE [dbo].[spUpdateErrorLog]
    @ID int,
    @CompanyIntegrationRunID int,
    @CompanyIntegrationRunDetailID int,
    @Code nchar(20),
    @Message nvarchar(MAX),
    @CreatedBy nvarchar(50),
    @Status nvarchar(10),
    @Category nvarchar(20),
    @Details nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[ErrorLog]
    SET 
        [CompanyIntegrationRunID] = @CompanyIntegrationRunID,
        [CompanyIntegrationRunDetailID] = @CompanyIntegrationRunDetailID,
        [Code] = @Code,
        [Message] = @Message,
        [CreatedBy] = @CreatedBy,
        [Status] = @Status,
        [Category] = @Category,
        [Details] = @Details
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwErrorLogs WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateCompanyIntegrationRun]'
GO


CREATE PROCEDURE [dbo].[spUpdateCompanyIntegrationRun]
    @ID int,
    @CompanyIntegrationID int,
    @RunByUserID int,
    @StartedAt datetime,
    @EndedAt datetime,
    @TotalRecords int,
    @Comments nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[CompanyIntegrationRun]
    SET 
        [CompanyIntegrationID] = @CompanyIntegrationID,
        [RunByUserID] = @RunByUserID,
        [StartedAt] = @StartedAt,
        [EndedAt] = @EndedAt,
        [TotalRecords] = @TotalRecords,
        [Comments] = @Comments
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwCompanyIntegrationRuns WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateUserView]'
GO


CREATE PROCEDURE [dbo].[spUpdateUserView]
    @ID int,
    @UserID int,
    @EntityID int,
    @Name nvarchar(100),
    @Description nvarchar(MAX),
    @IsShared bit,
    @IsDefault bit,
    @GridState nvarchar(MAX),
    @FilterState nvarchar(MAX),
    @CustomFilterState bit,
    @SmartFilterEnabled bit,
    @SmartFilterPrompt nvarchar(MAX),
    @SmartFilterWhereClause nvarchar(MAX),
    @SmartFilterExplanation nvarchar(MAX),
    @WhereClause nvarchar(MAX),
    @CustomWhereClause bit,
    @SortState nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[UserView]
    SET 
        [UserID] = @UserID,
        [EntityID] = @EntityID,
        [Name] = @Name,
        [Description] = @Description,
        [IsShared] = @IsShared,
        [IsDefault] = @IsDefault,
        [GridState] = @GridState,
        [FilterState] = @FilterState,
        [CustomFilterState] = @CustomFilterState,
        [SmartFilterEnabled] = @SmartFilterEnabled,
        [SmartFilterPrompt] = @SmartFilterPrompt,
        [SmartFilterWhereClause] = @SmartFilterWhereClause,
        [SmartFilterExplanation] = @SmartFilterExplanation,
        [WhereClause] = @WhereClause,
        [CustomWhereClause] = @CustomWhereClause,
        [SortState] = @SortState,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwUserViews WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteUserView]'
GO


CREATE PROCEDURE [dbo].[spDeleteUserView]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[UserView]
    WHERE 
        [ID] = @ID
    SELECT @ID AS ID -- Return the ID to indicate we successfully deleted the record
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwUserApplications]'
GO


CREATE VIEW [dbo].[vwUserApplications]
AS
SELECT 
    u.*,
    User_UserID.[Name] AS [User],
    Application_ApplicationID.[Name] AS [Application]
FROM
    [admin].[UserApplication] AS u
INNER JOIN
    [admin].[User] AS User_UserID
  ON
    [u].[UserID] = User_UserID.[ID]
INNER JOIN
    [admin].[Application] AS Application_ApplicationID
  ON
    [u].[ApplicationID] = Application_ApplicationID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwApplicationEntities]'
GO

CREATE VIEW [dbo].[vwApplicationEntities]
AS
SELECT 
   ae.*,
   a.Name Application,
   e.Name Entity,
   e.BaseTable EntityBaseTable,
   e.CodeName EntityCodeName,
   e.ClassName EntityClassName,
   e.BaseTableCodeName EntityBaseTableCodeName
FROM
   admin.ApplicationEntity ae
INNER JOIN
   admin.Application a
ON
   ae.ApplicationName = a.Name
INNER JOIN
   vwEntities e
ON
   ae.EntityID = e.ID
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateApplicationEntity]'
GO


CREATE PROCEDURE [dbo].[spCreateApplicationEntity]
    @ApplicationName nvarchar(50),
    @EntityID int,
    @Sequence int,
    @DefaultForNewUser bit
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[ApplicationEntity]
        (
            [ApplicationName],
            [EntityID],
            [Sequence],
            [DefaultForNewUser]
        )
    VALUES
        (
            @ApplicationName,
            @EntityID,
            @Sequence,
            @DefaultForNewUser
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwApplicationEntities WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwEntityPermissions]'
GO


CREATE VIEW [dbo].[vwEntityPermissions]
AS
SELECT 
    e.*,
    Entity_EntityID.[Name] AS [Entity],
	Role_RoleName.[SQLName] as [RoleSQLName], -- custom bit here to add in this field for vwEntityPermissions
	rlsC.Name as [CreateRLSFilter],
	rlsR.Name as [ReadRLSFilter],
	rlsU.Name as [UpdateRLSFilter],
	rlsD.Name as [DeleteRLSFilter]
FROM
    [admin].[EntityPermission] AS e
INNER JOIN
    [admin].[Entity] AS Entity_EntityID
  ON
    [e].[EntityID] = Entity_EntityID.[ID]
INNER JOIN
    [admin].[Role] AS Role_RoleName
  ON
    [e].[RoleName] = Role_RoleName.[Name]
LEFT OUTER JOIN
	[admin].RowLevelSecurityFilter rlsC
  ON
    [e].CreateRLSFilterID = rlsC.ID
LEFT OUTER JOIN
	[admin].RowLevelSecurityFilter rlsR
  ON
    [e].ReadRLSFilterID = rlsR.ID
LEFT OUTER JOIN
	[admin].RowLevelSecurityFilter rlsU
  ON
    [e].UpdateRLSFilterID = rlsU.ID
LEFT OUTER JOIN
	[admin].RowLevelSecurityFilter rlsD
  ON
    [e].DeleteRLSFilterID = rlsD.ID
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateEntityPermission]'
GO


CREATE PROCEDURE [dbo].[spCreateEntityPermission]
    @EntityID int,
    @RoleName nvarchar(50),
    @CanCreate bit,
    @CanRead bit,
    @CanUpdate bit,
    @CanDelete bit,
    @ReadRLSFilterID int,
    @CreateRLSFilterID int,
    @UpdateRLSFilterID int,
    @DeleteRLSFilterID int
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[EntityPermission]
        (
            [EntityID],
            [RoleName],
            [CanCreate],
            [CanRead],
            [CanUpdate],
            [CanDelete],
            [ReadRLSFilterID],
            [CreateRLSFilterID],
            [UpdateRLSFilterID],
            [DeleteRLSFilterID]
        )
    VALUES
        (
            @EntityID,
            @RoleName,
            @CanCreate,
            @CanRead,
            @CanUpdate,
            @CanDelete,
            @ReadRLSFilterID,
            @CreateRLSFilterID,
            @UpdateRLSFilterID,
            @DeleteRLSFilterID
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwEntityPermissions WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwUserApplicationEntities]'
GO

CREATE VIEW [dbo].[vwUserApplicationEntities]
AS
SELECT 
   uae.*,
   ua.Application Application,
   ua.[User] [User],
   e.Name Entity
FROM
   admin.UserApplicationEntity uae
INNER JOIN
   vwUserApplications ua
ON
   uae.UserApplicationID = ua.ID
INNER JOIN
   admin.Entity e
ON
   uae.EntityID = e.ID
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateUserApplicationEntity]'
GO


CREATE PROCEDURE [dbo].[spCreateUserApplicationEntity]
    @UserApplicationID int,
    @EntityID int,
    @Sequence int
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[UserApplicationEntity]
        (
            [UserApplicationID],
            [EntityID],
            [Sequence]
        )
    VALUES
        (
            @UserApplicationID,
            @EntityID,
            @Sequence
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwUserApplicationEntities WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateUserViews]'
GO

CREATE PROCEDURE [dbo].[spUpdateUserViews]
    @ID int,
    @UserID int,
    @EntityID int,
    @Name nvarchar(200),
    @Description nvarchar(MAX),
    @IsShared bit,
    @IsDefault bit,
    @GridState nvarchar(MAX),
    @FilterState nvarchar(MAX),
    @CustomFilterState bit,
    @WhereClause nvarchar(MAX),
    @CustomWhereClause bit
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[UserView]
    SET 
        UserID = @UserID,
        EntityID = @EntityID,
        Name = @Name,
        Description = @Description,
        IsShared = @IsShared,
        IsDefault = @IsDefault,
        GridState = @GridState,
        FilterState = @FilterState,
        CustomFilterState = @CustomFilterState,
        WhereClause = @WhereClause,
        CustomWhereClause = @CustomWhereClause,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwUserViews WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateApplication]'
GO


CREATE PROCEDURE [dbo].[spUpdateApplication]
    @ID int,
    @Name nvarchar(50),
    @Description nvarchar(500)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[Application]
    SET 
        [Name] = @Name,
        [Description] = @Description,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwApplications WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateUserApplication]'
GO


CREATE PROCEDURE [dbo].[spUpdateUserApplication]
    @ID int,
    @UserID int,
    @ApplicationID int,
    @Sequence int,
    @IsActive bit
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[UserApplication]
    SET 
        [UserID] = @UserID,
        [ApplicationID] = @ApplicationID,
        [Sequence] = @Sequence,
        [IsActive] = @IsActive
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwUserApplications WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateApplicationEntity]'
GO


CREATE PROCEDURE [dbo].[spUpdateApplicationEntity]
    @ID int,
    @ApplicationName nvarchar(50),
    @EntityID int,
    @Sequence int,
    @DefaultForNewUser bit
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[ApplicationEntity]
    SET 
        [ApplicationName] = @ApplicationName,
        [EntityID] = @EntityID,
        [Sequence] = @Sequence,
        [DefaultForNewUser] = @DefaultForNewUser,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwApplicationEntities WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateEntityPermission]'
GO


CREATE PROCEDURE [dbo].[spUpdateEntityPermission]
    @ID int,
    @EntityID int,
    @RoleName nvarchar(50),
    @CanCreate bit,
    @CanRead bit,
    @CanUpdate bit,
    @CanDelete bit,
    @ReadRLSFilterID int,
    @CreateRLSFilterID int,
    @UpdateRLSFilterID int,
    @DeleteRLSFilterID int
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[EntityPermission]
    SET 
        [EntityID] = @EntityID,
        [RoleName] = @RoleName,
        [CanCreate] = @CanCreate,
        [CanRead] = @CanRead,
        [CanUpdate] = @CanUpdate,
        [CanDelete] = @CanDelete,
        [ReadRLSFilterID] = @ReadRLSFilterID,
        [CreateRLSFilterID] = @CreateRLSFilterID,
        [UpdateRLSFilterID] = @UpdateRLSFilterID,
        [DeleteRLSFilterID] = @DeleteRLSFilterID,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwEntityPermissions WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateUsers]'
GO

CREATE PROCEDURE [dbo].[spUpdateUsers]
    @ID int,
    @Name nvarchar(200),
    @Type nchar,
    @EmployeeID int,
    @IsActive bit
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[User]
    SET 
        Name = @Name,
        Type = @Type,
        EmployeeID = @EmployeeID,
        IsActive = @IsActive,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwUsers WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateUserApplicationEntity]'
GO


CREATE PROCEDURE [dbo].[spUpdateUserApplicationEntity]
    @ID int,
    @UserApplicationID int,
    @EntityID int,
    @Sequence int
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[UserApplicationEntity]
    SET 
        [UserApplicationID] = @UserApplicationID,
        [EntityID] = @EntityID,
        [Sequence] = @Sequence
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwUserApplicationEntities WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteEntityPermission]'
GO


CREATE PROCEDURE [dbo].[spDeleteEntityPermission]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[EntityPermission]
    WHERE 
        [ID] = @ID
    SELECT @ID AS ID -- Return the ID to indicate we successfully deleted the record
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteApplicationEntity]'
GO


CREATE PROCEDURE [dbo].[spDeleteApplicationEntity]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[ApplicationEntity]
    WHERE 
        [ID] = @ID
    SELECT @ID AS ID -- Return the ID to indicate we successfully deleted the record
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteUserApplicationEntity]'
GO


CREATE PROCEDURE [dbo].[spDeleteUserApplicationEntity]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[UserApplicationEntity]
    WHERE 
        [ID] = @ID
    SELECT @ID AS ID -- Return the ID to indicate we successfully deleted the record
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwUserViewRuns]'
GO


CREATE VIEW [dbo].[vwUserViewRuns]
AS
SELECT 
    u.*,
    UserView_UserViewID.[Name] AS [UserView],
    User_RunByUserID.[Name] AS [RunByUser]
FROM
    [admin].[UserViewRun] AS u
INNER JOIN
    [admin].[UserView] AS UserView_UserViewID
  ON
    [u].[UserViewID] = UserView_UserViewID.[ID]
INNER JOIN
    [admin].[User] AS User_RunByUserID
  ON
    [u].[RunByUserID] = User_RunByUserID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwCompanyIntegrationRunAPILogs]'
GO


CREATE VIEW [dbo].[vwCompanyIntegrationRunAPILogs]
AS
SELECT 
    c.*
FROM
    [admin].[CompanyIntegrationRunAPILog] AS c
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwLists]'
GO


CREATE VIEW [dbo].[vwLists]
AS
SELECT 
    l.*,
    Entity_EntityID.[Name] AS [Entity],
    User_UserID.[Name] AS [User]
FROM
    [admin].[List] AS l
LEFT OUTER JOIN
    [admin].[Entity] AS Entity_EntityID
  ON
    [l].[EntityID] = Entity_EntityID.[ID]
INNER JOIN
    [admin].[User] AS User_UserID
  ON
    [l].[UserID] = User_UserID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateSkills]'
GO

CREATE PROCEDURE [dbo].[spUpdateSkills]
    @ID char,
    @Name nvarchar(100),
    @ParentID nvarchar(100)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[Skill]
    SET 
        Name = @Name,
        ParentID = @ParentID,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwSkills WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwListDetails]'
GO


CREATE VIEW [dbo].[vwListDetails]
AS
SELECT 
    l.*
FROM
    [admin].[ListDetail] AS l
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateSkill]'
GO


CREATE PROCEDURE [dbo].[spUpdateSkill]
    @ID char(36),
    @Name nvarchar(50),
    @ParentID nvarchar(50)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[Skill]
    SET 
        Name = @Name,
        ParentID = @ParentID,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwSkills WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwUserViewRunDetails]'
GO


CREATE VIEW [dbo].[vwUserViewRunDetails]
AS
SELECT 
    u.*,
	uv.ID UserViewID,
	uv.EntityID
FROM
    [admin].[UserViewRunDetail] AS u
INNER JOIN
	[admin].[UserViewRun] as uvr
  ON
    u.UserViewRunID = uvr.ID
INNER JOIN
    [admin].[UserView] uv
  ON
    uvr.UserViewID = uv.ID
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateUserViewRunDetail]'
GO


CREATE PROCEDURE [dbo].[spCreateUserViewRunDetail]
    @UserViewRunID int,
    @RecordID int
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[UserViewRunDetail]
        (
            [UserViewRunID],
            [RecordID]
        )
    VALUES
        (
            @UserViewRunID,
            @RecordID
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwUserViewRunDetails WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateUserViewRun]'
GO


CREATE PROCEDURE [dbo].[spCreateUserViewRun]
    @UserViewID int,
    @RunAt datetime,
    @RunByUserID int
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[UserViewRun]
        (
            [UserViewID],
            [RunAt],
            [RunByUserID]
        )
    VALUES
        (
            @UserViewID,
            @RunAt,
            @RunByUserID
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwUserViewRuns WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateCompanyIntegrationRunAPILog]'
GO


CREATE PROCEDURE [dbo].[spUpdateCompanyIntegrationRunAPILog]
    @ID int,
    @CompanyIntegrationRunID int,
    @ExecutedAt datetime,
    @IsSuccess bit,
    @RequestMethod nvarchar(12),
    @URL nvarchar(MAX),
    @Parameters nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[CompanyIntegrationRunAPILog]
    SET 
        [CompanyIntegrationRunID] = @CompanyIntegrationRunID,
        [ExecutedAt] = @ExecutedAt,
        [IsSuccess] = @IsSuccess,
        [RequestMethod] = @RequestMethod,
        [URL] = @URL,
        [Parameters] = @Parameters
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwCompanyIntegrationRunAPILogs WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateListDetail]'
GO


CREATE PROCEDURE [dbo].[spCreateListDetail]
    @ListID int,
    @RecordID int,
    @Sequence int
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[ListDetail]
        (
            [ListID],
            [RecordID],
            [Sequence]
        )
    VALUES
        (
            @ListID,
            @RecordID,
            @Sequence
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwListDetails WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateList]'
GO


CREATE PROCEDURE [dbo].[spCreateList]
    @Name nvarchar(100),
    @Description nvarchar(MAX),
    @EntityID int,
    @UserID int,
    @ExternalSystemRecordID nvarchar(100),
    @CompanyIntegrationID int
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[List]
        (
            [Name],
            [Description],
            [EntityID],
            [UserID],
            [ExternalSystemRecordID],
            [CompanyIntegrationID]
        )
    VALUES
        (
            @Name,
            @Description,
            @EntityID,
            @UserID,
            @ExternalSystemRecordID,
            @CompanyIntegrationID
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwLists WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateUserViewRunDetail]'
GO


CREATE PROCEDURE [dbo].[spUpdateUserViewRunDetail]
    @ID int,
    @UserViewRunID int,
    @RecordID int
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[UserViewRunDetail]
    SET 
        [UserViewRunID] = @UserViewRunID,
        [RecordID] = @RecordID
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwUserViewRunDetails WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateUserViewRun]'
GO


CREATE PROCEDURE [dbo].[spUpdateUserViewRun]
    @ID int,
    @UserViewID int,
    @RunAt datetime,
    @RunByUserID int
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[UserViewRun]
    SET 
        [UserViewID] = @UserViewID,
        [RunAt] = @RunAt,
        [RunByUserID] = @RunByUserID
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwUserViewRuns WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateListDetail]'
GO


CREATE PROCEDURE [dbo].[spUpdateListDetail]
    @ID int,
    @ListID int,
    @RecordID int,
    @Sequence int
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[ListDetail]
    SET 
        [ListID] = @ListID,
        [RecordID] = @RecordID,
        [Sequence] = @Sequence
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwListDetails WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateList]'
GO


CREATE PROCEDURE [dbo].[spUpdateList]
    @ID int,
    @Name nvarchar(100),
    @Description nvarchar(MAX),
    @EntityID int,
    @UserID int,
    @ExternalSystemRecordID nvarchar(100),
    @CompanyIntegrationID int
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[List]
    SET 
        [Name] = @Name,
        [Description] = @Description,
        [EntityID] = @EntityID,
        [UserID] = @UserID,
        [ExternalSystemRecordID] = @ExternalSystemRecordID,
        [CompanyIntegrationID] = @CompanyIntegrationID,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwLists WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteListDetail]'
GO


CREATE PROCEDURE [dbo].[spDeleteListDetail]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[ListDetail]
    WHERE 
        [ID] = @ID
    SELECT @ID AS ID -- Return the ID to indicate we successfully deleted the record
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spDeleteList]'
GO


CREATE PROCEDURE [dbo].[spDeleteList]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[List]
    WHERE 
        [ID] = @ID
    SELECT @ID AS ID -- Return the ID to indicate we successfully deleted the record
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwWorkflows]'
GO


CREATE VIEW [dbo].[vwWorkflows]
AS
SELECT 
    w.*
FROM
    [admin].[Workflow] AS w
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwRecordChanges]'
GO


CREATE VIEW [dbo].[vwRecordChanges]
AS
SELECT 
    r.*,
    Entity_EntityID.[Name] AS [Entity],
    User_UserID.[Name] AS [User]
FROM
    [admin].[RecordChange] AS r
INNER JOIN
    [admin].[Entity] AS Entity_EntityID
  ON
    [r].[EntityID] = Entity_EntityID.[ID]
INNER JOIN
    [admin].[User] AS User_UserID
  ON
    [r].[UserID] = User_UserID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwWorkflowRuns]'
GO

CREATE VIEW [dbo].[vwWorkflowRuns]
AS
SELECT 
  wr.*,
  w.Name Workflow,
  w.WorkflowEngineName
FROM
  admin.WorkflowRun wr
INNER JOIN
  vwWorkflows w
ON
  wr.WorkflowName = w.Name
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwUserRoles]'
GO


CREATE VIEW [dbo].[vwUserRoles]
AS
SELECT 
    u.*,
    User_UserID.[Name] AS [User]
FROM
    [admin].[UserRole] AS u
INNER JOIN
    [admin].[User] AS User_UserID
  ON
    [u].[UserID] = User_UserID.[ID]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwForeignKeys]'
GO

CREATE VIEW [dbo].[vwForeignKeys]
AS
SELECT  obj.name AS FK_NAME,
    sch.name AS [schema_name],
    tab1.name AS [table],
    col1.name AS [column],
    tab2.name AS [referenced_table],
    col2.name AS [referenced_column]
FROM sys.foreign_key_columns fkc
INNER JOIN sys.objects obj
    ON obj.object_id = fkc.constraint_object_id
INNER JOIN sys.tables tab1
    ON tab1.object_id = fkc.parent_object_id
INNER JOIN sys.schemas sch
    ON tab1.schema_id = sch.schema_id
INNER JOIN sys.columns col1
    ON col1.column_id = parent_column_id AND col1.object_id = tab1.object_id
INNER JOIN sys.tables tab2
    ON tab2.object_id = fkc.referenced_object_id
INNER JOIN sys.columns col2
    ON col2.column_id = referenced_column_id AND col2.object_id = tab2.object_id
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateExistingEntityFieldsFromSchema]'
GO
CREATE PROC [dbo].[spUpdateExistingEntityFieldsFromSchema]
AS
UPDATE [admin].EntityField
SET
	Type = fromSQL.Type,
	Length = fromSQL.Length,
	Precision = fromSQL.Precision,
	Scale = fromSQL.Scale,
	AllowsNull = fromSQL.AllowsNull,
	DefaultValue = fromSQL.DefaultValue,
	AutoIncrement = fromSQL.AutoIncrement,
	IsVirtual = fromSQL.IsVirtual,
	Sequence = fromSQL.Sequence,
	RelatedEntityID = re.ID,
	RelatedEntityFieldName = fk.referenced_column,
	UpdatedAt = GETDATE() -- this will reflect an update data even if no changes were made, not optimal but doesn't really matter that much either
FROM
	[admin].EntityField ef
INNER JOIN
	vwSQLColumnsAndEntityFields fromSQL
ON
	ef.EntityID = fromSQL.EntityID AND
	ef.Name = fromSQL.FieldName
INNER JOIN
    [admin].Entity e 
ON
    ef.EntityID = e.ID
LEFT OUTER JOIN
	vwForeignKeys fk
ON
	ef.Name = fk.[column] AND
	e.BaseTable = fk.[table]
LEFT OUTER JOIN 
    [admin].Entity re -- Related Entity
ON
	re.BaseTable = fk.referenced_table
WHERE
	EntityFieldID IS NOT NULL -- only where we HAVE ALREADY CREATED EntityField records
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[vwWorkflowEngines]'
GO


CREATE VIEW [dbo].[vwWorkflowEngines]
AS
SELECT 
    w.*
FROM
    [admin].[WorkflowEngine] AS w
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateRecordChange]'
GO


CREATE PROCEDURE [dbo].[spCreateRecordChange]
    @EntityName nvarchar(100),
    @RecordID int,
	@UserID int,
    @ChangesJSON nvarchar(MAX),
    @ChangesDescription nvarchar(MAX),
    @FullRecordJSON nvarchar(MAX),
    @Status nchar(15),
    @Comments nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[RecordChange]
        (
            EntityID,
            RecordID,
			UserID,
            ChangedAt,
            ChangesJSON,
            ChangesDescription,
            FullRecordJSON,
            Status,
            Comments
        )
    VALUES
        (
            (SELECT ID FROM admin.Entity WHERE Name = @EntityName),
            @RecordID,
			@UserID,
            GETDATE(),
            @ChangesJSON,
            @ChangesDescription,
            @FullRecordJSON,
            @Status,
            @Comments
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwRecordChanges WHERE ID = SCOPE_IDENTITY()
END




GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateWorkflowRun]'
GO


CREATE PROCEDURE [dbo].[spUpdateWorkflowRun]
    @ID int,
    @WorkflowName nvarchar(100),
    @ExternalSystemRecordID nvarchar(100),
    @StartedAt datetime,
    @EndedAt datetime,
    @Status nchar(10),
    @Results nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[WorkflowRun]
    SET 
        [WorkflowName] = @WorkflowName,
        [ExternalSystemRecordID] = @ExternalSystemRecordID,
        [StartedAt] = @StartedAt,
        [EndedAt] = @EndedAt,
        [Status] = @Status,
        [Results] = @Results
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwWorkflowRuns WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateWorkflow]'
GO


CREATE PROCEDURE [dbo].[spUpdateWorkflow]
    @ID int,
    @Name nvarchar(100),
    @Description nvarchar(MAX),
    @WorkflowEngineName nvarchar(100),
    @CompanyName nvarchar(50),
    @ExternalSystemRecordID nvarchar(100)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[Workflow]
    SET 
        [Name] = @Name,
        [Description] = @Description,
        [WorkflowEngineName] = @WorkflowEngineName,
        [CompanyName] = @CompanyName,
        [ExternalSystemRecordID] = @ExternalSystemRecordID,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwWorkflows WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateUserRole]'
GO


CREATE PROCEDURE [dbo].[spCreateUserRole]
    @UserID int,
    @RoleName nvarchar(50)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[UserRole]
        (
            [UserID],
            [RoleName]
        )
    VALUES
        (
            @UserID,
            @RoleName
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwUserRoles WHERE ID = SCOPE_IDENTITY()
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spCreateUserViewRunWithDetail]'
GO


CREATE PROCEDURE [dbo].[spCreateUserViewRunWithDetail](@UserViewID INT, @UserEmail NVARCHAR(255), @RecordIDList admin.IDListTableType READONLY) 
AS
DECLARE @RunID INT
DECLARE @Now DATETIME
SELECT @Now=GETDATE()
DECLARE @outputTable TABLE (ID INT, UserViewID INT, RunAt DATETIME, RunByUserID INT, UserView NVARCHAR(100), RunByUser NVARCHAR(100))
DECLARE @UserID INT
SELECT @UserID=ID FROM vwUsers WHERE Email=@UserEmail
INSERT INTO @outputTable
EXEC spCreateUserViewRun @UserViewID=@UserViewID,@RunAt=@Now,@RunByUserID=@UserID
SELECT @RunID = ID FROM @outputTable
INSERT INTO admin.UserViewRunDetail 
(
    UserViewRunID,
    RecordID
)
(
    SELECT @RunID, ID FROM @RecordIDList
)
SELECT @RunID 'UserViewRunID'
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateEntityFieldRelatedEntityNameFieldMap]'
GO
CREATE PROC [dbo].[spUpdateEntityFieldRelatedEntityNameFieldMap] 
(
	@EntityFieldID INT, 
	@RelatedEntityNameFieldMap nvarchar(50)
)
AS
UPDATE 
	admin.EntityField 
SET 
	RelatedEntityNameFieldMap = @RelatedEntityNameFieldMap
WHERE
	ID = @EntityFieldID
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[spUpdateWorkflowEngine]'
GO


CREATE PROCEDURE [dbo].[spUpdateWorkflowEngine]
    @ID int,
    @Name nvarchar(100),
    @Description nvarchar(MAX),
    @DriverPath nvarchar(500),
    @DriverClass nvarchar(100)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[WorkflowEngine]
    SET 
        [Name] = @Name,
        [Description] = @Description,
        [DriverPath] = @DriverPath,
        [DriverClass] = @DriverClass,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwWorkflowEngines WHERE ID = @ID
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[ToProperCase]'
GO

CREATE FUNCTION [dbo].[ToProperCase](@string VARCHAR(255)) RETURNS VARCHAR(255)
AS
BEGIN
  DECLARE @i INT           -- index
  DECLARE @l INT           -- input length
  DECLARE @c NCHAR(1)      -- current char
  DECLARE @f INT           -- first letter flag (1/0)
  DECLARE @o VARCHAR(255)  -- output string
  DECLARE @w VARCHAR(10)   -- characters considered as white space

  SET @w = '[' + CHAR(13) + CHAR(10) + CHAR(9) + CHAR(160) + ' ' + ']'
  SET @i = 1
  SET @l = LEN(@string)
  SET @f = 1
  SET @o = ''

  WHILE @i <= @l
  BEGIN
    SET @c = SUBSTRING(@string, @i, 1)
    IF @f = 1 
    BEGIN
     SET @o = @o + @c
     SET @f = 0
    END
    ELSE
    BEGIN
     SET @o = @o + LOWER(@c)
    END

    IF @c LIKE @w SET @f = 1

    SET @i = @i + 1
  END

  RETURN @o
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[ToTitleCase]'
GO

CREATE FUNCTION [dbo].[ToTitleCase] (@InputString varchar(4000))
RETURNS varchar(4000)
AS
BEGIN
    DECLARE @Index INT
    DECLARE @Char CHAR(1)
    DECLARE @OutputString varchar(255)
    SET @OutputString = LOWER(@InputString)
    SET @Index = 2
    SET @OutputString = STUFF(@OutputString, 1, 1, UPPER(SUBSTRING(@InputString,1,1)))

    WHILE @Index <= LEN(@InputString)
    BEGIN
        SET @Char = SUBSTRING(@InputString, @Index, 1)
        IF @Char IN (' ', ';', ':', '!', '?', ',', '.', '_', '-', '/', '&', '''', '(')
        BEGIN
            IF @Index + 1 <= LEN(@InputString)
            BEGIN
                SET @OutputString = STUFF(@OutputString, @Index + 1, 1, UPPER(SUBSTRING(@InputString, @Index + 1, 1)))
            END
        END
        SET @Index = @Index + 1
    END

    RETURN @OutputString

END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[createDeleteSP]'
GO

CREATE FUNCTION [dbo].[createDeleteSP]
(
	@spSchema varchar(200),
	@spTable varchar(200)
)
RETURNS varchar(max)
AS
BEGIN

	declare @SQL_DROP varchar(max)
	declare @SQL varchar(max)
	declare @COLUMNS varchar(max)
	declare @PK_COLUMN varchar(200)
	
	set @SQL = ''
	set @SQL_DROP = ''
	set @COLUMNS = ''
	
	-- generate the drop
	set @SQL_DROP = @SQL_DROP + 'IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N''[' + @spSchema + '].[delete' + @spTable + ']'') AND type in (N''P'', N''PC''))' + char(13)
	set @SQL_DROP = @SQL_DROP + 'DROP PROCEDURE [' + @spSchema + '].[delete' + @spTable + ']'
	
	set @SQL = @SQL + 'CREATE PROC [' + @spSchema + '].[delete' + @spTable + ']' + char(13)
	set @SQL = @SQL + '(' + char(13)
	
	-- now put all the table columns in
	set @PK_COLUMN = 
	(
	select c.column_name
	from information_schema.table_constraints pk 
	inner join information_schema.key_column_usage c 
		on c.table_name = pk.table_name 
		and c.constraint_name = pk.constraint_name
	where pk.TABLE_SCHEMA = @spSchema
		and pk.TABLE_NAME = @spTable
		and pk.constraint_type = 'primary key'
		and c.column_name in
			(
			select COLUMN_NAME
			from INFORMATION_SCHEMA.COLUMNS
			where columnproperty(object_id(quotename(@spSchema) + '.' + 
			quotename(@spTable)), COLUMN_NAME, 'IsIdentity') = 1
			group by COLUMN_NAME
			)
	group by column_name
	having COUNT(column_name) = 1
	)
	
	select @COLUMNS = @COLUMNS + '@' + COLUMN_NAME 
			+ ' as ' 
			+ (case DATA_TYPE when 'numeric' then DATA_TYPE + '(' + convert(varchar(10), NUMERIC_PRECISION) + ',' + convert(varchar(10), NUMERIC_SCALE) + ')' else DATA_TYPE end)
			+ (case when CHARACTER_MAXIMUM_LENGTH is not null then '(' + case when CONVERT(varchar(10), CHARACTER_MAXIMUM_LENGTH) = '-1' then 'max' else CONVERT(varchar(10), CHARACTER_MAXIMUM_LENGTH) end + ')' else '' end)
			+ ',' + char(13) 
	from INFORMATION_SCHEMA.COLUMNS 
	where TABLE_SCHEMA = @spSchema
		and TABLE_NAME = @spTable
		and COLUMN_NAME = @PK_COLUMN
	order by ORDINAL_POSITION
	
	set @SQL = @SQL + left(@COLUMNS, len(@COLUMNS) - 2) + char(13)
	
	set @SQL = @SQL + ')' + char(13)
	set @SQL = @SQL + 'AS' + char(13)
	set @SQL = @SQL + '' + char(13)
	
	-- metadata here
	set @SQL = @SQL + '-- Author: Auto' + char(13)
	set @SQL = @SQL + '-- Created: ' + convert(varchar(11), getdate(), 106) + char(13)
	set @SQL = @SQL + '-- Function: Delete a ' + @spTable + ' table record' + char(13)
	set @SQL = @SQL + '' + char(13)
	set @SQL = @SQL + '-- Modifications:' + char(13)
	set @SQL = @SQL + '' + char(13)
	
	-- body here
	
	-- Delete from the database in a transaction
	set @SQL = @SQL + 'begin transaction' + char(13) + char(13) 
	
	set @SQL = @SQL + 'begin try' + char(13) + char(13) 
	
	set @SQL = @SQL + '	-- delete' + char(13)
	
	-- code the delete
	set @SQL = @SQL + '	delete [' + @spSchema + '].[' + @spTable + ']' + char(13)
	set @SQL = @SQL + '	where ' + @PK_COLUMN + ' = @' + @PK_COLUMN + char(13)
	set @SQL = @SQL + '' + char(13)
	set @SQL = @SQL + '	commit transaction' + char(13) + char(13)
	
	set @SQL = @SQL + 'end try' + char(13) + char(13)
	
	set @SQL = @SQL + 'begin catch' + char(13) + char(13)  
		
	set @SQL = @SQL + '	declare @ErrorMessage NVARCHAR(4000);' + char(13)
	set @SQL = @SQL + '	declare @ErrorSeverity INT;' + char(13)
	set @SQL = @SQL + '	declare @ErrorState INT;' + char(13) + char(13)
	set @SQL = @SQL + '	select @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = ERROR_STATE();' + char(13) + char(13)
	set @SQL = @SQL + '	raiserror (@ErrorMessage, @ErrorSeverity, @ErrorState);' + char(13) + char(13)
	set @SQL = @SQL + '	rollback transaction' + char(13) + char(13)
	
	set @SQL = @SQL + 'end catch;' + char(13) + char(13)
  
	RETURN @SQL_DROP + '||' + @SQL

END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[createInsertSP]'
GO

CREATE FUNCTION [dbo].[createInsertSP]
(
	@spSchema varchar(200),
	@spTable varchar(200)
)
RETURNS varchar(max)
AS
BEGIN
 
	declare @SQL_DROP varchar(max)
	declare @SQL varchar(max)
	declare @COLUMNS varchar(max)
	declare @PK_COLUMN varchar(200)
 	
	set @SQL = ''
	set @SQL_DROP = ''
	set @COLUMNS = ''
 	
	-- step 1: generate the drop statement and then the create statement
	set @SQL_DROP = @SQL_DROP + 'IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N''[' + @spSchema + '].[insert' + @spTable + ']'') AND type in (N''P'', N''PC''))' + char(13)
	set @SQL_DROP = @SQL_DROP + 'DROP PROCEDURE [' + @spSchema + '].[insert' + @spTable + ']'
 	
	set @SQL = @SQL + 'CREATE PROC [' + @spSchema + '].[insert' + @spTable + ']' + char(13)
	set @SQL = @SQL + '(' + char(13)
 	
	-- step 2: ascertain what the primary key column for the table is
	set @PK_COLUMN = 
	(
	select c.column_name
	from information_schema.table_constraints pk 
	inner join information_schema.key_column_usage c 
		on c.table_name = pk.table_name 
		and c.constraint_name = pk.constraint_name
	where pk.TABLE_SCHEMA = @spSchema
		and pk.TABLE_NAME = @spTable
		and pk.constraint_type = 'primary key'
		and c.column_name in
			(
			select COLUMN_NAME
			from INFORMATION_SCHEMA.COLUMNS
			where columnproperty(object_id(quotename(@spSchema) + '.' + 
			quotename(@spTable)), COLUMN_NAME, 'IsIdentity') = 1 -- ensure the primary key is an identity column
			group by COLUMN_NAME
			)
	group by column_name
	having COUNT(column_name) = 1 -- ensure there is only one primary key
	)
 	
 	-- step 3: now put all the table columns in bar the primary key (as this is an insert and it is an identity column)
	select @COLUMNS = @COLUMNS + '@' + COLUMN_NAME 
			+ ' as ' 
			+ (case DATA_TYPE when 'numeric' then DATA_TYPE + '(' + convert(varchar(10), NUMERIC_PRECISION) + ',' + convert(varchar(10), NUMERIC_SCALE) + ')' else DATA_TYPE end)
			+ (case when CHARACTER_MAXIMUM_LENGTH is not null then '(' + case when CONVERT(varchar(10), CHARACTER_MAXIMUM_LENGTH) = '-1' then 'max' else CONVERT(varchar(10), CHARACTER_MAXIMUM_LENGTH) end + ')' else '' end)
			+ (case 
				when IS_NULLABLE = 'YES'
					then
						case when COLUMN_DEFAULT is null
							then ' = Null'
							else ''
						end
					else
						case when COLUMN_DEFAULT is null
							then ''
							else
								case when COLUMN_NAME = @PK_COLUMN
									then ''
									else ' = ' + replace(replace(COLUMN_DEFAULT, '(', ''), ')', '')
								end
						end
				end)
			+ ',' + char(13) 
	from INFORMATION_SCHEMA.COLUMNS
	where TABLE_SCHEMA = @spSchema 
		and TABLE_NAME = @spTable
		and COLUMN_NAME <> @PK_COLUMN
	order by ORDINAL_POSITION
 	
	set @SQL = @SQL + left(@COLUMNS, len(@COLUMNS) - 2) + char(13)
 	
	set @SQL = @SQL + ')' + char(13)
	set @SQL = @SQL + 'AS' + char(13)
	set @SQL = @SQL + '' + char(13)
 	
	-- step 4: add a modifications section
	set @SQL = @SQL + '-- Author: Auto' + char(13)
	set @SQL = @SQL + '-- Created: ' + convert(varchar(11), getdate(), 106) + char(13)
	set @SQL = @SQL + '-- Function: Inserts a ' + @spSchema + '.' + @spTable + ' table record' + char(13)
	set @SQL = @SQL + '' + char(13)
	set @SQL = @SQL + '-- Modifications:' + char(13)
	set @SQL = @SQL + '' + char(13)
 	
	-- body here
 	
	-- step 5: begins a transaction
	set @SQL = @SQL + 'begin transaction' + char(13) + char(13)
 	
 	-- step 6: begin a try
	set @SQL = @SQL + 'begin try' + char(13) + char(13) 
 	
	set @SQL = @SQL + '-- insert' + char(13)
 		
	-- step 7: code the insert
	set @COLUMNS = ''
 		
	select @COLUMNS = @COLUMNS + '@' + COLUMN_NAME + ','
	from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = @spTable
		and COLUMN_NAME <> @PK_COLUMN
		AND TABLE_SCHEMA = @spSchema 
	order by ORDINAL_POSITION
 		
	set @COLUMNS = left(@COLUMNS, len(@COLUMNS) -1) -- trim off the last comma
 		
	set @SQL = @SQL + 'insert 	[' + @spSchema + '].[' + @spTable + '] (' + replace(@COLUMNS, '@', '') + ')' + char(13)
	set @SQL = @SQL + 'values	(' + @COLUMNS + ')' + char(13)
	set @SQL = @SQL + char(13) + char(13)
	set @SQL = @SQL + '-- Return the new ID'  + char(13)
	set @SQL = @SQL + 'select SCOPE_IDENTITY();' + char(13) + char(13)
 	
 	-- step 8: commit the transaction
	set @SQL = @SQL + 'commit transaction' + char(13) + char(13)
 	
 	-- step 9: end the try
	set @SQL = @SQL + 'end try' + char(13) + char(13)
 	
 	-- step 10: begin a catch
	set @SQL = @SQL + 'begin catch' + char(13) + char(13)  
 	
 	-- step 11: raise the error
	set @SQL = @SQL + '	declare @ErrorMessage NVARCHAR(4000);' + char(13)
	set @SQL = @SQL + '	declare @ErrorSeverity INT;' + char(13)
	set @SQL = @SQL + '	declare @ErrorState INT;' + char(13) + char(13)
	set @SQL = @SQL + '	select @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = ERROR_STATE();' + char(13) + char(13)
	set @SQL = @SQL + '	raiserror (@ErrorMessage, @ErrorSeverity, @ErrorState);' + char(13) + char(13)
	set @SQL = @SQL + '	rollback transaction' + char(13) + char(13)
 	
 	-- step 11: end the catch
	set @SQL = @SQL + 'end catch;' + char(13) + char(13)
 	
 	-- step 12: return both the drop and create statements
	RETURN @SQL_DROP + '||' + @SQL
 
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[createUpdateSP]'
GO

CREATE FUNCTION [dbo].[createUpdateSP]
(
	@spSchema varchar(200),
	@spTable varchar(200)
)
RETURNS varchar(max)
AS
BEGIN

	declare @SQL_DROP varchar(max)
	declare @SQL varchar(max)
	declare @COLUMNS varchar(max)
	declare @PK_COLUMN varchar(200)
	
	set @SQL = ''
	set @SQL_DROP = ''
	set @COLUMNS = ''
	
	-- generate the drop
	set @SQL_DROP = @SQL_DROP + 'IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N''[' + @spSchema + '].[update' + @spTable + ']'') AND type in (N''P'', N''PC''))' + char(13)
	set @SQL_DROP = @SQL_DROP + 'DROP PROCEDURE [' + @spSchema + '].[update' + @spTable + ']'
	
	set @SQL = @SQL + 'CREATE PROC [' + @spSchema + '].[update' + @spTable + ']' + char(13)
	set @SQL = @SQL + '(' + char(13)
	
	-- now put all the table columns in
	set @PK_COLUMN = 
	(
	select c.column_name
	from information_schema.table_constraints pk 
	inner join information_schema.key_column_usage c 
		on c.table_name = pk.table_name 
		and c.constraint_name = pk.constraint_name
	where pk.TABLE_SCHEMA = @spSchema
		and pk.TABLE_NAME = @spTable
		and pk.constraint_type = 'primary key'
		and c.column_name in
			(
			select COLUMN_NAME
			from INFORMATION_SCHEMA.COLUMNS
			where columnproperty(object_id(quotename(@spSchema) + '.' + 
			quotename(@spTable)), COLUMN_NAME, 'IsIdentity') = 1
			group by COLUMN_NAME
			)
	group by column_name
	having COUNT(column_name) = 1
	)
	
	select @COLUMNS = @COLUMNS + '@' + COLUMN_NAME 
			+ ' as ' 
			+ (case DATA_TYPE when 'numeric' then DATA_TYPE + '(' + convert(varchar(10), NUMERIC_PRECISION) + ',' + convert(varchar(10), NUMERIC_SCALE) + ')' else DATA_TYPE end)
			+ (case when CHARACTER_MAXIMUM_LENGTH is not null then '(' + case when CONVERT(varchar(10), CHARACTER_MAXIMUM_LENGTH) = '-1' then 'max' else CONVERT(varchar(10), CHARACTER_MAXIMUM_LENGTH) end + ')' else '' end)
			+ (case 
				when IS_NULLABLE = 'YES'
					then
						case when COLUMN_DEFAULT is null
							then ' = Null'
							else ''
						end
					else
						case when COLUMN_DEFAULT is null
							then ''
							else
								case when COLUMN_NAME = @PK_COLUMN
									then ''
									else
										case when COLUMN_NAME = @PK_COLUMN
										then ''
										else ' = ' + replace(replace(COLUMN_DEFAULT, '(', ''), ')', '')
									end
								end
						end
				end)
			+ ',' + char(13) 
	from INFORMATION_SCHEMA.COLUMNS where TABLE_SCHEMA = @spSchema and TABLE_NAME = @spTable
	order by ORDINAL_POSITION
	
	set @SQL = @SQL + left(@COLUMNS, len(@COLUMNS) - 2) + char(13)
	
	set @SQL = @SQL + ')' + char(13)
	set @SQL = @SQL + 'AS' + char(13)
	set @SQL = @SQL + '' + char(13)
	
	-- metadata here
	set @SQL = @SQL + '-- Author: Auto' + char(13)
	set @SQL = @SQL + '-- Created: ' + convert(varchar(11), getdate(), 106) + char(13)
	set @SQL = @SQL + '-- Function: Create or update a ' + @spSchema + '.' + @spTable + ' table record' + char(13)
	set @SQL = @SQL + '' + char(13)
	set @SQL = @SQL + '-- Modifications:' + char(13)
	set @SQL = @SQL + '' + char(13)
	
	-- body here
	
	-- Update the database in a transaction
	set @SQL = @SQL + 'begin transaction' + char(13) + char(13)
	
	set @SQL = @SQL + 'begin try' + char(13) + char(13) 
	
	set @SQL = @SQL + '-- update' + char(13)
	
	-- code the update
	set @COLUMNS = ''
	
	set @SQL = @SQL + 'update [' + @spSchema + '].[' + @spTable + '] set' + char(13)
	
	select @COLUMNS = @COLUMNS + '		' + COLUMN_NAME + ' = coalesce(@' + COLUMN_NAME + ', ' + COLUMN_NAME + '),' + char(13)
	from INFORMATION_SCHEMA.COLUMNS where TABLE_SCHEMA = @spSchema and TABLE_NAME = @spTable
		and COLUMN_NAME <> @PK_COLUMN
	order by ORDINAL_POSITION
	
	set @SQL = @SQL + left(@COLUMNS, len(@COLUMNS) - 2) + char(13)
	
	set @SQL = @SQL + 'where ' + @PK_COLUMN + ' = @' + @PK_COLUMN + char(13) + char(13)
	
	set @SQL = @SQL + 'select @' + @PK_COLUMN + char(13) + char(13)
	
	set @SQL = @SQL + 'commit transaction;' + char(13) + char(13)
	
	set @SQL = @SQL + 'end try' + char(13) + char(13)
	
	set @SQL = @SQL + 'begin catch' + char(13) + char(13)  
		
	set @SQL = @SQL + '	declare @ErrorMessage NVARCHAR(4000);' + char(13)
	set @SQL = @SQL + '	declare @ErrorSeverity INT;' + char(13)
	set @SQL = @SQL + '	declare @ErrorState INT;' + char(13) + char(13)
	set @SQL = @SQL + '	select @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = ERROR_STATE();' + char(13) + char(13)
	set @SQL = @SQL + '	raiserror (@ErrorMessage, @ErrorSeverity, @ErrorState);' + char(13) + char(13)
	set @SQL = @SQL + '	rollback transaction' + char(13) + char(13)  
	
	set @SQL = @SQL + 'end catch;' + char(13) + char(13)
	
	RETURN @SQL_DROP + '||' + @SQL

END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[fnInitials]'
GO

CREATE FUNCTION [dbo].[fnInitials] 
( @text varchar(max))

RETURNS NVARCHAR(MAX)

AS
BEGIN

DECLARE  @Result NVARCHAR(MAX)
while charindex('  ',@text)>0

 set @text=TRIM(replace(@text,'  ',' '))

 SELECT @Result = STRING_AGG(UPPER(LEFT(value,1)),N'. ')  + '.' FROM STRING_SPLIT (@text, N' ')
 RETURN @Result
 END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[parseDomainFromEmail]'
GO
CREATE FUNCTION [dbo].[parseDomainFromEmail](@Email NVARCHAR(320))
RETURNS NVARCHAR(255) AS
BEGIN
    DECLARE @Domain NVARCHAR(255)

    -- Check if @Email is not null or empty
    IF LTRIM(RTRIM(@Email)) = ''
        RETURN NULL

    -- Extract the domain part from the email
    SET @Domain = RIGHT(@Email, LEN(@Email) - CHARINDEX('@', @Email))

    RETURN @Domain
END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Creating [dbo].[parseDomain]'
GO
CREATE FUNCTION [dbo].[parseDomain](
@url nvarchar(1000)
)
returns nvarchar(255)

AS

BEGIN

declare @domain nvarchar(255)

-- Check if there is the "http://" in the @url
declare @http nvarchar(10)
declare @https nvarchar(10)
declare @protocol nvarchar(10)
set @http = 'http://'
set @https = 'https://'

declare @isHTTPS bit
set @isHTTPS = 0

select @domain = CharIndex(@http, @url)

if CharIndex(@http, @url) > 1
begin
if CharIndex(@https, @url) = 1
set @isHTTPS = 1
else
select @url = @http + @url
-- return 'Error at : ' + @url
-- select @url = substring(@url, CharIndex(@http, @url), len(@url) - CharIndex(@http, @url) + 1)
end

if CharIndex(@http, @url) = 0
if CharIndex(@https, @url) = 1
set @isHTTPS = 1
else
select @url = @http + @url

if @isHTTPS = 1
set @protocol = @https
else
set @protocol = @http

if CharIndex(@protocol, @url) = 1
begin
select @url = substring(@url, len(@protocol) + 1, len(@url)-len(@protocol))
if CharIndex('/', @url) > 0
select @url = substring(@url, 0, CharIndex('/', @url))

declare @i int
set @i = 0
while CharIndex('.', @url) > 0
begin
select @i = CharIndex('.', @url)
select @url = stuff(@url,@i,1,'/')
end
select @url = stuff(@url,@i,1,'.')

set @i = 0
while CharIndex('/', @url) > 0
begin
select @i = CharIndex('/', @url)
select @url = stuff(@url,@i,1,'.')
end

select @domain = substring(@url, @i + 1, len(@url)-@i)
end

return @domain

END
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[AIAction]'
GO
ALTER TABLE [admin].[AIAction] ADD CONSTRAINT [FK_AIAction_AIModel] FOREIGN KEY ([DefaultModelID]) REFERENCES [admin].[AIModel] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[AIModelAction]'
GO
ALTER TABLE [admin].[AIModelAction] ADD CONSTRAINT [FK_AIModelAction_AIAction] FOREIGN KEY ([AIActionID]) REFERENCES [admin].[AIAction] ([ID])
GO
ALTER TABLE [admin].[AIModelAction] ADD CONSTRAINT [FK_AIModelAction_AIModel] FOREIGN KEY ([AIModelID]) REFERENCES [admin].[AIModel] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[AIModel]'
GO
ALTER TABLE [admin].[AIModel] ADD CONSTRAINT [FK_AIModel_AIModelType] FOREIGN KEY ([AIModelTypeID]) REFERENCES [admin].[AIModelType] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[ApplicationEntity]'
GO
ALTER TABLE [admin].[ApplicationEntity] ADD CONSTRAINT [FK_ApplicationEntity_ApplicationName] FOREIGN KEY ([ApplicationName]) REFERENCES [admin].[Application] ([Name])
GO
ALTER TABLE [admin].[ApplicationEntity] ADD CONSTRAINT [FK_ApplicationEntity_Entity] FOREIGN KEY ([EntityID]) REFERENCES [admin].[Entity] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[AuditLogType]'
GO
ALTER TABLE [admin].[AuditLogType] ADD CONSTRAINT [FK_AuditLogType_Authorization] FOREIGN KEY ([AuthorizationName]) REFERENCES [admin].[Authorization] ([Name])
GO
ALTER TABLE [admin].[AuditLogType] ADD CONSTRAINT [FK_AuditLogType_ParentID] FOREIGN KEY ([ParentID]) REFERENCES [admin].[AuditLogType] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[AuditLog]'
GO
ALTER TABLE [admin].[AuditLog] ADD CONSTRAINT [FK_AuditLog_AuditLogType] FOREIGN KEY ([AuditLogTypeName]) REFERENCES [admin].[AuditLogType] ([Name])
GO
ALTER TABLE [admin].[AuditLog] ADD CONSTRAINT [FK_AuditLog_Authorization] FOREIGN KEY ([AuthorizationName]) REFERENCES [admin].[Authorization] ([Name])
GO
ALTER TABLE [admin].[AuditLog] ADD CONSTRAINT [FK_AuditLog_Entity] FOREIGN KEY ([EntityID]) REFERENCES [admin].[Entity] ([ID])
GO
ALTER TABLE [admin].[AuditLog] ADD CONSTRAINT [FK_AuditLog_User] FOREIGN KEY ([UserID]) REFERENCES [admin].[User] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[AuthorizationRole]'
GO
ALTER TABLE [admin].[AuthorizationRole] ADD CONSTRAINT [FK_AuthorizationRole_Authorization1] FOREIGN KEY ([AuthorizationName]) REFERENCES [admin].[Authorization] ([Name])
GO
ALTER TABLE [admin].[AuthorizationRole] ADD CONSTRAINT [FK_AuthorizationRole_Role1] FOREIGN KEY ([RoleName]) REFERENCES [admin].[Role] ([Name])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[Authorization]'
GO
ALTER TABLE [admin].[Authorization] ADD CONSTRAINT [FK_Authorization_Parent] FOREIGN KEY ([ParentID]) REFERENCES [admin].[Authorization] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[CompanyIntegrationRecordMap]'
GO
ALTER TABLE [admin].[CompanyIntegrationRecordMap] ADD CONSTRAINT [FK_CompanyIntegrationRecordMap_CompanyIntegration] FOREIGN KEY ([CompanyIntegrationID]) REFERENCES [admin].[CompanyIntegration] ([ID])
GO
ALTER TABLE [admin].[CompanyIntegrationRecordMap] ADD CONSTRAINT [FK_CompanyIntegrationRecordMap_Entity] FOREIGN KEY ([EntityID]) REFERENCES [admin].[Entity] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[CompanyIntegrationRunAPILog]'
GO
ALTER TABLE [admin].[CompanyIntegrationRunAPILog] ADD CONSTRAINT [FK_CompanyIntegrationRunAPILog_CompanyIntegrationRun] FOREIGN KEY ([CompanyIntegrationRunID]) REFERENCES [admin].[CompanyIntegrationRun] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[CompanyIntegrationRunDetail]'
GO
ALTER TABLE [admin].[CompanyIntegrationRunDetail] ADD CONSTRAINT [FK_CompanyIntegrationRunDetail_CompanyIntegrationRun] FOREIGN KEY ([CompanyIntegrationRunID]) REFERENCES [admin].[CompanyIntegrationRun] ([ID])
GO
ALTER TABLE [admin].[CompanyIntegrationRunDetail] ADD CONSTRAINT [FK_CompanyIntegrationRunDetail_Entity] FOREIGN KEY ([EntityID]) REFERENCES [admin].[Entity] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[CompanyIntegrationRun]'
GO
ALTER TABLE [admin].[CompanyIntegrationRun] ADD CONSTRAINT [FK_CompanyIntegrationRun_CompanyIntegration] FOREIGN KEY ([CompanyIntegrationID]) REFERENCES [admin].[CompanyIntegration] ([ID])
GO
ALTER TABLE [admin].[CompanyIntegrationRun] ADD CONSTRAINT [FK_CompanyIntegrationRun_User] FOREIGN KEY ([RunByUserID]) REFERENCES [admin].[User] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[CompanyIntegration]'
GO
ALTER TABLE [admin].[CompanyIntegration] ADD CONSTRAINT [FK_CompanyIntegration_Company] FOREIGN KEY ([CompanyName]) REFERENCES [admin].[Company] ([Name])
GO
ALTER TABLE [admin].[CompanyIntegration] ADD CONSTRAINT [FK_CompanyIntegration_Integration] FOREIGN KEY ([IntegrationName]) REFERENCES [admin].[Integration] ([Name])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[ConversationDetail]'
GO
ALTER TABLE [admin].[ConversationDetail] ADD CONSTRAINT [FK__Conversat__Conve__051D25D5] FOREIGN KEY ([ConversationID]) REFERENCES [admin].[Conversation] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[Conversation]'
GO
ALTER TABLE [admin].[Conversation] ADD CONSTRAINT [FK__Conversat__UserI__0429019C] FOREIGN KEY ([UserID]) REFERENCES [admin].[User] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[Dashboard]'
GO
ALTER TABLE [admin].[Dashboard] ADD CONSTRAINT [FK__Dashboard__UserI__343EFBB6] FOREIGN KEY ([UserID]) REFERENCES [admin].[User] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[DatasetItem]'
GO
ALTER TABLE [admin].[DatasetItem] ADD CONSTRAINT [FK_DatasetItem_DatasetName] FOREIGN KEY ([DatasetName]) REFERENCES [admin].[Dataset] ([Name])
GO
ALTER TABLE [admin].[DatasetItem] ADD CONSTRAINT [FK_DatasetItem_Entity] FOREIGN KEY ([EntityID]) REFERENCES [admin].[Entity] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[EmployeeCompanyIntegration]'
GO
ALTER TABLE [admin].[EmployeeCompanyIntegration] ADD CONSTRAINT [FK_EmployeeCompanyIntegration_CompanyIntegration] FOREIGN KEY ([CompanyIntegrationID]) REFERENCES [admin].[CompanyIntegration] ([ID])
GO
ALTER TABLE [admin].[EmployeeCompanyIntegration] ADD CONSTRAINT [FK_EmployeeCompanyIntegration_Employee] FOREIGN KEY ([EmployeeID]) REFERENCES [admin].[Employee] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[EmployeeRole]'
GO
ALTER TABLE [admin].[EmployeeRole] ADD CONSTRAINT [FK__EmployeeR__Emplo__73852659] FOREIGN KEY ([EmployeeID]) REFERENCES [admin].[Employee] ([ID]) ON DELETE CASCADE
GO
ALTER TABLE [admin].[EmployeeRole] ADD CONSTRAINT [FK__EmployeeR__RoleI__74794A92] FOREIGN KEY ([RoleID]) REFERENCES [admin].[Role] ([ID]) ON DELETE CASCADE
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[EmployeeSkill]'
GO
ALTER TABLE [admin].[EmployeeSkill] ADD CONSTRAINT [FK__EmployeeS__Emplo__756D6ECB] FOREIGN KEY ([EmployeeID]) REFERENCES [admin].[Employee] ([ID]) ON DELETE CASCADE
GO
ALTER TABLE [admin].[EmployeeSkill] ADD CONSTRAINT [FK__EmployeeS__Skill__76619304] FOREIGN KEY ([SkillID]) REFERENCES [admin].[Skill] ([ID]) ON DELETE CASCADE
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[Employee]'
GO
ALTER TABLE [admin].[Employee] ADD CONSTRAINT [FK_Employee_Company] FOREIGN KEY ([CompanyID]) REFERENCES [admin].[Company] ([ID])
GO
ALTER TABLE [admin].[Employee] ADD CONSTRAINT [FK_Employee_Supervisor] FOREIGN KEY ([SupervisorID]) REFERENCES [admin].[Employee] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[EntityAIAction]'
GO
ALTER TABLE [admin].[EntityAIAction] ADD CONSTRAINT [FK_EntityAIAction_AIAction] FOREIGN KEY ([AIActionID]) REFERENCES [admin].[AIAction] ([ID])
GO
ALTER TABLE [admin].[EntityAIAction] ADD CONSTRAINT [FK_EntityAIAction_AIModel] FOREIGN KEY ([AIModelID]) REFERENCES [admin].[AIModel] ([ID])
GO
ALTER TABLE [admin].[EntityAIAction] ADD CONSTRAINT [FK_EntityAIAction_Entity] FOREIGN KEY ([EntityID]) REFERENCES [admin].[Entity] ([ID])
GO
ALTER TABLE [admin].[EntityAIAction] ADD CONSTRAINT [FK_EntityAIAction_Entity1] FOREIGN KEY ([OutputEntityID]) REFERENCES [admin].[Entity] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[EntityFieldValue]'
GO
ALTER TABLE [admin].[EntityFieldValue] ADD CONSTRAINT [FK_EntityFieldValue_EntityField] FOREIGN KEY ([EntityID], [EntityFieldName]) REFERENCES [admin].[EntityField] ([EntityID], [Name])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[EntityField]'
GO
ALTER TABLE [admin].[EntityField] ADD CONSTRAINT [FK_EntityField_Entity] FOREIGN KEY ([EntityID]) REFERENCES [admin].[Entity] ([ID])
GO
ALTER TABLE [admin].[EntityField] ADD CONSTRAINT [FK_EntityField_EntityField] FOREIGN KEY ([RelatedEntityID]) REFERENCES [admin].[Entity] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[EntityPermission]'
GO
ALTER TABLE [admin].[EntityPermission] ADD CONSTRAINT [FK_EntityPermission_CreateRLSFilter] FOREIGN KEY ([CreateRLSFilterID]) REFERENCES [admin].[RowLevelSecurityFilter] ([ID])
GO
ALTER TABLE [admin].[EntityPermission] ADD CONSTRAINT [FK_EntityPermission_DeleteRLSFilter] FOREIGN KEY ([DeleteRLSFilterID]) REFERENCES [admin].[RowLevelSecurityFilter] ([ID])
GO
ALTER TABLE [admin].[EntityPermission] ADD CONSTRAINT [FK_EntityPermission_Entity] FOREIGN KEY ([EntityID]) REFERENCES [admin].[Entity] ([ID])
GO
ALTER TABLE [admin].[EntityPermission] ADD CONSTRAINT [FK_EntityPermission_ReadRLSFilter] FOREIGN KEY ([ReadRLSFilterID]) REFERENCES [admin].[RowLevelSecurityFilter] ([ID])
GO
ALTER TABLE [admin].[EntityPermission] ADD CONSTRAINT [FK_EntityPermission_RoleName] FOREIGN KEY ([RoleName]) REFERENCES [admin].[Role] ([Name])
GO
ALTER TABLE [admin].[EntityPermission] ADD CONSTRAINT [FK_EntityPermission_UpdateRLSFilter] FOREIGN KEY ([UpdateRLSFilterID]) REFERENCES [admin].[RowLevelSecurityFilter] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[EntityRelationship]'
GO
ALTER TABLE [admin].[EntityRelationship] ADD CONSTRAINT [FK_EntityRelationship_EntityID] FOREIGN KEY ([EntityID]) REFERENCES [admin].[Entity] ([ID])
GO
ALTER TABLE [admin].[EntityRelationship] ADD CONSTRAINT [FK_EntityRelationship_RelatedEntityID] FOREIGN KEY ([RelatedEntityID]) REFERENCES [admin].[Entity] ([ID])
GO
ALTER TABLE [admin].[EntityRelationship] ADD CONSTRAINT [FK_EntityRelationship_UserView1] FOREIGN KEY ([DisplayUserViewGUID]) REFERENCES [admin].[UserView] ([GUID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[Entity]'
GO
ALTER TABLE [admin].[Entity] ADD CONSTRAINT [FK_Entity_Entity] FOREIGN KEY ([ParentID]) REFERENCES [admin].[Entity] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[ErrorLog]'
GO
ALTER TABLE [admin].[ErrorLog] ADD CONSTRAINT [FK_ErrorLog_CompanyIntegrationRunDetailID] FOREIGN KEY ([CompanyIntegrationRunDetailID]) REFERENCES [admin].[CompanyIntegrationRunDetail] ([ID])
GO
ALTER TABLE [admin].[ErrorLog] ADD CONSTRAINT [FK_ErrorLog_CompanyIntegrationRunID] FOREIGN KEY ([CompanyIntegrationRunID]) REFERENCES [admin].[CompanyIntegrationRun] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[IntegrationURLFormat]'
GO
ALTER TABLE [admin].[IntegrationURLFormat] ADD CONSTRAINT [FK_IntegrationURLFormat_Entity] FOREIGN KEY ([EntityID]) REFERENCES [admin].[Entity] ([ID])
GO
ALTER TABLE [admin].[IntegrationURLFormat] ADD CONSTRAINT [FK_IntegrationURLFormat_Integration1] FOREIGN KEY ([IntegrationName]) REFERENCES [admin].[Integration] ([Name])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[ListDetail]'
GO
ALTER TABLE [admin].[ListDetail] ADD CONSTRAINT [FK_ListDetail_List] FOREIGN KEY ([ListID]) REFERENCES [admin].[List] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[List]'
GO
ALTER TABLE [admin].[List] ADD CONSTRAINT [FK_List_CompanyIntegration] FOREIGN KEY ([CompanyIntegrationID]) REFERENCES [admin].[CompanyIntegration] ([ID])
GO
ALTER TABLE [admin].[List] ADD CONSTRAINT [FK_List_Entity] FOREIGN KEY ([EntityID]) REFERENCES [admin].[Entity] ([ID])
GO
ALTER TABLE [admin].[List] ADD CONSTRAINT [FK_List_User] FOREIGN KEY ([UserID]) REFERENCES [admin].[User] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[QueueTask]'
GO
ALTER TABLE [admin].[QueueTask] ADD CONSTRAINT [FK_QueueTask_Queue] FOREIGN KEY ([QueueID]) REFERENCES [admin].[Queue] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[Queue]'
GO
ALTER TABLE [admin].[Queue] ADD CONSTRAINT [FK_Queue_QueueType] FOREIGN KEY ([QueueTypeID]) REFERENCES [admin].[QueueType] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[RecordChange]'
GO
ALTER TABLE [admin].[RecordChange] ADD CONSTRAINT [FK_RecordChange_Entity] FOREIGN KEY ([EntityID]) REFERENCES [admin].[Entity] ([ID])
GO
ALTER TABLE [admin].[RecordChange] ADD CONSTRAINT [FK_RecordChange_User] FOREIGN KEY ([UserID]) REFERENCES [admin].[User] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[RecordMergeDeletionLog]'
GO
ALTER TABLE [admin].[RecordMergeDeletionLog] ADD CONSTRAINT [FK_RecordMergeDeletionLog_RecordMergeLog] FOREIGN KEY ([RecordMergeLogID]) REFERENCES [admin].[RecordMergeLog] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[RecordMergeLog]'
GO
ALTER TABLE [admin].[RecordMergeLog] ADD CONSTRAINT [FK_RecordMergeLog_Entity] FOREIGN KEY ([EntityID]) REFERENCES [admin].[Entity] ([ID])
GO
ALTER TABLE [admin].[RecordMergeLog] ADD CONSTRAINT [FK_RecordMergeLog_User] FOREIGN KEY ([InitiatedByUserID]) REFERENCES [admin].[User] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[ReportSnapshot]'
GO
ALTER TABLE [admin].[ReportSnapshot] ADD CONSTRAINT [FK__ReportSna__Repor__19241E82] FOREIGN KEY ([ReportID]) REFERENCES [admin].[Report] ([ID])
GO
ALTER TABLE [admin].[ReportSnapshot] ADD CONSTRAINT [FK__ReportSna__UserI__6BB324E4] FOREIGN KEY ([UserID]) REFERENCES [admin].[User] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[Report]'
GO
ALTER TABLE [admin].[Report] ADD CONSTRAINT [FK__Report__Conversa__373E914E] FOREIGN KEY ([ConversationID]) REFERENCES [admin].[Conversation] ([ID])
GO
ALTER TABLE [admin].[Report] ADD CONSTRAINT [FK__Report__OutputDe__5E353582] FOREIGN KEY ([OutputDeliveryTypeID]) REFERENCES [admin].[OutputDeliveryType] ([ID])
GO
ALTER TABLE [admin].[Report] ADD CONSTRAINT [FK__Report__OutputEv__601D7DF4] FOREIGN KEY ([OutputEventID]) REFERENCES [admin].[OutputDeliveryType] ([ID])
GO
ALTER TABLE [admin].[Report] ADD CONSTRAINT [FK__Report__OutputFo__5D411149] FOREIGN KEY ([OutputFormatTypeID]) REFERENCES [admin].[OutputFormatType] ([ID])
GO
ALTER TABLE [admin].[Report] ADD CONSTRAINT [FK__Report__OutputTr__5C4CED10] FOREIGN KEY ([OutputTriggerTypeID]) REFERENCES [admin].[OutputTriggerType] ([ID])
GO
ALTER TABLE [admin].[Report] ADD CONSTRAINT [FK__Report__OutputWo__6111A22D] FOREIGN KEY ([OutputWorkflowID]) REFERENCES [admin].[Workflow] ([ID])
GO
ALTER TABLE [admin].[Report] ADD CONSTRAINT [FK__Report__UserID__5F2959BB] FOREIGN KEY ([UserID]) REFERENCES [admin].[User] ([ID])
GO
ALTER TABLE [admin].[Report] ADD CONSTRAINT [FK_Report_ConversationDetail] FOREIGN KEY ([ConversationDetailID]) REFERENCES [admin].[ConversationDetail] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[ResourceFolder]'
GO
ALTER TABLE [admin].[ResourceFolder] ADD CONSTRAINT [FK_ResourceFolder_ResourceFolder] FOREIGN KEY ([ParentID]) REFERENCES [admin].[ResourceFolder] ([ID])
GO
ALTER TABLE [admin].[ResourceFolder] ADD CONSTRAINT [FK_ResourceFolder_ResourceTypeName] FOREIGN KEY ([ResourceTypeName]) REFERENCES [admin].[ResourceType] ([Name])
GO
ALTER TABLE [admin].[ResourceFolder] ADD CONSTRAINT [FK_ResourceFolder_User] FOREIGN KEY ([UserID]) REFERENCES [admin].[User] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[ResourceType]'
GO
ALTER TABLE [admin].[ResourceType] ADD CONSTRAINT [FK__ResourceT__Entit__6D777912] FOREIGN KEY ([EntityID]) REFERENCES [admin].[Entity] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[SystemEvent]'
GO
ALTER TABLE [admin].[SystemEvent] ADD CONSTRAINT [FK__SystemEve__Entit__6E6B9D4B] FOREIGN KEY ([EntityID]) REFERENCES [admin].[Entity] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[Tag]'
GO
ALTER TABLE [admin].[Tag] ADD CONSTRAINT [FK__Tag__ParentID__592635D8] FOREIGN KEY ([ParentID]) REFERENCES [admin].[Tag] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[TaggedItem]'
GO
ALTER TABLE [admin].[TaggedItem] ADD CONSTRAINT [FK__TaggedIte__Entit__714809F6] FOREIGN KEY ([EntityID]) REFERENCES [admin].[Entity] ([ID])
GO
ALTER TABLE [admin].[TaggedItem] ADD CONSTRAINT [FK__TaggedIte__TagID__77AABCF8] FOREIGN KEY ([TagID]) REFERENCES [admin].[Tag] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[UserApplicationEntity]'
GO
ALTER TABLE [admin].[UserApplicationEntity] ADD CONSTRAINT [FK_UserApplicationEntity_Entity] FOREIGN KEY ([EntityID]) REFERENCES [admin].[Entity] ([ID])
GO
ALTER TABLE [admin].[UserApplicationEntity] ADD CONSTRAINT [FK_UserApplicationEntity_UserApplication] FOREIGN KEY ([UserApplicationID]) REFERENCES [admin].[UserApplication] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[UserApplication]'
GO
ALTER TABLE [admin].[UserApplication] ADD CONSTRAINT [FK_UserApplication_Application] FOREIGN KEY ([ApplicationID]) REFERENCES [admin].[Application] ([ID])
GO
ALTER TABLE [admin].[UserApplication] ADD CONSTRAINT [FK_UserApplication_User] FOREIGN KEY ([UserID]) REFERENCES [admin].[User] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[UserFavorite]'
GO
ALTER TABLE [admin].[UserFavorite] ADD CONSTRAINT [FK_UserFavorite_ApplicationUser] FOREIGN KEY ([UserID]) REFERENCES [admin].[User] ([ID])
GO
ALTER TABLE [admin].[UserFavorite] ADD CONSTRAINT [FK_UserFavorite_Entity] FOREIGN KEY ([EntityID]) REFERENCES [admin].[Entity] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[UserNotification]'
GO
ALTER TABLE [admin].[UserNotification] ADD CONSTRAINT [FK_UserNotification_User] FOREIGN KEY ([UserID]) REFERENCES [admin].[User] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[UserRecordLog]'
GO
ALTER TABLE [admin].[UserRecordLog] ADD CONSTRAINT [FK_UserRecordLog_Entity] FOREIGN KEY ([EntityID]) REFERENCES [admin].[Entity] ([ID])
GO
ALTER TABLE [admin].[UserRecordLog] ADD CONSTRAINT [FK_UserRecordLog_User] FOREIGN KEY ([UserID]) REFERENCES [admin].[User] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[UserRole]'
GO
ALTER TABLE [admin].[UserRole] ADD CONSTRAINT [FK_UserRole_RoleName] FOREIGN KEY ([RoleName]) REFERENCES [admin].[Role] ([Name])
GO
ALTER TABLE [admin].[UserRole] ADD CONSTRAINT [FK_UserRole_User] FOREIGN KEY ([UserID]) REFERENCES [admin].[User] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[UserViewRunDetail]'
GO
ALTER TABLE [admin].[UserViewRunDetail] ADD CONSTRAINT [FK_UserViewRunDetail_UserViewRun] FOREIGN KEY ([UserViewRunID]) REFERENCES [admin].[UserViewRun] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[UserViewRun]'
GO
ALTER TABLE [admin].[UserViewRun] ADD CONSTRAINT [FK_UserViewRun_User] FOREIGN KEY ([RunByUserID]) REFERENCES [admin].[User] ([ID])
GO
ALTER TABLE [admin].[UserViewRun] ADD CONSTRAINT [FK_UserViewRun_UserView] FOREIGN KEY ([UserViewID]) REFERENCES [admin].[UserView] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[UserView]'
GO
ALTER TABLE [admin].[UserView] ADD CONSTRAINT [FK_UserView_Entity] FOREIGN KEY ([EntityID]) REFERENCES [admin].[Entity] ([ID])
GO
ALTER TABLE [admin].[UserView] ADD CONSTRAINT [FK_UserView_User] FOREIGN KEY ([UserID]) REFERENCES [admin].[User] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[WorkflowRun]'
GO
ALTER TABLE [admin].[WorkflowRun] ADD CONSTRAINT [FK_WorkflowRun_Workflow1] FOREIGN KEY ([WorkflowName]) REFERENCES [admin].[Workflow] ([Name])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[Workflow]'
GO
ALTER TABLE [admin].[Workflow] ADD CONSTRAINT [FK_Workflow_Company] FOREIGN KEY ([CompanyName]) REFERENCES [admin].[Company] ([Name])
GO
ALTER TABLE [admin].[Workflow] ADD CONSTRAINT [FK_Workflow_WorkflowEngine1] FOREIGN KEY ([WorkflowEngineName]) REFERENCES [admin].[WorkflowEngine] ([Name])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[WorkspaceItem]'
GO
ALTER TABLE [admin].[WorkspaceItem] ADD CONSTRAINT [FK__Workspace__Resou__73305268] FOREIGN KEY ([ResourceTypeID]) REFERENCES [admin].[ResourceType] ([ID])
GO
ALTER TABLE [admin].[WorkspaceItem] ADD CONSTRAINT [FK__Workspace__WorkS__2C538F61] FOREIGN KEY ([WorkSpaceID]) REFERENCES [admin].[Workspace] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Adding foreign keys to [admin].[Workspace]'
GO
ALTER TABLE [admin].[Workspace] ADD CONSTRAINT [FK__Workspace__UserI__057AB683] FOREIGN KEY ([UserID]) REFERENCES [admin].[User] ([ID])
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [admin].[UserViewRunDetail]'
GO
GRANT INSERT ON  [admin].[UserViewRunDetail] TO [cdp_Developer]
GO
GRANT INSERT ON  [admin].[UserViewRunDetail] TO [cdp_Integration]
GO
GRANT INSERT ON  [admin].[UserViewRunDetail] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateApplicationEntity]'
GO
GRANT EXECUTE ON  [dbo].[spCreateApplicationEntity] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateApplicationEntity] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateAuditLog]'
GO
GRANT EXECUTE ON  [dbo].[spCreateAuditLog] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateAuditLog] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spCreateAuditLog] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateCompanyIntegrationRecordMap]'
GO
GRANT EXECUTE ON  [dbo].[spCreateCompanyIntegrationRecordMap] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateCompanyIntegrationRecordMap] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateCompanyIntegrationRunAPILog]'
GO
GRANT EXECUTE ON  [dbo].[spCreateCompanyIntegrationRunAPILog] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateCompanyIntegrationRunAPILog] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateCompanyIntegrationRunDetail]'
GO
GRANT EXECUTE ON  [dbo].[spCreateCompanyIntegrationRunDetail] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateCompanyIntegrationRunDetail] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateCompanyIntegrationRun]'
GO
GRANT EXECUTE ON  [dbo].[spCreateCompanyIntegrationRun] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateCompanyIntegrationRun] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateCompany]'
GO
GRANT EXECUTE ON  [dbo].[spCreateCompany] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateCompany] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateConversationDetail]'
GO
GRANT EXECUTE ON  [dbo].[spCreateConversationDetail] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateConversationDetail] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spCreateConversationDetail] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateConversation]'
GO
GRANT EXECUTE ON  [dbo].[spCreateConversation] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateConversation] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spCreateConversation] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateDashboard]'
GO
GRANT EXECUTE ON  [dbo].[spCreateDashboard] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateEmployee]'
GO
GRANT EXECUTE ON  [dbo].[spCreateEmployee] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateEmployee] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateEntityField]'
GO
GRANT EXECUTE ON  [dbo].[spCreateEntityField] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateEntityField] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateEntityPermission]'
GO
GRANT EXECUTE ON  [dbo].[spCreateEntityPermission] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateEntityPermission] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateEntityRelationship]'
GO
GRANT EXECUTE ON  [dbo].[spCreateEntityRelationship] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateEntityRelationship] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateEntity]'
GO
GRANT EXECUTE ON  [dbo].[spCreateEntity] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateEntity] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateErrorLog]'
GO
GRANT EXECUTE ON  [dbo].[spCreateErrorLog] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateErrorLog] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spCreateErrorLog] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateListDetail]'
GO
GRANT EXECUTE ON  [dbo].[spCreateListDetail] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateListDetail] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateList]'
GO
GRANT EXECUTE ON  [dbo].[spCreateList] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateList] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateQueueTask]'
GO
GRANT EXECUTE ON  [dbo].[spCreateQueueTask] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateQueueTask] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateQueue]'
GO
GRANT EXECUTE ON  [dbo].[spCreateQueue] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateQueue] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateRecordChange]'
GO
GRANT EXECUTE ON  [dbo].[spCreateRecordChange] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateRecordChange] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spCreateRecordChange] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateRecordMergeDeletionLog]'
GO
GRANT EXECUTE ON  [dbo].[spCreateRecordMergeDeletionLog] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateRecordMergeDeletionLog] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spCreateRecordMergeDeletionLog] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateRecordMergeLog]'
GO
GRANT EXECUTE ON  [dbo].[spCreateRecordMergeLog] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateRecordMergeLog] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spCreateRecordMergeLog] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateReportSnapshot]'
GO
GRANT EXECUTE ON  [dbo].[spCreateReportSnapshot] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateReport]'
GO
GRANT EXECUTE ON  [dbo].[spCreateReport] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateUserApplicationEntity]'
GO
GRANT EXECUTE ON  [dbo].[spCreateUserApplicationEntity] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateUserApplicationEntity] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateUserFavorite]'
GO
GRANT EXECUTE ON  [dbo].[spCreateUserFavorite] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateUserFavorite] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spCreateUserFavorite] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateUserNotification]'
GO
GRANT EXECUTE ON  [dbo].[spCreateUserNotification] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateUserNotification] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spCreateUserNotification] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateUserRole]'
GO
GRANT EXECUTE ON  [dbo].[spCreateUserRole] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateUserRole] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spCreateUserRole] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateUserViewRunDetail]'
GO
GRANT EXECUTE ON  [dbo].[spCreateUserViewRunDetail] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateUserViewRunDetail] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateUserViewRun]'
GO
GRANT EXECUTE ON  [dbo].[spCreateUserViewRun] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateUserViewRun] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spCreateUserViewRun] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateUserView]'
GO
GRANT EXECUTE ON  [dbo].[spCreateUserView] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateUserView] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spCreateUserView] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateUser]'
GO
GRANT EXECUTE ON  [dbo].[spCreateUser] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spCreateUser] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spCreateUser] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateWorkspaceItem]'
GO
GRANT EXECUTE ON  [dbo].[spCreateWorkspaceItem] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spCreateWorkspace]'
GO
GRANT EXECUTE ON  [dbo].[spCreateWorkspace] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteApplicationEntities]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteApplicationEntities] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spDeleteApplicationEntities] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteApplicationEntity]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteApplicationEntity] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spDeleteApplicationEntity] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteCompany]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteCompany] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spDeleteCompany] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteConversationDetail]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteConversationDetail] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteConversation]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteConversation] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteDashboard]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteDashboard] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteEmployee]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteEmployee] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spDeleteEmployee] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteEntityField]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteEntityField] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spDeleteEntityField] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteEntityPermission]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteEntityPermission] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spDeleteEntityPermission] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteEntityRelationship]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteEntityRelationship] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spDeleteEntityRelationship] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteEntity]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteEntity] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spDeleteEntity] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteListDetail]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteListDetail] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spDeleteListDetail] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteList]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteList] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spDeleteList] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteReportSnapshot]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteReportSnapshot] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteReport]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteReport] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteUserApplicationEntities]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteUserApplicationEntities] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spDeleteUserApplicationEntities] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteUserApplicationEntity]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteUserApplicationEntity] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spDeleteUserApplicationEntity] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteUserFavorite]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteUserFavorite] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spDeleteUserFavorite] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spDeleteUserFavorite] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteUserFavorites]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteUserFavorites] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spDeleteUserFavorites] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spDeleteUserFavorites] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteUserViewRunDetails]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteUserViewRunDetails] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spDeleteUserViewRunDetails] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteUserViewRuns]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteUserViewRuns] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spDeleteUserViewRuns] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteUserView]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteUserView] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spDeleteUserView] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spDeleteUserView] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteUserViews]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteUserViews] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spDeleteUserViews] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spDeleteUserViews] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteWorkspaceItem]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteWorkspaceItem] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spDeleteWorkspace]'
GO
GRANT EXECUTE ON  [dbo].[spDeleteWorkspace] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spGetAuthenticationDataByExternalSystemID]'
GO
GRANT EXECUTE ON  [dbo].[spGetAuthenticationDataByExternalSystemID] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spGetAuthenticationDataByExternalSystemID] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spGetMatchingAccount]'
GO
GRANT EXECUTE ON  [dbo].[spGetMatchingAccount] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spGetMatchingAccount] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateAIAction]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateAIAction] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateAIAction] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateAIModelAction]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateAIModelAction] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateAIModelAction] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateAIModelType]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateAIModelType] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateAIModelType] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateAIModel]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateAIModel] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateAIModel] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateApplicationEntity]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateApplicationEntity] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateApplicationEntity] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateApplication]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateApplication] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateApplication] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateApplications]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateApplications] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateApplications] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateCompanyIntegrationRecordMap]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateCompanyIntegrationRecordMap] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateCompanyIntegrationRecordMap] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateCompanyIntegrationRunAPILog]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateCompanyIntegrationRunAPILog] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateCompanyIntegrationRunAPILog] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateCompanyIntegrationRunDetail]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateCompanyIntegrationRunDetail] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateCompanyIntegrationRunDetail] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateCompanyIntegrationRun]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateCompanyIntegrationRun] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateCompanyIntegrationRun] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateCompanyIntegration]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateCompanyIntegration] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateCompanyIntegration] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateCompany]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateCompany] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateCompany] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateConversationDetail]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateConversationDetail] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateConversation]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateConversation] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateDashboard]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateDashboard] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateEmployeeCompanyIntegration]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateEmployeeCompanyIntegration] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateEmployeeCompanyIntegration] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateEmployeeRole]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateEmployeeRole] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateEmployeeRole] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateEmployeeSkill]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateEmployeeSkill] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateEmployeeSkill] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateEmployee]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateEmployee] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateEmployee] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateEntityAIAction]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateEntityAIAction] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateEntityAIAction] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateEntityField]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateEntityField] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateEntityField] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateEntityPermission]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateEntityPermission] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateEntityPermission] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateEntityRelationship]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateEntityRelationship] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateEntityRelationship] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateEntity]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateEntity] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateEntity] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateErrorLog]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateErrorLog] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateErrorLog] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateIntegrationURLFormat]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateIntegrationURLFormat] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateIntegrationURLFormat] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateIntegration]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateIntegration] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateIntegration] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateListDetail]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateListDetail] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateListDetail] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateList]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateList] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateList] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateQueueTask]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateQueueTask] TO [cdp_Developer]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateQueue]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateQueue] TO [cdp_Developer]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateRecordMergeDeletionLog]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateRecordMergeDeletionLog] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateRecordMergeDeletionLog] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spUpdateRecordMergeDeletionLog] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateRecordMergeLog]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateRecordMergeLog] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateRecordMergeLog] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spUpdateRecordMergeLog] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateReportSnapshot]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateReportSnapshot] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateReport]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateReport] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateRole]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateRole] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateRole] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateSkill]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateSkill] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateSkill] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateSkills]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateSkills] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateSkills] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateUserApplicationEntity]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateUserApplicationEntity] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateUserApplicationEntity] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateUserApplication]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateUserApplication] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateUserApplication] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateUserFavorite]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateUserFavorite] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateUserFavorite] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spUpdateUserFavorite] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateUserNotification]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateUserNotification] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateUserNotification] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spUpdateUserNotification] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateUserRecordLog]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateUserRecordLog] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateUserRecordLog] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateUserViewRunDetail]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateUserViewRunDetail] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateUserViewRunDetail] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateUserViewRun]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateUserViewRun] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateUserViewRun] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateUserView]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateUserView] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateUserView] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spUpdateUserView] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateUserViews]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateUserViews] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateUserViews] TO [cdp_Integration]
GO
GRANT EXECUTE ON  [dbo].[spUpdateUserViews] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateUser]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateUser] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateUser] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateUsers]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateUsers] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateUsers] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateWorkflowEngine]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateWorkflowEngine] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateWorkflowEngine] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateWorkflowRun]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateWorkflowRun] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateWorkflowRun] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateWorkflow]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateWorkflow] TO [cdp_Developer]
GO
GRANT EXECUTE ON  [dbo].[spUpdateWorkflow] TO [cdp_Integration]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateWorkspaceItem]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateWorkspaceItem] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[spUpdateWorkspace]'
GO
GRANT EXECUTE ON  [dbo].[spUpdateWorkspace] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwAIActions]'
GO
GRANT SELECT ON  [dbo].[vwAIActions] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwAIActions] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwAIActions] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwAIModelActions]'
GO
GRANT SELECT ON  [dbo].[vwAIModelActions] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwAIModelActions] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwAIModelActions] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwAIModelTypes]'
GO
GRANT SELECT ON  [dbo].[vwAIModelTypes] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwAIModelTypes] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwAIModelTypes] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwAIModels]'
GO
GRANT SELECT ON  [dbo].[vwAIModels] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwAIModels] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwAIModels] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwApplicationEntities]'
GO
GRANT SELECT ON  [dbo].[vwApplicationEntities] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwApplicationEntities] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwApplicationEntities] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwApplications]'
GO
GRANT SELECT ON  [dbo].[vwApplications] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwApplications] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwApplications] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwAuditLogTypes]'
GO
GRANT SELECT ON  [dbo].[vwAuditLogTypes] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwAuditLogTypes] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwAuditLogTypes] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwAuditLogs]'
GO
GRANT SELECT ON  [dbo].[vwAuditLogs] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwAuditLogs] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwAuditLogs] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwAuthorizationRoles]'
GO
GRANT SELECT ON  [dbo].[vwAuthorizationRoles] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwAuthorizationRoles] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwAuthorizationRoles] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwAuthorizations]'
GO
GRANT SELECT ON  [dbo].[vwAuthorizations] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwAuthorizations] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwAuthorizations] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwCompanies]'
GO
GRANT SELECT ON  [dbo].[vwCompanies] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwCompanies] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwCompanies] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwCompanyIntegrationRecordMaps]'
GO
GRANT SELECT ON  [dbo].[vwCompanyIntegrationRecordMaps] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwCompanyIntegrationRecordMaps] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwCompanyIntegrationRecordMaps] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwCompanyIntegrationRunAPILogs]'
GO
GRANT SELECT ON  [dbo].[vwCompanyIntegrationRunAPILogs] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwCompanyIntegrationRunAPILogs] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwCompanyIntegrationRunAPILogs] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwCompanyIntegrationRunDetails]'
GO
GRANT SELECT ON  [dbo].[vwCompanyIntegrationRunDetails] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwCompanyIntegrationRunDetails] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwCompanyIntegrationRunDetails] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwCompanyIntegrationRuns]'
GO
GRANT SELECT ON  [dbo].[vwCompanyIntegrationRuns] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwCompanyIntegrationRuns] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwCompanyIntegrationRuns] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwCompanyIntegrations]'
GO
GRANT SELECT ON  [dbo].[vwCompanyIntegrations] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwCompanyIntegrations] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwCompanyIntegrations] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwConversationDetails]'
GO
GRANT SELECT ON  [dbo].[vwConversationDetails] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwConversationDetails] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwConversationDetails] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwConversations]'
GO
GRANT SELECT ON  [dbo].[vwConversations] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwConversations] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwConversations] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwDashboards]'
GO
GRANT SELECT ON  [dbo].[vwDashboards] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwDatasetItems]'
GO
GRANT SELECT ON  [dbo].[vwDatasetItems] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwDatasetItems] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwDatasetItems] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwDatasets]'
GO
GRANT SELECT ON  [dbo].[vwDatasets] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwDatasets] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwDatasets] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwEmployeeCompanyIntegrations]'
GO
GRANT SELECT ON  [dbo].[vwEmployeeCompanyIntegrations] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwEmployeeCompanyIntegrations] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwEmployeeCompanyIntegrations] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwEmployeeRoles]'
GO
GRANT SELECT ON  [dbo].[vwEmployeeRoles] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwEmployeeRoles] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwEmployeeRoles] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwEmployeeSkills]'
GO
GRANT SELECT ON  [dbo].[vwEmployeeSkills] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwEmployeeSkills] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwEmployeeSkills] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwEmployees]'
GO
GRANT SELECT ON  [dbo].[vwEmployees] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwEmployees] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwEmployees] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwEntities]'
GO
GRANT SELECT ON  [dbo].[vwEntities] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwEntities] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwEntities] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwEntityAIActions]'
GO
GRANT SELECT ON  [dbo].[vwEntityAIActions] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwEntityAIActions] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwEntityAIActions] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwEntityFieldValues]'
GO
GRANT SELECT ON  [dbo].[vwEntityFieldValues] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwEntityFieldValues] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwEntityFieldValues] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwEntityFields]'
GO
GRANT SELECT ON  [dbo].[vwEntityFields] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwEntityFields] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwEntityFields] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwEntityPermissions]'
GO
GRANT SELECT ON  [dbo].[vwEntityPermissions] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwEntityPermissions] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwEntityPermissions] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwEntityRelationships]'
GO
GRANT SELECT ON  [dbo].[vwEntityRelationships] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwEntityRelationships] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwEntityRelationships] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwErrorLogs]'
GO
GRANT SELECT ON  [dbo].[vwErrorLogs] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwErrorLogs] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwErrorLogs] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwIntegrationURLFormats]'
GO
GRANT SELECT ON  [dbo].[vwIntegrationURLFormats] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwIntegrationURLFormats] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwIntegrationURLFormats] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwIntegrations]'
GO
GRANT SELECT ON  [dbo].[vwIntegrations] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwIntegrations] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwIntegrations] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwListDetails]'
GO
GRANT SELECT ON  [dbo].[vwListDetails] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwListDetails] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwListDetails] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwLists]'
GO
GRANT SELECT ON  [dbo].[vwLists] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwLists] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwLists] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwOutputDeliveryTypes]'
GO
GRANT SELECT ON  [dbo].[vwOutputDeliveryTypes] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwOutputFormatTypes]'
GO
GRANT SELECT ON  [dbo].[vwOutputFormatTypes] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwOutputTriggerTypes]'
GO
GRANT SELECT ON  [dbo].[vwOutputTriggerTypes] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwQueueTasks]'
GO
GRANT SELECT ON  [dbo].[vwQueueTasks] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwQueueTasks] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwQueueTypes]'
GO
GRANT SELECT ON  [dbo].[vwQueueTypes] TO [cdp_Developer]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwQueues]'
GO
GRANT SELECT ON  [dbo].[vwQueues] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwQueues] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwRecordChanges]'
GO
GRANT SELECT ON  [dbo].[vwRecordChanges] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwRecordChanges] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwRecordChanges] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwRecordMergeDeletionLogs]'
GO
GRANT SELECT ON  [dbo].[vwRecordMergeDeletionLogs] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwRecordMergeDeletionLogs] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwRecordMergeDeletionLogs] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwRecordMergeLogs]'
GO
GRANT SELECT ON  [dbo].[vwRecordMergeLogs] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwRecordMergeLogs] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwRecordMergeLogs] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwReportSnapshots]'
GO
GRANT SELECT ON  [dbo].[vwReportSnapshots] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwReports]'
GO
GRANT SELECT ON  [dbo].[vwReports] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwResourceTypes]'
GO
GRANT SELECT ON  [dbo].[vwResourceTypes] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwRoles]'
GO
GRANT SELECT ON  [dbo].[vwRoles] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwRoles] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwRoles] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwRowLevelSecurityFilters]'
GO
GRANT SELECT ON  [dbo].[vwRowLevelSecurityFilters] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwRowLevelSecurityFilters] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwRowLevelSecurityFilters] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwSkills]'
GO
GRANT SELECT ON  [dbo].[vwSkills] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwSkills] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwSkills] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwTaggedItems]'
GO
GRANT SELECT ON  [dbo].[vwTaggedItems] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwTags]'
GO
GRANT SELECT ON  [dbo].[vwTags] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwUserApplicationEntities]'
GO
GRANT SELECT ON  [dbo].[vwUserApplicationEntities] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwUserApplicationEntities] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwUserApplicationEntities] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwUserApplications]'
GO
GRANT SELECT ON  [dbo].[vwUserApplications] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwUserApplications] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwUserApplications] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwUserFavorites]'
GO
GRANT SELECT ON  [dbo].[vwUserFavorites] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwUserFavorites] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwUserFavorites] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwUserNotifications]'
GO
GRANT SELECT ON  [dbo].[vwUserNotifications] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwUserNotifications] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwUserNotifications] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwUserRecordLogs]'
GO
GRANT SELECT ON  [dbo].[vwUserRecordLogs] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwUserRecordLogs] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwUserRecordLogs] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwUserRoles]'
GO
GRANT SELECT ON  [dbo].[vwUserRoles] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwUserRoles] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwUserRoles] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwUserViewRunDetails]'
GO
GRANT SELECT ON  [dbo].[vwUserViewRunDetails] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwUserViewRunDetails] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwUserViewRunDetails] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwUserViewRuns]'
GO
GRANT SELECT ON  [dbo].[vwUserViewRuns] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwUserViewRuns] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwUserViewRuns] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwUserViews]'
GO
GRANT SELECT ON  [dbo].[vwUserViews] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwUserViews] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwUserViews] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwUsers]'
GO
GRANT SELECT ON  [dbo].[vwUsers] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwUsers] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwUsers] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwWorkflowEngines]'
GO
GRANT SELECT ON  [dbo].[vwWorkflowEngines] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwWorkflowEngines] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwWorkflowEngines] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwWorkflowRuns]'
GO
GRANT SELECT ON  [dbo].[vwWorkflowRuns] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwWorkflowRuns] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwWorkflowRuns] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwWorkflows]'
GO
GRANT SELECT ON  [dbo].[vwWorkflows] TO [cdp_Developer]
GO
GRANT SELECT ON  [dbo].[vwWorkflows] TO [cdp_Integration]
GO
GRANT SELECT ON  [dbo].[vwWorkflows] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwWorkspaceItems]'
GO
GRANT SELECT ON  [dbo].[vwWorkspaceItems] TO [cdp_UI]
GO
IF @@ERROR <> 0 SET NOEXEC ON
GO
PRINT N'Altering permissions on  [dbo].[vwWorkspaces]'
GO
GRANT SELECT ON  [dbo].[vwWorkspaces] TO [cdp_UI]
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
