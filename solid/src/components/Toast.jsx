import { createSignal, mergeProps, onMount } from "solid-js";

const Toast = props => {
  const merged = mergeProps(
    { id: null, type: "info", message: "", onDeleteToast: null },
    props
  );
  const [movedOut, setMovedOut] = createSignal(false);

  onMount(() => {
    const timer = setTimeout(() => setMovedOut(true), 3000);

    return () => clearTimeout(timer);
  });

  return (
    <div
      classList={{ "moved-out": movedOut() }}
      onTransitionEnd={[merged.onDeleteToast, merged.id]}
      class={`toasts-item px-s py-m rounded-m bg-${merged.type}`}
    >
      {merged.message}
    </div>
  );
};

export default Toast;
