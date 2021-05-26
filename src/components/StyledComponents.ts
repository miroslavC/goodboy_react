import styled from 'styled-components';

export const TitleInfo = styled.h1`
    color: #000000;
    text-align: left;
    font-style: normal;
    font-weight: bold;
    font-size: 45px;
    line-height: 50px;
    letter-spacing: 0.01em;
`;

export const HelpToggle = styled.div`
    display: flex;
    flex-direction: row;
    margin-top:1.5em;
    width:100%;
    height: 6.5em;
    background-color: #1c7c4c;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 25px;
`;

export const ToggleNormalLeft = styled.div`
    width: 50%;
    height: 6.5em;
    order: 1;
    background: #FAF9F9;
    border: 1px solid #CD8B65;
    box-sizing: border-box;
    border-radius: 24px 0px 0px 24px;
    cursor: pointer;
    padding: 0.8em;
`;

export const ToggleActiveLeft = styled.div`
  background: linear-gradient(180deg, #CD8B65 0%, #BB6B3D 100%);
  width: 50%;
  height: 6.5em;
  order: 1;
  border-radius: 24px 0px 0px 24px;
  box-sizing: border-box;
  padding: 0.8em;
  cursor: pointer;
  box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
`;

export const LogoHelpDonate = styled.div`
    width: 2.5em;
    height: 2.5em;
    display: block;
    background-size: contain;
    background-size: 2.5em 2.5em;
`;

export const Svg_icon = styled.img`
    width: 2.5em;
    height: 2.5em;
`;

export const TitleLeftDefault = styled.p`
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    color: #585757;
    text-align: left;
    margin-top:1.5em;
`;

export const TitleLeftActive = styled(TitleLeftDefault)`
   color: #ffffff;
`;
