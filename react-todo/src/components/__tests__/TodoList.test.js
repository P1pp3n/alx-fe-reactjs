import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../TodoList";

// Test to check if the TodoList component renders correctly
test("renders TodoList component", () => {
  render(<TodoList />);
  // Verify component initial render
  expect(screen.getByText(/Todo List/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Add a new todo/i)).toBeInTheDocument();
  expect(screen.getByText("Learn React")).toBeInTheDocument();
  expect(screen.getByText("Learn Testing")).toBeInTheDocument();
});

// Test to check if a new todo can be added
test("adds a new todo", () => {
  render(<TodoList />);
  const input = screen.getByPlaceholderText(/Add a new todo/i);
  const button = screen.getByText(/Add Todo/i);

  // Simulate user input and form submission
  fireEvent.change(input, { target: { value: "New Todo" } });
  fireEvent.click(button);

  // Verify if the new todo is rendered
  expect(screen.getByText("New Todo")).toBeInTheDocument();
});

// Test to check if a todo can be toggled
test("toggles a todo", () => {
  render(<TodoList />);
  const todoItem = screen.getByText("Learn React");

  // Click to toggle the todo
  fireEvent.click(todoItem);
  // Check if the todo is marked as completed
  expect(todoItem).toHaveStyle("text-decoration: line-through");

  // Click again to toggle back
  fireEvent.click(todoItem);
  // Check if the todo is not completed
  expect(todoItem).toHaveStyle("text-decoration: none");
});

// Test to check if a todo can be deleted
test("deletes a todo", () => {
  render(<TodoList />);

  // Find the delete button for the first todo item
  const deleteButton = screen.getAllByText(/ Delete/i)[0];

  // Click the delete button
  fireEvent.click(deleteButton);

  // Verify that the todo item is no longer in the document
  expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
});
