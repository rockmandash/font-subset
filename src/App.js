import React, { Component } from 'react';
import styled from 'react-emotion/macro';
import Fonts from './components/Fonts';

const Container = styled.div`
  position: relative;
`;

class App extends Component {
  render() {
    return (
      <Container>
        <Fonts />
      </Container>
    );
  }
}

export default App;
