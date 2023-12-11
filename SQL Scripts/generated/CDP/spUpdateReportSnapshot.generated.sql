-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Report Snapshots
-- Item: spUpdateReportSnapshot
-- Generated: 12/8/2023, 3:54:10 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- UPDATE PROCEDURE FOR ReportSnapshot  
------------------------------------------------------------
IF OBJECT_ID('dbo.spUpdateReportSnapshot', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spUpdateReportSnapshot]
GO

CREATE PROCEDURE [dbo].[spUpdateReportSnapshot]
    @ID int,
    @ReportID int,
    @ResultSet nvarchar(MAX),
    @UserID int
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[ReportSnapshot]
    SET 
        [ReportID] = @ReportID,
        [ResultSet] = @ResultSet,
        [UserID] = @UserID
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwReportSnapshots WHERE ID = @ID
END
GO
GRANT EXECUTE ON [spUpdateReportSnapshot] TO [cdp_UI]
    