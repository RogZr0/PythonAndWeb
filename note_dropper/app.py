from flask import Flask, request, render_template_string, redirect, url_for
import json
import os
import uuid

app = Flask(__name__)
NOTE_FILE = "notes.json"

TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>📒 Note Dropper</title>
    <style>
        body { font-family: sans-serif; margin: 0; padding: 1rem; background: #f4f4f4; }
        h2, h3 { text-align: center; }
        form, .note { margin-bottom: 1rem; }
        textarea, input[type="submit"], button {
            width: 100%; padding: 0.75rem; font-size: 1rem;
            border-radius: 8px; border: 1px solid #ccc; margin-top: 0.5rem;
        }
        input[type="submit"], button {
            background-color: #007bff; color: white; border: none; cursor: pointer;
        }
        button:hover, input[type="submit"]:hover { background-color: #0056b3; }
        .note { background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 0 4px rgba(0,0,0,0.1); }
        .note p { margin: 0 0 0.5rem 0; word-wrap: break-word; }
        form.delete-form { margin-top: 0.5rem; }
    </style>
</head>
<body>
    <h2>📒 Note Dropper</h2>
    <form method="POST" action="/">
        <textarea name="note" placeholder="Drop your note or bookmark here..."></textarea>
        <input type="submit" value="Save">
    </form>
    <h3>🗂 All Notes:</h3>
    {% for note in notes %}
        <div class="note">
            <p>{{ note["text"] }}</p>
            <form method="POST" action="/delete/{{ note['id'] }}" class="delete-form">
                <button type="submit">Delete</button>
            </form>
        </div>
    {% endfor %}
</body>
</html>
"""

def load_notes():
    if os.path.exists(NOTE_FILE):
        with open(NOTE_FILE, "r") as f:
            return json.load(f)
    return []

def save_notes(notes):
    with open(NOTE_FILE, "w") as f:
        json.dump(notes, f)

@app.route("/", methods=["GET", "POST"])
def index():
    notes = load_notes()
    if request.method == "POST":
        note_text = request.form.get("note")
        if note_text:
            notes.append({"id": str(uuid.uuid4()), "text": note_text.strip()})
            save_notes(notes)
        return redirect(url_for("index"))
    return render_template_string(TEMPLATE, notes=notes)

@app.route("/delete/<note_id>", methods=["POST"])
def delete_note(note_id):
    notes = load_notes()
    notes = [note for note in notes if note["id"] != note_id]
    save_notes(notes)
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
