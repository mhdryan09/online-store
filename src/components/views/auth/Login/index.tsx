import Link from "next/link";
import styles from "./Login.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl ?? "/";
  // jika ada query callbackUrl, gunakan query callbackUrl, jika tidak ada gunakan /

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // menahan supaya tdk reload halaman
    setIsLoading(true);
    setError("");

    const form = event.target as HTMLFormElement;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      // jika tidak ada error
      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl); // redirect ke callbackUrl setelah login berhasil
      } else {
        setIsLoading(false);
        setError("Email or Password is incorrect");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Email or Password is incorrect");
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Login</h1>
      {error && <p className={styles.login__error}>{error}</p>}

      <div className={styles.login__form}>
        <form action="" onSubmit={handleSubmit}>
          <div className={styles.login__form__item}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              className={styles.login__form__item__input}
            />
          </div>

          <div className={styles.login__form__item}>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              className={styles.login__form__item__input}
            />
          </div>

          <button type="submit" className={styles.login__form__button}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>

      <p className={styles.register__link}>
        Don{"'"}t have an account? Sign Up
        <Link href="/auth/register">here</Link>
      </p>
    </div>
  );
};

export default LoginView;
