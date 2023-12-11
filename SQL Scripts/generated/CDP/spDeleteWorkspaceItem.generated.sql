-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Workspace Items
-- Item: spDeleteWorkspaceItem
-- Generated: 12/8/2023, 3:54:11 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- DELETE PROCEDURE FOR WorkspaceItem
------------------------------------------------------------
IF OBJECT_ID('dbo.spDeleteWorkspaceItem', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spDeleteWorkspaceItem]
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
GRANT EXECUTE ON [spDeleteWorkspaceItem] TO [cdp_UI]
