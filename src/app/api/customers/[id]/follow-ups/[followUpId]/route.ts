import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function PATCH(_: Request, { params }: { params: { id: string; followUpId: string } }) { const follow = await prisma.customerFollowUp.update({ where: { id: params.followUpId }, data: { status: 'DONE' } }); await prisma.customerActivity.create({ data: { customerId: params.id, type: 'FOLLOW_UP_COMPLETED', description: 'Follow-up marked done' } }); return NextResponse.json(follow); }
