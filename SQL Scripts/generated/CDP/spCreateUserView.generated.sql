-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: User Views
-- Item: spCreateUserView
-- Generated: 12/8/2023, 3:54:03 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- CREATE PROCEDURE FOR UserView
------------------------------------------------------------
IF OBJECT_ID('dbo.spCreateUserView', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spCreateUserView]
GO

CREATE PROCEDURE [dbo].[spCreateUserView]
    @UserID int,
    @EntityID int,
    @Name nvarchar(100),
    @Description nvarchar(MAX),
    @IsShared bit,
    @IsDefault bit,
    @GridState nvarchar(MAX),
    @FilterState nvarchar(MAX),
    @CustomFilterState bit,
    @SmartFilterEnabled bit,
    @SmartFilterPrompt nvarchar(MAX),
    @SmartFilterWhereClause nvarchar(MAX),
    @SmartFilterExplanation nvarchar(MAX),
    @WhereClause nvarchar(MAX),
    @CustomWhereClause bit,
    @SortState nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO 
    [admin].[UserView]
        (
            [UserID],
            [EntityID],
            [Name],
            [Description],
            [IsShared],
            [IsDefault],
            [GridState],
            [FilterState],
            [CustomFilterState],
            [SmartFilterEnabled],
            [SmartFilterPrompt],
            [SmartFilterWhereClause],
            [SmartFilterExplanation],
            [WhereClause],
            [CustomWhereClause],
            [SortState]
        )
    VALUES
        (
            @UserID,
            @EntityID,
            @Name,
            @Description,
            @IsShared,
            @IsDefault,
            @GridState,
            @FilterState,
            @CustomFilterState,
            @SmartFilterEnabled,
            @SmartFilterPrompt,
            @SmartFilterWhereClause,
            @SmartFilterExplanation,
            @WhereClause,
            @CustomWhereClause,
            @SortState
        )

    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM vwUserViews WHERE ID = SCOPE_IDENTITY()
END
GO
GRANT EXECUTE ON [spCreateUserView] TO [cdp_Developer], [cdp_Integration], [cdp_UI]