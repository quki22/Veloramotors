export type ContactLanguage = "en" | "ru";

export type ContactFormData = {
  name: string;
  phone: string;
  email?: string;
  motorcycle?: string;
  message?: string;
  language: ContactLanguage;
};

export type ContactRequest = ContactFormData & {
  createdAt: string;
};

export type ContactSubmitResult = {
  success: true;
  mode: "api" | "local";
  messageId: string;
};

const LOCAL_STORAGE_KEY =
  "velora-moto-contact-submissions";

const contactEndpoint =
  import.meta.env.VITE_CONTACT_ENDPOINT?.trim();

function createMessageId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `velora-${Date.now()}-${Math.random()
    .toString(16)
    .slice(2)}`;
}

function createRequest(
  formData: ContactFormData,
): ContactRequest {
  return {
    name: formData.name.trim(),
    phone: formData.phone.trim(),
    email: formData.email?.trim() || undefined,
    motorcycle:
      formData.motorcycle?.trim() || undefined,
    message: formData.message?.trim() || undefined,
    language: formData.language,
    createdAt: new Date().toISOString(),
  };
}

function saveSubmissionLocally(
  request: ContactRequest,
  messageId: string,
) {
  const currentValue = localStorage.getItem(
    LOCAL_STORAGE_KEY,
  );

  let submissions: Array<
    ContactRequest & {
      id: string;
    }
  > = [];

  if (currentValue) {
    try {
      const parsedValue: unknown =
        JSON.parse(currentValue);

      if (Array.isArray(parsedValue)) {
        submissions = parsedValue.filter(
          (
            item,
          ): item is ContactRequest & {
            id: string;
          } =>
            typeof item === "object" &&
            item !== null &&
            "id" in item,
        );
      }
    } catch {
      submissions = [];
    }
  }

  submissions.push({
    id: messageId,
    ...request,
  });

  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(submissions),
  );
}

async function submitToApi(
  request: ContactRequest,
  signal?: AbortSignal,
): Promise<ContactSubmitResult> {
  if (!contactEndpoint) {
    throw new Error(
      "Contact endpoint is not configured.",
    );
  }

  const response = await fetch(contactEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
    signal,
  });

  if (!response.ok) {
    throw new Error(
      `Contact request failed with status ${response.status}.`,
    );
  }

  let responseId: string | undefined;

  try {
    const responseData: unknown =
      await response.json();

    if (
      typeof responseData === "object" &&
      responseData !== null &&
      "id" in responseData &&
      typeof responseData.id === "string"
    ) {
      responseId = responseData.id;
    }
  } catch {
    responseId = undefined;
  }

  return {
    success: true,
    mode: "api",
    messageId: responseId ?? createMessageId(),
  };
}

export async function submitContactForm(
  formData: ContactFormData,
  signal?: AbortSignal,
): Promise<ContactSubmitResult> {
  const request = createRequest(formData);

  if (!request.name) {
    throw new Error("Name is required.");
  }

  if (!request.phone) {
    throw new Error("Phone is required.");
  }

  if (contactEndpoint) {
    return submitToApi(request, signal);
  }

  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, 700);
  });

  const messageId = createMessageId();

  try {
    saveSubmissionLocally(request, messageId);
  } catch {
    throw new Error(
      "The request could not be saved locally.",
    );
  }

  return {
    success: true,
    mode: "local",
    messageId,
  };
}