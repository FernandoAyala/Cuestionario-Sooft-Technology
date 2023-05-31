export const validaMail = (mail) => {
  // Expresión regular para validar el formato
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(mail).toLowerCase());
};

export const validaNumero = (numero) => {
  // Expresión regular para validar el formato
  const re = /^\+[1-9]\d{1,14}$/;
  return re.test(numero);
};
