export interface Usuario {
    id: string;
    nombre: string;
    // otras propiedades
  }
  
  export interface Grupo {
    _id: string;
    nombre: string;
    integrantes: Usuario[];
    descripcion?: string;
    presupuesto?: number;
  }

  export interface Gasto {
    id: string;
    nombre: string;
    precio: number;
    fechaVencimiento: string;
    usuarioId: string;
    grupoId: string;
    grupoNombre: string; // Make sure this field is included
  }