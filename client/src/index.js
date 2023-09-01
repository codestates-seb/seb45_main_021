import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './reset.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
 html{
  font-size: 10px;
  font-family: var(--nanum);
  color: var(--black-100);
  -webkit-font-smoothing: antialiased;
  --inner: 1250px;
 }
 *{
    text-shadow: 2px 2px 2px var(--shadow);
  cursor:default ;
 }
 input {
  outline:none;
  cursor:text;
 }
 textarea {
  outline:none;
  cursor:text;
  resize:none;
 }
 
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Global />
    <App />
  </BrowserRouter>,
);
