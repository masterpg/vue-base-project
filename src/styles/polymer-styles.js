import '@polymer/polymer/polymer-legacy.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `
<custom-style>
  <style is="custom-style">

    :root {
      --app-drawer-width: 256px;
    }

    app-drawer {
      --app-drawer-content-container: {
        background-color: #f5f5f5;
      }
    }

    @media (min-width: 600px) {
      app-drawer {
        --app-drawer-content-container: {
          background-color: #f5f5f5;
          border-right: 1px solid #e0e0e0;
        }
      }
    }

  </style>
</custom-style>
`;

document.head.appendChild($_documentContainer.content);
