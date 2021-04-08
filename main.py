from sanic import Sanic
from sanic import response
from sanic.response import json

from XGBoost_training import train, predict
from cluster_service import find_nearest

train()

app = Sanic('Melbourne Housing')

app.static('/', './dist/')

@app.post('/api/prediction')
async def handler(req):

  #calculate cluster and property count
  #req.json['propertycount']
  #req.json['cluster']

  long = req.json['long']
  lat = req.json['lat']

  dist_result = find_nearest(int(float(lat)), int(float(long)))
  cluster_nr = dist_result[0]
  propertycount = dist_result[1]
  print("Cluster nr:")
  print(cluster_nr)
  prediction = predict([req.json['type1'],req.json['type2'],req.json['type3'],req.json['rooms'],req.json['dist'],req.json['bathroom'],req.json['car'],req.json['landsize'],req.json['buildingarea'],req.json['yearbuilt'],req.json['long'],req.json['lat'],propertycount,cluster_nr])
  # print(prediction)
  return response.json(prediction)

if __name__ == '__main__':
  app.run(port=8000)
