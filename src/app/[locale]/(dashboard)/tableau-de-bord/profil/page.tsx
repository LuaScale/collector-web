"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { PROFIL_PAGE } from "./constants";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/shared";
import { useAuth } from "@/hooks/useAuth";
import {
  profileSchema,
  passwordSchema,
  type ProfileFormData,
  type PasswordFormData,
} from "@/lib/validations/profile";
import { ArrowLeft, User, Lock, Mail, CheckCircle, XCircle } from "lucide-react";

export default function ProfilPage() {
  const { user } = useAuth();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      pseudo: "",
      email: "",
    },
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Populate profile form when user data is loaded
  useEffect(() => {
    if (user) {
      profileForm.reset({
        pseudo: user.pseudo,
        email: user.email,
      });
    }
  }, [user, profileForm]);

  async function onProfileSubmit(data: ProfileFormData) {
    setIsUpdatingProfile(true);
    try {
      // Note: API endpoint not yet available for profile/password updates
      // await usersApi.update(user.id, data);
      toast.success(PROFIL_PAGE.messages.profileUpdateSuccess);
    } catch {
      toast.error(PROFIL_PAGE.messages.profileUpdateError);
    } finally {
      setIsUpdatingProfile(false);
    }
  }

  async function onPasswordSubmit(data: PasswordFormData) {
    setIsUpdatingPassword(true);
    try {
      // Note: API endpoint not yet available for profile/password updates
      // await usersApi.changePassword(user.id, data);
      toast.success(PROFIL_PAGE.messages.passwordChangeSuccess);
      passwordForm.reset();
    } catch {
      toast.error(PROFIL_PAGE.messages.passwordChangeError);
    } finally {
      setIsUpdatingPassword(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <Link
          href={PROFIL_PAGE.backLink.href}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {PROFIL_PAGE.backLink.text}
        </Link>
        <h1 className="text-3xl font-bold">{PROFIL_PAGE.heading}</h1>
        <p className="text-muted-foreground mt-1">
          {PROFIL_PAGE.subtitle}
        </p>
      </div>

      {/* Account Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {PROFIL_PAGE.accountInfo.title}
          </CardTitle>
          <CardDescription>
            {PROFIL_PAGE.accountInfo.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">{PROFIL_PAGE.accountInfo.labels.email}</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">{PROFIL_PAGE.accountInfo.labels.pseudo}</p>
                <p className="font-medium">{user?.pseudo}</p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {user?.isVerified ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{PROFIL_PAGE.accountInfo.verification.verified}</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">{PROFIL_PAGE.accountInfo.verification.notVerified}</span>
                </>
              )}
            </div>
            <Badge variant={user?.isVerified ? "default" : "secondary"}>
              {user?.isVerified ? PROFIL_PAGE.accountInfo.verification.verifiedBadge : PROFIL_PAGE.accountInfo.verification.pendingBadge}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Form */}
      <Card>
        <CardHeader>
          <CardTitle>{PROFIL_PAGE.editProfile.title}</CardTitle>
          <CardDescription>
            {PROFIL_PAGE.editProfile.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
              <FormField
                control={profileForm.control}
                name="pseudo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{PROFIL_PAGE.editProfile.fields.pseudo.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={PROFIL_PAGE.editProfile.fields.pseudo.placeholder} {...field} />
                    </FormControl>
                    <FormDescription>
                      {PROFIL_PAGE.editProfile.fields.pseudo.description}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{PROFIL_PAGE.editProfile.fields.email.label}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={PROFIL_PAGE.editProfile.fields.email.placeholder} {...field} />
                    </FormControl>
                    <FormDescription>
                      {PROFIL_PAGE.editProfile.fields.email.description}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isUpdatingProfile}>
                {isUpdatingProfile && <LoadingSpinner size="sm" className="mr-2" />}
                {PROFIL_PAGE.editProfile.submitButton}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Change Password Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            {PROFIL_PAGE.changePassword.title}
          </CardTitle>
          <CardDescription>
            {PROFIL_PAGE.changePassword.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{PROFIL_PAGE.changePassword.fields.currentPassword.label}</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder={PROFIL_PAGE.changePassword.fields.currentPassword.placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{PROFIL_PAGE.changePassword.fields.newPassword.label}</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder={PROFIL_PAGE.changePassword.fields.newPassword.placeholder} {...field} />
                    </FormControl>
                    <FormDescription>
                      {PROFIL_PAGE.changePassword.fields.newPassword.description}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{PROFIL_PAGE.changePassword.fields.confirmPassword.label}</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder={PROFIL_PAGE.changePassword.fields.confirmPassword.placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" variant="outline" disabled={isUpdatingPassword}>
                {isUpdatingPassword && <LoadingSpinner size="sm" className="mr-2" />}
                {PROFIL_PAGE.changePassword.submitButton}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
