export function validateCPF(cpf: string): boolean {
  // Remove non-digit characters from the CPF
  cpf = cpf.replace(/\D/g, "");

  // CPF must have 11 digits
  if (cpf.length !== 11) {
    return false;
  }

  // Check if all digits are the same
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Validate the first digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === parseInt(cpf.charAt(9))) {
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === parseInt(cpf.charAt(10))) {
      return true;
    }
  }

  return false;
}
