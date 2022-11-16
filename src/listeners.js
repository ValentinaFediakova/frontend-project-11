import parser from 'xml-parser';
import { v4 as uuidv4 } from 'uuid';

import { watchedState } from './state.js';

const setFeeds = (unicIdFeed, children) => {
  const feedData = {};

  feedData.id = unicIdFeed;
  const newValueTitleFeed = children.find((el) => el.name === 'title').content;

  const newValueDescFeed = children.find((el) => el.name === 'description');

  feedData.title = newValueTitleFeed;
  feedData.description = newValueDescFeed ? newValueDescFeed.content : '';

  watchedState.feeds.unshift(feedData);
};

const setPosts = (unicIdFeed, children) => {
  const itemChildren = children.filter((el) => el.name === 'item');
  const postsData = [];

  itemChildren.forEach((el) => {
    const unicIdPost = uuidv4();

    const post = {};
    post.id = unicIdPost;
    post.feedId = unicIdFeed;

    const newValueTitlePost = el.children.find((elem) => elem.name === 'title').content;
    const newValueDescPost = el.children.find((elem) => elem.name === 'description').content;
    const newValueLinkPost = el.children.find((elem) => elem.name === 'link').content;

    post.title = newValueTitlePost;
    post.description = newValueDescPost;
    post.url = newValueLinkPost;

    postsData.push(post);
  });

  watchedState.posts = [...postsData, ...watchedState.posts];
};

export const createStateAndDictionary = (rssString) => {
  const dataObj = parser(rssString);
  console.log('dataObj', dataObj);
  const { children } = dataObj.root.children[0];
  const unicIdFeed = uuidv4();

  setFeeds(unicIdFeed, children);
  setPosts(unicIdFeed, children);
};


