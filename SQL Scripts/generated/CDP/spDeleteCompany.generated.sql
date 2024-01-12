-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Companies
-- Item: spDeleteCompany
-- Generated: 12/8/2023, 3:53:59 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- DELETE PROCEDURE FOR Company
------------------------------------------------------------
IF OBJECT_ID('dbo.spDeleteCompany', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spDeleteCompany]
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
GRANT EXECUTE ON [spDeleteCompany] TO [cdp_Developer], [cdp_Integration]
