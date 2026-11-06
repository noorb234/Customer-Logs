const KEY = "jobs";

export function loadJobs() {
  try {
    const saved = localStorage.getItem(KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveJobs(jobs) {
  localStorage.setItem(KEY, JSON.stringify(jobs));
}