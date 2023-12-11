-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Record Merge Deletion Logs
-- Item: spCreateRecordMergeDeletionLog
-- Generated: 12/8/2023, 3:54:14 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- CREATE PROCEDURE FOR RecordMergeDeletionLog
------------------------------------------------------------
IF OBJECT_ID('dbo.spCreateRecordMergeDeletionLog', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spCreateRecordMergeDeletionLog]
GO

CREATE PROCEDURE [dbo].[spCreateRecordMergeDeletionLog]
    @RecordMergeLogID int,
    @DeletedRecordID int,
    @Status nvarchar(10),
    @ProcessingLog nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[RecordMergeDeletionLog]
        (
            [RecordMergeLogID],
            [DeletedRecordID],
            [Status],
            [ProcessingLog]
        )
    VALUES
        (
            @RecordMergeLogID,
            @DeletedRecordID,
            @Status,
            @ProcessingLog
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwRecordMergeDeletionLogs WHERE ID = SCOPE_IDENTITY()
END
GO
GRANT EXECUTE ON [spCreateRecordMergeDeletionLog] TO [cdp_Developer], [cdp_Integration], [cdp_UI], [cdp_Developer], [cdp_Integration]
