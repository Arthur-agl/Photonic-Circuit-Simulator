from app.database.db import db
import mongoengine_goodjson as gj
from app.database.Port import Port

class Component(gj.Document):
  kind = db.StringField()
  inputs = db.ListField(db.LazyReferenceField(Port), required=True)
  outputs = db.ListField(db.LazyReferenceField(Port), required=True)
  label = db.StringField()