import './docs.scss';

import React from 'react';

const DocsPage = () => (
  <div className="docs-page">
    <iframe
      src="../swagger-ui/index.html"
      width="100%"
      height="1000"
      title="Swagger UI"
      seamless
      style={{ border: 'none' }}
      data-cy="swagger-frame"
    />
  </div>
);

export default DocsPage;
