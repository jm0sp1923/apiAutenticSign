
# Integración de HubSpot con Autentic

## Descripción

Esta integración permite la carga de procesos en Autentic a través de un JSON-Template mediante el endpoint `/cargarProceso`. Se pueden enviar notificaciones al completar las firmas y especificar la información requerida para los firmantes y documentos.

---

## Flujo de Trabajo

### Endpoint: `/cargarProceso`

Permite cargar un proceso en Autentic enviando un JSON con la estructura requerida.

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

* **sendCompletionNotification**  *(booleano)* : Indica si se debe enviar una notificación cuando se completen las firmas.
* **emailForNotification**  *(string)* : Email al que se enviará la notificación de finalización del proceso.
* **processesTemplate**  *(array)* : Lista de procesos a enviar.
  * **enterpriseId**  *(string)* : ID de la empresa asociada a Autentic.
  * **senderEmail**  *(string)* : Email del remitente del proceso.
  * **senderIdentification**  *(string)* : Identificación del remitente del proceso.
  * **idTemplate**  *(string)* : ID de la plantilla creada en Autentic.
  * **filenames**  *(array de strings)* : Nombres de los documentos utilizados en la plantilla (deben coincidir con los nombres en Autentic).
  * **ensambled**  *(objeto)* : Campos a llenar en la plantilla.
  * **signers**  *(array de objetos)* : Lista de firmantes del documento.
    * **name**  *(string)* : Nombre del firmante.
    * **lastName**  *(string)* : Apellido del firmante.
    * **identification**  *(string)* : Identificación del firmante.
    * **email**  *(string)* : Correo electrónico del firmante.
    * **phone**  *(string)* : Teléfono del firmante.
    * **roleTemplate**  *(string)* : Rol del firmante en la plantilla.
    * **authMethods**  *(array de strings)* : Métodos de autenticación permitidos (por ejemplo, "OTP").

---

## Consideraciones

* Los documentos en `filenames` deben tener los mismos nombres que los documentos cargados en Autentic.
* Los `form-field-*` en `ensambled` deben coincidir con los campos de la plantilla.
* Es posible agregar múltiples firmantes en el array `signers`.

---

## Autores

* Juan Sebastian Munoz Perez - AFFI S.A.S

## Contacto

Para cualquier consulta, contacta a: [juan.munoz@affi.net](juan.munoz@affi.net)
