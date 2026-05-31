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
  const [password, setPassword] = useState(''); // ישמש כעת כקוד ה-OTP
  const [isAuthorized, setIsAuthorized] = useState(false); // חיווי אם עבר אימות
  const [status, setStatus] = useState('מבקש קוד גישה חדש מהשרת...');

  // בטעינה הראשונית - השרת אוטומטית מייצר ושולח מייל
  useEffect(() => {
    triggerNewOtp();
  }, []);

  async function triggerNewOtp() {
    try {
      setData(null);
      setIsAuthorized(false);
      setStatus('קוד גישה חדש נשלח למייל המנהל, אנא בדוק את תיבת הדואר שלך.');
      // תיקון: פנייה לנתיב ה-API המדויק שלך
      await fetch('/api/admin/dictionary');
    } catch (e) {
      setStatus('שגיאה בבקשת קוד מהשרת.');
    }
  }

  // פונקציית אימות הקוד שהוקלד
  async function verifyAndLoad() {
    if (!password.trim()) {
      setStatus('נא להזין את הקוד שהתקבל במייל.');
      return;
    }
    setStatus('מבצע אימות...');
    try {
      // תיקון: פנייה לנתיב ה-API המדויק שלך עם קוד ה-OTP ב-Query Params
      const res = await fetch(`/api/admin/dictionary?code=${encodeURIComponent(password)}`);
      const j = await res.json();
      
      if (!res.ok) {
        setStatus(j.message || 'קוד שגוי.');
        setIsAuthorized(false);
        return;
      }
      
      // אם הגענו לכאן - הקוד תקין והדאטה התקבלה!
      setData(j);
      setFlat(flatten(j));
      setIsAuthorized(true);
      setStatus('האימות הצליח! הטעינה הושלמה.');
    } catch (e: any) {
      setStatus(String(e.message || e));
    }
  }

  function onChange(index: number, val: string) {
    const next = [...flat];
    next[index].value = val;
    setFlat(next);

    const updatedData = JSON.parse(JSON.stringify(data));
    setAt(updatedData, next[index].path, val);
    setData(updatedData);
  }

  async function save() {
    setStatus('שומר שינויים...');
    try {
      // תיקון: פנייה לנתיב ה-API המדויק שלך לשמירת הנתונים
      const res = await fetch('/api/admin/dictionary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, data }), // שולח גם את הקוד הנוכחי לאימות
      });
      const j = await res.json();
      if (!res.ok) {
        setStatus(j.message || 'השמירה נכשלה.');
        return;
      }
      setStatus(j.gitCommitted ? 'השינויים נשמרו ועדכנו ב-Git בהצלחה!' : 'נשמר בהצלחה (ללא Git commit)');
    } catch (e: any) {
      setStatus(String(e.message || e));
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', direction: 'rtl' }}>
      <h2>מערכת ניהול תוכן — WipeUp</h2>
      
      {/* סטטוס וחיווי למשתמש (תקין / לא תקין / הודעות מערכת) */}
      <div style={{ padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5, marginBottom: 15, fontWeight: 'bold' }}>
        {status}
      </div>

      {/* חלק א': שורת הסיסמה - מוצגת רק אם עדיין לא מורשה */}
      {!isAuthorized && (
        <div style={{ marginBottom: 20, padding: 15, border: '1px solid #ccc', borderRadius: 5, backgroundColor: '#fafafa' }}>
          <label style={{ marginLeft: 8 }}>הזן קוד אימות זמני (נשלח למייל):</label>
          <input 
            type="text" 
            placeholder="6 ספרות"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ padding: 5, textAlign: 'center', letterSpacing: 2, width: 100 }}
          />
          <button style={{ marginRight: 8, padding: '5px 15px', cursor: 'pointer' }} onClick={verifyAndLoad}>
            התחברות וטעינת תוכן
          </button>
          <button style={{ marginRight: 8, padding: '5px 10px', backgroundColor: '#eee', border: '1px solid #bbb', cursor: 'pointer' }} onClick={triggerNewOtp}>
            שלח קוד חדש
          </button>
        </div>
      )}

      {/* חלק ב': התוכן של האתר - מוסתר לחלוטין ויופיע רק אחרי אימות מוצלח */}
      {isAuthorized && data && (
        <div>
          <div style={{ marginBottom: 15 }}>
            <button 
              onClick={save} 
              style={{ padding: '10px 20px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: 5, fontSize: 16, cursor: 'pointer' }}
            >
              💾 שמור שינויים באתר
            </button>
          </div>

          <div style={{ maxHeight: '60vh', overflow: 'auto', border: '1px solid #ddd', padding: 12, backgroundColor: '#fff' }}>
            {flat.map((it, i) => (
              <div key={it.path} style={{ marginBottom: 12, borderBottom: '1px solid #f1f1f1', paddingBottom: 8 }}>
                <div style={{ fontSize: 12, color: '#666', marginBottom: 4, direction: 'ltr', textAlign: 'right' }}>{it.path}</div>
                <input 
                  style={{ width: '100%', padding: 8, boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: 4 }} 
                  value={it.value} 
                  onChange={(e) => onChange(i, e.target.value)} 
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}