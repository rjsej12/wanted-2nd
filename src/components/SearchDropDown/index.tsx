import DropDownItem from '@/components/DropDownItem';
import * as S from './styles';
import { CacheState } from '@/reducers/cacheSlice';

interface ISearchDropDownProps {
  keyword: string;
  relatedWords: CacheState[];
  listIndex: number;
  scrollRef: React.RefObject<HTMLLIElement>;
}

export default function SearchDropDown({
  keyword,
  relatedWords,
  listIndex,
  scrollRef,
}: ISearchDropDownProps) {
  return (
    <S.Wrapper>
      {keyword === '' && (
        <>
          {' '}
          <S.Title>최근 검색어</S.Title>
          <S.Message>최근 검색어가 없습니다</S.Message>
        </>
      )}
      <S.DropDownList>
        {keyword !== '' && <DropDownItem keyword={keyword} word={keyword} selected={false} />}
        {keyword !== '' && relatedWords && relatedWords.length !== 0 && (
          <>
            <S.Title>추천 검색어</S.Title>
            {relatedWords.map((word, index) =>
              index === listIndex ? (
                <DropDownItem
                  key={word.id}
                  selected={listIndex === index}
                  keyword={keyword}
                  word={word.name}
                  scrollRef={scrollRef}
                />
              ) : (
                <DropDownItem
                  key={word.id}
                  selected={listIndex === index}
                  keyword={keyword}
                  word={word.name}
                />
              )
            )}
          </>
        )}
      </S.DropDownList>
    </S.Wrapper>
  );
}
