-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Queues
-- Item: spUpdateQueue
-- Generated: 12/8/2023, 3:54:09 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- UPDATE PROCEDURE FOR Queue  
------------------------------------------------------------
IF OBJECT_ID('dbo.spUpdateQueue', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spUpdateQueue]
GO

CREATE PROCEDURE [dbo].[spUpdateQueue]
    @ID int,
    @Name nvarchar(50),
    @Description nvarchar(MAX),
    @QueueTypeID int,
    @IsActive bit,
    @ProcessPID int,
    @ProcessPlatform nvarchar(30),
    @ProcessVersion nvarchar(15),
    @ProcessCwd nvarchar(100),
    @ProcessIPAddress nvarchar(50),
    @ProcessMacAddress nvarchar(50),
    @ProcessOSName nvarchar(25),
    @ProcessOSVersion nvarchar(10),
    @ProcessHostName nvarchar(50),
    @ProcessUserID nvarchar(25),
    @ProcessUserName nvarchar(50),
    @LastHeartbeat datetime
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[Queue]
    SET 
        [Name] = @Name,
        [Description] = @Description,
        [QueueTypeID] = @QueueTypeID,
        [IsActive] = @IsActive,
        [ProcessPID] = @ProcessPID,
        [ProcessPlatform] = @ProcessPlatform,
        [ProcessVersion] = @ProcessVersion,
        [ProcessCwd] = @ProcessCwd,
        [ProcessIPAddress] = @ProcessIPAddress,
        [ProcessMacAddress] = @ProcessMacAddress,
        [ProcessOSName] = @ProcessOSName,
        [ProcessOSVersion] = @ProcessOSVersion,
        [ProcessHostName] = @ProcessHostName,
        [ProcessUserID] = @ProcessUserID,
        [ProcessUserName] = @ProcessUserName,
        [LastHeartbeat] = @LastHeartbeat,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwQueues WHERE ID = @ID
END
GO
GRANT EXECUTE ON [spUpdateQueue] TO [cdp_Developer], [cdp_Developer]
    