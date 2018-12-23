import '@polymer/polymer/polymer-legacy.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `
<custom-style>
  <style is="custom-style">
    :root {
      --app-drawer-width: 300px;
    }
  </style>
</custom-style>
`;

document.head.appendChild($_documentContainer.content);
