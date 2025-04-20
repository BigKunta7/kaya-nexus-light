/**
 * Schéma Zod pour la validation des données de projet
 */
import { z } from 'zod';

export const projectSchema = z.object({
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères').max(100),
  status: z.enum(['active', 'archived', 'pending'], { errorMap: () => ({ message: 'Statut invalide' }) }),
  description: z.string().optional(), // Optionnel
});

export type ProjectInput = z.infer<typeof projectSchema>;

// Exemple d'utilisation dans une API Route Next.js
/*
import type { NextApiRequest, NextApiResponse } from 'next';
import { projectSchema } from '@/lib/schemas/project';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const validatedData = projectSchema.parse(req.body);
      // ... logique de création du projet avec validatedData
      res.status(201).json({ message: 'Projet créé', data: validatedData });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ errors: error.flatten().fieldErrors });
      } else {
        res.status(500).json({ message: 'Erreur serveur' });
      }
    }
  }
}
*/
