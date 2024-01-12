-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Error Logs
-- Item: vwErrorLogs
-- Generated: 12/8/2023, 3:54:03 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- BASE VIEW FOR ENTITY:     Error Logs
-----               BASE TABLE: ErrorLog
------------------------------------------------------------
IF OBJECT_ID('dbo.vwErrorLogs', 'V') IS NOT NULL
    DROP VIEW [dbo].[vwErrorLogs]
GO

CREATE VIEW [dbo].[vwErrorLogs]
AS
SELECT 
    e.*
FROM
    [admin].[ErrorLog] AS e
GO
GRANT SELECT ON [dbo].[vwErrorLogs] TO [cdp_Developer], [cdp_Integration], [cdp_UI]
