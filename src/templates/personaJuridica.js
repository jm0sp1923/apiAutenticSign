//Cambio

const personaJuridicaTemplate = (datos, tarifa_segun_zona, fecha, firmantes) => (
  {

  sendCompletionNotification: true,
  emailForNotification: "juan.rodriguez@affi.net",
  processesTemplate: [
    {
      enterpriseId: "9000533702",
      senderEmail: "juan.rodriguez@affi.net",
      senderIdentification: "1144203293",
      idTemplate: "6471e6e8",
      filenames: [
        "CONTRATO_FIANZA_COLECTIVA.pdf",
        "REGLAMENTO_DE_FIANZA_AFFI_8.pdf",
      ],
      ensambled: {
        "form-field-fimfo": datos.numero_de_contrato,
        "form-field-lqn05": datos.nombre_inmobiliaria + ",",
        "form-field-i7obl": datos.ciudad_inmobiliaria,
        "form-field-bi74u": datos.nit_inmobiliaria,
        "form-field-pvtmj": datos.nombre_representante_legal,
        "form-field-9xhuf": datos.cedula_representante_legal,
        "form-field-p9pkp": datos.ciudad_expedicion,
        "form-field-4gtqe": datos.ciudad_inmobiliaria,
        "form-field-e59l5": datos.ciudad_inmobiliaria + ",",
        "form-field-ig5qq": tarifa_segun_zona,
        "form-field-hi6mc": datos.ciudad_inmobiliaria + ".",
        "form-field-mpnn8": fecha + ".",
        "form-field-f7dj8": datos.nombre_representante_legal,
        "form-field-az5bk": datos.cedula_representante_legal,
        "form-field-v593b": datos.nombre_inmobiliaria,
        "form-field-gahpv": datos.nit_inmobiliaria,
      },
      signers: [
        {
          name: datos.nombre_representante_legal,
          lastName: "",
          identification: datos.cedula_representante_legal,
          email: datos.correo,
          phone: datos.numero_celular || "",
          roleTemplate: "cliente",
          authMethods: ["OTP"],
        },
        {
          name: firmantes.comercial.name, // "Lilian Paola"
          lastName: firmantes.comercial.last_name, // "Holguín Orrego"
          identification: firmantes.comercial.cc.toString(),
          email: firmantes.comercial.email,
          phone: "",
          roleTemplate: "comercial",
          authMethods: ["OTP"],
        },
        {
          name: firmantes.gerencia.name, // "Cesar Augusto"
          lastName: firmantes.gerencia.last_name, // "Tezna Castaño"
          identification: firmantes.gerencia.cc.toString(),
          email: firmantes.gerencia.email,
          phone: "",
          roleTemplate: "gerencia",
          authMethods: ["OTP"],
        },
      ]
    },
  ],
});

export default personaJuridicaTemplate;