"""Login and sign up authentication functions."""
from flask import Flask, session, request
import backend

@backend.app.route("/api/login",  methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    connection = backend.model.get_db()
    users = connection.execute(
        "SELECT * FROM users "
        "WHERE username == ? "
        "AND password == ?",
        (username, password)
    )
    user = users.fetchall()
    if len(user) != 0:
        session['username'] = username
        return {"loggedIn": True,
                "username": user[0]['username'],
                'level': user[0]['level']}
    
    return {"loggedIn": False}

@backend.app.route("/api/signup",  methods=['POST'])
def signup():
    data = request.get_json()
    username = data['username']
    password = data['password']
    connection = backend.model.get_db()

    # verify user doesn't already exist 
    users = connection.execute(
        "SELECT * FROM users "
        "WHERE username == ? ",
        (username, )
    )
    user = users.fetchall()
    if len(user) == 0:
        # insert user into DB
        connection.execute(
            "INSERT into users(username, password, level, completeMeasure, noteAddition, noteIdentification, typeRhythm) "
            "VALUES (?, ?, 0, 0, 0, 0, 0)",
            (username, password)
        )
        session['username'] = username
        return {"loggedIn": True,
                "username": username,
                'level': 0}
    # TODO: try/catch statement needed here in case insertion fails?
    return {"loggedIn": False}