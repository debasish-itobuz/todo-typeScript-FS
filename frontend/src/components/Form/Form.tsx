import React from "react";

function Form({ setTodos }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.todo.value;
    setTodos((prevTodos) => [
      ...prevTodos,
      { title: value, id: self.crypto.randomUUID(), is_completed: false },
    ]);
    event.target.reset();
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      …
    </form>
  );
}
export default Form;
