"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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

type Props = {};

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

const Shortcuts = (props: Props) => {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", url: "" });

  // Load shortcuts from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setShortcuts(Array.isArray(parsed) ? parsed : []);
      } catch {
        setShortcuts([]);
      }
    } else {
      // Set default GitHub shortcut
      const defaultShortcuts: Shortcut[] = [
        { id: "github", name: "GitHub", url: "https://github.com" },
      ];
      setShortcuts(defaultShortcuts);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultShortcuts));
    }
  }, []);

  // Save shortcuts to localStorage whenever they change
  useEffect(() => {
    if (shortcuts.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(shortcuts));
    }
  }, [shortcuts]);

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
      setShortcuts(shortcuts.filter((s) => s.id !== deleteId));
      setDeleteId(null);
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="shortcuts-main">
        <div className="shortcuts-content ">
          <div className="shortcut-container flex justify-center flex-wrap gap-4">
            {shortcuts.map((shortcut) => (
              <div key={shortcut.id} className="relative group">
                <a
                  href={shortcut.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="w-[150px] p-3 items-center justify-center rounded-[1.5rem] hover:opacity-80 transition-opacity">
                    <CardContent className="shortcut-item flex flex-col items-center justify-center">
                      <Image
                        src={getFaviconUrl(shortcut.url)}
                        alt={shortcut.name}
                        width={40}
                        height={40}
                        className="shortcut-img h-10 w-10 object-cover rounded-[50%]"
                        unoptimized
                      />
                      <p className="shortcut-name mt-2 text-primary text-sm">
                        {shortcut.name}
                      </p>
                    </CardContent>
                  </Card>
                </a>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="h-6 w-6 bg-background/80 backdrop-blur-sm hover:bg-background"
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
            <Card className="w-[150px] p-3 items-center justify-center rounded-[1.5rem] bg-secondary cursor-pointer hover:opacity-80 transition-opacity">
              <CardContent>
                <Button
                  className="add-shortcut h-10 w-10 cursor-pointer"
                  variant="outline"
                  onClick={() => handleOpenDialog()}
                >
                  <Plus />
                </Button>
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
