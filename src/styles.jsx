import styled from 'styled-components';

export const Container = styled.div`
  margin: 5rem auto 0;

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 1024px) {
    max-width: 1024px;
  }

  @media (min-width: 1280px) {
    max-width: 1280px;
  }

  @media (min-width: 1536px) {
    max-width: 1536px;
  }
`;

export const NavWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const Label = styled.span`
  display: block;
`;
