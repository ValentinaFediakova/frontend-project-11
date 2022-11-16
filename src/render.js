import dictionaryData from './dictionary.js';
import { state, watchedState } from './state.js'

export const renderValidationMessage = (path, value) => {
  const errorHtmlElem = document.querySelector('.feedback');
  const inputHtml = document.getElementById('url-input');

  errorHtmlElem.classList.remove('text-danger');
  inputHtml.classList.remove('is-invalid');
  errorHtmlElem.classList.remove('text-success');

  if (value === 'validateError_bad_link' || value === 'validateError_already_exist' || path === 'networkError') {
    console.log('!!! bad link')
    errorHtmlElem.classList.add('text-danger');
    inputHtml.classList.add('is-invalid');
    let text;
    if (value === 'validateError_valid') {
      text = dictionaryData.t('validateError_valid');
    } else if (value === 'validateError_already_exist') {
      text = dictionaryData.t('validateError_already_exist');
    } else if (value === 'invalidResource') {
      text = dictionaryData.t('invalidResource');
    } else if (value === 'validateError_bad_link') {
      text = dictionaryData.t('validateError_bad_link');
    }
    errorHtmlElem.textContent = text;
    return;
  }

  errorHtmlElem.classList.add('text-success');
  inputHtml.classList.remove('is-invalid');
  errorHtmlElem.textContent = dictionaryData.t('validateError_valid');
};

export const renderFeeds = (feeds) => {
  const feedsContainer = document.querySelector('.feeds');
  const namesFeedsContainer = feedsContainer.querySelector('.list-group');
  const mainTitle = feedsContainer.querySelector('.card-title');
  mainTitle.textContent = dictionaryData.t('feedsTitle');

  namesFeedsContainer.textContent = '';

  feeds.forEach((item) => {
    const fedId = item.id;
    const newLiElem = document.createElement('li');
    const newH3Elem = document.createElement('h3');
    const newPElem = document.createElement('p');

    newLiElem.classList.add('list-group-item', 'border-0', 'border-end-0');
    newH3Elem.classList.add('h6', 'm-0');
    newPElem.classList.add('m-0', 'small', 'text-black-50');

    // newH3Elem.textContent = dictionaryData.t(`feed_${fedId}_title`);
    // newPElem.textContent = dictionaryData.t(`feed_${fedId}_description`);

    newH3Elem.textContent = item.title;
    newPElem.textContent = item.description;

    newLiElem.append(newH3Elem);
    newLiElem.append(newPElem);
    namesFeedsContainer.append(newLiElem);
  });
};

export const renderPosts = (postsInState) => {
  const postssContainer = document.querySelector('.posts');
  const namesPostsContainer = postssContainer.querySelector('.list-group');
  const mainTitle = postssContainer.querySelector('.card-title');
  mainTitle.textContent = dictionaryData.t('postsTitle');

  // namesPostsContainer.textContent = '';

  postsInState.forEach((item) => {
    const postId = item.id;
    const isItNewPost = checkNewPost(item);

    console.log('isItNewPost', isItNewPost)

    if (isItNewPost === false) {
      return;
    }

    const newLiElem = document.createElement('li');
    const newAElem = document.createElement('a');
    const newButtonElem = document.createElement('button');

    newLiElem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    newAElem.classList.add('fw-bold', 'post-link');
    newAElem.setAttribute('data-id', '2');
    newAElem.setAttribute('target', '_blank');
    newAElem.setAttribute('rel', 'noopener noreferrer');
    // const postLink = dictionaryData.t(`post_${postId}_link`);
    const postLink = item.url;
    newAElem.setAttribute('href', `${postLink}`);

    newButtonElem.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    newButtonElem.setAttribute('type', 'button');
    newButtonElem.setAttribute('data-id', '2');
    newButtonElem.setAttribute('data-bs-toggle', 'modal');
    newButtonElem.setAttribute('data-bs-target', '#modal');

    newAElem.textContent = item.title;

    // newAElem.textContent = dictionaryData.t(`post_${postId}_title`);
    newButtonElem.textContent = dictionaryData.t('postButton');

    

    newLiElem.append(newAElem);
    newLiElem.append(newButtonElem);
    namesPostsContainer.append(newLiElem);
  });
};

export const renderToggleDisable = (dataIsComlied) => {
  const buttonElement = document.getElementById('btn-addNews');
  const inputElement = document.getElementById('url-input');

  if (dataIsComlied.isDataDownload === true) {
    buttonElement.removeAttribute('disabled');
    inputElement.removeAttribute('disabled');
  }

  if (dataIsComlied.isDataDownload === false) {
    buttonElement.setAttribute('disabled', 'true');
    inputElement.setAttribute('disabled', 'true');
  }
};

const checkNewPost = (post) => {
  const titlePosts = document.querySelectorAll('.post-link');

  if (titlePosts.length === 0) {
    return true;
  }

  let existedPost = true;

  titlePosts.forEach((item) => {
    if (item.textContent === post.title) {
      existedPost = false;
    }
  })

  return existedPost;
}
