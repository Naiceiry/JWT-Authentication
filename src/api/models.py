from flask_sqlalchemy import SQLAlchemy

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
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name":self.name, 
            "address":self.address,
            "phone":self.phone,
            # do not serialize the password, its a security breach
        }