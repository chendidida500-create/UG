// Minimal React type declarations to resolve import issues
declare module 'react' {
  import React = require('react');
  export = React;
}

declare module 'react-dom' {
  import ReactDOM = require('react-dom');
  export = ReactDOM;
}
