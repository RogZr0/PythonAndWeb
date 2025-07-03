from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)
DATA_FILE = 'data.json'

def load_data():
    try:
        with open(DATA_FILE, 'r') as f:
            content = f.read().strip()
            if not content:
                return []
            return json.loads(content)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def save_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=4)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data', methods=['GET', 'POST', 'DELETE'])
def data_handler():
    if request.method == 'GET':
        return jsonify(load_data())
    elif request.method == 'POST':
        new_data = request.get_json()
        if isinstance(new_data, list):  # overwrite all
            save_data(new_data)
        else:  # append new item
            data = load_data()
            data.append(new_data)
            save_data(data)
        return jsonify({"status": "saved"})
    elif request.method == 'DELETE':
        save_data([])
        return jsonify({"status": "cleared"})

if __name__ == '__main__':
    app.run(debug=True)
