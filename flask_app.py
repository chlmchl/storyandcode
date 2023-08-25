from flask import Flask, render_template, request, jsonify, session, send_file
# from flask_cors import CORS
from pydub import AudioSegment
from elevenlabs import voices, generate, stream, set_api_key, save
import openai
import os
import random
import csv

set_api_key("d33a219d3324143b9d803a9e4bec5480")
openai.api_key = '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'

app = Flask(__name__)
# CORS(app)

# Set a secret key for the Flask application
app.secret_key = os.urandom(24)

string_intro = 'Welcome to the Ayn-Tycho corporation baseline test for interplanetary missions. There are no wrong answers. Please respond naturally with simple word associations to what you hear and see to achieve your baseline. To initiate say "start"'
string_list_b1 = ['You see a stream.', '', 'Is the stream warm or cold?', 'You see a road.', 'Is the road straight or curved?', 'A candle is made of brass or wax?']
string_list_b2 = ['I am the wind... I am the shadow.', 'This is not my chair.', 'You see a tree', 'Carpentry', 'Elephant.', 'Tidal.', 'There are no more berries.']
string_index = 0
intro = True
b1 = False
b2 = False
b3 = False
video_files_b1 = []
video_files_b2 = []
video_files_b3 = []
video_files_x = []
started = False
csv_array = []
csv_array_audio = []
audioUrl = ''
name = ''
userName = ''

directory = os.getcwd()

# Function to get a list of all video filenames in the "batch_1" folder

def read_csv_to_array(csv_file, csv_array):
    with open(csv_file, newline='') as csvfile:
        reader = csv.reader(csvfile)
        header = next(reader)  # Skip the header row
        for row in reader:
            # Filter out empty values and remove any extra spaces
            row_values = [value.strip() for value in row if value.strip()]
            csv_array.append(row_values)

    return csv_array

# Check if the 'current_video_index' session variable exists, and initialize it to 0 if not
# @app.before_request
# def init_session_vars():
#     if 'current_video_index' not in session:
#         session['current_video_index'] = 0

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/participate', methods=['POST', 'GET'])
def participate():
   
    text_input = request.form['name']
    global name, userName
    userName = text_input

    return render_template('participate.html')


@app.route('/register', methods=['POST', 'GET'])
def register():
    return render_template('register.html')


@app.route ('/intro', methods=['POST', 'GET'])
def intro():
    global string_index, b1, intro, csv_array, csv_array_audio, audioUrl, userName

    csv_file_path = directory + '/storyandcode/static/vids_lst.csv'
    csv_array = read_csv_to_array(csv_file_path, csv_array)

    csv_file_path = directory + '/storyandcode/static/audio_lst.csv'
    csv_array_audio = read_csv_to_array(csv_file_path, csv_array_audio)

    print("CSV array with nested arrays:", csv_array_audio)
    response_text = ''
    if intro:
        response_text = string_intro
        audioUrl = 'intro.mp3'
        # audio_stream = generate(
        #             text=response_text,
        #             voice="yoZ06aMxZJJ28mfd3POQ",
        #             stream=True
        #         )
        # stream(audio_stream)

        intro = False
    # stream(audio_stream)
    # audio_segment = AudioSegment.from_file(audio_stream)
    # voice_dir = "/storyandcode/static/" 
    # audio_segment.export(voice_dir, format="mp3")

    return jsonify({'userName': userName, 'response_text': response_text,'audioUrl': audioUrl, 'intro': intro, 'b1': b1, 'csv_array': csv_array, 'csv_array_audio' :csv_array_audio, 'is_final': False})


@app.route('/generate', methods=['POST', 'GET'])
def generate_audio():
    congrats = "Congratulations, " + userName + ". You have been accepted into the House of Saturn elite training program."
    
    audio_stream = generate(
        text=congrats,
        voice="yoZ06aMxZJJ28mfd3POQ",
        #stream=True
    )
    save(audio_stream, directory + '/storyandcode/static/audio/congrats.mp3')

    verygood = "Very good, " + userName 
    
    audio_stream = generate(
        text=verygood,
        voice="yoZ06aMxZJJ28mfd3POQ",
        #stream=True
    )
    save(audio_stream, directory + '/storyandcode/static/audio/verygood.mp3')

    show = "If I show you this... How does that make you feel," + userName +"?"
    
    audio_stream = generate(
        text=show,
        voice="yoZ06aMxZJJ28mfd3POQ",
        #stream=True
    )
    save(audio_stream, directory + '/storyandcode/static/audio/17_show.mp3')
    return jsonify({'show': show, 'is_final': True})

if __name__ == '__main__':
    app.run()

