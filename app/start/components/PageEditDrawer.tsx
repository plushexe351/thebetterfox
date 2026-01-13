"use client";

import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useSettings } from "../lib/SettingsContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import SettingsContent from "./SettingsContent";

const PageEditDrawer = () => {
  const { resetSettings } = useSettings();
  const [isMobile, setIsMobile] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleReset = () => {
    resetSettings();
    setIsResetDialogOpen(false);
  };

  const triggerButton = (
    <Button variant="outline" className="fixed bottom-6 right-6 z-50">
      <Edit />
    </Button>
  );

  if (isMobile) {
    return (
      <>
        <div className="page-edit-drawer">
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
            <DrawerContent className="max-h-[96vh] p-4 rounded-t-4xl border-b-transparent">
              <DrawerHeader>
                <DrawerTitle>Preferences</DrawerTitle>
              </DrawerHeader>
              <SettingsContent
                onResetClick={() => setIsResetDialogOpen(true)}
              />
            </DrawerContent>
          </Drawer>
        </div>

        <AlertDialog
          open={isResetDialogOpen}
          onOpenChange={setIsResetDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset All Settings?</AlertDialogTitle>
              <AlertDialogDescription>
                This will reset all your settings to their default values. This
                action cannot be undone. Shortcuts will not be deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleReset}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Reset
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return (
    <>
      <div className="page-edit-drawer">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>{triggerButton}</SheetTrigger>
          <SheetContent side="right" className="overflow-y-auto px-4">
            <SheetHeader className="hidden">
              <SheetTitle>Preferences</SheetTitle>
            </SheetHeader>
            <SettingsContent onResetClick={() => setIsResetDialogOpen(true)} />
          </SheetContent>
        </Sheet>
      </div>

      <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset All Settings?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all your settings to their default values. This
              action cannot be undone. Shortcuts will not be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReset}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PageEditDrawer;
