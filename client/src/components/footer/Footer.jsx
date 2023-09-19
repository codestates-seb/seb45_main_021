import React from 'react';
import { styled } from 'styled-components';
import githubIcon from '../../static/images/githubIcon.png';
import { tablet } from '../../static/theme';
const StyleFooter = styled.footer`
  width: var(--inner);
  margin: var(--center);
  padding: 20px 0;
  display: flex;
  align-items: center;
  gap: 20px;
  .user {
    border-radius: 15px;
    img {
      cursor: pointer;
      width: 100%;
      margin-bottom: 20px;
    }
    span {
      color: var(--black-100);
      display: block;
      font-size: 1.4rem;
      font-style: italic;
      font-weight: var(--nanum-semi-bold);
      margin-bottom: 10px;
    }
    text-align: center;
  }
  .user:hover {
    background-color: #ffffff1b;
  }
  ${tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    .user:hover {
      background-color: transparent;
    }
  }
`;

export default function Footer() {
  const teams = [
    { name: '유명인', position: 'FrontEnd', location: 'https://github.com/myeongin0926' },
    { name: '이종범', position: 'FrontEnd', location: 'https://github.com/blue7111' },
    { name: '박찬섭', position: 'FrontEnd', location: 'https://github.com/qkrckstjq' },
    { name: '김예인', position: 'BackEnd', location: 'https://github.com/brightyein' },
    { name: '한휘용', position: 'BackEnd', location: 'https://github.com/HwiyongHan' },
    { name: '박동근', position: 'BackEnd', location: 'https://github.com/Park-DongGeun' },
  ];
  return (
    <StyleFooter>
      {teams.map((user, i) => (
        <div key={i} className="user">
          <a href={user.location} target="_blank" rel="noreferrer">
            <img src={githubIcon} alt="github icon" />
            <span>{user.name}</span>
            <span>{user.position}</span>
          </a>
        </div>
      ))}
    </StyleFooter>
  );
}
