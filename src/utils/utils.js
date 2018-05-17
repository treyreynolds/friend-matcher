// @flow
import _ from 'lodash';
import { FRIEND_TRAINING_LABELS } from '../constants/constants';
import type { FriendMatches } from 'utils/shared-types';
import classNames from 'classnames';

export function getMergedProps(self: any, props: any) {
  const unhandledProps = _.omit(self.props, _.keys(self.constructor.propTypes));
  return _.assignWith(unhandledProps, props, (objValue, srcValue, key) => {
    switch (key) {
      case 'className':
        return classNames(objValue, srcValue);
      case 'style':
        return _.assign({}, objValue, srcValue);
      default:
        return srcValue;
    }
  });
}

export function transformFunctionSheetData(sheet: Array<Object>, selectedLevel: string){
  return _(sheet)
    // TODO: filter on selected job function as well
    .filter(s => s.level === selectedLevel)
    .map(row => ({
      id: row.id,
      description: row.description,
      level: row.level,
      stats: {
        analysis: parseFloat(row.analysis)/10.0,
        details: parseFloat(row.details)/10.0,
        collaboration: parseFloat(row.collaboration)/10.0,
        oralCommunication: parseFloat(row.oral_comm)/10.0,
        writtenCommunication: parseFloat(row.written_comm)/10.0,
        innovation: parseFloat(row.innovation)/10.0,
        strategy: parseFloat(row.strategy)/10.0,
      }
    }))
    .value();
}

export function transformFriendSheetData(sheet: Array<Object>){
  return _(sheet)
    .map(row => ({
      id: row.id,
      description: row.description,
      stats: {
        collaborative:  row.collaborative   === '' ? 0.0 : parseFloat(row.collaborative),
        stable:         row.stable          === '' ? 0.0 : parseFloat(row.stable),
        prestigious:    row.prestigious     === '' ? 0.0 : parseFloat(row.prestigious),
        purpose:        row.purpose         === '' ? 0.0 : parseFloat(row.purpose),
        intense:        row.intense         === '' ? 0.0 : parseFloat(row.intense),
        advancement:    row.advancement     === '' ? 0.0 : parseFloat(row.advancement)
      }
    }))
    .shuffle() // TODO: determine if we want to shuffle or not
    .value();
}

export function formatDollars(n: ?number): string {
  // From http://bit.ly/1ooHsSO
  return n
    ? '$' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : '';
}

export function getInitials(name: ?string) {
  if(!name){
    return 'A. N.';
  }

  return _(name).split(' ').first().charAt(0).toUpperCase() + '. ' +
    _(name).split(' ').last().charAt(0).toUpperCase() + '.';
}

export function getRootURL() {
  return window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/';
}

export function buildCultureAiSentence(matches: FriendMatches) : string {
  const highestStats = averageMatchStats(matches);
  return `The ideal company would offer you a ${FRIEND_TRAINING_LABELS[highestStats[0].stat]} and ` +
    `${FRIEND_TRAINING_LABELS[highestStats[1].stat]}. `;
}

export function averageMatchStats(matches : any) : Array<{stat: number, score: number}> {
  const stats = _.map(matches, ({stats}) =>
    _.omit(stats, '__typename')
  );

  const averageStats = _.mapValues(stats[0], (ignoredScore, statName) =>
    _.meanBy(stats, statName)
  );

  return _(averageStats)
    .map((score, stat) => ({
      stat,
      score
    }))
    .orderBy('score', 'desc')
    .map(s => ({stat: s.stat, score: s.score}))
    .value();
}

export function randomId() {
  return 'id-' + Math.round(Math.random() * 1000000000);
}

