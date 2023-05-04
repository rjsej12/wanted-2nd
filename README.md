# 캐싱을 어떻게 구현했는지

## 리덕스 사용 및 그 이유

- 캐싱을 구현하기 위해서는 fetch해온 data를 저장할 저장소가 필요.

- 로컬스토리지, 세션스토리지, 캐시스토리지 등 다양한 저장소가 존재.

- 리덕스에 대한 멘탈모델은 알고있으나, 많이 사용해보지 못해 익숙하지 않고 더욱이 RTK는 사용해본적 없음.

- 아직까지 리덕스를 사용하는 기업이 많아, 리덕스 코드에 대한 이해도를 높이는 부수효과를 기대하고 리덕스를 사용해보기로 결정.

## 캐싱 구현

- 리덕스를 이용해 store를 생성하고, createSlice cahce 데이터를 저장할 cacheReducer를 만듬.

- cacheReducer에는 key(검색어)마다 `{ name, id }`의 객체들의 배열을 저장함.

- createAsyncThunk를 통해 fetchRelatedWordsByKeyword extraReducer를 만듬.

- fetchRelatedWordsByKeyword에서는 thunkAPI를 활용해 cache에 keyword 값이 있는지 검색후 cahce[keyword]가 존재한다면 그 값을, 없다면 searchAPI를 호출해 값을 전달함.

- 또한 setTimeout과 removeRelatedWords reducer를 통해 expiretime이 지난 후 cache에서 값을 지우도록 함.

# 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

## 디바운스 vs 쓰로틀링

- API 호출을 줄이기 위해서 이벤트를 모아줄 필요가 있었음.

- 이벤트를 모아주는 방법으로 디바운스와 쓰로틀링이 존재해 어떤 방법이 더 어울릴지 고민.

- input change이벤트는 일정 시간마다가 아닌 사용자가 입력을 중지했을때 api를 호출하는게 더 적절하다 생각해 디바운스를 적용하기로 결정.

## 구현 방법

- useDebounce hook을 통해 delay 안에 다른 이벤트가 발생하지 않는다면 setDebouncedValue가 실행되어 바뀐 값이 return 되고 다른 이벤트가 발생하면 기존 값이 그대로 return 되도록 함.

- Search 컴포넌트에서 keyword를 value로 사용한 useDebounce 값을 만들고 이를 useEffect의 의존성 배열에 넣고 useEffect내에서 fetch과정을 수행함.

- 입력이 발생할 때 마다 keyword가 변하기 때문에 리렌더링이 발생하게 되고 debouncedKeyword도 호출됨. useDebounce 내부 로직에 따라 delay 안에 입력이 발생하지 않으면 변한 value가, 그렇지 않으면 기존 값을 그대로 가지게 됨.기존 값이 그대로 리턴 된다면 useEffect가 호출되지 않을 것이고 변경된 값을 리턴받게 된다면 useEffect가 호출되어 fetch과정을 수행.

# 키보드만으로 추천 검색어들로 이동 가능하도록 구현

- useEffect를 사용하여 window에 keydown을 감지하는 이벤트를 적용.

- keyboardNavigation이라는 이름으로 keydown 이벤트에 대해 수행할 핸들러를 만듬.

- keyboardNavigation에서는 키 입력에 따라 listIndex를 변경시킴.

- listIndex를 props로 전달해 Item에서 selected라는 prop을 가지게하고 css를 변경해줌으로 이동하는 효과를 구현
