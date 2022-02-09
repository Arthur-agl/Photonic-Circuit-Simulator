import mongoengine_goodjson as gj
import numpy as np
import pandas as pd
from scipy.interpolate import Rbf
from app.database.db import db

class Lumerical(gj.Document):
  switch_cols = {
    "swn_output": 2,
    "swn_drain": 3,
    "swp_output": 4,
    "swp_drain": 5
  }
  y_connector_cols = {
    "y_split_output_1": 2,
    "y_split_output_2": 3,
    "y_junction_output": 4
  }

  #list of polynomial variables, indexed by degree-1
  variables = []

  splines = []

  kind = db.StringField()
  degree = db.IntField()
  betas = db.ListField(db.DecimalField(precision=10))

  df = None
  df_switch = pd.read_csv('app/resources/LumericalValues/switchValuesV2.csv')
  df_y_connector = pd.read_csv('app/resources/LumericalValues/yConnectorValues.csv')

  def get_col_index(col):
    if col in Lumerical.switch_cols:
      return Lumerical.switch_cols[col]
    elif col in Lumerical.y_connector_cols:
      return Lumerical.y_connector_cols[col]

  def set_df(col):
    if col in Lumerical.switch_cols:
      Lumerical.df = Lumerical.df_switch
    elif col in Lumerical.y_connector_cols:
      Lumerical.df = Lumerical.df_y_connector

  def generate_spline(col):
    if Lumerical.df is None:
      return None

    z_col = Lumerical.get_col_index(col)

    x = Lumerical.df.iloc[:,0:1].copy().to_numpy()
    y = Lumerical.df.iloc[:,1:2].copy().to_numpy()
    z = Lumerical.df.iloc[:,z_col].copy().to_numpy()

    return {
      'col': col,
      'approx': Rbf(x,y,z,function='thin_plate',smooth=5, episilon=5)
    }

  def get_spline(col):
    spline = next((x for x in Lumerical.splines if x["col"] == col), None)

    if (spline is None):
      spline = Lumerical.generate_spline(col)

      if (spline is None):
        return None

      Lumerical.splines.append(spline)

    return spline

  def calculate(col, control, input):
    Lumerical.set_df(col)

    if Lumerical.df is None:
      return None

    if col in Lumerical.switch_cols:
      colindex = Lumerical.get_col_index(col)
      ddf = Lumerical.df_switch
      abc = ddf[(ddf['Control'] == np.floor(input)) & (ddf['Input'] == np.floor(control))]
      result_tmp = abc.iloc[0][colindex]
      result = round(result_tmp,5)

    elif col in Lumerical.y_connector_cols:
      spline = Lumerical.get_spline(col)
      result_tmp = spline["approx"](input, control)
      result = np.round(result_tmp,5)

    return result if result > 0 else 0
