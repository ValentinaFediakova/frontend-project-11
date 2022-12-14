import onChange from 'on-change';

import {
  renderValidationMessage, renderFeeds, renderPosts, renderToggleDisable, renderPageWithOpenedModal,
} from './render.js';

export const state = {
  urls: [],
  feeds: [],
  posts: [],
  unicIdFeed: [],
  validate: null,
  networkError: '',
  isDataDownload: null,
  isTimerWork: false,
  uiState: {
    openedPosts: [
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
      renderPosts(watchedState);
    }, 0);
  }

  if (path === 'networkError') {
    renderValidationMessage(path, value);
  }

  if (path === 'isDataDownload') {
    renderToggleDisable({ isDataDownload: value });
  }

  if (path === 'uiState.openedPosts') {
    renderPageWithOpenedModal(watchedState.posts, watchedState.uiState.openedPosts);
  }
});
