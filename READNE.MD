# Image Upload example

## Node API

Install

```bash
yarn install
```

Run

```bash
yarn start
```

### Routes

| Method | Name   | Desc                                                                  |
| ------ | ------ | --------------------------------------------------------------------- |
| POST   | /img   | Receives an image and saves it locally                                |
| POST   | /cloud | Receives an image and saves it on cloudinary, returns the image's URL |

### Environment Variables

- IMG_CLOUD_NAME
- IMG_API_KEY
- IMG_API_SECRET

## Python Client

Install

```bash
pip install -r requirements.txt
```

Run

```bash
python main.py
```
