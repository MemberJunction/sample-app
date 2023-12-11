-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Workspace Items
-- Item: spUpdateWorkspaceItem
-- Generated: 12/8/2023, 3:54:11 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- UPDATE PROCEDURE FOR WorkspaceItem  
------------------------------------------------------------
IF OBJECT_ID('dbo.spUpdateWorkspaceItem', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spUpdateWorkspaceItem]
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
GRANT EXECUTE ON [spUpdateWorkspaceItem] TO [cdp_UI]
    