import React from 'react';

export default function ReplaceNewLine(text) {
    return text?.split('\n').map((item, index, array) => (
        index === array.length - 1 ? item : (
          <React.Fragment key={index}>
            {item}
            <br/>
          </React.Fragment>
        )
    ));
}

