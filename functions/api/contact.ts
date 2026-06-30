type ContactEnv = {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
};

type ContactContext = {
  request: Request;
  env: ContactEnv;
};

const requiredFields = ["name", "email", "thema", "ausgangslage"] as const;

export async function onRequestPost({ request, env }: ContactContext) {
  const formData = await request.formData();
  const values = {
    name: clean(formData.get("name")),
    company: clean(formData.get("unternehmen")),
    email: clean(formData.get("email")),
    phone: clean(formData.get("phone")),
    website: clean(formData.get("website")),
    topic: clean(formData.get("thema")),
    message: clean(formData.get("ausgangslage")),
    honeypot: clean(formData.get("website_url_confirm")),
  };

  if (values.honeypot) {
    return Response.redirect(new URL("/kontakt?sent=1", request.url), 303);
  }

  const missingField = requiredFields.find((field) => {
    if (field === "thema") return values.topic.length === 0;
    if (field === "ausgangslage") return values.message.length === 0;
    return values[field].length === 0;
  });

  if (missingField || !isEmail(values.email)) {
    return Response.redirect(new URL("/kontakt?error=validation", request.url), 303);
  }

  const apiKey = env.RESEND_API_KEY;
  const to = env.CONTACT_TO_EMAIL ?? "kontakt@digitalwerk.de";
  const from = env.CONTACT_FROM_EMAIL ?? "Digitalwerk <kontakt@digitalwerk.de>";

  if (!apiKey) {
    return Response.redirect(new URL("/kontakt?error=config", request.url), 303);
  }

  const text = [
    `Zeitpunkt: ${new Date().toISOString()}`,
    `User-Agent: ${request.headers.get("user-agent") ?? "-"}`,
    "",
    `Name: ${values.name}`,
    `Unternehmen / Branche: ${values.company || "-"}`,
    `E-Mail: ${values.email}`,
    `Telefon / WhatsApp: ${values.phone || "-"}`,
    `Website: ${values.website || "-"}`,
    `Thema: ${values.topic}`,
    "",
    "Was soll sich verbessern?",
    values.message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: values.email,
      subject: `Neue Digitalwerk Anfrage: ${values.topic}`,
      text,
    }),
  });

  if (!response.ok) {
    return Response.redirect(new URL("/kontakt?error=send", request.url), 303);
  }

  return Response.redirect(new URL("/kontakt?sent=1", request.url), 303);
}

export function onRequest() {
  return new Response("Method not allowed", { status: 405 });
}

function clean(value: FormDataEntryValue | null) {
  return String(value ?? "").trim().slice(0, 4000);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
