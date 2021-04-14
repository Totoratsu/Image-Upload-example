import os
import requests

url = 'https://orbittas-test.herokuapp.com/img'
path_img = './input.png'

with open(path_img, 'rb') as img:
  name_img= os.path.basename(path_img)
  files= {'file': (name_img,img,'multipart/form-data',{'Expires': '0'}) }
  
  with requests.Session() as s:
    r = s.post(url,files=files)
    data = r.json()
    print(r.status_code)
    print(data["url"])
