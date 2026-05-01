import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function POST(req: Request, { params }: { params: { id: string } }) { const data = await req.json(); const follow = await prisma.customerFollowUp.create({ data: { ...data, customerId: params.id } }); await prisma.customerActivity.create({ data: { customerId: params.id, type: 'FOLLOW_UP_ADDED', description: 'Follow-up added' } }); return NextResponse.json(follow); }
