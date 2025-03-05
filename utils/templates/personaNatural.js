const personaNaturalTemplate = (datos, tarifa_segun_zona, fecha) => ({
    sendCompletionNotification: true,
    emailForNotification: "juan.munoz@affi.net",
    processesTemplate: [
      {
        enterpriseId: "1109184891",
        senderEmail: "juan.munoz@affi.net",
        senderIdentification: "1109184891",
        idTemplate: "bef2633f",
        filenames: ["MODELO_CONTRATO_FIANZA_COLECTIVA_PERSONA_NATURAL.pdf"],
        ensambled: {
          "form-field-cv45g": datos.numero_de_contrato,
          "form-field-uiq5m": datos.nombre_persona_natural + ",",
          "form-field-c3o2k": datos.ciudad_inmobiliaria,
          "form-field-10frq": datos.cedula,
          "form-field-1soga": datos.ciudad_inmobiliaria,
          "form-field-iqfdr": datos.ciudad_inmobiliaria,
          "form-field-ymege": tarifa_segun_zona,
          "form-field-9w2uo": datos.ciudad_inmobiliaria,
          "form-field-6qp0f": fecha + ".",
          "form-field-9lc06": datos.nombre_representante_legal,
          "form-field-fgta8": datos.cedula_representante_legal,
          "form-field-x5eek": datos.nombre_establecimiento_comercio,
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
  });
  
  export default personaNaturalTemplate;
  