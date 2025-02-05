import sys
import json
import base64
import os
import platform
from docx import Document

# Detectar el sistema operativo
is_windows = platform.system() == "Windows"

if is_windows:
    from comtypes.client import CreateObject
import subprocess

try:
    # Leer el JSON desde stdin
    data = json.loads(sys.stdin.read())

    # Ruta del documento de plantilla
    doc_path = os.path.join(os.getcwd(), "public", "MODELO CONTRATO FIANZA COLECTIVA PERSONA NATURAL.docx")

    # Verificar si el archivo existe
    if not os.path.exists(doc_path):
        raise FileNotFoundError(f"El archivo {doc_path} no se encuentra.")

    # Cargar el documento
    doc = Document(doc_path)

    # Diccionario de reemplazo
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

    # Reemplazar valores en el documento
    for paragraph in doc.paragraphs:
        for key, value in reemplazos.items():
            if key in paragraph.text:
                paragraph.text = paragraph.text.replace(key, value)

    # Guardar el documento actualizado
    docx_path = "Contrato_Actualizado.docx"
    doc.save(docx_path)

    # Convertir a PDF según el sistema operativo
    pdf_path = "Contrato_Actualizado.pdf"

    if is_windows:
        # Usar Microsoft Word para convertir a PDF en Windows
        word = CreateObject("Word.Application")
        word.Visible = False
        doc = word.Documents.Open(os.path.abspath(docx_path))
        doc.SaveAs(os.path.abspath(pdf_path), FileFormat=17)  
        doc.Close()
        word.Quit()
    else:
        # Usar LibreOffice en Linux/Mac (silenciando salida)
        subprocess.run(
            ["libreoffice", "--headless", "--convert-to", "pdf", docx_path, "--outdir", os.getcwd()],
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
        )

    # Verificar que el PDF se haya creado
    if not os.path.exists(pdf_path):
        raise FileNotFoundError("Error al convertir el archivo a PDF.")

    # Leer el PDF y convertir a Base64
    with open(pdf_path, "rb") as pdf_file:
        base64_pdf = base64.b64encode(pdf_file.read()).decode("utf-8")

    # Imprimir solo el contenido Base64
    print(base64_pdf)

    # Eliminar archivos temporales
    os.remove(docx_path)
    os.remove(pdf_path)

except FileNotFoundError as e:
    print(f"Error: {e}", file=sys.stderr)
except Exception as e:
    print(f"Error inesperado: {e}", file=sys.stderr)
