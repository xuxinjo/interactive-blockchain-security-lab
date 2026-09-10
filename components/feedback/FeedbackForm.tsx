"use client";

import { FormEvent, useEffect, useState } from "react";

interface FeedbackEntry {
  id: string;
  name?: string;
  note: string;
  createdAt: string;
}

const STORAGE_KEY = "ibsl-feedback-notes";

export function FeedbackForm() {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState<FeedbackEntry[]>([]);
  const [message, setMessage] = useState("");
  const [removed, setRemoved] = useState<FeedbackEntry | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) setEntries(parsed.filter((item): item is FeedbackEntry => typeof item?.id === "string" && typeof item?.note === "string" && typeof item?.createdAt === "string" && (item.name === undefined || typeof item.name === "string")));
    } catch {
      setEntries([]);
    }
  }, []);

  function persist(updated: FeedbackEntry[]) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setEntries(updated);
      return true;
    } catch {
      setMessage("This browser could not save your notes. Your draft is still here; check that browser storage is available.");
      return false;
    }
  }

  function exportNotes() {
    const text = entries.map((entry) => `${new Date(entry.createdAt).toLocaleString()}${entry.name ? ` · ${entry.name}` : ""}\n${entry.note}`).join("\n\n---\n\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "security-lab-notes.txt";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!note.trim()) {
      return;
    }

    const entry: FeedbackEntry = {
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: name.trim() || undefined,
      note: note.trim(),
      createdAt: new Date().toISOString()
    };

    const updated = [entry, ...entries].slice(0, 20);
    if (persist(updated)) {
      setNote("");
      setMessage("Note saved in this browser.");
      setRemoved(null);
    }
  }

  return (
    <section className="panel space-y-4" aria-label="Feedback form">
      <p className="text-sm text-slate-300">
        Feedback is stored in this browser only for thesis iteration notes. Please avoid personal information.
      </p>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Note prompts">{["Something I learned: ", "A question I have: ", "An improvement: "].map((prompt) => <button key={prompt} className="filter-chip" onClick={() => setNote((current) => `${current}${current ? "\n" : ""}${prompt}`.slice(0, 1000))}>{prompt.replace(": ", "")}</button>)}</div>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-200">Optional name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
            maxLength={60}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-200">Remark</span>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            className="min-h-24 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
            required
            maxLength={1000}
          />
        </label>
        <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="submit" className="action-button" data-primary="true" disabled={!note.trim()}>
          Save local note
        </button>
        <span className="text-xs text-slate-400">{note.length} / 1,000 characters</span>
        </div>
      </form>
      <p className="text-sm text-teal-200" role="status">{message}</p>
      {removed && <button className="action-button" onClick={() => { if (persist([removed, ...entries].slice(0, 20))) { setRemoved(null); setMessage("Note restored."); } }}>Undo removal</button>}

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-medium text-white">Stored notes ({entries.length})</h3><button className="action-button" disabled={!entries.length} onClick={exportNotes}>Export notes ↓</button></div>
        <ul className="mt-2 space-y-2 text-sm text-slate-300">
          {entries.map((entry) => (
            <li key={entry.id} className="rounded-md border border-slate-700 bg-slate-900 p-3">
              <p className="whitespace-pre-wrap">{entry.note}</p>
              <p className="mt-1 text-xs text-slate-400">
                {entry.name ? `${entry.name} - ` : ""}
                {new Date(entry.createdAt).toLocaleString()}
              </p>
              <button className="mt-2 min-h-11 text-xs text-slate-400 hover:text-rose-200" aria-label={`Remove note from ${new Date(entry.createdAt).toLocaleString()}`} onClick={() => { if (persist(entries.filter((item) => item.id !== entry.id))) { setRemoved(entry); setMessage("Note removed. You can undo this below the form."); } }}>Remove note</button>
            </li>
          ))}
          {!entries.length && <li className="rounded-xl border border-dashed border-slate-700 p-6 text-center"><p className="font-medium text-slate-200">A place for your next insight.</p><p className="mt-2 text-slate-400">No local notes yet. Choose a prompt above or start with your own thought.</p></li>}
        </ul>
      </div>
    </section>
  );
}
