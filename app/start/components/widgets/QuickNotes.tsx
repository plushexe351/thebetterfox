"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit2, Maximize2, X } from "lucide-react";
import { useSettings } from "../../lib/SettingsContext";
import { Note } from "../../lib/settings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { DialogDescription } from "@base-ui/react";

export default function QuickNotes() {
  const { settings, updateSettings } = useSettings();
  const [isAllNotesOpen, setIsAllNotesOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const notes = settings.notes || [];
  const displayNotes = notes.slice(0, 2);

  const handleAddNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: noteTitle || "Untitled Note",
      content: noteContent,
      updatedAt: Date.now(),
    };
    const updatedNotes = [newNote, ...notes];
    updateSettings({ notes: updatedNotes });
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleUpdateNote = () => {
    if (!editingNote) return;
    const updatedNotes = notes.map((n) =>
      n.id === editingNote.id
        ? {
            ...n,
            title: noteTitle,
            content: noteContent,
            updatedAt: Date.now(),
          }
        : n
    );
    updateSettings({ notes: updatedNotes });
    resetForm();
    setEditingNote(null);
  };

  const handleDeleteNote = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updatedNotes = notes.filter((n) => n.id !== id);
    updateSettings({ notes: updatedNotes });
    if (editingNote?.id === id) {
      setEditingNote(null);
      resetForm();
    }
  };

  const resetForm = () => {
    setNoteTitle("");
    setNoteContent("");
  };

  const openEditDialog = (note: Note) => {
    setEditingNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
  };

  const getPresetStyles = () => {
    const preset = settings.shortcuts.viewPreset;
    switch (preset) {
      case "minimal":
        return {
          card: "bg-secondary/90 backdrop-blur-md border-none shadow-none hover:bg-accent/50 transition-colors rounded-2xl",
          content: "p-4 flex flex-col justify-between h-full",
          meta: "text-white/20",
        };
      case "glass":
        return {
          card: "bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all border rounded-3xl",
          content: "p-4 flex flex-col justify-between h-full",
        };
      case "card":
      default:
        return {
          card: " border-white/10 transition-all hover:scale-[1.02] active:scale-[0.98] rounded-3xl shadow-lg",
          content: "p-4 flex flex-col justify-between h-full",
        };
    }
  };

  const styles = getPresetStyles();

  return (
    <div className="w-full max-w-[700px] space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-white uppercase tracking-wider">
          Quick Notes
        </h3>
        <div className="flex gap-2">
          {notes.length > 2 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAllNotesOpen(true)}
              className="text-white hover:text-white hover:bg-white/10 text-xs h-7 px-2"
            >
              View All ({notes.length})
            </Button>
          )}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  resetForm();
                  setIsAddDialogOpen(true);
                }}
                className="text-white hover:text-white hover:bg-white/10 h-7 w-7 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-white/10 sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>New Note</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Title"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    className="bg-white/5 border-white/10 focus:border-white/20 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Start typing..."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="min-h-[150px] bg-white/5 border-white/10 focus:border-white/20 transition-colors"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="ghost"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddNote}>Save Note</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayNotes.length > 0 ? (
          displayNotes.map((note) => (
            <Card
              key={note.id}
              onClick={() => openEditDialog(note)}
              className={cn(
                "group cursor-pointer relative overflow h-28 p-0",
                styles.card
              )}
            >
              <CardContent className={cn("", styles.content)}>
                <div className="space-y-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  <h4
                    className={cn(
                      "font-medium truncate pr-6 transition-colors"
                    )}
                  >
                    {note.title}
                  </h4>
                  <p
                    className={cn(
                      "text-xs leading-relaxed overflow-hidden text-ellipsis whitespace-nowrap"
                    )}
                  >
                    {note.content || "Empty note"}
                  </p>
                </div>
                <div
                  className={cn(
                    "flex items-center justify-between text-[10px]"
                  )}
                >
                  <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2
                      className="h-4 w-4 hover:text-red-400"
                      onClick={(e) => handleDeleteNote(note.id, e)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div
            className={cn(
              "col-span-full py-8 text-center border border-dashed border-white/10",
              settings.shortcuts.viewPreset === "minimal"
                ? "bg-transparent rounded-2xl"
                : "bg-white/5 rounded-3xl"
            )}
          >
            <p className="text-white/40 text-sm">
              No notes yet. Add one to get started!
            </p>
          </div>
        )}
      </div>

      {/* Edit/View Note Dialog */}
      <Dialog
        open={!!editingNote}
        onOpenChange={(open) => !open && setEditingNote(null)}
      >
        <DialogContent className="bg-zinc-900 border-white/10 text-white sm:max-w-[600px] h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>
          <div className="flex-1 space-y-4 py-4 overflow-y-auto">
            <Input
              placeholder="Title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="text-xl font-bold bg-transparent border-none p-0 focus-visible:ring-0 h-auto"
            />
            <Textarea
              placeholder="Start typing..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="flex-1 bg-transparent border-none p-0 focus-visible:ring-0 resize-none text-white/80 leading-relaxed min-h-[300px]"
            />
          </div>
          <DialogFooter className="border-t border-white/10 pt-4 gap-2">
            <Button
              variant="ghost"
              className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
              onClick={() => editingNote && handleDeleteNote(editingNote.id)}
            >
              Delete
            </Button>
            <div className="flex-1" />
            <Button variant="ghost" onClick={() => setEditingNote(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateNote}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View All Notes Dialog */}
      <Dialog open={isAllNotesOpen} onOpenChange={setIsAllNotesOpen}>
        <DialogContent className="bg-zinc-900 border-white/10 text-white sm:max-w-[700px] max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>All Notes</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsAllNotesOpen(false);
                  setIsAddDialogOpen(true);
                  resetForm();
                }}
                className="h-8 gap-2 text-primary"
              >
                <Plus className="h-4 w-4" /> New Note
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-2 pr-4 space-y-3 custom-scrollbar">
            {notes.map((note) => (
              <div
                key={note.id}
                onClick={() => {
                  setIsAllNotesOpen(false);
                  openEditDialog(note);
                }}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer group"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1 overflow-hidden">
                    <h4 className="font-medium text-white/90 truncate">
                      {note.title}
                    </h4>
                    <p className="text-sm text-white/50 line-clamp-1">
                      {note.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-white/20 shrink-0">
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </span>
                    <Trash2
                      className="h-4 w-4 text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNote(note.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
