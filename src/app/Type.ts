export type Types = {
    name: string; // Maps to 'name' from the query
    description: string; // Maps to 'description' from the query
    image: any; // Maps to 'image' from the query
    slug: string; // Maps to 'slug' from the query
    price: number; // Maps to 'price' from the query
    priceWithoutDiscount?: number; // Optional field from the query
    discountPercentage?: number; // Optional field from the query
    rating?: number; // Optional field from the query
    ratingCount?: number; // Optional field from the query
    tags?: string[]; // Optional field from the query
    sizes?: string[]; // Optional field from the query
    _id: any; // Maps to the product's unique ID (if present)
    quantity: number; // Local field, manually managed
    map:any
    isNew:boolean;
    slogan:string;
  };
  