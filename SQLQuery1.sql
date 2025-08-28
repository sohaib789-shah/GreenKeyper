-- Insert 10 random users
INSERT INTO Users (name, email, password_hash, role, is_active)  
VALUES
('john_doe', 'john@example.com', 'hashed_pwd1', 'admin', 1),
('jane_smith', 'jane@example.com', 'hashed_pwd2', 'driver', 1),
('mike_jones', 'mike@example.com', 'hashed_pwd3', 'mechanic', 1),
('lisa_wong', 'lisa@example.com', 'hashed_pwd4', 'driver', 1),
('tom_brown', 'tom@example.com', 'hashed_pwd5', 'mechanic', 1),
('sara_ali', 'sara@example.com', 'hashed_pwd6', 'admin', 1),
('daniel_khan', 'daniel@example.com', 'hashed_pwd7', 'driver', 1),
('nina_ross', 'nina@example.com', 'hashed_pwd8', 'mechanic', 1),
('peter_lee', 'peter@example.com', 'hashed_pwd9', 'driver', 1),
('emma_white', 'emma@example.com', 'hashed_pwd10', 'admin', 1);

-- Insert 10 vehicles (one per user)
INSERT INTO Vehicles (plate_number, make, model, year, is_active)
VALUES
('ABC123', 'Toyota', 'Corolla', 2018, 1),
('XYZ456', 'Honda', 'Civic', 2020, 1),
('LMN789', 'Ford', 'Focus', 2017, 1),
('PQR234', 'Nissan', 'Sentra', 2019, 1),
('STU567', 'Chevy', 'Cruze', 2016, 1),
('JKL890', 'Hyundai', 'Elantra', 2021, 1),
('DEF345', 'Kia', 'Optima', 2018, 1),
('GHI678', 'Mazda', '3', 2020, 1),
('VWX901', 'VW', 'Jetta', 2019, 1),
('QWE112', 'Subaru', 'Impreza', 2017, 1);

-- Insert 10 checklists (linked to users)
INSERT INTO Checklists (type, title, created_by, is_active)
VALUES
('BOD', 'Morning inspection', 29, 1),
('EOD', 'Evening inspection', 30, 1),
('BOD', 'Pre-trip check', 31, 1),
('EOD', 'Post-trip check', 32, 1),
('BOD', 'Safety check', 33, 1),
('EOD', 'End of day safety', 34, 1),
('BOD', 'Fuel check', 35, 1),
('EOD', 'Maintenance check', 36, 1),
('BOD', 'Cleanliness check', 37, 1),
('EOD', 'Final log check', 38, 1);
