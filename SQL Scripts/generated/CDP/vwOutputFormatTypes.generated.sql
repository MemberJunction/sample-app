-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Output Format Types
-- Item: vwOutputFormatTypes
-- Generated: 12/8/2023, 3:54:10 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- BASE VIEW FOR ENTITY:     Output Format Types
-----               BASE TABLE: OutputFormatType
------------------------------------------------------------
IF OBJECT_ID('dbo.vwOutputFormatTypes', 'V') IS NOT NULL
    DROP VIEW [dbo].[vwOutputFormatTypes]
GO

CREATE VIEW [dbo].[vwOutputFormatTypes]
AS
SELECT 
    o.*
FROM
    [admin].[OutputFormatType] AS o
GO
GRANT SELECT ON [dbo].[vwOutputFormatTypes] TO [cdp_UI]