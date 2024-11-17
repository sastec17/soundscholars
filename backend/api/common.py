"""For common functions reused in /api/*"""
from flask import request
import backend
import backend.model

THRESHOLD=4

@backend.app.route("/api/getExerciseTypes", methods=['POST'])
def getExerciseTypes():
    """Extract which exercise types the user still needs to complete"""
    connection = backend.model.get_db()
    data = request.get_json()
    username = data['username']
    users = connection.execute(
        "SELECT * FROM users "
        "WHERE username == ? ",
        (username,)
    )
    user = users.fetchone()
    if not user:
        raise ValueError(f"No user found with username: {username}")
    
    types = ['completeMeasure', 'noteAddition', 'noteIdentification', 'typeRhythm']
    exercises = []
    for type in types:
        if user[type] < THRESHOLD: # TODO: check if threshold is higher than # of exercises
            exercises.append(type)
    
    return exercises
        

def getExercises(exerciseType, username):
    """Extract exercises for current user w/exercise type"""
    connection = backend.model.get_db()
    
    users = connection.execute(
        "SELECT * FROM users "
        "WHERE username == ? ",
        (username,)
    )
    user = users.fetchone()
    if not user:
        raise ValueError(f"No user found with username: {username}")
    
    level = user['level']

    if exerciseType not in user.keys():
        raise ValueError(f"Invalid exerciseType: {exerciseType}")
    
    raw_exercises = connection.execute(
        "SELECT * FROM exercises "
        "WHERE level == ? " 
        "AND exerciseType == ? ",
        (level, exerciseType,)
    )
    exercises = raw_exercises.fetchall()
    # dynamically return one exercise
    if not exercises:
        raise ValueError(f"No exercises found for level {level} and type {exerciseType}")

    exercise_index = user[exerciseType] % len(exercises)
    return exercises[exercise_index]

@backend.app.route("/api/getLearningPages", methods=['POST'])
def getLearningPages():
    connection = backend.model.get_db()
    data = request.get_json()
    username = data['username']
    
    users = connection.execute(
        "SELECT * FROM users "
        "WHERE username == ? ",
        (username,)
    )
    user = users.fetchall()
    level = user[0]['level']

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
    # check to see if user needs to migrate to different level
    raw_user = connection.execute(
        "SELECT * FROM users "
        "WHERE username == ? ",
        (username,)
    )
    user = raw_user.fetchall()
    user = user[0]
    # TODO: update so they must meet threshold for all exercise types
    if user['completeMeasure'] >= THRESHOLD and user['level'] < 2:
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
    raw_exercises = connection.execute(
        "SELECT * FROM exercises "
        "WHERE level == ? " 
        "AND exerciseType == ? ",
        (user['level'], exerciseType,)
    )
    exercises = raw_exercises.fetchall()
    exercise_index = user[exerciseType] % len(exercises)
    return {'inreaseLevel':False,
            'nextExercise': exercises[exercise_index]
            }