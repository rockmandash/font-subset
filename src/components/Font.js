import React, { Component } from 'react';
import styled, { css } from 'react-emotion/macro';

const Container = styled.div`
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  &:first-child {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const PreviewText = styled.p`
  font-size: 5rem;
  letter-spacing: 5px;
  margin: 10px 0 0 0;
  ${prop => css`
    font-family: ${prop.fontName};
    font-weight: ${prop.fontWeight};
  `};
`;
const Name = styled.p`
  font-size: 1.2rem;
  margin: 0;
`;
const FontName = styled.p`
  font-size: 1rem;
  margin: 5px 0 0 0;
  color: #666;
`;

class Font extends Component {
  render() {
    const { name, fontName, fonts } = this.props;

    return (
      <>
        {fonts.map(font => {
          const { fontWeight, fontWeightName } = font;
          return (
            <Container key={`${fontName}-${fontWeightName}`}>
              <Name>
                {name} {fontWeight} {fontWeightName}
              </Name>
              <FontName>
                {fontName} {fontWeight} {fontWeightName}
              </FontName>
              <PreviewText fontWeight={fontWeight} fontName={fontName}>
                爽哥哥
              </PreviewText>
            </Container>
          );
        })}
      </>
    );
  }
}

export default Font;
