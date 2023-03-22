import { FormEventHandler, useCallback, useState } from "react";
import styles from "./InlineNewsletterForm.module.scss";

export const InlineNewsletterForm: React.FC<
  React.PropsWithChildren<{
    formId: string;
    copyText?: string;
    noRSS?: boolean;
  }>
> = ({ formId, copyText, noRSS, children }) => {
  const emailNameAttribute = "email";
  const firstNameNameAttribute = "firstName";

  const [success, setSuccess] = useState<boolean | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: FormEventHandler = useCallback(
    async (event) => {
      event.preventDefault();
      setIsLoading(true);

      const target = event.target as HTMLFormElement;
      const data = new FormData(target);
      const email = data.get(emailNameAttribute);
      const firstName = data.get(firstNameNameAttribute);

      const body = JSON.stringify({
        formId,
        firstName,
        email,
      });

      const headers = new Headers({
        "Content-Type": "application/json; charset=utf-8",
      });

      try {
        const response = await fetch(`/api/newsletter/subscribe`, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers,
          body,
        });

        if (response.status === 200) {
          setSuccess(true);
          setIsLoading(false);
          return;
        }

        setSuccess(false);
        setIsLoading(false);
      } catch {
        setSuccess(false);
        setIsLoading(false);
      }
    },
    [formId]
  );

  if (success === false) {
    return (
      <p>
        Sorry, Something went wrong, please try again by refreshing the page.
      </p>
    );
  }

  if (success) {
    return (
      <p>
        Niceeee 🔥🔥🔥 Thanks for subscribing 🙏, Please confirm your
        subscription by clicking on the link sent to your email inbox.
      </p>
    );
  }

  return (
    <>
      <p className={styles.copy}>
        {copyText
          ? copyText
          : "Get the latest web dev tips & tools by subscribing to my newsletter. Never miss out on valuable insights and resources to make the web a better place."}
      </p>

      {noRSS ? null : (
        <p>
          You can also subscribe to my <a href="/api/rss">RSS feed</a>.
        </p>
      )}

      <form className={styles.form} target="_blank" onSubmit={onSubmit}>
        <input
          className={styles.input}
          type="text"
          name={firstNameNameAttribute}
          aria-label="Your name"
          placeholder="First Name"
          required
        />

        <input
          className={styles.input}
          type="email"
          name={emailNameAttribute}
          aria-label="Your email address"
          placeholder="your@email.com"
          required
        />

        <button className={styles.button}>
          {isLoading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </>
  );
};
