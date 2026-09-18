import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Science</h4>
                <h5>Dr. APJ Abdul Kalam Tech Univ (7.8 CGPA)</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Graduated with a strong foundation in Data Structures, Algorithms, and ML pipelines.
              Authored Springer-published research and filed an academic patent for a CNN-based
              Fruit Quality Detection and Classification model trained using TensorFlow & Keras.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer Trainee</h4>
                <h5>Revature | Pune, India</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Engineered backend services and MVC modules using Java, Spring Boot, and Maven.
              Authored high-efficiency SQL queries, managed distributed JSON/YAML configs, and
              practiced version control and code reviews in Agile sprint cycles.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Machine Learning Associate</h4>
                <h5>Amazon | AWS Bedrock Team</h5>
              </div>
              <h3>2024 - 2026</h3>
            </div>
            <p>
              Accelerated AI/ML data quality for AWS Bedrock generative foundation models.
              Engineered Python automation scripts for cross-referencing and data refinement in
              AWS SageMaker. Built enterprise QuickSight operational dashboards and standardized
              best practices for LLM observability, prompt engineering, and model evaluation metrics.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI/ML Engineer</h4>
                <h5>Lyptus Technologies | Bangalore</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Architected end-to-end agentic workflows (FastAPI, Python) orchestrating LLMs (Z.ai, OpenAI)
              to synthesize SystemVerilog/RTL code with automated self-healing Verilator repair loops.
              Engineered a real-time (30Hz) AI pose mirroring pipeline using MediaPipe and ROS2 to map
              human combat poses onto dual humanoid robots with 9-DOF URDF joint kinematics in RViz2.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
