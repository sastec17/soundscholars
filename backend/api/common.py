"""For common functions reused in /api/*"""
from flask import request
import backend
import backend.model

THRESHOLD=4
EXERCISE_TYPES = ['completeMeasure','noteAddition', 'noteIdentification', 'typeRhythm']

def getUserFromDB(username):
    connection = backend.model.get_db()
    raw_users = connection.execute(
        "SELECT * FROM users "
        "WHERE username == ? ",
        (username,)
    )
    user = raw_users.fetchone()
    if not user:
        raise ValueError(f"No user found with username: {username}")
    return user

def getExercisesFromDB(exerciseType, level):
    connection = backend.model.get_db()
    raw_exercises = connection.execute(
        "SELECT * FROM exercises "
        "WHERE level == ? " 
        "AND exerciseType == ? ",
        (level, exerciseType,)
    )
    exercises = raw_exercises.fetchall()
    if not exercises:
        raise ValueError(f"No exercises found for level {level} and type {exerciseType}")
    return exercises

@backend.app.route("/api/getExerciseTypes", methods=['POST'])
def getExerciseTypes():
    """Extract which exercise types the user still needs to complete"""
    data = request.get_json()
    username = data['username']

    user = getUserFromDB(username)
    level = user['level']
    
    exercises = []
    for type in EXERCISE_TYPES:
        numExercisesInLevel = len(getExercisesFromDB(type, level))
        if user[type] < min(numExercisesInLevel, THRESHOLD):
            exercises.append(type)
    
    return exercises
        

def getExercises(exerciseType, username):
    """Extract exercises for current user w/exercise type"""
    
    user = getUserFromDB(username)
    
    level = user['level']

    if exerciseType not in user.keys():
        raise ValueError(f"Invalid exerciseType: {exerciseType}")
    
    exercises = getExercisesFromDB(exerciseType, level)    

    exercise_index = user[exerciseType]
    if exercise_index >= len(exercises):
        return {}
    # todo: will this return a proportion?
    exercise_progress = min(exercise_index, THRESHOLD)
    exercise_threshold = min(len(exercises), THRESHOLD)
    return {'exercise': exercises[exercise_index],
            'exerciseProgress': exercise_progress,
            'threshold': exercise_threshold}

@backend.app.route("/api/getLearningPages", methods=['POST'])
def getLearningPages():
    connection = backend.model.get_db()
    data = request.get_json()
    username = data['username']
    
    user = getUserFromDB(username)
    level = user['level']

    learningPages = connection.execute(
        f"""SELECT * FROM learningPages 
        WHERE level <= {level}"""
    )
    return learningPages.fetchall()

@backend.app.route("/api/correctResponse", methods=["POST"])
def correctResponse():
    """Update user's 'correct' counters in DB.
       Flag when user needs to increase level.
    """
    data = request.get_json()
    exerciseType = data['exerciseType']
    username = data['username']

    connection = backend.model.get_db()
    # update counter for user's given exercise
    query = f"""
        UPDATE users
        SET {exerciseType} = {exerciseType} + 1
        WHERE username = ?
    """
    connection.execute(query, (username,))
    connection.commit()
    
    user = getUserFromDB(username)
    level = user['level']

    update_level = True  
    for type in EXERCISE_TYPES:
        numExercisesInLevel = len(getExercisesFromDB(type, level))
        if user[type] < min(numExercisesInLevel, THRESHOLD):
            update_level = False
            
    if level == 2 and update_level:
        return {'increaseLevel': True,
                'nextLevel': -1}
    
    if update_level:
        # update user's level and counters
        connection.execute(
            "UPDATE users "
            "SET level = level + 1, "
            "noteAddition = 0, "
            "completeMeasure = 0, "
            "noteIdentification = 0, "
            "typeRhythm = 0 "
            "WHERE username == ?",
        (username,))
        return {'increaseLevel': True,
                'nextLevel': user['level']+1}

    # handle logic for when user gives correct response
    exercises = getExercisesFromDB(exerciseType, level)
    exercise_index = user[exerciseType]
    exercise_progress = min(exercise_index, THRESHOLD)
    next_exercise = exercises[exercise_index] if exercise_index < len(exercises) else {}
    return {'inreaseLevel': False,
            'nextExercise': next_exercise,
            'exerciseProgress': exercise_progress
            }