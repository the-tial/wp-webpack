import 'babel-polyfill';
import jQuery from 'jquery';
import {makeItBeautiful} from './example.dependency';

new Promise(resolve => jQuery(() => resolve))
  .then(makeItBeautiful);
