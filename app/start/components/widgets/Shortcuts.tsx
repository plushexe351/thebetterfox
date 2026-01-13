"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSettings } from "../../lib/SettingsContext";
import { Button } from "@/components/ui/button";
import { Plus, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

interface Shortcut {
  id: string;
  name: string;
  url: string;
}

const STORAGE_KEY = "betterfox-shortcuts";

const getFaviconUrl = (url: string): string => {
  try {
    const domain = new URL(url.startsWith("http") ? url : `https://${url}`)
      .hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return `https://www.google.com/s2/favicons?domain=${url}&sz=64`;
  }
};

const normalizeUrl = (url: string): string => {
  if (!url) return "";
  url = url.trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`;
  }
  return url;
};

const Shortcuts = () => {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [formData, setFormData] = useState({ name: "", url: "" });
  const [isLoaded, setIsLoaded] = useState(false);
  const { updateSettings, settings } = useSettings();

  // Load shortcuts from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // eslint-disable-next-line
          setShortcuts(parsed);
          setIsLoaded(true);
          return;
        }
      } catch {
        // Only set defaults if parsing fails or invalid
      }
    }

    // Set default Google shortcut ONLY if nothing valid was in storage
    // If "betterfox-shortcuts" key doesn't exist at all, set default.
    if (stored === null) {
      const defaultShortcuts: Shortcut[] = [
        { id: "google", name: "Google", url: "https://google.com" },
      ];
      setShortcuts(defaultShortcuts);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultShortcuts));
    } else {
      if (!stored) setShortcuts([]); // Empty string
    }
    setIsLoaded(true);
  }, []);

  // Save shortcuts to localStorage whenever they change - Only if loaded
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(shortcuts));
    }
  }, [shortcuts, isLoaded]);

  const handleOpenDialog = (shortcut?: Shortcut) => {
    if (shortcut) {
      setEditingId(shortcut.id);
      setFormData({ name: shortcut.name, url: shortcut.url });
    } else {
      setEditingId(null);
      setFormData({ name: "", url: "" });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingId(null);
    setFormData({ name: "", url: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.url.trim()) return;

    const normalizedUrl = normalizeUrl(formData.url);

    if (editingId) {
      // Update existing shortcut
      setShortcuts(
        shortcuts.map((s) =>
          s.id === editingId
            ? { ...s, name: formData.name.trim(), url: normalizedUrl }
            : s
        )
      );
    } else {
      // Add new shortcut
      const newShortcut: Shortcut = {
        id: `shortcut-${Date.now()}`,
        name: formData.name.trim(),
        url: normalizedUrl,
      };
      setShortcuts([...shortcuts, newShortcut]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      const newShortcuts = shortcuts.filter((s) => s.id !== deleteId);
      setShortcuts(newShortcuts);
      setDeleteId(null);

      // Auto-hide if empty
      if (newShortcuts.length === 0) {
        // Explicitly save empty array to storage immediately
        // This prevents the "default shortcuts respawning" issue if the component unmounts before the effect runs
        localStorage.setItem(STORAGE_KEY, "[]");

        updateSettings({
          widgetVisibility: {
            ...settings.widgetVisibility,
            shortcuts: false,
          },
        });
      }
    }
    setIsDeleteDialogOpen(false);
  };

  const getAlignmentClass = () => {
    switch (settings.shortcuts.alignment) {
      case "left":
        return "justify-start";
      case "right":
        return "justify-end";
      case "center":
      default:
        return "justify-center";
    }
  };

  const getPresetStyles = () => {
    const preset = settings.theme.viewPreset;
    switch (preset) {
      case "minimal":
        return {
          card: "w-[70px] md:w-[80px] h-[70px] md:h-[80px] aspect-square p-1 rounded-2xl hover:bg-secondary/90 backdrop-blur-md transition-colors border-0 shadow-none overflow-hidden text-ellipsis whitespace-nowrap",
          img: "h-8 w-8 rounded-xl",
          text: "mt-1 text-xs text-muted-foreground",
          container: `flex flex-wrap gap-4 w-full max-w-[800px] ${getAlignmentClass()} items-center`,
        };
      case "glass":
        return {
          card: "w-[150px] md:w-[160px] h-[100px] md:h-[110px] p-3 rounded-3xl bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all text-white border",
          img: "h-10 w-10 rounded-full ring-2 ring-white/20",
          text: "mt-2 text-sm font-medium",
          container: `flex flex-wrap gap-4 w-full max-w-[800px] ${getAlignmentClass()} items-center`,
        };
      case "card":
      default:
        return {
          card: "w-[150px] md:w-[160px] h-[100px] md:h-[110px] p-3 rounded-3xl hover:opacity-80 transition-all",
          img: "h-12 w-12 rounded-full",
          text: "mt-3 text-primary text-sm font-medium",
          container: `flex flex-wrap gap-4 w-full max-w-[800px] ${getAlignmentClass()} items-center`,
        };
    }
  };

  const styles = getPresetStyles();

  return (
    <>
      <div className={`shortcuts-main w-full flex  pb-6`}>
        <div
          className={`shortcuts-scroll-container max-h-[40vh] overflow-x-hidden w-full p-2 flex justify-center`}
        >
          <div className={`${styles.container}`}>
            {shortcuts.map((shortcut) => (
              <div key={shortcut.id} className="relative group">
                <a
                  href={shortcut.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card
                    className={`h-full flex flex-col items-center justify-center ${styles.card}`}
                  >
                    <CardContent className="p-0 flex flex-col items-center justify-center w-full">
                      <Image
                        src={getFaviconUrl(shortcut.url)}
                        alt={shortcut.name}
                        width={64}
                        height={64}
                        className={`object-contain p-1 ${styles.img}`}
                        unoptimized
                      />
                      <p
                        className={`text-center w-full px-2 overflow-hidden text-ellipsis whitespace-nowrap group-hover:whitespace-normal group-hover:break-words ${styles.text}`}
                        title={shortcut.name}
                      >
                        {shortcut.name}
                      </p>
                    </CardContent>
                  </Card>
                </a>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="h-6 w-6 bg-background/80 backdrop-blur-sm hover:bg-background rounded-full"
                        onClick={(e) => e.preventDefault()}
                      >
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.preventDefault();
                          handleOpenDialog(shortcut);
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(shortcut.id);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
            <Card
              className={`h-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity bg-secondary/50 border-dashed ${styles.card}`}
              onClick={() => handleOpenDialog()}
            >
              <CardContent className="p-0">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Shortcut" : "Add New Shortcut"}
            </DialogTitle>
            <DialogDescription>
              Enter a name and URL for your shortcut. The icon will be
              automatically fetched.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., GitHub"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  maxLength={30}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="e.g., github.com"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
              >
                Cancel
              </Button>
              <Button type="submit">{editingId ? "Save" : "Add"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              shortcut.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Shortcuts;
