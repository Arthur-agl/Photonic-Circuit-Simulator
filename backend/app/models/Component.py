from app.database.stored.Component import StoredComponent

class Component:
  def __init__(self):
    self.kind = "base"
    self.inputs = []  #Ports
    self.outputs = [] #Ports
    self.label = ""

  @classmethod
  def load(cls, id):
    return StoredComponent.objects(id=id).get()

  def calculate_outputs(self):
    raise NotImplementedError

  def to_json(self):
    raise NotImplementedError

  def as_dict(self):
    raise NotImplementedError

  def get_input(self, id):
    raise NotImplementedError

  def set_input(self, output):
    raise NotImplementedError

  def get_output(self, id):
    raise NotImplementedError

  def set_output(self, output):
    raise NotImplementedError
  
  def delete(self):
    raise NotImplementedError

  def save(self):
    raise NotImplementedError