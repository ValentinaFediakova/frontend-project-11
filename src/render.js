import dictionaryData from './dictionary.js';
import { openedModalWindow } from './listeners.js';

export const renderValidationMessage = (path, value) => {
  const errorHtmlElem = document.querySelector('.feedback');
  const inputHtml = document.getElementById('url-input');

  errorHtmlElem.classList.remove('text-danger');
  inputHtml.classList.remove('is-invalid');
  errorHtmlElem.classList.remove('text-success');

  errorHtmlElem.textContent = '';

  if (value === 'validateError_bad_link' || value === 'validateError_already_exist' || path === 'networkError' || value === 'invalidResource') {
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

  if (value === 'validateError_valid') {
    errorHtmlElem.classList.add('text-success');
    inputHtml.classList.remove('is-invalid');
    errorHtmlElem.textContent = dictionaryData.t('validateError_valid');
  }
};

export const renderFeeds = (feeds) => {
  const feedsContainer = document.querySelector('.feeds');
  const namesFeedsContainer = feedsContainer.querySelector('.list-group');
  const mainTitle = feedsContainer.querySelector('.card-title');
  const allIdFeedInHtml = document.querySelectorAll('[data-feed-id]');
  mainTitle.textContent = dictionaryData.t('feedsTitle');

  feeds.forEach((item) => {
    let isIdRendered = false;

    allIdFeedInHtml.forEach((feddIdInHtml) => {
      if (feddIdInHtml.dataset.feedId === item.id) {
        isIdRendered = true;
      }
    });

    if (isIdRendered === false) {
      const newLiElem = document.createElement('li');
      const newH3Elem = document.createElement('h3');
      const newPElem = document.createElement('p');

      newLiElem.classList.add('list-group-item', 'border-0', 'border-end-0');
      newLiElem.setAttribute('data-feed-id', `${item.id}`);
      newH3Elem.classList.add('h6', 'm-0');
      newPElem.classList.add('m-0', 'small', 'text-black-50');

      newH3Elem.textContent = item.title;
      newPElem.textContent = item.description;

      newLiElem.append(newH3Elem);
      newLiElem.append(newPElem);
      namesFeedsContainer.prepend(newLiElem);
    }
  });
};

export const renderPosts = (state) => {
  const postssContainer = document.querySelector('.posts');
  const namesPostsContainer = postssContainer.querySelector('.list-group');
  const mainTitle = postssContainer.querySelector('.card-title');
  mainTitle.textContent = dictionaryData.t('postsTitle');
  const statePosts = state.posts;

  for (let i = statePosts.length - 1; i >= 0; i -= 1) {
    const item = statePosts[i];
    const postId = item.id;
    let isPostExist = false;
    const allSamePostsInHtml = document.querySelectorAll('[data-post-Id]');

    allSamePostsInHtml.forEach((rokoko) => {
      if (rokoko.dataset.postId === postId) {
        isPostExist = true;
      }
    });

    if (isPostExist === false) {
      const newLiElem = document.createElement('li');
      const newAElem = document.createElement('a');
      const newButtonElem = document.createElement('button');

      newLiElem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      newAElem.classList.add('fw-bold', 'post-link');
      newAElem.setAttribute('data-id', '2');
      newAElem.setAttribute('target', '_blank');
      newAElem.setAttribute('rel', 'noopener noreferrer');
      const postLink = item.url;
      newAElem.setAttribute('href', `${postLink}`);

      newButtonElem.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      newButtonElem.setAttribute('type', 'button');
      newButtonElem.setAttribute('data-id', '2');
      newButtonElem.setAttribute('data-bs-toggle', 'modal');
      newButtonElem.setAttribute('data-bs-target', '#modal');

      newAElem.textContent = item.title;
      newAElem.setAttribute('data-post-id', `${postId}`);

      newButtonElem.textContent = dictionaryData.t('postButton');

      openedModalWindow(newButtonElem, postId, state);

      newLiElem.append(newAElem);
      newLiElem.append(newButtonElem);
      namesPostsContainer.prepend(newLiElem);
    }
  }
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

export const renderPageWithOpenedModal = (allPosts, openedPosts) => {
  const allrenderedPosts = document.querySelectorAll('[data-post-id]');

  const modalWindow = document.querySelector('.modal');
  const modalTitle = modalWindow.querySelector('.modal-title');
  const modalDescription = modalWindow.querySelector('.modal-body');
  const modalFullArticle = modalWindow.querySelector('.full-article');
  const modalCloseButton = modalWindow.querySelector('.btn-secondary');

  modalFullArticle.textContent = dictionaryData.t('modalReadFullVersion');
  modalCloseButton.textContent = dictionaryData.t('modalClose');

  openedPosts.forEach((openedpost) => {
    allrenderedPosts.forEach((node) => {
      if (node.getAttribute('data-post-id') === openedpost.postId) {
        if (!node.classList.contains('fw-normal')) {
          node.classList.add('fw-normal', 'link-secondary');
          node.classList.remove('fw-bold');
        }
      }
    });

    allPosts.forEach((post) => {
      if (post.id === openedpost.postId) {
        modalTitle.textContent = post.title;
        modalDescription.textContent = post.description;
        modalFullArticle.setAttribute('href', `${post.url}`);
      }
    });
  });
};
