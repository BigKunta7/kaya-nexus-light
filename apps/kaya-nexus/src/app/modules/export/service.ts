// Service d'export (CSV, PDF, Excel, API)
import { prisma } from '@/lib/prisma';

export async function exportProjectsCSV(userId: string) {
  // Récupère les projets de l'utilisateur et les formate en CSV
  const projects = await prisma.project.findMany({ where: { ownerId: userId } });
  // TODO: Conversion en CSV (utiliser une lib comme papaparse ou json2csv)
  return projects;
}

export async function exportAnalyticsPDF(userId: string) {
  // TODO: Générer un PDF à partir des analytics (utiliser une lib comme pdfkit)
  return Buffer.from('PDF non implémenté');
}
