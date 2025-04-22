import { render, screen } from "@testing-library/react";
import LoginForm from "../src/components/ui/LoginForm";
test("renders login form", () => {
  render(<LoginForm onLogin={() => {}} error={""} loading={false} />);
  expect(screen.getByTestId("email-input")).toBeInTheDocument();
});
