-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Entity AI Actions
-- Item: spUpdateEntityAIAction
-- Generated: 12/8/2023, 3:54:08 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- UPDATE PROCEDURE FOR EntityAIAction  
------------------------------------------------------------
IF OBJECT_ID('dbo.spUpdateEntityAIAction', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spUpdateEntityAIAction]
GO

CREATE PROCEDURE [dbo].[spUpdateEntityAIAction]
    @ID int,
    @EntityID int,
    @AIActionID int,
    @AIModelID int,
    @Name nvarchar(25),
    @Prompt nvarchar(MAX),
    @TriggerEvent nchar(15),
    @UserMessage nvarchar(MAX),
    @OutputType nchar(10),
    @OutputField nvarchar(50),
    @SkipIfOutputFieldNotEmpty bit,
    @OutputEntityID int,
    @Comments nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[EntityAIAction]
    SET 
        [EntityID] = @EntityID,
        [AIActionID] = @AIActionID,
        [AIModelID] = @AIModelID,
        [Name] = @Name,
        [Prompt] = @Prompt,
        [TriggerEvent] = @TriggerEvent,
        [UserMessage] = @UserMessage,
        [OutputType] = @OutputType,
        [OutputField] = @OutputField,
        [SkipIfOutputFieldNotEmpty] = @SkipIfOutputFieldNotEmpty,
        [OutputEntityID] = @OutputEntityID,
        [Comments] = @Comments
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwEntityAIActions WHERE ID = @ID
END
GO
GRANT EXECUTE ON [spUpdateEntityAIAction] TO [cdp_Integration], [cdp_Developer]
    