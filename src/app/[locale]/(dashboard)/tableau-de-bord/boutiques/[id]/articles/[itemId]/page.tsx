"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { EDIT_ARTICLE_PAGE } from "./constants";

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
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingSpinner } from "@/components/shared";
import { ItemStatusBadge } from "@/components/items/ItemStatusBadge";
import { useItem, useUpdateItem } from "@/hooks/useItems";
import { useCategories } from "@/hooks/useCategories";
import { itemSchema, type ItemFormData, itemFormToApi, itemApiToForm } from "@/lib/validations/item";
import { ArrowLeft, Package } from "lucide-react";

interface EditArticlePageProps {
  params: Promise<{ id: string; itemId: string }>;
}

export default function EditArticlePage({ params }: Readonly<EditArticlePageProps>) {
  const { id, itemId } = use(params);
  const router = useRouter();
  const shopId = Number.parseInt(id, 10);
  const itemIdNum = Number.parseInt(itemId, 10);
  
  const { data: item, isLoading: itemLoading } = useItem(itemIdNum);
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();
  const updateItem = useUpdateItem();
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

  // Populate form when item data is loaded
  useEffect(() => {
    if (item) {
      const category = typeof item.category === "string" ? item.category : item.category["@id"];
      form.reset(
        itemApiToForm({
          name: item.name,
          description: item.description,
          price: item.price,
          category,
        })
      );
    }
  }, [item, form]);

  async function onSubmit(data: ItemFormData) {
    setIsSubmitting(true);
    try {
      const apiData = itemFormToApi(data);
      await updateItem.mutateAsync({
        id: itemIdNum,
        data: apiData,
      });
      toast.success(EDIT_ARTICLE_PAGE.messages.success);
      router.push(EDIT_ARTICLE_PAGE.backLink(shopId).href);
    } catch {
      toast.error(EDIT_ARTICLE_PAGE.messages.error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (itemLoading) {
    return (
      <div className="max-w-2xl space-y-6">
        <Skeleton className="h-8 w-48" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-64" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{EDIT_ARTICLE_PAGE.messages.loadError}</p>
        <Button asChild className="mt-4">
          <Link href={EDIT_ARTICLE_PAGE.backLink(shopId).href}>
            {EDIT_ARTICLE_PAGE.backLink(shopId).text}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <Link
          href={EDIT_ARTICLE_PAGE.backLink(shopId).href}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {EDIT_ARTICLE_PAGE.backLink(shopId).text}
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{EDIT_ARTICLE_PAGE.heading}</h1>
          <ItemStatusBadge status={item.status} />
        </div>
        <p className="text-muted-foreground mt-1">{item.name}</p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {EDIT_ARTICLE_PAGE.form.title}
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
                    <FormLabel>{EDIT_ARTICLE_PAGE.form.fields.title.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={EDIT_ARTICLE_PAGE.form.fields.title.placeholder} {...field} />
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
                      {EDIT_ARTICLE_PAGE.form.fields.description.label}{" "}
                      <span className="text-muted-foreground">(optionnel)</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={EDIT_ARTICLE_PAGE.form.fields.description.placeholder}
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
                      <FormLabel>{EDIT_ARTICLE_PAGE.form.fields.price.label}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder={EDIT_ARTICLE_PAGE.form.fields.price.placeholder}
                          {...field}
                          onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormDescription>{EDIT_ARTICLE_PAGE.form.fields.price.description}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{EDIT_ARTICLE_PAGE.form.fields.category.label}</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={EDIT_ARTICLE_PAGE.form.fields.category.placeholder} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoriesLoading ? (
                            <SelectItem value="" disabled>
                              {EDIT_ARTICLE_PAGE.loading.categories}
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

              {item.status === "DRAFT" && (
                <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                  <p>
                    <strong>Statut :</strong> Cet article est en brouillon et
                    n&apos;est pas encore visible publiquement.
                  </p>
                </div>
              )}

              {item.status === "REJECTED" && (
                <div className="bg-destructive/10 rounded-lg p-4 text-sm text-destructive">
                  <p>
                    <strong>Rejeté :</strong> Cet article a été rejeté. Modifiez-le
                    pour le soumettre à nouveau.
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <LoadingSpinner size="sm" className="mr-2" />}
                  {EDIT_ARTICLE_PAGE.form.submitButton}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href={EDIT_ARTICLE_PAGE.backLink(shopId).href}>
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
