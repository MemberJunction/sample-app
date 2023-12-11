-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Workspaces
-- Item: vwWorkspaces
-- Generated: 12/8/2023, 3:54:11 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- BASE VIEW FOR ENTITY:     Workspaces
-----               BASE TABLE: Workspace
------------------------------------------------------------
IF OBJECT_ID('dbo.vwWorkspaces', 'V') IS NOT NULL
    DROP VIEW [dbo].[vwWorkspaces]
GO

CREATE VIEW [dbo].[vwWorkspaces]
AS
SELECT 
    w.*,
    User_UserID.[Name] AS [User]
FROM
    [admin].[Workspace] AS w
INNER JOIN
    [admin].[User] AS User_UserID
  ON
    [w].[UserID] = User_UserID.[ID]
GO
GRANT SELECT ON [dbo].[vwWorkspaces] TO [cdp_UI]