-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Error Logs
-- Item: spUpdateErrorLog
-- Generated: 12/8/2023, 3:54:03 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- UPDATE PROCEDURE FOR ErrorLog  
------------------------------------------------------------
IF OBJECT_ID('dbo.spUpdateErrorLog', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spUpdateErrorLog]
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
GRANT EXECUTE ON [spUpdateErrorLog] TO [cdp_Developer], [cdp_Integration]
    