-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Conversation Details
-- Item: vwConversationDetails
-- Generated: 12/8/2023, 3:54:12 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- BASE VIEW FOR ENTITY:     Conversation Details
-----               BASE TABLE: ConversationDetail
------------------------------------------------------------
IF OBJECT_ID('dbo.vwConversationDetails', 'V') IS NOT NULL
    DROP VIEW [dbo].[vwConversationDetails]
GO

CREATE VIEW [dbo].[vwConversationDetails]
AS
SELECT 
    c.*,
    Conversation_ConversationID.[Name] AS [Conversation]
FROM
    [admin].[ConversationDetail] AS c
INNER JOIN
    [admin].[Conversation] AS Conversation_ConversationID
  ON
    [c].[ConversationID] = Conversation_ConversationID.[ID]
GO
GRANT SELECT ON [dbo].[vwConversationDetails] TO [cdp_UI], [cdp_UI], [cdp_Developer], [cdp_Integration]