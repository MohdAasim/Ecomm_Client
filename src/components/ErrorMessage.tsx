import React, { useMemo } from "react";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = "Something went wrong!",
}) => {
  const content = useMemo(() => {
    return <div className="error-message">{message}</div>;
  }, [message]);

  return content;
};

export default ErrorMessage;
