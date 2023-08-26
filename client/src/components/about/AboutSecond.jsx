import Section from '../common/Section';
import VideoPlayer from './VideoPlayer';
import { styled } from 'styled-components';

const StyleAboutFirst = styled(Section)``;
export default function AboutSecond() {
  return (
    <StyleAboutFirst className="about-first">
      <VideoPlayer src="/videos/second.mp4" />
    </StyleAboutFirst>
  );
}
