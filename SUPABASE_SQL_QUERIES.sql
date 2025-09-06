-- Campus Event Management Platform - Supabase SQL Setup
-- Copy and paste these queries into your Supabase SQL Editor

-- =====================================================
-- 1. CREATE TABLES
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Colleges table (Multi-college support)
CREATE TABLE IF NOT EXISTS colleges (
    college_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    admin_email VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    event_id VARCHAR(20) PRIMARY KEY, -- Format: {college_id}-{event_number}
    college_id VARCHAR(10) NOT NULL REFERENCES colleges(college_id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    event_type VARCHAR(50) NOT NULL, -- Workshop, Seminar, Social, Sports, etc.
    date_time TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(100) NOT NULL,
    max_seats INTEGER DEFAULT 0 CHECK (max_seats >= 0),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'completed')),
    created_by VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Students table (for reference)
CREATE TABLE IF NOT EXISTS students (
    student_id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    college_id VARCHAR(10) NOT NULL REFERENCES colleges(college_id),
    major VARCHAR(100),
    graduation_year INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Registrations table
CREATE TABLE IF NOT EXISTS registrations (
    registration_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id VARCHAR(20) NOT NULL REFERENCES students(student_id),
    event_id VARCHAR(20) NOT NULL REFERENCES events(event_id),
    registration_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'waitlisted', 'cancelled')),
    UNIQUE(student_id, event_id)
);

-- Attendance table
CREATE TABLE IF NOT EXISTS attendance (
    attendance_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id VARCHAR(20) NOT NULL REFERENCES students(student_id),
    event_id VARCHAR(20) NOT NULL REFERENCES events(event_id),
    check_in_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    check_out_time TIMESTAMP WITH TIME ZONE NULL,
    UNIQUE(student_id, event_id)
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
    feedback_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id VARCHAR(20) NOT NULL REFERENCES students(student_id),
    event_id VARCHAR(20) NOT NULL REFERENCES events(event_id),
    rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
    comment TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, event_id)
);

-- =====================================================
-- 2. CREATE INDEXES FOR PERFORMANCE
-- =====================================================

-- Events indexes
CREATE INDEX IF NOT EXISTS idx_events_college_date ON events(college_id, date_time);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date_time);

-- Registrations indexes
CREATE INDEX IF NOT EXISTS idx_registrations_event ON registrations(event_id, status);
CREATE INDEX IF NOT EXISTS idx_registrations_student ON registrations(student_id);
CREATE INDEX IF NOT EXISTS idx_registrations_time ON registrations(registration_time);

-- Attendance indexes
CREATE INDEX IF NOT EXISTS idx_attendance_event ON attendance(event_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_checkin ON attendance(check_in_time);

-- Feedback indexes
CREATE INDEX IF NOT EXISTS idx_feedback_event ON feedback(event_id);
CREATE INDEX IF NOT EXISTS idx_feedback_rating ON feedback(rating);
CREATE INDEX IF NOT EXISTS idx_feedback_submitted ON feedback(submitted_at);

-- Students indexes
CREATE INDEX IF NOT EXISTS idx_students_college ON students(college_id);
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);

-- =====================================================
-- 3. INSERT SAMPLE DATA
-- =====================================================

-- Insert sample colleges
INSERT INTO colleges (college_id, name, location, admin_email) VALUES
('CS101', 'Computer Science Department', 'Tech Building', 'cs-admin@university.edu'),
('ENG01', 'Engineering Department', 'Engineering Complex', 'eng-admin@university.edu'),
('BUS01', 'Business School', 'Business Center', 'bus-admin@university.edu'),
('ART01', 'Arts & Sciences', 'Liberal Arts Building', 'arts-admin@university.edu'),
('MED01', 'Medical School', 'Medical Center', 'med-admin@university.edu')
ON CONFLICT (college_id) DO NOTHING;

-- Insert sample students
INSERT INTO students (student_id, name, email, college_id, major, graduation_year) VALUES
('STU001', 'Alice Johnson', 'alice.johnson@student.edu', 'CS101', 'Computer Science', 2025),
('STU002', 'Bob Smith', 'bob.smith@student.edu', 'CS101', 'Software Engineering', 2024),
('STU003', 'Carol Davis', 'carol.davis@student.edu', 'ENG01', 'Mechanical Engineering', 2025),
('STU004', 'David Wilson', 'david.wilson@student.edu', 'BUS01', 'Business Administration', 2024),
('STU005', 'Emma Brown', 'emma.brown@student.edu', 'ART01', 'Psychology', 2026),
('STU006', 'Frank Miller', 'frank.miller@student.edu', 'CS101', 'Data Science', 2025),
('STU007', 'Grace Lee', 'grace.lee@student.edu', 'MED01', 'Pre-Med', 2024),
('STU008', 'Henry Taylor', 'henry.taylor@student.edu', 'ENG01', 'Electrical Engineering', 2025)
ON CONFLICT (student_id) DO NOTHING;

-- Insert sample events
INSERT INTO events (event_id, college_id, title, description, event_type, date_time, location, max_seats, created_by) VALUES
('CS101-001', 'CS101', 'React Workshop', 'Learn the fundamentals of React development', 'Workshop', '2024-03-15 14:00:00+00', 'Room 101', 50, 'Prof. Smith'),
('CS101-002', 'CS101', 'AI & Machine Learning Seminar', 'Introduction to AI and ML concepts', 'Seminar', '2024-03-18 10:00:00+00', 'Auditorium A', 100, 'Dr. Johnson'),
('CS101-003', 'CS101', 'Spring Career Fair', 'Meet with top tech companies', 'Career Fair', '2024-03-22 09:00:00+00', 'Main Hall', 200, 'Career Office'),
('CS101-004', 'CS101', 'Python Bootcamp', 'Intensive Python programming course', 'Workshop', '2024-03-12 13:00:00+00', 'Lab 205', 30, 'Prof. Davis'),
('ENG01-001', 'ENG01', 'Robotics Competition', 'Annual engineering robotics challenge', 'Competition', '2024-03-20 09:00:00+00', 'Engineering Lab', 75, 'Prof. Anderson'),
('BUS01-001', 'BUS01', 'Entrepreneurship Summit', 'Learn from successful entrepreneurs', 'Conference', '2024-03-25 10:00:00+00', 'Business Auditorium', 150, 'Dr. Martinez')
ON CONFLICT (event_id) DO NOTHING;

-- Insert sample registrations
INSERT INTO registrations (student_id, event_id, status) VALUES
('STU001', 'CS101-001', 'confirmed'),
('STU002', 'CS101-001', 'confirmed'),
('STU006', 'CS101-001', 'confirmed'),
('STU001', 'CS101-002', 'confirmed'),
('STU002', 'CS101-002', 'confirmed'),
('STU006', 'CS101-002', 'confirmed'),
('STU003', 'ENG01-001', 'confirmed'),
('STU008', 'ENG01-001', 'confirmed'),
('STU004', 'BUS01-001', 'confirmed'),
('STU005', 'CS101-003', 'confirmed')
ON CONFLICT (student_id, event_id) DO NOTHING;

-- Insert sample attendance (for completed events)
INSERT INTO attendance (student_id, event_id, check_in_time) VALUES
('STU001', 'CS101-004', '2024-03-12 13:05:00+00'),
('STU002', 'CS101-004', '2024-03-12 13:02:00+00'),
('STU006', 'CS101-004', '2024-03-12 13:10:00+00')
ON CONFLICT (student_id, event_id) DO NOTHING;

-- Insert sample feedback
INSERT INTO feedback (student_id, event_id, rating, comment) VALUES
('STU001', 'CS101-004', 5, 'Excellent workshop! Very hands-on and practical.'),
('STU002', 'CS101-004', 4, 'Good content, could use more advanced topics.'),
('STU006', 'CS101-004', 5, 'Amazing instructor and great learning experience.')
ON CONFLICT (student_id, event_id) DO NOTHING;

-- =====================================================
-- 4. USEFUL REPORTING QUERIES
-- =====================================================

-- Total registrations per event
CREATE OR REPLACE VIEW event_registration_summary AS
SELECT 
    e.event_id,
    e.title,
    e.event_type,
    e.date_time,
    e.max_seats,
    COUNT(r.registration_id) as total_registrations,
    ROUND((COUNT(r.registration_id)::DECIMAL / e.max_seats) * 100, 2) as capacity_percentage
FROM events e
LEFT JOIN registrations r ON e.event_id = r.event_id AND r.status = 'confirmed'
GROUP BY e.event_id, e.title, e.event_type, e.date_time, e.max_seats
ORDER BY total_registrations DESC;

-- Attendance rate calculation
CREATE OR REPLACE VIEW event_attendance_summary AS
SELECT 
    e.event_id,
    e.title,
    COUNT(r.registration_id) as registered,
    COUNT(a.attendance_id) as attended,
    CASE 
        WHEN COUNT(r.registration_id) > 0 
        THEN ROUND((COUNT(a.attendance_id)::DECIMAL / COUNT(r.registration_id)) * 100, 2)
        ELSE 0 
    END as attendance_rate
FROM events e
LEFT JOIN registrations r ON e.event_id = r.event_id AND r.status = 'confirmed'
LEFT JOIN attendance a ON r.student_id = a.student_id AND r.event_id = a.event_id
GROUP BY e.event_id, e.title
ORDER BY attendance_rate DESC;

-- Average feedback score per event
CREATE OR REPLACE VIEW event_feedback_summary AS
SELECT 
    e.event_id,
    e.title,
    COUNT(f.feedback_id) as feedback_count,
    ROUND(AVG(f.rating), 2) as avg_rating
FROM events e
LEFT JOIN feedback f ON e.event_id = f.event_id
GROUP BY e.event_id, e.title
HAVING COUNT(f.feedback_id) > 0
ORDER BY avg_rating DESC;

-- Top active students
CREATE OR REPLACE VIEW top_active_students AS
SELECT 
    s.student_id,
    s.name,
    s.college_id,
    COUNT(DISTINCT a.event_id) as events_attended,
    COUNT(DISTINCT r.event_id) as events_registered
FROM students s
LEFT JOIN attendance a ON s.student_id = a.student_id
LEFT JOIN registrations r ON s.student_id = r.student_id AND r.status = 'confirmed'
GROUP BY s.student_id, s.name, s.college_id
ORDER BY events_attended DESC, events_registered DESC
LIMIT 10;

-- =====================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (admin access)
-- Note: Adjust these policies based on your authentication setup

-- Colleges: Admin can read all
CREATE POLICY "Allow authenticated read access to colleges" ON colleges
    FOR SELECT USING (auth.role() = 'authenticated');

-- Events: Admin can manage all events
CREATE POLICY "Allow authenticated full access to events" ON events
    FOR ALL USING (auth.role() = 'authenticated');

-- Students: Admin can read all
CREATE POLICY "Allow authenticated read access to students" ON students
    FOR SELECT USING (auth.role() = 'authenticated');

-- Registrations: Admin can manage all
CREATE POLICY "Allow authenticated full access to registrations" ON registrations
    FOR ALL USING (auth.role() = 'authenticated');

-- Attendance: Admin can manage all
CREATE POLICY "Allow authenticated full access to attendance" ON attendance
    FOR ALL USING (auth.role() = 'authenticated');

-- Feedback: Admin can read all
CREATE POLICY "Allow authenticated read access to feedback" ON feedback
    FOR SELECT USING (auth.role() = 'authenticated');

-- =====================================================
-- 6. FUNCTIONS FOR COMMON OPERATIONS
-- =====================================================

-- Function to generate event ID
CREATE OR REPLACE FUNCTION generate_event_id(college_code VARCHAR(10))
RETURNS VARCHAR(20) AS $$
DECLARE
    last_number INTEGER;
    new_event_id VARCHAR(20);
BEGIN
    -- Get the last event number for this college
    SELECT COALESCE(
        MAX(CAST(SPLIT_PART(event_id, '-', 2) AS INTEGER)), 
        0
    ) INTO last_number
    FROM events 
    WHERE college_id = college_code;
    
    -- Generate new event ID
    new_event_id := college_code || '-' || LPAD((last_number + 1)::TEXT, 3, '0');
    
    RETURN new_event_id;
END;
$$ LANGUAGE plpgsql;

-- Function to check event capacity
CREATE OR REPLACE FUNCTION check_event_capacity(event_id_param VARCHAR(20))
RETURNS TABLE(
    available_seats INTEGER,
    is_full BOOLEAN,
    registration_count INTEGER,
    max_capacity INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (e.max_seats - COALESCE(reg_count.count, 0))::INTEGER as available_seats,
        (COALESCE(reg_count.count, 0) >= e.max_seats) as is_full,
        COALESCE(reg_count.count, 0)::INTEGER as registration_count,
        e.max_seats as max_capacity
    FROM events e
    LEFT JOIN (
        SELECT 
            event_id, 
            COUNT(*) as count
        FROM registrations 
        WHERE status = 'confirmed' AND event_id = event_id_param
        GROUP BY event_id
    ) reg_count ON e.event_id = reg_count.event_id
    WHERE e.event_id = event_id_param;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 7. SAMPLE QUERIES FOR YOUR APPLICATION
-- =====================================================

-- Query: Get all upcoming events for dashboard
/*
SELECT 
    e.event_id,
    e.title,
    e.event_type,
    e.date_time,
    e.location,
    e.max_seats,
    COUNT(r.registration_id) as registrations,
    e.status
FROM events e
LEFT JOIN registrations r ON e.event_id = r.event_id AND r.status = 'confirmed'
WHERE e.date_time > NOW() AND e.status = 'active'
GROUP BY e.event_id, e.title, e.event_type, e.date_time, e.location, e.max_seats, e.status
ORDER BY e.date_time ASC
LIMIT 10;
*/

-- Query: Get event popularity report
/*
SELECT * FROM event_registration_summary
WHERE capacity_percentage > 0
ORDER BY capacity_percentage DESC;
*/

-- Query: Get attendance analytics
/*
SELECT * FROM event_attendance_summary
WHERE registered > 0
ORDER BY attendance_rate DESC;
*/

-- Query: Get student participation report
/*
SELECT * FROM top_active_students;
*/

-- Query: Get feedback summary
/*
SELECT * FROM event_feedback_summary
ORDER BY avg_rating DESC;
*/

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================

-- Your Campus Event Management Platform database is now ready!
-- 
-- Next steps:
-- 1. Connect your Lovable project to Supabase using the green button
-- 2. Set up authentication (email/password recommended)
-- 3. Update RLS policies based on your user roles
-- 4. Test the queries and modify as needed
-- 
-- The sample data includes:
-- - 5 colleges/departments
-- - 8 sample students  
-- - 6 sample events
-- - Registration and attendance data
-- - Feedback samples
--
-- All indexes and views are optimized for the reporting dashboard!