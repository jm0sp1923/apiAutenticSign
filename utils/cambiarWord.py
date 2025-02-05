import sys
import json
import base64
import os
import subprocess
from docx import Document

try:
    # Leer el JSON desde stdin
    data = json.loads(sys.stdin.read())

    # Ruta del documento original
    doc_path = os.path.join(os.getcwd(), "public", "MODELO CONTRATO FIANZA COLECTIVA PERSONA NATURAL.docx")

    # Verificar si el archivo existe
    if not os.path.exists(doc_path):
        raise FileNotFoundError(f"El archivo {doc_path} no se encuentra.")
    
    # Cargar el documento
    doc = Document(doc_path)

    # Diccionario de reemplazo
    reemplazos = {
        "{{NUMERO CONTRATO}}": data.get("1", "N/A"),
        "{{NOMBRE PERSONA NATURAL}}": data.get("2", "N/A"),
        "{{CIUDAD INMOBILIARIA}}": data.get("3", "N/A"),
        "{{CEDULA}}": data.get("4", "N/A"),
        "{{TARIFA SEGÚN ZONA}}": data.get("7", "N/A"),
        "{{DIA LETRAS (DIA NUMEROS) MES de AÑO}}": data.get("9", "N/A"),
        "{{NOMBRE REPRESENTANTE LEGAL}}": data.get("10", "N/A"),
        "{{CEDULA REPRESENTANTE LEGAL}}": data.get("11", "N/A"),
        "{{NOMBRE ESTABLECIMIENTO COMERCIO}}": data.get("12", "N/A"),
    }

    # Reemplazo en el documento
    for paragraph in doc.paragraphs:
        for key, value in reemplazos.items():
            if key in paragraph.text:
                paragraph.text = paragraph.text.replace(key, value)

    # Guardar el documento modificado
    docx_path = "Contrato_Actualizado.docx"
    doc.save(docx_path)

    # Convertir a PDF con LibreOffice
    subprocess.run(["libreoffice", "--headless", "--convert-to", "pdf", docx_path])

    # Ruta del PDF generado
    pdf_path = "Contrato_Actualizado.pdf"

    # Verificar que el PDF se generó correctamente
    if not os.path.exists(pdf_path):
        raise Exception("Error al convertir el documento a PDF.")

    # Convertir el PDF a Base64
    with open(pdf_path, "rb") as pdf_file:
        base64_pdf = base64.b64encode(pdf_file.read()).decode("utf-8")

    # Imprimir solo el base64 del PDF
    print(base64_pdf)

    # Limpiar archivos temporales
    os.remove(docx_path)
    os.remove(pdf_path)

except FileNotFoundError as e:
    print(f"Error: {e}")
except Exception as e:
    print(f"Error inesperado: {e}")
