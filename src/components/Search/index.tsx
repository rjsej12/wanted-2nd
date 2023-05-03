import * as S from './styles';
import bg1 from '@/assets/bg1.svg';
import bg2 from '@/assets/bg2.svg';
import bg3 from '@/assets/bg3.svg';
import SearchDropDown from '@/components/SearchDropDown';
import { useState } from 'react';

export default function Search() {
  const [keyword, setKeyword] = useState('');
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <S.MainWrapper>
      <S.Container>
        <S.BackgroundImage1 src={bg1} />
        <S.BackgroundImage2 src={bg2} />
        <S.BackgroundImage3 src={bg3} />
        <S.Title>
          국내 모든 임상시험 검색하고
          <br />
          온라인으로 참여하기
        </S.Title>
        <S.InputWrapper>
          <S.EllipseBorder>
            <S.Wrapper>
              <S.SearchIcon1 />
              <S.SearchInput
                placeholder="질환명을 입력해 주세요."
                value={keyword}
                onChange={onChangeSearchInput}
                onFocus={() => setIsSearchMode(true)}
                onBlur={() => setIsSearchMode(false)}
              />
            </S.Wrapper>
            <S.SearchButton>
              <S.SearchIcon2 />
            </S.SearchButton>
          </S.EllipseBorder>
          {isSearchMode && <SearchDropDown keyword={keyword} />}
        </S.InputWrapper>
      </S.Container>
    </S.MainWrapper>
  );
}
