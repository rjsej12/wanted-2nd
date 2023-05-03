import * as S from './styles';
import bg1 from '@/assets/bg1.svg';
import bg2 from '@/assets/bg2.svg';
import bg3 from '@/assets/bg3.svg';
import SearchDropDown from '@/components/SearchDropDown';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchRelatedWordsByKeyword } from '@/reducers/cacheSlice';
import { useEffect, useState } from 'react';

export default function Search() {
  const [keyword, setKeyword] = useState<string>('');
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  const [listIndex, setListIndex] = useState<number>(-1);
  const [timer, setTimer] = useState<number>(0);

  const dispatch = useAppDispatch();
  const cache = useAppSelector(state => state.cache);
  const relatedWords = cache[keyword];

  const onChangeSearchInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      if (cache[e.target.value] === undefined) {
        dispatch(fetchRelatedWordsByKeyword(e.target.value));
      }
    }, 500);
    setTimer(newTimer);
  };

  const keyboardNavigation = e => {
    if (!relatedWords) return;
    if (e.key === 'ArrowDown') {
      isSearchMode && setListIndex(listIndex + 1 > 6 ? 6 : listIndex + 1);
    }
    if (e.key === 'ArrowUp') {
      isSearchMode && setListIndex(listIndex - 1 < 0 ? 0 : listIndex - 1);
    }
    if (e.key === 'Escape') {
      setListIndex(-1);
      setIsSearchMode(false);
    }
    if (e.key === 'Enter') {
      setKeyword(relatedWords[listIndex].name);
      setListIndex(-1);
      setIsSearchMode(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyboardNavigation);
    return () => {
      window.removeEventListener('keydown', keyboardNavigation);
    };
  }, [keyboardNavigation]);

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
          {isSearchMode && (
            <SearchDropDown keyword={keyword} relatedWords={relatedWords} listIndex={listIndex} />
          )}
        </S.InputWrapper>
      </S.Container>
    </S.MainWrapper>
  );
}
