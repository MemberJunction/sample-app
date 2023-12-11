-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Purchases
-- Item: spUpdatePurchase
-- Generated: 12/8/2023, 3:54:16 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- UPDATE PROCEDURE FOR Purchase  
------------------------------------------------------------
IF OBJECT_ID('dbo.spUpdatePurchase', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spUpdatePurchase]
GO

CREATE PROCEDURE [dbo].[spUpdatePurchase]
    @ID int,
    @Date date,
    @PersonID int,
    @GrandTotal money
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [customers].[Purchase]
    SET 
        [Date] = @Date,
        [PersonID] = @PersonID,
        [GrandTotal] = @GrandTotal,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwPurchases WHERE ID = @ID
END
GO
GRANT EXECUTE ON [spUpdatePurchase] TO [cdp_Developer], [cdp_Integration]
    