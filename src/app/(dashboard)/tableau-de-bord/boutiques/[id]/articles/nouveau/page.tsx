"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { NOUVEAU_ARTICLE_PAGE } from "./constants";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingSpinner } from "@/components/shared";
import { useShop } from "@/hooks/useShops";
import { useCategories } from "@/hooks/useCategories";
import { useCreateItem } from "@/hooks/useItems";
import { itemSchema, type ItemFormData, itemFormToApi } from "@/lib/validations/item";
import { buildIri } from "@/lib/utils/iri";
import { ArrowLeft, Package } from "lucide-react";

interface NouvelArticlePageProps {
  params: Promise<{ id: string }>;
}

export default function NouvelArticlePage({ params }: Readonly<NouvelArticlePageProps>) {
  const { id } = use(params);
  const router = useRouter();
  const shopId = Number.parseInt(id, 10);
  const { data: shop } = useShop(shopId);
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();
  const createItem = useCreateItem();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = categoriesData?.["hydra:member"] ?? [];

  const form = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
    },
  });

  async function onSubmit(data: ItemFormData) {
    setIsSubmitting(true);
    try {
      const apiData = itemFormToApi(data);
      await createItem.mutateAsync({
        ...apiData,
        shop: buildIri("shops", shopId),
        status: "DRAFT", // New items start as draft
      });
      toast.success(NOUVEAU_ARTICLE_PAGE.messages.success);
      router.push(NOUVEAU_ARTICLE_PAGE.routes.redirectAfterCreate(shopId));
    } catch {
      toast.error(NOUVEAU_ARTICLE_PAGE.messages.error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <Link
          href={NOUVEAU_ARTICLE_PAGE.backLink(shopId).href}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {NOUVEAU_ARTICLE_PAGE.backLink(shopId).text}
        </Link>
        <h1 className="text-3xl font-bold">{NOUVEAU_ARTICLE_PAGE.heading}</h1>
        <p className="text-muted-foreground mt-1">
          Boutique : {shop?.name ?? "..."}
        </p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {NOUVEAU_ARTICLE_PAGE.form.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{NOUVEAU_ARTICLE_PAGE.form.fields.title.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={NOUVEAU_ARTICLE_PAGE.form.fields.title.placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {NOUVEAU_ARTICLE_PAGE.form.fields.description.label}{" "}
                      <span className="text-muted-foreground">(optionnel)</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={NOUVEAU_ARTICLE_PAGE.form.fields.description.placeholder}
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{NOUVEAU_ARTICLE_PAGE.form.fields.price.label}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder={NOUVEAU_ARTICLE_PAGE.form.fields.price.placeholder}
                          {...field}
                          onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormDescription>{NOUVEAU_ARTICLE_PAGE.form.fields.price.description}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{NOUVEAU_ARTICLE_PAGE.form.fields.category.label}</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={NOUVEAU_ARTICLE_PAGE.form.fields.category.placeholder} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoriesLoading ? (
                            <SelectItem value="" disabled>
                              {NOUVEAU_ARTICLE_PAGE.loading.categories}
                            </SelectItem>
                          ) : (
                            categories.map((category) => (
                              <SelectItem
                                key={category["@id"]}
                                value={category["@id"]}
                              >
                                {category.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                <p>
                  <strong>Note :</strong> {NOUVEAU_ARTICLE_PAGE.form.statusNote}{" "}
                  <span className="font-medium text-foreground">Brouillon</span>.
                  Il devra être validé par un administrateur avant d&apos;être
                  visible publiquement.
                </p>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <LoadingSpinner size="sm" className="mr-2" />}
                  {NOUVEAU_ARTICLE_PAGE.form.submitButton}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href={NOUVEAU_ARTICLE_PAGE.backLink(shopId).href}>
                    Annuler
                  </Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
