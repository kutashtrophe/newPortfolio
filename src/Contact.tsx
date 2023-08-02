import React from "react";

const Contact: React.FC = () => {
  const email = "seankutash@gmail.com";
  const subject = "Regarding Your Services";
  const body =
    "Dear Sean,\n\nI am interested in your services. Can you provide me with more information?\n\nThank you.";

  const openGmail = () => {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <button
      className="text-white flex justify-center hover:text-blue-800 mb-2 px-4 bg-transparent"
      onClick={openGmail}
    >
      Contact
    </button>
  );
};

export default Contact;
