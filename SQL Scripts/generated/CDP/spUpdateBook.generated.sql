-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Books
-- Item: spUpdateBook
-- Generated: 12/8/2023, 3:54:15 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- UPDATE PROCEDURE FOR Book  
------------------------------------------------------------
IF OBJECT_ID('dbo.spUpdateBook', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spUpdateBook]
GO

CREATE PROCEDURE [dbo].[spUpdateBook]
    @ID int,
    @BookCategoryID int,
    @Name nvarchar(100),
    @Description nvarchar(MAX),
    @CoverImageURL nvarchar(1000),
    @Pages int,
    @FullText nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [books].[Book]
    SET 
        [BookCategoryID] = @BookCategoryID,
        [Name] = @Name,
        [Description] = @Description,
        [CoverImageURL] = @CoverImageURL,
        [Pages] = @Pages,
        [FullText] = @FullText,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwBooks WHERE ID = @ID
END
GO
GRANT EXECUTE ON [spUpdateBook] TO [cdp_Developer], [cdp_Integration]
    