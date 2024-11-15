from flask import Flask, session
import backend
from backend.api.common import getExercises

@backend.app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@backend.app.route("/api/login")
def login():
    return {"loggedIn": True}

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
    data = Flask.request.get_json()
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