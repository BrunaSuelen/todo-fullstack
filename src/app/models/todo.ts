export interface Todo {
  id?: string,
  titulo: string,
  descricao?: string,
  dataParaFinalizar: Date | string,
  finalizado: boolean
}