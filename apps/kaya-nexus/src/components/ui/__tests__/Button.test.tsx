// Setup jest-dom pour les assertions avancées
env.setupFilesAfterEnv = ['<rootDir>/jest.setup.js'];

// Mock Next.js navigation si besoin
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/',
}));

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("<Button />", () => {
  it("affiche le texte fourni", () => {
    render(<Button>Valider</Button>);
    expect(screen.getByText("Valider")).toBeInTheDocument();
  });

  it("déclenche l’action au clic", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Clique-moi</Button>);
    fireEvent.click(screen.getByText("Clique-moi"));
    expect(onClick).toHaveBeenCalled();
  });

  it("applique la variante primaire par défaut", () => {
    render(<Button>Test</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/bg-indigo-600/);
  });
});
