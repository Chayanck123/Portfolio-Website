// Chayan AI - High-Intelligence Knowledge Base & Autonomous Reasoning Engine

export interface AIResponse {
  text: string;
  action?: {
    type: "download_resume" | "link" | "email" | "scroll";
    label: string;
    url: string;
    target?: string;
  };
  suggestions?: string[];
}

export const CHAYAN_PROFILE = {
  name: "Chayan Kumar",
  title: "AI/ML Engineer",
  roles: ["Generative AI Architect", "Agentic Systems Engineer", "Robotics Specialist", "Published Researcher"],
  contact: {
    email: "chayankumar08@gmail.com",
    phone: "+91-8299136476",
    linkedin: "https://www.linkedin.com/in/chayankumar/",
    github: "https://github.com/Chayanck123",
    leetcode: "https://leetcode.com/u/Chayannn/",
    resume: "/Chayan_Kumar_Resume.pdf",
    location: "Bangalore, India",
  },
  candidateInfo: {
    age: 24,
    birthYear: 2002,
    noticePeriod: "30 days (negotiable / buyout possible for early joining)",
    pythonExperience: "3+ years of intensive engineering experience",
    totalExperience: "~2+ years of combined professional and research experience",
    targetRoles: [
      "AI/ML Engineer (Generative AI, LLMs & Agentic Systems)",
      "Computer Vision & Deep Learning Engineer (CNNs, PyTorch)",
      "Robotics & Kinematics Software Engineer (ROS2, MediaPipe)",
      "Full-Stack Machine Learning Engineer (FastAPI, Python, Cloud)",
    ],
    location: "Bangalore, India",
    relocation: "Open to working anywhere: Bangalore, any Indian tech hub, international relocation with visa sponsorship, and worldwide remote",
    compensation: "Standard market-competitive rate, open to discussion based on role, scope, and impact",
    availability: "Available for technical discussions and interviews on short notice",
    languages: ["English", "Hindi"],
  },
  education: {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Dr. APJ Abdul Kalam Technical University",
    cgpa: "7.8",
    gradYear: "2024",
  },
  research: {
    title: "Fruit Quality Detection and Classification using Deep CNNs",
    publisher: "Springer Nature",
    status: "Peer-Reviewed & Published (2024)",
    link: "https://link.springer.com/chapter/10.1007/978-981-97-7862-1_4",
    patent: "Academic Patent Filed for Novel CNN-Based Agricultural Quality Classification Architecture",
    stack: "Python, TensorFlow, Keras, OpenCV, CNNs",
  },
  experience: [
    {
      company: "Lyptus Technologies",
      role: "AI/ML Engineer",
      period: "May 2026 - Present",
      location: "Bangalore, India",
      highlights: [
        "Architected end-to-end agentic workflows (FastAPI, Python) orchestrating LLMs (Z.ai, OpenAI) to synthesize SystemVerilog/RTL code with automated self-healing Verilator repair loops.",
        "Engineered a real-time (30Hz) AI pose mirroring pipeline using MediaPipe and ROS2 to map human combat poses onto dual humanoid robots with 9-DOF URDF joint kinematics in RViz2.",
        "Built custom tool-calling agents and state machines for deterministic hardware verification.",
      ],
    },
    {
      company: "Amazon | AWS Bedrock Team",
      role: "Machine Learning Associate",
      period: "Oct 2024 - Mar 2026",
      location: "Bangalore, India",
      highlights: [
        "Accelerated AI/ML data quality for AWS Bedrock generative foundation models.",
        "Engineered Python automation scripts for cross-referencing and data refinement in AWS SageMaker.",
        "Built enterprise QuickSight operational dashboards and standardized best practices for LLM observability, prompt engineering, and model evaluation metrics.",
      ],
    },
    {
      company: "Revature",
      role: "Software Engineer Trainee",
      period: "Jul 2024 - Oct 2024",
      location: "Pune, India",
      highlights: [
        "Engineered backend services and MVC modules using Java, Spring Boot, Hibernate, and Maven.",
        "Authored high-efficiency SQL queries, managed distributed JSON/YAML configs, and practiced Agile sprint cycles.",
      ],
    },
  ],
};

// Initial welcome message
export const INITIAL_AI_MESSAGE: AIResponse = {
  text: "👋 Hi! I am **Chayan AI**, Chayan Kumar's portfolio copilot. I can answer any question about his experience!",
  suggestions: [
    "⏱️ Current notice period?",
    "🐍 Years of Python experience?",
    "💼 Tell me about Amazon Bedrock",
    "🤖 What did you build at Lyptus?",
    "📄 Download Resume",
  ],
};

/**
 * Safe local arithmetic solver (0ms latency for any math expression)
 */
function trySolveMath(prompt: string): string | null {
  const cleaned = prompt
    .toLowerCase()
    .replace(/what is|what's|calculate|evaluate|solve|\?|=/g, "")
    .replace(/\^/g, "**")
    .replace(/\bx\b/g, "*")
    .trim();

  if (/^[\-\+\*\/\(\)0-9\.\s\%]+$/.test(cleaned) && /\d/.test(cleaned)) {
    try {
      const res = Function(`"use strict"; return (${cleaned})`)();
      if (typeof res === "number" && !isNaN(res) && isFinite(res)) {
        return `The result of **${cleaned}** is **${res}**.`;
      }
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Universal Live LLM Caller:
 * Priority 1: Browser Puter.js (OpenAI GPT-4o-mini free tier)
 * Priority 2: Public live endpoint fallback
 */
async function queryLiveLLM(
  userPrompt: string,
  history?: { sender: "user" | "ai"; text: string }[]
): Promise<string | null> {
  const systemPrompt = `You are Chayan AI, the personal AI digital twin and portfolio copilot for Chayan Kumar.
Key Profile Facts:
- Name: Chayan Kumar
- Age: 24 years old (born in 2002)
- Languages: English, Hindi
- Notice Period: 30 days (negotiable / buyout possible)
- Python Experience: 3+ years of deep daily engineering
- Total Experience: ~2+ years combined professional and research
- Current Role: AI/ML Engineer at Lyptus Technologies (May 2026 - Present), Bangalore. Built autonomous agentic RTL synthesis pipelines (FastAPI, OpenAI/Z.ai) with self-healing Verilator repair loops, and 30Hz ROS2 + MediaPipe humanoid pose mirroring on 9-DOF URDF joint models in RViz2.
- Previous Role: Machine Learning Associate at Amazon | AWS Bedrock Team (Oct 2024 - Mar 2026), Bangalore. Foundation model data quality, AWS SageMaker Python automation, QuickSight operational telemetry dashboards, and LLM output observability.
- Education: B.Tech in Computer Science & Engineering (Class of 2024), Dr. APJ Abdul Kalam Technical University, 7.8 CGPA.
- Research & Patent: Published peer-reviewed paper in Springer Nature (Fruit Quality Detection and Classification using Deep CNNs, 2024) and filed an official academic patent.
- Target Roles: AI/ML Engineer (GenAI, LLMs, Agentic AI), Computer Vision & Deep Learning, Robotics & Kinematics, Full-Stack ML.
- Location & Relocation: Based in Bangalore, open to working ANYWHERE (Bangalore, Indian tech hubs, international relocation, or remote).
- Compensation: Standard market-competitive rate, negotiable.

Instructions:
1. When asked about Chayan (age, experience, background, skills, roles, projects, personal facts), answer accurately, concisely, and with confidence.
2. When asked ANY other question (math, coding, science, philosophy, history, general queries), answer thoroughly, accurately, and intelligently with clear markdown formatting.
3. Keep answers direct, smart, and well-structured.`;

  let historyContext = "";
  if (history && history.length > 1) {
    const recent = history.slice(-4);
    historyContext =
      "\nRecent Conversation History:\n" +
      recent
        .map(
          (m) =>
            `${m.sender === "user" ? "User" : "Chayan AI"}: ${m.text.slice(
              0,
              300
            )}`
        )
        .join("\n") +
      "\n";
  }

  const fullPrompt = `${systemPrompt}${historyContext}\n\nUser Question: ${userPrompt}\n\nAnswer:`;

  // 1. Try Puter.js (Browser-native GPT-4o-mini)
  if (typeof window !== "undefined" && (window as any).puter?.ai?.chat) {
    try {
      const response = await (window as any).puter.ai.chat(fullPrompt, {
        model: "gpt-4o-mini",
      });
      const text =
        typeof response === "string"
          ? response
          : response?.message?.content || response?.text;
      if (text && text.trim().length > 0) {
        return text.trim();
      }
    } catch {
      // Fall through to backup
    }
  }

  // 2. Try fast JSON POST endpoint
  try {
    const messages: Array<{ role: string; content: string }> = [
      { role: "system", content: systemPrompt },
    ];
    if (history && history.length > 1) {
      for (const h of history.slice(-4)) {
        messages.push({
          role: h.sender === "user" ? "user" : "assistant",
          content: h.text.slice(0, 300),
        });
      }
    }
    messages.push({ role: "user", content: userPrompt });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, model: "openai" }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (res.ok) {
      const text = await res.text();
      if (
        text &&
        text.trim().length > 0 &&
        !text.includes("Too Many Requests") &&
        !text.includes("Error:")
      ) {
        return text.trim();
      }
    }
  } catch {
    // Fall through
  }

  // 3. Try fast secondary GET endpoint fallback
  try {
    const url = `https://text.pollinations.ai/${encodeURIComponent(
      fullPrompt
    )}?model=openai`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      const text = await res.text();
      if (
        text &&
        text.trim().length > 0 &&
        !text.includes("Too Many Requests") &&
        !text.includes("Error:")
      ) {
        return text.trim();
      }
    }
  } catch {
    // Timeout or network
  }

  return null;
}

/**
 * High-IQ semantic query processor with multi-turn memory
 */
export async function getAIResponse(
  userPrompt: string,
  history?: { sender: "user" | "ai"; text: string }[]
): Promise<AIResponse> {
  const query = userPrompt.trim().toLowerCase();

  // 1. Notice Period / Joining Time / Availability
  if (
    query.includes("notice") ||
    query.includes("joining") ||
    query.includes("how soon") ||
    query.includes("start date") ||
    query.includes("when can you start") ||
    query.includes("when can you join") ||
    query.includes("serving notice") ||
    query.includes("available to join")
  ) {
    return {
      text: `Chayan's current notice period is **30 days** at Lyptus Technologies.

• **Current Status:** Serving in full standing as AI/ML Engineer.
• **Early Joining:** Depending on the role, urgency, and offer details, a notice period buyout or earlier transition can be negotiated.
• **Interview Availability:** Available for technical rounds and interviews on short notice.`,
      suggestions: [
        "🐍 Years of Python experience?",
        "💼 Experience at Amazon AWS",
        "📄 Download Resume",
      ],
    };
  }

  // 2. Instant Arithmetic Math Solver
  const mathResult = trySolveMath(userPrompt);
  if (mathResult) {
    return {
      text: mathResult,
      suggestions: [
        "⏱️ Current notice period?",
        "🐍 Years of Python experience?",
        "📄 Download Resume",
      ],
    };
  }

  // 2b. Age / Date of Birth / How old is Chayan
  if (
    query.includes("how old") ||
    query.includes("what is your age") ||
    query.includes("what is chayan's age") ||
    query.includes("what's your age") ||
    query.includes("what's chayan's age") ||
    query.includes("chayan age") ||
    query.includes("chayan's age") ||
    /\bage\b/.test(query) ||
    query.includes("born") ||
    query.includes("birth") ||
    query.includes("birthday") ||
    query.includes("dob")
  ) {
    return {
      text: `Chayan is **24 years old** (born in 2002).\n\nDespite his young age, he has already built an impressive engineering track record:\n• **Lyptus Technologies:** AI/ML Engineer architecting autonomous agentic RTL synthesis systems (FastAPI, Verilator) and 30Hz ROS2 humanoid robotics.\n• **Amazon | AWS Bedrock Team:** Machine Learning Associate working on foundation model data quality, SageMaker pipelines, and operational telemetry.\n• **Springer Nature Author & Patent:** Published peer-reviewed research on CNN architectures and holds an academic patent in computer vision.\n• **Academic Background:** B.Tech in Computer Science & Engineering (Class of 2024, 7.8 CGPA).`,
      suggestions: [
        "⏱️ Current notice period?",
        "🐍 Years of Python experience?",
        "💼 Experience at Amazon AWS",
        "📄 Download Resume",
      ],
    };
  }

  // 3. Python Experience (years of experience, level, depth)
  if (
    query.includes("python") &&
    (query.includes("year") ||
      query.includes("how long") ||
      query.includes("experience") ||
      query.includes("hold") ||
      query.includes("much") ||
      query.includes("level"))
  ) {
    return {
      text: `Chayan holds **over 3+ years** of intensive hands-on experience in **Python**. It is his primary language and engineering daily driver across:

• **Generative AI & Agentic Systems:** Developing multi-agent pipelines with **FastAPI** and LLM orchestration (OpenAI, Z.ai).
• **Deep Learning & Computer Vision:** Designing CNN architectures using **PyTorch**, **TensorFlow**, and **Keras** (including his peer-reviewed **Springer-published** research).
• **Robotics & Kinematics:** Implementing real-time (30Hz) pose mirroring using **MediaPipe** and **ROS2** with 9-DOF URDF joint models.
• **Cloud ML Automation:** Writing enterprise Python automation scripts for data refinement in **AWS SageMaker** for AWS Bedrock foundation models at Amazon.`,
      suggestions: [
        "⏱️ Current notice period?",
        "🤖 What did Chayan build at Lyptus?",
        "📄 Download Resume",
      ],
    };
  }

  // 4. Overall Years of Experience
  if (
    query.includes("how many years of experience") ||
    query.includes("total experience") ||
    query.includes("years of experience do you have") ||
    query.includes("overall experience")
  ) {
    return {
      text: `Chayan has **~2+ years** of professional and deep engineering experience across AI/ML, cloud, and robotics:

• **Lyptus Technologies (May 2026 - Present):** AI/ML Engineer leading autonomous Agentic RTL code synthesis (FastAPI, Verilator) and 30Hz ROS2 humanoid robotics.
• **Amazon | AWS Bedrock Team (Oct 2024 - Mar 2026):** Machine Learning Associate focusing on data quality, SageMaker automation, LLM observability, and QuickSight operational telemetry.
• **Revature (Jul 2024 - Oct 2024):** Software Engineer Trainee building Java/Spring Boot microservices and high-efficiency SQL backends.
• **Springer Research & Patent (2024):** Published peer-reviewed research on CNN fruit defect classification and filed an academic patent.`,
      suggestions: [
        "⏱️ Current notice period?",
        "🐍 Years of Python experience?",
        "📄 Download Resume",
      ],
    };
  }

  // 5. Compensation / Salary / CTC expectations
  if (
    query.includes("salary") ||
    query.includes("ctc") ||
    query.includes("compensation") ||
    query.includes("package") ||
    query.includes("expected ctc") ||
    query.includes("current ctc")
  ) {
    return {
      text: `Chayan's compensation expectations are **aligned with competitive market rates** for AI/ML Engineer and Generative AI roles, and are **negotiable** based on the company tier, scope of ownership, and overall benefits/equity package.

Feel free to connect directly via email ([chayankumar08@gmail.com](mailto:chayankumar08@gmail.com)) or phone (+91-8299136476) to discuss specific package numbers!`,
      action: {
        type: "email",
        label: "Discuss with Chayan",
        url: `mailto:${CHAYAN_PROFILE.contact.email}`,
      },
      suggestions: [
        "⏱️ Current notice period?",
        "📄 Download Resume",
        "💼 Experience at Amazon AWS",
      ],
    };
  }

  // 6. Why Hire Chayan? / Strengths / Value Proposition
  if (
    query.includes("why hire") ||
    query.includes("why should we hire") ||
    query.includes("why chayan") ||
    query.includes("strengths") ||
    query.includes("hire you")
  ) {
    return {
      text: `Here is why Chayan Kumar is a standout addition to an AI/ML or GenAI Engineering team:

1. **Production Foundation Model Track Record:** Direct enterprise experience at Amazon ensuring data quality and observability for AWS Bedrock generative models.
2. **Autonomous Agentic Innovation:** Proven ability to build closed-loop self-healing code synthesis agents (LLMs + Verilator) at Lyptus Technologies.
3. **Real-Time Hardware & Robotics:** Successfully mapped 30Hz human combat poses onto dual humanoid robots with 9-DOF URDF kinematics using ROS2 and MediaPipe.
4. **Research Rigor:** Peer-reviewed published author in **Springer** and holds an academic patent in computer vision.
5. **Full-Stack ML Execution:** Fluent across the entire lifecycle — from raw data pipelines and PyTorch models to FastAPI backends, Docker containers, and cloud deployment.`,
      suggestions: [
        "⏱️ Current notice period?",
        "📄 Download Resume",
        "📬 Contact Chayan",
      ],
    };
  }

  // 7. Resume / CV Request
  if (
    query.includes("resume") ||
    query.includes("cv") ||
    query.includes("download") ||
    query.includes("pdf")
  ) {
    return {
      text: "📄 You can view and download Chayan Kumar's official resume right here! Click the button below to download the PDF.",
      action: {
        type: "download_resume",
        label: "Download Chayan's Resume (PDF)",
        url: CHAYAN_PROFILE.contact.resume,
      },
      suggestions: [
        "⏱️ Current notice period?",
        "💼 Experience at Amazon AWS",
        "🤖 Projects at Lyptus",
      ],
    };
  }

  // 8. Target Roles / Positions
  if (
    query.includes("target role") ||
    query.includes("roles are you looking") ||
    query.includes("positions are you looking") ||
    query.includes("what role") ||
    query.includes("job role") ||
    query.includes("what are you looking for")
  ) {
    return {
      text: `Chayan is targeting high-impact engineering roles across four key domains:

1. **AI/ML Engineer (Generative AI, LLMs & Agentic Systems):** Building multi-agent workflows, tool-calling pipelines, and foundation model orchestration.
2. **Computer Vision & Deep Learning Engineer:** Training CNN architectures and vision pipelines (proven by his peer-reviewed Springer paper & patent).
3. **Robotics & Kinematics Software Engineer:** Real-time ROS2, MediaPipe pose tracking, and 9-DOF URDF joint kinematics.
4. **Full-Stack Machine Learning Engineer:** Production FastAPI backends, Docker containers, AWS cloud deployment (Bedrock, SageMaker), and CI/CD.`,
      suggestions: [
        "⏱️ Current notice period?",
        "🐍 Years of Python experience?",
        "📄 Download Resume",
      ],
    };
  }

  // 9. Location / Relocation / Remote
  if (
    query.includes("location") ||
    query.includes("relocate") ||
    query.includes("remote") ||
    query.includes("where are you") ||
    query.includes("bangalore") ||
    query.includes("anywhere")
  ) {
    return {
      text: `Chayan is currently based in **Bangalore, India**, and is **open to working anywhere**!

• **Within India:** Open to on-site, hybrid, or relocation to any major tech hub (Bangalore, Hyderabad, Pune, Gurgaon, Mumbai).
• **International:** Open to worldwide relocation with visa sponsorship (US, Europe, Singapore, UAE, etc.).
• **Remote:** Fully equipped for high-performance worldwide remote roles across any timezone.`,
      suggestions: [
        "⏱️ Current notice period?",
        "📬 Contact Chayan",
        "📄 Download Resume",
      ],
    };
  }

  // 9. Amazon AWS Bedrock Experience
  if (
    query.includes("amazon") ||
    query.includes("bedrock") ||
    query.includes("sagemaker") ||
    query.includes("quicksight")
  ) {
    const exp = CHAYAN_PROFILE.experience.find((e) => e.company.includes("Amazon"));
    return {
      text: `💼 **Amazon | AWS Bedrock Team** (${exp?.period})
**Role:** Machine Learning Associate, Bangalore, India

At Amazon, Chayan accelerated AI/ML data quality for **AWS Bedrock generative foundation models**:
• **Data Quality & Refinement:** Engineered Python automation scripts for cross-referencing and dataset optimization in **AWS SageMaker**.
• **LLM Observability:** Standardized best practices for foundation model evaluation metrics, prompt engineering, and output reliability.
• **Enterprise Telemetry:** Built operational analytics dashboards on **AWS QuickSight** for tracking model telemetry and data integrity.`,
      suggestions: [
        "⏱️ Current notice period?",
        "🤖 What did Chayan build at Lyptus?",
        "📄 Download Resume",
      ],
    };
  }

  // 10. Lyptus Technologies (Agentic RTL & ROS2 Robotics)
  if (
    query.includes("lyptus") ||
    query.includes("agentic") ||
    query.includes("robotics") ||
    query.includes("ros2") ||
    query.includes("verilator") ||
    query.includes("pose") ||
    query.includes("mirror") ||
    query.includes("urdf") ||
    query.includes("rviz")
  ) {
    const exp = CHAYAN_PROFILE.experience.find((e) => e.company.includes("Lyptus"));
    return {
      text: `🤖 **Lyptus Technologies** (${exp?.period})
**Role:** AI/ML Engineer, Bangalore, India

Chayan leads cutting-edge Agentic AI and robotics engineering at Lyptus:
• **Autonomous RTL Agentic Workflow:** Built end-to-end multi-agent pipelines (Python, FastAPI) using LLMs (OpenAI, Z.ai) to autonomously synthesize SystemVerilog/RTL code with closed-loop **Verilator self-healing syntax repair**.
• **Real-Time Humanoid Pose Mirroring (30Hz):** Designed an ultra-low-latency kinematic pipeline using **MediaPipe** and **ROS2**, mapping real-time human combat poses to dual humanoid robots with 9-DOF URDF joint models in RViz2.`,
      action: {
        type: "link",
        label: "View Chayan's GitHub",
        url: CHAYAN_PROFILE.contact.github,
      },
      suggestions: [
        "⏱️ Current notice period?",
        "💼 Experience at Amazon",
        "📄 Download Resume",
      ],
    };
  }

  // 11. Springer Research & Academic Patent
  if (
    query.includes("springer") ||
    query.includes("paper") ||
    query.includes("patent") ||
    query.includes("fruit") ||
    query.includes("publication")
  ) {
    return {
      text: `📚 **Peer-Reviewed Research (Springer) & Academic Patent**
• **Title:** *Fruit Quality Detection and Classification using Deep Convolutional Neural Networks*
• **Publisher:** **Springer Nature** (Indexed, Peer-Reviewed 2024)
• **Academic Patent:** Filed for a novel CNN-based agricultural grading and defect classification pipeline.
• **Technical Stack:** Python, TensorFlow, Keras, OpenCV, CNN feature extraction, and automated defect localization.

You can read the published paper directly on Springer's portal!`,
      action: {
        type: "link",
        label: "Read Published Paper on Springer",
        url: CHAYAN_PROFILE.research.link,
      },
      suggestions: [
        "⏱️ Current notice period?",
        "🤖 Tell me about Agentic AI at Lyptus",
        "📄 Download Resume",
      ],
    };
  }

  // 12. Contact & Hiring Info
  if (
    query.includes("contact") ||
    query.includes("hire") ||
    query.includes("email") ||
    query.includes("phone") ||
    query.includes("call") ||
    query.includes("reach") ||
    query.includes("linkedin")
  ) {
    return {
      text: `📬 **Get in Touch with Chayan Kumar:**

• **Email:** [chayankumar08@gmail.com](mailto:chayankumar08@gmail.com)
• **Phone:** [+91-8299136476](tel:+918299136476)
• **Location:** Bangalore, India
• **LinkedIn:** [linkedin.com/in/chayankumar](https://www.linkedin.com/in/chayankumar/)
• **GitHub:** [github.com/Chayanck123](https://github.com/Chayanck123)
• **LeetCode:** [leetcode.com/u/Chayannn](https://leetcode.com/u/Chayannn/)`,
      action: {
        type: "email",
        label: "Send Email to Chayan",
        url: `mailto:${CHAYAN_PROFILE.contact.email}`,
      },
      suggestions: [
        "⏱️ Current notice period?",
        "📄 Download Resume",
        "💼 Amazon Bedrock Experience",
      ],
    };
  }

  // 13. Common Code Request: Binary Search
  if (query.includes("binary search")) {
    return {
      text: `Here is a clean implementation of **Binary Search** in Python with \`O(log n)\` time complexity:

\`\`\`python
def binary_search(arr: list[int], target: int) -> int:
    """Returns index of target if found, else -1"""
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1

# Example usage:
numbers = [2, 4, 7, 10, 15, 23, 42, 55]
print(binary_search(numbers, 23))  # Output: 5
\`\`\`

**Key Takeaways:**
• **Time Complexity:** \`O(log n)\`
• **Space Complexity:** \`O(1)\` iterative`,
      suggestions: ["⏱️ Current notice period?", "🐍 Years of Python experience?", "📄 Download Resume"],
    };
  }

  // 14. Common Code Request: Reverse String / Words
  if (query.includes("reverse") && (query.includes("string") || query.includes("word") || query.includes("sentence"))) {
    return {
      text: `Here are the most Pythonic ways to reverse strings and words:

\`\`\`python
# 1. Reverse entire string via slicing:
text = "Hello World"
reversed_text = text[::-1]  # 'dlroW olleH'

# 2. Reverse order of words in a sentence:
sentence = "AI Engineering at Scale"
reversed_words = " ".join(sentence.split()[::-1])  # 'Scale at Engineering AI'
\`\`\``,
      suggestions: ["⏱️ Current notice period?", "🐍 Years of Python experience?", "📄 Download Resume"],
    };
  }

  // 15. AI/ML Technical Concept: What is RAG?
  if (query.includes("what is rag") || query.includes("retrieval augmented")) {
    return {
      text: `**RAG (Retrieval-Augmented Generation)** is an AI architecture that enhances LLMs by dynamically injecting relevant external knowledge into the prompt context.

### How RAG Works:
1. **Ingestion & Chunking:** Documents are chunked and embedded into a vector database.
2. **Semantic Retrieval:** User query is embedded to retrieve top-$k$ semantically similar chunks via cosine similarity.
3. **Augmented Synthesis:** Retrieved chunks are passed into the LLM context window as factual ground truth.`,
      suggestions: ["🤖 Lyptus Agentic AI", "💼 Amazon Bedrock Experience", "📄 Download Resume"],
    };
  }

  // 16. AI/ML Technical Concept: What is Agentic AI?
  if (query.includes("what is agentic") || query.includes("multi agent") || query.includes("agentic ai")) {
    return {
      text: `**Agentic AI** refers to autonomous systems where LLMs do not just passively answer questions, but actively **plan, reason, call external tools, and self-correct** in pursuit of a complex objective.

### Key Capabilities:
• **Tool Calling & Execution:** Querying databases, running Python scripts, compiling hardware RTL (like Chayan's Verilator repair loops at Lyptus).
• **Reflection & Self-Correction:** Analyzing error logs or failed testbenches and autonomously refactoring code until it passes.
• **State Management:** Maintaining multi-step memory across graph nodes or state machines.`,
      suggestions: ["⏱️ Current notice period?", "🤖 Lyptus Agentic RTL Project", "📄 Download Resume"],
    };
  }

  // 17. General Knowledge: Speed of light
  if (query.includes("speed of light")) {
    return {
      text: `The speed of light in a vacuum is approximately **299,792,458 meters per second** (about **300,000 km/s** or **186,282 miles per second**), denoted as **c** in Einstein's famous equation $E = mc^2$.`,
      suggestions: ["⏱️ Current notice period?", "🐍 Years of Python experience?", "📄 Download Resume"],
    };
  }

  // 18. General Knowledge: Quantum Computing
  if (query.includes("quantum computing")) {
    return {
      text: `**Quantum computing** is a multidisciplinary field comprising aspects of computer science, physics, and mathematics that utilizes quantum mechanics (superposition and entanglement) to solve complex problems much faster than classical computers. Instead of binary bits (0 or 1), it uses **qubits** that can exist in multiple states simultaneously.`,
      suggestions: ["⏱️ Current notice period?", "🤖 Lyptus Agentic AI", "📄 Download Resume"],
    };
  }

  // 19. Casual Joke Request
  if (query.includes("joke") || query.includes("funny") || query.includes("make me laugh")) {
    const jokes = [
      "Why do Python programmers prefer dark mode?\nBecause light attracts bugs! 🐛",
      "A SQL query walks into a bar, walks up to two tables and asks: *'Can I join you?'* 🍻",
      "Why did the neural network break up with the gradient descent?\nBecause it felt their relationship was stagnating in a local minimum! 📉",
    ];
    return {
      text: jokes[Math.floor(Math.random() * jokes.length)],
      suggestions: ["⏱️ Current notice period?", "🐍 Years of Python experience?", "📄 Download Resume"],
    };
  }

  // 19b. Portfolio Projects & Technical Work Overview
  if (
    query.includes("project") ||
    query.includes("what did you build") ||
    query.includes("what have you built") ||
    query.includes("portfolio work") ||
    query.includes("show me your work") ||
    query.includes("show work") ||
    query.includes("show projects")
  ) {
    return {
      text: `Here are Chayan's flagship engineering projects showcased on this portfolio:

1. **Fruit Quality Detection & Classifier:** Peer-reviewed published research in **Springer Nature** & academic patent utilizing deep CNNs (TensorFlow/Keras).
2. **Autonomous RTL Agentic Workflow:** Autonomous agentic pipeline (FastAPI, OpenAI, Z.ai) with self-healing Verilator code repair loops for hardware synthesis at Lyptus.
3. **Real-time Humanoid Pose Mirroring (30Hz):** Real-time kinematics mapping human combat poses onto dual humanoid robots with 9-DOF URDF joint models in RViz2 using ROS2 & MediaPipe.
4. **AWS Bedrock Telemetry & Observability:** Foundation model data quality, SageMaker pipelines, and operational telemetry dashboards at Amazon AWS.
5. **Stock Forecasting & Market Visualizer:** Financial time-series modeling using Python, Pandas, and Scikit-learn.
6. **Revshop Full-Stack E-Commerce:** Enterprise microservices built with Java, Spring Boot, Hibernate, and SQL.
7. **Algorithm & DSA Interactive Visualizer:** Interactive graph pathfinding and sorting algorithm visualizer.

Click the button below to jump straight to the Projects showcase!`,
      action: {
        type: "scroll",
        label: "🚀 Jump to Projects Section",
        url: "#work",
      },
      suggestions: [
        "⏱️ Current notice period?",
        "🤖 Lyptus Robotics & ROS2",
        "📄 Download Resume",
      ],
    };
  }

  // 19c. Career Timeline & Background
  if (
    query.includes("career") ||
    query.includes("timeline") ||
    query.includes("history") ||
    query.includes("work history") ||
    query.includes("journey")
  ) {
    return {
      text: `Chayan Kumar's engineering career path encompasses high-growth tech enterprises, research publication, and robotics startups:

• **Lyptus Technologies (May 2026 - Present):** AI/ML Engineer leading Autonomous RTL Agentic Workflows and 30Hz ROS2 Humanoid Robotics.
• **Amazon | AWS Bedrock Team (Oct 2024 - Mar 2026):** Machine Learning Associate focusing on LLM data quality, SageMaker automation, and operational telemetry.
• **Revature (Jul 2024 - Oct 2024):** Software Engineer Trainee building enterprise Java & Spring Boot microservices.
• **Academic & Research (Class of 2024):** B.Tech in CSE (7.8 CGPA), published in Springer Nature, and academic patent filed.

Click the button below to view the interactive timeline on the site!`,
      action: {
        type: "scroll",
        label: "💼 View Career Timeline",
        url: "#career",
      },
      suggestions: [
        "⏱️ Current notice period?",
        "🐍 Years of Python experience?",
        "📄 Download Resume",
      ],
    };
  }

  // 20. Casual Greetings & Identity
  if (
    query === "hi" ||
    query === "hello" ||
    query === "hey" ||
    query.includes("who are you") ||
    query.includes("what are you") ||
    query.includes("who made you")
  ) {
    return {
      text: "👋 Hello! I am **Chayan AI**, Chayan Kumar's official portfolio copilot. I can answer any question about his **30-day notice period**, **experience at Amazon & Lyptus**, his **Springer research**, his **technical depth in Python/AI**, solve **coding/math problems**, or hand you his **resume**. What would you like to explore?",
      suggestions: [
        "⏱️ Current notice period?",
        "🐍 Years of Python experience?",
        "💼 Amazon Bedrock Experience",
        "📄 Download Resume",
      ],
    };
  }

  // 21. Universal Real-Time LLM Query for ANY other question (with multi-turn context)
  const liveAnswer = await queryLiveLLM(userPrompt, history);
  if (liveAnswer) {
    return {
      text: liveAnswer,
      suggestions: [
        "⏱️ Current notice period?",
        "🐍 Years of Python experience?",
        "📄 Download Chayan's Resume",
      ],
    };
  }

  // 22. Graceful Direct Synthesis Fallback
  return {
    text: `That's a thoughtful question! As Chayan Kumar's portfolio copilot, I am equipped with his full career background (including his **30-day notice period**, **3+ years of Python engineering**, **Amazon AWS Bedrock foundation models**, and **Lyptus Agentic robotics**), as well as general technical and coding knowledge. Feel free to ask any question!`,
    suggestions: [
      "⏱️ Current notice period?",
      "🐍 Years of Python experience?",
      "💼 Amazon Bedrock Experience",
      "📄 Download Resume",
    ],
  };
}
