import * as S from './styles';
import bg1 from '@/assets/bg1.svg';
import bg2 from '@/assets/bg2.svg';
import bg3 from '@/assets/bg3.svg';
import SearchDropDown from '@/components/SearchDropDown';
import { useAppDispatch } from '@/hooks/redux';
import { fetchRelatedWordsByKeyword } from '@/reducers/cacheSlice';
import { useEffect, useRef, useState } from 'react';
import SearchBar from '../SearchBar';
import useDebounce from '@/hooks/useDebounce';

export default function Search() {
  const [keyword, setKeyword] = useState<string>('');
  const [relatedWords, setRelatedWords] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  const [listIndex, setListIndex] = useState<number>(-1);

  const scrollRef = useRef<HTMLLIElement>(null);
  const debounceKeyword = useDebounce({ value: keyword, delay: 500 });

  const dispatch = useAppDispatch();

  const toggleSearchMode = () => {
    setIsSearchMode(prev => !prev);
  };

  const onChangeSearchInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const keyboardNavigation = e => {
    if (!relatedWords) return;
    if (e.key === 'ArrowDown') {
      isSearchMode &&
        setListIndex(
          listIndex + 1 > relatedWords.length - 1 ? relatedWords.length - 1 : listIndex + 1
        );
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    if (e.key === 'ArrowUp') {
      isSearchMode && setListIndex(listIndex - 1 < 0 ? 0 : listIndex - 1);
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    if (e.key === 'Escape') {
      setListIndex(-1);
    }
    if (e.key === 'Enter') {
      setKeyword(relatedWords[listIndex].name);
      setListIndex(-1);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyboardNavigation);
    return () => {
      window.removeEventListener('keydown', keyboardNavigation);
    };
  }, [keyboardNavigation]);

  useEffect(() => {
    const fetchRelatedWords = async () => {
      const result = await dispatch(fetchRelatedWordsByKeyword(keyword));
      setRelatedWords(result.payload.relatedWords);
    };
    fetchRelatedWords();
  }, [debounceKeyword]);

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
          <SearchBar
            keyword={keyword}
            isSearchMode={isSearchMode}
            toggleSearchMode={toggleSearchMode}
            onChangeSearchInput={onChangeSearchInput}
          />
          {isSearchMode && (
            <SearchDropDown
              keyword={keyword}
              relatedWords={relatedWords}
              listIndex={listIndex}
              scrollRef={scrollRef}
            />
          )}
        </S.InputWrapper>
      </S.Container>
    </S.MainWrapper>
  );
}
