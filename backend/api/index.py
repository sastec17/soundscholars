from flask import Flask, session, request
import backend
from backend.api.common import getExercises
from openai import OpenAI

@backend.app.route("/api/completeTheMeasure", methods=['POST'])
def completeTheMeasure():
    # TODO: REVISIT LOGIC FOR getExercises
    data = request.get_json()
    username = data['username']
    return getExercises('completeMeasure', username)

@backend.app.route("/api/noteAddition", methods=['POST'])
def noteAddition():
    data = request.get_json()
    username = data['username']
    return getExercises('noteAddition', username)

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
    data = request.get_json()
    selectedAnswer = data['selectedAnswer']
    correctAnswer = data['correctAnswer']
    answerOptions = data['answerOptions']
    level = data['level'],
    exerciseType = data['exerciseType']
    
    # TODO use exercise level in prompt, what they've learned?

    exerciseDescription = ""
    if exerciseType == 'noteAddition':
        exerciseDescription = "This exercise gives a student two notes and asks them to identify the singular note that occupies the same number of beats."
    elif exerciseType == 'noteIdentification':
        exerciseDescription = "This exercise displays a note or rest symbol and asks the student to identify its name or how many beats it occupies."
    elif exerciseType == 'completeMeasure':
        exerciseDescription = "This exercise displays a singular, mostly complete measure and asks the student to identify what note would fill it."
    else:
        exerciseDescription = "This exercise displays a singular measure and asks the student to type out the rhythm."
    
    correctActualAnswers = ""
    if exerciseType == 'noteAddition' or exerciseType == 'completeMeasure':
        correctActualAnswers = f"The correct answer is ### {correctAnswer} and the answer options are {answerOptions}, but the student selected ### {selectedAnswer}."
    else:
        correctActualAnswers = f"The correct answer is ### {correctAnswer}, but the student answered ### {selectedAnswer}. "
    
    client = OpenAI(api_key=backend.app.config['OPENAI_API_KEY'])

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a kind music teacher, helping the student learn musical rhythms."},
            {
                "role": "user",
                "content": f"{exerciseDescription}\n {correctActualAnswers}\n Provide a brief, encouraging hint without giving away the answer."
            }
        ]
    )
    
    message = completion.choices[0].message.content
    return {'feedback': message}