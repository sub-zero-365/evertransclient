import styled from 'styled-components';

const Wrapper = styled.span`
    transition:
      0.35s font-weight,
      0.35s color;
  
  
  &:hover {
    font-weight: 900;
    color: rgb(238, 242, 255);
  }
  
  &:hover + & {
    font-weight: 500;
    color: rgb(199, 210, 254);
  }
  
  &:hover + & + & {
    font-weight: 300;
  }
  
  &:has(+ &:hover) {
    font-weight: 500;
    color: rgb(199, 210, 254);
  }
  
  .hoverText:has(+ .hoverText + .hoverText:hover) {
    font-weight: 300;
  }

`

export default Wrapper