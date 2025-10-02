"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Save,
  X,
  FileText,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extensions";
import { Problem } from "@/lib/types";

interface Note {
  id: string;
  user_id: string;
  problem_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export default function UserNotes({ problem }: { problem: Problem }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isEditingNote, setIsEditingNote] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your notes about this problem...",
      }),
    ],
    // content: noteContent,
    // autofocus: true,
    onUpdate: ({ editor }) => {
      setNoteContent(editor.getHTML());
    },

    immediatelyRender: false,
  });

  const handleSaveNote = () => {
    if (!noteTitle.trim() || !noteContent.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      user_id: "current-user",
      problem_id: problem.id,
      title: noteTitle,
      content: noteContent,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isEditingNote && currentNote) {
      setNotes(
        notes.map((note) =>
          note.id === currentNote.id
            ? {
                ...newNote,
                id: currentNote.id,
                created_at: currentNote.created_at,
              }
            : note
        )
      );
    } else {
      setNotes([...notes, newNote]);
    }

    setNoteTitle("");
    setNoteContent("");
    editor?.commands.clearContent();
    setCurrentNote(null);
    setIsEditingNote(false);
  };

  const handleEditNote = (note: Note) => {
    setCurrentNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    editor?.commands.setContent(note.content);
    setIsEditingNote(true);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {isEditingNote ? "Edit Note" : "Create New Note"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Note title..."
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            />
            <div className="border rounded-md">
              <div className="border-b p-2 flex items-center gap-1 flex-wrap">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={cn(
                    "h-8 w-8 p-0",
                    editor?.isActive("bold") && "bg-muted"
                  )}
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={cn(
                    "h-8 w-8 p-0",
                    editor?.isActive("italic") && "bg-muted"
                  )}
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor?.chain().focus().toggleBulletList().run()
                  }
                  className={cn(
                    "h-8 w-8 p-0",
                    editor?.isActive("bulletList") && "bg-muted"
                  )}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor?.chain().focus().toggleOrderedList().run()
                  }
                  className={cn(
                    "h-8 w-8 p-0",
                    editor?.isActive("orderedList") && "bg-muted"
                  )}
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor?.chain().focus().toggleBlockquote().run()
                  }
                  className={cn(
                    "h-8 w-8 p-0",
                    editor?.isActive("blockquote") && "bg-muted"
                  )}
                >
                  <Quote className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().undo().run()}
                  disabled={!editor?.can().undo()}
                  className="h-8 w-8 p-0"
                >
                  <Undo className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor?.chain().focus().redo().run()}
                  disabled={!editor?.can().redo()}
                  className="h-8 w-8 p-0"
                >
                  <Redo className="h-4 w-4" />
                </Button>
              </div>
              <div className="min-h-[300px] p-4">
                <EditorContent
                  editor={editor}
                  className="prose prose-sm max-w-none focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[250px]"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSaveNote}
                disabled={!noteTitle.trim() || !noteContent.trim()}
              >
                <Save className="h-4 w-4 mr-1" />
                {isEditingNote ? "Update" : "Save"} Note
              </Button>
              {isEditingNote && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditingNote(false);
                    setCurrentNote(null);
                    setNoteTitle("");
                    setNoteContent("");
                    editor?.commands.clearContent();
                  }}
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Notes</CardTitle>
            <CardDescription>
              {notes.length} {notes.length === 1 ? "note" : "notes"} saved
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              {notes.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No notes yet. Create your first note!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notes.map((note) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <Card className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm">{note.title}</h4>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditNote(note)}
                              className="h-6 w-6 p-0"
                            >
                              <FileText className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteNote(note.id)}
                              className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div
                          className="text-xs text-muted-foreground line-clamp-3 prose prose-xs max-w-none"
                          dangerouslySetInnerHTML={{ __html: note.content }}
                        />
                        <div className="text-xs text-muted-foreground mt-2">
                          {new Date(note.updated_at).toLocaleDateString()}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
