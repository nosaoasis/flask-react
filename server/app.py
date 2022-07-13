from email.policy import default
from turtle import title
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import datetime

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql://root:...777iamMysql@localhost/flask_react'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

class Articles(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(100))
  body = db.Column(db.Text())
  date = db.Column(db.DateTime(), default=datetime.datetime.now)

  def __init__(self, title, body):
    self.title = title
    self.body = body




@app.route('/')
def home():
  return jsonify({"name":"Nosa Agho"})

if __name__ == "__main__":
  app.run(debug=True)