import styled from 'styled-components';
import Input from '../common/Input';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const StyleEnterTag = styled.div`
  .row {
    flex-wrap: wrap;
    gap: 1rem;
  }
  .box-title {
    font-size: 1.6rem;
    font-weight: var(--nanum-semi-bold);
  }
`;

const StyleTag = styled.div`
  margin: 10px 0;
  padding: ${(props) => props.$padding || '7px'};
  font-size: ${(props) => props.$padding || '1.5rem'};
  font-weight: var(--nanum-bold);
  border: 1px solid var(--black-400);
  border-radius: 5px;
  display: inline;
  transition: all.2s;
  display: flex;
  justify-content: center;
  gap: 1rem;
  > svg:hover {
    cursor: pointer;
  }
`;

export default function EnterTag({
  width,
  height,
  placeholder,
  defaultTags = [],
  handleInputChange,
  ...rest
}) {
  const [tags, setTags] = useState(defaultTags);
  useEffect(() => {
    if (defaultTags?.length) {
      setTags(defaultTags);
    }
  }, [defaultTags]);

  const enterTagHandler = (e) => {
    const noSpecialCharsOrSpacesRegex = /^[a-zA-Z0-9가-힣]+$/;
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      if (
        tags.length < 3 &&
        tags.indexOf(e.target.value) === -1 &&
        noSpecialCharsOrSpacesRegex.test(e.target.value)
      ) {
        setTags([e.target.value, ...tags]);
        handleInputChange(null, [e.target.value, ...tags], 'tags');
      }
      setTimeout(() => {
        e.target.value = '';
      }, 0);
    }
  };
  console.log(tags.length);
  return (
    <StyleEnterTag className="col" {...rest}>
      <div className="box-title">검색 키워드</div>
      {tags.length < 3 && (
        <Input
          width={width}
          height={height}
          placeholder={placeholder}
          type="text"
          onKeyDown={(e) => enterTagHandler(e)}
          maxLength={10}
        />
      )}
      <div className="row">
        {tags.map((el, idx) => (
          <StyleTag key={idx}>
            {el}
            <AiOutlineClose
              size={15}
              color={'var(--error)'}
              onClick={() => {
                const newTags = tags.filter((_, i) => i !== idx);
                setTags(newTags);
                handleInputChange(null, newTags, 'tags');
              }}
            />
          </StyleTag>
        ))}
      </div>
    </StyleEnterTag>
  );
}
