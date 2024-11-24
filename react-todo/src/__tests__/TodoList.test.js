// src/__tests__/TodoList.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";
describe("TodoList Component", () => {
  test("renders TodoList component", () => {
    render(<TodoList />);
    expect(screen.getByText(/Todo List/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Add a new todo/i)).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Add a new todo/i);
    const button = screen.getByText(/Add Todo/i);

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(button);

    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });

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

  test("deletes a todo", () => {
    render(<TodoList />);

    // Find the delete button for the first todo item
    const deleteButton = screen.getAllByText(/Delete/i)[0];
    fireEvent.click(deleteButton);

    // Check if the todo has been removed
    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
  });
});
