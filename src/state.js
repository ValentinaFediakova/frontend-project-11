import onChange from 'on-change';

import {
  renderValidationMessage, renderFeeds, renderPosts, renderToggleDisable,
} from './render.js';

export const state = {
  urls: [],
  feeds: [],
  posts: [],
  validate: null,
  networkError: '',
  isDataDownload: null,
  isTimerWork: false,
  uiState: {
    openedPosts: [
      // { postId: 1, isClicked: false },
    ],
  },
};

export const watchedState = onChange(state, (path, value) => {
  if (path === 'validate') {
    renderValidationMessage(path, value);
  }

  if (path === 'feeds') {
    renderFeeds(watchedState.feeds);
  }

  if (path === 'posts') {
    setTimeout(() => {
      renderPosts(watchedState.posts);
    }, 0)
  }

  if (path === 'networkError') {
    renderValidationMessage(path, value);
  }

  if (path === 'isDataDownload') {
    renderToggleDisable({ isDataDownload: value });
  }
});
