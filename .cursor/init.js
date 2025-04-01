console.log("--- init.js executing ---");

/**
 * Automatic Initialization Script
 * This script automatically loads and activates the systems
 * at the start of every new chat session.
 */

// Cursor System Initialization
// Version: 3.0.0 (March 31, 2025)
// This file serves as an entry point for cursor system initialization

console.log("🔄 CURSOR INIT: System initialization starting...");

try {
  // Import required modules
  const path = require("path");
  const fs = require("fs");

  // Load the master activation script
  const masterActivationPath = path.join(__dirname, "master-activation.js");

  if (fs.existsSync(masterActivationPath)) {
    console.log("🔍 CURSOR INIT: Found master activation script, loading...");

    // Clear require cache to ensure fresh load
    if (require.cache[require.resolve(masterActivationPath)]) {
      delete require.cache[require.resolve(masterActivationPath)];
    }

    // Load the master activation script
    require(masterActivationPath);
    console.log("✅ CURSOR INIT: Master activation script loaded successfully");
  } else {
    console.warn(
      "⚠️ CURSOR INIT: Master activation script not found, using fallback initialization"
    );

    // Fallback initialization
    // Set system flag
    global.SYSTEM = global.SYSTEM || {};
    global.SYSTEM.systemInitialized = true;

    // Basic banner injection
    if (typeof global.nextResponsePrepend === "undefined") {
      global.nextResponsePrepend = [];
    }

    // Get project name
    const PROJECT_NAME = path.basename(process.cwd());

    global.nextResponsePrepend.push(
      `🤖 [${PROJECT_NAME} MULTI-AGENT SYSTEM: ACTIVE (INIT FALLBACK)]`
    );

    console.log("✅ CURSOR INIT: Fallback initialization complete");
  }
} catch (error) {
  console.error("❌ CURSOR INIT: Error during initialization:", error);

  // Emergency fallback
  try {
    global.SYSTEM = global.SYSTEM || {};
    global.SYSTEM.systemInitialized = true;
    global.nextResponsePrepend = global.nextResponsePrepend || [];
    global.nextResponsePrepend.push("🚨 [EMERGENCY ACTIVATION]");
  } catch (e) {
    // Nothing more we can do
  }
}

console.log("🏁 CURSOR INIT: Initialization process complete");

// Dynamically get project name from current directory
const PROJECT_NAME = path.basename(process.cwd());

console.log(`🔄 ${PROJECT_NAME} Auto-Initialization Starting...`);

// CRITICAL: Set a global flag to force activation in all responses
globalThis.FORCE_ACTIVATION = true;
globalThis.PROJECT_NAME = PROJECT_NAME;

try {
  // Centralize activation via the launcher if possible
  try {
    console.log("Attempting initialization via launcher.js...");
    // Use dynamic path for better reliability
    const launcherPath = path.join(
      process.cwd(),
      ".cursor/communication/launcher.js"
    );
    const fs = require("fs");

    if (fs.existsSync(launcherPath)) {
      // Clear cache first to ensure fresh loading
      if (require.cache[require.resolve(launcherPath)]) {
        delete require.cache[require.resolve(launcherPath)];
      }
      const launcher = require(launcherPath);
      if (launcher && typeof launcher.initializeAllSystems === "function") {
        // Force reinitialization via the flag (true)
        launcher
          .initializeAllSystems(true)
          .then((result) =>
            console.log("Launcher initialization result:", result)
          )
          .catch((error) =>
            console.error("Launcher error during init:", error)
          );
      } else {
        console.error(
          "Launcher loaded but missing initializeAllSystems function during init."
        );
        // Optionally try activate.js as a fallback ONLY if launcher fails
        // require('./communication/activate.js');
      }
    } else {
      console.error(
        `Launcher not found at: ${launcherPath}. Consider activate.js fallback.`
      );
      // Optionally try activate.js as a fallback ONLY if launcher fails
      // require('./communication/activate.js');
    }
  } catch (launcherError) {
    console.error(
      "Error during launcher activation in init.js:",
      launcherError
    );
    // Optionally try activate.js as a fallback
    // require('./communication/activate.js');
  }

  // Verify systems are active after attempts
  if (globalThis.SYSTEM && globalThis.SYSTEM.systemInitialized) {
    console.log(
      `✅ ${PROJECT_NAME} systems successfully activated via init.js`
    );

    // Log active components status
    const components = [
      { name: "Memory System", obj: globalThis.MEMORY_SYSTEM },
      { name: "Agent System", obj: globalThis.AGENT_SYSTEM },
      { name: "MCP Server", obj: globalThis.MCP_SERVER },
      { name: "Scratchpad", obj: globalThis.SCRATCHPAD },
      { name: "Date System", obj: globalThis.DATE_SYSTEM }, // Added Date System check
    ];

    components.forEach((component) => {
      console.log(
        `- ${component.name}: ${component.obj ? "Active" : "Inactive"}`
      );
    });
  } else {
    console.error(
      "❌ ERROR: Systems failed to activate after init.js attempts."
    );

    // Emergency fallback (Minimal - Banner system should handle display)
    console.log("Attempting emergency fallback activation in init.js...");
    globalThis.SYSTEM = {
      systemInitialized: true,
      projectName: PROJECT_NAME,
      emergency: true,
    };
    // Create minimal stubs if absolutely necessary, but prefer activation logic handles this
    if (!globalThis.MEMORY_SYSTEM)
      globalThis.MEMORY_SYSTEM = { initialized: false };
    if (!globalThis.SCRATCHPAD) globalThis.SCRATCHPAD = { initialized: false };
    if (!globalThis.AGENT_SYSTEM)
      globalThis.AGENT_SYSTEM = { initialized: false };
    console.log("Emergency fallback systems created in init.js.");
    // NOTE: Banner adding is removed - rely on banner_auto.js
  }

  // REMOVED setInterval logic - hooks make this redundant
} catch (err) {
  console.error(
    `❌ ERROR: Failed to initialize systems via init.js:`,
    err.message
  );
  // NOTE: Banner adding is removed - rely on banner_auto.js
}

// REMOVED banner display logic from init.js - rely on banner_auto.js
// REMOVED SYSTEM_BANNERS logic - rely on banner_auto.js
// REMOVED nextResponsePrepend logic - rely on banner_auto.js
// REMOVED explicit loading of banner_auto.js here - hook handles it.

console.log(`✅ ${PROJECT_NAME} Auto-Initialization Script Completed.`);

/**
 * Cursor Systems Initialization
 *
 * This script initializes all required systems including the
 * memory system with automatic capabilities.
 *
 * @version 1.0.0
 */

const path = require("path");
const fs = require("fs");

console.log("🚀 Cursor Systems Initialization starting...");

// Systems to initialize in order
const systemPaths = [
  // Core systems
  "systems/memory-initializer.js", // Memory system with auto capabilities
  "systems/scratchpad-system.js", // Scratchpad communication system
  "systems/multi-agent-system.js", // Multi-agent system

  // Communication systems
  "communication/direct-banner.js", // Banner system

  // Other systems
  "communication/launcher.js", // System launcher
];

// Track initialization status
const initStatus = {
  success: true,
  systems: {},
  errors: [],
};

// Function to initialize a system
function initializeSystem(systemPath) {
  try {
    const fullPath = path.join(__dirname, systemPath);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️ System not found: ${systemPath}`);
      initStatus.systems[systemPath] = {
        status: "not_found",
        error: "File not found",
      };
      return false;
    }

    // Clear require cache if needed
    if (require.cache[require.resolve(fullPath)]) {
      delete require.cache[require.resolve(fullPath)];
    }

    // Initialize the system
    console.log(`🔄 Initializing system: ${systemPath}`);
    const system = require(fullPath);

    // Check if initialization was successful
    if (system) {
      const status = system.initialized === false ? "failed" : "success";
      console.log(
        `${
          status === "success" ? "✅" : "❌"
        } System ${systemPath} initialization ${status}`
      );

      initStatus.systems[systemPath] = {
        status: status,
        result: system.initResult || system,
      };

      return status === "success";
    } else {
      initStatus.systems[systemPath] = {
        status: "unknown",
        error: "System returned undefined",
      };
      return false;
    }
  } catch (error) {
    console.error(
      `❌ Error initializing system ${systemPath}: ${error.message}`
    );

    initStatus.systems[systemPath] = {
      status: "error",
      error: error.message,
    };

    initStatus.errors.push({
      system: systemPath,
      error: error,
    });

    return false;
  }
}

// Initialize all systems
console.log("🔄 Initializing all cursor systems...");

let allSuccessful = true;
for (const systemPath of systemPaths) {
  const success = initializeSystem(systemPath);
  if (!success) {
    allSuccessful = false;
  }
}

// Update init status
initStatus.success = allSuccessful;
initStatus.timestamp = new Date().toISOString();

// Store initialization status in memory if available
if (
  globalThis.MEMORY_SYSTEM &&
  typeof globalThis.MEMORY_SYSTEM.storeContext === "function"
) {
  globalThis.MEMORY_SYSTEM.storeContext("system_initialization", initStatus);
  console.log("✅ Stored initialization status in memory");
}

// Log completion
if (allSuccessful) {
  console.log("🎉 Cursor systems initialization completed successfully");
} else {
  console.warn("⚠️ Cursor systems initialization completed with errors");
}

// Make init status globally available
globalThis.CURSOR_INIT_STATUS = initStatus;

// Export init status
module.exports = {
  initialized: allSuccessful,
  status: initStatus,
};
