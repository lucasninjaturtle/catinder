export interface Breed {
    id: number;
    name: string;
    weight: string;
    height: string;
    life_span: string;
    breed_group?: string; // Algunas razas pueden no tener grupo
}

export interface Cat {
    id: string;
    url: string;
    width: number;
    height: number;
    mime_type: string;
    breeds: Breed[];
    categories?: string[]; // La API puede devolver categorías opcionales
}
