const personaNaturalTemplate = (datos, tarifa_segun_zona, fecha, firmantes) => ({
  sendCompletionNotification: true,
  emailForNotification: "juan.munoz@affi.net",
  processesTemplate: [
    {
      enterpriseId: "1109184891",
      senderEmail: "juan.munoz@affi.net",
      senderIdentification: "1109184891",
      idTemplate: "bd5a6226",
      filenames: [
        "CONTRATO_DE_FIANZA_COLECTIVA_CON000493.pdf",
        "REGLAMENTO_DE_FIANZA_AFFI_8.pdf"
      ],
      ensambled: {
        "form-field-2cz4k": datos.numero_de_contrato,
        "form-field-y9wyt": datos.nombre_persona_natural + ",",
        "form-field-3xa3u": datos.ciudad_inmobiliaria,
        "form-field-n2u1n": datos.cedula + ",",
        "form-field-c9b5m": datos.ciudad_inmobiliaria,
        "form-field-bhpgg": datos.ciudad_inmobiliaria + ",",
        "form-field-9duzp": tarifa_segun_zona,
        "form-field-6u6q6": datos.ciudad_inmobiliaria + ".",
        "form-field-0ui7z": fecha + ".",
        "form-field-u47m8": datos.nombre_representante_legal,
        "form-field-gaeeb": datos.cedula_representante_legal,
        "form-field-0cr9g": datos.nombre_establecimiento_comercio,
      },
      message: "Aqui el mensaje para los firmantes",
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
          name: firmantes.comercial.name.split(" ")[0],
          lastName: firmantes.comercial.name.split(" ").slice(1).join(" "),
          identification: firmantes.comercial.cc.toString(),
          email: firmantes.comercial.email,
          phone: "",
          roleTemplate: "comercial",
          authMethods: ["OTP"],
        },
        {
          name: firmantes.gerencia.name.split(" ")[0],
          lastName: firmantes.gerencia.name.split(" ").slice(1).join(" "),
          identification: firmantes.gerencia.cc.toString(),
          email: firmantes.gerencia.email,
          phone: "",
          roleTemplate: "gerencia",
          authMethods: ["OTP"],
        }
      ]
    },
  ],
});

export default personaNaturalTemplate;

