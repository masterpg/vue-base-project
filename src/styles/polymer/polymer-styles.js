import '@polymer/polymer/polymer-legacy.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

const template = html`
<custom-style>
  <style is="custom-style">
    :root {
      --app-drawer-width: 300px;
    }
  </style>
</custom-style>
`;
template.setAttribute('style', 'display: none;');
document.head.appendChild(template.content);
