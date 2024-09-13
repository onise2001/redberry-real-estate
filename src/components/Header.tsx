import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <HeaderContainer>
        <Link to="/">
          <StyledImage src="/images/LOGO-02 3.png" />
        </Link>
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
