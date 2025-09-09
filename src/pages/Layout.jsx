

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  BarChart3, 
  Map, 
  Zap, 
  FileText,
  Award,
  GraduationCap // New Icon
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: BarChart3,
    description: "Overview & Progress"
  },
  {
    title: "Training Phases",
    url: createPageUrl("Phases"),
    icon: Map,
    description: "Structured Curriculum"
  },
  {
    title: "Skills Map",
    url: createPageUrl("SkillsMap"),
    icon: Zap,
    description: "SF to ServiceNow"
  },
  {
    title: "Assessments",
    url: createPageUrl("Assessments"),
    icon: Award,
    description: "Test Your Knowledge"
  },
  {
    title: "Capstone Project",
    url: createPageUrl("CapstoneProject"),
    icon: GraduationCap,
    description: "Final Project & Showcase"
  },
  {
    title: "Resources",
    url: createPageUrl("Resources"),
    icon: FileText,
    description: "Documentation"
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200">
          <SidebarHeader className="border-b border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">PRYM Path</h2>
                <p className="text-xs text-gray-500">SF → ServiceNow Training</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-2">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-gray-100 transition-colors duration-200 rounded-lg mb-1 ${
                          location.pathname === item.url ? 'bg-gray-100 text-gray-900' : ''
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
                          <item.icon className="w-4 h-4" />
                          <div>
                            <span className="font-medium">{item.title}</span>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 p-4">
            <div className="text-xs text-gray-500">
              <div className="font-medium">Theme</div>
              <div>Switch appearance</div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          {/* Header with mobile trigger */}
          <header className="bg-white border-b border-gray-200 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">PRYM Path</h1>
            </div>
          </header>

          {/* Main content area */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

