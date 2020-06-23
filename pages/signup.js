import React from "react";
import { csrfToken, signin, providers } from "next-auth/client";
import Button from "@material-ui/core/Button";


// Remove csrftoken and email provider completely? 
export default ({ csrfToken, providers }) => {
  return (
    <>
      {/* <form
        method="post"
        action="/api/auth/signin/email"
        onSubmit={(e) => {
          e.preventDefault();
          signin("email", { email: document.getElementById("email").value });
        }}
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Email address
          <input type="text" id="email" name="email" />
        </label>
        <button type="submit">Sign in with Email</button>
      </form> */}

      {Object.values(providers).map((provider) =>
        provider.name === "Email" ? null : (
          <p key={provider.name}>
            <Button
              href={`/api/auth/signin/${provider.name.toLowerCase()}?callbackUrl=${
                process.env.NODE_ENV !== "production"
                  ? "http://localhost:3000/account-setup"
                  : process.env.SITE
              }`}
            >
              Sign in with {provider.name}
            </Button>
          </p>
        )
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  // const test = await csrfToken(context)
  return {
    props: {
      // csrfToken: await csrfToken(context),
      providers: await providers(context),
    },
  };
}
