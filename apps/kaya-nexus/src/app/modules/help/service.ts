// Service centre d’aide (FAQ, guides, articles)
import { prisma } from '@/lib/prisma';

export async function listHelpArticles() {
  return prisma.helpArticle.findMany({ where: { published: true }, orderBy: { updatedAt: 'desc' } });
}

export async function getHelpArticle(articleId: string) {
  return prisma.helpArticle.findUnique({ where: { id: articleId } });
}
