
export interface Cliente {
  nome: string;
  cpf: string;
  agencia: string;
  conta: string;
  dac: number
}

export interface Conta {
  agencia: string;
  conta: string;
  dac: number
}
