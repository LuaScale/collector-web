import { Metadata } from "next";
import { ShopGrid } from "@/components/shops";
import { Pagination } from "@/components/shared";
import { shopsApi } from "@/lib/api/shops";
import { extractPaginationInfo, HydraCollection, getCollectionMembers, getCollectionTotalItems } from "@/types/hydra";
import { Shop } from "@/types/entities/shop";
import { BOUTIQUES_PAGE } from "./constants";

export const metadata: Metadata = {
  title: BOUTIQUES_PAGE.metadata.title,
  description: BOUTIQUES_PAGE.metadata.description,
};

export const dynamic = "force-dynamic";

interface BoutiquesPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

async function getShops(
  page: number,
  itemsPerPage: number
): Promise<HydraCollection<Shop> | null> {
  try {
    return await shopsApi.list({
      page,
      itemsPerPage,
    });
  } catch {
    return null;
  }
}

export default async function BoutiquesPage({
  searchParams,
}: Readonly<BoutiquesPageProps>) {
  const params = await searchParams;
  const page = params.page ? Number.parseInt(params.page, 10) : BOUTIQUES_PAGE.config.defaultPage;
  const itemsPerPage = BOUTIQUES_PAGE.config.itemsPerPage;

  const response = await getShops(page, itemsPerPage);

  if (!response) {
    return (
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{BOUTIQUES_PAGE.heading}</h1>
          <p className="text-muted-foreground mt-2">
            {BOUTIQUES_PAGE.messages.error}
          </p>
        </div>
      </div>
    );
  }

  const pagination = extractPaginationInfo(response, itemsPerPage);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{BOUTIQUES_PAGE.heading}</h1>
        <p className="text-muted-foreground mt-2">
          {BOUTIQUES_PAGE.messages.shopsCount(getCollectionTotalItems(response))}
        </p>
      </div>

      <ShopGrid shops={getCollectionMembers(response)} />

      {pagination.totalPages > 1 && (
        <div className="mt-8">
          <Pagination pagination={pagination} />
        </div>
      )}
    </div>
  );
}
