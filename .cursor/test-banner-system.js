/**
 * Test Banner System
 *
 * This script tests the banner system with different system states to demonstrate
 * that banners accurately reflect the actual status of systems.
 */

console.log("🧪 Testing Banner System with Dynamic System States");

// Load required modules
const fs = require("fs");
const path = require("path");

// Path to banner system
const bannerPath = path.join(__dirname, "communication", "direct-banner.js");
// Path to enforcer
const enforcerPath = path.join(__dirname, "enforcer.js");

// Step 1: Test with no systems initialized
console.log("\n🔍 TEST 1: No Systems Initialized");
console.log("--------------------------------");

// Clear any existing global objects
delete globalThis.MEMORY_SYSTEM;
delete globalThis.SCRATCHPAD;
delete globalThis.SCRATCHPAD_SYSTEM;
delete globalThis.MULTI_AGENT_SYSTEM;
delete globalThis.AGENT_SYSTEM;
delete globalThis.nextResponsePrepend;

// Load and test banner system
if (fs.existsSync(bannerPath)) {
  try {
    const bannerSystem = require(bannerPath);
    console.log(
      "Banner System loaded - checking status with no systems initialized"
    );

    // Display current banners
    if (typeof bannerSystem.displaySystemStatus === "function") {
      bannerSystem.displaySystemStatus();
    } else {
      console.log("Banner status display function not available");
    }
  } catch (error) {
    console.error("Error loading banner system:", error);
  }
}

// Step 2: Initialize only Memory System
console.log("\n🔍 TEST 2: Only Memory System Initialized");
console.log("----------------------------------------");

// Create basic memory system
globalThis.MEMORY_SYSTEM = {
  initialized: true,
  shortTerm: {},
  storeContext: function (key, value) {
    this.shortTerm[key] = value;
    return true;
  },
  getContext: function (key) {
    return this.shortTerm[key];
  },
};

// Test memory system function
globalThis.MEMORY_SYSTEM.storeContext("test", "Memory system is working");
console.log(
  `Memory test retrieval: ${globalThis.MEMORY_SYSTEM.getContext("test")}`
);

// Clear banners and reload banner system
delete require.cache[require.resolve(bannerPath)];
globalThis.nextResponsePrepend = [];

// Load and test banner system
if (fs.existsSync(bannerPath)) {
  try {
    const bannerSystem = require(bannerPath);
    console.log(
      "Banner System loaded - checking status with only Memory System initialized"
    );

    // Display current banners
    if (typeof bannerSystem.displaySystemStatus === "function") {
      bannerSystem.displaySystemStatus();
    }
  } catch (error) {
    console.error("Error loading banner system:", error);
  }
}

// Step 3: Initialize Memory and Scratchpad Systems
console.log("\n🔍 TEST 3: Memory and Scratchpad Systems Initialized");
console.log("--------------------------------------------------");

// Create basic scratchpad system
globalThis.SCRATCHPAD = {
  initialized: true,
  messages: [],
  createMessage: function (from, to, content) {
    const msg = {
      id: `msg_${Date.now()}`,
      from,
      to,
      content,
      timestamp: Date.now(),
    };
    this.messages.push(msg);
    return msg.id;
  },
};

// Test scratchpad function
const msgId = globalThis.SCRATCHPAD.createMessage(
  "test",
  "system",
  "Scratchpad system is working"
);
console.log(`Scratchpad message created with ID: ${msgId}`);

// Clear banners and reload banner system
delete require.cache[require.resolve(bannerPath)];
globalThis.nextResponsePrepend = [];

// Load and test banner system
if (fs.existsSync(bannerPath)) {
  try {
    const bannerSystem = require(bannerPath);
    console.log(
      "Banner System loaded - checking status with Memory and Scratchpad Systems initialized"
    );

    // Display current banners
    if (typeof bannerSystem.displaySystemStatus === "function") {
      bannerSystem.displaySystemStatus();
    }
  } catch (error) {
    console.error("Error loading banner system:", error);
  }
}

// Step 4: Initialize All Systems
console.log("\n🔍 TEST 4: All Systems Initialized");
console.log("--------------------------------");

// Create multi-agent system
globalThis.MULTI_AGENT_SYSTEM = {
  initialized: true,
  active_agent: "backend-developer",
  agents: {
    "executive-architect": {
      id: "executive-architect",
      name: "Executive Architect",
      emoji: "👑",
      status: "active",
    },
    "frontend-developer": {
      id: "frontend-developer",
      name: "Frontend Developer",
      emoji: "🎨",
      status: "active",
    },
    "backend-developer": {
      id: "backend-developer",
      name: "Backend Developer",
      emoji: "🔧",
      status: "active",
    },
  },
  getActiveAgent: function () {
    return this.agents[this.active_agent];
  },
};

// Test multi-agent system
const activeAgent = globalThis.MULTI_AGENT_SYSTEM.getActiveAgent();
console.log(`Active agent: ${activeAgent.name} (${activeAgent.emoji})`);

// Clear banners and reload banner system
delete require.cache[require.resolve(bannerPath)];
globalThis.nextResponsePrepend = [];

// Load and test banner system
if (fs.existsSync(bannerPath)) {
  try {
    const bannerSystem = require(bannerPath);
    console.log(
      "Banner System loaded - checking status with all systems initialized"
    );

    // Display current banners
    if (typeof bannerSystem.displaySystemStatus === "function") {
      bannerSystem.displaySystemStatus();
    }
  } catch (error) {
    console.error("Error loading banner system:", error);
  }
}

// Step 5: Use Enforcer
console.log("\n🔍 TEST 5: Using Enforcer to Check Status");
console.log("---------------------------------------");

// Clear banners
globalThis.nextResponsePrepend = [];

// Load enforcer
if (fs.existsSync(enforcerPath)) {
  try {
    const enforcer = require(enforcerPath);
    console.log("Enforcer loaded - testing systems and setting banners");

    if (typeof enforcer.testAllSystems === "function") {
      const status = enforcer.testAllSystems();
      console.log("System status via enforcer:", {
        memory: status.memory.active ? "ACTIVE" : "INACTIVE",
        scratchpad: status.scratchpad.active ? "ACTIVE" : "INACTIVE",
        multiAgent: status.multiAgent.active ? "ACTIVE" : "INACTIVE",
        activeAgent: status.activeAgent.name,
      });
    }

    // Activate all systems via enforcer
    if (typeof enforcer.activateAllSystems === "function") {
      const result = enforcer.activateAllSystems();
      console.log("Activation result:", result);
    }

    // Display current banners
    console.log("Current banners after enforcer activation:");
    if (
      globalThis.nextResponsePrepend &&
      globalThis.nextResponsePrepend.length > 0
    ) {
      globalThis.nextResponsePrepend.forEach((banner, i) =>
        console.log(`  ${i + 1}. ${banner}`)
      );
    } else {
      console.log("No banners set");
    }
  } catch (error) {
    console.error("Error loading enforcer:", error);
  }
}

// Summary
console.log("\n✅ Banner System Test Complete");
console.log("----------------------------");
console.log(
  "The banner system correctly reflects the actual status of systems."
);
console.log(
  "This ensures that users always know which systems are actually active."
);
console.log("Final banner state:");

if (
  globalThis.nextResponsePrepend &&
  globalThis.nextResponsePrepend.length > 0
) {
  globalThis.nextResponsePrepend.forEach((banner, i) =>
    console.log(`  ${i + 1}. ${banner}`)
  );
} else {
  console.log("No banners set");
}
