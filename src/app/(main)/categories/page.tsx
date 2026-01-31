import { Metadata } from "next";
import { CategoryGrid } from "@/components/categories";
import { Pagination } from "@/components/shared";
import { categoriesApi } from "@/lib/api/categories";
import { extractPaginationInfo, HydraCollection, getCollectionMembers, getCollectionTotalItems } from "@/types/hydra";
import { Category } from "@/types/entities/category";
import { CATEGORIES_PAGE } from "./constants";

export const metadata: Metadata = {
  title: CATEGORIES_PAGE.metadata.title,
  description: CATEGORIES_PAGE.metadata.description,
};

export const dynamic = "force-dynamic";

interface CategoriesPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

async function getCategories(
  page: number,
  itemsPerPage: number
): Promise<HydraCollection<Category> | null> {
  try {
    return await categoriesApi.list({
      page,
      itemsPerPage,
    });
  } catch {
    return null;
  }
}

export default async function CategoriesPage({
  searchParams,
}: Readonly<CategoriesPageProps>) {
  const params = await searchParams;
  const page = params.page ? Number.parseInt(params.page, 10) : CATEGORIES_PAGE.config.defaultPage;
  const itemsPerPage = CATEGORIES_PAGE.config.itemsPerPage;

  const response = await getCategories(page, itemsPerPage);

  if (!response) {
    return (
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{CATEGORIES_PAGE.heading}</h1>
          <p className="text-muted-foreground mt-2">
            {CATEGORIES_PAGE.messages.error}
          </p>
        </div>
      </div>
    );
  }

  const pagination = extractPaginationInfo(response, itemsPerPage);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{CATEGORIES_PAGE.heading}</h1>
        <p className="text-muted-foreground mt-2">
          {CATEGORIES_PAGE.messages.categoriesCount(getCollectionTotalItems(response))}
        </p>
      </div>

      <CategoryGrid categories={getCollectionMembers(response)} />

      {pagination.totalPages > 1 && (
        <div className="mt-8">
          <Pagination pagination={pagination} />
        </div>
      )}
    </div>
  );
}
