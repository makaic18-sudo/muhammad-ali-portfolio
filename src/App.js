import React, { useEffect, useState } from "react";
import emailjs from '@emailjs/browser'

export default function App() {
  const [active, setActive] = useState("home");
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const sections = document.querySelectorAll(".animate-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      const sectionIds = [
        "home",
        "about",
        "skills",
        "experience",
        "certifications",
        "projects",
        "contact",
      ];

      for (const id of sectionIds) {
        const section = document.getElementById(id);

        if (!section) continue;

        const rect = section.getBoundingClientRect();

        if (rect.top <= 180 && rect.bottom >= 180) {
          setActive(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <style>{`

        /* =====================================================
           GLOBAL
        ===================================================== */

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          scroll-behavior: smooth;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: Arial, Helvetica, sans-serif;
          background: #1f2530;
          color: #ffffff;
          overflow-x: hidden;
        }

        :root {
          --dark: #1f2530;
          --dark2: #323a49;
          --cyan: #00eeff;
          --white: #ffffff;
          --muted: #c8ccd3;
          --card: #282f3d;
          --border: rgba(0, 238, 255, 0.25);
        }

        a {
          color: inherit;
        }

        section {
          min-height: 100vh;
          padding: 110px 7% 90px;
          overflow: hidden;
        }

        .container {
          max-width: 1150px;
          margin: auto;
        }

        .cyan {
          color: var(--cyan);
        }

        .title {
          text-align: center;
          font-size: 36px;
          margin-bottom: 60px;
          font-weight: 800;
        }

        .section-subtitle {
          text-align: center;
          color: var(--muted);
          max-width: 700px;
          margin: -35px auto 50px;
          line-height: 1.7;
        }

        /* =====================================================
           SCROLL ANIMATION
        ===================================================== */

        .animate-section {
          opacity: 0;
          transform: translateX(-100px);
          transition:
            opacity 0.9s ease,
            transform 0.9s ease;
        }

        .animate-section.show {
          opacity: 1;
          transform: translateX(0);
        }

        /* =====================================================
           NAVBAR
        ===================================================== */

        nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          background: rgba(31, 37, 48, 0.94);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.03);
          z-index: 9999;
        }

        .logo {
          font-size: 22px;
          font-weight: 800;
          white-space: nowrap;
        }

        .logo span {
          color: var(--cyan);
        }

        .nav-links {
          display: flex;
          gap: 25px;
          list-style: none;
          align-items: center;
        }

        .nav-links button {
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 12px;
          transition: 0.3s;
          position: relative;
          padding: 8px 0;
        }

        .nav-links button::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 2px;
          background: var(--cyan);
          transition: 0.3s;
        }

        .nav-links button:hover,
        .nav-links button.active {
          color: var(--cyan);
        }

        .nav-links button:hover::after,
        .nav-links button.active::after {
          width: 100%;
        }

        /* =====================================================
           BUTTON
        ===================================================== */

        .btn {
          border: none;
          background: var(--cyan);
          color: #111820;
          padding: 12px 24px;
          border-radius: 30px;
          font-weight: 800;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          box-shadow: 0 0 18px rgba(0, 238, 255, 0.4);
          transition: 0.3s;
        }

        .btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 30px rgba(0, 238, 255, 0.7);
        }

        .btn-outline {
          border: 2px solid var(--cyan);
          color: var(--cyan);
          background: transparent;
          box-shadow: none;
          margin-left: 12px;
        }

        .btn-outline:hover {
          background: var(--cyan);
          color: #111820;
          box-shadow: 0 0 25px rgba(0, 238, 255, 0.5);
        }

        /* =====================================================
           HOME
        ===================================================== */

        #home {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background:
            radial-gradient(
              circle at 80% 45%,
              rgba(0,238,255,0.08),
              transparent 30%
            ),
            #1f2530;
        }

        .home-content {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 70px;
        }

        .home-text {
          flex: 1;
        }

        .home-text h3 {
          font-size: 23px;
          margin-bottom: 10px;
        }

        .home-text h1 {
          font-size: clamp(42px, 6vw, 72px);
          line-height: 1;
          margin-bottom: 15px;
        }

        .typing {
          font-size: 27px;
          margin-bottom: 25px;
        }

        .typing strong {
          color: var(--cyan);
        }

        .description {
          max-width: 650px;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.8;
          margin-bottom: 25px;
        }

        .hero-buttons {
          margin-top: 25px;
        }

        .socials {
          display: flex;
          gap: 12px;
          margin: 25px 0;
        }

        .socials a {
          width: 38px;
          height: 38px;
          border: 2px solid var(--cyan);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--cyan);
          text-decoration: none;
          font-size: 12px;
          font-weight: bold;
          transition: 0.3s;
        }

        .socials a:hover {
          background: var(--cyan);
          color: #10151d;
          transform: translateY(-5px);
        }

        /* =====================================================
           PROFILE HEXAGON
        ===================================================== */

        .profile-wrapper {
          width: 370px;
          height: 430px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
        }

        .hex {
          width: 330px;
          height: 380px;
          background: var(--cyan);
          clip-path: polygon(
            25% 5%,
            75% 5%,
            100% 50%,
            75% 95%,
            25% 95%,
            0% 50%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          animation: float 4s ease-in-out infinite;
          box-shadow: 0 0 35px rgba(0,238,255,0.25);
        }

        .profile-photo {
          width: 308px;
          height: 358px;

          clip-path: polygon(
            25% 5%,
            75% 5%,
            100% 50%,
            75% 95%,
            25% 95%,
            0% 50%
          );

          background:
            linear-gradient(
              rgba(20,25,33,0.15),
              rgba(20,25,33,0.15)
            ),
            url("/Profile.PNG");

          background-size: cover;
          background-position: center top;
          background-repeat: no-repeat;

          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .profile-placeholder {
          display: none;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-12px);
          }
        }

        /* =====================================================
           ABOUT
        ===================================================== */

        #about {
          background: var(--dark2);
          display: flex;
          align-items: center;
        }

        .about-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 80px;
        }

        .about-image {
          width: 300px;
          height: 330px;
          background: var(--cyan);
          clip-path: polygon(
            25% 0,
            75% 0,
            100% 25%,
            100% 75%,
            75% 100%,
            25% 100%,
            0 75%,
            0 25%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .about-photo {
          width: 278px;
          height: 308px;
          background:
            linear-gradient(
              rgba(20,25,33,0.15),
              rgba(20,25,33,0.15)
            ),
            url("/Profile.PNG");

          background-size: cover;
          background-position: center top;

          clip-path: polygon(
            25% 0,
            75% 0,
            100% 25%,
            100% 75%,
            75% 100%,
            25% 100%,
            0 75%,
            0 25%
          );
        }

        .about-text {
          max-width: 620px;
        }

        .about-text h2 {
          font-size: 40px;
          margin-bottom: 5px;
        }

        .about-text h3 {
          margin-bottom: 20px;
          color: white;
        }

        .about-text p {
          color: var(--muted);
          line-height: 1.85;
          white-space: pre-line;
          font-size: 15px;
          margin-bottom: 25px;
        }

        .about-highlight {
          margin-top: 20px;
          padding: 18px;
          border-left: 3px solid var(--cyan);
          background: rgba(0,238,255,0.05);
          color: white;
          font-weight: bold;
        }

        /* =====================================================
           SKILLS
        ===================================================== */

        #skills {
          background: var(--dark);
        }

        .skills-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 90px;
        }

        .skill-column h2 {
          text-align: center;
          margin-bottom: 35px;
          font-size: 22px;
        }

        .skill {
          margin-bottom: 25px;
        }

        .skill-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 9px;
          font-size: 13px;
        }

        .bar {
          height: 8px;
          background: #343d4d;
          border-radius: 20px;
          overflow: hidden;
        }

        .bar span {
          display: block;
          height: 100%;
          background: var(--cyan);
          border-radius: 20px;
          box-shadow: 0 0 10px rgba(0,238,255,0.5);
          animation: grow 1.5s ease;
        }

        @keyframes grow {
          from {
            width: 0 !important;
          }
        }

        .professional {
          display: flex;
          justify-content: center;
          gap: 50px;
          flex-wrap: wrap;
        }

        .circle-box {
          text-align: center;
        }

        .circle {
          width: 135px;
          height: 135px;
          border-radius: 50%;
          background:
            conic-gradient(
              var(--cyan) var(--percent),
              #343d4d var(--percent)
            );
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          margin-bottom: 14px;
        }

        .circle::before {
          content: "";
          position: absolute;
          width: 108px;
          height: 108px;
          border-radius: 50%;
          background: var(--dark);
        }

        .circle span {
          position: relative;
          z-index: 2;
          font-weight: bold;
        }

        .circle-label {
          font-size: 13px;
          color: var(--muted);
        }

        /* Skill cloud tags */

        .skill-tags {
          margin-top: 65px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
        }

        .skill-tag {
          padding: 10px 17px;
          border: 1px solid var(--border);
          border-radius: 25px;
          background: rgba(0,238,255,0.04);
          color: var(--muted);
          font-size: 13px;
          transition: 0.3s;
        }

        .skill-tag:hover {
          color: var(--cyan);
          border-color: var(--cyan);
          transform: translateY(-3px);
        }

        /* =====================================================
           EXPERIENCE
        ===================================================== */

        #experience {
          background: var(--dark2);
          min-height: auto;
          padding-bottom: 30px;
        }

        .timeline {
          max-width: 850px;
          margin: auto;
          position: relative;
        }

        .timeline::before {
          content: "";
          position: absolute;
          left: 20px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--cyan);
          opacity: 0.5;
        }

        .timeline-item {
          position: relative;
          padding-left: 65px;
          margin-bottom: 45px;
        }

        .timeline-dot {
          position: absolute;
          left: 8px;
          top: 5px;
          width: 25px;
          height: 25px;
          background: var(--cyan);
          border-radius: 50%;
          box-shadow: 0 0 18px rgba(0,238,255,0.6);
        }

        .experience-card {
          background: rgba(31,37,48,0.75);
          border: 1px solid var(--border);
          padding: 30px;
          border-radius: 15px;
          transition: 0.3s;
        }

        .experience-card:hover {
          transform: translateX(8px);
          border-color: var(--cyan);
        }

        .experience-card h2 {
          font-size: 22px;
          margin-bottom: 8px;
        }

        .experience-card h3 {
          color: var(--cyan);
          font-size: 15px;
          margin-bottom: 8px;
        }

        .date {
          display: inline-block;
          color: var(--muted);
          font-size: 13px;
          margin-bottom: 18px;
        }

        .experience-card ul {
          padding-left: 20px;
          color: var(--muted);
          line-height: 1.8;
        }

        /* =====================================================
           CERTIFICATIONS
        ===================================================== */

        #certifications {
          background: var(--dark);
          min-height: auto;
padding-bottom: 30px;
        }

        .cert-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .cert-card {
          background: var(--card);
          border: 1px solid rgba(255,255,255,0.04);
          padding: 25px;
          border-radius: 15px;
          transition: 0.35s;
          position: relative;
          overflow: hidden;
        }

        .cert-card::before {
          content: "";
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(0,238,255,0.08);
          top: -30px;
          right: -30px;
        }

        .cert-card:hover {
          transform: translateY(-7px);
          border-color: var(--cyan);
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
        }

        .cert-icon {
          font-size: 30px;
          margin-bottom: 15px;
        }

        .cert-card h3 {
          font-size: 16px;
          margin-bottom: 8px;
        }

        .cert-card p {
          color: var(--muted);
          font-size: 13px;
          line-height: 1.6;
        }

        .cert-score {
          color: var(--cyan);
          font-size: 20px;
          font-weight: bold;
          margin: 8px 0;
        }

        .course-card {
          grid-column: span 2;
        }

        .preparing {
          border: 1px dashed var(--cyan);
        }

        /* =====================================================
           PROJECTS
        ===================================================== */

        #projects {
          background: var(--dark2);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
          max-width: 1000px;
          margin: auto;
        }

        .project-card {
          background: var(--dark);
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.04);
          transition: 0.4s;
        }

        .project-card:hover {
          transform: translateY(-7px);
          border-color: var(--cyan);
          box-shadow: 0 15px 40px rgba(0,0,0,0.35);
        }

        .project-image {
          height: 250px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .project-image-1 {
          background:
            radial-gradient(
              circle at 70% 30%,
              rgba(0,238,255,0.4),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #101923,
              #1d4050,
              #101820
            );
        }

        .project-image-2 {
          background:
            radial-gradient(
              circle at 30% 30%,
              rgba(0,238,255,0.3),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #111923,
              #273c50,
              #101820
            );
        }

        .project-image-3 {
          background:
            radial-gradient(
              circle at 70% 40%,
              rgba(0,238,255,0.3),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #11151d,
              #25343e,
              #101820
            );
        }

        .project-placeholder {
          text-align: center;
          color: var(--cyan);
          font-size: 55px;
        }

        .project-placeholder p {
          font-size: 13px;
          margin-top: 10px;
          color: var(--muted);
        }

        .featured {
          position: absolute;
          top: 18px;
          left: 18px;
          background: var(--cyan);
          color: #111820;
          padding: 7px 14px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: bold;
          z-index: 2;
        }

        .project-content {
          padding: 30px;
        }

        .project-content h2 {
          font-size: 23px;
          margin-bottom: 15px;
        }

        .project-content p {
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 18px;
        }

        .project-content ul {
          padding-left: 20px;
          color: var(--muted);
          line-height: 1.8;
          margin-bottom: 20px;
        }

        .project-link {
          color: var(--cyan);
          text-decoration: none;
          font-weight: bold;
          font-size: 13px;
        }

        .project-link:hover {
          text-decoration: underline;
        }

        /* =====================================================
           CONTACT
        ===================================================== */

        #contact {
          background: var(--dark);
          min-height: auto;
          padding-bottom: 80px;
        }

        .contact-wrapper {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 60px;
          max-width: 1000px;
          margin: auto;
        }

        .contact-info h2 {
          font-size: 28px;
          margin-bottom: 15px;
        }

        .contact-info > p {
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 30px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 22px;
        }

        .contact-icon {
          width: 42px;
          height: 42px;
          border: 1px solid var(--cyan);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--cyan);
        }

        .contact-item div:last-child {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .contact-item small {
          color: #8f97a4;
        }

        .contact-item a {
          color: white;
          text-decoration: none;
          font-size: 14px;
        }

        .contact-item a:hover {
          color: var(--cyan);
        }

        .contact-form {
          background: var(--dark2);
          padding: 30px;
          border-radius: 15px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 15px;
        }

        input,
        textarea {
          width: 100%;
          border: none;
          outline: none;
          background: #252d3a;
          color: white;
          padding: 16px;
          border-radius: 7px;
          font-size: 13px;
          border: 1px solid transparent;
          transition: 0.3s;
        }

        input:focus,
        textarea:focus {
          border-color: var(--cyan);
          box-shadow: 0 0 12px rgba(0,238,255,0.1);
        }

        input::placeholder,
        textarea::placeholder {
          color: #929aa7;
        }

        textarea {
          min-height: 170px;
          resize: vertical;
          margin-bottom: 18px;
        }

        .send {
          display: block;
          margin: auto;
        }

        /* =====================================================
           FOOTER
        ===================================================== */

        footer {
          min-height: 65px;
          background: var(--dark2);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          font-size: 12px;
          color: white;
        }

        .top-btn {
          width: 38px;
          height: 38px;
          border: none;
          background: var(--cyan);
          color: #111820;
          cursor: pointer;
          border-radius: 5px;
          font-size: 19px;
          font-weight: bold;
          box-shadow: 0 0 12px rgba(0,238,255,0.4);
        }

        .top-btn:hover {
          transform: translateY(-3px);
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1000px) {

          .nav-links {
            gap: 13px;
          }

          .nav-links button {
            font-size: 10px;
          }

          .home-content {
            gap: 30px;
          }

          .profile-wrapper {
            width: 320px;
          }

          .cert-grid {
            grid-template-columns: repeat(2, 1fr);
          }

        }

        @media (max-width: 800px) {

          nav {
            height: 65px;
            padding: 0 20px;
          }

          .logo {
            font-size: 18px;
          }

          .nav-links {
            gap: 8px;
          }

          .nav-links button {
            font-size: 8px;
          }

          section {
            padding-left: 6%;
            padding-right: 6%;
          }

          .home-content,
          .about-content {
            flex-direction: column;
            text-align: center;
          }

          .home-content {
            padding-top: 30px;
          }

          .home-text {
            order: 2;
          }

          .profile-wrapper {
            order: 1;
            width: 280px;
            height: 320px;
          }

          .hex {
            width: 250px;
            height: 290px;
          }

          .profile-photo {
            width: 230px;
            height: 270px;
          }

          .socials {
            justify-content: center;
          }

          .about-content {
            gap: 40px;
          }

          .about-image {
            width: 250px;
            height: 280px;
          }

          .about-photo {
            width: 230px;
            height: 258px;
          }

          .skills-container {
            grid-template-columns: 1fr;
            gap: 70px;
          }

          .cert-grid {
            grid-template-columns: 1fr;
          }

          .course-card {
            grid-column: span 1;
          }

          .contact-wrapper {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          footer {
            gap: 20px;
            padding: 15px 5%;
          }

        }

        @media (max-width: 500px) {

          .nav-links {
            display: none;
          }

          nav {
            justify-content: center;
          }

          .home-text h1 {
            font-size: 42px;
          }

          .typing {
            font-size: 20px;
          }

          .hero-buttons {
            display: flex;
            flex-direction: column;
            gap: 12px;
            align-items: center;
          }

          .btn-outline {
            margin-left: 0;
          }

          .title {
            font-size: 29px;
          }

          .professional {
            gap: 25px;
          }

          .timeline-item {
            padding-left: 50px;
          }

          .timeline::before {
            left: 15px;
          }

          .timeline-dot {
            left: 3px;
          }

        }

      `}</style>

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav>
        <div className="logo">
          Muhammad <span>Ali</span> Khan
        </div>

        <ul className="nav-links">

          {[
            ["home", "Home"],
            ["about", "About"],
            ["skills", "Skills"],
            ["projects", "Projects"],
            ["experience", "Experience"],
            ["certifications", "Certifications"],
            ["contact", "Contact"],
          ].map(([id, label]) => (
            <li key={id}>
              <button
                className={active === id ? "active" : ""}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            </li>
          ))}

        </ul>
      </nav>


      {/* =====================================================
          HOME
      ===================================================== */}

      <section id="home" className="animate-section">

        <div className="container home-content">

          <div className="home-text">

            <h3>Hello, It's Me</h3>

            <h1>
              Muhammad Ali Khan
            </h1>

            <div className="typing">
              And I'm an{" "}
              <strong>AWS Cloud Engineer</strong>
            </div>

            <p className="description">
              I am an AWS Cloud Engineer based in Karachi, Pakistan, specializing in designing, deploying and managing scalable cloud infrastructure on Amazon Web Services. Recently completed AWS 3in1 certification program at Sherdil IT Academy building real infrastructure, not just theory.
            </p>

            <div className="socials">

              

              <a href="https://www.linkedin.com/in/muhammad-ali-khan-34b389416/" aria-label="LinkedIn">
                in
              </a>
              <a href="https://github.com/makaic18-sudo" aria-label="Github">
                Git
              </a>

            </div>

            <div className="hero-buttons">

              <a
    href="/Cloud Engineer Resume (MAK).pdf"
    download="Muhammad-Ali-Khan-CV.pdf"
    className="btn"
  >
    Download CV
  </a>
              <button
                className="btn btn-outline"
                onClick={() => scrollTo("contact")}
              >
                Contact Me
              </button>

            </div>

          </div>


          <div className="profile-wrapper">

            <div className="hex">

              <div className="profile-photo">
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section id="about" className="animate-section">

        <div className="container about-content">

          <div className="about-image">

            <div className="about-photo">
            </div>

          </div>


          <div className="about-text">

            <h2>
              Who Am <span className="cyan">I?</span>
            </h2>

            <h3>AWS Cloud Engineer</h3>

            <p>
              Motivated AWS Cloud Engineer based in Karachi,
              Pakistan. BSE graduate from UBIT University of
              Karachi with hands-on experience in designing
              and deploying complete cloud infrastructure
              on AWS.

              {"\n\n"}

              Recently completed AWS 3in1 certification
              program at Sherdil IT Academy achieving 94.6%
              on final exam assessed at AWS Solutions
              Architect level.
            </p>

            <div className="about-highlight">
              I don't just learn theory, I build real cloud
              infrastructure!
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SKILLS
      ===================================================== */}

      <section id="skills" className="animate-section">

        <div className="container">

          <h2 className="title">
            My <span className="cyan">Skills</span>
          </h2>

          <p className="section-subtitle">
            Cloud infrastructure, networking, security,
            serverless technologies and AWS management skills.
          </p>


          <div className="skills-container">

            {/* TECHNICAL */}

            <div className="skill-column">

              <h2>Technical Skills</h2>

              <Skill
                name="AWS Services"
                percent={90}
              />

              <Skill
                name="Security & IAM"
                percent={85}
              />

              <Skill
                name="Networking & VPC"
                percent={85}
              />

              <Skill
                name="Storage & Databases"
                percent={80}
              />

              <Skill
                name="Serverless & Lambda"
                percent={75}
              />

              <Skill
                name="Monitoring & CloudWatch"
                percent={80}
              />

            </div>


            {/* PROFESSIONAL */}

            <div className="skill-column">

              <h2>Professional Skills</h2>

              <div className="professional">

                <Circle
                  percent={85}
                  label="Problem Solving"
                />

                <Circle
                  percent={80}
                  label="Communication"
                />

                <Circle
                  percent={75}
                  label="Team Work"
                />

              </div>

            </div>

          </div>


          {/* AWS SKILL TAGS */}

          <div className="skill-tags">

            {[
              "VPC",
              "EC2",
              "IAM",
              "S3",
              "RDS",
              "Lambda",
              "CloudFormation",
              "Route 53",
              "CloudWatch",
              "CloudTrail",
              "CloudFront",
              "SNS",
              "SQS",
              "EventBridge",
              "EBS",
              "Auto Scaling",
              "Load Balancer",
              "AWS CLI",
              "Linux",
              "Windows Server",
              "IIS",
              "Apache",
              "PuTTY",
              "MySQL Workbench",
              "RDP",
            ].map((skill) => (
              <span className="skill-tag" key={skill}>
                {skill}
              </span>
            ))}

          </div>

        </div>

      </section>
      <section id="projects" className="animate-section">

        <div className="container">

          <h2 className="title">
            My <span className="cyan">Projects</span>
          </h2>

          <p className="section-subtitle">
            Real-world AWS infrastructure projects demonstrating
            cloud architecture, networking, security and
            high availability.
          </p>


          <div className="projects-grid">


            {/* =================================================
                PROJECT 1
            ================================================= */}

            <div className="project-card">

              <div className="project-image project-image-1">

                <span className="featured">
                  ★ Featured Project
                </span>

                {/* 
                  When you have a screenshot:
                  put project1.png inside public folder
                  and uncomment the img below.

                  <img src="/project1.png" alt="AWS project" />
                */}

                <div className="project-placeholder">

                  ☁️

                  <p>
                    AWS High Availability Architecture
                  </p>

                </div>

              </div>


              <div className="project-content">

                <h2>
                  High Availability Web Application
                </h2>

                <p>
                  Complete production-grade AWS architecture
                  designed for availability, scalability and
                  secure infrastructure management.
                </p>

                <ul>

                  <li>
                    VPC — 2 public + 3 private subnets
                  </li>

                  <li>
                    EC2 Windows instances + IIS
                  </li>

                  <li>
                    Application Load Balancer
                  </li>

                  <li>
                    Auto Scaling Group — 2 instances
                  </li>

                  <li>
                    RDS MySQL — private subnet
                  </li>

                  <li>
                    Bastion Host — secure access
                  </li>

                  <li>
                    Route 53 — custom domain
                  </li>

                </ul>

                

              </div>

            </div>


            {/* =================================================
                PROJECT 2
            ================================================= */}

            <div className="project-card">

              <div className="project-image project-image-2">

                <div className="project-placeholder">

                  🌐

                  <p>
                    AWS VPC & EC2 Infrastructure
                  </p>

                </div>

              </div>


              <div className="project-content">

                <h2>
                  AWS VPC & EC2 Infrastructure
                </h2>

                <p>
                  Designed and deployed a multi-network AWS
                  infrastructure with Windows and Linux
                  servers and cross-network communication.
                </p>

                <ul>

                  <li>
                    2 VPCs with best-practice CIDRs
                  </li>

                  <li>
                    Windows + Linux servers deployed
                  </li>

                  <li>
                    IIS + Apache web servers
                  </li>

                  <li>
                    VPC Peering — cross-network access
                  </li>

                  <li>
                    EBS volumes, snapshots and AMIs
                  </li>

                  <li>
                    RDP + SSH/PuTTY connectivity
                  </li>

                  <li>
                    Security Groups + NACLs
                  </li>

                </ul>

              </div>

            </div>


            {/* =================================================
                PROJECT 3
            ================================================= */}

            <div className="project-card">

              <div className="project-image project-image-3">

                <div className="project-placeholder">

                  🔐

                  <p>
                    AWS IAM & S3 Security
                  </p>

                </div>

              </div>


              <div className="project-content">

                <h2>
                  AWS IAM & S3 Security Implementation
                </h2>

                <p>
                  Implemented AWS identity, access control and
                  S3 security restrictions using IAM policies
                  and service-level permissions.
                </p>

                <ul>

                  <li>
                    IAM users, groups and custom policies
                  </li>

                  <li>
                    Deny policies for CloudTrail, IAM and S3
                  </li>

                  <li>
                    S3 bucket upload/download restrictions
                  </li>

                  <li>
                    S3 OneZone-IA storage class
                  </li>

                  <li>
                    Security restrictions verified
                  </li>

                </ul>

              </div>

            </div>


          </div>

        </div>

      </section>

      {/* =====================================================
          EXPERIENCE
      ===================================================== */}

      <section id="experience" className="animate-section">

        <div className="container">

          <h2 className="title">
            My <span className="cyan">Experience</span>
          </h2>

          <div className="timeline">

            <div className="timeline-item">

              <div className="timeline-dot"></div>

              <div className="experience-card">

                <h2>
                  Freelance AWS Cloud Engineer
                </h2>

                <h3>
                  Self Employed — Karachi
                </h3>

                <span className="date">
                  Jun 2025 — Present
                </span>

                <ul>

                  <li>
                    Deployed High Availability web
                    applications on AWS for clients.
                  </li>

                  <li>
                    Implemented VPC architectures with
                    public and private subnets.
                  </li>

                  <li>
                    Managed EC2 Windows and Linux servers.
                  </li>

                  <li>
                    Configured IAM users, groups and
                    security policies.
                  </li>

                  <li>
                    Set up CloudWatch monitoring.
                  </li>

                  <li>
                    Managed EBS volumes and Route 53.
                  </li>

                </ul>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CERTIFICATIONS
      ===================================================== */}

      <section
        id="certifications"
        className="animate-section"
      >

        <div className="container">

          <h2 className="title">
            My <span className="cyan">Certifications</span>
          </h2>


          <div className="cert-grid">


            {/* FINAL EXAM */}

            {/* COURSE */}

            <div className="cert-card course-card">

              <div className="cert-icon">
                📚
              </div>

              <h3>
                AWS 3in1 Course — Complete
              </h3>

              <p>
                Sherdil IT Academy — Batch 62
              </p>

              <p>
                Jun 2026 — Sep 2026
              </p>

            </div>


            {/* GENERATIVE AI */}

            <div className="cert-card">

              <div className="cert-icon">
                🤖
              </div>

              <h3>
                Generative AI — Complete
              </h3>

              <p>
                Course completed.
              </p>

            </div>


            {/* PREPARING */}

            <div className="cert-card preparing">

              <div className="cert-icon">
                📚
              </div>

              <h3>
                Currently Preparing
              </h3>

              <p>
                AWS Cloud Practitioner
              </p>

              <p>
                CLF-C02
              </p>

            </div>


          </div>

        </div>

      </section>


      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section id="contact" className="animate-section">

        <div className="container">

          <h2 className="title">
            Get In <span className="cyan">Touch!</span>
          </h2>


          <div className="contact-wrapper">


            {/* CONTACT INFO */}

            <div className="contact-info">

              <h2>
                Let's Work <span className="cyan">Together</span>
              </h2>

              <p>
                Have an AWS cloud project or want to discuss
                cloud infrastructure? Feel free to get in touch.
              </p>


              <div className="contact-item">

                <div className="contact-icon">
                  📍
                </div>

                <div>

                  <small>
                    Location
                  </small>

                  <span>
                    Karachi, Pakistan
                  </span>

                </div>

              </div>


              <div className="contact-item">

                <div className="contact-icon">
                  📱
                </div>

                <div>

                  <small>
                    Phone
                  </small>

                  <a href="tel:+923002555226">
                    0300-2555226
                  </a>

                </div>

              </div>


              <div className="contact-item">

                <div className="contact-icon">
                  ✉
                </div>

                <div>

                  <small>
                    Email
                  </small>

                  <a href="mailto:makaic18@gmail.com">
                    makaic18@gmail.com
                  </a>

                </div>

              </div>


              <div className="contact-item">

                <div className="contact-icon">
                  in
                </div>

                <div>

                  <small>
                    LinkedIn
                  </small>

                  <a href="https://www.linkedin.com/in/muhammad-ali-khan-34b389416">
                    Link
                  </a>

                </div>

              </div>


            

            </div>


            {/* CONTACT FORM */}
<form
  className="contact-form"
  onSubmit={async (e) => {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget

    const templateParams = {
      from_name: form.elements.name.value,
      from_email: form.elements.email.value,
      subject: `Portfolio Contact from ${form.elements.name.value}`,
      message: form.elements.message.value
    }

    try {
      await emailjs.send(
        'service_2kgfsvq',
        'template_afexgwq',
        templateParams,
        'MwaaI2uM4RCtF71Yz'
      )
      setSent(true)
      form.reset()
      setTimeout(() => setSent(false), 4000)
    } catch (error) {
      alert('Something went wrong! Try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }}
>
  <div className="form-row">
    <input
      name="name"
      type="text"
      placeholder="Full Name"
      required
    />
    <input
      name="email"
      type="email"
      placeholder="Email Address"
      required
    />
  </div>

  <textarea
    name="message"
    placeholder="Your Message"
    required
  />

  <button
    type="submit"
    className="btn send"
    disabled={loading}
    style={{
      opacity: loading ? 0.7 : 1,
      cursor: loading ? 'not-allowed' : 'pointer'
    }}
  >
    {loading ? 'Sending...' : sent ? '✅ Message Sent!' : 'Send Message'}
  </button>

</form>
          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer>

        <p>
          Copyright © 2026 by Muhammad Ali Khan |
          All Rights Reserved
        </p>

        <button
          className="top-btn"
          onClick={() => scrollTo("home")}
        >
          ↑
        </button>

      </footer>

    </>
  );
}


/* ============================================================
   SKILL COMPONENT
============================================================ */

function Skill({ name, percent }) {

  return (

    <div className="skill">

      <div className="skill-info">

        <span>
          {name}
        </span>

        <span>
          {percent}%
        </span>

      </div>

      <div className="bar">

        <span
          style={{
            width: `${percent}%`,
          }}
        />

      </div>

    </div>

  );
}


/* ============================================================
   CIRCLE COMPONENT
============================================================ */

function Circle({ percent, label }) {

  return (

    <div className="circle-box">

      <div
        className="circle"
        style={{
          "--percent": `${percent * 3.6}deg`,
        }}
      >

        <span>
          {percent}%
        </span>

      </div>

      <div className="circle-label">
        {label}
      </div>

    </div>

  );
}