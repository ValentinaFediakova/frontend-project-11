import parser from 'xml-parser';
import { v4 as uuidv4 } from 'uuid';

const setFeeds = (unicIdFeed, children, stateData) => {
  const allFeeds = stateData.feeds;
  const feedData = {};

  const newValueTitleFeed = children.find((el) => el.name === 'title').content;
  const feedWithSameName = allFeeds.filter((feed) => feed.title === newValueTitleFeed);

  if (feedWithSameName.length !== 0) {
    return;
  }

  const newValueDescFeed = children.find((el) => el.name === 'description');

  feedData.title = newValueTitleFeed;
  feedData.description = newValueDescFeed ? newValueDescFeed.content : '';
  feedData.id = unicIdFeed;
  stateData.feeds.unshift(feedData);
};

const setPosts = (unicIdFeed, children, stateData) => {
  const itemChildren = children.filter((el) => el.name === 'item');
  const postsData = [];
  const allPostInState = stateData.posts;

  itemChildren.forEach((el) => {
    const unicIdPost = uuidv4();
    const post = {};

    const newValueTitlePost = el.children.find((elem) => elem.name === 'title').content;

    const postWithSameTitle = allPostInState.filter((postInState) => {
      let result;
      if (postInState.title === newValueTitlePost) {
        result = postInState;
      }

      return result;
    });

    if (postWithSameTitle.length === 0) {
      const newValueDescPost = el.children.find((elem) => elem.name === 'description').content;
      const newValueLinkPost = el.children.find((elem) => elem.name === 'link').content;

      post.id = unicIdPost;
      post.feedId = unicIdFeed;

      post.title = newValueTitlePost;
      post.description = newValueDescPost;
      post.url = newValueLinkPost;

      postsData.push(post);
    }
  });

  const stateData2 = stateData;
  stateData2.posts = [...postsData, ...stateData.posts];
};

export const createStateAndDictionary = (rssString, stateData) => {
  const dataObj = parser(rssString);
  const { children } = dataObj.root.children[0];
  const unicIdFeed = uuidv4();

  setFeeds(unicIdFeed, children, stateData);
  setPosts(unicIdFeed, children, stateData);
};

const setOpenModals = (idPost, state) => {
  const openedPost = {};
  openedPost.postId = idPost;
  state.uiState.openedPosts.push(openedPost);
};

export const openedModalWindow = (btn, idPost, state) => {
  btn.addEventListener('click', () => {
    setOpenModals(idPost, state);
  });
};
