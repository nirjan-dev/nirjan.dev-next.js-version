import { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.CONVERTKIT_API_KEY;
const BASE_URL = "https://api.convertkit.com/v3";

function subscribeToForm(params: {
  formId: string;
  firstName: string;
  email: string;
}) {
  const url = [BASE_URL, `forms`, params.formId, "subscribe"].join("/");
  const body = JSON.stringify({
    api_key: API_KEY,
    email: params.email,
    first_name: params.firstName,
  });

  console.log({ url, body });

  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
  });

  return fetch(url, {
    method: "POST",
    headers,
    body,
  });
}

async function subscribeToFormHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  // best to validate this with Zod...

  try {
    const response = await subscribeToForm({
      formId: body.formId,
      firstName: body.firstName,
      email: body.email,
    });

    const responseBody = await response.json();
    console.log({ responseBody, status: responseBody.status });

    if (responseBody.error) {
      throw new Error(responseBody.error);
    }

    return res.send({ success: true });
  } catch (error) {
    console.log({ error });
    // return res.send({ success: false, status: 500 });
    return res.status(500).send({ success: false });
  }
}

export default subscribeToFormHandler;
