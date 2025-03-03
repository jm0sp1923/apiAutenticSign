import getTokenApi from "./getTokenApi.js";
import obtenerFormatoFecha from "./obtenerFormatoFecha.js";
import tarifaSegunZona from "./tarifaSegunZona.js";
import axios from "axios";
import "dotenv/config";

async function asignarProceso(
  numero_de_contrato,
  nombre_persona_natural,
  ciudad_inmobiliaria,
  cedula,
  nombre_representante_legal,
  cedula_representante_legal,
  nombre_establecimiento_comercio,
  numero_celular,
  correo
) {
  try {
    const token = await getTokenApi();

    //cambiar a fecha dinamica
    let fecha = obtenerFormatoFecha();

    nombre_persona_natural = nombre_persona_natural + ","

    let tarifa_segun_zona = tarifaSegunZona(ciudad_inmobiliaria)  + "%";


    if (!token || typeof token !== "string") {
      console.error("Token inválido");
      throw new Error("No se pudo obtener un token válido.");
    }

    const END_POINT_CARGAR_PROCESO_API_AUTENTIC =
      process.env.END_POINT_API_AUTNETIC_SIGN;

    // ✅ Cuerpo del JSON
    const jsonBody = {
      "sendCompletionNotification": true,
      "emailForNotification": "juan.munoz@affi.net",
      "processesTemplate": [
          {
              "enterpriseId": "1109184891",
              "senderEmail": "juan.munoz@affi.net",
              "senderIdentification": "1109184891",
              "idTemplate": "bef2633f",
              "filenames": [
                  "MODELO_CONTRATO_FIANZA_COLECTIVA_PERSONA_NATURAL.pdf"
              ],
              "ensambled": {
                  "form-field-cv45g": numero_de_contrato,
                  "form-field-uiq5m": nombre_persona_natural,
                  "form-field-c3o2k": ciudad_inmobiliaria,
                  "form-field-10frq": cedula,
                  "form-field-1soga": ciudad_inmobiliaria,
                  "form-field-iqfdr": ciudad_inmobiliaria,
                  "form-field-ymege": tarifa_segun_zona,
                  "form-field-9w2uo": ciudad_inmobiliaria,
                  "form-field-6qp0f": fecha,
                  "form-field-9lc06": nombre_representante_legal,
                  "form-field-fgta8": cedula_representante_legal,
                  "form-field-x5eek": nombre_establecimiento_comercio,
              },
              "signers": [
                {
                  "name": "Lilian Paola",
                  "lastName": "Holguín Orrego",
                  "identification": "1112956229",
                  "email": "jm0sp@yopmail.com",
                  "phone": "",
                  "roleTemplate": "comercial",
                  "authMethods": [
                      "OTP"
                  ]
                },
                  {
                      "name": nombre_representante_legal,
                      "lastName": "",
                      "identification": cedula_representante_legal,
                      "email": correo,
                      "phone": numero_celular,
                      "roleTemplate": "cliente",
                      "authMethods": [
                          "OTP" 
                      ]
                  },
                  {
                    "name": "CESAR AUGUSTO",
                    "lastName": "TEZNA CASTAÑO",
                    "identification": "94492994",
                    "email": "jm0sp1923@yopmail.com",
                    "phone": "",
                    "roleTemplate": "gerencia",
                    "authMethods": [
                        "OTP"
                    ]
                   },
              ]
          }
      ]
  }

    console.log("jsonBody", JSON.stringify(jsonBody,2,null));

    const processResponse = await axios.post(
      END_POINT_CARGAR_PROCESO_API_AUTENTIC,
      jsonBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const massiveProcessingId = processResponse.data.body.massiveProcessingId;

    return massiveProcessingId;
  } catch (error) {
    console.error("Error en asignarProceso:", error.message);
    throw error;
  }
}

export default asignarProceso;
