// Main Entry Point
import { initApp } from './app.js';
import * as helpers from './helpers.js';
import './modal.js';

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initApp(helpers);
});
