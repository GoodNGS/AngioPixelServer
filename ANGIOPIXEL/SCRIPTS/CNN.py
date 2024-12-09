import tensorflow as tf
from PIL import Image
import numpy as np
import requests
import sys  # Para manejar argumentos

# Ruta de la imagen pasada como argumento
if len(sys.argv) < 2:
    print("Error: No se proporcionó la ruta de la imagen.")
    sys.exit(1)

ruta_imagen = sys.argv[1]

# Tamaño esperado por el modelo
tamaño_imagen = (224, 224)

# Cargar y preprocesar la imagen
def cargar_imagen(ruta, tamaño):
    imagen = Image.open(ruta).convert('RGB')
    imagen = imagen.resize(tamaño)
    imagen_array = np.array(imagen) / 255.0
    imagen_array = np.expand_dims(imagen_array, axis=0)
    return imagen_array

datos_entrada = cargar_imagen(ruta_imagen, tamaño_imagen)

# Descargar y cargar el modelo
url = 'https://drive.google.com/uc?export=download&id=16kIrjUCDNeihXw0O11WnCzIB-nIno9VG'
r = requests.get(url)
with open('modelo_cnn.h5', 'wb') as f:
    f.write(r.content)

modelo = tf.keras.models.load_model('modelo_cnn.h5')

# Realizar predicción
prediccion = modelo.predict(datos_entrada)
redondeo_prediccion = round(prediccion[0][0], 2)

if redondeo_prediccion >= 0.5:
    print("Lesión")
else:
    print("No lesión")
