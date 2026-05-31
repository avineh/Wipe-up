import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import nodemailer from 'nodemailer';

const jsonPath = path.join(process.cwd(), 'src', 'i18n', 'dictionaries.json');

// משתנים גלובליים בזיכרון השרת לשמירת הקוד הזמני ותוקפו (למשל ל-10 דקות)
let currentOtp: string | null = null;
let otpExpiresAt: number = 0;

const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'wipeup2026@gmail.com';

// טרנספורטר לשליחת המייל (משתמש בהגדרות ה-Gmail שכבר הגדרת)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function commitDictionaryUpdate() {
  try {
    const relPath = path.relative(process.cwd(), jsonPath).replace(/\\\\/g, '/');
    execSync(`git rev-parse --is-inside-work-tree`, { cwd: process.cwd(), stdio: 'ignore' });
    execSync(`git add ${relPath}`, { cwd: process.cwd(), stdio: 'ignore' });
    const message = `Admin dictionary update via web editor`;
    execSync(`git commit -m \"${message}\"`, { cwd: process.cwd(), stdio: 'ignore' });
    return true;
  } catch (err) {
    return false;
  }
}

// פעולת GET - מחוללת קוד חדש, שולחת אותו למנהל, ולא מחזירה את המידע עדיין!
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const codeCheck = searchParams.get('code');

    // אם המשתמש שלח קוד לבדיקה
    if (codeCheck) {
      if (!currentOtp || Date.now() > otpExpiresAt) {
        return NextResponse.json({ error: 'expired', message: 'הקוד פג תוקף, אנא רענן את העמוד לקבלת קוד חדש.' }, { status: 401 });
      }
      if (codeCheck !== currentOtp) {
        return NextResponse.json({ error: 'unauthorized', message: 'קוד שגוי.' }, { status: 401 });
      }

      // הקוד נכון! רק עכשיו נקרא את הקובץ ונחזיר את המידע לדפדפן
      if (!fs.existsSync(jsonPath)) return NextResponse.json({ error: 'not-found' }, { status: 404 });
      const raw = fs.readFileSync(jsonPath, 'utf8');
      return NextResponse.json(JSON.parse(raw));
    }

    // אם המשתמש רק נכנס לעמוד (בלי קוד), נייצר קוד חדש בן 6 ספרות
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    currentOtp = generatedCode;
    otpExpiresAt = Date.now() + 10 * 60 * 1000; // תוקף ל-10 דקות

    // שליחת הקוד למייל המנהל
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: ADMIN_EMAIL,
      subject: '🔑 קוד כניסה חד פעמי למערכת הניהול - WipeUp',
      text: `שלום, קוד הגישה החד פעמי שלך לעריכת האתר הוא: ${generatedCode}\nהקוד בתוקף ל-10 דקות הקרובות.`,
    });

    // מחזירים אישור שהקוד נשלח (בלי לחשוף את הקוד או את הדאטה!)
    return NextResponse.json({ status: 'otp_sent', message: 'קוד אימות נשלח למייל המנהל.' });

  } catch (err) {
    console.error("Admin GET error:", err);
    return NextResponse.json({ error: 'server-error' }, { status: 500 });
  }
}

// פעולת POST - שמירת השינויים (גם כאן בודקים את ה-OTP)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body || typeof body.password !== 'string' || !body.password.trim()) {
      return NextResponse.json({ error: 'missing-password', message: 'קוד אימות נדרש.' }, { status: 400 });
    }
    
    // בדיקה שהקוד עדיין תקף ונכון
    if (!currentOtp || Date.now() > otpExpiresAt || body.password !== currentOtp) {
      return NextResponse.json({ error: 'unauthorized', message: 'קוד אימות שגוי או פג תוקף.' }, { status: 401 });
    }
    
    const payload = body.data;
    if (!payload) return NextResponse.json({ error: 'bad-request', message: 'Missing dictionary data.' }, { status: 400 });

    fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2), 'utf8');
    const gitCommitted = commitDictionaryUpdate();

    return NextResponse.json({ success: true, gitCommitted });
  } catch (err: any) {
    return NextResponse.json({ error: 'write-failed', message: err.message }, { status: 500 });
  }
}