import os
from dataclasses import fields
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

DB_PASS = os.environ.get("MYSQL_PASS")


app.config["SQLALCHEMY_DATABASE_URI"] = f'mysql://root:{DB_PASS}@localhost/flask_react'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Articles(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(100))
  body = db.Column(db.Text())
  date = db.Column(db.DateTime(), default=datetime.datetime.now)

  def __init__(self, title, body):
    self.title = title
    self.body = body

class ArticleSchema(ma.Schema):
  class Meta:
    fields = ('id', 'title', 'body', 'date')

article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)



@app.route('/')
def home():
  return jsonify({"name":"Nosa Agho"})


@app.route('/get', methods=["GET"])
def get_articles():
  all_articles = Articles.query.all()
  results = articles_schema.dump(all_articles)
  return jsonify(results)


@app.route('/get/<id>', methods=['GET'])
def get_article(id):
  single_article = Articles.query.get(id)
  return article_schema.jsonify(single_article)


@app.route('/add', methods=['POST'])
def add_article():
  title = request.json['formData']['title']
  body = request.json['formData']['body']

  articles = Articles(title, body)
  db.session.add((articles))
  db.session.commit()
  return article_schema.jsonify(articles)


@app.route('/update/<id>', methods=["PATCH"])
def update_article(id):
  single_article = Articles.query.get(id)
  single_article.title = request.json['formData']['title'] or single_article.title
  single_article.body = request.json['formData']['body'] or single_article.body

  db.session.commit()
  return article_schema.jsonify(single_article)


@app.route('/delete/<id>', methods=["DELETE"])
def delete_article(id):
  single_article = Articles.query.get(id)
  db.session.delete(single_article)

  db.session.commit()
  
  return article_schema.jsonify(single_article)



if __name__ == "__main__":
  app.run(debug=True)