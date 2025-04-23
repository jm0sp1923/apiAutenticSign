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

> Los archivos retornados son objetos `Buffer`, puedes usarlos para cargarlos en HubSpot o permitir su descarga.

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
