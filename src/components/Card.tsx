import * as React from 'react';
import {ICard} from "../types/index";
import './Card.css'


const card = (cardProps: ICard) => {
    let cardClasses = 'closed';
    if (cardProps.isOpen) {
        cardClasses = 'open';
    }
    if (cardProps.matched) {
        cardClasses = 'hidden';
    }
    return (
        <div className={`Card-scene ${cardClasses}`}>
            <div className="card-content">
                <div className="card-inner card-inner__back" />
                <div className="card-inner card-inner__front">{cardProps.image}</div>
            </div>
        </div>
    );
};

export default card;
