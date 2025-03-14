import axios from "axios";
import getValidHubspotToken from "../config/tokenManagerHubspot.js";

const token = await getValidHubspotToken();



let propiedades = {
  properties: {
    hs_timestamp: Math.floor(Date.now() / 1000),
    hubspot_owner_id: owner_id,
    hs_attachment_ids: id_file_uploaded,
    hs_note_body: "Esta es una nota de prueba y puede ser cualquier cosa",
  },
};

async function crearNota() {
 
}

crearNota();

export default crearNota;
