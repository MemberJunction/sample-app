-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Book Topics
-- Item: spCreateBookTopic
-- Generated: 12/8/2023, 3:54:15 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- CREATE PROCEDURE FOR BookTopic
------------------------------------------------------------
IF OBJECT_ID('dbo.spCreateBookTopic', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spCreateBookTopic]
GO

CREATE PROCEDURE [dbo].[spCreateBookTopic]
    @BookID int,
    @TopicID int
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [books].[BookTopic]
        (
            [BookID],
            [TopicID]
        )
    VALUES
        (
            @BookID,
            @TopicID
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwBookTopics WHERE ID = SCOPE_IDENTITY()
END
GO
GRANT EXECUTE ON [spCreateBookTopic] TO [cdp_Developer], [cdp_Integration]