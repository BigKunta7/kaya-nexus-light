// Endpoint API REST - Centre d’aide (FAQ, articles)
import { NextRequest, NextResponse } from 'next/server';
import * as service from '@/modules/help/service';
import { z } from 'zod';

const articleSchema = z.object({ articleId: z.string() });

export async function GET(req: NextRequest) {
  // Liste tous les articles publiés
  const articles = await service.listHelpArticles();
  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
  // Récupère un article spécifique
  const body = await req.json();
  const parsed = articleSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Validation' }, { status: 400 });
  const article = await service.getHelpArticle(parsed.data.articleId);
  return NextResponse.json(article);
}
