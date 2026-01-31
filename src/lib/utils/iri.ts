import { IRI, JsonLdResource } from "@/types/hydra";

/**
 * Extract numeric ID from IRI string
 * @example extractId("/api/items/42") => 42
 */
export function extractId(iri: IRI): number {
  const regex = /\/(\d+)$/;
  const match = regex.exec(iri);
  return match ? Number.parseInt(match[1], 10) : 0;
}

/**
 * Build IRI from resource type and ID
 * @example buildIri("items", 42) => "/api/items/42"
 */
export function buildIri(resource: string, id: number): IRI {
  return `/api/${resource}/${id}`;
}

/**
 * Check if value is IRI (string) or embedded resource
 */
export function isIri(value: IRI | JsonLdResource): value is IRI {
  return typeof value === "string";
}

/**
 * Check if value is an embedded resource
 */
export function isEmbedded<T extends JsonLdResource>(
  value: IRI | T
): value is T {
  return typeof value === "object" && "@id" in value;
}

/**
 * Get ID from either IRI string or embedded resource
 */
export function getId(value: IRI | JsonLdResource): number {
  if (isIri(value)) {
    return extractId(value);
  }
  return extractId(value["@id"]);
}
