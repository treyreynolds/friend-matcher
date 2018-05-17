//@flow
import React from 'react';
import Icon from 'components/icon/icon';
import { Row } from 'components/layout/layout';
import styled from 'styled-components';

export const Subtitle = styled.div`
 color: ${props => props.theme.primaryDark};
 font-size: 11pt;
 font-weight: 300 !important;
`;

export const Instructions = styled.div`
  color: #333;
  font-size: .9em;
  font-weight: 300 !important;
  padding: 10px;
  background: #f5f5f5;
  margin-top: 10px;
  border-bottom: 2px solid #EFEFEF;
  width: 100%;
`;

export const SkillSpacer = styled.div`
  width: 20px;
  border-right: 1px solid #EFEFEF;
  margin-right: 20px;
  flex: 1;
`;

export const ItemsRow = styled(Row)`
  justify-content: space-between;
`;

export const SectionTitle = (
  <span>Job Titles <span style={{ whiteSpace: 'nowrap' }}>& Experience</span></span>
);

export const HeartIcon = styled(Icon)`
  color: #ef355c;
  margin-right: -15px;
  padding-right: 15px;
`;

export const GrayText = styled.div`
  color: ${props => props.theme.lightGreyText}; 
`;

export const TrashIcon = styled(Icon)`
  font-size: 1.4em;
  color: #DDD;
`;