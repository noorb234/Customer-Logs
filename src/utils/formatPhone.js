export function phoneDigits(value) {
  return String(value ?? "").replace(/\D/g, "").slice(0, 10);
}

export function formatPhone(value) {
  const d = phoneDigits(value);
  if (d.length === 0) return "";
  if (d.length < 4) return `(${d}`;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}
