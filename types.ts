
export interface NutrientRating {
  label: string;
  value: string;
  rating: number; // 1-5
  comment?: string;
}

export interface ProductAnalysis {
  productName: string;
  brand: string;
  numericScore: number; // 0-100
  positives: NutrientRating[];
  negatives: NutrientRating[];
  alternatives: Array<{ name: string; reason: string }>;
}

export interface HistoryItem {
  id: string;
  brand: string;
  productName: string;
  numericScore: number;
  liked: boolean;
  saved: boolean;
  image?: string; // URL or base64 placeholder
}

export interface UserList {
  id: string;
  name: string;
  icon: string; // Emoji or string icon name
  items: HistoryItem[];
  notes: string;
}

export type ViewState = 
  | 'home' 
  | 'scanned_product' 
  | 'product_detail' 
  | 'loading' 
  | 'my_lists' 
  | 'history'
  | 'create_list'
  | 'list_detail'
  | 'profile' 
  | 'settings'
  | 'subscription'
  | 'about'
  | 'contact'
  | 'community' 
  | 'alternatives';
