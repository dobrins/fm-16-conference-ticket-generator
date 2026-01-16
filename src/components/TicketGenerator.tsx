import Form from "./Form";
import styles from "./TicketGenerator.module.scss";

// COMPONENT

const TicketGenerator = () => {
  return (
    <>
      <h1 className={styles.title}>
        Your Journey to Coding Conf 2025 Starts Here!
      </h1>
      <h2 className={styles.subtitle}>
        Secure your spot at next year's biggest coding conference.
      </h2>
      <Form />
    </>
  );
};

// EXPORT

export default TicketGenerator;
