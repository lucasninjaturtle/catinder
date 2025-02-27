export interface Weight {
    imperial: string;
    metric: string;
  }

  export interface Breed {
    id: string;
    name: string;
    weight: Weight;
    origin: string;
    temperament: string;
    description: string;
    life_span: string;
    adaptability: number;
    affection_level: number;
    child_friendly: number;
    dog_friendly: number;
    energy_level: number;
    grooming: number;
    health_issues: number;
    intelligence: number;
    shedding_level: number;
    social_needs: number;
    stranger_friendly: number;
    vocalisation: number;
    reference_image_id?: string;
    wikipedia_url?: string;
    vetstreet_url?: string;
    vcahospitals_url?: string;
  }

  export interface Category {
    id: number;
    name: string;
  }

  export interface Cat {
    id: string;
    url: string;
    width: number;
    height: number;
    mime_type?: string;
    breeds: Breed[];
    categories?: Category[];
  }
