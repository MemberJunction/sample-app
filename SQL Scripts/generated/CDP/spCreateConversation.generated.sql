-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Conversations
-- Item: spCreateConversation
-- Generated: 12/8/2023, 3:54:12 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- CREATE PROCEDURE FOR Conversation
------------------------------------------------------------
IF OBJECT_ID('dbo.spCreateConversation', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spCreateConversation]
GO

CREATE PROCEDURE [dbo].[spCreateConversation]
    @UserID int,
    @ExternalID nvarchar(100),
    @Name nvarchar(100)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[Conversation]
        (
            [UserID],
            [ExternalID],
            [Name]
        )
    VALUES
        (
            @UserID,
            @ExternalID,
            @Name
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwConversations WHERE ID = SCOPE_IDENTITY()
END
GO
GRANT EXECUTE ON [spCreateConversation] TO [cdp_UI], [cdp_UI], [cdp_Developer], [cdp_Integration]
