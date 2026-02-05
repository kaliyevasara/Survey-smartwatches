// Firebase URL

const FIREBASE_URL =
  "https://survey-smartwatch1-default-rtdb.europe-west1.firebasedatabase.app/";

// Questions definition

const deviceUsageQs = [
  { text: "I currently own a smartwatch.", type: "yesno" },
  {
    text: "If you do not own a smartwatch, please skip this question. I actively use health and fitness features on my smartwatch (e.g., step tracking, heart rate, sleep monitoring).",
    type: "scale5"
  }
];

const watch3Qs = [
  "I would trust the information and advice provided by this watch.",
  "I expect the basic measurements of Samsung Galaxy Watch 3 to be accurate.",
  "This watch seems innovative.",
  "I believe this watch provides all the essential functions I expect from a wearable device."
];

const watch8Qs = [
  "I would trust the information and advice provided by this watch.",
  "I expect the AI-driven insights (e.g., sleep advice, coaching) to be accurate.",
  "This watch seems innovative and cutting-edge.",
  "I believe the addition of AI significantly changes how I would interact with this device compared to a standard watch.",
  "I perceive this watch as more modern and prestigious, regardless of its specific AI features."
];

const wtpQs = [
  "I clearly understand which features in this survey are considered 'AI-powered' (e.g., Energy Score, personalized coaching, proactive alerts).",
  "I am willing to pay extra for Galaxy Watch 8 because of its AI features.",
  "I would pay more for the Galaxy Watch 8 if it includes advanced AI customization (e.g., personal training plans, AI coaching).",
  "I believe the AI features make Galaxy Watch 8 more valuable for long-term use."
];

const factorsQs = [
  "Brand reputation and trust in the company",
  "Availability of strong guarantees or extended support",
  "Clear evidence that AI features improve performance or accuracy",
  "Intended use (e.g., fitness, daily tracking, professional/health monitoring)"
];

const pricingQs = [
  {
    text: "How much extra, in percentage terms, would you be willing to pay for the AI features included in the Galaxy Watch 8 compared to a non-AI model?",
    type: "percent",
    options: [
      "0%",
      "Up to 10% more",
      "Up to 20% more",
      "Up to 30% more",
      "Up to 40% more",
      "Up to 50% more",
      "More than 50% more"
    ]
  },
  {
    text: "What is the maximum price (in CZK) you would be willing to pay for Galaxy Watch 3? (1 EUR = 25 CZK)",
    type: "number"
  },
  {
    text: "What is the maximum price (in CZK) you would be willing to pay for the AI-powered Galaxy Watch 8? (1 EUR = 25 CZK)",
    type: "number"
  },
  {
    text: "The price of 1,990 CZK (80 EUR) for Samsung Galaxy Watch 3 (non-AI) is acceptable to me.",
    type: "scale5"
  },
  {
    text: "The price of 6,990 CZK (280 EUR) for Samsung Galaxy Watch 8 (AI-powered) is acceptable to me.",
    type: "scale5"
  },
  {
    text: "If you were at the store today, which option would you choose?",
    type: "radio",
    options: [
      "Galaxy Watch 3 (Standard)",
      "Galaxy Watch 8 (AI-Powered)",
      "I would not buy either"
    ]
  }
];

const demographicsQs = [
  {
    text: "Age",
    type: "radio",
    options: ["under 20", "20–29", "30–39", "40–49", "50–59", "60 and over"]
  },
  {
    text: "Gender",
    type: "radio",
    options: ["Male", "Female", "Prefer not to say"]
  },
  {
    text: "Education Level",
    type: "radio",
    options: [
      "Primary School",
      "High School (vocational or diploma)",
      "Undergraduate (Bachelor's)",
      "Graduate (Master's degree)",
      "Postgraduate (PhD)"
    ]
  },
  {
    text: "Employment Status",
    type: "radio",
    options: [
      "Student",
      "Part-time employment",
      "Full-time employment",
      "Self-employed",
      "Retired",
      "Unemployed"
    ]
  },
  {
    text: "Monthly Income",
    type: "radio",
    options: [
      "Below 20,000 CZK  (≈ 800 EUR)",
      "20,001-35,000 CZK (≈ 800 - 1,450 EUR)",
      "35,001-45,000 CZK (≈ 1,450 - 1,850 EUR)",
      "45,001-60,000 CZK (≈ 1,850 - 2,500 EUR)",
      "Above 60,000 CZK (≈ 2,500 EUR or more)"
    ]
  },
  {
    text: "Country of Residence",
    type: "radio",
    options: ["Czech Republic", "Kazakhstan", "Other EU", "Other non-EU"]
  }
];

// Scales

const AGREEMENT_SCALE = {
  1: "Strongly Disagree",
  2: "Disagree",
  3: "Neutral",
  4: "Agree",
  5: "Strongly Agree"
};

const INFLUENCE_SCALE = {
  1: "Not influential at all",
  2: "Slightly influential",
  3: "Neutral",
  4: "Influential",
  5: "Very influential"
};

// Render helpers

function renderYesNo(containerId, name, question) {
  const container = document.getElementById(containerId);
  const div = document.createElement("div");
  div.style.marginBottom = "18px";

  const label = document.createElement("label");
  label.textContent = question;

  const radioGroup = document.createElement("div");
  radioGroup.className = "radio-group";

  ["Yes", "No"].forEach(val => {
    const lbl = document.createElement("label");
    lbl.innerHTML = `<input type="radio" name="${name}" value="${val}" required> ${val}`;
    radioGroup.appendChild(lbl);
  });

  div.appendChild(label);
  div.appendChild(radioGroup);
  container.appendChild(div);
}

function renderScale5(containerId, name, question, scaleLabels, color) {
  const container = document.getElementById(containerId);
  const div = document.createElement("div");
  div.style.marginBottom = "22px";

  const label = document.createElement("label");
  label.textContent = question;

  const scale = document.createElement("div");
  scale.className = "rating-scale";

  for (let r = 1; r <= 5; r++) {
    const lbl = document.createElement("label");
    lbl.innerHTML = `
      <input type="radio" name="${name}" value="${r}" required style="accent-color:${color}">
      <span>${r}</span>
      <span style="font-size:0.8rem;color:#64748b">${scaleLabels[r]}</span>
    `;
    scale.appendChild(lbl);
  }

  div.appendChild(label);
  div.appendChild(scale);
  container.appendChild(div);
}

function renderRadio(containerId, name, question, options) {
  const container = document.getElementById(containerId);
  const div = document.createElement("div");
  div.style.marginBottom = "18px";

  const label = document.createElement("label");
  label.textContent = question;

  const radioGroup = document.createElement("div");
  radioGroup.className = "radio-group";

  options.forEach(val => {
    const lbl = document.createElement("label");
    lbl.innerHTML = `<input type="radio" name="${name}" value="${val}" required> ${val}`;
    radioGroup.appendChild(lbl);
  });

  div.appendChild(label);
  div.appendChild(radioGroup);
  container.appendChild(div);
}

function renderNumber(containerId, name, question) {
  const container = document.getElementById(containerId);
  const div = document.createElement("div");
  div.style.marginBottom = "18px";

  const label = document.createElement("label");
  label.textContent = question;

  const input = document.createElement("input");
  input.type = "number";
  input.name = name;
  input.required = true;

  div.appendChild(label);
  div.appendChild(input);
  container.appendChild(div);
}

function renderPercent(containerId, name, question, options) {
  renderRadio(containerId, name, question, options);
}


// Render questions
renderYesNo("deviceUsage", "deviceUsage1", deviceUsageQs[0].text);
renderScale5(
  "deviceUsage",
  "deviceUsage2",
  deviceUsageQs[1].text,
  AGREEMENT_SCALE,
  "#e94057"
);

// Skip logic
const ownRadios = document.getElementsByName("deviceUsage1");
const healthRadios = document.getElementsByName("deviceUsage2");
const healthContainer = healthRadios[0].closest("div");

healthContainer.style.display = "none";
healthRadios.forEach(r => (r.required = false));

ownRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    if (radio.value === "Yes") {
      healthContainer.style.display = "block";
      healthRadios.forEach(r => (r.required = true));
    } else {
      healthContainer.style.display = "none";
      healthRadios.forEach(r => {
        r.required = false;
        r.checked = false;
      });
    }
  });
});

// Other sections
watch3Qs.forEach((q, i) =>
  renderScale5("watch3", "watch3" + (i + 1), q, AGREEMENT_SCALE, "#e94057")
);
watch8Qs.forEach((q, i) =>
  renderScale5("watch8", "watch8" + (i + 1), q, AGREEMENT_SCALE, "#e94057")
);
wtpQs.forEach((q, i) =>
  renderScale5("wtp", "wtp" + (i + 1), q, AGREEMENT_SCALE, "#e94057")
);
factorsQs.forEach((q, i) =>
  renderScale5("factors", "factors" + (i + 1), q, INFLUENCE_SCALE, "#3b82f6")
);

pricingQs.forEach((q, i) => {
  if (q.type === "percent")
    renderPercent("pricing", "pricing" + (i + 1), q.text, q.options);
  else if (q.type === "number")
    renderNumber("pricing", "pricing" + (i + 1), q.text);
  else if (q.type === "scale5")
    renderScale5(
      "pricing",
      "pricing" + (i + 1),
      q.text,
      AGREEMENT_SCALE,
      "#e94057"
    );
  else if (q.type === "radio")
    renderRadio("pricing", "pricing" + (i + 1), q.text, q.options);
});

demographicsQs.forEach((q, i) => {
  if (q.type === "number")
    renderNumber("demographics", "demo" + (i + 1), q.text);
  else if (q.type === "radio")
    renderRadio("demographics", "demo" + (i + 1), q.text, q.options);
});

// Submit

const form = document.getElementById("surveyForm");

form.addEventListener("submit", async e => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  data.timestamp = new Date().toISOString();

  try {
    const res = await fetch(`${FIREBASE_URL}/responses.json`, {
      method: "POST",
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Failed to save data");

    form.style.display = "none";
    document.getElementById("thankYou").classList.add("active");
  } catch (err) {
    alert("Error sending survey: " + err.message);
  }
});

// Navigation

document
  .getElementById("goHome")
  ?.addEventListener("click", () => (window.location.href = "./index.html"));
document
  .getElementById("backCompare")
  ?.addEventListener(
    "click",
    () => (window.location.href = "./compare.html")
  );
