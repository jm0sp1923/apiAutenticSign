const personaJuridicaTemplate = (datos, tarifa_segun_zona, fecha, firmantes) => (
  {

  sendCompletionNotification: true,
  emailForNotification: "juan.rodriguez@affi.net",
  processesTemplate: [
    {
      enterpriseId: "9000533702",
      senderEmail: "juan.rodriguez@affi.net",
      senderIdentification: "1144203293",
      idTemplate: "1cdb9a6a",
      filenames: [
        "MODELO_CONTRATO_FIANZA_COLECTIVA.pdf",
        "REGLAMENTO_DE_FIANZA_AFFI_8.pdf",
      ],
      ensambled: {
        "form-field-wm99j": datos.numero_de_contrato,
        "form-field-966fo": datos.nombre_inmobiliaria + ",",
        "form-field-5648j": datos.ciudad_inmobiliaria,
        "form-field-ex0ib": datos.nit_inmobiliaria,
        "form-field-4ze9d": datos.nombre_representante_legal,
        "form-field-5abvf": datos.cedula_representante_legal,
        "form-field-2s2pa": datos.ciudad_expedicion,
        "form-field-dto19": datos.ciudad_inmobiliaria,
        "form-field-ah01o": datos.ciudad_inmobiliaria + ",",
        "form-field-7uk4i": tarifa_segun_zona,
        "form-field-d0q2o": datos.ciudad_inmobiliaria + ".",
        "form-field-ugrrk": fecha + ".",
        "form-field-4rf7a": datos.nombre_representante_legal,
        "form-field-t2pu8": datos.cedula_representante_legal,
        "form-field-mypy2": datos.nombre_inmobiliaria,
        "form-field-j7dso": datos.nit_inmobiliaria,
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