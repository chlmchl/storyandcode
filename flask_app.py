from flask import Flask, render_template, request, jsonify, session, send_file
# from flask_cors import CORS
from elevenlabs import voices, generate, stream, set_api_key
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

string_intro = 'Welcome to the Ayn-Tycho corporation baseline test for off-world training. Please respond naturally with simple associations to what you hear and see to achieve your baseline and move to the next phase of training. To initiate say "start"'
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
    return render_template('participate.html')


@app.route ('/intro', methods=['POST', 'GET'])
def intro():
    global string_index, b1, intro, video_files_b1, video_files_b2, video_files_b3, video_files_x, csv_array, csv_array_audio

    csv_file_path = directory + '/static/vids_lst.csv'
    csv_array = read_csv_to_array(csv_file_path, csv_array)

    csv_file_path = directory + '/static/audio_lst.csv'
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
       
    return jsonify({'response_text': response_text,'audioUrl': audioUrl, 'intro': intro, 'b1': b1, 'csv_array': csv_array, 'csv_array_audio' :csv_array_audio, 'is_final': False})


# @app.route('/generate', methods=['POST', 'GET'])
# def generate_audio():
#     text_input = request.form['text-input']
#     global string_index, b1, b2, b3, intro, started
#     response_txt = ""

#     if b1:
#         if(text_input == 'start'):
#             response_text = string_list_b1[string_index]
#             # audio_stream = generate(
#             #         text=response_text,
#             #         voice="yoZ06aMxZJJ28mfd3POQ",
#             #         stream=True
#             #     )
#             # stream(audio_stream)
#             started = True
#             string_index += 1
#         if started:
#             if(text_input != ""):
#                 if string_index < len(string_list_b1):
#                     response_text = string_list_b1[string_index]
#                     response_txt = response_text
#                     audio_stream = generate(
#                         text=response_text,
#                         voice="yoZ06aMxZJJ28mfd3POQ",
#                         stream=True
#                     )
#                     stream(audio_stream)
#                     string_index += 1
#                     if string_index >= len(string_list_b1):
#                         b1 = False
#                         b2 = True
#                         string_index = 0
#                     return jsonify({'response_text': response_text, 'b1': b1, 'b2': b2, 'is_final': False})
#     if b2:
#         if(text_input != ""):
#             if string_index < len(string_list_b2):
#                 response_text = string_list_b2[string_index]
#                 response_txt = response_text
#                 audio_stream = generate(
#                     text=response_text,
#                     voice="yoZ06aMxZJJ28mfd3POQ",
#                     stream=True
#                 )
#                 stream(audio_stream)
#                 string_index += 1
#                 if string_index >= len(string_list_b2):
#                     b2 = False
#                     b3 = True
#                     string_index = 0
#                 return jsonify({'response_text': response_text, 'b2': b2, 'b3': b3, 'is_final': False})


#     if b3:
#         if(text_input != ""):
#             response = openai.Completion.create(
#                 engine='davinci:ft-personal:test-dv-2023-06-27-09-32-44',  # Choose the appropriate ChatGPT engine
#                 # model="gpt-3.5-turbo",
#                 # messages=[{"role": "system", "content":"You're a hypnotist trying rapid fire conversation where the user has to answer to a surrealist and abstract affirmations with the first things that comes to mind"}, 
#                 #           {"role": "assistant", "content":"You see a stream."}, 
#                 #           {"role": "user", "content":"I see a stream"},
#                 #           {"role": "assistant", "content":"Is the stream calm or turbulent?"}, 
#                 #           {"role": "user", "content":"Calm"},
#                 #           {"role": "assistant", "content":"What color is the water in the stream"}, 
#                 #           {"role": "user", "content":"The water is blue"},
#                 #           {"role": "assistant", "content":"there are fish swimming in the stream"}, 
#                 #           {"role": "user", "content":"Goldfish"}, 
#                 #           {"role": "assistant", "content":"Tranquility and serenity"}, 
#                 #           {"role": "user", "content":"Peace"},
#                 #           {"role": "assistant", "content":"A hidden treasure waiting to be discovered"}, 
#                 #           {"role": "user", "content":"Rich"}, 
#                 #           {"role": "assistant", "content":"Fairies, unicorns, and talking trees"}, 
#                 #           {"role": "user", "content":"Fairytale"}, 
#                 #           {"role": "assistant", "content":"A vial of sparkling water that grants eternal youth"}, 
#                 #           {"role": "user", "content":"Eternal"},
#                 #           {"role": "assistant", "content":"The stream is a portal"}, 
#                 #           {"role": "user", "content":"Ethereal"}],
#                 prompt=text_input,
#                 max_tokens=30,  # Adjust the response length as desired
#                 n=1,  # Generate a single response
#                 stop=None,  # Optionally specify a stop token to end the response
#                 temperature=0.7,  # Control the randomness of the response (0.0 to 1.0)
#             )

#             response_text = response.choices[0].text.strip()
#             response_txt = response_text
#             audio_stream = generate(
#                 text=response_text,
#                 voice="yoZ06aMxZJJ28mfd3POQ",
#                 stream=True
#             )
#             stream(audio_stream)
            
#             return jsonify({'response_text': response_text, 'is_final': False})

#     return jsonify({'response_text': '', 'b1': b1, 'b2': b2, 'b3': b3, 'is_final': True})
    
if __name__ == '__main__':
    app.run()

