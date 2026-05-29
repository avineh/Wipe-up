"use client";

import React, { useEffect, useState } from 'react';

type FlatItem = { path: string; value: string };

function flatten(obj: any, prefix = '', out: FlatItem[] = []) {
  if (obj == null) return out;
  if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
    out.push({ path: prefix, value: String(obj) });
    return out;
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => flatten(v, prefix ? `${prefix}.${i}` : `${i}`, out));
    return out;
  }
  Object.keys(obj).forEach((k) => {
    const p = prefix ? `${prefix}.${k}` : k;
    flatten(obj[k], p, out);
  });
  return out;
}

function setAt(obj: any, path: string, value: any) {
  const parts = path.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (!(p in cur)) cur[p] = {};
    cur = cur[p];
  }
  cur[parts[parts.length - 1]] = value;
}

export default function AdminPage() {
  const [data, setData] = useState<any>(null);
  const [flat, setFlat] = useState<FlatItem[]>([]);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  async function load() {
    setStatus('loading');
    try {
      const res = await fetch('/api/admin/dictionary');
      if (!res.ok) throw new Error('load failed');
      const json = await res.json();
      setData(json);
      setFlat(flatten(json));
      setStatus(null);
    } catch (e) {
      setStatus('failed to load');
    }
  }

  useEffect(() => { load(); }, []);

  function onChange(i: number, v: string) {
    const updated = [...flat];
    updated[i] = { ...updated[i], value: v };
    setFlat(updated);
  }

  async function save() {
    if (!data) return;
    setStatus('saving');
    // copy original data and apply edits
    const next = JSON.parse(JSON.stringify(data));
    flat.forEach((it) => {
      // only set string primitive paths
      setAt(next, it.path, it.value);
    });
    if (!password.trim()) {
      setStatus('Password is required.');
      return;
    }

    try {
      const res = await fetch('/api/admin/dictionary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, data: next })
      });
      const j = await res.json();
      if (!res.ok) {
        setStatus(j?.message || j?.error || 'save failed');
        return;
      }
      setStatus(j.gitCommitted ? 'saved and committed to git' : 'saved (git commit skipped or failed)');
      setTimeout(() => load(), 800);
    } catch (e: any) {
      setStatus(String(e.message || e));
    }
  }
  
  if (!data) return (
    <div style={{ padding: 20 }}>
      <h2>Admin — Dictionary Editor</h2>
      <p>Loading...</p>
      <p>{status}</p>
    </div>
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin — Dictionary Editor</h2>
      <div style={{ marginBottom: 12 }}>
        <label style={{ marginRight: 8 }}>Admin password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button style={{ marginLeft: 8 }} onClick={load}>Reload</button>
      </div>

      <div style={{ maxHeight: '60vh', overflow: 'auto', border: '1px solid #ddd', padding: 8 }}>
        {flat.map((it, i) => (
          <div key={it.path} style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 12, color: '#666' }}>{it.path}</div>
            <input style={{ width: '100%' }} value={it.value} onChange={(e) => onChange(i, e.target.value)} />
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={save} style={{ marginRight: 8 }}>Save changes</button>
        <button onClick={load}>Discard / Reload</button>
      </div>

      <div style={{ marginTop: 12, color: '#333' }}>{status}</div>
    </div>
  );
}
