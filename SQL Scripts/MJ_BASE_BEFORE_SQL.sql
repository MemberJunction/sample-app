-- ALL THE VIEWS

DROP VIEW vwForeignKeys
GO
CREATE VIEW vwForeignKeys
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

DROP VIEW vwEntities
GO
CREATE VIEW vwEntities
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

DROP VIEW vwEntityFields
GO
CREATE VIEW vwEntityFields
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



DROP VIEW vwEntityRelationships
GO
CREATE VIEW vwEntityRelationships
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

 

 
GO
DROP VIEW vwCompanyIntegrations
GO
CREATE VIEW vwCompanyIntegrations 
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

DROP VIEW vwCompanyIntegrationRuns
GO
CREATE VIEW vwCompanyIntegrationRuns
AS
SELECT
   cir.*,
   ci.CompanyName Company,
   ci.IntegrationName Integration
FROM
   admin.CompanyIntegrationRun cir
INNER JOIN
   admin.CompanyIntegration ci
ON
   cir.CompanyIntegrationID = ci.ID
GO

DROP VIEW vwCompanyIntegrationRunDetails
GO
CREATE VIEW vwCompanyIntegrationRunDetails
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

 
DROP VIEW vwEmployees 
GO
CREATE VIEW vwEmployees 
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
  

DROP VIEW vwCompanies
GO
CREATE VIEW vwCompanies
AS
SELECT * FROM admin.Company



GO
 

DROP VIEW vwIntegrations
GO
CREATE VIEW vwIntegrations AS
SELECT * FROM admin.Integration
GO

DROP VIEW vwIntegrationURLFormats 
GO
CREATE VIEW vwIntegrationURLFormats
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

DROP VIEW vwUsers
GO
CREATE VIEW vwUsers 
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




DROP VIEW vwUserFavorites
GO
CREATE VIEW vwUserFavorites
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

 

DROP VIEW vwUserRecordLogs
GO
CREATE VIEW vwUserRecordLogs 
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
DROP VIEW vwUserViews
GO
CREATE VIEW vwUserViews
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
 
 
DROP VIEW vwApplicationEntities
GO
CREATE VIEW vwApplicationEntities
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
 

DROP VIEW vwUserApplicationEntities
GO
CREATE VIEW vwUserApplicationEntities
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

DROP VIEW vwWorkflowRuns
GO
CREATE VIEW vwWorkflowRuns
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
  


------------------------------------------------------------
----- BASE VIEW FOR ENTITY:     User View Run Details
-----               BASE TABLE: UserViewRunDetail
------------------------------------------------------------
IF OBJECT_ID('dbo.vwUserViewRunDetails', 'V') IS NOT NULL
    DROP VIEW [dbo].[vwUserViewRunDetails]
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





------------------------------------------------------------
----- CREATE PROCEDURE FOR RecordChange
------------------------------------------------------------
IF OBJECT_ID('dbo.spCreateRecordChange', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spCreateRecordChange]
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




------------------------------------------------------------
----- BASE VIEW FOR ENTITY:     Entity Permissions
-----               BASE TABLE: EntityPermission
------------------------------------------------------------0
IF OBJECT_ID('dbo.vwEntityPermissions', 'V') IS NOT NULL
    DROP VIEW [dbo].[vwEntityPermissions]
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




----------------------------------------------------------------------------------------
--- This section handles view execution stuff  ---
----------------------------------------------------------------------------------------
IF OBJECT_ID('spCreateUserViewRunWithDetail', 'P') IS NOT NULL
	DROP PROC spCreateUserViewRunWithDetail
GO

IF TYPE_ID('admin.IDListTableType') IS NOT NULL
	DROP TYPE admin.IDListTableType
GO

CREATE TYPE admin.IDListTableType AS TABLE
(
    ID INT
);
GO

CREATE PROCEDURE spCreateUserViewRunWithDetail(@UserViewID INT, @UserEmail NVARCHAR(255), @RecordIDList admin.IDListTableType READONLY) 
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
----------------------------------------------------------------------------------------
--- END: SECTION --- This section handles view execution stuff  ---
----------------------------------------------------------------------------------------

 

DROP FUNCTION ToTitleCase
GO
CREATE FUNCTION dbo.ToTitleCase (@InputString varchar(4000))
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


 
DROP PROC spGetNextEntityID
GO
CREATE PROC spGetNextEntityID
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
