import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const jsonPath = path.join(process.cwd(), 'src', 'i18n', 'dictionaries.json');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

function commitDictionaryUpdate() {
  try {
    const relPath = path.relative(process.cwd(), jsonPath).replace(/\\/g, '/');
    execSync(`git rev-parse --is-inside-work-tree`, { cwd: process.cwd(), stdio: 'ignore' });
    execSync(`git add ${relPath}`, { cwd: process.cwd(), stdio: 'ignore' });
    const message = `Admin dictionary update via web editor`;
    execSync(`git commit -m "${message}"`, { cwd: process.cwd(), stdio: 'ignore' });
    return true;
  } catch (err) {
    return false;
  }
}

export async function GET() {
  try {
    if (!fs.existsSync(jsonPath)) return NextResponse.json({ error: 'not-found' }, { status: 404 });
    const raw = fs.readFileSync(jsonPath, 'utf8');
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'read-failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || typeof body.password !== 'string' || !body.password.trim()) {
      return NextResponse.json({ error: 'missing-password', message: 'Password is required.' }, { status: 400 });
    }
    if (body.password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'unauthorized', message: 'Invalid password.' }, { status: 401 });
    }
    const payload = body.data;
    if (!payload) return NextResponse.json({ error: 'bad-request', message: 'Missing dictionary data.' }, { status: 400 });

    fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2), 'utf8');
    const committed = commitDictionaryUpdate();
    return NextResponse.json({ ok: true, gitCommitted: committed });
  } catch (err) {
    return NextResponse.json({ error: 'write-failed', message: String(err) }, { status: 500 });
  }
}
