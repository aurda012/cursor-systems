# Cursor Systems

A portable multi-agent system with memory and scratchpad capabilities for AI assistants.

## Features

- **Multi-Agent System**: Coordinate multiple AI agents with specialized roles
  - Executive Architect (👑): Leadership, planning, and coordination
  - Frontend Developer (🎨): UI/UX implementation and frontend code
  - Backend Developer (🔧): Server-side architecture and implementation
  - Full-Stack Integrator (🔄): Cross-system implementation and integration
  - CMS Specialist (📄): Content management systems expertise
  - Data Engineer (📊): Data pipelines and infrastructure
  - Documentation Specialist (📚): Comprehensive documentation
- **Memory System**: Persistent memory across conversations with SQLite storage
  - Short-term memory for context variables
  - Episodic memory for conversation history
  - Semantic memory for structured knowledge
- **Scratchpad System**: Structured communication between agents
  - Message passing between agents
  - Thread management for conversations
  - Task tracking and assignment
  - Workspace variables for shared state
- **Banner System**: Visual confirmation of active systems

## Installation

Simply copy the `.cursor` directory to your project root:

```bash
cp -r /path/to/cursor-systems/.cursor /path/to/your/project/
```

Then, install the local dependencies:

```bash
cd /path/to/your/project/.cursor
npm install
```

## Usage

The system will be automatically loaded and initialized when using Cursor AI with custom instructions. The system banners will be displayed at the start of every AI response to confirm that the systems are active.

### Working with the Multi-Agent System

By default, the **Executive Architect** agent will be activated. You can switch to a different agent using natural language:

- "Switch to the Frontend Developer agent"
- "I need help with UI design, can you switch to the Frontend Developer?"
- "Let's use the Backend Developer for this database work"

Each agent has specific capabilities:

- **Executive Architect**: Project planning, architecture design, and task delegation
- **Frontend Developer**: React components, CSS styling, responsive layouts
- **Backend Developer**: API design, database schema, server-side logic
- **Full-Stack Integrator**: System integration, testing, deployment
- **CMS Specialist**: Content modeling, CMS configuration, content workflows
- **Data Engineer**: Data pipelines, ETL processes, analytics
- **Documentation Specialist**: Technical writing, API docs, user guides

### Custom Instructions

When using this system, it automatically generates custom instructions that you can paste into your Cursor AI settings:

1. Run the custom instructions generator:

```bash
cd /path/to/your/project/.cursor
node communication/custom_instructions.js
```

2. The instructions will be saved to `.cursor/custom_instructions.json`

3. Copy the content of this file and paste it into Cursor AI's custom instructions settings

## System Structure

- **`.cursor/agents/`**: Multi-agent system implementation
  - `multi-agent-system.js`: Core agent controller
  - `executive-architect.js`: Executive Architect agent
  - `frontend-developer.js`: Frontend Developer agent
  - (and other agent implementations)
- **`.cursor/db/`**: Database handlers
  - `memory-system.js`: Memory system database
  - `scratchpad-system.js`: Scratchpad system database
- **`.cursor/communication/`**: Communication systems
  - `activate.js`: Main activation script
  - `banner_auto.js`: Automatic banner display
  - `direct-banner.js`: Direct banner manipulation
  - `custom_instructions.js`: Custom instructions generator
- **`.cursor/node_modules/`**: Local dependencies

## APIs

### Multi-Agent System

```javascript
// Get the active agent
const activeAgent = MULTI_AGENT_SYSTEM.getActiveAgent();

// Switch to a different agent
MULTI_AGENT_SYSTEM.switchToAgent("frontend-developer");

// Find the best agent for a task
const bestAgent = MULTI_AGENT_SYSTEM.findBestAgentForTask(
  "Create a responsive layout",
  ["responsive-design", "css", "ui"]
);

// Get all available agents
const allAgents = MULTI_AGENT_SYSTEM.getAllAgents();
```

### Memory System

```javascript
// Store context variable
MEMORY_SYSTEM.storeContext(key, value, options);

// Retrieve context variable
const value = MEMORY_SYSTEM.getContext(key);

// Store episodic memory
const episodeId = MEMORY_SYSTEM.storeEpisode(content, options);

// Search episodic memories
const episodes = MEMORY_SYSTEM.searchEpisodes(query, options);

// Store semantic knowledge
const knowledgeId = MEMORY_SYSTEM.storeKnowledge(
  category,
  topic,
  content,
  options
);

// Retrieve semantic knowledge
const knowledge = MEMORY_SYSTEM.getKnowledge(category, topic);
```

### Scratchpad System

```javascript
// Create a thread
const threadId = SCRATCHPAD.createThread(title, creatorId);

// Create a message
const messageId = SCRATCHPAD.createMessage(
  fromAgent,
  toAgent,
  content,
  options
);

// Read messages for an agent
const messages = SCRATCHPAD.readMessages(agentId, options);

// Create a task
const taskId = SCRATCHPAD.createTask(description, assignedTo, options);

// Set workspace variable
SCRATCHPAD.setVariable(key, value, options);

// Get workspace variable
const value = SCRATCHPAD.getVariable(key);
```

## Testing

Run the test scripts to verify system operation:

```bash
# Test the banner system and basic functionality
cd /path/to/your/project/.cursor
node test-banners.js

# Test the multi-agent system
node test-agents.js
```

## Customization

You can customize the system by modifying the following files:

- `.cursor/communication/banner_auto.js`: Customize banner messages
- `.cursor/communication/custom_instructions.js`: Customize AI instructions
- `.cursor/agents/`: Add or modify agent implementations

## License

MIT
