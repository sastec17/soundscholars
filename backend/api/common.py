"""For common functions reused in /api/*"""
from flask import Flask, session
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
