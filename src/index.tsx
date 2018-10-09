import {Provider} from 'mobx-react'
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import GameStore from './stores'

import './index.css';
import registerServiceWorker from './registerServiceWorker';

const gameStore = new GameStore();
const allStores = {gameStore};
export type AllStores = typeof allStores;

ReactDOM.render(
    <Provider {...allStores}>
        <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
