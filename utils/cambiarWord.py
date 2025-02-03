import requests
from docx import Document


data = {
    "1": "19",
    "2": "Juan Sebastian Munoz Perez",
    "3": "Santiago de Chile",
    "4": "1109184891",
    "7": "Tarifa segun zona",
    "9": "Diez y nueve (19) AGOSTO de 2024",
    "10": "Juan David Quintero Garcia",
    "11": "1109184892",
    "12": "AFFI SAS PRUEBA",
};

# Cargar el documento
doc_path = "MODELO CONTRATO FIANZA COLECTIVA PERSONA NATURAL.docx"
doc = Document(doc_path)

# Diccionario de reemplazo basado en los datos de la API
reemplazos = {
    "NUMERO CONTRATO": data.get("1", "N/A"),
    "NOMBRE PERSONA NATURAL": data.get("2", "N/A"),
    "CIUDAD INMOBILIARIA": data.get("3", "N/A"),
    "CEDULA": data.get("4", "N/A"),
    "TARIFA SEGÚN ZONA": data.get("7", "N/A"),
    "DIA LETRAS (DIA NUMEROS) MES de AÑO":data.get("9", "N/A"),
    "NOMBRE REPRESENTANTE LEGAL": data.get("10", "N/A"),
    "CEDULA REPRESENTANTE LEGAL": data.get("11", "N/A"),
    "NOMBRE ESTABLECIMIENTO COMERCIO": data.get("12", "N/A")
}

# Reemplazo en el documento
for paragraph in doc.paragraphs:
    for key, value in reemplazos.items():
        if key in paragraph.text:
            paragraph.text = paragraph.text.replace(key, value)

# Guardar el documento actualizado
doc.save("Contrato_Actualizado.docx")

print("Documento actualizado y guardado como 'Contrato_Actualizado.docx'.")
