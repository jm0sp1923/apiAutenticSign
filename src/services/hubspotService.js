import axios from "axios";
import FormData from "form-data";
import getValidHubspotToken from "../config/tokenManagerHubspot.js";

// ID del objeto personalizado en HubSpot (Vinculaciones)
let custom_objet_id = "2-27967747";

// Tipo de vinculación entre nota y objeto personalizado (tipo específico de relación)
let type_id_vinculacion_notas = "63";

// 👉 Asocia una nota existente con un objeto personalizado en HubSpot
async function adjuntarArchivoService(id_objeto, id_nota) {
  const token = await getValidHubspotToken(); // Se obtiene el token válido de HubSpot

  // URL de la API para asociar la nota con el objeto personalizado
  let url = `https://api.hubspot.com/crm/v3/objects/notes/${id_nota}/associations/${custom_objet_id}/${id_objeto}/${type_id_vinculacion_notas}`;

  try {
    const response = await axios.put(
      url,
      {}, // No se necesita body, solo la URL es suficiente
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Si la asociación es exitosa, se retorna la respuesta
    console.log("✅ Archivo adjuntado con éxito:", response.data);
    return response.data;
  } catch (error) {
    // Manejo de errores
    let errorMessage = "Ocurrió un error desconocido.";

    if (error.response) {
      const { status, data } = error.response;

      // Error específico si no se encuentra el objeto en HubSpot
      if (status === 404 && data?.category === "OBJECT_NOT_FOUND") {
        errorMessage = `El ID del objeto ${
          data.context.id?.[0] || "desconocido"
        } no se encontró en HubSpot.`;
      } else {
        errorMessage = data.message || "Error desconocido en la API.";
      }
    } else {
      errorMessage = error.message;
    }

    throw new Error(errorMessage); // Se lanza el error para manejarlo fuera de esta función
  }
}

// 👉 Crea una nota en HubSpot y la asocia a un archivo previamente subido
async function crearNotaService(id_file_uploaded) {
  let owner_id = "664132265"; // ID del dueño de la nota (usuario de HubSpot en este caso el usuario de lilian)
  let token = await getValidHubspotToken();
  let url = `https://api.hubspot.com/crm/v3/objects/notes`;

  // Propiedades que tendrá la nota
  let propiedades = {
    properties: {
      hs_timestamp: Math.floor(Date.now() / 1000), // Fecha/hora actual en segundos
      hubspot_owner_id: owner_id,
      hs_attachment_ids: id_file_uploaded, // ID del archivo adjunto
      hs_note_body: "Esta nota es creada atravez de la api de hubspot para adjuntar el contrato de autentic",
    },
  };

  try {
    const response = await axios.post(url, propiedades, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Si todo va bien, retorna la nota creada
    console.log(
      JSON.stringify({ success: true, data: response.data }, null, 2)
    );
    return { success: true, data: response.data };
  } catch (error) {
    let errorMessage = "Ocurrió un error desconocido.";

    if (error.response) {
      const { status, data } = error.response;

      // Si el objeto no se encuentra
      if (status === 404 && data?.category === "OBJECT_NOT_FOUND") {
        errorMessage = `El ID del objeto ${
          data.context.id?.[0] || "desconocido"
        } no se encontró en HubSpot.`;
      } else {
        errorMessage = data.message || "Error desconocido en la API.";
      }
    } else {
      errorMessage = error.message;
    }

    // Muestra el error en consola y retorna un objeto indicando el fallo
    console.error(
      JSON.stringify({ success: false, error: errorMessage }, null, 2)
    );
    return { success: false, error: errorMessage };
  }
}

// 👉 Carga un archivo (buffer) a HubSpot y le da un nombre formateado
async function crearArchivoService(nombre_inm, num_contrato, { name, buffer }) {
  const token = await getValidHubspotToken();
  const formData = new FormData();

  // Limpieza del nombre original del archivo
  const nombreLimpio = name.replace(/\s+/g, "_").replace(".pdf", "");
  const nombreInmuebleLimpio = nombre_inm.replace(/\s+/g, "_");

  // Reemplaza el número de contrato y genera el nuevo nombre del archivo
  const nuevoNombre = nombreLimpio.replace(/CON\d+$/, `CON${num_contrato}`) + `_${nombreInmuebleLimpio}.pdf`;

  console.log("Nombre contrato autentic: ", nuevoNombre);

  // Armado del cuerpo de la petición con el archivo
  formData.append("file", buffer, nuevoNombre);
  formData.append("options", JSON.stringify({ access: "PUBLIC_INDEXABLE" })); // Archivo público e indexable
  formData.append("folderPath", "/Contratos_Fianzas"); // Carpeta donde se guardará el archivo

  try {
    const response = await axios.post(
      "https://api.hubapi.com/files/v3/files",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          ...formData.getHeaders(), // Necesario para enviar archivos
        },
      }
    );

    // Retorna la respuesta con el archivo creado
    return { success: true, data: response.data };
  } catch (error) {
    // Manejo de errores
    console.error(
      JSON.stringify(
        { success: false, error: error.response?.data || error.message },
        null,
        2
      )
    );
    return { success: false, error: error.response?.data || error.message };
  }
}

// Exportación de los servicios para ser usados en otros módulos
export { adjuntarArchivoService, crearArchivoService, crearNotaService };