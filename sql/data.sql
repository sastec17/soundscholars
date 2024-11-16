PRAGMA foreign_keys = ON;

INSERT INTO users(username, password, level)
VALUES ('student0', 'student0', 0),
       ('student1', 'student1', 1),
       ('student2', 'student2', 2);

INSERT INTO exercises(exerciseType, exercisePath, textDescription, level, timeSignature, concepts, answer)
VALUES ('completeMeasure', '/uploads/level0/cm_4quarters.png', '2 quarter notes, ?, quarter', 0, '4/4', 'quarter', 'quarter'),
        ('noteIdentification', '', 'quarter note', 0, '4/4', 'quarter', 'quarter note'),
        ('noteIdentification', '', 'quarter rest', 0, '4/4', 'quarter', 'quarter rest'),
        ('noteIdentification', '', 'half note', 0, '4/4', 'half', 'half note'),
        ('noteIdentification', '', 'half rest', 0, '4/4', 'half', 'half rest'),
        ('noteIdentification', '', 'whole note', 0, '4/4', 'whole', 'whole note'),
        ('noteIdentification', '', 'whole rest', 0, '4/4', 'whole', 'whole rest'),
        ('typeRhythm', '/uploads/level0/tr_4quarters.png', '4 quarter notes', 0, '4/4', 'quarter', 'quarter');

INSERT INTO learningPages(level, pageIndex, title)
VALUES (0, 0, 'Quarter, Half & Whole Notes + Rests'),
       (0, 1, '4/4 Time Signature');