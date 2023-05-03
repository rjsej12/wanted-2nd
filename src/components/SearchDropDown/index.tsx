import DropDownItem from '@/components/DropDownItem';
import * as S from './styles';
import { useAppSelector } from '@/hooks/redux';

interface ISearchDropDownProps {
  keyword: string;
}

export default function SearchDropDown({ keyword }: ISearchDropDownProps) {
  const cache = useAppSelector(state => state.cache);
  const relatedWords = cache[keyword];

  return (
    <S.Wrapper>
      {keyword === '' && (
        <>
          {' '}
          <S.Title>최근 검색어</S.Title>
          <S.Message>최근 검색어가 없습니다</S.Message>
        </>
      )}
      {keyword !== '' && <DropDownItem keyword={keyword} word={keyword} />}
      {keyword !== '' && relatedWords && relatedWords.length !== 0 && (
        <>
          <S.Title>추천 검색어</S.Title>
          <S.DropDownList>
            {relatedWords.map(word => (
              <DropDownItem key={word.id} keyword={keyword} word={word.name} />
            ))}
          </S.DropDownList>
        </>
      )}
    </S.Wrapper>
  );
}
