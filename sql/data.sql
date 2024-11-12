PRAGMA foreign_keys = ON;

INSERT INTO users(username, password, level)
VALUES ('student0', 'student0', 0),
       ('student1', 'student1', 1),
       ('student2', 'student2', 2);

INSERT INTO exercises(exerciseType, exercisePath, textDescription, level, timeSignature, concepts)
VALUES ('completeMeasure', '/uploads/level0/level0_fourquarters.png', 'four quarter notes', 0, '4/4', 'quarter')