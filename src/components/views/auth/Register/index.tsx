import Link from "next/link";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

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
          <Input label="Email" name="email" type="email" />
          <Input label="Full Name" name="fullname" type="text" />
          <Input label="Phone Number" name="phone" type="text" />
          <Input label="Password" name="password" type="password" />
          <Button type="submit" className={styles.register__form__button}>
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </form>
      </div>
      <p className={styles.register__link}>
        Have an account? Sign in <Link href="/auth/login">here</Link>
      </p>
    </div>
  );
};

export default RegisterView;
