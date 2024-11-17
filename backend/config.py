"""SoundScholars development configuration."""

import pathlib

SOUNDSCHOLARS_ROOT=pathlib.Path(__file__).resolve().parent.parent
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

# Data located here
UPLOAD_FOLDER = SOUNDSCHOLARS_ROOT/'var'/'uploads'
DATABASE_FILENAME=SOUNDSCHOLARS_ROOT/'var'/'soundScholars.sqlite3'
OPENAI_API_KEY="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"

