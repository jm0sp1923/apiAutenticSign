import getTokenApi from "./getTokenApi.js";
import axios from "axios";
import "dotenv/config";
import cambiarWord from "./cambiarWord.js";


function limpiarBase64(base64) {
  const index = base64.indexOf("JVBER");
  return index !== -1 ? base64.substring(index) : base64;
}

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
  const datosContrato = {
    1: numero_de_contrato,
    2: nombre_persona_natural,
    3: ciudad_inmobiliaria,
    4: cedula,
    7: tarifa_segun_zona,
    9: fecha,
    10: nombre_representante_legal,
    11: cedula_representante_legal,
    12: nombre_establecimiento_comercio,
  };

  try {
  
    let pdfConvertBase64 = await cambiarWord(datosContrato);
    
    pdfConvertBase64 = limpiarBase64(pdfConvertBase64);
  

    // Check if PDF conversion is successful
    if (!pdfConvertBase64 || pdfConvertBase64.length < 50) {
      console.error("PDF convertido inválido");
      throw new Error("El archivo PDF convertido no es válido.");
    }

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
              fileName: "test.pdf",
            },
          ],
          subject: "Prueba SIGNER",
          message: "Buen día, remito documento de prueba de firma.",
          order: "",
          expirationDate: "",
        },
      ],
    };



    const token = await getTokenApi();

    if (!token || typeof token !== "string") {
      console.error("Token inválido");
      throw new Error("No se pudo obtener un token válido.");
    }

  
    const END_POINT_CARGAR_PROCESO_API_AUTENTIC =
      process.env.END_POINT_API_AUTNETIC_SIGN;

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
    console.error("Error en asignarProceso:", error.message);  // Log the error in asignarProceso
    throw error;
  }
}


export default asignarProceso;
