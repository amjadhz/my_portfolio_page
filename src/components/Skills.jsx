// src/components/Skills.jsx
export default function Skills() {
  // Tag-style skill groups (shown as green pills)
  const groups = {
    Programming: ["Python", "JavaScript", "TypeScript", "R", "PHP", "SQL", "HTML", "CSS"],
    Frameworks: ["React", "Flask", "Laravel", "Scikit-learn", "Pandas", "Streamlit", "Svelte"],
    "ML & Data": ["EDA", "Model Evaluation", "XGBoost", "SHAP", "NLP", "Predictive Analytics"],
    Tools: ["Git", "CI/CD", "Tableau", "Power BI", "Excel (advanced)", "REST APIs"],
    "Cloud/DB": ["AWS/Azure (basic)", "MySQL", "SQLite"],
    Languages: ["Arabic (Native)", "English (C1)", "Dutch (B1)"],
  };

  // Rich ML description (cards with bullet points)
  const ml = {
    supervised: [
      "Classification: Logistic Regression, SVM, Random Forest, XGBoost",
      "Regression: Linear/ElasticNet, Random Forest, XGBRegressor",
      "Model selection & cross-validation (StratifiedKFold, Grid/Random search)",
      "Feature engineering & pipelines (imputation, scaling, encoding)",
      "Model explainability: SHAP, permutation importance, partial dependence"
    ],
    unsupervised: [
      "Clustering: K-Means, DBSCAN, Agglomerative",
      "Dimensionality reduction: PCA, t-SNE, UMAP",
      "Anomaly/outlier detection: IsolationForest, z-scores",
      "Topic modeling & similarity: LDA, TF-IDF, cosine similarity",
      "Recommendation basics & segmentation"
    ],
    deep: [
      "Neural Networks with TensorFlow/Keras & PyTorch",
      "CNNs for image classification & feature extraction",
      "RNNs & LSTMs for sequence modeling",
      "Transfer learning with pretrained models (ResNet, BERT)",
      "Hands-on deployment of deep models in lightweight apps"
    ],
    nlp: [
      "Text preprocessing: tokenization, embeddings, TF-IDF",
      "Sentiment analysis & intent classification",
      "Named Entity Recognition (NER) & sequence labeling",
      "Topic modeling & similarity search",
      "Modern transformer models (BERT, GPT, HuggingFace pipelines)"
    ],
    ops: [
      "Clean code, version control (Git), and experiment tracking",
      "Data validation, metrics, and reproducible notebooks",
      "Lightweight deployment: Flask/Streamlit dashboards & APIs"
    ]
  };

  return (
    <section id="skills" className="reveal">
      <h2 style={{ marginBottom: ".6rem" }}>Skills</h2>

      {/* Intro text */}
      <p style={{ marginBottom: "1.5rem", color: "var(--muted)" }}>
        I combine strong programming foundations with applied machine learning expertise, 
        focusing on building solutions that are not only accurate but also interpretable 
        and practical. My skillset spans end-to-end: from data wrangling and modeling 
        to deployment and communication.
      </p>

      {/* Pill cards */}
      <div className="grid" style={{ marginBottom: "1rem" }}>
        {Object.entries(groups).map(([group, list]) => (
          <div key={group} className="card">
            <h3 style={{ marginTop: 0 }}>{group}</h3>
            <div className="tags">
              {list.map((s) => (
                <span className="tag" key={s}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ML focus intro */}
      <p style={{ marginBottom: "1rem", color: "var(--muted)" }}>
        My strongest area is machine learning and AI, where I specialize in predictive modeling, 
        supervised & unsupervised learning, deep learning, and natural language processing (NLP). 
        I enjoy building explainable, deployable solutions that bridge research and real-world impact.
      </p>

      {/* ML focus cards */}
      <div className="grid">
        <article className="card">
          <h3 style={{ marginTop: 0 }}>Machine Learning — Supervised</h3>
          <ul style={{ margin: ".5rem 0 0 1rem" }}>
            {ml.supervised.map(item => <li key={item}>{item}</li>)}
          </ul>
        </article>

        <article className="card">
          <h3 style={{ marginTop: 0 }}>Machine Learning — Unsupervised</h3>
          <ul style={{ margin: ".5rem 0 0 1rem" }}>
            {ml.unsupervised.map(item => <li key={item}>{item}</li>)}
          </ul>
        </article>

        <article className="card">
          <h3 style={{ marginTop: 0 }}>Deep Learning</h3>
          <ul style={{ margin: ".5rem 0 0 1rem" }}>
            {ml.deep.map(item => <li key={item}>{item}</li>)}
          </ul>
        </article>

        <article className="card">
          <h3 style={{ marginTop: 0 }}>Natural Language Processing (NLP)</h3>
          <ul style={{ margin: ".5rem 0 0 1rem" }}>
            {ml.nlp.map(item => <li key={item}>{item}</li>)}
          </ul>
        </article>

        <article className="card">
          <h3 style={{ marginTop: 0 }}>ML Practice & Delivery</h3>
          <p style={{ color: "var(--muted)", marginTop: 0 }}>
            From structured EDA to shipping explainable models and simple web UIs.
          </p>
          <ul style={{ margin: ".5rem 0 0 1rem" }}>
            {ml.ops.map(item => <li key={item}>{item}</li>)}
          </ul>
        </article>
      </div>
    </section>
  );
}
