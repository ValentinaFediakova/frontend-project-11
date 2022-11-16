import parser from 'xml-parser';
import { v4 as uuidv4 } from 'uuid';

import dictionaryData from './dictionary.js';
import { state, watchedState } from './state.js'


const setFeeds = (unicIdFeed, children) => {
  const feedData = {};

  feedData.id = unicIdFeed;
  feedData.title = `feed_${unicIdFeed}_title`;
  feedData.description = `feed_${unicIdFeed}_description`;
  const newKeyTitleFeed = `feed_${unicIdFeed}_title`;
  const newValueTitleFeed = children.find((el) => el.name === 'title').content;

  const newKeyDescFeed = `feed_${unicIdFeed}_description`;
  const newValueDescFeed = children.find((el) => el.name === 'description').content;

  dictionaryData.addResourceBundle('ru', 'translations', { [newKeyTitleFeed]: newValueTitleFeed });
  dictionaryData.addResourceBundle('ru', 'translations', { [newKeyDescFeed]: newValueDescFeed });

  watchedState.feeds.unshift(feedData);
};

const setPosts = (unicIdFeed, children) => {
  const itemChildren = children.filter((el) => el.name === 'item');
  let postsData = [];

  itemChildren.forEach((el) => {
    const unicIdPost = uuidv4();

    const post = {};
    post.id = unicIdPost;
    post.title = `post_${unicIdPost}_title`;
    post.description = `post_${unicIdPost}_description`;
    post.feedId = unicIdFeed;

    postsData.push(post);

    const newKeyTitlePost = `post_${unicIdPost}_title`;
    const newValueTitlePost = el.children.find((elem) => elem.name === 'title').content;
    const newKeyDescPost = `post_${unicIdPost}_description`;
    const newValueDescPost = el.children.find((elem) => elem.name === 'description').content;
    const newKeyLinkPost = `post_${unicIdPost}_link`;
    const newValueLinkPost = el.children.find((elem) => elem.name === 'link').content;

    dictionaryData.addResourceBundle('ru', 'translations', { [newKeyTitlePost]: newValueTitlePost });
    dictionaryData.addResourceBundle('ru', 'translations', { [newKeyDescPost]: newValueDescPost });
    dictionaryData.addResourceBundle('ru', 'translations', { [newKeyLinkPost]: newValueLinkPost });
  });

  watchedState.posts = [...postsData, ...watchedState.posts];
};

export const createStateAndDictionary = (rssString) => {
  const dataObj = parser(rssString);
  console.log('dataObj', dataObj)
  const { children } = dataObj.root.children[0];
  const unicIdFeed = uuidv4();

  setFeeds(unicIdFeed, children);
  setPosts(unicIdFeed, children);
};


// const findNewPost = () => {

// }