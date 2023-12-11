-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: User Favorites
-- Item: spUpdateUserFavorite
-- Generated: 12/8/2023, 3:53:59 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- UPDATE PROCEDURE FOR UserFavorite  
------------------------------------------------------------
IF OBJECT_ID('dbo.spUpdateUserFavorite', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spUpdateUserFavorite]
GO

CREATE PROCEDURE [dbo].[spUpdateUserFavorite]
    @ID int,
    @UserID int,
    @EntityID int,
    @RecordID int
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[UserFavorite]
    SET 
        [UserID] = @UserID,
        [EntityID] = @EntityID,
        [RecordID] = @RecordID,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwUserFavorites WHERE ID = @ID
END
GO
GRANT EXECUTE ON [spUpdateUserFavorite] TO [cdp_Developer], [cdp_Integration], [cdp_UI]
    