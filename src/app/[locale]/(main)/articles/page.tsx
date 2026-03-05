import { Metadata } from "next";
import { ItemGrid } from "@/components/items";
import { Pagination } from "@/components/shared";
import { itemsApi } from "@/lib/api/items";
import { extractPaginationInfo, HydraCollection, getCollectionMembers, getCollectionTotalItems } from "@/types/hydra";
import { Item } from "@/types/entities/item";
import { ARTICLES_PAGE } from "./constants";

export const metadata: Metadata = {
  title: ARTICLES_PAGE.metadata.title,
  description: ARTICLES_PAGE.metadata.description,
};

export const dynamic = "force-dynamic";

interface ArticlesPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
  }>;
}

async function getItems(page: number, itemsPerPage: number, categoryId?: number): Promise<HydraCollection<Item> | null> {
  try {
    const response = await Promise.race([
      itemsApi.list({
        page,
        itemsPerPage,
        status: ARTICLES_PAGE.config.status,
        "order[createdAt]": ARTICLES_PAGE.config.order,
        category: categoryId,
      }),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Items fetch timeout")), 7000);
      }),
    ]);

    return response;
  } catch {
    return null;
  }
}

export default async function ArticlesPage({ searchParams }: Readonly<ArticlesPageProps>) {
  const params = await searchParams;
  const page = params.page ? Number.parseInt(params.page, 10) : ARTICLES_PAGE.config.defaultPage;
  const itemsPerPage = ARTICLES_PAGE.config.itemsPerPage;

  const response = await getItems(
    page,
    itemsPerPage,
    params.category ? Number.parseInt(params.category, 10) : undefined
  );

  if (!response) {
    return (
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{ARTICLES_PAGE.heading}</h1>
          <p className="text-muted-foreground mt-2">
            {ARTICLES_PAGE.messages.error}
          </p>
        </div>
      </div>
    );
  }

  const pagination = extractPaginationInfo(response, itemsPerPage);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{ARTICLES_PAGE.heading}</h1>
        <p className="text-muted-foreground mt-2">
          {ARTICLES_PAGE.messages.itemsCount(getCollectionTotalItems(response))}
        </p>
      </div>

      <ItemGrid items={getCollectionMembers(response)} />

      {pagination.totalPages > 1 && (
        <div className="mt-8">
          <Pagination pagination={pagination} />
        </div>
      )}
    </div>
  );
}
