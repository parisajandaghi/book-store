export const forgotPassword = async (email: string) => {
  const response = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "خطایی در درخواست بازیابی رمز عبور رخ داد.");
  }

  return data;
};

export const resetPassword = async (token: string, newPassword: string) => {
  const response = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, newPassword }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "لینک نامعتبر است یا خطایی رخ داده است.");
  }

  return data;
};
