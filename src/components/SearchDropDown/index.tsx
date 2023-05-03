import DropDownItem from '@/components/DropDownItem';
import * as S from './styles';

type SearchDropDownProps = {
  keyword: string;
};

export default function SearchDropDown({ keyword }: SearchDropDownProps) {
  const tempdatas = [
    {
      name: '갑상선암',
      id: 4373,
    },
    {
      name: '갑상선염',
      id: 4376,
    },
    {
      name: '갑상선중독증',
      id: 4378,
    },
    {
      name: '갑상선 중독',
      id: 4381,
    },
    {
      name: '갑상선암종',
      id: 4375,
    },
    {
      name: '갑상선염증',
      id: 4377,
    },
    {
      name: '갑상선 결절',
      id: 4355,
    },
    {
      name: '갑상선 항진증',
      id: 4372,
    },
    {
      name: '갑상선저하증',
      id: 4368,
    },
    {
      name: '갑상선기능저하증',
      id: 4364,
    },
    {
      name: '갑상선기능항진증',
      id: 4369,
    },
    {
      name: '갑상선 수질암',
      id: 4359,
    },
    {
      name: '갑상선 여포암',
      id: 4361,
    },
    {
      name: '갑상선 유두암',
      id: 4363,
    },
    {
      name: '갑상선기능저하',
      id: 4367,
    },
    {
      name: '갑상선 미분화암',
      id: 4357,
    },
  ];

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
      <>
        <S.Title>추천 검색어</S.Title>
        <S.DropDownList>
          {tempdatas.map(data => (
            <DropDownItem key={data.id} keyword={keyword} word={data.name} />
          ))}
        </S.DropDownList>
      </>
    </S.Wrapper>
  );
}
