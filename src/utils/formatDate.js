export function formatDate(dateString) {
    const date = new Date(dateString + "T00:00");
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  
  export function formatYear(dateString) {
    return dateString.slice(0, 4);
  }