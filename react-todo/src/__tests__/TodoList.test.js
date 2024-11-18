import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  // Test for initial render
  test("renders TodoList heading", () => {
    render(<TodoList />);
    const headingElement = screen.getByText(/Todo List/i);
    expect(headingElement).toBeInTheDocument();
  });

  // Test for initial state
  test("renders initial todos", () => {
    render(<TodoList />);
    const todoElement1 = screen.getByText(/Learn React/i);
    const todoElement2 = screen.getByText(/Build a Todo App/i);
    const todoElement3 = screen.getByText(/Write Tests/i);

    expect(todoElement1).toBeInTheDocument();
    expect(todoElement2).toBeInTheDocument();
    expect(todoElement3).toBeInTheDocument();
  });

  // Test adding todos
  test("allows users to add a new todo", () => {
    render(<TodoList />);
    const inputElement = screen.getByPlaceholderText(/Add a new todo/i);
    const buttonElement = screen.getByText(/Add Todo/i);

    fireEvent.change(inputElement, { target: { value: "New Todo" } });
    fireEvent.click(buttonElement);

    const newTodoElement = screen.getByText(/New Todo/i);
    expect(newTodoElement).toBeInTheDocument();
  });

  // Test toggling todos
  test("allows users to toggle todo completion", () => {
    render(<TodoList />);
    const todoElement = screen.getByText(/Learn React/i);

    fireEvent.click(todoElement);
    expect(todoElement).toHaveStyle("text-decoration: line-through");

    fireEvent.click(todoElement);
    expect(todoElement).toHaveStyle("text-decoration: none");
  });

  // Test deleting todos
  test("allows users to delete a todo", () => {
    render(<TodoList />);
    const deleteButton = screen.getByText(/Delete/i);

    fireEvent.click(deleteButton);
    const todoElement = screen.queryByText(/Learn React/i);
    expect(todoElement).not.toBeInTheDocument();
  });
});
