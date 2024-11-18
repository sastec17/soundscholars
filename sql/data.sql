PRAGMA foreign_keys = ON;

INSERT INTO users(username, password, level, completeMeasure, noteAddition, noteIdentification, typeRhythm)
VALUES ('student0', 'student0', 0, 0, 0, 0, 0),
       ('student1', 'student1', 1, 0, 1, 0, 0),
       ('student2', 'student2', 2, 0, 0, 0, 0);

INSERT INTO exercises(exerciseType, exercisePath, textDescription, level, timeSignature, concepts, answer)
VALUES 
    ('completeMeasure', '/uploads/level0/cm_qqqq.png', '2 quarter notes, ?, quarter note', 0, '4/4', 'quarter', 'quarter'),
    ('completeMeasure', '/uploads/level0/cm_3quarters.png', 'quarter note, quarter rest, ?, quarter note', 0, '4/4', 'quarter', 'quarter'),
    ('completeMeasure', '/uploads/level0/cm_hpq.png', 'half note, ?, quarter note', 0, '4/4', 'quarter, half', 'quarter'),
    ('completeMeasure', '/uploads/level0/cm_ph.png', '?, half note', 0, '4/4', 'half', 'half'),
    
    ('completeMeasure', '/uploads/level1/cm_eeph.png', 'eighth,eighth,?,half', 1, '4/4', 'half, quarter, eighth', 'quarter'),
    ('completeMeasure', '/uploads/level1/cm_eepq.png', 'eighth,eighth,?,quarter', 1, '3/4', 'quarter, eighth', 'quarter'),
    ('completeMeasure', '/uploads/level1/cm_eepqee.png', 'eighth,eighth,?,quarter,eighth,eighth', 1, '4/4', 'quarter, eighth', 'quarter'),
    ('completeMeasure', '/uploads/level1/cm_qpq.png', 'quarter,?,quarter', 1, '3/4', 'quarter', 'quarter'),
    ('completeMeasure', '/uploads/level1/cm_pq.png', '?,quarter', 1, '3/4', 'quarter,half', 'half'),

    ('completeMeasure', '/uploads/level2/cm_dqep.png', 'dotted quarter, eighth, ?', 2, '4/4', 'dotted quarter,half', 'half'),
    ('completeMeasure', '/uploads/level2/cm_eepqee.png', 'eighth,eighth, ? tied to quarter, eighth, eighth', 2, '4/4', 'eighth, quarter, tied notes', 'quarter'),
    ('completeMeasure', '/uploads/level2/cm_pdh.png', '?, dotted half', 2, '4/4', 'quarter, dotted half', 'quarter'),
    ('completeMeasure', '/uploads/level2/cm_pqq.png', '?, quarter tied to quarter', 2, '3/4', 'quarter, tied notes', 'quarter'),
    ('completeMeasure', '/uploads/level2/cm_qeepe.png', 'quarter, eighth, eighth, ?, eighth', 2, '3/4', 'quarter, eighth', 'eighth'),
    ('completeMeasure', '/uploads/level2/cm_qph.png', 'quarter tied to ?, half', 2, '4/4', 'quarter, half', 'quarter'),

    ('noteAddition', '/uploads/level0/two_half.png', '2 half notes', 0, '', 'half, whole', 'whole'),
    ('noteAddition', '/uploads/level0/two_quarter.png', '2 quarter notes', 0, '', 'quarter, half', 'half'),

    ('noteAddition', '/uploads/level1/two_eighth.png', '2 eighth notes', 1, '', 'quarter, eighth', 'quarter'),
    -- ('noteAddition', '/uploads/level1/two_sixteenth.png', '2 sixteenth notes', 1, '', 'sixteenth, eighth', 'eighth'),

    ('noteAddition', '/uploads/level2/add_dh_q.png', 'dotted half, quarter', 2, '4/4', 'dotted, half, quarter, whole', 'whole'),
    ('noteAddition', '/uploads/level2/add_dq_dq.png', 'dotted quarter, dotted quarter', 2, '4/4', 'dotted, quarter, half', 'dotted half'),
    ('noteAddition', '/uploads/level2/add_q_e.png', 'quarter, eighth', 2, '4/4', 'dotted, quarter, eighth', 'dotted quarter'),
    ('noteAddition', '/uploads/level2/add_q_h.png', 'quarter, half', 2, '4/4', 'dotted, quarter, half', 'dotted half'),
    ('noteAddition', '/uploads/level2/add_dq_e.png', 'dotted quarter, eighth', 2, '4/4', 'dotted, quarter, eighth', 'half'),

    ('noteIdentification', '', 'quarter note', 0, '4/4', 'quarter', '1'),
    ('noteIdentification', '', 'quarter rest', 0, '4/4', 'quarter', '1'),
    ('noteIdentification', '', 'half note', 0, '4/4', 'half', '2'),
    ('noteIdentification', '', 'half rest', 0, '4/4', 'half', '2'),
    ('noteIdentification', '', 'whole note', 0, '4/4', 'whole', '4'),
    ('noteIdentification', '', 'whole rest', 0, '4/4', 'whole', '4'),

    ('noteIdentification', '', 'eighth note', 1, '4/4', 'eighth', '0.5'),
    ('noteIdentification', '', 'eighth rest', 1, '4/4', 'eighth', '0.5'),
    -- ('noteIdentification', '', 'sixteenth note', 1, '4/4', 'eighth', '0.25'),
    -- ('noteIdentification', '', 'sixteenth rest', 1, '4/4', 'eighth', '0.25'),

    ('noteIdentification', '', 'quarter note', 1, '3/4', 'quarter', '1'),
    ('noteIdentification', '', 'quarter rest', 1, '3/4', 'quarter', '1'),
    ('noteIdentification', '', 'half note', 1, '3/4', 'half', '1.5'),
    ('noteIdentification', '', 'half rest', 1, '3/4', 'half', '1.5'),
    ('noteIdentification', '', 'whole note', 1, '3/4', 'whole', '3'),
    ('noteIdentification', '', 'whole rest', 1, '3/4', 'whole', '3'),
    ('noteIdentification', '', 'eighth note', 1, '3/4', 'eighth', '0.5'),
    ('noteIdentification', '', 'eighth rest', 1, '3/4', 'eighth', '0.5'),
    -- ('noteIdentification', '', 'sixteenth note', 1, '3/4', 'eighth', '0.25'),
    -- ('noteIdentification', '', 'sixteenth rest', 1, '3/4', 'eighth', '0.25'),

    ('noteIdentification', '', 'dotted half note', 2, '4/4', 'dotted, half', '3'),
    ('noteIdentification', '', 'dotted quarter note', 2, '4/4', 'dotted, quarter', '1.5'),

    ('noteIdentification', '/uploads/level2/id_q_q.png', 'tied quarter quarter', 2, '4/4', 'tied, quarter', '2'),
    ('noteIdentification', '/uploads/level2/id_q_dh.png', 'tied quarter dotted half', 2, '4/4', 'tied, dotted, quarter, half', '4'),
    ('noteIdentification', '/uploads/level2/id_q_h.png', 'tied quarter half', 2, '4/4', 'tied, quarter, half', '3'),
    ('noteIdentification', '/uploads/level2/id_e_q.png', 'tied eighth quarter', 2, '4/4', 'tied, eighth, quarter', '1.5'),
    ('noteIdentification', '/uploads/level2/id_h_h.png', 'tied half half', 2, '4/4', 'tied, half', '4'),
    ('noteIdentification', '/uploads/level2/id_e_h.png', 'tied eighth half', 2, '4/4', 'tied, eighth, half', '2.5'),
    ('noteIdentification', '/uploads/level2/id_e_e.png', 'tied eighth eighth', 2, '4/4', 'tied, eighth', '1'),

    ('typeRhythm', '/uploads/level0/tr_qqqq.png', '4 quarter notes', 0, '4/4', 'quarter', '1234'),
    ('typeRhythm', '/uploads/level0/tr_hqq.png', 'half, quarter quarter', 0, '4/4', 'quarter, half', '134'),
    ('typeRhythm', '/uploads/level0/tr_hh.png', 'half, half', 0, '4/4', 'half, half', '13'),
    ('typeRhythm', '/uploads/level0/tr_qqq.png', '1 quarter, 1 quarter rest, 2 quarters', 0, '4/4', 'quarter', '134'),
    
    ('typeRhythm', '/uploads/level1/tr_eeeeh.png', 'eight,eighth,eighth,eighth,half', 1, '4/4', 'eighth, half', '1+2+3'),
    ('typeRhythm', '/uploads/level1/tr_eeqqee.png', 'eight,eighth,quarter,quarter,eighth,eighth', 1, '4/4', 'quarter, eighth', '1+234+'),
    ('typeRhythm', '/uploads/level1/tr_qeeq.png', 'quarter,eighth,eighth,quarter', 1, '3/4', 'quarter, eighth', '12+3'),
    ('typeRhythm', '/uploads/level1/tr_qh.png', 'quarter,half', 1, '3/4', 'quarter, half', '12'),
    ('typeRhythm', '/uploads/level1/tr_qqq.png', 'quarter, quarter, quarter', 1, '3/4', 'quarter', '123'),

    ('typeRhythm', '/uploads/level2/tr_dqeh.png', 'quarter, quarter, quarter', 2, '4/4', 'dotted quarter, eighth, half', '1+3'),
    ('typeRhythm', '/uploads/level2/tr_eeqqee.png', 'eighth, eighth, quarter tied to quarter, eighth, eighth', 2, '4/4', 'quarter, eighth', '1+24+'),
    ('typeRhythm', '/uploads/level2/tr_qdh.png', 'quarter tied to dotted half', 2, '4/4', 'quarter, dotted half', '12'),
    ('typeRhythm', '/uploads/level2/tr_qeeq.png', 'quarter, eighth, eighth, quarter', 2, '3/4', 'quarter, eighth', '12+3'),    
    ('typeRhythm', '/uploads/level2/tr_qqh.png', 'quarter tied to quarter, half', 2, '4/4', 'quarter, half, tied notes', '13'),    
    ('typeRhythm', '/uploads/level2/tr_qqq.png', 'quarter, quarter tied to quarter', 2, '3/4', 'quarter, tied notes', '12');

INSERT INTO learningPages(level, pageIndex, title)
VALUES (0, 0, 'Quarter, Half & Whole Notes + Rests'),
       (0, 1, '4/4 Time Signature'),
       (1, 0, 'Eighth Notes + Rests'),
       (1, 1, '3/4 Time Signature'),
       (2, 0, 'Dotted Notes and Rests'),
       (2, 1, 'Tied Notes');