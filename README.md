# Cursor Systems

<div align="center">
  <p><em>A portable multi-agent system architecture with memory persistence and inter-agent communication</em></p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Version](https://img.shields.io/badge/Version-1.0.0-green.svg)](https://github.com/user/cursor-systems)
</div>

## 📚 Overview

Cursor Systems is a sophisticated multi-agent architecture designed to enhance AI assistants with persistent memory, inter-agent communication, and specialized agent capabilities. The system enables AI assistants to maintain context across conversations, collaborate through multiple specialized personas, and leverage a structured communication system for coordinated problem-solving.

### 🌟 Key Features

- **Multi-Agent Architecture**: Coordinate multiple specialized AI agents with distinct roles and capabilities
- **Persistent Memory**: Store and recall information across conversations using SQLite-powered memory systems
- **Inter-Agent Communication**: Enable seamless collaboration through a structured scratchpad system
- **Visual Status Confirmation**: Track active systems and agents through an integrated banner system
- **Modular Design**: Easily extensible with new agents, capabilities, and integrations

## 🤖 Agent Specializations

The system includes seven specialized agents, each focused on specific domains:

| Agent                        | Symbol | Domain Expertise                            |
| ---------------------------- | ------ | ------------------------------------------- |
| **Executive Architect**      | 👑     | Leadership, planning, and coordination      |
| **Frontend Developer**       | 🎨     | UI/UX implementation and frontend coding    |
| **Backend Developer**        | 🔧     | Server-side architecture and implementation |
| **Full-Stack Integrator**    | 🔄     | Cross-system implementation and integration |
| **CMS Specialist**           | 📄     | Content management systems expertise        |
| **Data Engineer**            | 📊     | Data pipelines and infrastructure           |
| **Documentation Specialist** | 📚     | Comprehensive documentation creation        |

## 🧠 System Architecture

The architecture consists of four primary subsystems:

### 1. Multi-Agent System

Manages agent selection, switching, and coordination between specialized personas.

### 2. Memory System

Provides persistent storage across three memory types:

- **Short-term Memory**: Context variables for immediate access
- **Episodic Memory**: Conversation history and interaction records
- **Semantic Memory**: Structured knowledge in categorized storage

### 3. Scratchpad System

Enables structured communication between agents through:

- Message passing with read/unread status tracking
- Task creation, assignment, and status updates
- Shared workspace variables for collaborative state
- Agent registration and capability advertising

### 4. Banner System

Provides visual feedback on active systems and current agent.

## 🛠️ Installation

### Prerequisites

- Node.js (v14.0.0+)
- NPM or Yarn package manager

### Setup Process

1. Clone the repository:

```bash
git clone https://github.com/user/cursor-systems.git
```

2. Install dependencies:

```bash
cd cursor-systems/.cursor
npm install
```

3. Alternatively, integrate with your project:

```bash
# Copy the .cursor directory to your project
cp -r /path/to/cursor-systems/.cursor /path/to/your/project/

# Install dependencies in your project's .cursor directory
cd /path/to/your/project/.cursor
npm install
```

## 🚀 Usage

### Integrated Custom Instructions

The system automatically generates custom instructions for AI assistants:

1. Generate the instructions:

```bash
cd .cursor
node communication/custom_instructions.js
```

2. The instructions will be saved to `.cursor/custom_instructions.json`

3. Copy the content and paste it into your AI assistant's custom instructions settings

### Agent Switching

Switch between specialized agents naturally in conversations:

```
"Switch to the Frontend Developer agent for this UI work"
"I need the Documentation Specialist to help with API docs"
"Let's use the Backend Developer for database design"
```

### System APIs

#### Multi-Agent System

```javascript
// Get the current active agent
const activeAgent = MULTI_AGENT_SYSTEM.getActiveAgent();

// Switch to a different agent
MULTI_AGENT_SYSTEM.switchToAgent("frontend-developer");

// Get all available agents
const allAgents = MULTI_AGENT_SYSTEM.getAllAgents();
```

#### Memory System

```javascript
// Store and retrieve context
MEMORY_SYSTEM.storeContext("current_project", "E-commerce Platform");
const project = MEMORY_SYSTEM.getContext("current_project");

// Store episodic memory
MEMORY_SYSTEM.storeEpisode("user_request", "Feature request discussion", {
  importance: 2,
  metadata: { category: "requirements" },
});

// Retrieve semantic knowledge
const apiDocs = MEMORY_SYSTEM.getKnowledge("documentation", "api_endpoints");
```

#### Scratchpad System

```javascript
// Send message between agents
SCRATCHPAD.createMessage(
  "executive-architect",
  "frontend-developer",
  "Please implement the dashboard UI based on the wireframes"
);

// Create a task for another agent
SCRATCHPAD.createTask("Implement API authentication", "backend-developer", {
  priority: 8,
  details: "Use JWT for stateless authentication",
});

// Read messages sent to an agent
const messages = SCRATCHPAD.readMessages("frontend-developer", {
  onlyUnread: true,
  limit: 5,
});
```

## 📁 Project Structure

```
.cursor/
├── agents/                 # Agent implementations
│   ├── multi-agent-system.js  # Core agent controller
│   ├── executive-architect.js # Leadership agent
│   ├── frontend-developer.js  # UI/UX specialist
│   └── ...                 # Other specialized agents
├── communication/          # Communication systems
│   ├── activate.js         # System activation
│   ├── direct-banner.js    # Banner management
│   └── custom_instructions.js  # Instructions generator
├── db/                     # Database components
│   ├── memory-system.js    # SQLite memory implementation
│   └── scratchpad-system.js # Communication storage
├── memory-hooks/           # Memory interaction components
│   ├── conversation-capture.js # Message recording
│   ├── context-retrieval.js    # Context access
│   └── auto-memory-system.js   # Automatic memory integration
├── systems/                # Core system implementations
│   ├── memory-system.js    # Memory system implementation
│   ├── memory-initializer.js # Memory system bootstrapper
│   ├── multi-agent-system.js # Agent coordination system
│   └── scratchpad-system.js  # Inter-agent communication
├── rules/                  # Agent behavior definitions
├── package.json            # Dependencies
└── README.md               # This documentation
```

## 🧪 Testing

Verify system functionality with the included test scripts:

```bash
# Test the memory system
node .cursor/check-memory.js

# Test the scratchpad system
node .cursor/check-scratchpad.js

# Test agent switching
node .cursor/check-agent.js

# Test banner displays
node .cursor/test-banner-system.js

# Fix system banners if needed
node .cursor/fix-banners.js
```

## 🔧 Customization

### Adding a New Agent

1. Create a new agent implementation file in `.cursor/agents/`:

```javascript
// .cursor/agents/security-specialist.js
module.exports = {
  name: "Security Specialist",
  emoji: "🔒",
  description: "Security implementation and auditing",
  activate: function () {
    console.log("🔒 Security Specialist activated");
    // Agent initialization code
  },
};
```

2. Register the agent in `.cursor/agents/multi-agent-system.js`

### Extending Memory Capabilities

Modify `.cursor/db/memory-system.js` to add new memory types or enhance existing ones.

## 📝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- The Claude AI team for assistance in developing the architecture
- The Cursor team for their excellent IDE
- All contributors to this project

---

<div align="center">
  <p>Built with ❤️ by the Cursor Systems team</p>
</div>
