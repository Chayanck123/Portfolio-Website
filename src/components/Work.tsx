import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ProjectItem {
  number: string;
  name: string;
  category: string;
  tools: string;
  image: string;
  link?: string;
}

const projects: ProjectItem[] = [
  {
    number: "01",
    name: "Fruit Quality Detection & Classifier",
    category: "★ Peer-Reviewed Research (Springer) & Patent",
    tools: "Python, CNNs, TensorFlow, Keras, Computer Vision, Validation Metrics",
    image: "/images/project_fruit.jpg",
    link: "https://link.springer.com/chapter/10.1007/978-981-97-7862-1_4",
  },
  {
    number: "02",
    name: "Autonomous RTL Agentic Workflow",
    category: "Agentic AI & Hardware EDA (Lyptus Technologies)",
    tools: "Python, FastAPI, OpenAI, Z.ai, Automated Verilator Self-Repair Loops",
    image: "/images/project_agentic.jpg",
    link: "https://github.com/Chayanck123",
  },
  {
    number: "03",
    name: "Real-time Humanoid Pose Mirroring (30Hz)",
    category: "Robotics & Kinematics (Lyptus Technologies)",
    tools: "ROS2, MediaPipe, Python, RViz2, 9-DOF URDF Mirrored Kinematics",
    image: "/images/project_robotics.jpg",
    link: "https://github.com/Chayanck123",
  },
  {
    number: "04",
    name: "AWS Bedrock Telemetry & Observability",
    category: "Cloud ML & GenAI Ops (Amazon | AWS)",
    tools: "AWS Bedrock, SageMaker, QuickSight, Prompt Engineering & LLM Evaluation",
    image: "/images/project_aws.jpg",
    link: "https://github.com/Chayanck123",
  },
  {
    number: "05",
    name: "Stock Forecasting & Market Visualizer",
    category: "Financial AI & Time-Series Modeling",
    tools: "Python, Jupyter Notebook, Pandas, NumPy, Scikit-learn",
    image: "/images/project_stock.jpg",
    link: "https://github.com/Chayanck123/Stock_Visulaizer",
  },
  {
    number: "06",
    name: "Revshop Full-Stack E-Commerce",
    category: "Enterprise Java & Microservices (Revature)",
    tools: "Java, Spring Boot, Hibernate, JSP, SQL, Maven",
    image: "/images/project_backend.jpg",
    link: "https://github.com/Chayanck123/Revshop-Team",
  },
  {
    number: "07",
    name: "Algorithm & DSA Interactive Visualizer",
    category: "Core CS & Interactive Systems",
    tools: "JavaScript, HTML5 Canvas, Graph Pathfinding, Sorting",
    image: "/images/project_algo.jpg",
    link: "https://github.com/Chayanck123/Algorithm_Visualizer",
  },
];

const Work = () => {
  useGSAP(() => {
    const workFlex = document.querySelector(".work-flex") as HTMLElement;
    const workContainer = document.querySelector(".work-container") as HTMLElement;

    if (!workFlex || !workContainer) return;

    const getScrollAmount = () => {
      const boxes = Array.from(
        workFlex.querySelectorAll(".work-box")
      ) as HTMLElement[];
      if (boxes.length === 0) return 0;
      const lastBox = boxes[boxes.length - 1];
      const lastBoxRight = lastBox.offsetLeft + lastBox.offsetWidth;
      const containerWidth = workContainer.clientWidth || window.innerWidth;
      const rightPadding = window.innerWidth > 1400 ? 80 : 40;
      return Math.max(0, lastBoxRight - containerWidth + rightPadding);
    };

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        scrub: 1,
        pin: true,
        pinType: "transform",
        anticipatePin: 1,
        invalidateOnRefresh: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: () => -getScrollAmount(),
      ease: "none",
    });

    // Refresh after DOM layout is established
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.number}</h3>

                  <div>
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-title-link"
                        data-cursor="disable"
                      >
                        <h4>{project.name}</h4>
                      </a>
                    ) : (
                      <h4>{project.name}</h4>
                    )}
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.name}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
