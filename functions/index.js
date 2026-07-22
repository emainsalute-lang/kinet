/**
 * Kinet Firebase Cloud Functions — Next.js SSR server.
 *
 * This function handles all requests via Firebase Hosting rewrites.
 * It runs the Next.js app from the sibling `kinet/` directory.
 */
const path = require("path");
const functions = require("firebase-functions");
const next = require("next");

// Resolve to the Next.js app in the sibling kinet/ directory
const nextAppDir = path.resolve(__dirname, "..", "kinet");

const app = next({
  dev: false,
  dir: nextAppDir,
  conf: {
    distDir: path.join(nextAppDir, ".next"),
  },
});

const handle = app.getRequestHandler();

exports.nextApp = functions.https.onRequest(async (req, res) => {
  await app.prepare();
  return handle(req, res);
});

