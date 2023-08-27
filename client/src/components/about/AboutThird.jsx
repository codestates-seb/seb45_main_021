import { keyframes, styled } from "styled-components";
import Section from "../common/Section";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Mousewheel,Navigation} from 'swiper/modules';
import { StyleBorderButton } from "../common/Buttons";
import useNav from "../../hooks/useNav";
import bgImg from '../../static/images/background.jpg';
import java from '../../static/images/java.png';
import javascript from '../../static/images/javascript.png';
import clanguage from '../../static/images/clanguage.png';

const StyleAboutThird = styled(Section)`
  background-image : url(${bgImg});
  background-size: 100% ;
  background-position: center;
  .slide-info {
    display:flex;
    height:100%;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding:2rem;
  }
  /* 투명한 검은색 레이어 */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }
  /* 섹션안에서 swiper가운데정렬 */
  .swiper {
    position:absolute !important;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
    width:100vw !important;
    height:70rem !important;
  }
  /* 불릿페이지네이션 바닥에 밀착 */
  .swiper-pagination {
    flex-direction:row !important;
    justify-content:center;
    bottom:0;
  }
  .swiper-pagination-bullet {
    background-color: var(--black-100);
    width: 5rem;
    height: 0.5rem;
    transition: all.3s;
    opacity: 0.4;
    border-radius:0;
    margin:0px !important;
  }
  .swiper-pagination-bullet:first-child {
    border-radius: 0.5rem 0 0 0.5rem;
  }
  .swiper-pagination-bullet:last-child {
    border-radius: 0 0.5rem 0.5rem 0;
  }
  .swiper-pagination-bullet-active {
    width: 7rem;
    height: 0.5rem;
    opacity: 0.7;
  }
  .swiper-slide {
    position:relative;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
    background-color: transparent;
    height:70rem;
    transition:all 1s;
  }
  .swiper-slide-next{
    height:50rem !important;
    opacity : 0.3
  }
  .swiper-slide-prev {
    height:50rem !important;
    opacity : 0.3
  }
  .bottom {
    position:absolute;
    gap:1rem;
    bottom: 5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index:5;
  }
  span {
    line-height: 1.5;
    font-size: 1.8rem;
    font-weight: var(--nanum-semi-bold);
    text-align: center;
    text-shadow: 2px 2px 2px var(--black-800);
  }
`

const StyleFirstSlideDiv = styled.div`
  width:100%;
  flex:1;
  display:flex;
  flex-direction : ${(props)=> props.$start ? 'row' : 'row-reverse'};
  align-items:center;
  gap:2rem;
  div {
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    height:20rem;
    line-height: 1.5;
    font-size: 1.3rem;
    font-weight: var(--nanum-semi-bold);
    text-align: center;
    text-shadow: 2px 2px 2px var(--black-800);
  }
  img {
      border-radius:10px;
      height:80%;
  }
`

const fluffy = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`

const StyleSecondSlideImg = styled.img`
    position:absolute;
    width:${(props)=>props.$width};
    left:${(props)=>props.$left};
    top:${(props)=>props.$top};
    filter: blur(${(props)=>props.$blur});
    opacity:0.5;
    animation: ${fluffy} ${(props)=>props.$time}s ease-in-out infinite;
`

const StyleThirdSlideDiv = styled.div`
  margin: 10rem;
  display: flex;
  justify-content: center;
  gap: 5rem;
  div {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 20rem;
    line-height: 1.5;
    font-size: 1.3rem;
    text-align: center;
  }
  img {
    border-radius: 50%;
    height: 80%;
    transition: transform 0.5s;
  }
  div:hover img {
    transform: rotateY(180deg) scale(2);
  }
  .back {
    transform: rotateY(180deg);
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }
`;

const FirstSlide = () => {
  return (
    <div className="slide-info">
      <StyleFirstSlideDiv $start={true}>
        <div><img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="프로젝트 이미지"/>프로젝트</div>
        <span>커뮤니티가 고객님의 소식을 기다리고 소식을 기다리고 있어요! 로그인하거나 Pixabay에 가입하여 댓글을 확인하세요 로그인 Pixbay 가입커뮤니티가 고객님의 소식을 기다리고 있어요! 로그인하거나 Pixabay에 가입하여 댓글을 확인하세요 로그인 </span>
      </StyleFirstSlideDiv>
      <StyleFirstSlideDiv $start={false}>
        <div><img src="https://swiperjs.com/demos/images/nature-2.jpg" alt="포트폴리오 이미지"/>포트폴리오</div>
        <span>커뮤니티가 고객님의 소식을 기다리고 있어요! 로그인하거나 Pixabay에 가입하여 댓글을 확인하세요 로그인 Pixbay 가입커뮤니티가 고객님의 소식을 기다리고 있어요! 로그인하거나 Pixabay에 가입하여 댓을 확인하세요 로그인 Pixbay 가입</span>
      </StyleFirstSlideDiv>
    </div>
  )
}

const SecondSlide = () => {
  return (
    <div className="slide-info">
      <StyleSecondSlideImg $width={"30rem"} $left={"7%"} $top={"20%"} $blur={"0.3rem"} $time={2} src={clanguage}/>
      <StyleSecondSlideImg $width={"20rem"} $left={"80%"} $top={"50%"} $blur={"0.2rem"} $time={1.7} src={javascript}/>
      <StyleSecondSlideImg $width={"15rem"} $left={"40%"} $top={"10%"} $blur={"0.1rem"} $time={1.5} src={java}/>
      <span>사용하는 언어의 다양한 프로젝트, 포트폴리오를 확인 해보세요</span>
    </div>
  )
}

const ThirdSlide = () => {
  return (
    <div className="slide-info">
      <span>사이트를 이용하시기 전에 읽어봐주세요.</span>
      <StyleThirdSlideDiv>
      <div>
        <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="프로젝트 이미지" />
        <div className="back"/>
        프로젝트
      </div>
      <div>
        <img src="https://swiperjs.com/demos/images/nature-2.jpg" alt="포트폴리오 이미지" />
        <div className="back"/>
        포트폴리오
      </div>
    </StyleThirdSlideDiv>
    </div>
  )
}

export default function AboutThird() {
  const { toPortfolio, toProject } = useNav();

  return (
    <StyleAboutThird>
      <Swiper
        modules={[Pagination, A11y, Mousewheel, Navigation]}
        spaceBetween={100}
        direction="horizontal"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        slidesPerView={1.5}
        centeredSlides={true}
        grabCursor={true}
        navigation
        pagination={{clickable: true}}
      >
        <SwiperSlide>
          <FirstSlide/>
        </SwiperSlide>
        <SwiperSlide>
          <SecondSlide/>
        </SwiperSlide>
        <SwiperSlide>
          <ThirdSlide/>
        </SwiperSlide>
      </Swiper>
      <div className="row bottom">
          <StyleBorderButton onClick={toProject}>프로젝트</StyleBorderButton>
          <StyleBorderButton onClick={toPortfolio}>포트폴리오</StyleBorderButton>
      </div>
    </StyleAboutThird>
  );
}
        