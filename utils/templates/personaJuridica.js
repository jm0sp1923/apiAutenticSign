const personaJuridicaTemplate = (datos, tarifa_segun_zona, fecha) => (
  {
    sendCompletionNotification: true,
    emailForNotification: "juan.munoz@affi.net",
    processesTemplate: [
      {
        enterpriseId: "1109184891",
        senderEmail: "juan.munoz@affi.net",
        senderIdentification: "1109184891",
        idTemplate: "05dc0ea5",
        filenames: [
          "MODELO_CONTRATO_FIANZA_COLECTIVA_PERSONA_JURIDICA.pdf",
          "REGLAMENTO_DE_FIANZA_AFFI_8.pdf",
        ],
        ensambled: {
          "form-field-dq61m": datos.numero_de_contrato,
          "form-field-w7gaf": datos.nombre_inmobiliaria + ",",
          "form-field-tj18i": datos.ciudad_inmobiliaria,
          "form-field-9kuz7": datos.nit_inmobiliaria,
          "form-field-f41g6": datos.nombre_representante_legal,
          "form-field-5jz1d": datos.cedula_representante_legal,
          "form-field-zmzly": datos.ciudad_expedicion,
          "form-field-oe5v4": datos.ciudad_inmobiliaria,
          "form-field-am9fi": datos.ciudad_inmobiliaria,
          "form-field-egt2m": tarifa_segun_zona,
          "form-field-x3yic": datos.ciudad_inmobiliaria + ".",
          "form-field-dh5hi": fecha + ".",
          "form-field-45wih": datos.nombre_representante_legal,
          "form-field-z1b7p": datos.cedula_representante_legal,
          "form-field-wcgao": datos.nombre_inmobiliaria,
          "form-field-e187r": datos.nit_inmobiliaria,
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
            email: "jm0sp@yopmail.com",
            phone: "",
            roleTemplate: "comercial",
            authMethods: ["OTP"],
          },
          {
            name: "CESAR AUGUSTO",
            lastName: "TEZNA CASTAÑO",
            identification: "94492994",
            email: "jm0sp1923@yopmail.com",
            phone: "",
            roleTemplate: "gerencia",
            authMethods: ["OTP"],
          }
        ]
      },
    ],
  }
);
  
  export default personaJuridicaTemplate;
  