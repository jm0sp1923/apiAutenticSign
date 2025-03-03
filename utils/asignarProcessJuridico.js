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
              "idTemplate": "73be14dd",
              "filenames": [
                  "MODELO_CONTRATO_FIANZA_COLECTIVA_PERSONA_JURIDICA.pdf"
              ],
              "ensambled": {
                  "form-field-rc141": numero_de_contrato,
                  "form-field-niafs": nombre_inmobiliaria,
                  "form-field-jw5xr": ciudad_inmobiliaria,
                  "form-field-4poiq": nit_inmobiliaria,
                  "form-field-lnpuu": nombre_representante_legal,
                  "form-field-6pf6d": cedula_representante_legal,
                  "form-field-b2822": ciudad_expedicion,
                  "form-field-742n9": ciudad_inmobiliaria,
                  "form-field-umtxa": ciudad_inmobiliaria,
                  "form-field-4esxf": tarifa_segun_zona,
                  "form-field-d95f7": ciudad_inmobiliaria,
                  "form-field-044t9": fecha,
                  "form-field-rvonu": nombre_representante_legal,
                  "form-field-6itjq": cedula_representante_legal,
                  "form-field-j4i39": nombre_inmobiliaria,
                  "form-field-ngeyo": nit_inmobiliaria

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
