//@flow
import React from 'react';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

// Font Awesome Pro Regular -- prefix 'far'
import farBan from'@fortawesome/fontawesome-pro-regular/faBan';
import farBuilding from '@fortawesome/fontawesome-pro-regular/faBuilding';
import farCalendar from '@fortawesome/fontawesome-pro-regular/faCalendar';
import farCar from '@fortawesome/fontawesome-pro-regular/faCar';
import farCheck from '@fortawesome/fontawesome-pro-regular/faCheck';
import farEdit from '@fortawesome/fontawesome-pro-regular/faEdit';
import farCheckCircle from '@fortawesome/fontawesome-pro-regular/faCheckCircle';
import farChevronDown from '@fortawesome/fontawesome-pro-regular/faChevronDown';
import farClock from '@fortawesome/fontawesome-pro-regular/faClock';
import farHandPointLeft from '@fortawesome/fontawesome-pro-regular/faHandPointLeft';
import farHandPointRight from '@fortawesome/fontawesome-pro-regular/faHandPointRight';
import farHome from '@fortawesome/fontawesome-pro-regular/faHome';
import farInfoCircle from '@fortawesome/fontawesome-pro-regular/faInfoCircle';
import farLock from '@fortawesome/fontawesome-pro-regular/faLock';
import farMinus from '@fortawesome/fontawesome-pro-regular/faMinus';
import farPlane from '@fortawesome/fontawesome-pro-regular/faPlane';
import farPlus from '@fortawesome/fontawesome-pro-regular/faPlus';
import farTachometerAlt from '@fortawesome/fontawesome-pro-regular/faTachometerAlt';
import farThumbsUp from '@fortawesome/fontawesome-pro-regular/faThumbsUp';
import farTimes from '@fortawesome/fontawesome-pro-regular/faTimes';
import farTrash from '@fortawesome/fontawesome-pro-regular/faTrash';
import farTrashAlt from '@fortawesome/fontawesome-pro-regular/faTrashAlt';
import farUserCircle from '@fortawesome/fontawesome-pro-regular/faUserCircle';
import farHeart from '@fortawesome/fontawesome-pro-regular/faHeart';
import farWifi from '@fortawesome/fontawesome-pro-regular/faWifi';
import farBars from '@fortawesome/fontawesome-pro-regular/faBars';
import farBriefcase from '@fortawesome/fontawesome-pro-regular/faBriefcase';
import farWrench from '@fortawesome/fontawesome-pro-regular/faWrench';

// Font Awesome Free Solid -- prefix 'fas'
import fasHeart from '@fortawesome/fontawesome-free-solid/faHeart';
import fasStar from '@fortawesome/fontawesome-free-solid/faStar';
import fasGraduationCap from '@fortawesome/fontawesome-free-solid/faGraduationCap';

// Font Awesome Pro Light -- prefix 'fal'
import falLock from '@fortawesome/fontawesome-pro-light/faLock';
import falSignOut from '@fortawesome/fontawesome-pro-light/faSignOut';

import styled, {css} from 'styled-components';

type IconProps = {
  name: string,
  fontAwesomePrefix?: string,
  size?: string,
  disabled?: boolean,
  disabledClassName?: any,
  onClick?: any,
  theme?: any,
  className?: any
}

class Icon extends React.Component<IconProps> {

  static defaultProps = {
    size: 'small',
    disabled: false,
    theme: 'light'
  };

  _fontAwesomeLibrary: any;

  constructor(props: IconProps) {
    super(props);
    //TODO: is there a way to not have to specify this twice?
    fontawesome.library.add(
      farBan,
      farBars,
      farBuilding,
      farCalendar,
      farCar,
      farCheck,
      farCheckCircle,
      farChevronDown,
      farClock,
      farEdit,
      farHandPointLeft,
      farHandPointRight,
      farHome,
      farInfoCircle,
      farLock,
      farPlane,
      farPlus,
      farMinus,
      farTachometerAlt,
      farThumbsUp,
      farTimes,
      farTrash,
      farTrashAlt,
      farUserCircle,
      farHeart,
      fasStar,
      fasHeart,
      falLock,
      farWifi,
      falSignOut,
      farBriefcase,
      fasGraduationCap,
      farWrench
    );
  }


  render() {

    return <CustomIcon
      theme={this.props.theme}
      size={this.props.size}
      clickable={this.props.onClick}
      disabled={this.props.disabled}
      className={this.props.className}
      onClick={this.props.onClick}
    >
      <FontAwesomeIcon icon={[this.props.fontAwesomePrefix || 'far',this.props.name]} />
    </CustomIcon>;
  }
}

const CustomIcon = styled.div`
  padding: 5px;
  color: rgba(0, 0, 0, 0.3);
  
  ${props => props.size === 'small'
    ? css`font-size: 16px;`
    : props.size === 'medium'
      ? css`font-size: 24px;`
      : props.size === 'large'
        ? css`font-size: 32px;`
        : css`font-size: 16px;`}
  
  ${props => props.theme === 'dark' && css`
    color: rgba(255, 255, 255, 0.9);
  `}
  
  ${props => props.theme === 'light' && css`
    color: rgba(0, 0, 0, 0.3);
  `}
  
  ${props => props.clickable && css`
    cursor: pointer;
    transition: color 0.2s;
  `}
  
  ${props => props.disabled && css`
    cursor: default;
    color: ${props => props.theme === 'light' 
    ? css`color: rgba(0, 0, 0, 0.5);`
    : css`color: rgba(255,255,255,0.5);`}
  `};    
`;

export default Icon;