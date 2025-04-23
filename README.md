
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

| Nombre         | Tipo   | Descripción                                                                                                                |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------- |
| ProcessEstatus | String | Estado actual del proceso:<br />`UNSIGNED`: No ha sido firmado : En espera de firmas <br />`SIGNED`: Proceso finalizado |
| ProcessId      | String | ID del proceso en Autentic                                                                                                  |

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

## 🧩 Flujo de Uso Recomendado

1. Llamar a `POST /api/procesos/asignarProceso` con los datos del contrato.
2. Guardar el `massiveProcessingId` recibido.
3. Consultar el estado del proceso con `POST /api/procesos/consultarEstadoProceso`.
4. Obtener los archivos relacionados usando `POST /api/archivos/consultarArchivo`.
