from app.models.Port import Port
from app.models.Component import Component
from app.database.Component import Component as ComponentCollection
from app.database.stored.Component import StoredComponent

class PowerSource(Component):
  def __init__(self, outputs, id=None):
    self.kind = "power_source"
    self.inputs = []
    self.outputs = outputs
    self.id = id

  @classmethod
  def create(cls):
    outputs = []
    outputs.append(Port.create())

    power_source = cls(outputs)
    power_source_db = ComponentCollection(**power_source.as_dict()).save()

    power_source.id = power_source_db.id
    return power_source

  @classmethod
  def load(cls, id):
    power_source_db = StoredComponent.objects(id=id).get()

    outputs = []
    for port in power_source_db.outputs:
      outputs.append(Port.load(port.id))

    power_source = cls(outputs, id)
    return power_source


  def get_output(self, id):
    return next((x for x in self.outputs if str(x.id) == id), None)

  def set_output(self, id, target_port):
    own_output = self.get_output(id)
    if (own_output != None):
      own_output.target = target_port

  def set_powers(self, powers):
    self.outputs[0].power = powers[0]

  def delete(self):
    for port in self.inputs:
      port.delete()
    
    for port in self.outputs:
      port.delete()

    ComponentCollection.objects(id=self.id).get().delete()

  def save(self):
    StoredComponent(**self.as_dict()).save()

    for port in self.inputs:
      port.save()

    for port in self.outputs:
      port.save()
      

  def as_dict(self):
    return {
      'kind': self.kind,
      'inputs': [port.id for port in self.inputs],
      'outputs': [port.id for port in self.outputs]
    }

  def to_json(self):
    return {
      'id': str(self.id),
      'kind': self.kind,
      'inputs': [],
      'outputs': [x.to_json() for x in self.outputs]
    }


  def calculate_outputs(self):
    return [self.outputs[0].power]