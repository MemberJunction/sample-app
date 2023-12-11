-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Reports
-- Item: spUpdateReport
-- Generated: 12/8/2023, 3:54:10 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- UPDATE PROCEDURE FOR Report  
------------------------------------------------------------
IF OBJECT_ID('dbo.spUpdateReport', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spUpdateReport]
GO

CREATE PROCEDURE [dbo].[spUpdateReport]
    @ID int,
    @Name nvarchar(255),
    @Description nvarchar(MAX),
    @UserID int,
    @SharingScope nvarchar(20),
    @ConversationID int,
    @ConversationDetailID int,
    @ReportSQL nvarchar(MAX),
    @ReportConfiguration nvarchar(MAX),
    @OutputTriggerTypeID int,
    @OutputFormatTypeID int,
    @OutputDeliveryTypeID int,
    @OutputEventID int,
    @OutputFrequency nvarchar(50),
    @OutputTargetEmail nvarchar(255),
    @OutputWorkflowID int
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[Report]
    SET 
        [Name] = @Name,
        [Description] = @Description,
        [UserID] = @UserID,
        [SharingScope] = @SharingScope,
        [ConversationID] = @ConversationID,
        [ConversationDetailID] = @ConversationDetailID,
        [ReportSQL] = @ReportSQL,
        [ReportConfiguration] = @ReportConfiguration,
        [OutputTriggerTypeID] = @OutputTriggerTypeID,
        [OutputFormatTypeID] = @OutputFormatTypeID,
        [OutputDeliveryTypeID] = @OutputDeliveryTypeID,
        [OutputEventID] = @OutputEventID,
        [OutputFrequency] = @OutputFrequency,
        [OutputTargetEmail] = @OutputTargetEmail,
        [OutputWorkflowID] = @OutputWorkflowID,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwReports WHERE ID = @ID
END
GO
GRANT EXECUTE ON [spUpdateReport] TO [cdp_UI]
    