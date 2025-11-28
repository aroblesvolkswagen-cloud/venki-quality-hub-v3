export interface Ingredient {
  name: string;
  substitution: string;
  amount: string;
  notes?: string;
  time?: string;
  use?: string;
  alternatives?: string[];
}

export interface RecipeStats {
  OG: string;
  FG: string;
  ABV: string;
  IBU: string;
  SRM: string;
}

export interface RecipeVariant {
  title: 'Receta Clásica' | 'Receta Competitiva' | 'Receta Experimental';
  style: string;
  batchSizeLiters: number;
  efficiency: number;
  vessels: number;
  stats: RecipeStats;
  ingredients: Ingredient[];
  mashSchedule: string[];
  boilTime: string;
  fermentation: string;
  waterProfile: string;
  packaging: string;
  tips: string[];
}

export interface RecipeResponse {
  mashSchedule: string[];
  waterProfile: string;
  fermentationStrategy: string;
  expertSuggestions: string[];
  variations: RecipeVariant[];
}

export interface UserInput {
  style: string;
  profile: string;
  reference: string;
}
