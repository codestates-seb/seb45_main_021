import { styled } from 'styled-components';
import Select from '../common/Select';
import { languagesOption, sortOption } from '../../static/options.js';
import CheckBox from '../common/CheckBox';
import { mobile } from '../../static/theme.js';

const StyleFilterOption = styled.div`
  display: flex;
  gap: 15px;
  height: 40px;
  z-index: 1;
  width: 100%;
  align-items: end;
  padding-bottom: 20px;
  .select {
    position: static;
  }
  .check-box {
    margin-left: auto;
  }

  ${mobile} {
    flex-wrap: wrap;
    padding-bottom: 95px;
    justify-content: space-between;
    .select-container {
      width: calc(50% - 8px);
    }
    .check-box {
      margin-left: 0;
    }
  }
`;

export default function FilterOption({ optionHandler, options, pageType }) {
  const { employ, lang, sort } = options;

  let defaultLanguages;

  languagesOption.forEach((item) => {
    if (item.value === lang) {
      defaultLanguages = item.label;
      return;
    }
  });

  return (
    <StyleFilterOption className="filter-option">
      <Select
        className="selected-box"
        width="20rem"
        height="40px"
        options={languagesOption}
        defaultLabel={defaultLanguages === '-' ? '언어' : defaultLanguages}
        onClickHandler={(value) => optionHandler('lang', value)}
      />
      <Select
        options={sortOption}
        width="20rem"
        height="40px"
        defaultLabel={sort === 'latest' ? '최신순' : '관심순'}
        onClickHandler={(value) => optionHandler('sort', value)}
      />

      {pageType === 'portfolios' && (
        <CheckBox
          value={employ}
          boxSize="25px"
          label="구직용 포트폴리오 모아보기"
          onChange={(value) => optionHandler('employ', value)}
        />
      )}
    </StyleFilterOption>
  );
}