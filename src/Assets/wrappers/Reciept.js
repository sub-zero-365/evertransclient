import styled from 'styled-components';

// const Wrapper = styled.article`
//   padding: 2rem;
//   background: var(--background-secondary-color);
//   border-bottom: 5px solid ${(props) => props.color};
//   border-radius: var(--border-radius);

//   header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//   }
//   .count {
//     display: block;
//     font-weight: 700;
//     font-size: 50px;
//     color: ${(props) => props.color};
//     line-height: 2;
//   }
//   .title {
//     margin: 0;
//     text-transform: capitalize;
//     letter-spacing: var(--letter-spacing);
//     text-align: left;
//     margin-top: 0.5rem;
//     font-size: 1.25rem;
//   }
//   .icon {
//     width: 70px;
//     height: 60px;
//     background: ${(props) => props.bcg};
//     border-radius: var(--border-radius);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     svg {
//       font-size: 2rem;
//       color: ${(props) => props.color};
//     }
//   }
// `;
const Wrapper = styled.article`
padding: 2rem;
  background: var(--background-secondary-color,red);
  border-bottom: 5px solid ${(props) => props.color};
  border-radius: var(--border-radius);
  margin-bottom:0.5rem;
  header{
  font-size:2rem;
  font-weight:900
  }
  
  
  `
export default Wrapper;
