"use client";

import { useEffect } from "react";

export default function TrackBookView({ bookId }: { bookId: number }) {
useEffect(() => {
  const key = `viewed-${bookId}`;

  console.log("KEY:", key);
  console.log("EXISTS:", sessionStorage.getItem(key));

  if (sessionStorage.getItem(key)) return;

  sessionStorage.setItem(key, "1");

  console.log("SENDING VIEW REQUEST");

  fetch(`/api/books/${bookId}/view`, {
    method: "POST",
  });
}, [bookId]);

  return null;
}