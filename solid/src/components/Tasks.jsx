import { A } from "solid-start";
import TaskForm from "~/components/TaskForm";
import { useAuth } from "~/context/auth";
import { useTasks } from "~/context/tasks";
import Modal from "./Modal";

const Tasks = () => {
  const { auth } = useAuth();
  const { tasks, edittedTask, setEdittedTask, onDeleteTask } = useTasks();

  return (
    <section class="section">
      <Show when={!tasks.error} fallback={<p>some err</p>}>
        <ul class="tasks container-l flow p-s">
          <Show when={auth()}>
            <li>
              <A href="/create">
                <button class="btn mx-auto bg-secondary mx-m rounded-s">
                  Create Task
                </button>
              </A>
            </li>
          </Show>
          <For each={tasks()} fallback={<p>There are no tasks...</p>}>
            {t => (
              <li class="task gap-s p-s rounded-m flow">
                <h2 class="hover">
                  <A href={`/tasks/${t.id}`}>{t.title}</A>
                </h2>
                <div class="task-tools">
                  <input type="checkbox" class="task-done" checked={!!t.done} />
                  <button
                    class="btn bg-primary-500 rounded-s mx-s"
                    onClick={() =>
                      setEdittedTask({
                        id: t.id,
                        title: t.title,
                        description: t.description,
                      })
                    }
                  >
                    Edit
                  </button>
                  <button
                    class="btn bg-primary-500 rounded-s"
                    onClick={[onDeleteTask, t.id]}
                  >
                    Delete
                  </button>
                </div>
                <p>Last update: {t.updated_at}</p>
              </li>
            )}
          </For>
        </ul>
        <Show when={edittedTask()}>
          <Modal onCloseModal={() => setEdittedTask(null)}>
            <TaskForm task={edittedTask()} />
          </Modal>
        </Show>
      </Show>
    </section>
  );
};

export default Tasks;
