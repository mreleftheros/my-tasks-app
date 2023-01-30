import { createResource } from "solid-js";
import { useParams } from "solid-start";
import { idParam_get } from "~/lib/tasks";

const id = () => {
  const params = useParams();
  const [task] = createResource(params.id, idParam_get);

  return (
    <div>
      <Show when={!task.loading} fallback={<p>Loading task...</p>}>
        <p>{task().title}</p>
      </Show>
    </div>
  );
};

export default id;
