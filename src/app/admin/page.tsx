"use client";

import React, { useEffect, useState } from 'react';

type FlatItem = { path: string; value: string };

function flatten(obj: any, prefix = '', out: FlatItem[] = []): FlatItem[] {
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

// רשימת הקטגוריות המבוקשות (לפי המבנה בתוך ה-JSON של השפות)
const CATEGORIES = [
  { id: 'hero', label: 'Hero / הדר' },
  { id: 'nav', label: 'Navigation / ניווט' },
  { id: 'roadmap', label: 'Roadmap / מפת דרכים' },
  { id: 'quickGlance', label: 'Quick Glance / מבט מהיר' },
  { id: 'team', label: 'Team / צוות' },
  { id: 'plan', label: 'Plan & Financials / תוכנית ופיננסים' },
  { id: 'technology', label: 'Technology / טכנולוגיה' },
  { id: 'investors', label: 'Investors / משקיעים' },
  { id: 'faq', label: 'FAQ / שאלות ותשובות' },
  { id: 'contact', label: 'Contact / יצירת קשר' }
];

export default function AdminPage() {
  const [data, setData] = useState<any>(null);
  const [flat, setFlat] = useState<FlatItem[]>([]);
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [status, setStatus] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const [activeTab, setActiveTab] = useState('roadmap'); // ברירת מחדל לקטגוריה הראשונה

  // פונקציה שמציגה סטטוס ומעלימה אותו (בקיפול) אחרי 5 שניות
  function displayStatus(msg: string) {
    setStatus(msg);
    setShowStatus(true);
    
    // אם ההודעה מכילה את אחד ממשפטי ההצלחה המבוקשים - נפעיל טיימר להעלמה
    if (msg.includes('האימות הצליח') || msg.includes('קוד גישה חדש נשלח')) {
      setTimeout(() => {
        setShowStatus(false);
      }, 3000); // 5000 מילישניות = 5 שניות
    }
  }

  // סעיף 3: הדף נטען ריק ללא סטטוס התחלתי וללא שליחה אוטומטית
  useEffect(() => {
    // השארנו ריק לפי בקשתך - השליחה רק בלחיצה
  }, []);

  // שליחת קוד גישה חדש בלחיצה על כפתור
  async function triggerNewOtp() {
    try {
      setData(null);
      setIsAuthorized(false);
      displayStatus('קוד גישה חדש נשלח למייל המנהל, אנא בדוק את תיבת הדואר שלך.');
      await fetch('/api/admin/dictionary');
    } catch (e) {
      displayStatus('שגיאה בבקשת קוד מהשרת.');
    }
  }

  // אימות הקוד וטעינת התוכן
  async function verifyAndLoad() {
    if (!password.trim()) {
      displayStatus('נא להזין את הקוד שהתקבל במייל.');
      return;
    }
    displayStatus('מבצע אימות...');
    try {
      const res = await fetch(`/api/admin/dictionary?code=${encodeURIComponent(password)}`);
      const j = await res.json();
      
      if (!res.ok) {
        displayStatus(j.message || 'קוד שגוי.');
        setIsAuthorized(false);
        return;
      }
      
      setData(j);
      setFlat(flatten(j));
      setIsAuthorized(true);
      displayStatus('האימות הצליח! הטעינה הושלמה.');
    } catch (e: any) {
      displayStatus(String(e.message || e));
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
    displayStatus('שומר שינויים...');
    try {
      const res = await fetch('/api/admin/dictionary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, data }),
      });
      const j = await res.json();
      if (!res.ok) {
        displayStatus(j.message || 'השמירה נכשלה.');
        return;
      }
      displayStatus(j.gitCommitted ? 'השינויים נשמרו ועדכנו ב-Git בהצלחה!' : 'נשמר בהצלחה (ללא Git commit)');
    } catch (e: any) {
      displayStatus(String(e.message || e));
    }
  }

  return (
    <div style={{ padding: 30, fontFamily: 'sans-serif', direction: 'rtl', maxWidth: 1200, margin: '0 auto', color: '#333' }}>
      <h2 style={{ borderBottom: '2px solid #3498db', paddingBottom: 10, color: '#2c3e50' }}>מערכת ניהול תוכן — WipeUp</h2>
      
      {/* תיבת חיווי סטטוס עם אפקט קיפול חלק (אנימציית גובה מקסימלי) */}
      <div style={{
        maxHeight: showStatus ? '100px' : '0px',
        opacity: showStatus ? 1 : 0,
        overflow: 'hidden',
        transition: 'all 0.5s ease-in-out',
        padding: showStatus ? '12px 15px' : '0px 15px',
        backgroundColor: '#ebf5fb',
        borderLeft: '4px solid #3498db',
        borderRadius: 4,
        marginBottom: showStatus ? 20 : 0,
        fontWeight: 'bold',
        color: '#2980b9'
      }}>
        {status}
      </div>

      {/* חלק א': טופס התחברות עם קוד ה-OTP */}
      {!isAuthorized && (
        <div style={{ padding: 25, border: '1px solid #e0e0e0', borderRadius: 8, backgroundColor: '#fdfefe', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <p style={{ marginTop: 0, color: '#666' }}>כדי לגשת לעריכת התוכן, לחץ על "שלח קוד" והזן את הקוד שקיבלת בתיבת הדואר.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 15, flexWrap: 'wrap' }}>
            <label style={{ fontWeight: 'bold' }}>קוד אימות זמני:</label>
            <input 
              type="text" 
              placeholder="6 ספרות"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={{ padding: '8px 12px', textAlign: 'center', letterSpacing: 2, width: 110, border: '1px solid #ccc', borderRadius: 4, fontSize: 16 }}
            />
            <button style={{ padding: '9px 20px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }} onClick={verifyAndLoad}>
              התחברות וטעינת תוכן
            </button>
            {/* סעיף 3: שינוי שם הכפתור ל"שלח קוד" */}
            <button style={{ padding: '9px 15px', backgroundColor: '#ecf0f1', color: '#2c3e50', border: '1px solid #bdc3c7', borderRadius: 4, cursor: 'pointer' }} onClick={triggerNewOtp}>
              שלח קוד
            </button>
          </div>
        </div>
      )}

      {/* חלק ב': אזור עריכת התוכן לפי קטגוריות */}
      {isAuthorized && data && (
        <div style={{ marginTop: 10 }}>
          <div style={{ marginBottom: 20 }}>
            <button 
              onClick={save} 
              style={{ padding: '12px 25px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: 6, fontSize: 16, cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            >
              💾 שמור שינויים באתר
            </button>
          </div>

          {/* תפריט לשוניות (Tabs) לקטגוריות */}
          <div style={{ display: 'flex', gap: 5, borderBottom: '2px solid #ddd', paddingBottom: 0, marginBottom: 20, overflowX: 'auto', whiteSpace: 'nowrap' }}>
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  style={{
                    padding: '10px 15px',
                    border: 'none',
                    background: isActive ? '#3498db' : 'transparent',
                    color: isActive ? 'white' : '#555',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    borderRadius: '5px 5px 0 0',
                    borderBottom: isActive ? '2px solid #2980b9' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* רשימת שדות קלט של הקטגוריה הנבחרת בלבד */}
          <div style={{ border: '1px solid #e0e0e0', padding: 20, backgroundColor: '#fff', borderRadius: 6, boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50', textTransform: 'capitalize', borderBottom: '1px solid #eee', paddingBottom: 8 }}>
              עריכת קטגוריה: {CATEGORIES.find(c => c.id === activeTab)?.label}
            </h3>
            
            <div style={{ maxHeight: '55vh', overflowY: 'auto', paddingLeft: 10 }}>
              {flat.map((it, i) => {
                // מזהה האם השדה שייך לקטגוריה הנוכחית (למשל en.roadmap.title או he.roadmap.items.0)
                const isFieldInActiveTab = it.path.startsWith(`en.${activeTab}.`) || it.path.startsWith(`he.${activeTab}.`) || it.path === `en.${activeTab}` || it.path === `he.${activeTab}`;
                
                if (!isFieldInActiveTab) return null;

                const isHebrew = it.path.startsWith('he.');

                return (
                  <div key={it.path} style={{ marginBottom: 15, borderBottom: '1px solid #f9f9f9', paddingBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                      <span style={{ fontSize: 11, color: '#95a5a6', direction: 'ltr' }}>{it.path}</span>
                      <span style={{ fontSize: 11, fontWeight: 'bold', backgroundColor: isHebrew ? '#f39c12' : '#2ecc71', color: 'white', padding: '2px 6px', borderRadius: 3 }}>
                        {isHebrew ? 'עברית 🇮🇱' : 'English 🇺🇸'}
                      </span>
                    </div>
                    
                    {/* אם הערך ארוך נציג תיבת טקסט, אם קצר נציג אינפוט רגיל */}
                    {it.value.length > 60 ? (
                      <textarea
                        rows={3}
                        style={{ width: '100%', padding: 10, boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: 4, fontFamily: 'inherit', fontSize: 14, direction: isHebrew ? 'rtl' : 'ltr' }}
                        value={it.value}
                        onChange={(e) => onChange(i, e.target.value)}
                      />
                    ) : (
                      <input 
                        type="text"
                        style={{ width: '100%', padding: 10, boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: 4, fontSize: 14, direction: isHebrew ? 'rtl' : 'ltr' }} 
                        value={it.value} 
                        onChange={(e) => onChange(i, e.target.value)} 
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}