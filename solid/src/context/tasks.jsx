import {
  createContext,
  createEffect,
  createResource,
  createSignal,
  useContext,
} from "solid-js";
import {
  idParam_delete,
  idParam_put,
  index_get,
  index_post,
} from "~/lib/tasks";
import { useAuth } from "./auth";
import { useToast } from "./toast";

const TaskContext = createContext();

const TaskProvider = props => {
  const { auth } = useAuth();
  const [tasks, { mutate }] = createResource(auth, index_get, {
    initialValue: [],
  });
  const [edittedTask, setEdittedTask] = createSignal(null);
  const { onCreateToast } = useToast();

  createEffect(prev => {
    if (!prev) return tasks();
    if (prev?.length + 1 === tasks().length) {
      onCreateToast("success", "New task was added successfully!");
    } else if (prev?.length === tasks().length + 1) {
      onCreateToast("success", "Task was deleted successfully!");
    }
    return tasks();
  });

  const createTask = async (title, description) => {
    const { error, data, errors } = await index_post(title, description);
    if (error) return { error, errors };
    return mutate(prev => [data, ...prev]);
  };

  const updateTask = async (title, description) => {
    const { data } = await idParam_put(edittedTask()?.id, title, description);
    mutate(prev => prev.map(t => (t.id === edittedTask()?.id ? data : t)));
    onCreateToast("success", "Task updated successfully!");
    return setEdittedTask(null);
  };

  const deleteTask = async id => {
    try {
      const { error, errors, data } = await idParam_delete(id);
      if (error) return { error, errors };
      return mutate(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      throw err;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        edittedTask,
        setEdittedTask,
        onCreateTask: createTask,
        onDeleteTask: deleteTask,
        onUpdateTask: updateTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;

export const useTasks = () => useContext(TaskContext);
