-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Conversation Details
-- Item: spDeleteConversationDetail
-- Generated: 12/8/2023, 3:54:12 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- DELETE PROCEDURE FOR ConversationDetail
------------------------------------------------------------
IF OBJECT_ID('dbo.spDeleteConversationDetail', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spDeleteConversationDetail]
GO

CREATE PROCEDURE [dbo].[spDeleteConversationDetail]
    @ID INT
AS  
BEGIN
    SET NOCOUNT ON;
    DELETE FROM 
        [admin].[ConversationDetail]
    WHERE 
        [ID] = @ID
    SELECT @ID AS ID -- Return the ID to indicate we successfully deleted the record
END
GO
GRANT EXECUTE ON [spDeleteConversationDetail] TO [cdp_UI]