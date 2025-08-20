// src/components/Projects.jsx
import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

const PROJECTS = [
  // ————— FEATURED / NEW —————
  {
    id: "icu-admission-prediction",
    title: "ICU Admission Prediction — Machine Learning on Clinical Data (Thesis)",
    desc: `
Built a clinical decision-support prototype to predict ICU admission risk at hospital entry using routinely
collected data (early vital signs, diagnosis groups, surgery type, and demographics). Compared several
models (Logistic Regression, Decision Tree, Random Forest, XGBoost) with and without SMOTE; the
fine-tuned XGBoost achieved an AUC of 0.73 on the held-out test set. Framed results for clinical use,
highlighting trade-offs between recall and false alarms, and used explainability (feature importances/SHAP)
for transparency.`,
    tags: [
      "Python",
      "scikit-learn",
      "XGBoost",
      "SMOTE",
      "Healthcare AI",
      "Explainability",
      "SHAP"
    ]
  },
  {
    id: "bbc-ethical-recommender",
    title: "BBC — Ethical Recommender (Transparency, Fairness, Diversity, Autonomy)",
    desc: `
Designed and built a Streamlit-based recommender prototype and a developer dashboard that combine
content-based, collaborative, and hybrid filtering with value-aware re-ranking. Implemented exposure
fairness (post-processing score boost for underexposed items), a "Diversity Spotlight" curated shelf, and
clear "why this was recommended" explanations to support transparency and user agency. The dashboard
monitors fairness, diversity, and autonomy metrics using live + synthetic data to diagnose bias and guide
iterative improvements.`,
    tags: [
      "Python",
      "Streamlit",
      "Recommender Systems",
      "Fairness",
      "Transparency",
      "Diversity",
      "Autonomy"
    ]
  },

  // ————— CURRENT / GRADUATION —————
  {
    title: "ModuSpec — Predictive Maintenance (Graduation Project)",
    desc: `
Extracted data from 100+ Excel inspection reports using custom Python scripts, merging them into a 
single structured dataset (CSV). Engineered features such as usage cycles and component histories, 
and trained ML models (~0.80 accuracy) to predict which equipment items may appear with issues in 
future inspections. Currently refining model validation, addressing data imbalance, and exploring 
explainability (feature importance, SHAP). The project directly supports ModuSpec’s mission of safer, 
more efficient rig inspections.`,
    tags: [
      "Python",
      "Pandas",
      "scikit-learn",
      "Feature Engineering",
      "Classification",
      "Explainability"
    ]
  },
  {
    title: "ModuSpec — Automated Excel Report Generator",
    desc: `
Developed a lightweight Flask-based tool that converts raw inspection CSVs into professional Excel 
reports. Reports include component statuses, severity indicators, notes, and auto-generated visuals 
for quick decision-making. Designed to run locally as a standalone executable—no hosting or extra 
installs needed—saving engineers hours of manual reporting time and improving consistency across teams.`,
    tags: ["Flask", "Excel Automation", "OpenPyXL", "Python", "UX"]
  },
  {
    title: "ModuSpec — Unified Equipment Checklist & Rig Mapping",
    desc: `
Led technical effort to merge two extensive rig inspection checklists into a single standardized version. 
Applied similarity matching and NLP techniques to align terminology, mapped equipment to rig types, 
and stored results in a relational database. This project standardizes inspection protocols, supports 
knowledge sharing, and ensures inspectors follow a consistent and comprehensive checklist across 
different rigs and clients.`,
    tags: [
      "SQL/Relational Design",
      "Data Modeling",
      "Standardization",
      "NLP/Similarity",
      "Database Design"
    ]
  },

  // ————— INDUSTRY INTERNSHIP —————
  {
    title: "Maxxton — Customer Deduplication (Internship)",
    desc: `
Designed and implemented a machine learning pipeline to identify duplicate customer records. 
Combined blocking rules and string similarity with supervised learning features (names, addresses, 
emails) to calculate duplication probabilities. Packaged the solution behind a Flask API and delivered 
documentation & demo notebooks. The company adopted the solution into production and now offers it 
as a service to clients (publicly showcased on their website).`,
    tags: [
      "Python",
      "Scikit-learn",
      "Record Linkage",
      "Flask API",
      "Deployment"
    ]
  },

  // ————— UNIVERSITY PROJECTS —————
  {
    title: "Wastewater Treatment — Oxygen Demand Prediction (Year 4)",
    desc: `
Worked with a research partner to build regression models predicting the oxygen required to clean 
wastewater before release. Trained multiple models (linear regression, random forest) to optimize 
oxygen injection and reduce energy usage. Additionally, identified data quality issues from poor sensor 
placement and helped design a new layout plan for more reliable future data collection.`,
    tags: [
      "Regression",
      "Process Optimization",
      "Data Quality",
      "Python",
      "Scikit-learn"
    ]
  },
  {
    title: "EnAppSys — European Energy Price Forecasting (Year 2)",
    desc: `
Forecasted short-term electricity prices using historical market data and external drivers (e.g. 
temperature, demand, environmental factors). Built and compared ML models for prediction accuracy. 
Insights were shared with EnAppSys’ own data science team, who used the results as a starting point 
for further development.`,
    tags: [
      "Forecasting",
      "Time Series",
      "Machine Learning",
      "Energy Market",
      "Feature Engineering"
    ]
  }
];

export default function Projects() {
  const refs = useRef([]);

  useEffect(() => {
    refs.current.forEach((el) => {
      if (el) {
        VanillaTilt.init(el, { max: 8, speed: 400, scale: 1.02 });
      }
    });
  }, []);

  return (
    <section id="projects" className="reveal">
      <h2 style={{ marginBottom: ".6rem" }}>Selected Projects</h2>
      <p style={{ color: "var(--muted)", margin: 0, marginBottom: "1rem" }}>
        Data science & automation with real-world impact.
      </p>
      <div className="grid">
        {PROJECTS.map((p, i) => (
          <a
            key={p.title}
            className="card"
            href={p.link}
            target="_blank"
            rel="noreferrer"
            ref={(el) => (refs.current[i] = el)}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h3 style={{ margin: ".2rem 0" }}>{p.title}</h3>
            <p
              style={{
                color: "var(--muted)",
                margin: ".2rem 0 .6rem",
                whiteSpace: "pre-line"
              }}
            >
              {p.desc}
            </p>
            <div className="tags">
              {p.tags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
