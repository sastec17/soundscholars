from flask import Flask, session, request
import backend
from backend.api.common import getExercises

@backend.app.route("/api/completeTheMeasure", methods=['POST'])
def completeTheMeasure():
    # TODO: REVISIT LOGIC FOR getExercises
    data = request.get_json()
    username = data['username']
    return getExercises('completeMeasure', username)

@backend.app.route("/api/noteAddition")
def noteAddition():
    exercise = {"exercisePath":"/uploads/level0/level0_fourquarters.png"}
    return exercise

@backend.app.route("/api/noteIdentification", methods=['POST'])
def noteIdentification():
    data = request.get_json()
    username = data['username']
    return getExercises('noteIdentification', username)

@backend.app.route("/api/typeThatRhythm", methods=['POST'])
def typeThatRhythm():
    data = request.get_json()
    username = data['username']
    # TODO: CHANGE TO COMPLETE TYPERHYTHM WHEN ADDED TO DB
    return getExercises('typeRhythm', username)

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