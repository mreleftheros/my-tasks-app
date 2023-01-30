import { batch, createSignal, mergeProps } from "solid-js";
import { A } from "solid-start";
import { useAuth } from "~/context/auth";

const AuthBox = props => {
  const merged = mergeProps({ login: true }, props);
  const { login, signup } = useAuth();
  const [form, setForm] = createSignal({
    ...(!merged.login && { username: "", repeatPassword: "" }),
    email: "",
    password: "",
  });
  const [loading, setLoading] = createSignal(false);
  const [errors, setErrors] = createSignal({
    error: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    repeatPasswordError: "",
  });

  const updateInput = ({ target }) =>
    setForm(prev => ({ ...prev, [target.name]: target.value }));

  const submit = async e => {
    e.preventDefault();

    try {
      batch(() => {
        setLoading(true);
        setErrors({
          error: "",
          usernameError: "",
          emailError: "",
          passwordError: "",
          repeatPasswordError: "",
        });
      });

      if (merged.login) {
        const { error, errors } = await login(form().email, form().password);
        if (error) return setErrors(prev => ({ ...prev, error, ...errors }));
      } else {
        if (form().password !== form().repeatPassword) {
          return setErrors(prev => ({
            ...prev,
            repeatPasswordError: "Passwords do not match",
          }));
        }

        const { error, errors } = await signup(
          form().username,
          form().email,
          form().password
        );
        if (error) {
          return setErrors(prev => ({ ...prev, error, ...errors }));
        }
      }
    } catch (err) {
      setErrors(prev => ({ ...prev, error: err.message }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form class="container flow" autocomplete="off" onSubmit={submit}>
      <h2>{merged.login ? "Login" : "Sign up"}</h2>

      <Show when={!merged.login}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            required
            placeholder="Username..."
            value={form().username}
            onInput={updateInput}
          />
          <p>{errors().usernameError}</p>
        </div>
      </Show>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="Email..."
          value={form().email}
          onInput={updateInput}
        />
        <p>{errors().emailError}</p>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="Password..."
          value={form().password}
          onInput={updateInput}
        />
        <p>{errors().passwordError}</p>
      </div>
      <Show when={!merged.login}>
        <div>
          <label htmlFor="repeatPassword">Repeat Password</label>
          <input
            type="password"
            name="repeatPassword"
            id="repeatPassword"
            required
            placeholder="Repeat password..."
            value={form().repeatPassword}
            onInput={updateInput}
          />
          <p>{errors().repeatPasswordError}</p>
        </div>
      </Show>
      <p>{errors().error}</p>
      <button
        class="btn bg-secondary"
        classList={{ disabled: loading() }}
        disabled={loading()}
      >
        {loading() ? "Loading..." : merged.login ? "Login" : "Sign up"}
      </button>
      <Show when={merged.login}>
        <p>
          Don't have an account?<A href="/signup">Signup</A>
        </p>
      </Show>
      <Show when={!merged.login}>
        <p>
          Have an account?<A href="/login">Login</A>
        </p>
      </Show>
    </form>
  );
};

export default AuthBox;
