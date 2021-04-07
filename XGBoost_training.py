import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import xgboost as xgb

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

sc = StandardScaler()
regressor = xgb.XGBRegressor(max_depth=5,n_estimators=150)

def train():
    dataset = pd.read_csv('dataset/full_dataset_imputed_cluster_20.csv')

    X = dataset.iloc[:,[0,1,2,3,5,6,7,8,9,10,11,12,13,15]]
    y = dataset.iloc[:,4].values

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size= 0.25, random_state = 0)

    X_train = sc.fit_transform(X_train)
    X_test = sc.transform(X_test)

    regressor.fit(X_train,y_train, eval_set = [(X_train, y_train), (X_test, y_test)])
    # regressor.fit(X_train,y_train)

def predict(values):
    predicition = regressor.predict(sc.transform([values]))
    
    return predicition