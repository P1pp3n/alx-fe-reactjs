import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "./components/TodoList";

// Test to check if the TodoList renders correctly
test("renders TodoList component", () => {
  render(<TodoList />);
  // Verify component initial render
  expect(screen.getByText(/Todo List/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Add a new todo")).toBeInTheDocument();
  expect(screen.getByText("Add Todo")).toBeInTheDocument();
  expect(screen.getByText("Learn React")).toBeInTheDocument();
  expect(screen.getByText("Write Tests")).toBeInTheDocument();
  expect(screen.getByText("Build Todo App")).toBeInTheDocument();
});

// Test to check if the Add Todo button works
test("adds a new todo", () => {
  render(<TodoList />);
  // Simulate typing a new todo and clicking Add Todo
  fireEvent.change(screen.getByPlaceholderText("Add a new todo"), {
    target: { value: "New Todo" },
  });
  fireEvent.click(screen.getByText("Add Todo"));
  // Verify that the new todo is added
  expect(screen.getByText("New Todo")).toBeInTheDocument();
});

// Test to check if the Toggle Todo completion works
test("toggles todo completion", () => {
  render(<TodoList />);

  // Get the "Learn React" todo and click it to toggle completion
  const todoItem = screen.getByText("Learn React");
  fireEvent.click(todoItem);

  // Verify if the todo is crossed out (completed)
  expect(todoItem).toHaveStyle("text-decoration: line-through");

  // Click again to toggle back
  fireEvent.click(todoItem);
  expect(todoItem).not.toHaveStyle("text-decoration: line-through");
});

// Test to check if the Delete Todo button works
test("deletes a todo", () => {
  render(<TodoList />);

  // Get the delete button for the "Learn React" todo
  const deleteButton = screen.getAllByText("Delete")[0];
  fireEvent.click(deleteButton);

  // Verify if the "Learn React" todo is deleted
  expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
});
