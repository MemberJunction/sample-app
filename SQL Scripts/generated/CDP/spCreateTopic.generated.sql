-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Topics
-- Item: spCreateTopic
-- Generated: 12/8/2023, 3:54:15 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- CREATE PROCEDURE FOR Topic
------------------------------------------------------------
IF OBJECT_ID('dbo.spCreateTopic', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spCreateTopic]
GO

CREATE PROCEDURE [dbo].[spCreateTopic]
    @Name nvarchar(100),
    @Description nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [books].[Topic]
        (
            [Name],
            [Description]
        )
    VALUES
        (
            @Name,
            @Description
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwTopics WHERE ID = SCOPE_IDENTITY()
END
GO
GRANT EXECUTE ON [spCreateTopic] TO [cdp_Developer], [cdp_Integration]
