"""For common functions reused in /api/*"""
from flask import Flask, session
import backend

def getExercises(exerciseType):
    """Extract exercises for current user w/exercise type"""
    username = session.get('username', 'student0')
   # get current user level - could also store in flask session when user logs in (can change after login is implemented)
    connection = backend.model.get_db()
    users = connection.execute(
        "SELECT * FROM users "
        "WHERE username == ? ",
        (username,)
    )
    user = users.fetchall()
    user_level = user[0]['level']

    raw_exercises = connection.execute(
    "SELECT * FROM exercises "
    "WHERE level == ? "
    "AND exerciseType == ?",
    (user_level, exerciseType)
    )
    return raw_exercises.fetchall()
