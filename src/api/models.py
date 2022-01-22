from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import safe_str_cmp
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=True)
    full_name= db.Column(db.String(80), unique=False, nullable=False)
    address= db.Column(db.String(120), unique=False, nullable=False)
    phone= db.Column(db.String(80), unique=False, nullable=False)
    email_request= db.Column(db.String(120), unique=False, nullable=False)
    password_request= db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.email_request

    def serialize(self):
        return {
            "id": self.id,
            "email_request": self.email_request,
            "password_request": self.password_request 
        }

    def check_password(self, password_param):
        return safe_str_cmp (self.password_request.encode('utf-8'), password_param.encode('utf-8'))