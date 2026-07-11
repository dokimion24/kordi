"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { GoogleLoginButton } from "@/features/auth";
import { MonoCard } from "@/shared/ui/mono-card";

export function LoginPage() {
  const t = useTranslations("login");

  return (
    <div className="flex flex-1 items-center justify-center bg-white px-4 text-black">
      <div style={{ width: "100%", maxWidth: "24rem" }}>
        <MonoCard className="p-10 text-center">
          <div className="mb-6 flex justify-center">
            <Image
              src="/kordi/kordi-idle.png"
              alt="Kordi"
              width={80}
              height={80}
              className="size-20 object-contain"
              priority
            />
          </div>
          <h1 className="font-heading mb-2 text-4xl font-black uppercase tracking-tighter">
            Kordi
          </h1>
          <p className="mb-8 text-sm leading-relaxed">{t("subtitle")}</p>
          <GoogleLoginButton label={t("googleLogin")} />
        </MonoCard>
        <p className="mt-6 text-center text-[11px] font-bold uppercase opacity-60">
          {t("tagline")}
        </p>
      </div>
    </div>
  );
}
