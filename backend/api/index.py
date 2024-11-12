from flask import Flask
import backend

@backend.app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@backend.app.route("/api/completeTheMeasure")
def completeTheMeasure():
    # TODO - SET UP SQLITE DATABASE + PULL IMAGE WE HAVEN'T SEEN BEFORE
    # STORE ARRAY OF IMAGES SEEN BEFORE IN REQUEST.SESSION? AVOID REPEATS IF POSSIBLE?
    # TODO: RETURN DESCRIPTION/ correct answer OF EXERCISE (in DB)- Use for future API call 

    # IF user gets answer correct, move onto next exercise + call this function again
    # ELSE - If user gets wrong - Sep API call that feeds this info into OpenAI + requests hint
    # Get the current user as proof of concept
    connection = backend.model.get_db()
    users = connection.execute(
        "SELECT * FROM users "
        "WHERE username == ?",
        ('student1',)
    )
    user = users.fetchall()
    print(user)
    
    return {"imgUrl":  "/uploads/level0/level0_fourquarters.png",
            "user": user}

@backend.app.route("/api/noteAddition")
def noteAddition():
    return {"imgUrl":  "/app/images/half_note.png"}


@backend.app.route("/api/getOpenAIFeedback")
def getOpenAIFeedback():
    """Get feedback from openAI - See above"""
    return ""