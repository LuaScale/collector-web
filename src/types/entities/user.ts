import { IRI, JsonLdResource } from "../hydra";

export interface User extends JsonLdResource {
  "@type": "User";
  id: number;
  email: string;
  pseudo: string;
  phoneNumber?: string;
  isVerified: boolean;
  roles: string[];
  shops: IRI[];
}

/** User creation payload */
export interface CreateUserPayload {
  email: string;
  pseudo: string;
  password: string;
  phoneNumber?: string;
}

/** User update payload */
export interface UpdateUserPayload {
  pseudo?: string;
  phoneNumber?: string;
  password?: string;
}
