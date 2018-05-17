import React from 'react';
import styled from 'styled-components';
import Icon from 'components/icon/icon';
import scroll from 'scroll';

type State = {
  canScrollLeft: boolean,
  canScrollRight: boolean,
  scrollbarHeight: number
};

type Props = {
  children: any
}

class Carousel extends React.Component<Props, State> {

  state = {
    canScrollLeft: false,
    canScrollRight: false,
    scrollbarHeight: 0
  };

  componentDidMount() {
    this.handleScroll();
    const {viewport} = this.refs;
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({
      scrollbarHeight: viewport.offsetHeight - viewport.clientHeight
    });
  }

  handleScroll() {
    this.setState({
      canScrollLeft: canScrollLeft(this.refs.viewport),
      canScrollRight: canScrollRight(this.refs.viewport)
    });
  }

  handleGoRight() {
    const {viewport} = this.refs;
    scroll.left(viewport, viewport.scrollLeft + viewport.offsetWidth);
  }

  handleGoLeft() {
    const {viewport} = this.refs;
    scroll.left(viewport, viewport.scrollLeft - viewport.offsetWidth);
  }

  render() {
    return (
      <Grandparent>
        <Parent>
          {
            this.state.canScrollLeft
              ? (
                <LeftScrollShadow onClick={this.handleGoLeft}>
                  <Arrow name="arrowLeft" onClick={this.handleGoLeft} />
                </LeftScrollShadow>
              )
              : null
          }
          <Viewport
            onScroll={this.handleScroll}
            ref="viewport"
            scrollbarHeight={this.state.scrollbarHeight}
          >
            {this.props.children}
          </Viewport>
          {
            this.state.canScrollRight
              ? (
                <RightScrollShadow>
                  <Arrow name="arrowRight" onClick={() => this.handleGoRight()} />
                </RightScrollShadow>
              )
              : null
          }
        </Parent>
      </Grandparent>
    );
  }
}

export default Carousel;

const Grandparent = styled.div`
  position: relative;
`;

const Parent = styled.div`
  overflow: hidden;
`;

const Viewport = styled.div`
  overflow-x: scroll;
  margin-bottom: ${props => '-'+props.scrollAmount};
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollShadow = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 9px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: visible;
`;

const LeftScrollShadow = styled(ScrollShadow)`
  left: 0;
  background: linear-gradient(to right, #f0f0f0, transparent);
  z-index: 1;
`;

const RightScrollShadow = styled(ScrollShadow)`
  right: 0;
  background: linear-gradient(to left, #f0f0f0, transparent);
`;

const Arrow = styled(Icon)`
  font-size: 25px;
  padding: 13px;
  cursor: pointer;
`;

function canScrollRight(elem) {
  return elem.scrollLeft < elem.scrollWidth - elem.clientWidth - 1;
}

function canScrollLeft(elem) {
  return !!elem.scrollLeft;
}