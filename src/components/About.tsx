import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          AI/ML Engineer specializing in Generative AI, LLM orchestration,
          autonomous Agentic workflows, and deep learning architectures. Proven track
          record in orchestrating foundation models at Amazon (AWS Bedrock), engineering
          real-time hardware-software integrations with ROS2, and publishing peer-reviewed
          AI research in Springer.
        </p>
        <div className="about-highlights">
          <div className="about-highlight-item">
            <span className="highlight-tag">RESEARCH</span>
            <span className="highlight-text">Published in Springer & Patent Holder</span>
          </div>
          <div className="about-highlight-item">
            <span className="highlight-tag">PRODUCTION</span>
            <span className="highlight-text">Ex-Amazon AWS Bedrock LLM Team</span>
          </div>
          <div className="about-highlight-item">
            <span className="highlight-tag">AUTONOMOUS</span>
            <span className="highlight-text">Production Agentic Workflows & Robotics</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
