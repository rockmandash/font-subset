import React, { Component } from 'react';
import styled from 'react-emotion/macro';
import Font from './Font';
import fontData from '../font-subset/fontData';

const Container = styled.div`
  position: relative;
  width: calc(100% - 32px);
  max-width: 500px;
  margin: 100px auto 0;
`;

class Fonts extends Component {
  render() {
    return (
      <Container>
        {Object.keys(fontData).map(fontName => {
          const { name, fonts } = fontData[fontName];
          return (
            <Font
              key={fontName}
              fontName={fontName}
              name={name}
              fonts={fonts}
            />
          );
        })}
      </Container>
    );
  }
}

export default Fonts;
