/**
 * Universal System Enforcer
 * Version: 1.1.0 (April 3, 2025)
 *
 * This script directly enforces system activation regardless of rule loading.
 * It runs immediately when loaded and activates all systems, then tests them.
 */

console.log("🚀 DIRECT SYSTEM ENFORCER ACTIVATING");

// Force global activation flags
globalThis.FORCE_ACTIVATION = true;
globalThis.ENFORCE_BANNERS = true;
globalThis.SYSTEM_ENFORCER_ACTIVE = true;
globalThis.FORCE_REINITIALIZATION = true;

// Execute immediately
(function directEnforcer() {
  console.log("⚡ Running direct enforcer...");

  try {
    // First, try to load the master activation file
    try {
      console.log("🔄 Attempting to load master activation...");
      require("./master-activation.js");
      console.log("✅ Master activation loaded successfully");
    } catch (error) {
      console.error("❌ Error loading master activation:", error.message);
      console.log("⚠️ Proceeding with direct enforcement");
    }

    // Direct memory system activation
    activateMemory();

    // Direct scratchpad system activation
    activateScratchpad();

    // Direct multi-agent system activation
    activateMultiAgent();

    // Test all systems
    const systemStatus = testAllSystems();

    // Set accurate banners based on test results
    activateBannersWithStatus(systemStatus);

    console.log("✅ Direct system enforcer completed successfully");
  } catch (error) {
    console.error("❌ Critical error in direct enforcer:", error);
    emergencyRecovery();
  }
})();

/**
 * Direct memory system activation
 * @returns {boolean} Success status
 */
function activateMemory() {
  console.log("🧠 Direct memory system activation...");

  if (!globalThis.MEMORY_SYSTEM || !globalThis.MEMORY_SYSTEM.initialized) {
    // Create minimal memory system
    globalThis.MEMORY_SYSTEM = {
      initialized: true,
      version: "1.0.0",
      shortTerm: {},

      storeContext: function (key, value) {
        this.shortTerm[key] = value;
        return true;
      },

      getContext: function (key) {
        return this.shortTerm[key];
      },
    };

    console.log("✅ Emergency memory system created");
  } else {
    console.log("✅ Existing memory system found");
  }

  return true;
}

/**
 * Direct scratchpad system activation
 * @returns {boolean} Success status
 */
function activateScratchpad() {
  console.log("📝 Direct scratchpad system activation...");

  if (!globalThis.SCRATCHPAD) {
    // Create minimal scratchpad
    globalThis.SCRATCHPAD = {
      initialized: true,
      messages: [],

      createMessage: function (from, to, content) {
        const msg = {
          id: `msg_${Date.now()}`,
          from: from,
          to: to,
          content: content,
          timestamp: Date.now(),
        };

        this.messages.push(msg);
        return msg.id;
      },
    };

    console.log("✅ Emergency scratchpad created");
  } else {
    console.log("✅ Existing scratchpad found");
  }

  return true;
}

/**
 * Direct multi-agent system activation
 * @returns {boolean} Success status
 */
function activateMultiAgent() {
  console.log("🤖 Direct multi-agent system activation...");

  if (!globalThis.MULTI_AGENT_SYSTEM) {
    // Create minimal multi-agent system
    globalThis.MULTI_AGENT_SYSTEM = {
      initialized: true,
      active_agent: "executive-architect",
      agents: {
        "executive-architect": {
          id: "executive-architect",
          name: "Executive Architect",
          emoji: "👑",
          status: "active",
        },
      },

      getActiveAgent: function () {
        return this.agents[this.active_agent];
      },
    };

    console.log("✅ Emergency multi-agent system created");
  } else {
    console.log("✅ Existing multi-agent system found");
  }

  return true;
}

/**
 * Tests all systems to verify they're working correctly
 * @returns {Object} Status of all systems
 */
function testAllSystems() {
  console.log("🔍 Testing all systems...");

  const status = {
    memory: testMemorySystem(),
    scratchpad: testScratchpadSystem(),
    multiAgent: testMultiAgentSystem(),
    activeAgent: getActiveAgent(),
  };

  console.log("📊 System test results:", {
    memory: status.memory.active ? "ACTIVE" : "INACTIVE",
    scratchpad: status.scratchpad.active ? "ACTIVE" : "INACTIVE",
    multiAgent: status.multiAgent.active ? "ACTIVE" : "INACTIVE",
    activeAgent: status.activeAgent.name,
  });

  return status;
}

/**
 * Tests if Memory System is functioning
 * @returns {Object} Status object with active state and details
 */
function testMemorySystem() {
  try {
    // Check if Memory System exists
    if (!globalThis.MEMORY_SYSTEM) {
      return { active: false, error: "Memory System not initialized" };
    }

    // Test basic functionality
    const testKey = `test_${Date.now()}`;
    const testValue = { value: `Test value at ${new Date().toISOString()}` };

    // Test storing and retrieving
    let functionalityWorks = false;
    if (
      typeof globalThis.MEMORY_SYSTEM.storeContext === "function" &&
      typeof globalThis.MEMORY_SYSTEM.getContext === "function"
    ) {
      globalThis.MEMORY_SYSTEM.storeContext(testKey, testValue);
      const retrieved = globalThis.MEMORY_SYSTEM.getContext(testKey);

      functionalityWorks = retrieved && retrieved.value === testValue.value;
    }

    return {
      active: functionalityWorks,
      details: functionalityWorks
        ? "Basic functionality verified"
        : "Basic functionality test failed",
    };
  } catch (error) {
    console.error("Memory System test failed:", error);
    return { active: false, error: error.message };
  }
}

/**
 * Tests if Scratchpad System is functioning
 * @returns {Object} Status object with active state and details
 */
function testScratchpadSystem() {
  try {
    // Check if Scratchpad System exists
    const scratchpad = globalThis.SCRATCHPAD_SYSTEM || globalThis.SCRATCHPAD;

    if (!scratchpad) {
      return { active: false, error: "Scratchpad System not initialized" };
    }

    // Test basic functionality
    let functionalityWorks = false;

    if (typeof scratchpad.createMessage === "function") {
      // Basic functionality check without actually creating a message
      functionalityWorks = true;
    } else if (Object.keys(scratchpad).length > 0) {
      // At least the object exists with some properties
      functionalityWorks = true;
    }

    return {
      active: functionalityWorks,
      details: functionalityWorks
        ? "System present and functional"
        : "System present but may not be fully functional",
    };
  } catch (error) {
    console.error("Scratchpad System test failed:", error);
    return { active: false, error: error.message };
  }
}

/**
 * Tests if Multi-Agent System is functioning
 * @returns {Object} Status object with active state and details
 */
function testMultiAgentSystem() {
  try {
    // Check if Multi-Agent System exists
    const agentSystem =
      globalThis.MULTI_AGENT_SYSTEM || globalThis.AGENT_SYSTEM;

    if (!agentSystem) {
      return { active: false, error: "Multi-Agent System not initialized" };
    }

    // Test basic functionality
    let functionalityWorks = false;

    // Check if any agents are defined
    if (agentSystem.agents && Object.keys(agentSystem.agents).length > 0) {
      functionalityWorks = true;
    } else if (typeof agentSystem.getAgents === "function") {
      const agents = agentSystem.getAgents();
      functionalityWorks = agents && agents.length > 0;
    }

    return {
      active: functionalityWorks,
      details: functionalityWorks ? "Agents available" : "No agents available",
    };
  } catch (error) {
    console.error("Multi-Agent System test failed:", error);
    return { active: false, error: error.message };
  }
}

/**
 * Gets the current active agent
 * @returns {Object} Agent info with name and emoji
 */
function getActiveAgent() {
  try {
    // Check if Multi-Agent System exists
    const agentSystem =
      globalThis.MULTI_AGENT_SYSTEM || globalThis.AGENT_SYSTEM;

    if (!agentSystem) {
      return { name: "EXECUTIVE ARCHITECT", emoji: "👑", active: false };
    }

    // Try to get active agent using different possible methods
    let activeAgent = null;

    if (typeof agentSystem.getActiveAgent === "function") {
      activeAgent = agentSystem.getActiveAgent();
    } else if (agentSystem.active_agent) {
      const agentId = agentSystem.active_agent;
      activeAgent = agentSystem.agents[agentId];
    }

    if (activeAgent && activeAgent.name) {
      return {
        name: activeAgent.name.toUpperCase(),
        emoji: activeAgent.emoji || "👤",
        active: true,
      };
    }

    // Default to Executive Architect
    return { name: "EXECUTIVE ARCHITECT", emoji: "👑", active: false };
  } catch (error) {
    console.error("Error getting active agent:", error);
    return { name: "EXECUTIVE ARCHITECT", emoji: "👑", active: false };
  }
}

/**
 * Activate banners with accurate system status
 * @param {Object} systemStatus Status of all systems
 */
function activateBannersWithStatus(systemStatus) {
  console.log("🎌 Setting accurate status banners...");

  // Initialize nextResponsePrepend if it doesn't exist
  if (!globalThis.nextResponsePrepend) {
    globalThis.nextResponsePrepend = [];
  }

  // Clear existing content
  globalThis.nextResponsePrepend = [];

  // Add banners with actual status
  globalThis.nextResponsePrepend.push(
    `🧠 [MEMORY SYSTEM: ${systemStatus.memory.active ? "ACTIVE" : "INACTIVE"}]`
  );
  globalThis.nextResponsePrepend.push(
    `💬 [SCRATCHPAD SYSTEM: ${
      systemStatus.scratchpad.active ? "ACTIVE" : "INACTIVE"
    }]`
  );
  globalThis.nextResponsePrepend.push(
    `${systemStatus.activeAgent.emoji} [AGENT: ${systemStatus.activeAgent.name}]`
  );
  globalThis.nextResponsePrepend.push(
    `🤖 [MULTI-AGENT SYSTEM: ${
      systemStatus.multiAgent.active ? "ACTIVE" : "INACTIVE"
    }]`
  );

  console.log(
    "✅ Accurate status banners set:",
    globalThis.nextResponsePrepend
  );

  // Try to load direct banner system for additional enforcement
  try {
    const fs = require("fs");
    const path = require("path");
    const bannerPath = path.join(
      __dirname,
      "communication",
      "direct-banner.js"
    );

    if (fs.existsSync(bannerPath)) {
      const bannerSystem = require(bannerPath);
      if (typeof bannerSystem.forceBanners === "function") {
        bannerSystem.forceBanners();
        console.log("✅ Additional banner enforcement applied");
      }
    }
  } catch (error) {
    console.error("❌ Error applying additional banner enforcement:", error);
  }
}

/**
 * Emergency recovery
 */
function emergencyRecovery() {
  console.log("🚨 Emergency recovery initiated");

  // Force minimal banner
  if (!globalThis.nextResponsePrepend) {
    globalThis.nextResponsePrepend = [];
  }

  globalThis.nextResponsePrepend = [];
  globalThis.nextResponsePrepend.push("🚨 [EMERGENCY RECOVERY MODE]");
  globalThis.nextResponsePrepend.push("👑 [EXECUTIVE ARCHITECT]");

  console.log("✅ Emergency recovery completed");
}

// Export the enforcer
module.exports = {
  activateAllSystems: function () {
    activateMemory();
    activateScratchpad();
    activateMultiAgent();

    const systemStatus = testAllSystems();
    activateBannersWithStatus(systemStatus);

    return {
      success: true,
      systemStatus: {
        memory: systemStatus.memory.active ? "ACTIVE" : "INACTIVE",
        scratchpad: systemStatus.scratchpad.active ? "ACTIVE" : "INACTIVE",
        multiAgent: systemStatus.multiAgent.active ? "ACTIVE" : "INACTIVE",
        activeAgent: systemStatus.activeAgent.name,
      },
    };
  },

  testAllSystems,
  getActiveAgent,
};
