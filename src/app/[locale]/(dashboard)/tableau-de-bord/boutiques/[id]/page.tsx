"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { EDIT_BOUTIQUE_PAGE } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingSpinner } from "@/components/shared";
import { useShop, useUpdateShop } from "@/hooks/useShops";
import { shopSchema, type ShopFormData } from "@/lib/validations/shop";
import { ArrowLeft, Store } from "lucide-react";
import Link from "next/link";

interface EditBoutiquePageProps {
  params: Promise<{ id: string }>;
}

export default function EditBoutiquePage({ params }: Readonly<EditBoutiquePageProps>) {
  const { id } = use(params);
  const router = useRouter();
  const shopId = Number.parseInt(id, 10);
  const { data: shop, isLoading } = useShop(shopId);
  const updateShop = useUpdateShop();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ShopFormData>({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Populate form when shop data is loaded
  useEffect(() => {
    if (shop) {
      form.reset({
        name: shop.name,
        description: shop.description || "",
      });
    }
  }, [shop, form]);

  async function onSubmit(data: ShopFormData) {
    setIsSubmitting(true);
    try {
      await updateShop.mutateAsync({
        id: shopId,
        data: {
          name: data.name,
          description: data.description || undefined,
        },
      });
      toast.success(EDIT_BOUTIQUE_PAGE.messages.success);
      router.push(EDIT_BOUTIQUE_PAGE.backLink.href);
    } catch {
      toast.error(EDIT_BOUTIQUE_PAGE.messages.error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
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
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{EDIT_BOUTIQUE_PAGE.messages.loadError}</p>
        <Button asChild className="mt-4">
          <Link href={EDIT_BOUTIQUE_PAGE.backLink.href}>{EDIT_BOUTIQUE_PAGE.backLink.text}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <Link
          href={EDIT_BOUTIQUE_PAGE.backLink.href}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {EDIT_BOUTIQUE_PAGE.backLink.text}
        </Link>
        <h1 className="text-3xl font-bold">{EDIT_BOUTIQUE_PAGE.heading}</h1>
        <p className="text-muted-foreground mt-1">{shop.name}</p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            {EDIT_BOUTIQUE_PAGE.form.title}
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
                    <FormLabel>{EDIT_BOUTIQUE_PAGE.form.fields.name.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={EDIT_BOUTIQUE_PAGE.form.fields.name.placeholder} {...field} />
                    </FormControl>
                    <FormDescription>
                      {EDIT_BOUTIQUE_PAGE.form.fields.name.description}
                    </FormDescription>
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
                      {EDIT_BOUTIQUE_PAGE.form.fields.description.label}{" "}
                      <span className="text-muted-foreground">(optionnel)</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={EDIT_BOUTIQUE_PAGE.form.fields.description.placeholder}
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <LoadingSpinner size="sm" className="mr-2" />}
                  {EDIT_BOUTIQUE_PAGE.form.submitButton}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href={EDIT_BOUTIQUE_PAGE.backLink.href}>Annuler</Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Link to items */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Articles de cette boutique</h3>
              <p className="text-sm text-muted-foreground">
                {shop.items?.length ?? 0} articles
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href={`/tableau-de-bord/boutiques/${shopId}/articles`}>
                Gérer les articles
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
