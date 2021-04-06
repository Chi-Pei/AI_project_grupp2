from sanic import Sanic
from sanic.response import json

app = Sanic('Melbourne Housing')

app.static('/', './dist/index.html')

if __name__ == "__main__":
  app.run(port=8000)