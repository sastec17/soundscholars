from flask import Flask, session, request
import backend
from backend.api.common import getExercises

@backend.app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@backend.app.route("/api/login",  methods=['POST'])
def login():
    # TODO: add log in logic - check credentials against BE
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
        return {"loggedIn": True,
                "username": user[0]['username'],
                'level': user[0]['level']}
    
    return {"loggedIn": False}

@backend.app.route("/api/completeTheMeasure")
def completeTheMeasure():
    # IF user gets answer correct, move onto next exercise + call this function again
    # ELSE - If user gets wrong - Sep API call that feeds this info into OpenAI + requests hint
    # TODO: REVISIT LOGIC FOR getExercises
    exercises = getExercises('completeMeasure')
    return exercises[0]

@backend.app.route("/api/noteAddition")
def noteAddition():
    exercise = {"exercisePath":"/uploads/level0/level0_fourquarters.png"}
    return exercise


@backend.app.route("/api/typeThatRhythm")
def typeThatRhythm():
    # TODO: CHANGE TO COMPLETE TYPERHYTHM WHEN ADDED TO DB
    exercises = getExercises('typeRhythm')
    return exercises[0]

@backend.app.route("/api/getFeedback")
def getOpenAIFeedback():
    """Get feedback from openAI - See above"""
    # TODO: LOAD OPENAI INSTANCE AND MAKE REQUEST - initialize like it is a teacher
    data = request.get_json()
    studentAnswer = data.studentAnswer
    level = data.level,
    description = data.exerciseDescription,
    exerciseType = data.exerciseType

    #TODO: STORE DESCRIPTION OF EACH LEVEL IN DATABASE + RETRIEVE HERE
    """EXAMPLE PROMPT FORMAT TEMPLATE:
    Insert description of exercise type
    Insert description of actual exercise and student response

    The student currently only knows <Level specific info that comes from DB>

    Please provide a brief hint on how to solve this
    
    """


    return {'feedback': 'try again!'}