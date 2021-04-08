from sanic import Sanic
from sanic import response
from sanic.response import json

from XGBoost_training import train, predict

train()
# print(predict([1.000000, 0.000000, 0.000000, 2.000000, 2.500000, 1.000000,
#        1.000000, 202.000000, 156.834586, 1966.609153, -37.799600,
#        144.998400, 4019.000000, 9.000000]))

app = Sanic('Melbourne Housing')

app.static('/', './dist/')

@app.post('/api/prediction')
async def handler(req):
  print(req.json)
  prediction = predict([req.json['type1'],req.json['type2'],req.json['type3'],req.json['rooms'],req.json['dist'],req.json['bathroom'],req.json['car'],req.json['landsize'],req.json['buildingarea'],req.json['yearbuilt'],req.json['long'],req.json['lat'],req.json['propertycount'],req.json['cluster']])
  # print(prediction)
  return response.json(prediction)

if __name__ == '__main__':
  app.run(port=8000)
