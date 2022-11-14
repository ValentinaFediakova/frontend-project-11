import * as yup from 'yup';
import onChange from 'on-change';
import parser from 'xml-parser'
import { v4 as uuidv4 } from 'uuid';

import getRssData from './getDataByRequest.js';
import { renderValidationMessage, renderFeeds, renderPosts } from './render.js';
import dictionaryData from './dictionary.js';

const app = () => {

  const inputValue = document.getElementById('url-input');
  const form = document.querySelector('.rss-form');

  const state = {
    urls: [],
    feeds: [],
    posts: [],
    validate: null,
    networkError: '',
  }; 
  
  const watchedState = onChange(state, (path, value) => {
    if (path === 'validate') {
      renderValidationMessage(path, value);
    }

    if (path === 'feeds') {
      renderFeeds(watchedState.feeds);
    }

    if (path === 'posts') {
      renderPosts(watchedState.posts);
    }

  });


  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (watchedState.validate !== null) {
      watchedState.validate = null;
    }

    const urlValid = yup.string().url('validateError_bad_link').notOneOf(watchedState.urls, 'validateError_already_exist');

    urlValid.validate(inputValue.value, { abortEarly: false })
      .then(() => {
        watchedState.urls.push(inputValue.value);
        const rssData = getRssData(inputValue.value)
        rssData.then(data => {
          createStateAndDictionary(data.contents)
          watchedState.validate = 'validateError_valid';
          console.log('state', state)
        })
      })
      .catch((err) => {
        console.log('err', err)
        watchedState.validate = err.errors.join();
      });
  });

  const createStateAndDictionary = (rssString) => {
    const dataObj = parser(rssString);
    const children = dataObj.root.children[0].children;
    const unicIdFeed = uuidv4();

    setFeeds(unicIdFeed, children);
    setPosts(unicIdFeed, children)

  }


  const setFeeds = (unicIdFeed, children) => {
    let feedData = {};
    
    feedData.id = unicIdFeed;
    feedData.title = `feed_${unicIdFeed}_title`;
    feedData.description = `feed_${unicIdFeed}_description`;

    const newKeyTitleFeed = `feed_${unicIdFeed}_title`;
    const newValueTitleFeed = children.find(el => el.name == 'title').content;
    const newKeyDescFeed = `feed_${unicIdFeed}_description`;
    const newValueDescFeed = children.find(el => el.name == "description").content;

    dictionaryData.addResourceBundle('ru', 'translations', { [newKeyTitleFeed]: newValueTitleFeed } );
    dictionaryData.addResourceBundle('ru', 'translations', { [newKeyDescFeed]: newValueDescFeed } );

    

    watchedState.feeds.push(feedData);
  }

  const setPosts = (unicIdFeed, children) => {
    const itemChildren = children.filter(el => el.name == 'item');
    
    itemChildren.map((el) => {
      const unicIdPost = uuidv4();

      const post = {};
      post.id = unicIdPost;
      post.title = `post_${unicIdPost}_title`;
      post.description = `post_${unicIdPost}_description`;
      post.feedId = unicIdFeed;

      watchedState.posts.push(post);

      const newKeyTitlePost = `post_${unicIdPost}_title`;
      const newValueTitlePost = el.children.find(elem => elem.name == 'title').content;
      const newKeyDescPost = `post_${unicIdPost}_description`;
      const newValueDescPost = el.children.find(elem => elem.name == "description").content;
      const newKeyLinkPost = `post_${unicIdPost}_link`;
      const newValueLinkPost = el.children.find(elem => elem.name == "link").content;

      dictionaryData.addResourceBundle('ru', 'translations', { [newKeyTitlePost]: newValueTitlePost } );
      dictionaryData.addResourceBundle('ru', 'translations', { [newKeyDescPost]: newValueDescPost } );
      dictionaryData.addResourceBundle('ru', 'translations', { [newKeyLinkPost]: newValueLinkPost } );
    })
  }
};

export default app;