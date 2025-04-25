# 📄 Integración de HubSpot con AutenticSign

Esta integración permite generar contratos automáticamente para las vinculaciones en HubSpot utilizando **Workflows** (Webhooks) y la API **Carga Masiva de Autentic** para cargar los procesos.

---

## 🧭 Flujo de Trabajo

### 1. 📥 Crear proceso

**Endpoint:** `POST /api/procesos/asignarProceso`
Permite cargar un proceso para personas **Naturales** o **Jurídicas** en Autentic, enviando un JSON con la estructura requerida.

---

### 📌 Ejemplo JSON - Contrato Persona Natural

```json
{
  "tipo_persona":"Natural",
  "numero_de_contrato": "CON1923423",
  "nombre_persona_natural": "Edgar David Camacho Garcia",
  "ciudad_inmobiliaria": "Bogota",
  "cedula": "1109184892",
  "nombre_representante_legal": "Juan Sebastian Munoz Perez",
  "cedula_representante_legal": "1109184896",
  "nombre_establecimiento_comercio": "AFFI SAS PRUEBA",
  "numero_celular":"+573104056601",
  "correo":"jm0sp1923@gmail.com"
}
```

### 📌 Ejemplo JSON - Contrato Persona Jurídica

```json
{
  "tipo_persona":"Jurídica",
  "numero_de_contrato":"CON109129",
  "nombre_inmobiliaria":"AFFI SAS PRUEBA",
  "ciudad_inmobiliaria": "Bogotá D.C.",
  "nit_inmobiliaria": "9212310123",
  "nombre_representante_legal": "Juan Sebastian Munoz Perez",
  "cedula_representante_legal": "1109184891",
  "ciudad_expedicion": "Bogotá D.C.",
  "numero_celular":"3104056601",
  "correo": "jm0sp1923@gmail.com"
}
```

---

## 🧾 Descripción de Campos

| Nombre                     | Tipo   | Descripción                                                                                   |
| -------------------------- | ------ | ---------------------------------------------------------------------------------------------- |
| tipo_persona               | String | Tipo de persona (**Natural** o **Jurídica**) para la cual se genera el documento. |
| numero_de_contrato         | String | Número de contrato                                                                            |
| nombre_persona_natural     | String | Nombre completo de la persona natural (solo aplica para tipo "Natural")                        |
| ciudad_inmobiliaria        | String | Ciudad de la inmobiliaria                                                                      |
| cedula                     | String | Cédula de la persona natural (solo aplica para tipo "Natural")                                |
| nombre_inmobiliaria        | String | Razón social de la inmobiliaria (solo aplica para tipo "Jurídica")                           |
| nit_inmobiliaria           | String | NIT de la inmobiliaria (solo aplica para tipo "Jurídica")                                     |
| nombre_representante_legal | String | Nombre del representante legal                                                                 |
| cedula_representante_legal | String | Cédula del representante legal                                                                |
| ciudad_expedicion          | String | Ciudad de expedición de la cédula (solo aplica para tipo "Jurídica")                        |
| numero_celular             | String | Número de celular (**+57 opcional**; el sistema lo limpia automáticamente)             |
| correo                     | String | Correo al cual llegará el enlace del proceso para firm                                        |

---

### ✅ Ejemplo de Respuesta Correcta

```json
{
  "massiveProcessingId": "0121c7d9-f0c3-4db8-9f24-ae1e5afbae6a-20250423085935"
}
```

---

### 2. 🔍 Consultar Estado del Proceso

**Endpoint:** `POST /api/procesos/consultarEstadoProceso`

#### 📌 Ejemplo de Entrada

```json
{
  "massiveProcessingId": "0121c7d9-f0c3-4db8-9f24-ae1e5afbae6a-20250423085935"
}
```

#### 📌 Ejemplo de Respuesta

```json
{
  "ProcessEstatus": "UNSIGNED",
  "ProcessId": "a8bf0f87"
}
```

#### 🧾 Descripción de Campos

| Nombre         | Tipo   | Descripción                                                                                                                                                |
| -------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ProcessEstatus | String | Estado actual del proceso:<br />`UNSIGNED`: No ha sido firmado <br />`WAITING_FOR_SIGNATURES`: En espera de firmas <br />`SIGNED`: Proceso finalizado |
| ProcessId      | String | ID del proceso en Autentic                                                                                                                                  |

---

### 3. 📂 Consultar Archivos del Proceso

**Endpoint:** `POST /api/archivos/consultarArchivo`

#### 📌 Ejemplo de Entrada

```json
{
  "processId": "a8bf0f87"
}
```

#### 📌 Ejemplo de Respuesta

```json
{
  "files": [
    {
      "name": "REGLAMENTO_DE_FIANZA_AFFI_8.pdf",
      "buffer": {
        "type": "Buffer",
        "data": []
      }
    },
    {
      "name": "CONTRATO_DE_FIANZA_COLECTIVA_CON000493.pdf",
      "buffer": {
        "type": "Buffer",
        "data": []
      }
    }
  ]
}
```

> Los archivos retornados son objetos `Buffer`, puedes usarlos para cargarlos en HubSpot o permitir su descarga.

---

### 4. Adjuntar Archivos Al Ticket de vinculacion

**Endpoint:** `POST /api/hubspot/procesarArchivo`

#### 📌 Ejemplo de Entrada

```json
{
    "id_vinculacion": 25622756487,
    "nombre_inm": "AFFI PRUEBA",
    "num_contrato": "1239192312",
    "processId": "3e996f9d"
}
```

#### 📌 Ejemplo de Respuesta

```json
{
    "success": true,
    "message": "Proceso completado con algunos errores.",
    "data": [
        {
            "archivo": {
                "id": "189250453341",
                "createdAt": "2025-04-23T16:06:08.723Z",
                "updatedAt": "2025-04-23T16:06:08.723Z",
                "parentFolderId": "187864382023",
                "name": "REGLAMENTO_DE_FIANZA_AFFI_8_AFFI_PRUEBA-3",
                "path": "/Contratos_Fianzas/REGLAMENTO_DE_FIANZA_AFFI_8_AFFI_PRUEBA-3.pdf",
                "size": 260367,
                "type": "DOCUMENT",
                "extension": "pdf",
                "defaultHostingUrl": "https://43918798.fs1.hubspotusercontent-na1.net/hubfs/43918798/Contratos_Fianzas/REGLAMENTO_DE_FIANZA_AFFI_8_AFFI_PRUEBA-3.pdf",
                "url": "https://43918798.fs1.hubspotusercontent-na1.net/hubfs/43918798/Contratos_Fianzas/REGLAMENTO_DE_FIANZA_AFFI_8_AFFI_PRUEBA-3.pdf",
                "isUsableInContent": true,
                "access": "PUBLIC_INDEXABLE",
                "fileMd5": "a47c8df679b36cae3d406d5de39941a6",
                "sourceGroup": "CONTENT",
                "archived": false
            },
            "nota": {
                "id": "77679030178",
                "properties": {
                    "hs_all_accessible_team_ids": "41432309;44993262",
                    "hs_all_owner_ids": "664132265",
                    "hs_all_team_ids": "41432309",
                    "hs_attachment_ids": "189250453341",
                    "hs_body_preview": "Esta nota es creada atravez de la api de hubspot para adjuntar el contrato de autentic",
                    "hs_body_preview_html": "<html>\n <head></head>\n <body>\n Esta nota es creada atravez de la api de hubspot para adjuntar el contrato de autentic\n </body>\n</html>",
                    "hs_body_preview_is_truncated": "false",
                    "hs_createdate": "2025-04-23T16:06:09.001Z",
                    "hs_lastmodifieddate": "2025-04-23T16:06:09.001Z",
                    "hs_note_body": "Esta nota es creada atravez de la api de hubspot para adjuntar el contrato de autentic",
                    "hs_object_coordinates": "0-46-77679030178",
                    "hs_object_id": "77679030178",
                    "hs_object_source": "INTEGRATION",
                    "hs_object_source_id": "8903263",
                    "hs_object_source_label": "INTEGRATION",
                    "hs_timestamp": "1970-01-21T04:50:24.368Z",
                    "hs_user_ids_of_all_owners": "62701319",
                    "hubspot_owner_assigneddate": "2025-04-23T16:06:09.001Z",
                    "hubspot_owner_id": "664132265",
                    "hubspot_team_id": "41432309"
                },
                "createdAt": "2025-04-23T16:06:09.001Z",
                "updatedAt": "2025-04-23T16:06:09.001Z",
                "archived": false
            },
            "vinculacion": {
                "id": "77679030178",
                "properties": {
                    "hs_createdate": "2025-04-23T16:06:09.001Z",
                    "hs_lastmodifieddate": "2025-04-23T16:06:09.001Z",
                    "hs_object_id": "77679030178"
                },
                "createdAt": "2025-04-23T16:06:09.001Z",
                "updatedAt": "2025-04-23T16:06:09.001Z",
                "archived": false,
                "associations": {
                    "p43918798_vinculaciones": {
                        "results": [
                            {
                                "id": "26655435018",
                                "type": "vinculaciones_to_note"
                            }
                        ]
                    }
                }
            }
        },
        {
            "archivo": {
                "id": "189250453343",
                "createdAt": "2025-04-23T16:06:09.595Z",
                "updatedAt": "2025-04-23T16:06:09.595Z",
                "parentFolderId": "187864382023",
                "name": "CONTRATO_DE_FIANZA_COLECTIVA_CON1239192312_AFFI_PRUEBA-2",
                "path": "/Contratos_Fianzas/CONTRATO_DE_FIANZA_COLECTIVA_CON1239192312_AFFI_PRUEBA-2.pdf",
                "size": 353976,
                "type": "DOCUMENT",
                "extension": "pdf",
                "defaultHostingUrl": "https://43918798.fs1.hubspotusercontent-na1.net/hubfs/43918798/Contratos_Fianzas/CONTRATO_DE_FIANZA_COLECTIVA_CON1239192312_AFFI_PRUEBA-2.pdf",
                "url": "https://43918798.fs1.hubspotusercontent-na1.net/hubfs/43918798/Contratos_Fianzas/CONTRATO_DE_FIANZA_COLECTIVA_CON1239192312_AFFI_PRUEBA-2.pdf",
                "isUsableInContent": true,
                "access": "PUBLIC_INDEXABLE",
                "fileMd5": "2312d822408ddd11e73af58ec4c380f6",
                "sourceGroup": "CONTENT",
                "archived": false
            },
            "nota": {
                "id": "77677471373",
                "properties": {
                    "hs_all_accessible_team_ids": "41432309;44993262",
                    "hs_all_owner_ids": "664132265",
                    "hs_all_team_ids": "41432309",
                    "hs_attachment_ids": "189250453343",
                    "hs_body_preview": "Esta nota es creada atravez de la api de hubspot para adjuntar el contrato de autentic",
                    "hs_body_preview_html": "<html>\n <head></head>\n <body>\n Esta nota es creada atravez de la api de hubspot para adjuntar el contrato de autentic\n </body>\n</html>",
                    "hs_body_preview_is_truncated": "false",
                    "hs_createdate": "2025-04-23T16:06:09.865Z",
                    "hs_lastmodifieddate": "2025-04-23T16:06:09.865Z",
                    "hs_note_body": "Esta nota es creada atravez de la api de hubspot para adjuntar el contrato de autentic",
                    "hs_object_coordinates": "0-46-77677471373",
                    "hs_object_id": "77677471373",
                    "hs_object_source": "INTEGRATION",
                    "hs_object_source_id": "8903263",
                    "hs_object_source_label": "INTEGRATION",
                    "hs_timestamp": "1970-01-21T04:50:24.369Z",
                    "hs_user_ids_of_all_owners": "62701319",
                    "hubspot_owner_assigneddate": "2025-04-23T16:06:09.865Z",
                    "hubspot_owner_id": "664132265",
                    "hubspot_team_id": "41432309"
                },
                "createdAt": "2025-04-23T16:06:09.865Z",
                "updatedAt": "2025-04-23T16:06:09.865Z",
                "archived": false
            },
            "vinculacion": {
                "id": "77677471373",
                "properties": {
                    "hs_createdate": "2025-04-23T16:06:09.865Z",
                    "hs_lastmodifieddate": "2025-04-23T16:06:09.865Z",
                    "hs_object_id": "77677471373"
                },
                "createdAt": "2025-04-23T16:06:09.865Z",
                "updatedAt": "2025-04-23T16:06:09.865Z",
                "archived": false,
                "associations": {
                    "p43918798_vinculaciones": {
                        "results": [
                            {
                                "id": "26655435018",
                                "type": "vinculaciones_to_note"
                            }
                        ]
                    }
                }
            }
        }
    ]
}
```

## 🧩 Flujo de Uso Recomendado

1. Llamar a `POST /api/procesos/asignarProceso` con los datos del contrato.
2. Guardar el `massiveProcessingId` recibido.
3. Consultar el estado del proceso con `POST /api/procesos/consultarEstadoProceso`.
4. Adjuntar los archivos relacionados al ticket de vinculacion usando `POST  /api/hubspot/procesarArchivo`.

---

#### 5. Enviar recordatorios

**Endpoint:** `POST /api/hubspot/emailRemender`

Con este endpoint puede mandar recordatorios a los firmantes pendientes del proceso, en este caso a la gerencia comercial y gerencia general.

#### 📌 Ejemplo de Entrada

```json
{
  "numContrato": "CON12903091", 
  "nombreCliente": "SPA GRUPO INMOBILIARIO", 
  "processId": "c2a67f47"
}
```

## 6. Obtener los datos del correo de firmas

**Endpoint:** `POST /api/hubspot/obtenerDatosEmail`

Este endpoint permite obtener los datos del último firmante de un proceso a través del contenido HTML del correo. La idea es procesar el correo para extraer el nombre del firmante y el ID del proceso de firma.

### 📌 Ejemplo de Entrada (HTML)

```html

Proceso de firma completado - Autentic Sign<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">
    <meta content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
  </head>
  <body width="100%" style="margin:0; padding:0!important; background-color:#222222">
    <center style="width:100%; background-color:#F6FAFC">
      <div style="max-width:600px; padding:25px 5px 25px 5px">
        <div style="border:4px solid #F0F4F6; border-radius:12px">
          <table style="border-collapse:collapse; border-radius:8px; overflow:hidden">
            <tbody>
              <tr>
                <td style="background:#1C5B93; color:#FFFFFF; width:600px; font-size:16px; padding:8px 24px; font-family:'Verdana'; font-style:normal; font-weight:700; line-height:26px">
                  Documentos firmados
                </td>
              </tr>
              <tr>
                <td style="background:#FFFFFF; color:#5B6772; padding:8px 24px 8px 24px; font-family:'Verdana'; font-style:normal; font-size:14px; line-height:26px">
                  <div style="margin:0">
                    <p style="margin-bottom:0">
                      <b style="color:#00A18D">¡</b>Hola <b style="text-transform:capitalize">Juan Sebastian Muñoz Perez</b><b style="color:#00A18D">!</b>
                    </p>
                    <p style="margin-bottom:0">El proceso de firma fue completado, haz clic en el botón "Ver documentos".</p>
                    <div style="text-align:center; padding:30px 0px 20px 0px">
                      <a class="button-a button-a-primary" href="https://qafront.autenticsign.com/#/corporate/pb/view-documents-signed/b37356b4/AUTENTICSIGN" style="flex-direction:row; align-items:flex-start; padding:8px 24px; line-height:15px; text-decoration:none; padding:13px 17px; color:#ffffff; background:#00A18D; border-radius:20px">
                        Ver documentos
                      </a>
                    </div>
                  </div>
                  <div style="color:#1C5B93; text-align:center; padding:15px; font-family:'Verdana'; font-style:normal; font-weight:400; font-size:12px; line-height:26px">
                    Fácil, rápida y segura... ¡Así es la firma electrónica!
                  </div>
                  <div style="text-align:right">
                    <img src="https://autentic-sign-multimedia.s3.us-west-2.amazonaws.com/themes/AUTENTIC/LogotipoAutenTIC_Color.png" width="200" alt="alt_text" border="0" style="width:130px; height:auto; font-family:sans-serif; font-size:15px; line-height:15px; color:#555555">
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="padding:12px 2px; text-align:justify; font-family:'Verdana'; font-style:normal; font-weight:400; font-size:10px; line-height:12px; color:#5B6772">
          <p>El presente correo electrónico puede contener información confidencial o legalmente protegida...</p>
          <p>Los datos personales que por medio de este correo se soliciten serán tratados...</p>
        </div>
      </div>
    </center>
  </body>
</html>
Proceso de firma completado - Autentic Sign
```

#### 🧾 Explicacion del funcionamiento

* **Asunto del correo:** El correo tiene un asunto relacionado con "Documentos firmados" o "Notificación de firma en Autentic Sign".
* **Cuerpo del correo:** El contenido contiene detalles del firmante, un enlace para ver los documentos firmados, y el nombre del firmante, en este caso "Juan Sebastian Muñoz Perez".
* **Datos importantes a extraer:**
  * El nombre del firmante: `<b style="text-transform:capitalize">Juan Sebastian Muñoz Perez</b>`
  * El ID del proceso de firma: Se encuentra en el enlace, como `view-documents-signed/b37356b4/AUTENTICSIGN`.

El endpoint es capaz de extraer estos datos del cuerpo HTML del correo y procesarlos para usarlos en la aplicación. Este los guardara en la colection de datos de Mongo con su processId, la fecha y el firmante
