import os

import numpy as np

import re

import matplotlib.pyplot as plt
from lxml import html
import requests
from PIL import Image
from io import BytesIO

import tensorflow as tf


loaded_model = tf.keras.models.load_model('/home/tien/projects/projectsyear4/project3/server_ai/model_ai/output/my-model')
regrex_check_url = "^(https?:\/\/)?([a-zA-Z0-9\.-]+)\.([a-z\.]{2,6})"

def check_image(url):
    schema_hostname = re.search(regrex_check_url,url)
    if schema_hostname == None:
        return 0
    else:
        schema_hostname = schema_hostname.group() #get hostname
    page = requests.get(url)
    tree = html.fromstring(page.content)

    list_images = tree.xpath("//img/@src")

    count_check = 0 #check if count image sex >= 3 that is a adult website
    # print(list_images)
    # IMG_SIZE = 224

    for i,image_path in enumerate(list_images):
        if i > 0: #bo qua cac anh giong nhau
            if image_path == list_images[i-1]: continue

        # image_path = image_path.split('?')[0].lower()
        if re.search(regrex_check_url,image_path) == None:
            if str(image_path).startswith('/'):
                image_path = schema_hostname + str(image_path)
            else:
                image_path = schema_hostname + '/' + str(image_path)

        ext = str(image_path).split('.')[-1]
        if ext not in ['jpg','jpeg','png']: continue
        print(image_path)
        response = requests.get(image_path)
        # image = Image.open(BytesIO(response.content))
        with open('/home/tien/projects/projectsyear4/project3/server_ai/model_ai/tmp/img.jpg','wb') as f:
            f.write(response.content)
        test_image = tf.keras.preprocessing.image.load_img('/home/tien/projects/projectsyear4/project3/server_ai/model_ai/tmp/img.jpg', target_size=(224,224))
        image = tf.keras.preprocessing.image.img_to_array(test_image)
        img = np.expand_dims(image, axis=0)
        result = loaded_model.predict(img)
        # print('label-1', round(result[0][0]))
        # print('label-2', round(result[0][1]))
        if round(result[0][0]) == 1: 
            count_check += 1
        if count_check >= 3:
            return 1
    return 0
