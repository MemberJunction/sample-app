-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Row Level Security Filters
-- Item: vwRowLevelSecurityFilters
-- Generated: 12/8/2023, 3:54:07 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- BASE VIEW FOR ENTITY:     Row Level Security Filters
-----               BASE TABLE: RowLevelSecurityFilter
------------------------------------------------------------
IF OBJECT_ID('dbo.vwRowLevelSecurityFilters', 'V') IS NOT NULL
    DROP VIEW [dbo].[vwRowLevelSecurityFilters]
GO

CREATE VIEW [dbo].[vwRowLevelSecurityFilters]
AS
SELECT 
    r.*
FROM
    [admin].[RowLevelSecurityFilter] AS r
GO
GRANT SELECT ON [dbo].[vwRowLevelSecurityFilters] TO [cdp_Developer], [cdp_Integration], [cdp_UI]
