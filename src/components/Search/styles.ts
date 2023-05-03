import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export const MainWrapper = styled.div`
  background-color: #cae9ff;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  width: 1040px;
  padding: 80px 0 160px;
  margin: 0 auto;
  position: relative;
`;

export const BackgroundImage1 = styled.img`
  width: 148px;
  position: absolute;
  top: 200px;
  left: 0;
`;

export const BackgroundImage2 = styled.img`
  width: 130px;
  position: absolute;
  top: 280px;
  right: 124px;
`;

export const BackgroundImage3 = styled.img`
  width: 116px;
  position: absolute;
  top: 188px;
  right: 20px;
`;

export const Title = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 2.125rem;
  font-weight: 700;
  letter-spacing: -0.018em;
  line-height: 1.6;
  margin-bottom: 20px;
`;

export const InputWrapper = styled.div`
  width: fit-content;
  margin: 0 auto;
`;

export const EllipseBorder = styled.div`
  border-radius: 40px;
  border: 2px solid;
  border-color: #ffffff;
  background-color: #ffffff;
  padding: 10px 20px;
  display: flex;
`;

export const Wrapper = styled.div`
  color: #a6afb7;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const SearchIcon1 = styled(SearchOutlined)`
  font-size: 20px;
  color: #a5afb7;
`;

export const SearchInput = styled.input`
  width: 320px;
  height: 40px;
  border: none;
  padding: 4px;
  font-size: 18px;
  ::placeholder {
    color: #a5afb7;
  }
`;

export const SearchButton = styled.button`
  border-radius: 100%;
  width: 48px;
  height: 48px;
  font-weight: 500;
  border: 0;
  cursor: pointer;
  background-color: #007be9;
  display: flex;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
`;

export const SearchIcon2 = styled(SearchOutlined)`
  font-size: 24px;
`;
