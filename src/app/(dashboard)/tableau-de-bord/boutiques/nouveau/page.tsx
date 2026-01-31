"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { NOUVEAU_BOUTIQUE_PAGE } from "./constants";

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
import { LoadingSpinner } from "@/components/shared";
import { useAuth } from "@/hooks/useAuth";
import { useCreateShop } from "@/hooks/useShops";
import { shopSchema, type ShopFormData } from "@/lib/validations/shop";
import { buildIri } from "@/lib/utils/iri";
import { ArrowLeft, Store } from "lucide-react";
import Link from "next/link";

export default function NouveauBoutiquePage() {
  const router = useRouter();
  const { user } = useAuth();
  const createShop = useCreateShop();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ShopFormData>({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(data: ShopFormData) {
    if (!user) return;

    setIsSubmitting(true);
    try {
      await createShop.mutateAsync({
        name: data.name,
        description: data.description || undefined,
        owner: buildIri("users", user.id),
      });
      toast.success(NOUVEAU_BOUTIQUE_PAGE.messages.success);
      router.push(NOUVEAU_BOUTIQUE_PAGE.backLink.href);
    } catch (error) {
      console.error(NOUVEAU_BOUTIQUE_PAGE.messages.error, error);
      toast.error(NOUVEAU_BOUTIQUE_PAGE.messages.error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <Link
          href={NOUVEAU_BOUTIQUE_PAGE.backLink.href}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {NOUVEAU_BOUTIQUE_PAGE.backLink.text}
        </Link>
        <h1 className="text-3xl font-bold">{NOUVEAU_BOUTIQUE_PAGE.heading}</h1>
        <p className="text-muted-foreground mt-1">
          {NOUVEAU_BOUTIQUE_PAGE.subtitle}
        </p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            {NOUVEAU_BOUTIQUE_PAGE.form.title}
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
                    <FormLabel>{NOUVEAU_BOUTIQUE_PAGE.form.fields.name.label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={NOUVEAU_BOUTIQUE_PAGE.form.fields.name.placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {NOUVEAU_BOUTIQUE_PAGE.form.fields.name.description}
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
                    <FormLabel>{NOUVEAU_BOUTIQUE_PAGE.form.fields.description.label}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={NOUVEAU_BOUTIQUE_PAGE.form.fields.description.placeholder}
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
                  {NOUVEAU_BOUTIQUE_PAGE.form.submitButton}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href={NOUVEAU_BOUTIQUE_PAGE.backLink.href}>Annuler</Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
