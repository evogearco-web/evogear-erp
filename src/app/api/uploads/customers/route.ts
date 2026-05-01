import { NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

const allowed = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });
  if (!allowed.includes(file.type)) return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
  if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: 'File too large' }, { status: 400 });

  const bytes = Buffer.from(await file.arrayBuffer());
  const dir = path.join(process.cwd(), 'public/uploads/customers');
  await mkdir(dir, { recursive: true });
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  await writeFile(path.join(dir, fileName), bytes);
  return NextResponse.json({ fileUrl: `/uploads/customers/${fileName}`, fileName, mimeType: file.type, sizeBytes: file.size });
}
