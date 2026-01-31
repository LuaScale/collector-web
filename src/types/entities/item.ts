import { IRI, JsonLdResource } from "../hydra";

export type ItemStatus = "DRAFT" | "VALIDATED" | "REJECTED";

export interface Item extends JsonLdResource {
  "@type": "Item";
  id: number;
  name: string;
  description: string;
  /** Price in cents */
  price: number;
  status: ItemStatus;
  shop: IRI;
  category: IRI;
  createdAt: string;
}

/** Item creation payload */
export interface CreateItemPayload {
  name: string;
  description: string;
  /** Price in cents */
  price: number;
  status: ItemStatus;
  shop: IRI;
  category: IRI;
}

/** Item update payload */
export interface UpdateItemPayload {
  name?: string;
  description?: string;
  price?: number;
  status?: ItemStatus;
  category?: IRI;
}
