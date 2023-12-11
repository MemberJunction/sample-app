-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Application Entities
-- Item: spDeleteApplicationEntity
-- Generated: 12/8/2023, 3:54:04 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- DELETE PROCEDURE FOR ApplicationEntity
------------------------------------------------------------
IF OBJECT_ID('dbo.spDeleteApplicationEntity', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spDeleteApplicationEntity]
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
GRANT EXECUTE ON [spDeleteApplicationEntity] TO [cdp_Developer], [cdp_Integration]
