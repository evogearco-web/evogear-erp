import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function POST(req: Request, { params }: { params: { id: string } }) { const { content } = await req.json(); const note = await prisma.customerNote.create({ data: { customerId: params.id, content } }); await prisma.customerActivity.create({ data: { customerId: params.id, type: 'CUSTOMER_NOTE_ADDED', description: 'Customer note added' } }); return NextResponse.json(note); }
