import { A } from "solid-start";
import { useAuth } from "~/context/auth";

const Nav = () => {
  const { auth, logout } = useAuth();

  return (
    <nav class="nav bg-primary-900 text-primary-50 px-s">
      <A href="/" class="nav-logo hover">
        My Tasks App
      </A>
      <div class="nav-links gap-m">
        <Show when={auth()}>
          <h4>Welcome, {auth().username}</h4>
          <A class="nav-link hover-reverse" href="/create">
            New Task
          </A>
        </Show>
        <Show when={!auth()}>
          <A class="nav-link hover-reverse" href="/login">
            Login
          </A>
        </Show>
        <A class="nav-link hover-reverse" href="/about">
          About
        </A>
        <Show when={auth()}>
          <button onClick={logout} class="btn bg-secondary rounded-s">
            Logout
          </button>
        </Show>
      </div>
    </nav>
  );
};

export default Nav;
