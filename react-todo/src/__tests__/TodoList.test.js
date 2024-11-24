import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList"; // Adjust path if necessary

// Test 1: Check if the component renders with initial todos
test("renders TodoList component with initial todos", () => {
  render(<TodoList />);

  // Use accessible queries to find todos
  const todos = screen.getAllByRole("listitem");
  expect(todos).toHaveLength(2); // Two initial todos
  expect(screen.getByText("Learn React")).toBeInTheDocument();
  expect(screen.getByText("Write Tests")).toBeInTheDocument();
});

// Test 2: Check if a new todo can be added
test("allows users to add a new todo", () => {
  render(<TodoList />);

  // Find input and button elements
  const input = screen.getByPlaceholderText("Add a new todo");
  const addButton = screen.getByRole("button", { name: "Add" });

  // Simulate adding a new todo
  fireEvent.change(input, { target: { value: "New Todo" } });
  fireEvent.click(addButton);

  // Verify the new todo appears
  expect(screen.getByText("New Todo")).toBeInTheDocument();
});

// Test 3: Check if a todo can be toggled
test("allows users to toggle a todo", () => {
  render(<TodoList />);

  // Find an initial todo and toggle it
  const todo = screen.getByText("Learn React");
  fireEvent.click(todo);

  // Verify the style is updated
  expect(todo).toHaveStyle("text-decoration: line-through");
});

// Test 4: Check if a todo can be deleted
test("allows users to delete a todo", () => {
  render(<TodoList />);

  // Find the delete button for the first todo
  const todo = screen.getByText("Learn React");
  const deleteButton = screen.getByRole("button", { name: /delete/i });

  // Simulate clicking delete
  fireEvent.click(deleteButton);

  // Verify the todo is removed
  expect(todo).not.toBeInTheDocument();
});
