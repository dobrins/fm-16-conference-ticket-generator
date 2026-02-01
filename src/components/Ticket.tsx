import { dateTwoMonthsFromNow } from "../utils/utils";
import type { FormFields } from "../validation/ticketGenerator.schema";
import styles from "./Ticket.module.scss";

// COMPONENT

const Ticket = ({ name, email, github, avatar }: FormFields) => {
  const avatarUrl = avatar ? URL.createObjectURL(avatar) : null;
  const githubUsername = github.startsWith("@") ? github : `@${github}`;
  const eventDate = dateTwoMonthsFromNow();
  const nameClassCss = name.length > 25 ? "name-small" : "name";
  const githubClassCss = github.length > 25 ? "github-small" : "github";

  return (
    <>
      <h1 className={styles["heading"]}>
        Congrats, <span className={styles["decoration"]}>{name}</span>! Your
        ticket is ready.
      </h1>
      <h2 className={styles["subheading"]}>
        We've emailed your ticket to{" "}
        <span className={styles["email"]}>{email}</span> and will send updates
        in the run up to the event.
      </h2>
      <div className={styles["ticket"]}>
        <div className={styles["header"]}>
          <img
            src="assets/images/logo-mark.svg"
            alt="Logo"
            className={styles["logo"]}
          />
          <h3 className={styles["title"]}>Coding Conf</h3>
          <p className={styles["date-and-location"]}>
            <span>{eventDate}</span> / <span>Austin, TX</span>
          </p>
        </div>
        <div className={styles["person"]}>
          <div className={styles["avatar"]}>
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt={`Avatar of ${name}`}
              />
            )}
          </div>
          <span className={styles[nameClassCss]}>{name}</span>
          <span className={styles[githubClassCss]}>
            <img
              src="assets/images/icon-github.svg"
              alt="GitHub"
            />
            {githubUsername}
          </span>
        </div>
        <div className={styles["number"]}>
          <span>#01609</span>
        </div>
      </div>
    </>
  );
};

// EXPORT

export default Ticket;
