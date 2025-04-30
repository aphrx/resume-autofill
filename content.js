chrome.storage.local.get("parsedResume", ({ parsedResume }) => {
    console.log("Fetched Parsed Resume Data: ", parsedResume); // Log to verify data fetching
    if (!parsedResume) return;
  
    let resumeText = "";
    try {
      // If parsedResume is a string, try parsing it as JSON
      const parsed =
        typeof parsedResume === "string" ? JSON.parse(parsedResume) : parsedResume;
      resumeText = parsed.summary || parsed || ""; // Extract summary or fall back to full data
    } catch {
      resumeText = parsedResume; // If parsing fails, assume it's raw text
    }
  
    // Autofill form fields with parsed data when Ctrl + Shift + F is pressed
    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === "F") {
        event.preventDefault();
        autofillFields(parsedResume); // Pass the parsed data for autofill
      }
    });
  });
  
  // Function to autofill fields based on parsed resume data
  function autofillFields(resumeData) {
    const fields = document.querySelectorAll("input, textarea");

    console.log(resumeData);
  
    fields.forEach((field) => {
      const label =
        field.labels?.[0]?.innerText?.toLowerCase() ||
        field.placeholder?.toLowerCase();
      if (!label) return;
  
      // Check if the field corresponds to a specific resume attribute and autofill
      if (label.includes("first name")) {
        field.value = resumeData.firstName || "N/A"; // Fallback to "N/A" if data is missing
      } else if (label.includes("last name")) {
        field.value = resumeData.lastName || "N/A";
      } else if (label.includes("email")) {
        field.value = resumeData.email || "N/A";
      } else if (label.includes("summary")) {
        field.value = resumeData.summary || "N/A";
      } else if (label.includes("phone")) {
        field.value = resumeData.phone || "N/A";
      }
    });
  }
  