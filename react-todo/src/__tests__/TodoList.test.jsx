// src/__tests__/TodoList.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../TodoList";

describe("TodoList Component", () => {
  test("renders TodoList component correctly", () => {
    render(<TodoList />);
    expect(screen.getByText("Todo List")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Add a new todo")).toBeInTheDocument();
  });

  test("renders initial todos correctly", () => {
    render(<TodoList />);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Write tests")).toBeInTheDocument();
  });

  test("allows user to add a new todo", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Add a new todo");
    const button = screen.getByText("Add Todo");

    fireEvent.change(input, { target: { value: "Test new feature" } });
    fireEvent.click(button);

    expect(screen.getByText("Test new feature")).toBeInTheDocument();
  });

  test("toggles completion status of a todo", () => {
    render(<TodoList />);
    const todoItem = screen.getByText("Learn React");
    fireEvent.click(todoItem);

    expect(todoItem).toHaveStyle("text-decoration: line-through");

    fireEvent.click(todoItem);
    expect(todoItem).toHaveStyle("text-decoration: none");
  });

  test("deletes a todo", () => {
    render(<TodoList />);
    const deleteButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
  });
});
