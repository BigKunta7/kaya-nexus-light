import { render, screen } from "@testing-library/react";
import LanguageSwitcher from "../src/components/LanguageSwitcher";
test("renders language switcher", () => {
  render(<LanguageSwitcher />);
  expect(screen.getByTestId("language-switcher")).toBeInTheDocument();
});
