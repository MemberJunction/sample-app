-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: User Notifications
-- Item: spUpdateUserNotification
-- Generated: 12/8/2023, 3:54:12 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- UPDATE PROCEDURE FOR UserNotification  
------------------------------------------------------------
IF OBJECT_ID('dbo.spUpdateUserNotification', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spUpdateUserNotification]
GO

CREATE PROCEDURE [dbo].[spUpdateUserNotification]
    @ID int,
    @UserID int,
    @Title nvarchar(255),
    @Message nvarchar(MAX),
    @ResourceTypeID int,
    @ResourceRecordID int,
    @ResourceConfiguration nvarchar(MAX),
    @Unread bit,
    @ReadAt datetime
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[UserNotification]
    SET 
        [UserID] = @UserID,
        [Title] = @Title,
        [Message] = @Message,
        [ResourceTypeID] = @ResourceTypeID,
        [ResourceRecordID] = @ResourceRecordID,
        [ResourceConfiguration] = @ResourceConfiguration,
        [Unread] = @Unread,
        [ReadAt] = @ReadAt,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwUserNotifications WHERE ID = @ID
END
GO
GRANT EXECUTE ON [spUpdateUserNotification] TO [cdp_UI], [cdp_Developer], [cdp_Integration]
    