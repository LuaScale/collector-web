"use client";

import { useState } from "react";
import Link from "next/link";
import { INSCRIPTION_PAGE } from "./constants";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { LoadingSpinner } from "@/components/shared";
import { useAuth } from "@/hooks/useAuth";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import { UserPlus } from "lucide-react";

export default function InscriptionPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      pseudo: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterFormData) {
    setIsSubmitting(true);
    try {
      await register({
        email: data.email,
        pseudo: data.pseudo,
        password: data.password,
        phoneNumber: data.phoneNumber || undefined,
      });
      toast.success(INSCRIPTION_PAGE.messages.success);
      router.push(INSCRIPTION_PAGE.routes.afterRegister);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : INSCRIPTION_PAGE.messages.error
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <h1 className="sr-only">{INSCRIPTION_PAGE.a11y.pageHeading}</h1>
        <CardTitle className="text-2xl">{INSCRIPTION_PAGE.heading}</CardTitle>
        <CardDescription>
          {INSCRIPTION_PAGE.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{INSCRIPTION_PAGE.form.email.label}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={INSCRIPTION_PAGE.form.email.placeholder}
                      autoComplete={INSCRIPTION_PAGE.form.email.autoComplete}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pseudo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{INSCRIPTION_PAGE.form.pseudo.label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={INSCRIPTION_PAGE.form.pseudo.placeholder}
                      autoComplete={INSCRIPTION_PAGE.form.pseudo.autoComplete}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {INSCRIPTION_PAGE.form.pseudo.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {INSCRIPTION_PAGE.form.phoneNumber.label}{" "}
                    <span className="text-muted-foreground">{INSCRIPTION_PAGE.form.phoneNumber.optionalLabel}</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder={INSCRIPTION_PAGE.form.phoneNumber.placeholder}
                      autoComplete={INSCRIPTION_PAGE.form.phoneNumber.autoComplete}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{INSCRIPTION_PAGE.form.password.label}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={INSCRIPTION_PAGE.form.password.placeholder}
                      autoComplete={INSCRIPTION_PAGE.form.password.autoComplete}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{INSCRIPTION_PAGE.form.password.description}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{INSCRIPTION_PAGE.form.confirmPassword.label}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={INSCRIPTION_PAGE.form.confirmPassword.placeholder}
                      autoComplete={INSCRIPTION_PAGE.form.confirmPassword.autoComplete}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <LoadingSpinner size="sm" className="mr-2" />
              ) : (
                <UserPlus className="h-4 w-4 mr-2" />
              )}
              {INSCRIPTION_PAGE.buttons.submit}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="text-sm text-muted-foreground text-center">
          {INSCRIPTION_PAGE.links.login.text}{" "}
          <Link href={INSCRIPTION_PAGE.links.login.href} className="text-primary hover:underline">
            {INSCRIPTION_PAGE.links.login.linkText}
          </Link>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          En créant un compte, vous acceptez nos conditions d&apos;utilisation
          et notre politique de confidentialité.
        </p>
      </CardFooter>
    </Card>
  );
}
