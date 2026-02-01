import { useState } from "react";
import type { FormFields } from "../validation/ticketGenerator.schema";
import Form from "./Form";
import Ticket from "./Ticket";

// COMPONENT

const TicketGenerator = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketData, setTicketData] = useState<FormFields>({
    name: "",
    email: "",
    github: "",
    avatar: null,
  });

  const handleSubmit = (data: FormFields) => {
    setTicketData(data);
    setIsSubmitted(true);
  };

  return (
    <>
      {isSubmitted ? (
        <Ticket
          name={ticketData.name}
          email={ticketData.email}
          github={ticketData.github}
          avatar={ticketData.avatar!}
        />
      ) : (
        <Form onDataSubmit={handleSubmit} />
      )}
    </>
  );
};

// EXPORT

export default TicketGenerator;
