import sqlalchemy
from sqlalchemy import create_engine, text
from flask import Flask, request, jsonify, current_app



def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('config.py')
    db = create_engine(app.config['DB_URL'], encoding='utf-8', max_overflow=0)
    app.database = db


    @app.route('/getMessage', methods=['GET'])
    def get_message():
        container = []
        messages = current_app.database.execute(text('SELECT * FROM messages')).fetchall()
        
        for message in messages:
            container.append({'name' : message['name'], 'message' : message['message'], 'date' : message['created_at'].__str__()[:-9]})
        
        return jsonify(container)

    @app.route('/sendMessage', methods=['POST'])
    def send_message():
        contents = request.json
        name = contents['name']
        message = contents['message']
        current_app.database.execute(text("""
            INSERT INTO messages (name, message)
            VALUES (:name, :message)
            """), {'name' : name, 'message' : message})

        return jsonify({'status' : 'success'})

    return app


            
        

