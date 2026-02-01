import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ItemGrid } from "@/components/items";
import { Pagination } from "@/components/shared";
import { categoriesApi } from "@/lib/api/categories";
import { itemsApi } from "@/lib/api/items";
import { extractPaginationInfo, getCollectionMembers, getCollectionTotalItems } from "@/types/hydra";
import { extractId } from "@/lib/utils/iri";
import { ArrowLeft, Tag } from "lucide-react";
import { CATEGORY_DETAIL_PAGE } from "./constants";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export async function generateMetadata({
  params,
}: Readonly<CategoryPageProps>): Promise<Metadata> {
  const { slug } = await params;
  try {
    const category = await categoriesApi.getBySlug(slug);
    if (!category) {
      return { title: CATEGORY_DETAIL_PAGE.metadata.notFoundTitle };
    }
    return {
      title: category.name,
      description: CATEGORY_DETAIL_PAGE.metadata.description(category.name),
    };
  } catch {
    return { title: CATEGORY_DETAIL_PAGE.metadata.notFoundTitle };
  }
}

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
  searchParams,
}: Readonly<CategoryPageProps>) {
  const { slug } = await params;
  const queryParams = await searchParams;
  const page = queryParams.page ? Number.parseInt(queryParams.page, 10) : CATEGORY_DETAIL_PAGE.api.defaultPage;
  const itemsPerPage = CATEGORY_DETAIL_PAGE.api.itemsPerPage;

  // Fetch category by slug
  let category;
  try {
    category = await categoriesApi.getBySlug(slug);
    if (!category) {
      notFound();
    }
  } catch {
    notFound();
  }

  const categoryId = extractId(category["@id"]);

  // Fetch items in this category
  let itemsResponse;
  try {
    itemsResponse = await itemsApi.list({
      page,
      itemsPerPage,
      category: categoryId,
      status: CATEGORY_DETAIL_PAGE.api.status,
      "order[createdAt]": CATEGORY_DETAIL_PAGE.api.order,
    });
  } catch {
    itemsResponse = null;
  }

  const pagination = itemsResponse
    ? extractPaginationInfo(itemsResponse, itemsPerPage)
    : null;

  return (
    <div className="container py-8">
      {/* Back Link */}
      <Link
        href={CATEGORY_DETAIL_PAGE.backLink.href}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {CATEGORY_DETAIL_PAGE.backLink.text}
      </Link>

      {/* Category Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Tag className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <p className="text-muted-foreground mt-1">
            {itemsResponse
              ? CATEGORY_DETAIL_PAGE.itemsCountMessage(getCollectionTotalItems(itemsResponse))
              : "Chargement des articles..."}
          </p>
        </div>
      </div>

      {/* Items Grid */}
      {itemsResponse ? (
        <>
          <ItemGrid
            items={getCollectionMembers(itemsResponse)}
            emptyMessage={CATEGORY_DETAIL_PAGE.emptyMessage}
          />

          {pagination && pagination.totalPages > 1 && (
            <div className="mt-8">
              <Pagination pagination={pagination} />
            </div>
          )}
        </>
      ) : (
        <p className="text-muted-foreground">
          Impossible de charger les articles. Veuillez réessayer plus tard.
        </p>
      )}
    </div>
  );
}
