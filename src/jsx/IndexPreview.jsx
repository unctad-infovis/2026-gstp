import UNCTADSiteHeader from '@unctad-infovis/general-tools/components/UNCTADSiteHeader.jsx';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import { getMeta } from './i18n.js';

// Demo-only entry that stacks every supported language on one page for visual review.
// Not part of the production build (not registered in vite.config.js rollupOptions.input).
for (const container of document.querySelectorAll('[data-preview-lang]')) {
  const meta = getMeta(container.dataset.previewLang);
  const showSiteHeader = meta.show_site_header && !window.location.hostname.includes('unctad.org');
  createRoot(container).render(
    showSiteHeader ? (
      <UNCTADSiteHeader>
        <App meta={meta} />
      </UNCTADSiteHeader>
    ) : (
      <App meta={meta} />
    )
  );
}
