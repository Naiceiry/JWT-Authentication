"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

@api.route('/signup', methods=['POST'])
def sign_up_user():
    body_request = request.get_json()
    print(body_request)
    full_name= body_request.get("fullname", None)
    address= body_request.get("address", None)
    phone= body_request.get("phone", None)
    email_request = body_request.get("email", None)
    password_request = body_request.get("password", None)
    # password_hash = generate_password_hash(password_request, "sha256")

    user1=User(full_name=full_name,address=address, phone=phone, email_request=email_request, password_request=password_request)
    db.session.add(user1)
    db.session.commit()
    # to check the user existence
    if email_request == None or password_request == None:
        return jsonify({"msg": "Debe introducir Email y contraseña"}), 401
    
    # user_checked = User.query.filter_by(email = email_request).one_or_none()
    # # to check email and contraseña
    # if not user_checked or check_password_hash(password_hash, "wrong-passw@rd"):
    #     return jsonify("Your credentials are wrong, please try again"), 401
    
    # New token
    # # access_token = create_access_token(identity = user_checked.serialize())
    return jsonify({"msg": "El usuario a sido creado exitosamente"}), 200

@api.route('/signin', methods=['POST'])
def sign_in_user():
    body_request = request.get_json()
    email_request = body_request.get("email", None)
    password_request = body_request.get("password", None)
    # password_hash = generate_password_hash(password_request, "sha256")

    if email_request == None or password_request == None:
        return jsonify({"msg": "Debe introducir Email y contraseña"}), 401
   
    user=User.query.filter_by(email_request=email_request).one_or_none()
    if not user or not user.check_password(password_request):
        return jsonify({"msg": "no existe usuario o clave"}), 401    

    access_token=create_access_token(identity=user.serialize())
    return jsonify({"access_token": access_token}), 200
    
@api.route('/me', methods=['POST', 'GET'])
@jwt_required()
def user_profile():
    identity=get_jwt_identity()
    user=current_user(get_jwt_identity())

    return jsonify(user.serialize())

def current_user(identity):
    print(identity)
    return User.query.get(identity)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200