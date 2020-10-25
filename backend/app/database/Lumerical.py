from app.database.db import db
import mongoengine_goodjson as gj
import pandas as pd
import numpy as np
from decimal import Decimal
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sympy.solvers import solve
from sympy import Symbol
from mongoengine.queryset.visitor import Q

class Lumerical(gj.Document):
  cols = {
    "swn_output": 2,
    "swn_drain": 3,
    "swp_output": 4,
    "swp_drain": 5
  }

  #list of polynomial variables, indexed by degree-1
  variables = []

  kind = db.StringField()
  degree = db.IntField()
  betas = db.ListField(db.DecimalField(precision=10))

  df = pd.read_csv('app/resources/LumericalValues/allValues.csv')

  def initialize():
    for degree in range(1, 5):
      Lumerical.variables.append(Lumerical.generateVariables(degree))

    if (Lumerical.objects.count() == 0):
      for key in Lumerical.cols:
        for degree in range(1, 5):
          betas = Lumerical.polynomialRegression(Lumerical.cols[key], degree)

          doc = {
            'kind': key,
            'degree': degree,
            'betas': betas
          }
          Lumerical(**doc).save()

  #𝑓(𝑥₁, 𝑥₂) = 𝑏₀ + 𝑏₁𝑥₁ + 𝑏₂𝑥₂ + 𝑏₃𝑥₁² + 𝑏₄𝑥₁𝑥₂ + 𝑏₅𝑥₂²
  def polynomialRegression(y_col, degree):
    x = Lumerical.df.iloc[:,0:2].copy().to_numpy()
    y = Lumerical.df.iloc[:,y_col].copy().to_numpy()

    x_ = PolynomialFeatures(degree=degree, include_bias=False).fit_transform(x)
    model_p = LinearRegression().fit(x_, y)
    r_sq_p = model_p.score(x_, y)

    betas = [model_p.intercept_]
    betas.extend(model_p.coef_)
    return betas

  def generateVariables(degree):
    if (degree <= 0):
      return []
    if (degree == 1):
      return ['1*', 'x*', 'y*']
      
    curr = Lumerical.generateVariables(degree-1)

    pol_vals = []
    for x in range(degree, -1, -1):
      for y in range(degree-x, degree-x+1):
        pol_vals.append('x*'*x + 'y*'*y)

    for val in pol_vals:
      curr.append(val)
    
    return curr

  def calculate(col, control, input):
    x = float(input)
    y = float(control)

    degree = 4
    betas = Lumerical.objects(Q(kind=col) & Q(degree=degree)).get().betas
    variables = Lumerical.variables[degree-1]

    function = [x + str(y) for x,y in zip(variables,betas)]
    function = '+'.join(function)

    result = eval(function)
    return result if result >= 0 else 0