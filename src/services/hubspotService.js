import axios from "axios";
import FormData from "form-data";
import getValidHubspotToken from "../config/tokenManagerHubspot.js";

let custom_objet_id = "2-27967747";
let type_id_vinculacion_notas = "63";

async function adjuntarArchivoService(id_objeto,id_nota) {
  const token = await getValidHubspotToken();
  let url = `https://api.hubspot.com/crm/v3/objects/notes/${id_nota}/associations/${custom_objet_id}/${id_objeto}/${type_id_vinculacion_notas}`;

  try {
    const response = await axios.put(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Archivo adjuntado con éxito:", response.data);
    return response.data;
  } catch (error) {
    let errorMessage = "Ocurrió un error desconocido.";

    if (error.response) {
      const { status, data } = error.response;
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

    throw new Error(errorMessage);
  }
}

async function crearNotaService(id_file_uploaded) {
  let owner_id = "664132265";
  let token = await getValidHubspotToken();
  let url = `https://api.hubspot.com/crm/v3/objects/notes`;

  let propiedades = {
    properties: {
      hs_timestamp: Math.floor(Date.now() / 1000),
      hubspot_owner_id: owner_id,
      hs_attachment_ids: id_file_uploaded,
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

    console.log(
      JSON.stringify({ success: true, data: response.data }, null, 2)
    );
    return { success: true, data: response.data };
  } catch (error) {
    let errorMessage = "Ocurrió un error desconocido.";

    if (error.response) {
      const { status, data } = error.response;

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

    console.error(
      JSON.stringify({ success: false, error: errorMessage }, null, 2)
    );
    return { success: false, error: errorMessage };
  }
}

async function crearArchivoService(nombre_inm, num_contrato, { name, buffer }) {
  const token = await getValidHubspotToken();
  const formData = new FormData();

  // Limpiar espacios y quitar la extensión .pdf
  const nombreLimpio = name.replace(/\s+/g, "_").replace(".pdf", "");
  const nombreInmuebleLimpio = nombre_inm.replace(/\s+/g, "_");

  // Buscar el prefijo hasta "CON" y reemplazar el número de contrato
  const nuevoNombre = nombreLimpio.replace(/CON\d+$/, `CON${num_contrato}`) + `_${nombreInmuebleLimpio}.pdf`;

  console.log("Nombre contrato autentic: ", nuevoNombre);

  formData.append("file", buffer, nuevoNombre);
  formData.append("options", JSON.stringify({ access: "PUBLIC_INDEXABLE" }));
  formData.append("folderPath", "/Contratos_Fianzas");

  try {
    const response = await axios.post(
      "https://api.hubapi.com/files/v3/files",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          ...formData.getHeaders(),
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
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


export { adjuntarArchivoService, crearArchivoService, crearNotaService };
