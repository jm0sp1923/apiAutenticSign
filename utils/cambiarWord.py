import sys
import json
import base64
import os
from docx import Document

# Detectar si se está ejecutando en Windows
import platform
is_windows = platform.system() == "Windows"

if is_windows:
    from comtypes.client import CreateObject

try:
    # Leer el JSON desde stdin
    data = json.loads(sys.stdin.read())

    # Ruta del documento de plantilla
    doc_path = os.path.join(os.getcwd(), "public", "MODELO CONTRATO FIANZA COLECTIVA PERSONA NATURAL.docx")

    # Verificar si el archivo existe
    if not os.path.exists(doc_path):
        raise FileNotFoundError(f"El archivo {doc_path} no se encuentra.")
    
    doc = Document(doc_path)

    # Diccionario de reemplazo (ajustado con las claves correctas)
    reemplazos = {
        "{{NUMERO CONTRATO}}": str(data.get("numero_de_contrato", "N/A")),
        "{{CIUDAD INMOBILIARIA}}": data.get("ciudad_inmobiliaria", "N/A"),
        "{{CEDULA}}": str(data.get("cedula", "N/A")),
        "{{NOMBRE REPRESENTANTE LEGAL}}": data.get("nombre_representante_legal", "N/A"),
        "{{CEDULA REPRESENTANTE LEGAL}}": str(data.get("cedula_representante_legal", "N/A")),
        "{{NOMBRE ESTABLECIMIENTO COMERCIO}}": data.get("nombre_establecimiento_comercio", "N/A"),
        "{{NUMERO CELULAR}}": str(data.get("numero_celular", "N/A")),
        "{{CORREO}}": data.get("correo", "N/A"),
    }

    # Reemplazo en el documento
    for paragraph in doc.paragraphs:
        for key, value in reemplazos.items():
            if key in paragraph.text:
                paragraph.text = paragraph.text.replace(key, value)

    # Guardar en formato .docx
    docx_path = "Contrato_Actualizado.docx"
    doc.save(docx_path)

    # Convertir a PDF según el sistema operativo
    pdf_path = "Contrato_Actualizado.pdf"

    if is_windows:
        # Usar Microsoft Word para convertir a PDF
        word = CreateObject("Word.Application")
        word.Visible = False
        doc = word.Documents.Open(os.path.abspath(docx_path))
        doc.SaveAs(os.path.abspath(pdf_path), FileFormat=17)  
        doc.Close()
        word.Quit()
    else:
        # Usar LibreOffice en Linux/Mac
        os.system(f"libreoffice --headless --convert-to pdf {docx_path}")

    # Verificar que el PDF se haya creado
    if not os.path.exists(pdf_path):
        raise FileNotFoundError("Error al convertir el archivo a PDF.")

    # Convertir el PDF a Base64
    with open(pdf_path, "rb") as pdf_file:
        base64_pdf = base64.b64encode(pdf_file.read()).decode("utf-8")

    # Imprimir solo el Base64
    print(base64_pdf)

    # Limpiar archivos temporales
    os.remove(docx_path)
    os.remove(pdf_path)

except FileNotFoundError as e:
    print(f"Error: {e}")
except Exception as e:
    print(f"Error inesperado: {e}")
