window.addEventListener('error', (event: ErrorEvent) => {
  if (
    event.message?.includes('ResizeObserver loop') ||
    event.error?.message?.includes('ResizeObserver loop')
  ) {
    event.stopImmediatePropagation();
    console.warn('Ignored ResizeObserver loop error');
  }
});

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

(self as any).MonacoEnvironment = {
  getWorkerUrl: function (_moduleId: string, label: string): string {
    switch (label) {
      case 'json': return '/assets/monaco/language/json/json.worker.js';
      case 'css': return '/assets/monaco/language/css/css.worker.js';
      case 'html': return '/assets/monaco/language/html/html.worker.js';
      case 'typescript':
      case 'javascript': return '/assets/monaco/language/typescript/ts.worker.js';
      default: return '/assets/monaco/editor/editor.worker.js';
    }
  }
};
