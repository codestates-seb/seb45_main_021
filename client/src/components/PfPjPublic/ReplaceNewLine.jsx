import React from 'react';
import styled from 'styled-components';

const StyleNewLine = styled.div`
  line-height:1.5;
`

export default function ReplaceNewLine(text, gap=undefined) {
    if(gap) {
      return (
      <StyleNewLine>
          {text?.split('\n').map((item, index, array) => (
          index === array.length - 1 ? item : (
            <React.Fragment key={index}>
              {item}
              <br/>
            </React.Fragment>
          )
        ))}
      </StyleNewLine>)
    } else {
      return text?.split('\n').map((item, index, array) => (
        index === array.length - 1 ? item : (
          <React.Fragment key={index}>
            {item}
            <br/>
          </React.Fragment>
        )
    ));
    }
}

