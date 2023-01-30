import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import Toast from "~/components/Toast";

const ToastContext = createContext();

const ToastProvider = props => {
  const [toasts, setToasts] = createStore([]);
  const toastId = () =>
    toasts.length > 0 ? Math.max(...toasts.map(t => t.id)) + 1 : 0;

  const createToast = (type, message) =>
    setToasts(prev => [{ id: toastId(), type, message }, ...prev]);

  const deleteToast = id => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={{ onCreateToast: createToast }}>
      <div class="toasts flow">
        <For each={toasts}>
          {t => (
            <Toast
              id={t.id}
              type={t.type}
              message={t.message}
              onDeleteToast={deleteToast}
            />
          )}
        </For>
      </div>
      {props.children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export const useToast = () => useContext(ToastContext);
