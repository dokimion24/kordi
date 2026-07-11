"use client";

import Image from "next/image";
import { PanelLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/shared/config/i18n/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/ui/sidebar";
import { NAV_GROUPS } from "../model/nav-config";

function MenuToggle() {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      type="button"
      onClick={toggleSidebar}
      aria-label="Toggle Sidebar"
      className="relative z-10 flex h-10 w-full shrink-0 cursor-pointer items-center justify-end px-3 text-black transition-colors hover:bg-black/5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 [&>*]:pointer-events-none"
    >
      <PanelLeftIcon
        className="size-4"
        strokeWidth={1.75}
        style={{ pointerEvents: "none" }}
      />
    </button>
  );
}

export function AppSidebar() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r-0! [&>[data-sidebar=sidebar]]:bg-white"
    >
      <SidebarHeader className="h-14 shrink-0 justify-center border-b border-black px-4 group-data-[collapsible=icon]:px-0">
        <Link
          href="/"
          className="flex items-center gap-3 overflow-hidden text-black group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0"
        >
          <Image
            src="/kordi/kordi-idle.png"
            alt="Kordi"
            width={28}
            height={28}
            className="size-7 shrink-0 object-contain"
            priority
          />
          <span className="font-heading text-2xl font-black uppercase tracking-tighter group-data-[collapsible=icon]:hidden">
            {t("home.brand")}
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="border-r border-black bg-white">
        <MenuToggle />
        {NAV_GROUPS.map((group) => (
          <SidebarGroup key={group.labelKey}>
            <SidebarGroupLabel className="text-[11px] font-bold uppercase tracking-widest text-black/50">
              {t(group.labelKey)}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map(({ href, icon: Icon, labelKey }) => {
                  const active = pathname === href;
                  return (
                    <SidebarMenuItem key={href}>
                      <SidebarMenuButton
                        isActive={active}
                        tooltip={t(labelKey)}
                        render={<Link href={href} />}
                        className="h-10 gap-3 rounded-lg px-3 text-sm font-semibold tracking-wide whitespace-nowrap data-[active=true]:bg-black data-[active=true]:text-white"
                      >
                        <Icon className="size-5 shrink-0" strokeWidth={1.75} />
                        <span className="whitespace-nowrap group-data-[collapsible=icon]:hidden">
                          {t(labelKey)}
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
