import getTokenApi from "./getTokenApi.js";
import obtenerFormatoFecha from "./obtenerFormatoFecha.js";
import tarifaSegunZona from "./tarifaSegunZona.js";
import axios from "axios";
import "dotenv/config";

async function asignarProceso(
  numero_de_contrato,
  nombre_inmobiliaria,
  ciudad_inmobiliaria,
  nit_inmobiliaria,
  nombre_representante_legal,
  cedula_representante_legal,
  ciudad_expedicion,
  numero_celular,
  correo
) {
  try {
    //cambiar a fecha dinamica
    let fecha = obtenerFormatoFecha();
    nombre_inmobiliaria = nombre_inmobiliaria + ",";
    const token = await getTokenApi();

    if (!token || typeof token !== "string") {
      console.error("Token inválido");
      throw new Error("No se pudo obtener un token válido.");
    }

    let tarifa_segun_zona = tarifaSegunZona(ciudad_inmobiliaria) + "%";
    


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
              "idTemplate": "f5fec65f",
              "filenames": [
                  "MODELO_CONTRATO_FIANZA_COLECTIVA_PERSONA_JURIDICA.pdf"
              ],
              "ensambled": {
                  "form-field-o2mje": numero_de_contrato,
                  "form-field-mtsnf": nombre_inmobiliaria,
                  "form-field-yonr9": ciudad_inmobiliaria,
                  "form-field-isyqe": nit_inmobiliaria,
                  "form-field-k38wo": nombre_representante_legal,
                  "form-field-5begt": cedula_representante_legal,
                  "form-field-qvx3d": ciudad_expedicion,
                  "form-field-owey4": ciudad_inmobiliaria,
                  "form-field-lqb05": ciudad_inmobiliaria,
                  "form-field-3kvqd": tarifa_segun_zona,
                  "form-field-lhgqh": ciudad_inmobiliaria,
                  "form-field-qh3t8": fecha,
                  "form-field-49a9c": nombre_representante_legal,
                  "form-field-ql6wr": cedula_representante_legal,
                  "form-field-4cmic": nombre_inmobiliaria,
                  "form-field-syil7": nit_inmobiliaria

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
                      "lastName": "Prueba",
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

    console.log("jsonBody", JSON.stringify(jsonBody, 2, null));

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
