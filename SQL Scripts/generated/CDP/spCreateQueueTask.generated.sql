-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Queue Tasks
-- Item: spCreateQueueTask
-- Generated: 12/8/2023, 3:54:09 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- CREATE PROCEDURE FOR QueueTask
------------------------------------------------------------
IF OBJECT_ID('dbo.spCreateQueueTask', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spCreateQueueTask]
GO

CREATE PROCEDURE [dbo].[spCreateQueueTask]
    @QueueID int,
    @Status nchar(10),
    @StartedAt datetime,
    @EndedAt datetime,
    @Data nvarchar(MAX),
    @Options nvarchar(MAX),
    @Output nvarchar(MAX),
    @ErrorMessage nvarchar(MAX),
    @Comments nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[QueueTask]
        (
            [QueueID],
            [Status],
            [StartedAt],
            [EndedAt],
            [Data],
            [Options],
            [Output],
            [ErrorMessage],
            [Comments]
        )
    VALUES
        (
            @QueueID,
            @Status,
            @StartedAt,
            @EndedAt,
            @Data,
            @Options,
            @Output,
            @ErrorMessage,
            @Comments
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwQueueTasks WHERE ID = SCOPE_IDENTITY()
END
GO
GRANT EXECUTE ON [spCreateQueueTask] TO [cdp_Developer], [cdp_Developer], [cdp_UI]