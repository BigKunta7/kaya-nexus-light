import React from "react";
import { SubsidiaryProject, ProjectTask, TaskStatus } from "../../modules/subsidiaries/types";
import Kanban from "../../components/ui/Kanban";

/**
 * Exemple d’utilisation du composant Kanban dans un dashboard projet de filiale.
 * Affiche les tâches par statut pour un projet donné.
 */
export default function SubsidiaryKanbanExample({ project }: { project: SubsidiaryProject }) {
  const columns = [
    {
      title: "À faire",
      cards: project.tasks.filter((t: ProjectTask) => t.status === TaskStatus.TODO).map((t: ProjectTask) => ({ content: t.name })),
    },
    {
      title: "En cours",
      cards: project.tasks.filter((t: ProjectTask) => t.status === TaskStatus.IN_PROGRESS).map((t: ProjectTask) => ({ content: t.name })),
    },
    {
      title: "Terminé",
      cards: project.tasks.filter((t: ProjectTask) => t.status === TaskStatus.DONE).map((t: ProjectTask) => ({ content: t.name })),
    },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Kanban des tâches du projet</h2>
      <Kanban columns={columns} />
    </div>
  );
}
