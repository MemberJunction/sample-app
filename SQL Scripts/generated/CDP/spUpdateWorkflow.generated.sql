-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Workflows
-- Item: spUpdateWorkflow
-- Generated: 12/8/2023, 3:54:06 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- UPDATE PROCEDURE FOR Workflow  
------------------------------------------------------------
IF OBJECT_ID('dbo.spUpdateWorkflow', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spUpdateWorkflow]
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
GRANT EXECUTE ON [spUpdateWorkflow] TO [cdp_Developer], [cdp_Integration]
    