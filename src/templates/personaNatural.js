const personaNaturalTemplate = (datos, tarifa_segun_zona, fecha) => ({
    sendCompletionNotification: true,
    emailForNotification: "juan.munoz@affi.net",
    processesTemplate: [
      {
        enterpriseId: "1109184891",
        senderEmail: "juan.munoz@affi.net",
        senderIdentification: "1109184891",
        idTemplate: "9ab13639",
        filenames: [
          "MODELO_CONTRATO_FIANZA_COLECTIVA_PERSONA_NATURAL.pdf",
          "REGLAMENTO_DE_FIANZA_AFFI_8.pdf" 
      ],
        ensambled: {
          "form-field-xotsu": datos.numero_de_contrato,
          "form-field-pnejp": datos.nombre_persona_natural + ",",
          "form-field-vq80v": datos.ciudad_inmobiliaria,
          "form-field-ath0c": datos.cedula+ ",",
          "form-field-r5pvh": datos.ciudad_inmobiliaria,
          "form-field-am4fl": datos.ciudad_inmobiliaria+ ",",
          "form-field-hwi7w": tarifa_segun_zona,
          "form-field-liy2e": datos.ciudad_inmobiliaria + ".",
          "form-field-7qhe8": fecha + ".",
          "form-field-de94q": datos.nombre_representante_legal,
          "form-field-6jmxw": datos.cedula_representante_legal,
          "form-field-n3klb": datos.nombre_establecimiento_comercio,
        },
        "signers":[
          {
            name: datos.nombre_representante_legal,
            lastName: "",
            identification: datos.cedula_representante_legal,
            email: datos.correo,
            phone: datos.numero_celular,
            roleTemplate: "cliente",
            authMethods: ["OTP"],
          },
          {
            name: "Lilian Paola",
            lastName: "Holguín Orrego",
            identification: "1112956229",
            email: "juan.rodriguez@affi.net",
            phone: "",
            roleTemplate: "comercial",
            authMethods: ["OTP"],
          },
          {
            name: "CESAR AUGUSTO",
            lastName: "TEZNA CASTAÑO",
            identification: "94492994",
            email: "edgar.camacho@affi.net",
            phone: "",
            roleTemplate: "gerencia",
            authMethods: ["OTP"],
          }
        ]
      },
    ],
  });
  
  export default personaNaturalTemplate;
  