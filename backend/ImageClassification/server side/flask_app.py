from flask import Flask, request, jsonify


from efficientnet_pytorch import EfficientNet
import torch
import torchvision.transforms as transforms
import io
from PIL import Image

image_size = EfficientNet.get_image_size(
    'efficientnet-b0')  
model = EfficientNet.from_pretrained(
    'efficientnet-b0', num_classes=7)  
model.load_state_dict(torch.load("./model.pt", map_location = torch.device('cpu')))  
model.eval()  


imagenet_class_index = {"0": '001.vita',
                        "1": '002.lemonwater',
                        "2": '003.coke',
                        "3": '004.toreta',
                        "4": '005.bakasf',
                        "5": '006.hwal',
                        "6": '007.pear'}


def transform_image(image_bytes):
    
    trans = transforms.Compose([transforms.Resize((image_size, image_size)),
                                transforms.ToTensor(),
                                transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                                     std=[0.229, 0.224, 0.225]),
                                ])
    image = Image.open(io.BytesIO(image_bytes))
    
    return trans(image).unsqueeze(0)


def get_prediction(image_bytes):
    tensor = transform_image(image_bytes=image_bytes)
    outputs = model.forward(tensor)
    pred = torch.sigmoid(outputs)
    _, y_hat = outputs.max(1)
    Prediction_probability = pred[0][y_hat.item()]
    Prediction_probability = Prediction_probability.item()
    predicted_idx = str(y_hat.item())

    return imagenet_class_index[predicted_idx], Prediction_probability


app = Flask(__name__)


@app.route('/')
def ping():
    
    print("pong")
    return 'Image Classification Sample'


@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        file = request.files['file']
        img_bytes = file.read()
        class_name, Prediction_probability = get_prediction(image_bytes=img_bytes)
        print("예측결과 : " + class_name)

        return jsonify({'class_name': class_name, 'Prediction_probability': Prediction_probability})


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
