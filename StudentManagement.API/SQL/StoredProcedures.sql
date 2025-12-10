-- 1. Create Database and Table
USE StudentDB;
GO

-- Drop existing objects if they exist
IF OBJECT_ID('dbo.Students', 'U') IS NOT NULL
    DROP TABLE dbo.Students;
GO

-- Create Students Table
CREATE TABLE Students (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Age INT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
GO

-- 2. Get All Students (with optional search)
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

-- 3. Get Student By ID
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

-- 4. Create Student
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

-- 5. Update Student
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

-- 6. Delete Student
CREATE OR ALTER PROCEDURE sp_DeleteStudent
    @id INT
AS
BEGIN
    SET NOCOUNT ON;
    
    DELETE FROM Students WHERE Id = @id;
    
    SELECT @@ROWCOUNT AS RowsAffected;
END
GO

-- 7. Check if Email Exists
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

-- 8. Check if Email Exists (excluding specific ID)
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
