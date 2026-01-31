import { IRI, JsonLdResource } from "../hydra";

export interface Category extends JsonLdResource {
  "@type": "Category";
  id: number;
  name: string;
  slug: string;
  items: IRI[];
}

/** Category creation payload */
export interface CreateCategoryPayload {
  name: string;
  slug: string;
}

/** Category update payload */
export interface UpdateCategoryPayload {
  name?: string;
  slug?: string;
}
