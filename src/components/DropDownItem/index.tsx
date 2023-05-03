import { splitTextWithKeyword } from '@/utils/splitTextWithKeyword';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  padding: 8px 20px;
  cursor: pointer;
  :hover {
    background-color: rgb(244, 246, 250);
  }
`;

const SearchIcon = styled(SearchOutlined)`
  font-size: 18px;
  color: #a5afb7;
  margin-right: 12px;
`;

const TextToken = styled.span`
  font-weight: ${(props: TextTokenProps) => (props.isMatched ? '700' : '400')};
`;

type TextTokenProps = {
  isMatched: boolean;
};

type DropDownItemProps = {
  keyword: string;
  word: string;
};

export default function DropDownItem({ keyword, word }: DropDownItemProps) {
  return (
    <Wrapper>
      <SearchIcon />
      {splitTextWithKeyword(word, keyword).map((text, index) => (
        <TextToken key={index} isMatched={keyword === text}>
          {text}
        </TextToken>
      ))}
    </Wrapper>
  );
}
