-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Users
-- Item: spCreateUser
-- Generated: 12/8/2023, 3:54:02 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- CREATE PROCEDURE FOR User
------------------------------------------------------------
IF OBJECT_ID('dbo.spCreateUser', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spCreateUser]
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
GRANT EXECUTE ON [spCreateUser] TO [cdp_Developer], [cdp_Integration], [cdp_UI]