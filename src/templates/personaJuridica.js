const personaJuridicaTemplate = (datos, tarifa_segun_zona, fecha, firmantes) => (
  console.log(firmantes),
  {

  sendCompletionNotification: true,
  emailForNotification: "juan.munoz@affi.net",
  processesTemplate: [
    {
      enterpriseId: "1109184891",
      senderEmail: "juan.munoz@affi.net",
      senderIdentification: "1109184891",
      idTemplate: "f78ac86b",
      filenames: [
        "CONTRATO_DE_FIANZA_COLECTIVA_CON000493.pdf",
        "REGLAMENTO_DE_FIANZA_AFFI_8.pdf",
      ],
      ensambled: {
        "form-field-uuhgl": datos.numero_de_contrato,
        "form-field-ue31o": datos.nombre_inmobiliaria + ",",
        "form-field-k78gl": datos.ciudad_inmobiliaria,
        "form-field-hxugu": datos.nit_inmobiliaria,
        "form-field-5zydt": datos.nombre_representante_legal,
        "form-field-8vqfn": datos.cedula_representante_legal,
        "form-field-bc9ta": datos.ciudad_expedicion,
        "form-field-mq442": datos.ciudad_inmobiliaria,
        "form-field-u357b": datos.ciudad_inmobiliaria,
        "form-field-fho6t": tarifa_segun_zona,
        "form-field-dvq9g": datos.ciudad_inmobiliaria + ".",
        "form-field-jtree": fecha + ".",
        "form-field-l09uc": datos.nombre_representante_legal,
        "form-field-v5z2d": datos.cedula_representante_legal,
        "form-field-ysj1b": datos.nombre_inmobiliaria,
        "form-field-wvgnh": datos.nit_inmobiliaria,
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