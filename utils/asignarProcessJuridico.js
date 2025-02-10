import getTokenApi from "./getTokenApi.js";
import axios from "axios";
import "dotenv/config";
import replaceTextInWord from "./cambiarWord.js";
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
  fecha
) {
  const datosContrato = {
    NUMERO_CONTRATO: numero_de_contrato,
    NOMBRE_INMOBILIARIA: nombre_inmobiliaria,
    CIUDAD_INMOBILIARIA: ciudad_inmobiliaria,
    NIT_INMOBILIARIA: nit_inmobiliaria,
    NOMBRE_REPRESENTANTE_LEGAL: nombre_representante_legal,
    CEDULA_REPRESENTANTE_LEGAL: cedula_representante_legal,
    CIUDAD_EXPEDICION: ciudad_expedicion,
    TARIFA_SEGUN_ZONA: tarifa_segun_zona,
    FECHA: fecha,
  };

  try {
    let pdfConvertBase64 = await replaceTextInWord(
      inputFile,
      outputFile,
      datosContrato
    );

    // Check if PDF conversion is successful
    if (pdfConvertBase64.indexOf("JVBER") === -1) {
      console.error("PDF convertido inválido");
      throw new Error("El archivo PDF convertido no es válido.");
    }

    const token = await getTokenApi();

    if (!token || typeof token !== "string") {
      console.error("Token inválido");
      throw new Error("No se pudo obtener un token válido.");
    }

    const END_POINT_CARGAR_PROCESO_API_AUTENTIC =
      process.env.END_POINT_API_AUTNETIC_SIGN;

    // ✅ Cuerpo del JSON
    const jsonBody = {
      sendCompletionNotification: true,
      emailForNotification: "juan.munoz@affi.net",
      processes: [
        {
          enterpriseId: "9000533702",
          senderEmail: "juan.munoz@affi.net",
          senderIdentification: "1109184891",
          signers: [
            {
              name: nombre_representante_legal,
              documentType: "CC",
              identification: cedula_representante_legal,
              email: correo,
              phone: numero_celular,
              role: "SIGNER",
              authMethods: ["OTP"],
            },
          ],
          documents: [
            {
              content: pdfConvertBase64,
              fileName: "CONTRATO FIANZA COLECTIVA.pdf",
            },
          ],
          subject: "Firma de contrato",
          message: "Buen día, remito documento de prueba de firma.",
          order: "",
          expirationDate: "",
          sendEmail: true,
        },
      ],
    };

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
