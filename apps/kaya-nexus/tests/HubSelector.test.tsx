import { render, screen } from "@testing-library/react";
import HubSelector from "../src/components/HubSelector";
test("renders hub selector", () => {
  render(<HubSelector />);
  expect(screen.getByTestId("hub-selector")).toBeInTheDocument();
});
