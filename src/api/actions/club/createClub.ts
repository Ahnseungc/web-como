"use server";

export const createClub = async (formData: FormData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/club`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`동호회 신청 실패 (${response.status}): ${errorText}`);
  }

  return response.json();
};
