import getTokenApi from "./getTokenApi.js";
import axios from "axios";
import "dotenv/config";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Rutas de los archivos
const inputFile = join(
  __dirname,
  "..",
  "public",
  "MODELO CONTRATO FIANZA COLECTIVA PERSONA JURIDICA.docx"
);

const outputFile = join(__dirname, "..", "public", "contrato_generado.docx");

async function asignarProceso(
  numero_de_contrato,
      nombre_inmobiliaria,
      ciudad_inmobiliaria,
      nit_inmobiliaria,
      nombre_representante_legal,
      cedula_representante_legal,
      ciudad_expedicion,
      tarifa_segun_zona,
      numero_celular,
      correo,
) {
  try {

    //cambiar a fecha dinamica
    let fecha = "Diez y nueve (19) AGOSTO de 2024";
    nombre_inmobiliaria = nombre_inmobiliaria + ","
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
                      "email": "",
                      "phone": "3104056601",
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
                      //"phone": numero_celular,
                      "roleTemplate": "cliente",
                      "authMethods": [
                          "OTP"
                      ]
                  },{
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
              ]
          }
      ]
  }
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
