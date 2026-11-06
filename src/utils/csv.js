function escape(value) {
    const text = String(value ?? "");
    if (/[",\n]/.test(text)) {
      return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
  }
  
  export async function exportJobsToCSV(jobs) {
    const header = ["Date", "Client", "Phone", "Cameras", "Cost"];
  
    const rows = [...jobs]
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((job) => [job.date, job.client, job.phone, job.cameras, job.cost]);
  
    const csv = [header, ...rows]
      .map((row) => row.map(escape).join(","))
      .join("\n");
  
    const today = new Date().toLocaleDateString("en-CA");
    const filename = `jobs-${today}.csv`;
    const file = new File([csv], filename, { type: "text/csv" });
  
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file] });
        return;
      } catch (err) {
        if (err.name === "AbortError") return;
      }
    }
  
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }