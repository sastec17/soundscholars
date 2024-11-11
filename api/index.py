from flask import Flask
app = Flask(__name__)

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/completeTheMeasure")
def completeTheMeasure():
    # TODO - SET UP SQLITE DATABASE + PULL IMAGE WE HAVEN'T SEEN BEFORE
    # STORE ARRAY OF IMAGES SEEN BEFORE IN REQUEST.SESSION? AVOID REPEATS IF POSSIBLE?
    # TODO: RETURN DESCRIPTION/ correct answer OF EXERCISE (in DB)- Use for future API call 

    # IF user gets answer correct, move onto next exercise + call this function again
    # ELSE - If user gets wrong - Sep API call that feeds this info into OpenAI + requests hint
    return {"imgUrl":  "/app/images/half_note.png"}

@app.route("/api/noteAddition")
def noteAddition():
    return {"imgUrl":  "/app/images/half_note.png"}

@app.route("/api/getOpenAIFeedback")
def getOpenAIFeedback():
    """Get feedback from openAI - See above"""
    return ""