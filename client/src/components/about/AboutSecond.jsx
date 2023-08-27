import Section from '../common/Section';
import VideoPlayer from './VideoPlayer';
import { styled } from 'styled-components';
import video from '../../static/videos/second.mp4';

const StyleAboutFirst = styled(Section)``;
export default function AboutSecond() {
  return (
    <StyleAboutFirst className="about-first">
      <VideoPlayer src={video} />
    </StyleAboutFirst>
  );
}
