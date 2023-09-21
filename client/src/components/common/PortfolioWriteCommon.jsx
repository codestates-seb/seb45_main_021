import styled from 'styled-components';
import { desktop } from '../../static/theme';
const StylePortfolioWrite = styled.section`
  width: var(--inner);
  margin: var(--center);
  padding-top: 50px;
  .write-wrapper {
    display: flex;
    .input-container {
      gap: 15px;
      width: 1%;
      flex: 1;
    }
    gap: 100px;
    ${desktop} {
      flex-direction: column;
      .input-container {
        width: 100%;
        flex: 1;
      }
    }
  }
  .write-description {
    position: sticky;
    top: 50px;
    order: 1;
    ${desktop} {
      position: static;
      order: 0;
    }
  }
  input {
    border: none;
    border-bottom: 1px solid var(--black-600);
    padding-top: 10px;
    padding-left: 3px;
    border-radius: 0;
    transition: all.1s;
    font-weight: var(--nanum-semi-bold);
    font-size: 1.6rem;
    &:focus {
      border-color: var(--black-100);
    }
  }
  .progress-input {
    position: relative;
    .progress-bar {
      position: absolute;
      bottom: 25px;
    }
  }
  .selectors {
    position: relative;
    display: flex;
    gap: 30px;
    .lang-selector {
      flex: 1;
    }
  }
  .tag-container {
    margin-top: 30px;
    input {
      margin-bottom: -10px;
    }
  }
  .body-content {
    border: 1px solid var(--black-500);
    transition: all.1s;
    font-weight: var(--nanum-bold);
    font-size: 1.6rem;
    &:focus {
      border-color: var(--black-100);
    }
  }
  .progress-textarea {
    position: relative;
    .progress-bar {
      position: absolute;
      top: 10px;
    }
  }

  .body-image {
    margin-top: 40px;
  }
  .button-box {
    margin-top: 60px;
    display: flex;
    gap: 20px;
    button {
      width: 70px;
    }
  }
`;
export default StylePortfolioWrite;
