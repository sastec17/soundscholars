from flask import Flask, session, request
import backend
from backend.api.common import getExercises

@backend.app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@backend.app.route("/api/completeTheMeasure", methods=['POST'])
def completeTheMeasure():
    # IF user gets answer correct, move onto next exercise + call this function again
    # ELSE - If user gets wrong - Sep API call that feeds this info into OpenAI + requests hint
    # TODO: REVISIT LOGIC FOR getExercises
    data = request.get_json()
    username = data['username']
    exercises = getExercises('completeMeasure', username)
    return exercises[0]

@backend.app.route("/api/noteAddition")
def noteAddition():
    exercise = {"exercisePath":"/uploads/level0/level0_fourquarters.png"}
    return exercise

@backend.app.route("/api/noteIdentification", methods=['POST'])
def noteIdentification():
    data = request.get_json()
    username = data['username']
    exercises = getExercises('noteIdentification', username)
    # TODO: make exercise selection random
    return exercises[0]

@backend.app.route("/api/typeThatRhythm", methods=['POST'])
def typeThatRhythm():
    data = request.get_json()
    username = data['username']
    # TODO: CHANGE TO COMPLETE TYPERHYTHM WHEN ADDED TO DB
    exercises = getExercises('typeRhythm', username)
    return exercises[0]

@backend.app.route("/api/getFeedback", methods=['POST'])
def getOpenAIFeedback():
    """Get feedback from openAI - See above"""
    # TODO: LOAD OPENAI INSTANCE AND MAKE REQUEST - initialize like it is a teacher
    data = request.get_json()
    studentAnswer = data['studentAnswer']
    level = data['level'],
    description = data['description'],
    exerciseType = data['exerciseType']

    #TODO: STORE DESCRIPTION OF EACH LEVEL IN DATABASE + RETRIEVE HERE
    """EXAMPLE PROMPT FORMAT TEMPLATE:
    Insert description of exercise type
    Insert description of actual exercise and student response

    The student currently only knows <Level specific info that comes from DB>

    Please provide a brief hint on how to solve this
    
    """


    return {'feedback': 'try again!'}