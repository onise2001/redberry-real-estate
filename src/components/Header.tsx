import React from "react";
import { styled } from "styled-components";

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <HeaderContainer>
        <StyledImage src="/images/LOGO-02 3.png" />
      </HeaderContainer>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100%;
  padding: 3.8rem 16.2rem;
  background-color: #fff;
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 7.7rem;
`;

const HeaderContainer = styled.div``;

const StyledImage = styled.img``;

export default Header;
