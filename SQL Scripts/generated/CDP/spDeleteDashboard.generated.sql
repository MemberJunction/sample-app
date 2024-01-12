-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Dashboards
-- Item: spDeleteDashboard
-- Generated: 12/8/2023, 3:54:09 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- DELETE PROCEDURE FOR Dashboard
------------------------------------------------------------
IF OBJECT_ID('dbo.spDeleteDashboard', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spDeleteDashboard]
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
GRANT EXECUTE ON [spDeleteDashboard] TO [cdp_UI]
