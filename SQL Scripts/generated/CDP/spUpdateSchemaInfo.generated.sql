-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Schema Info
-- Item: spUpdateSchemaInfo
-- Generated: 12/8/2023, 3:54:14 PM
--
-- This was generated by the Entity Generator.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- UPDATE PROCEDURE FOR SchemaInfo  
------------------------------------------------------------
IF OBJECT_ID('dbo.spUpdateSchemaInfo', 'P') IS NOT NULL
    DROP PROCEDURE [dbo].[spUpdateSchemaInfo]
GO

CREATE PROCEDURE [dbo].[spUpdateSchemaInfo]
    @ID int,
    @SchemaName nvarchar(50),
    @EntityIDMin int,
    @EntityIDMax int,
    @Comments nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE 
        [admin].[SchemaInfo]
    SET 
        [SchemaName] = @SchemaName,
        [EntityIDMin] = @EntityIDMin,
        [EntityIDMax] = @EntityIDMax,
        [Comments] = @Comments,
        UpdatedAt = GETDATE()
    WHERE 
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT * FROM vwSchemaInfos WHERE ID = @ID
END
GO
    