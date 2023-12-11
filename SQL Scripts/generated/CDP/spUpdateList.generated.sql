-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Lists
-- Item: spUpdateList
-- Generated: 12/8/2023, 3:54:05 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- UPDATE PROCEDURE FOR List  
------------------------------------------------------------
IF OBJECT_ID('dbo.spUpdateList', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spUpdateList]
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
GRANT EXECUTE ON [spUpdateList] TO [cdp_Developer], [cdp_Integration]
    