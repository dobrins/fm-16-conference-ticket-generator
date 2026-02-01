import { useForm, Controller } from "react-hook-form";
import { schema, type FormFields } from "../validation/ticketGenerator.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./Input";
import InputFile from "./InputFile";
import styles from "./Form.module.scss";

// TYPINGS
interface PassedProps {
  onDataSubmit: (data: FormFields) => void;
}

// COMPONENT

const Form = ({ onDataSubmit }: PassedProps) => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormFields>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      github: "",
      avatar: null,
    },
  });

  const onSubmit = (data: FormFields) => {
    onDataSubmit(data);
  };

  return (
    <>
      <h1 className={styles["heading"]}>
        Your Journey to Coding Conf 2025 Starts Here!
      </h1>
      <h2 className={styles["subheading"]}>
        Secure your spot at next year's biggest coding conference.
      </h2>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className={styles["form"]}>
        <Controller
          name="avatar"
          control={control}
          render={({ field, fieldState }) => (
            <InputFile
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
              setError={setError}
              clearErrors={clearErrors}
            />
          )}
        />
        <InputField
          id="name"
          label="Full Name"
          type="text"
          autoComplete="name"
          registration={register("name")}
          error={errors.name?.message}
        />
        <InputField
          id="email"
          label="Email Address"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          registration={register("email")}
        />
        <InputField
          id="github"
          label="GitHub Username"
          type="text"
          registration={register("github")}
          error={errors.github?.message}
        />
        <button
          type="submit"
          className={styles["submit"]}>
          Generate My Ticket
        </button>
      </form>
    </>
  );
};

// EXPORT

export default Form;
