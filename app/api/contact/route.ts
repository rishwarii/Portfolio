import { NextResponse } from "next/server";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const NAME_MAX = 120;
const MESSAGE_MAX = 5000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function validateFields(name: string, email: string, message: string): FieldErrors {
  const fieldErrors: FieldErrors = {};

  if (name.length === 0) {
    fieldErrors.name = "Enter your name.";
  } else if (name.length > NAME_MAX) {
    fieldErrors.name = "Name is too long.";
  }

  if (email.length === 0) {
    fieldErrors.email = "Enter your email.";
  } else if (!EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "Enter a valid email.";
  }

  if (message.length === 0) {
    fieldErrors.message = "Enter a message.";
  } else if (message.length > MESSAGE_MAX) {
    fieldErrors.message = "Message is too long.";
  }

  return fieldErrors;
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  if (typeof payload !== "object" || payload === null) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const body = payload as Record<string, unknown>;
  const website = asString(body.website).trim();

  if (website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = asString(body.name).trim();
  const email = asString(body.email).trim();
  const message = asString(body.message).trim();
  const fieldErrors = validateFields(name, email, message);

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ ok: false, error: "invalid", fieldErrors }, { status: 400 });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();

  if (!accessKey) {
    return NextResponse.json(
      {
        ok: false,
        error: "not_configured"
      },
      { status: 503 }
    );
  }

  try {
    const upstream = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        message,
        subject: `Portfolio message from ${name}`
      })
    });

    const result = (await upstream.json()) as { success?: boolean };

    if (!upstream.ok || result.success !== true) {
      return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }
}
