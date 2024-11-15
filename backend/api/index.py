from flask import Flask, session
import backend
from backend.api.common import getExercises

@backend.app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

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


@backend.app.route("/api/getFeedback")
def getOpenAIFeedback():
    """Get feedback from openAI - See above"""
    # TODO: LOAD OPENAI INSTANCE AND MAKE REQUEST
    data = Flask.request.get_json()
    studentAnswer = data.studentAnswer
    level = data.level,
    description = data.exerciseDescription,
    exerciseType = data.exerciseType

    #TODO: STORE DESCRIPTION OF EACH LEVEL IN DATABASE + RETRIEVE HERE
    
    return {'feedback': 'try again!'}