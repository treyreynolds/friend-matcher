// @flow

export type FriendAiStatsType = {
  advancement: number,
  collaborative: number,
  intense: number,
  prestigious: number,
  purpose: number,
  stable: number
};

export type FriendMatches = {
  id: string,
  description: string,
  score: number,
  stats: FriendAiStatsType,
  approved: boolean
};

export type TrainingType = {
  friendAi: Array<?{
    id: string,
    input: FriendAiStatsType,
    output: {
      match: number
    }
  }>,
  friendMatches: Array<?FriendMatches>
};

export type FeedbackType = {
  friendTrainingRating: ?number
};