-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: User View Run Details
-- Item: spCreateUserViewRunDetail
-- Generated: 12/8/2023, 3:54:05 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- CREATE PROCEDURE FOR UserViewRunDetail
------------------------------------------------------------
IF OBJECT_ID('dbo.spCreateUserViewRunDetail', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spCreateUserViewRunDetail]
GO

CREATE PROCEDURE [dbo].[spCreateUserViewRunDetail]
    @UserViewRunID int,
    @RecordID int
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[UserViewRunDetail]
        (
            [UserViewRunID],
            [RecordID]
        )
    VALUES
        (
            @UserViewRunID,
            @RecordID
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwUserViewRunDetails WHERE ID = SCOPE_IDENTITY()
END
GO
GRANT EXECUTE ON [spCreateUserViewRunDetail] TO [cdp_Developer], [cdp_Integration]