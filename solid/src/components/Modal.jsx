import { onCleanup } from "solid-js";

const clickOut = (el, acc) => {
  const onClick = e => !el.contains(e.target) && acc()?.();
  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
};

const Modal = props => {
  return (
    <div class="modal">
      <div
        class="modal-box container rounded-m bg-primary-50 p-s text-primary-950"
        use:clickOut={props.onCloseModal}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
