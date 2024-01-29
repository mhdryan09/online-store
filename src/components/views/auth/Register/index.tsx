import Link from "next/link";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const RegisterView = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // menahan supaya tdk reload halaman
    setIsLoading(true);
    setError("");

    const form = event.target as HTMLFormElement;

    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      password: form.password.value,
      phone: form.phone.value,
    };

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // convert data to JSON string
    });

    if (result.status === 200) {
      form.reset(); // clear form fields
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email is Already Registered");
    }
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>
      {error && <p className={styles.register__error}>{error}</p>}

      <div className={styles.register__form}>
        <form action="" onSubmit={handleSubmit}>
          <div className={styles.register__form__item}>
            <label htmlFor="fullname">Fullname</label>
            <input
              name="fullname"
              id="fullname"
              type="text"
              className={styles.register__form__item__input}
            />
          </div>

          <div className={styles.register__form__item}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              className={styles.register__form__item__input}
            />
          </div>

          <div className={styles.register__form__item}>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              className={styles.register__form__item__input}
            />
          </div>

          <div className={styles.register__form__item}>
            <label htmlFor="phone">Phone Number</label>
            <input
              name="phone"
              id="phone"
              type="text"
              className={styles.register__form__item__input}
            />
          </div>
          <button type="submit" className={styles.register__form__button}>
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>

      <p className={styles.register__link}>
        Have an account? Sign in <Link href="/auth/login">here</Link>
      </p>
    </div>
  );
};

export default RegisterView;
