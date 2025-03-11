import axios from "axios";
import refreshAccessToken from "./getTokenhubspot.js";

const token = await refreshAccessToken();

let id_nota = "74658084508";
let custom_objet_id = "2-27967747";
let id_del_objeto_vinculacion = "25054422630";
let type_id_vinculacion_notas = "63";

console.log(`✅ New Access Token: ${token}`);

let url = `https://api.hubspot.com/crm/v3/objects/notes/${id_nota}/associations/${custom_objet_id}/${id_del_objeto_vinculacion}/${type_id_vinculacion_notas}`;

async function asociarNotaConVinculacion() {
    try {
        const response = await axios.put(url, {}, {  
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        console.log(JSON.stringify({ success: true, data: response.data }, null, 2));
        return { success: true, data: response.data };
    } catch (error) {
        console.error(JSON.stringify({ success: false, error: error.response?.data || error.message }, null, 2));
        return { success: false, error: error.response?.data || error.message };
    }
}

asociarNotaConVinculacion();

export default asociarNotaConVinculacion;
