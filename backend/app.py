from flask import Flask, request, jsonify
import datetime

x = datetime.datetime.now()

app = Flask(__name__)

current_event_text = ""

@app.route('/data')
def get_data():
	return {
		'MessageCategory': "1",
		"ID": "123",
		"MessageType": "A",
		"Text1": "Any Text",
		"Text2": "Any Text",
	}

@app.route('/send-event', methods=['POST'])
def send_event():
	global current_event_text
	data = request.get_json()

	event_text = data.get('eventText', '')

	print(f"Received event: {event_text}")

	current_event_text = event_text

	return jsonify({"message": "Event received successfully"})

if __name__ == '__main__':
	app.run(debug=True)
