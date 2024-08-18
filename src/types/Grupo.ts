export interface Usuario {
    id: string;
    nombre: string;
    // otras propiedades
  }
  
  export interface Grupo {
    id: string;
    nombre: string;
    integrantes: Usuario[];
    descripcion?: string;
    presupuesto?: number;
  }
