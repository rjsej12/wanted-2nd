import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 490px;
  background-color: #fff;
  margin-top: 20px;
  padding: 20px 0;
  border-radius: 20px;
  position: absolute;
  max-height: 400px;
  overflow-y: scroll;
`;

export const Title = styled.h2`
  margin-bottom: 12px;
  font-size: 12px;
  color: rgb(106, 115, 123);
  font-weight: 400;
  padding-left: 20px;
`;

export const Message = styled.span`
  color: #6a737b;
  padding-left: 20px;
`;

export const DropDownList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
`;
