"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Wrench } from "lucide-react";
import { PARAMETRES_PAGE } from "./constants";

export default function ParametresPage() {
  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <Link
          href={PARAMETRES_PAGE.backLink.href}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {PARAMETRES_PAGE.backLink.text}
        </Link>
        <h1 className="text-3xl font-bold">{PARAMETRES_PAGE.heading}</h1>
        <p className="text-muted-foreground mt-1">
          {PARAMETRES_PAGE.subtitle}
        </p>
      </div>

      {/* Coming soon */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            {PARAMETRES_PAGE.comingSoon.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {PARAMETRES_PAGE.comingSoon.description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
