import { useState } from "react";
import { Spinner } from "ui";
import isEmail from "validator/lib/isEmail";
import Image from "next/image";

import styles from "./ContactForm.module.scss";

export default function ContactForm() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
    subject: "StaticForms - Contact Form",
    honeypot: "", // if any value received in this field, form submission will be ignored.
    accessKey: "3135ae1f-c049-46c6-8ab1-182225c206c1", // get your access key from https://www.staticforms.xyz
  });

  const [errors, setErrors] = useState({
    name: null,
    email: null,
    message: null,
  });

  const [formState, setFormState] = useState<"UNSENT" | "SENDING" | "SENT">(
    "UNSENT"
  );

  const validateForm = () => {
    // reset form errors and validate again

    const newErrors = {
      name: null,
      email: null,
      message: null,
    };

    setErrors(newErrors);

    if (contactForm.name.length === 0) {
      //   setErrors({ ...errors, name: "Name is required" });
      newErrors.name = "Name is required";
    }
    if (contactForm.message.length < 10) {
      //   setErrors({
      //     ...errors,
      //     message: "Message must be at least 10 characters",
      //   });

      newErrors.message = "Message must be at least 10 characters";
    }
    if (!isEmail(contactForm.email)) {
      //   setErrors({ ...errors, email: "Email is not valid" });
      newErrors.email = "Email is not valid";
    }

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.message) {
      return false;
    } else {
      return true;
    }
  };

  const handleInputChange = (event) => {
    setContactForm({
      ...contactForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    setFormState("SENDING");

    fetch("https://api.staticforms.xyz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "form-name": "contact",
        ...contactForm,
      }),
    })
      .then((res) => {
        if (!res || res.status !== 200) {
          throw new Error("form submission api error");
        }
        setFormState("SENT");
      })
      .catch((error) => {
        console.error(error);
        alert("Sending message failed, Please try again");
        setFormState("UNSENT");
      });
  };
  return (
    <>
      <div className={styles.gridWrapper}>
        <section
          className={`${styles.formStatus} ${styles.gridWrapper__item} ${
            formState !== "SENT" ? styles.isInvisible : ""
          }`}
        >
          <p className={styles.formStatus__msg}>
            ✔ Message Sent successfully....
          </p>
          <Image
            className={styles.formStatus__img}
            src="/img/mail_sent.svg"
            alt=""
          />
        </section>
        <section
          className={`${styles.formStatus} ${styles.gridWrapper__item} ${
            formState !== "SENDING" ? styles.isInvisible : ""
          }`}
        >
          <p className="form-status__msg">Sending message....</p>
          <Spinner />
        </section>
        <form
          className={`${styles.form} ${styles.gridWrapper__item} ${
            formState !== "UNSENT" ? styles.isInvisible : ""
          }`}
          name="contact"
          action="https://api.staticforms.xyz/submit"
          method="post"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="honeypot"
            style={{ display: "none" }}
            value={contactForm.honeypot}
          />
          <div hidden>
            <label>
              Don’t fill this out: <input name="bot-field" />{" "}
            </label>
          </div>

          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="name">
              Name
            </label>
            {errors.name && (
              <p className={styles.form__errorMsg}>{errors.name}</p>
            )}
            <input
              className={`${styles.form__field} ${
                errors.name ? styles.hasError : ""
              }`}
              value={contactForm.name}
              onChange={handleInputChange}
              name="name"
              type="text"
              id="name"
            />
          </div>
          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="email">
              Email
            </label>
            {errors.email && (
              <p className={styles.form__errorMsg}>{errors.email}</p>
            )}
            <input
              className={`${styles.form__field} ${
                errors.message ? styles.hasError : ""
              }`}
              value={contactForm.email}
              onChange={handleInputChange}
              name="email"
              type="text"
              id="email"
            />
          </div>
          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="message">
              Message
            </label>
            {errors.message && (
              <p className={styles.form__errorMsg}>{errors.message}</p>
            )}
            <textarea
              className={`${styles.form__field} ${styles.withMinHeight} ${
                errors.message ? styles.hasError : ""
              }`}
              value={contactForm.message}
              onChange={handleInputChange}
              name="message"
              id="message"
            />
          </div>
          <div className={styles.form__group}>
            <button className={styles.form__actionBtn} type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
