PRAGMA foreign_keys = ON;

INSERT INTO users(username, password, level)
VALUES ('student0', 'student0', 0),
       ('student1', 'student1', 1),
       ('student2', 'student2', 2);

INSERT INTO exercises(exerciseType, exercisePath, textDescription, level, timeSignature, concepts, answer)
VALUES ('completeMeasure', '/uploads/level0/cm_4quarters.png', '2 quarter notes, ?, quarter', 0, '4/4', 'quarter', 'quarter'),
        ('typeRhythm', '/uploads/level0/tr_4quarters.png', '4 quarter notes', 0, '4/4', 'quarter', 'quarter');