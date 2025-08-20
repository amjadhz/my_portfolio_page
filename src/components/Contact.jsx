// src/components/Contact.jsx
export default function Contact() {
  return (
    <section id="contact" className="reveal">
      <h2 style={{ marginBottom: ".6rem" }}>Contact</h2>

      <div className="contact-min card">
        <p className="contact-tagline">Let’s build something meaningful.</p>

        <div className="social-row">
          {/* Email */}
          <a
            className="icon-btn"
            href="mailto:amjadhwidy@gmail.com"
            aria-label="Email Amjad"
            title="Email"
          >
            ✉️
          </a>

          {/* LinkedIn (simple 'in' mark; inherits theme color) */}
          <a
            className="icon-btn"
            href="https://www.linkedin.com/in/amjad-hwidy-69793a190/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            in
          </a>

          {/* GitHub — inline SVG logo (inherits theme color) */}
          <a
            className="icon-btn"
            href="https://github.com/amjadhz"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 2a10 10 0 0 0-3.162 19.487c.5.093.683-.217.683-.483 0-.237-.009-.868-.013-1.703-2.782.603-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.621.069-.608.069-.608 1.004.07 1.532 1.03 1.532 1.03.892 1.528 2.341 1.087 2.91.832.092-.646.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.56 9.56 0 0 1 12 6.844c.968.004 1.943.131 2.857.384 1.911-1.295 2.75-1.026 2.75-1.026.544 1.378.201 2.397.099 2.65.64.698 1.028 1.591 1.028 2.682 0 3.842-2.339 4.687-4.566 4.936.359.31.678.92.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.58.69.482A10 10 0 0 0 12 2Z"
              />
            </svg>
          </a>
        </div>

        <small className="contact-note">
          Prefer email:{" "}
          <a href="mailto:amjadhwidy@gmail.com">amjadhwidy@gmail.com</a>
        </small>
      </div>
    </section>
  );
}
