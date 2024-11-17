PRAGMA foreign_keys = ON;

INSERT INTO users(username, password, level, completeMeasure, noteAddition, noteIdentification, typeRhythm)
VALUES ('student0', 'student0', 0, 0, 0, 0, 3),
       ('student1', 'student1', 1, 0, 1, 0, 0),
       ('student2', 'student2', 2, 0, 0, 0, 0);

INSERT INTO exercises(exerciseType, exercisePath, textDescription, level, timeSignature, concepts, answer)
VALUES 
    ('completeMeasure', '/uploads/level0/cm_qqqq.png', '2 quarter notes, ?, quarter note', 0, '4/4', 'quarter', 'quarter'),
    ('completeMeasure', '/uploads/level0/cm_3quarters.png', 'quarter note, quarter rest, ?, quarter note', 0, '4/4', 'quarter', 'quarter'),
    ('completeMeasure', '/uploads/level0/cm_hpq.png', 'half note, ?, quarter note', 0, '4/4', 'quarter, half', 'quarter'),
    ('completeMeasure', '/uploads/level0/cm_ph.png', '?, half note', 0, '4/4', 'half', 'half'),
    
    ('completeMeasure', '/uploads/level1/cm_eeph.png', 'eigth,eighth,?,half', 1, '4/4', 'half, quarter, eighth', 'quarter'),
    ('completeMeasure', '/uploads/level1/cm_eepq.png', 'eigth,eighth,?,quarter', 1, '3/4', 'quarter, eighth', 'quarter'),
    ('completeMeasure', '/uploads/level1/cm_eepqee.png', 'eigth,eighth,?,quarter,eigth,eighth', 1, '4/4', 'quarter, eighth', 'quarter'),
    ('completeMeasure', '/uploads/level1/cm_qpq.png', 'quarter,?,quarter', 1, '3/4', 'quarter', 'quarter'),
    ('completeMeasure', '/uploads/level1/cm_pq.png', '?,quarter', 1, '3/4', 'quarter,half', 'half'),

    ('noteIdentification', '', 'quarter note', 0, '4/4', 'quarter', 'quarter note'),
    ('noteIdentification', '', 'quarter rest', 0, '4/4', 'quarter', 'quarter rest'),
    ('noteIdentification', '', 'half note', 0, '4/4', 'half', 'half note'),
    ('noteIdentification', '', 'half rest', 0, '4/4', 'half', 'half rest'),
    ('noteIdentification', '', 'whole note', 0, '4/4', 'whole', 'whole note'),
    ('noteIdentification', '', 'whole rest', 0, '4/4', 'whole', 'whole rest'),

    ('typeRhythm', '/uploads/level0/tr_qqqq.png', '4 quarter notes', 0, '4/4', 'quarter', '1234'),
    ('typeRhythm', '/uploads/level0/tr_hqq.png', 'half, quarter quarter', 0, '4/4', 'quarter, half', '134'),
    ('typeRhythm', '/uploads/level0/tr_hh.png', 'half, half', 0, '4/4', 'half, half', 'half'),
    ('typeRhythm', '/uploads/level0/tr_qqq.png', '1 quarter, 1 quarter rest, 2 quarters', 0, '4/4', 'quarter', '13'),
    
    ('typeRhythm', '/uploads/level1/tr_eeeeh.png', 'eight,eighth,eighth,eighth,half', 1, '4/4', 'eighth, half', '1+2+3'),
    ('typeRhythm', '/uploads/level1/tr_eeqqee.png', 'eight,eighth,quarter,quarter,eighth,eighth', 1, '4/4', 'quarter, eighth', '1+234+'),
    ('typeRhythm', '/uploads/level1/tr_qeeq.png', 'quarter,eighth,eighth,quarter', 1, '3/4', 'quarter, eighth', '12+3'),
    ('typeRhythm', '/uploads/level1/tr_qh.png', 'quarter,half', 1, '3/4', 'quarter, half', '12'),
    ('typeRhythm', '/uploads/level1/tr_qqq.png', 'quarter, quarter, quarter', 1, '3/4', 'quarter', '123');

INSERT INTO learningPages(level, pageIndex, title)
VALUES (0, 0, 'Quarter, Half & Whole Notes + Rests'),
       (0, 1, '4/4 Time Signature'),
       (1, 0, 'Eighth Notes + Rests'),
       (1, 1, '3/4 Time Signature');