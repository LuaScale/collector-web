/**
 * Hydra/JSON-LD Type Definitions
 * For Symfony API Platform integration
 */

/** Base JSON-LD resource */
export type IRI = string;

export interface JsonLdResource {
  "@id": IRI;
  "@type": string;
  "@context"?: string | Record<string, unknown>;
}

/** 
 * Hydra paginated collection 
 * Supports both prefixed (hydra:member) and non-prefixed (member) formats
 */
export interface HydraCollection<T> extends JsonLdResource {
  "@type": "hydra:Collection" | "Collection";
  // Prefixed format (standard Hydra)
  "hydra:member"?: T[];
  "hydra:totalItems"?: number;
  "hydra:view"?: HydraView;
  "hydra:search"?: HydraSearch;
  // Non-prefixed format (API Platform default)
  "member"?: T[];
  "totalItems"?: number;
  "view"?: HydraView;
  "search"?: HydraSearch;
}

/** Helper to get members from collection (handles both formats) */
export function getCollectionMembers<T>(collection: HydraCollection<T>): T[] {
  return collection["hydra:member"] ?? collection["member"] ?? [];
}

/** Helper to get total items from collection (handles both formats) */
export function getCollectionTotalItems<T>(collection: HydraCollection<T>): number {
  return collection["hydra:totalItems"] ?? collection["totalItems"] ?? 0;
}

/** Helper to get view from collection (handles both formats) */
export function getCollectionView<T>(collection: HydraCollection<T>): HydraView | undefined {
  return collection["hydra:view"] ?? collection["view"];
}

/** Hydra pagination view */
export interface HydraView {
  "@id": string;
  "@type": "hydra:PartialCollectionView";
  "hydra:first"?: string;
  "hydra:last"?: string;
  "hydra:next"?: string;
  "hydra:previous"?: string;
}

/** Hydra search template */
export interface HydraSearch {
  "@type": "hydra:IriTemplate";
  "hydra:template": string;
  "hydra:variableRepresentation": string;
  "hydra:mapping": HydraMapping[];
}

export interface HydraMapping {
  "@type": "IriTemplateMapping";
  variable: string;
  property: string;
  required: boolean;
}

/** API validation error */
export interface HydraError {
  "@context": string;
  "@type": "hydra:Error";
  "hydra:title": string;
  "hydra:description": string;
  violations?: HydraViolation[];
}

export interface HydraViolation {
  propertyPath: string;
  message: string;
  code?: string;
}

/** Pagination info extracted from Hydra view */
export interface PaginationInfo {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/** Extract pagination info from Hydra collection */
export function extractPaginationInfo<T>(
  collection: HydraCollection<T>,
  itemsPerPage: number = 30
): PaginationInfo {
  const totalItems = getCollectionTotalItems(collection);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const view = getCollectionView(collection);

  // Extract current page from view @id
  let currentPage = 1;
  if (view?.["@id"]) {
    const regex = /page=(\d+)/;
    const match = regex.exec(view["@id"]);
    if (match) {
      currentPage = Number.parseInt(match[1], 10);
    }
  }

  return {
    currentPage,
    totalItems,
    itemsPerPage,
    totalPages,
    hasNext: !!view?.["hydra:next"],
    hasPrevious: !!view?.["hydra:previous"],
  };
}
