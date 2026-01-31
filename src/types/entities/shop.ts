import { IRI, JsonLdResource } from "../hydra";

export interface Shop extends JsonLdResource {
  "@type": "Shop";
  id: number;
  name: string;
  description?: string;
  owner: IRI;
  items: IRI[];
}

/** Shop creation payload */
export interface CreateShopPayload {
  name: string;
  description?: string;
  owner: IRI;
}

/** Shop update payload */
export interface UpdateShopPayload {
  name?: string;
  description?: string;
}
