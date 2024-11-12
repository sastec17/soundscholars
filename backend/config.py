"""SoundScholars development configuration."""

import pathlib

SOUNDSCHOLARS_ROOT=pathlib.Path(__file__).resolve().parent.parent
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

# Data located here
UPLOAD_FOLDER = SOUNDSCHOLARS_ROOT/'var'/'uploads'
DATABASE_FILENAME=SOUNDSCHOLARS_ROOT/'var'/'soundScholars.sqlite3'
