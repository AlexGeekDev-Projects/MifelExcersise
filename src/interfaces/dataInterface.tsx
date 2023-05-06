export interface DataInterface {
  pagination: Pagination;
  results: Result[];
}

export interface Pagination {
  pageSize: number;
  page: number;
  total: number;
}

export interface Result {
  _id: string;
  date_insert: Date;
  slug: string;
  columns: string;
  fact: string;
  organization: string;
  resource: string;
  url: string;
  operations: Operations;
  dataset: string;
  created_at: number;
}

export enum Operations {
  ConteoEnMapa = 'Conteo en Mapa',
  InterpretaciónGráfica = 'Interpretación gráfica',
  OperationsTabla = 'Tabla',
  ProcedimientoEnBash = 'Procedimiento en Bash',
  ProcedimientoEnR = 'Procedimiento en R',
  RutinaDeR = 'Rutina de R',
  RutinaEnR = 'Rutina en R',
  Tabla = 'tabla',
}
