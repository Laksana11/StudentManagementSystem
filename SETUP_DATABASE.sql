IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'StudentDB')
BEGIN
    CREATE DATABASE StudentDB;
    PRINT 'Database StudentDB created successfully!';
END
ELSE
BEGIN
    PRINT 'Database StudentDB already exists.';
END
GO

-- Step 2: Switch to StudentDB
USE StudentDB;
GO

-- Step 3: Create Students Table
IF OBJECT_ID('dbo.Students', 'U') IS NOT NULL
    DROP TABLE dbo.Students;
GO

CREATE TABLE Students (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Age INT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
GO

PRINT 'Students table created successfully!';
GO

-- Step 4: Create Stored Procedures
-- sp_GetAllStudents
CREATE OR ALTER PROCEDURE sp_GetAllStudents
    @search NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    IF @search IS NULL OR @search = ''
    BEGIN
        SELECT Id, Name, Email, Age, CreatedAt 
        FROM Students 
        ORDER BY Id DESC;
    END
    ELSE
    BEGIN
        SELECT Id, Name, Email, Age, CreatedAt 
        FROM Students 
        WHERE Name LIKE '%' + @search + '%' 
           OR Email LIKE '%' + @search + '%'
        ORDER BY Id DESC;
    END
END
GO

-- sp_GetStudentById
CREATE OR ALTER PROCEDURE sp_GetStudentById
    @id INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT Id, Name, Email, Age, CreatedAt 
    FROM Students 
    WHERE Id = @id;
END
GO

-- sp_CreateStudent
CREATE OR ALTER PROCEDURE sp_CreateStudent
    @name NVARCHAR(100),
    @email NVARCHAR(100),
    @age INT = NULL,
    @createdAt DATETIME2
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO Students (Name, Email, Age, CreatedAt)
    VALUES (@name, @email, @age, @createdAt);
    
    SELECT Id, Name, Email, Age, CreatedAt 
    FROM Students 
    WHERE Id = SCOPE_IDENTITY();
END
GO

-- sp_UpdateStudent
CREATE OR ALTER PROCEDURE sp_UpdateStudent
    @id INT,
    @name NVARCHAR(100),
    @email NVARCHAR(100),
    @age INT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Students 
    SET Name = @name, 
        Email = @email, 
        Age = @age 
    WHERE Id = @id;
    
    SELECT @@ROWCOUNT AS RowsAffected;
END
GO

-- sp_DeleteStudent
CREATE OR ALTER PROCEDURE sp_DeleteStudent
    @id INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM Students WHERE Id = @id;
    SELECT @@ROWCOUNT AS RowsAffected;
END
GO

-- sp_EmailExists
CREATE OR ALTER PROCEDURE sp_EmailExists
    @email NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT COUNT(*) AS EmailCount 
    FROM Students 
    WHERE Email = @email;
END
GO

-- sp_EmailExistsExcludingId
CREATE OR ALTER PROCEDURE sp_EmailExistsExcludingId
    @email NVARCHAR(100),
    @id INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT COUNT(*) AS EmailCount 
    FROM Students 
    WHERE Email = @email AND Id != @id;
END
GO

PRINT 'All stored procedures created successfully!';
GO

-- Step 5: Verify Setup
PRINT 'Verifying setup...';
GO

SELECT 'Stored Procedures Created:' AS Info;
SELECT name, type_desc 
FROM sys.objects 
WHERE type = 'P' AND name LIKE 'sp_%'
ORDER BY name;
GO

-- Step 6: Insert Sample Data (Optional)
INSERT INTO Students (Name, Email, Age, CreatedAt)
VALUES 
    ('John Doe', 'john@example.com', 25, GETUTCDATE()),
    ('Jane Smith', 'jane@example.com', 22, GETUTCDATE()),
    ('Bob Johnson', 'bob@example.com', 30, GETUTCDATE());
GO

PRINT 'Sample data inserted!';
GO

-- Test the stored procedure
EXEC sp_GetAllStudents;
GO

PRINT 'Setup complete! You can now run the API.';
