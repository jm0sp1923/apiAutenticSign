const personaNaturalTemplate = (datos, tarifa_segun_zona, fecha, firmantes) => ({
  sendCompletionNotification: true,
  emailForNotification: "juan.munoz@affi.net",
  processesTemplate: [
    {
      enterpriseId: "9000533702",
      senderEmail: "juan.rodriguez@affi.net",
      senderIdentification: "1144203293",
      idTemplate: "056321ad",
      filenames: [
        "MODELO_CONTRATO_FIANZA_COLECTIVA.pdf",
        "REGLAMENTO_DE_FIANZA_AFFI_8.pdf"
      ],
      ensambled: {
        "form-field-phucx": datos.numero_de_contrato,
        "form-field-90029": datos.nombre_persona_natural + ",",
        "form-field-8mwcv": datos.ciudad_inmobiliaria,
        "form-field-sx3vc": datos.cedula + ",",
        "form-field-nc4px": datos.ciudad_inmobiliaria + ",",
        "form-field-d7axy": datos.ciudad_inmobiliaria + ",",
        "form-field-j3wgh": tarifa_segun_zona,
        "form-field-znwjv": datos.ciudad_inmobiliaria + ".",
        "form-field-lgfsu": fecha + ".",
        "form-field-6q3ls": datos.nombre_representante_legal,
        "form-field-3ngru": datos.cedula_representante_legal,
        "form-field-x820g": datos.nombre_establecimiento_comercio,
      },
      message: "",
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
          name: firmantes.comercial.name,
          lastName: firmantes.comercial.last_name,
          identification: firmantes.comercial.cc.toString(),
          email: firmantes.comercial.email,
          phone: "",
          roleTemplate: "comercial",
          authMethods: ["OTP"],
        },
        {
          name: firmantes.gerencia.name,
          lastName: firmantes.gerencia.last_name,
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

