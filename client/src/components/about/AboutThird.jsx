import { styled } from 'styled-components';
import useNav from '../../hooks/useNav';
import VideoPlayer from './VideoPlayer';
import video from '../../static/videos/third.mp4';
import { StyleBorderButton } from '../common/Buttons';
import { useSelector } from 'react-redux';
import { tablet } from '../../static/theme';

const StyleAboutThird = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
  perspective: 50rem;
  .rotation-box {
    width: 85rem;
    perspective-origin: center;
    display: flex;
    gap: 5rem;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    ${tablet} {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
  }

  .info-button-box,
  .info-text-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    ${tablet} {
      flex: 0;
      min-width: 350px;
    }
  }

  .info-text-box {
    font-size: 5rem;
    letter-spacing: 0.5rem;
    gap: 3.5rem;
    font-family: var(--monoton);
    ${tablet} {
      font-size: 4rem;
    }
  }

  button {
    border-radius: 3px;
    font-size: 1.8rem;
    padding: 2rem;
    ${tablet} {
      font-size: 1.5rem;
      padding: 15px;
      min-width: 300px;
    }
  }
`;

export default function AboutThird({ activePage }) {
  const { toPortfolio, toProject, toSignin, toSignup } = useNav();
  const stringArr = ['SideProject', 'Portfolio', 'Experience', 'Connection'];
  const { isLogin } = useSelector((state) => state.user);

  return (
    <StyleAboutThird>
      <VideoPlayer src={video} />
      <div className="rotation-box">
        <div className="info-button-box">
          <StyleBorderButton onClick={toProject}>프로젝트 바로가기</StyleBorderButton>
          <StyleBorderButton onClick={toPortfolio}>포트폴리오 바로가기</StyleBorderButton>
          {!isLogin && (
            <>
              <StyleBorderButton onClick={toSignin}>로그인</StyleBorderButton>
              <StyleBorderButton onClick={toSignup}>회원가입</StyleBorderButton>
            </>
          )}
        </div>
        <div className="info-text-box col">
          {stringArr.map((str, i) => (
            <div key={i}>
              <span>{str.slice(0, 1)}</span>
              <span>{str.slice(1)}</span>
            </div>
          ))}
        </div>
      </div>
    </StyleAboutThird>
  );
}
