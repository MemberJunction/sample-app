-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Application Entities
-- Item: spCreateApplicationEntity
-- Generated: 12/8/2023, 3:54:04 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- CREATE PROCEDURE FOR ApplicationEntity
------------------------------------------------------------
IF OBJECT_ID('dbo.spCreateApplicationEntity', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spCreateApplicationEntity]
GO

CREATE PROCEDURE [dbo].[spCreateApplicationEntity]
    @ApplicationName nvarchar(50),
    @EntityID int,
    @Sequence int,
    @DefaultForNewUser bit
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[ApplicationEntity]
        (
            [ApplicationName],
            [EntityID],
            [Sequence],
            [DefaultForNewUser]
        )
    VALUES
        (
            @ApplicationName,
            @EntityID,
            @Sequence,
            @DefaultForNewUser
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwApplicationEntities WHERE ID = SCOPE_IDENTITY()
END
GO
GRANT EXECUTE ON [spCreateApplicationEntity] TO [cdp_Developer], [cdp_Integration]