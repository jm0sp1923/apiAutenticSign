import sys
import json
import base64
import os
from docx import Document
import subprocess

try:
    # Leer el JSON desde stdin
    data = json.loads(sys.stdin.read())

    # Cargar el documento
    doc_path = os.path.join(os.getcwd(), "", "public", "MODELO CONTRATO FIANZA COLECTIVA PERSONA NATURAL.docx")

    # Verificar si el archivo existe
    if not os.path.exists(doc_path):
        raise FileNotFoundError(f"El archivo {doc_path} no se encuentra.")
    
    doc = Document(doc_path)

    # Diccionario de reemplazo
    reemplazos = {
        "{{NUMERO CONTRATO}}": data.get("numero_de_contrato", "N/A"),
        "{{NOMBRE PERSONA NATURAL}}": data.get("nombre_persona_natural", "N/A"),
        "{{CIUDAD INMOBILIARIA}}": data.get("ciudad_inmobiliaria", "N/A"),
        "{{CEDULA}}": data.get("cedula", "N/A"),
        "{{TARIFA SEGÚN ZONA}}": data.get("tarifa_segun_zona", "N/A"),
        "{{DIA LETRAS (DIA NUMEROS) MES de AÑO}}": data.get("fecha", "N/A"),
        "{{NOMBRE REPRESENTANTE LEGAL}}": data.get("nombre_representante_legal", "N/A"),
        "{{CEDULA REPRESENTANTE LEGAL}}": data.get("cedula_representante_legal", "N/A"),
        "{{NOMBRE ESTABLECIMIENTO COMERCIO}}": data.get("nombre_establecimiento_comercio", "N/A"),
    }

    # Reemplazo en el documento
    for paragraph in doc.paragraphs:
        for key, value in reemplazos.items():
            if key in paragraph.text:
                paragraph.text = paragraph.text.replace(key, value)

    # Guardar el documento temporalmente como .docx
    docx_path = "Contrato_Actualizado.docx"
    doc.save(docx_path)

    # Convertir el .docx a PDF usando LibreOffice
    pdf_path = "Contrato_Actualizado.pdf"
    subprocess.run([r"/usr/bin/soffice", "--headless", "--convert-to", "pdf", docx_path], check=True)

    # Convertir el PDF a Base64
    with open(pdf_path, "rb") as pdf_file:
        base64_pdf = base64.b64encode(pdf_file.read()).decode("utf-8")

    # Guardar el Base64 en un archivo de texto
    with open("pdf_base64.txt", "w") as text_file:
        text_file.write(base64_pdf)
        
    print(base64_pdf)  

    # Limpiar archivos temporales
    os.remove(docx_path)
    os.remove(pdf_path)

except FileNotFoundError as e:
    print(f"Error: {e}")
except Exception as e:
    print(f"Error inesperado: {e}")
