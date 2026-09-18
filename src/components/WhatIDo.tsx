import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    const clickListeners: Array<{ el: HTMLElement; fn: () => void }> = [];
    const wheelListeners: Array<{ el: HTMLElement; fn: (e: WheelEvent) => void }> = [];

    containerRef.current.forEach((container) => {
      if (!container) return;

      const clickFn = () => handleClick(container);
      container.addEventListener("click", clickFn);
      clickListeners.push({ el: container, fn: clickFn });

      // Isolate wheel scrolling so scrolling inside this box does not scroll the main website page
      const contentIn = container.querySelector<HTMLDivElement>(".what-content-in");
      if (contentIn) {
        const wheelFn = (e: WheelEvent) => {
          const target = contentIn;
          const isScrollable = target.scrollHeight > target.clientHeight;
          if (!isScrollable) return;

          const atTop = target.scrollTop <= 0 && e.deltaY < 0;
          const atBottom =
            target.scrollTop + target.clientHeight >= target.scrollHeight - 1 &&
            e.deltaY > 0;

          if (!atTop && !atBottom) {
            e.stopPropagation();
            target.scrollTop += e.deltaY;
            e.preventDefault();
          }
        };

        contentIn.addEventListener("wheel", wheelFn, { passive: false });
        wheelListeners.push({ el: contentIn, fn: wheelFn });
      }
    });

    return () => {
      clickListeners.forEach(({ el, fn }) => el.removeEventListener("click", fn));
      wheelListeners.forEach(({ el, fn }) => el.removeEventListener("wheel", fn));
    };
  }, []);

  return (
    <div className="whatIDO" id="services">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%" height="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg width="100%" height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>GENERATIVE AI & LLMs</h3>
              <h4>RAG, Prompt Engineering & Evaluation</h4>
              <p>
                Designing production-grade GenAI architectures using Foundation
                Models (AWS Bedrock, OpenAI, Claude). Building semantic RAG pipelines
                with vector retrieval, prompt engineering, LLM observability,
                and automated evaluation frameworks.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Generative AI</div>
                <div className="what-tags">LLMs</div>
                <div className="what-tags">RAG Architecture</div>
                <div className="what-tags">AWS Bedrock</div>
                <div className="what-tags">Prompt Engineering</div>
                <div className="what-tags">LLM Evaluation</div>
                <div className="what-tags">Vector Search</div>
                <div className="what-tags">LangChain</div>
                <div className="what-tags">Fine-Tuning</div>
                <div className="what-tags">FastAPI</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg width="100%" height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>AGENTIC AI & ML</h3>
              <h4>Autonomous Pipelines & Deep Learning</h4>
              <p>
                Engineering autonomous multi-agent workflows with tool-calling
                capabilities, state-machine orchestration, and dynamic self-healing
                code repair loops. Training deep learning vision models (CNNs,
                PyTorch, TensorFlow, Keras) with end-to-end data validation.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Agentic AI</div>
                <div className="what-tags">Multi-Agent Systems</div>
                <div className="what-tags">State Machines</div>
                <div className="what-tags">Self-Healing Loops</div>
                <div className="what-tags">PyTorch</div>
                <div className="what-tags">TensorFlow</div>
                <div className="what-tags">CNNs & Vision</div>
                <div className="what-tags">Scikit-learn</div>
                <div className="what-tags">Keras</div>
                <div className="what-tags">Pandas & NumPy</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 2)}
          >
            <div className="what-border1">
              <svg width="100%" height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>SYSTEMS & ROBOTICS</h3>
              <h4>Real-Time AI, Hardware & Cloud Ops</h4>
              <p>
                Developing real-time (30Hz) AI pose mirroring using MediaPipe &
                ROS2, calibrating 9-DOF URDF joint kinematics in RViz2, orchestrating
                scalable data validation in AWS SageMaker, and building operational
                telemetry dashboards on AWS QuickSight.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">ROS2</div>
                <div className="what-tags">MediaPipe</div>
                <div className="what-tags">RViz2 Kinematics</div>
                <div className="what-tags">AWS SageMaker</div>
                <div className="what-tags">AWS QuickSight</div>
                <div className="what-tags">Docker</div>
                <div className="what-tags">Linux</div>
                <div className="what-tags">C++</div>
                <div className="what-tags">Data Structures</div>
                <div className="what-tags">Git & CI/CD</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  const isActive = container.classList.contains("what-content-active");
  const parent = container.parentElement;
  if (!parent) return;

  const allCards = Array.from(parent.querySelectorAll<HTMLDivElement>(".what-content"));

  if (isActive) {
    container.classList.remove("what-content-active");
    allCards.forEach((c) => c.classList.remove("what-sibling"));
  } else {
    allCards.forEach((c) => {
      if (c === container) {
        c.classList.add("what-content-active");
        c.classList.remove("what-sibling");
      } else {
        c.classList.remove("what-content-active");
        c.classList.add("what-sibling");
      }
    });
  }
}
