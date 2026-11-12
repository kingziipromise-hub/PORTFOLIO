const projectDetails = {
  phishing: {
    kicker: "PROJECT 01 / EMAIL SECURITY",
    title: "Phishing Email Investigation & IOC Analysis",
    intro: "A simulated phishing investigation designed to follow the thinking of a SOC analyst responding to an employee's report of a suspicious email. The project focuses on evidence collection, indicator analysis and a clearly documented conclusion.",
    sections: [
      ["Why I built it", "To understand how an analyst can assess a suspicious email rather than relying on appearance alone, and how evidence can support a reasoned decision."],
      ["Objective", "Analyse a simulated phishing email, identify indicators of compromise (IOCs), assess suspicious links and document whether the message is malicious."],
      ["Tools & technologies", "Email header analysis, VirusTotal, CyberChef, URL and domain analysis, and threat-intelligence lookups."],
      ["What I did", ["Reviewed the email headers and sender details.", "Examined the sending infrastructure and available authentication information.", "Extracted URLs and other potential indicators.", "Assessed suspicious links and checked indicators against threat-intelligence sources.", "Recorded the evidence and reached a final verdict."]],
      ["Skills developed", ["Email-header interpretation and suspicious-message triage.", "IOC identification and extraction.", "Using threat intelligence to add context to findings.", "Writing clear investigation notes and conclusions."]],
      ["Outcome", "Created a structured phishing investigation report containing the evidence, analysis and final verdict. Add the report's actual conclusion here before publishing if it is not already stated in the report."],
      ["Real-world relevance", "SOC teams regularly triage reported emails. A repeatable process for checking sender details, links and indicators helps analysts prioritise suspicious messages and communicate findings." ]
    ],
    evidence: ["Investigation report — add file/link", "Analysis screenshots — add images", "Sample email headers — sanitised sample", "IOC list — add file/link"],
    note: "Only publish sanitised sample data. Remove personal email addresses, tokens, internal hostnames and any sensitive information from screenshots or headers."
  },
  soc: {
    kicker: "PROJECT 02 / SECURITY MONITORING",
    title: "Building a Mini SOC Lab for Threat Detection",
    intro: "A home-lab learning project intended to explore how security logs are collected, monitored and investigated. The original project description supplied so far is incomplete, so this page deliberately separates the intended scope from work that still needs to be documented.",
    sections: [
      ["Why I built it", "To understand how security analysts use event records and monitoring tools to investigate unusual activity and develop detection thinking."],
      ["Objective", "Build or document a controlled mini SOC environment and demonstrate a basic workflow for reviewing events, identifying suspicious activity and recording findings."],
      ["Tools & technologies", "To be confirmed. Add only the tools actually configured and used in this lab, such as the operating system, log sources, monitoring platform and analysis utilities."],
      ["What I did", ["Document the lab architecture and the purpose of each component.", "Record which log sources were configured and what events they produced.", "Describe the test activity used to generate sample events.", "Show how the events were reviewed and what made an event noteworthy.", "Document any detection logic, investigation steps and limitations."]],
      ["Skills to demonstrate", ["Log collection and interpretation.", "Basic alert triage and event correlation.", "Recognising suspicious activity in a controlled environment.", "Writing investigation notes and explaining findings."]],
      ["Outcome", "Project is marked in progress. Add the actual configuration, observations, screenshots and results after the lab workflow has been completed."],
      ["Real-world relevance", "SOC analysts use telemetry and event logs to identify activity that may need investigation. A small lab helps build familiarity with the evidence and workflow behind monitoring."]
    ],
    evidence: ["Lab architecture diagram — add image", "Configuration screenshots — add images", "Sample event/log review — add write-up", "Detection notes — add documentation"],
    note: "Do not describe planned lab components as already deployed. Update the tools, actions and outcome sections to match the lab you actually build."
  }
};

const modal = document.getElementById("projectModal");
const modalContent = document.getElementById("modalContent");
const closeButton = document.getElementById("modalClose");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

function renderSection([heading, content]) {
  const body = Array.isArray(content)
    ? `<ul>${content.map(item => `<li>${item}</li>`).join("")}</ul>`
    : `<p>${content}</p>`;
  return `<div class="detail-block"><h3>${heading}</h3>${body}</div>`;
}

function openProject(projectId) {
  const project = projectDetails[projectId];
  if (!project) return;
  modalContent.innerHTML = `
    <p class="modal-kicker">${project.kicker}</p>
    <h2 id="modalTitle">${project.title}</h2>
    <p class="modal-intro">${project.intro}</p>
    <div class="detail-grid">${project.sections.map(renderSection).join("")}</div>
    <div class="detail-block">
      <h3>Evidence & supporting material</h3>
      <div class="evidence-list">${project.evidence.map(item => `<span class="evidence-chip">${item}</span>`).join("")}</div>
    </div>
    <p class="modal-note">${project.note}</p>`;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeButton.focus();
}

function closeProject() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".project-open").forEach(button => {
  button.addEventListener("click", () => openProject(button.dataset.project));
});
closeButton.addEventListener("click", closeProject);
modal.addEventListener("click", event => {
  if (event.target === modal) closeProject();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) closeProject();
});

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
