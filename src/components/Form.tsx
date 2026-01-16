import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./Input";
import styles from "./Form.module.scss";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  github: z.string().min(1, "GitHub is required"),
});

type FormFields = z.infer<typeof schema>;

// COMPONENT

const Form = () => {
  const {
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  return (
    <form
      action=""
      onSubmit={handleSubmit(onSubmit)}
      className={styles["form"]}>
      <Input
        id="name"
        label="Full Name"
        type="text"
        autoComplete="name"
        placeholder="Stephen King"
        registration={register("name", { required: "Name is required" })}
        error={errors.name?.message}
      />
      <Input
        id="email"
        label="Email Address"
        type="email"
        placeholder="stephenking@lorem.com"
        autoComplete="email"
        registration={register("email", { required: "Email is required" })}
        error={errors.email?.message}
      />
      <Input
        id="github"
        label="GitHub Username"
        type="text"
        placeholder="@stephenking"
        autoComplete="github"
        registration={register("github")}
        error={errors.github?.message}
      />
      <button
        type="submit"
        className={styles["submit-button"]}>
        Generate My Ticket
      </button>
    </form>
  );
};

// EXPORT

export default Form;
