import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import "./styles/SocialIcons.css";
import { TbNotes, TbDownload } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  const handleResumeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open("/Chayan_Kumar_Resume.pdf", "_blank", "noopener,noreferrer");

    const link = document.createElement("a");
    link.href = "/Chayan_Kumar_Resume.pdf";
    link.download = "Chayan_Kumar_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="https://github.com/Chayanck123"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/chayankumar/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="https://leetcode.com/u/Chayannn/"
            target="_blank"
            rel="noopener noreferrer"
            title="LeetCode"
          >
            <SiLeetcode />
          </a>
        </span>
        <span>
          <a
            href="mailto:chayankumar08@gmail.com"
            title="Email Chayan"
          >
            <FaEnvelope />
          </a>
        </span>
      </div>
      <div className="resume-container">
        <a
          className="resume-button"
          href="/Chayan_Kumar_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          title="Open & Download Resume"
          onClick={handleResumeClick}
        >
          <HoverLinks text="RESUME" />
          <span>
            <TbNotes />
          </span>
        </a>
        <a
          className="resume-download-btn"
          href="/Chayan_Kumar_Resume.pdf"
          download="Chayan_Kumar_Resume.pdf"
          title="Download Resume"
          data-cursor="disable"
        >
          <TbDownload />
          <span className="resume-tooltip">Download PDF</span>
        </a>
      </div>
    </div>
  );
};

export default SocialIcons;
