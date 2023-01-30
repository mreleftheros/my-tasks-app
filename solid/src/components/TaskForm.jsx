import { mergeProps, onMount } from "solid-js";
import { useTaskForm } from "~/hooks/useTaskForm";

const TaskForm = props => {
  const merged = mergeProps({ task: null }, props);
  const { form, loading, errors, updateInput, submit } = useTaskForm(
    merged.task
  );
  let inputRef;

  onMount(() => inputRef?.select());

  return (
    <form class="flow" onSubmit={submit} autocomplete="off">
      <h2>{merged.task ? "Edit Task" : "New Task"}</h2>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          ref={inputRef}
          value={form().title}
          onInput={updateInput}
        />
        <p>{errors?.title}</p>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={form().description}
          onInput={updateInput}
        />
        {errors?.description}
      </div>
      <p>{errors?.general}</p>
      <button
        class="btn bg-secondary"
        classList={{ disabled: loading() }}
        disabled={loading()}
      >
        {loading() ? "Sending..." : merged.task ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default TaskForm;
