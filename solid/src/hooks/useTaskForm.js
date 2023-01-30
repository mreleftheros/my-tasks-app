import { batch, createSignal } from "solid-js";
import { useNavigate } from "solid-start";
import { useTasks } from "~/context/tasks";

export const useTaskForm = task => {
  const { onCreateTask, onUpdateTask } = useTasks();
  const [form, setForm] = createSignal({
    ...(task && { id: task.id }),
    title: task?.title ?? "",
    description: task?.description ?? "",
  });
  const [loading, setLoading] = createSignal(false);
  const [errors, setErrors] = createSignal({
    error: "",
    titleError: "",
    descriptionError: "",
  });

  const navigate = useNavigate();

  const updateInput = ({ target }) =>
    setForm(prev => ({ ...prev, [target.name]: target.value }));

  const submit = async e => {
    e.preventDefault();

    try {
      batch(() => {
        setErrors({
          main: "",
          titleError: "",
          descriptionError: "",
        });
        setLoading(true);
      });

      if (!form().title) {
        return setErrors(prev => ({
          ...prev,
          general: "Please revisit all fields",
          title: "Cannot be empty value",
        }));
      }

      // create or update
      if (!task) {
        const { error, errors } = await onCreateTask(
          form().title,
          form().description
        );
        if (error) {
          return setErrors({ error, ...errors });
        }
        return navigate("/");
      } else {
        const { error, errors } = await onUpdateTask(
          form().title,
          form().description
        );
        if (error) {
          return setErrors({ error, ...errors });
        }
      }
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    errors,
    updateInput,
    submit,
  };
};
