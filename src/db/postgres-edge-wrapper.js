// This wrapper conditionally loads the Cloudflare version at runtime
// and the Node.js version at build/dev time, completely deferred until first call.

let postgresClient;

const getClient = () => {
  if (postgresClient) return postgresClient;

  const isEdge = 
    (typeof globalThis.EdgeRuntime !== "undefined") || 
    (typeof globalThis.navigator !== "undefined" && globalThis.navigator.userAgent === "Cloudflare-Workers");

  let res;
  if (isEdge) {
    // Standard require so the bundler includes it in the Edge chunk
    res = require("../../node_modules/postgres/cf/src/index.js");
  } else {
    // Use process.mainModule.require to load postgres at runtime.
    // This completely bypasses Turbopack/Webpack static analysis, aliases,
    // and avoids eval() which is banned in the Edge runtime.
    const nodeProcess = typeof globalThis.process !== "undefined" ? globalThis.process : null;
    const req = nodeProcess && nodeProcess.mainModule && nodeProcess.mainModule.require 
      ? nodeProcess.mainModule.require.bind(nodeProcess.mainModule) 
      : null;

    if (req) {
      res = req("postgres");
    } else {
      throw new Error("Node.js module loading is not supported in this environment");
    }
  }
  
  postgresClient = res.default || res;
  return postgresClient;
};

// Export a proxy function that redirects calls to the active client
const postgresWrapper = function (...args) {
  return getClient()(...args);
};

// Also proxy any properties/methods attached to postgres (like Sql, SqlError, etc.)
const properties = ["Sql", "SqlError", "PostgresError"];
properties.forEach(prop => {
  Object.defineProperty(postgresWrapper, prop, {
    get() {
      return getClient()[prop];
    },
    configurable: true,
    enumerable: true
  });
});

module.exports = postgresWrapper;
