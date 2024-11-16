"""For common functions reused in /api/*"""
from flask import session, request
import backend
import backend.model

def getLevel():
    # get current user level - could also store in flask session when user logs in (can change after login is implemented)
    username = session.get('username', 'student0')
    connection = backend.model.get_db()
    users = connection.execute(
        "SELECT * FROM users "
        "WHERE username == ? ",
        (username,)
    )
    user = users.fetchall()
    user_level = user[0]['level']
    return user_level

def getExercises(exerciseType):
    """Extract exercises for current user w/exercise type"""
    connection = backend.model.get_db()
    user_level = getLevel()

    raw_exercises = connection.execute(
    "SELECT * FROM exercises "
    "WHERE level == ? "
    "AND exerciseType == ?",
    (user_level, exerciseType)
    )
    return raw_exercises.fetchall()

def getPages():
    connection = backend.model.get_db()
    level = getLevel()
    learningPages = connection.execute(
        "SELECT * FROM learningPages "
        "WHERE level <= {}".format(level)
    )
    return learningPages.fetchall()

@backend.app.route("/api/correctResponse", methods=["POST"])
def correctResponse():
    """Update user's 'correct' counters in DB.
       Flag when user needs to increase level.
    """
    THRESHOLD=3
    data = request.get_json()
    exerciseType = data['exerciseType']
    user = session.get('username')

    connection = backend.model.get_db()
    # update counter for user's given exercise
    query = f"""
        UPDATE users
        SET {exerciseType} = {exerciseType} + 1
        WHERE username = ?
    """
    connection.execute(query, (user,))
    # check to see if user needs to migrate to different level
    raw_user = connection.execute(
                "SELECT * FROM users "
                "WHERE username == ? ",
                (user,)
            )
    user = raw_user.fetchone()
    if user['completeMeasure'] >= THRESHOLD and user['level'] < 3:
        # update user's level and counters
        connection.execute(
            "UPDATE users "
            "SET level = level + 1, "
            "noteAddition = 0, "
            "completeMeasure = 0, "
            "noteIdentification = 0, "
            "typeRhythm = 0 "
            "WHERE username == ?",
        (user,))
        return {'increaseLevel': True,
                'nextLevel': user['level']+1}

    # handle logic for when user gives correct response
    return {'inreaseLevel':False}