// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import Nav from "./components/Nav";
import AuthProvider from "./context/auth";
import TaskProvider from "./context/tasks";
import ToastProvider from "./context/toast";
import { TITLE } from "./data";
import "./korg/index.scss";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>{TITLE}</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense fallback={<p>Loading...</p>}>
          <ErrorBoundary fallback={err => err}>
            <ToastProvider>
              <AuthProvider>
                <TaskProvider>
                  <header class="header">
                    <Nav />
                  </header>
                  <main class="main">
                    <Routes>
                      <FileRoutes />
                    </Routes>
                  </main>
                  <footer class="footer bg-primary-950 text-primary-100">
                    <p>Copyright &copy; 2023 - My Tasks App</p>
                  </footer>
                </TaskProvider>
              </AuthProvider>
            </ToastProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
