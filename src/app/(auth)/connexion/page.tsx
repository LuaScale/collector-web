"use client";

import { useState } from "react";
import Link from "next/link";
import { CONNEXION_PAGE } from "./constants";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/shared";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { LogIn } from "lucide-react";

export default function ConnexionPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
      toast.success(CONNEXION_PAGE.messages.success);
      router.push(CONNEXION_PAGE.routes.afterLogin);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : CONNEXION_PAGE.messages.error
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <h1 className="sr-only">{CONNEXION_PAGE.a11y.pageHeading}</h1>
        <CardTitle className="text-2xl">{CONNEXION_PAGE.heading}</CardTitle>
        <CardDescription>
          {CONNEXION_PAGE.description}
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
                  <FormLabel>{CONNEXION_PAGE.form.email.label}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={CONNEXION_PAGE.form.email.placeholder}
                      autoComplete={CONNEXION_PAGE.form.email.autoComplete}
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
                  <FormLabel>{CONNEXION_PAGE.form.password.label}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={CONNEXION_PAGE.form.password.placeholder}
                      autoComplete={CONNEXION_PAGE.form.password.autoComplete}
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
                <LogIn className="h-4 w-4 mr-2" />
              )}
              {CONNEXION_PAGE.buttons.submit}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="text-sm text-muted-foreground text-center">
          {CONNEXION_PAGE.links.register.text}{" "}
          <Link href={CONNEXION_PAGE.links.register.href} className="text-primary hover:underline">
            {CONNEXION_PAGE.links.register.linkText}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
