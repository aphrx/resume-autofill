document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const activeTab = document.querySelector('.tab-button.active');
        const activeContent = document.querySelector('.tab-content.active');
        if (activeTab) activeTab.classList.remove('active');
        if (activeContent) activeContent.classList.remove('active');
        button.classList.add('active');
        const tabContent = document.getElementById(button.getAttribute('data-tab'));
        if (tabContent) tabContent.classList.add('active');
      });
    });

    chrome.storage.local.get(["resume"], function (result) {
      if (result.resume) {
        document.getElementById("resumeText").value = result.resume;
      }
    });

    chrome.storage.local.get(["parsedResume"], function (result) {
      if (result.parsedResume) {
        const data = result.parsedResume;
        document.getElementById("firstName").value = data.firstName || "";
        document.getElementById("lastName").value = data.lastName || "";
        document.getElementById("email").value = data.email || "";
        document.getElementById("phone").value = data.phone || "";
        document.getElementById("summary").value = data.summary || "";
      }
    });

    document.getElementById("saveResume").addEventListener("click", function () {
      const resumeContent = document.getElementById("resumeText").value;
      chrome.storage.local.set({
        resume: resumeContent,
        resumeData: resumeContent
      }, function () {
        alert("Resume saved!");
        const parsedData = parseResume(resumeContent);
        chrome.storage.local.set({ parsedResume: parsedData }, () => {
          alert("Parsed data saved!");
        });
      });
    });

    function parseResume(resumeText) {
      const parsedData = {
        firstName: extractFirstName(resumeText),
        lastName: extractLastName(resumeText),
        email: extractEmail(resumeText),
        phone: extractPhoneNumber(resumeText),
        summary: extractSummary(resumeText)
      };
      return parsedData;
    }

    function extractFirstName(text) {
      const fullName = extractFullName(text);
      const words = fullName.split(/\s+/);
      return words[0];
    }

    function extractLastName(text) {
      const fullName = extractFullName(text);
      const words = fullName.split(/\s+/);
      if (words.length > 1) {
        return words[words.length - 1];
      }
      return '';
    }

    function extractFullName(text) {
      const firstLine = text.split('\n')[0];
      return firstLine.trim();
    }

    function extractEmail(text) {
      const match = text.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
      return match ? match[0] : "";
    }

    function extractSummary(text) {
      const lines = text.split('\n');
      return lines.slice(1, 4).join(' ');
    }

    function extractPhoneNumber(text) {
      const phonePattern = /(\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s\-]?)?[\d\-]{7,10}/g;
      const match = text.match(phonePattern);
      return match && match.length > 0 ? match[0] : "";
    }

    document.getElementById("updateDetailsButton").addEventListener("click", () => {
      const updatedDetails = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        summary: document.getElementById('summary').value
      };
      chrome.storage.local.set({ parsedResume: updatedDetails }, () => {
        alert("Details updated!");
      });
    });
});
