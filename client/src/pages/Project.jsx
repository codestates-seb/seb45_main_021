import React, { useState } from 'react';
import Input from '../components/common/Input';
import { styled } from 'styled-components';
import Select from '../components/common/Select';

const StyleProject = styled.div`
  padding-top: 55px;
  position: relative;
  /* align-items: center; */
  justify-content: center;
`;

const options = [
  { value: 'all', label: '-' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default function Project() {
  const [test, setTest] = useState('');
  const [curItem, setCurItem] = useState(options[0].label);

  const handleClickItem = (item) => {
    setCurItem(item);
  };
  const handleChange = (e) => {
    setTest(e.target.value);
  };
  return (
    <StyleProject className="col">
      <Input
        label={'아이디'}
        error={'아 오류 존나뜨네'}
        width={'30px'}
        value={test}
        onChange={handleChange}
      />
      <Select width="30" options={options} itemValue={curItem} onClickHandler={handleClickItem} />
    </StyleProject>
  );
}
