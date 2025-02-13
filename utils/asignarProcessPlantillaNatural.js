import getTokenApi from "./getTokenApi.js";
import axios from "axios";
import "dotenv/config";

async function asignarProceso(
  numero_de_contrato,
  nombre_persona_natural,
  ciudad_inmobiliaria,
  cedula,
  tarifa_segun_zona,
  fecha,
  nombre_representante_legal,
  cedula_representante_legal,
  nombre_establecimiento_comercio,
  numero_celular,
  correo
) {
  try {
    const token = await getTokenApi();

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
              "idTemplate": "d53e5632",
              "filenames": [
                  "MODELO_CONTRATO_FIANZA_COLECTIVA_PERSONA_NATURAL.pdf"
              ],
              "ensambled": {
                  "form-field-22aol": numero_de_contrato,
                  "form-field-dn0c8": nombre_persona_natural,
                  "form-field-l4k56": ciudad_inmobiliaria,
                  "form-field-fcpsp": cedula,
                  "form-field-m3idc": ciudad_inmobiliaria,
                  "form-field-qv90o": ciudad_inmobiliaria,
                  "form-field-liitp": tarifa_segun_zona,
                  "form-field-yv1qd": ciudad_inmobiliaria,
                  "form-field-4rdkt": fecha,
                  "form-field-uvur4": nombre_representante_legal,
                  "form-field-7y34y": cedula_representante_legal,
                  "form-field-tl4la": nombre_establecimiento_comercio,
              },
              "signers": [
                  {
                      "name": "CESAR AUGUSTO",
                      "lastName": " TEZNA CASTAÑO",
                      "identification": "000011112",
                      "email": "juan.munoz.p@correounivalle.edu.co",
                      "phone": "",
                      "roleTemplate": "gerencia",
                      "authMethods": [
                          "OTP"
                      ]
                  },
                  {
                    "name": "Lilian Paola",
                    "lastName": "Holguín Orrego",
                    "identification": "1112956229",
                    "email": "parejamayra197@gmail.com",
                    "phone": "",
                    "roleTemplate": "comercial",
                    "authMethods": [
                        "OTP"
                    ]
                },
                  {
                      "name": nombre_representante_legal,
                      "lastName": "Dos",
                      "identification": cedula_representante_legal,
                      "email": correo,
                      "phone": numero_celular,
                      "roleTemplate": "cliente",
                      "authMethods": [
                          "OTP"
                      ]
                  }
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
