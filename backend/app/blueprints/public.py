from flask import Blueprint, request, Response, jsonify
from app.resources.controller import controller

public_bp = Blueprint('public', __name__)

@public_bp.route('/')
def index():
  return "Hello World!"

@public_bp.route('/data')
def show_data():
  components = [x.get_data() for x in controller.components]
  return jsonify(components), 200


@public_bp.route('/data', methods=['POST'])
def create_data():
  try:
    kind = request.get_json().get('kind')

    if (kind == None):
      return "Bad Request", 400

    controller.add_component(kind)
    return "OK", 200

  except Exception as e:
    return "Exception: " + str(e), 500

@public_bp.route('/data/<id>/calculateOutputs')
def calculateOutputs(id):
  outputs = controller.calculateOutputs(id)
  if (outputs == None):
    return "Component with id: " + str(id) + " doesn't exist.", 400

  return jsonify(outputs), 200

@public_bp.route('/error')
def error():
  raise ValueError('This is a ValueError!')