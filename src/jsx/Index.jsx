import UNCTADSiteHeader from '@unctad-infovis/general-tools/components/UNCTADSiteHeader.jsx';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import { getMeta, resolveLanguage } from './i18n.js';

const container = document.getElementById(`app-root-${__PROJECT_NAME__}`);
const lang = resolveLanguage(container);
document.documentElement.lang = lang;
container.lang = lang;
const meta = getMeta(lang);

const showSiteHeader = meta.show_site_header && !window.location.hostname.includes('unctad.org');

const root = createRoot(container);
root.render(
  showSiteHeader ? (
    <UNCTADSiteHeader>
      <App meta={meta} />
    </UNCTADSiteHeader>
  ) : (
    <App meta={meta} />
  )
);
