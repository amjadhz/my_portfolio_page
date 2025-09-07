// src/components/Experience.jsx
export default function Experience() {
  const items = [
    {
      range: "Feb 2024 – Sep 2025",
      role: "Data Scientist",
      org: "MR Group (ModuSpec)",
      location: "Middelburg",
      tags: ["Predictive Maintenance", "Supervised & Unsupervised models", "Dashboards", "Flask"],
      bullets: [
        "Explored sensor and inspection data; engineered features such as usage cycles and anomaly flags.",
        "Prototyped supervised models (Random Forest, XGBoost) for failure risk and maintenance timing.",
        "Automated data prep and reporting; delivered explainable outputs (feature importance / SHAP) to engineers."
      ]
    },
    {
      range: "Feb 2023 – Jun 2023",
      role: "Data Scientist (Internship)",
      org: "Maxxton",
      location: "Middelburg",
      tags: ["Python", "Scikit-learn", "APIs", "Supervised & Unsupervised models", "Database management"],
      bullets: [
        "Designed a deduplication pipeline for customer records using string similarity and blocking rules.",
        "Built supervised matching with features (name, address, e-mail patterns) and cross-validation.",
        "Packaged the model behind a Flask API and wrote clear docs and demo notebooks for stakeholders."
      ]
    },
    {
      range: "Feb 2022 – Feb 2024",
      role: "Cambridge Exam Invigilator",
      org: "HZ University of Applied Sciences",
      location: "Vlissingen",
      tags: ["Compliance", "Detail-oriented"],
      bullets: [
        "Prepared exam rooms, checked IDs and materials, and enforced exam regulations.",
        "Monitored timing and incidents, produced reports, and ensured a calm environment.",
        "Coordinated seating, special accommodations, and hand-in procedures with staff."
      ]
    },
    {
      range: "Sep 2022 – Jan 2023",
      role: "Data Transfarer (Migrated client folders to a new registration system)",
      org: "SMWO",
      location: "Goes",
      tags: ["Data entry", "Quality checks"],
      bullets: [
        "Transferred physical and digital client files to a new system with consistent naming and indexing.",
        "Performed quality checks (duplicates, missing fields) and flagged issues to case owners.",
        "Documented the migration steps and helped colleagues learn the new workflow."
      ]
    },
    {
      range: "Feb 2022 – Jul 2022",
      role: "Client Service & Sales",
      org: "Praxis",
      location: "Vlissingen",
      tags: ["Retail", "Operations"],
      bullets: [
        "Helped DIY customers find the right materials and tools; explained product differences clearly.",
        "Processed exchanges and deliveries; updated shelf labels and promotional signage.",
        "Collaborated with the warehouse to keep fast-moving items available on the floor."
      ]
    },
    {
      range: "Nov 2020 – Feb 2021",
      role: "Seller",
      org: "MediaMarkt",
      location: "Middelburg",
      tags: ["Retail", "Customer service"],
      bullets: [
        "Advised customers on laptops, phones, accessories, and warranties—matching needs to specs and price.",
        "Handled POS operations, returns, and merchandising; kept the aisle tidy and stocked.",
        "Worked with the team to reach daily sales targets and positive customer feedback."
      ]
    },
    {
      range: "Sep 2019 – Jun 2022",
      role: "Facilitator",
      org: "Team Up",
      location: "Middelburg",
      tags: ["Youth programs", "Facilitation"],
      bullets: [
        "Facilitated weekly group sessions that built routine, play, and social skills for young participants.",
        "Planned activities, adapted to different energy levels, and kept sessions safe and inclusive.",
        "Tracked attendance and session notes; coordinated with other facilitators to improve the program flow."
      ]
    }
  ];

  
  return (
    <section id="experience" className="reveal">
      <TimelineStyles />
      <h2 style={{ marginBottom: ".8rem" }}>Experience</h2>

      <div className="xp">
        {items.map((it, i) => (
          <div className="xp-row" key={i}>
            <div className="xp-time">{it.range}</div>
            <div className="xp-dot" aria-hidden="true" />
            <article className="xp-card card">
              <h3 style={{ margin: 0 }}>
                {it.role} — {it.org}
              </h3>
              {it.location && <p className="xp-sub">{it.location}</p>}

              {it.tags?.length > 0 && (
                <div className="tags" style={{ marginTop: ".25rem" }}>
                  {it.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
              )}

              {it.bullets?.length > 0 && (
                <ul className="xp-bullets">
                  {it.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

function TimelineStyles() {
  return (
    <style>{`
      /* Container stacks rows */
      .xp {
        display: grid;
        gap: 1rem;
        position: relative;
      }

      /* Each row is its own grid: date | dot | card */
      .xp-row {
        display: grid;
        grid-template-columns: 180px 20px 1fr;
        align-items: start;
        gap: 1rem;
      }

      .xp-time {
        color: var(--muted);
        font-weight: 600;
        line-height: 1.3;
        align-self: center;
      }

      .xp-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--primary);
        box-shadow: 0 0 0 4px color-mix(in oklab, var(--primary) 35%, transparent);
        justify-self: center;
        position: relative;
      }
      /* vertical line (hide after last) */
      .xp-row:not(:last-child) .xp-dot::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 12px;
        bottom: -28px;
        width: 2px;
        background: var(--border);
        transform: translateX(-50%);
      }

      .xp-card { padding: 1rem; }
      .xp-sub { color: var(--muted); margin: .25rem 0 0; }

      .xp-bullets {
        margin: .6rem 0 0 0;
        padding-left: 1.1rem;
        color: var(--text);
      }
      .xp-bullets li { margin: .35rem 0; }
      .xp-bullets li::marker {
        color: color-mix(in oklab, var(--primary) 65%, black);
      }

      /* Mobile: collapse per row, date above the card; hide dot/line */
      @media (max-width: 760px) {
        .xp-row {
          grid-template-columns: 1fr;
          gap: .5rem;
        }
        .xp-dot { display: none; }
        .xp-time { margin-bottom: .1rem; }
      }
    `}</style>
  );
}