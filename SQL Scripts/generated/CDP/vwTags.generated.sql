-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Tags
-- Item: vwTags
-- Generated: 12/8/2023, 3:54:11 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- BASE VIEW FOR ENTITY:     Tags
-----               BASE TABLE: Tag
------------------------------------------------------------
IF OBJECT_ID('dbo.vwTags', 'V') IS NOT NULL
    DROP VIEW [dbo].[vwTags]
GO

CREATE VIEW [dbo].[vwTags]
AS
SELECT 
    t.*,
    Tag_ParentID.[Name] AS [Parent]
FROM
    [admin].[Tag] AS t
LEFT OUTER JOIN
    [admin].[Tag] AS Tag_ParentID
  ON
    [t].[ParentID] = Tag_ParentID.[ID]
GO
GRANT SELECT ON [dbo].[vwTags] TO [cdp_UI]