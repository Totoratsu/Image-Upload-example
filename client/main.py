import os
import requests

url = 'http://localhost:3000/'
path_img = './input.png'


def main(path='cloud'):
    with open(path_img, 'rb') as img:
        name_img = os.path.basename(path_img)
        files = {
            'file': (name_img, img, 'multipart/form-data', {'Expires': '0'})
        }

        with requests.Session() as s:
            r = s.post(url+path, files=files)
            data = r.json()

            print(r.status_code)

            if r.status_code != 200:
                print(data["err"])
            else:
                if path == 'cloud':
                    print(data["url"])
                else:
                    print("Done")


if __name__ == '__main__':
    # Use path='img' for local storage
    main(path='cloud')
