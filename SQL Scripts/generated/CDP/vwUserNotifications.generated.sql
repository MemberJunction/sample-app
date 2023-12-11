-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: User Notifications
-- Item: vwUserNotifications
-- Generated: 12/8/2023, 3:54:12 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- BASE VIEW FOR ENTITY:     User Notifications
-----               BASE TABLE: UserNotification
------------------------------------------------------------
IF OBJECT_ID('dbo.vwUserNotifications', 'V') IS NOT NULL
    DROP VIEW [dbo].[vwUserNotifications]
GO

CREATE VIEW [dbo].[vwUserNotifications]
AS
SELECT 
    u.*,
    User_UserID.[Name] AS [User]
FROM
    [admin].[UserNotification] AS u
INNER JOIN
    [admin].[User] AS User_UserID
  ON
    [u].[UserID] = User_UserID.[ID]
GO
GRANT SELECT ON [dbo].[vwUserNotifications] TO [cdp_UI], [cdp_Developer], [cdp_Integration]
