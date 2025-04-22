# Integración de HubSpot con Autentic

## Descripción

Esta integración permite la carga de procesos en Autentic a través de un JSON-Template mediante el endpoint `/cargarProceso`. Se pueden enviar notificaciones al completar las firmas y especificar la información requerida para los firmantes y documentos.

---

## Flujo de Trabajo

### Endpoint: `POST /api/procesos/asignarProceso`

Permite cargar un proceso en Autentic enviando un JSON con la estructura requerida.

Ejemplo de JSON De Entrada

```json

{
  "tipo_persona":"Natural",
  "numero_de_contrato": "1923423",
  "nombre_persona_natural": "Edgar David Camacho Garcia",
  "ciudad_inmobiliaria": "Bogota",
  "cedula": "1109184892",
  "fecha": "Diez y nueve (19) AGOSTO de 2024",
  "nombre_representante_legal": "Juan Sebastian Munoz Perez",
  "cedula_representante_legal": "1109184896",
  "nombre_establecimiento_comercio": "AFFI SAS PRUEBA",
  "numero_celular":"+573104056601",
  "correo":"jm0sp1923@gmail.com"
}
```

### Ejemplo de JSON de Entrada

```json
{
  "sendCompletionNotification": true,
  "emailForNotification": "ejemplo.prueba@affi.net",
  "processesTemplate": [
    {
      "enterpriseId": "1109184891",
      "senderEmail": "ejemplo.prueba@affi.net",
      "senderIdentification": "1101010101",
      "idTemplate": "05dc0ea5",
      "filenames": [
        "MODELO_CONTRATO_FIANZA_COLECTIVA_PERSONA_JURIDICA.pdf",
        "REGLAMENTO_DE_FIANZA_AFFI_8.pdf"
      ],
      "ensambled": {
        "form-field-ba3mg": "numero_de_contrato",
        "form-field-w7gaf": "inmobiliaria,"
      },
      "signers": [
        {
          "name": "prueba",
          "lastName": "prueba",
          "identification": "0101010101",
          "email": "correo",
          "phone": "celular",
          "roleTemplate": "cliente",
          "authMethods": ["OTP"]
        }
      ]
    }
  ]
}
```

---

## Descripción de los Campos

- **sendCompletionNotification** _(booleano)_ : Indica si se debe enviar una notificación cuando se completen las firmas.
- **emailForNotification** _(string)_ : Email al que se enviará la notificación de finalización del proceso.
- **processesTemplate** _(array)_ : Lista de procesos a enviar.
  - **enterpriseId** _(string)_ : ID de la empresa asociada a Autentic.
  - **senderEmail** _(string)_ : Email del remitente del proceso.
  - **senderIdentification** _(string)_ : Identificación del remitente del proceso.
  - **idTemplate** _(string)_ : ID de la plantilla creada en Autentic.
  - **filenames** _(array de strings)_ : Nombres de los documentos utilizados en la plantilla (deben coincidir con los nombres en Autentic).
  - **ensambled** _(objeto)_ : Campos a llenar en la plantilla.
  - **signers** _(array de objetos)_ : Lista de firmantes del documento.
    - **name** _(string)_ : Nombre del firmante.
    - **lastName** _(string)_ : Apellido del firmante.
    - **identification** _(string)_ : Identificación del firmante.
    - **email** _(string)_ : Correo electrónico del firmante.
    - **phone** _(string)_ : Teléfono del firmante.
    - **roleTemplate** _(string)_ : Rol del firmante en la plantilla.
    - **authMethods** _(array de strings)_ : Métodos de autenticación permitidos (por ejemplo, "OTP").

---

## Consideraciones

- Los documentos en `filenames` deben tener los mismos nombres que los documentos cargados en Autentic.
- Los `form-field-*` en `ensambled` deben coincidir con los campos de la plantilla.
- Es posible agregar múltiples firmantes en el array `signers`.

---

## Autores

- Juan Sebastian Munoz Perez - AFFI S.A.S

## Contacto

Para cualquier consulta, contacta a: [juan.munoz@affi.net](juan.munoz@affi.net)
