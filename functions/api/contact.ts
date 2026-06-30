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
    website: clean(formData.get("website")),
    topic: clean(formData.get("thema")),
    message: clean(formData.get("ausgangslage")),
  };

  const missingField = requiredFields.find((field) => {
    if (field === "thema") return values.topic.length === 0;
    if (field === "ausgangslage") return values.message.length === 0;
    return values[field].length === 0;
  });

  if (missingField || !isEmail(values.email)) {
    return new Response("Bitte alle Pflichtfelder korrekt ausfüllen.", { status: 400 });
  }

  const apiKey = env.RESEND_API_KEY;
  const to = env.CONTACT_TO_EMAIL ?? "kontakt@digitalwerk.de";
  const from = env.CONTACT_FROM_EMAIL ?? "Digitalwerk <kontakt@digitalwerk.de>";

  if (!apiKey) {
    return new Response("Kontaktformular ist noch nicht konfiguriert.", { status: 500 });
  }

  const text = [
    `Name: ${values.name}`,
    `Unternehmen: ${values.company || "-"}`,
    `E-Mail: ${values.email}`,
    `Website: ${values.website || "-"}`,
    `Thema: ${values.topic}`,
    "",
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
    return new Response("Anfrage konnte nicht gesendet werden.", { status: 502 });
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
