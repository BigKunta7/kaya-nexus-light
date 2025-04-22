import React from "react";

/**
 * Composant Stepper pour afficher les étapes d’un processus (onboarding, formulaires, etc.)
 * @param {object} props
 * @param {string[]} props.steps - Liste des labels des étapes
 * @param {number} props.current - Index de l’étape active (par défaut 0)
 * @returns {JSX.Element}
 * @example
 * <Stepper steps={["Début", "Infos", "Confirmation"]} current={1} />
 */
export default function Stepper({ steps = [], current = 0 }: { steps?: string[]; current?: number }) {
  return (
    <div className="flex items-center gap-4">
      {steps.map((label, idx) => (
        <div key={label} className="flex items-center">
          <div
            className={
              "rounded-full w-8 h-8 flex items-center justify-center font-bold " +
              (idx < current
                ? "bg-indigo-600 text-white"
                : idx === current
                ? "bg-indigo-200 text-indigo-900"
                : "bg-gray-300 text-gray-500")
            }
          >
            {idx + 1}
          </div>
          {idx < steps.length - 1 && (
            <div className="w-10 h-1 bg-gray-300 mx-2 rounded" />
          )}
        </div>
      ))}
    </div>
  );
}
