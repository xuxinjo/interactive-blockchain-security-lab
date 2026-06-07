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

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }
    try {
      const parsed = JSON.parse(raw) as FeedbackEntry[];
      setEntries(parsed);
    } catch {
      setEntries([]);
    }
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!note.trim()) {
      return;
    }

    const entry: FeedbackEntry = {
      id: crypto.randomUUID(),
      name: name.trim() || undefined,
      note: note.trim(),
      createdAt: new Date().toISOString()
    };

    const updated = [entry, ...entries].slice(0, 20);
    setEntries(updated);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setNote("");
  }

  return (
    <section className="panel space-y-4" aria-label="Feedback form">
      <p className="text-sm text-slate-300">
        Feedback is stored in this browser only for thesis iteration notes. Please avoid personal information.
      </p>
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
        <button type="submit" className="rounded-md border border-cyan-500 bg-cyan-900/30 px-4 py-2 text-sm text-cyan-100">
          Save local note
        </button>
      </form>

      <div>
        <h3 className="font-medium text-white">Stored notes ({entries.length})</h3>
        <ul className="mt-2 space-y-2 text-sm text-slate-300">
          {entries.map((entry) => (
            <li key={entry.id} className="rounded-md border border-slate-700 bg-slate-900 p-3">
              <p>{entry.note}</p>
              <p className="mt-1 text-xs text-slate-400">
                {entry.name ? `${entry.name} - ` : ""}
                {new Date(entry.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
          {!entries.length && <li>No local notes yet.</li>}
        </ul>
      </div>
    </section>
  );
}
