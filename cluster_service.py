import pandas as pd
centers = pd.read_csv('dataset/cluster_centers_15.csv')

def find_nearest(lat, long):
  distances = centers.apply(
    lambda row: dist(lat, long, int(float(row['lat'])), int(float(row['long']))), 
    axis=1)
  return [centers.loc[distances.idxmin(), 'cluster'], centers.loc[distances.idxmin(), 'count']]

from math import radians, cos, sin, asin, sqrt
def dist(lat1, long1, lat2, long2):
  # convert decimal degrees to radians 
  lat1, long1, lat2, long2 = map(radians, [lat1, long1, lat2, long2])
  # haversine formula 
  dlon = long2 - long1 
  dlat = lat2 - lat1 
  a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
  c = 2 * asin(sqrt(a)) 
  # Radius of earth in kilometers is 6371
  km = 6371* c
  return km