// src/components/Education.jsx
export default function Education() {
  // ✏️ Replace the placeholder items with your real education data
  const items = [
  {
    range: "Sep 2024 – Present",
    degree: "MSc — Applied Data Science",
    inst: "Utrecht University",
    location: "Utrecht, NL",
    tags: [
      "Supervised ML", "Unsupervised ML", "Deep Learning", "NLP",
      "Causality", "Text Analysis", "Big Data", "Image Analysis", "Visualization"
    ],
    bullets: [
      "Advanced models: supervised & unsupervised learning, deep learning for images and text, and NLP pipelines.",
      "Causality: causal inference frameworks to reason about interventions and measure effects.",
      "Large-scale analysis: text mining, big-data processing and evaluation; visual analytics & clear data storytelling."
    ]
  },
  {
    range: "Sep 2020 – Jul 2024",
    degree: "BSc — ICT (Data Scientist track)",
    inst: "HZ University of Applied Sciences",
    location: "Middelburg, NL",
    tags: [
      "UX/UI", "Designing", "Prototyping", "Agile",
      "CI/CD", "Cloud Computing", "Git",
      "JavaScript", "TypeScript", "SQL", "PHP",
      "Business IT Consulting", "Software Engineering",
      "Supervised ML", "Unsupervised ML"
    ],
    bullets: [
      "UX/UI, designing & prototyping: user research, wireframes, interactive prototypes, and usability validation.",
      "Software engineering: Agile teamwork, Git workflows, JS/TS, SQL, PHP; requirements → delivery.",
      "DevOps & cloud: built CI/CD pipelines and deployed apps to cloud environments; monitoring and iterations.",
      "Data science foundations: implemented supervised & unsupervised models; data prep, feature engineering, and evaluation.",
      "Business IT consulting: translated stakeholder needs into feasible technical solutions with measurable value."
    ]
  },
  {
    range: "Sep 2022 – Feb 2023",
    degree: "Minor — Big Data & Design",
    inst: "HU University of Applied Sciences Utrecht",
    location: "Utrecht, NL",
    tags: ["Data + UX", "Prototyping", "Storytelling"],
    bullets: [
      "Connected data insights with human-centred design; iterated concepts from research to validated prototypes.",
      "Built clear visual narratives and ethical, sustainable design considerations."
    ]
  },
  {
    range: "Sep 2019 – Jun 2020",
    degree: "ICT — MBO 4",
    inst: "Scalda",
    location: "Vlissingen, NL",
    tags: ["Systems", "Support", "Devices"],
    bullets: [
      "Installed/configured systems & devices; troubleshooting and customer-oriented support in Dutch/English."
    ]
  },
  {
    range: "Jan 2017 – Jun 2018",
    degree: "Dutch Language — B1/B2",
    inst: "Mondo",
    location: "Vlissingen, NL",
    tags: ["Dutch B1/B2"],
    bullets: [
      "Intermediate Dutch with focus on speaking, listening and workplace communication."
    ]
  },
  {
    range: "Sep 2012 – Jul 2015",
    degree: "Agricultural Engineering (undergraduate study)",
    inst: "Damascus University",
    location: "Damascus, Syria",
    tags: ["Researching"],
    bullets: []
  },
  {
    range: "Sep 2009 – Jun 2012",
    degree: "Secondary School (HAVO-equivalent)",
    inst: "Secondary School",
    location: "Damascus, Syria",
    tags: [],
    bullets: [
      "Graduated secondary education with strong math/science focus."
    ]
  }
];

  return (
    <section id="education" className="reveal">
      <Styles />
      <h2 style={{ marginBottom: ".8rem" }}>Education</h2>

      <div className="edu">
        {items.map((it, i) => (
          <div className="edu-row" key={i}>
            <div className="edu-time">{it.range}</div>
            <div className="edu-dot" aria-hidden="true" />
            <article className="edu-card card">
              <h3 style={{ margin: 0 }}>{it.degree}</h3>
              <p className="edu-sub">
                {it.inst}{it.location ? ` — ${it.location}` : ""}
              </p>

              {it.tags?.length > 0 && (
                <div className="tags" style={{ marginTop: ".25rem" }}>
                  {it.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                </div>
              )}

              {it.bullets?.length > 0 && (
                <ul className="edu-bullets">
                  {it.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

function Styles() {
  return (
    <style>{`
      /* Container just stacks rows */
      .edu {
        display: grid;
        gap: 1rem;
        position: relative;
      }

      /* Each row is its own grid: date | dot | card */
      .edu-row {
        display: grid;
        grid-template-columns: 180px 20px 1fr;
        align-items: start;
        gap: 1rem;
      }

      .edu-time {
        color: var(--muted);
        font-weight: 600;
        line-height: 1.3;
        align-self: center;
      }

      .edu-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--primary);
        box-shadow: 0 0 0 4px color-mix(in oklab, var(--primary) 35%, transparent);
        justify-self: center;
        position: relative;
      }
      /* vertical line below each dot (desktop) */
      .edu-dot::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 12px;
        bottom: -28px;
        width: 2px;
        background: var(--border);
        transform: translateX(-50%);
      }

      .edu-card { padding: 1rem; }
      .edu-sub { color: var(--muted); margin: .25rem 0 0; }
      .edu-bullets { margin: .6rem 0 0 0; padding-left: 1.1rem; }
      .edu-bullets li { margin: .35rem 0; }
      .edu-bullets li::marker { color: color-mix(in oklab, var(--primary) 65%, black); }

      /* Mobile: collapse each row to a single column; put date above the card */
      @media (max-width: 760px) {
        .edu-row {
          grid-template-columns: 1fr;
          gap: .5rem;
        }
        .edu-dot {
          display: none; /* hide dot & line on mobile for clarity */
        }
        .edu-time {
          margin-bottom: .1rem; /* date sits just above the card */
        }
      }
    `}</style>
  );
}