const personaJuridicaTemplate = (datos, tarifa_segun_zona, fecha) => (
  {
    sendCompletionNotification: true,
    emailForNotification: "juan.munoz@affi.net",
    processesTemplate: [
      {
        enterpriseId: "1109184891",
        senderEmail: "juan.munoz@affi.net",
        senderIdentification: "1109184891",
        idTemplate: "c54bc0fe",
        filenames: [
          "MODELO_CONTRATO_FIANZA_COLECTIVA_PERSONA_JURIDICA.pdf",
          "REGLAMENTO_DE_FIANZA_AFFI_8.pdf",
        ],
        ensambled: {
          "form-field-dq61m": datos.numero_de_contrato,
          "form-field-flk1g": datos.nombre_inmobiliaria + ",",
          "form-field-rmf8d": datos.ciudad_inmobiliaria,
          "form-field-28i19": datos.nit_inmobiliaria,
          "form-field-vzp97": datos.nombre_representante_legal,
          "form-field-xoiyg": datos.cedula_representante_legal,
          "form-field-m7ajg": datos.ciudad_expedicion,
          "form-field-hkt3u": datos.ciudad_inmobiliaria,
          "form-field-bjpcn": datos.ciudad_inmobiliaria,
          "form-field-3s1wo": tarifa_segun_zona,
          "form-field-1cquu": datos.ciudad_inmobiliaria + ".",
          "form-field-2ny4j": fecha + ".",
          "form-field-vrp4n": datos.nombre_representante_legal,
          "form-field-uvk3e": datos.cedula_representante_legal,
          "form-field-zfr5h": datos.nombre_inmobiliaria,
          "form-field-yucuv": datos.nit_inmobiliaria,
        },

        "signers":[
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
          },{
            name: datos.nombre_representante_legal,
            lastName: "",
            identification: datos.cedula_representante_legal,
            email: datos.correo,
            phone: datos.numero_celular,
            roleTemplate: "cliente",
            authMethods: ["OTP"],
          }
        ]
      },
    ],
  }
);
  
  export default personaJuridicaTemplate;
  