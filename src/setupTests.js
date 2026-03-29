// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const playMock = vi.fn(() => Promise.resolve());
const pauseMock = vi.fn();

window.HTMLMediaElement.prototype.play = playMock;
window.HTMLMediaElement.prototype.pause = pauseMock;
window.Audio = function MockAudio(src = '') {
  const audioElement = document.createElement('audio');
  audioElement.src = src;
  audioElement.play = playMock;
  audioElement.pause = pauseMock;
  audioElement.preload = 'auto';
  audioElement.currentTime = 0;
  return audioElement;
};

beforeEach(() => {
  window.localStorage.clear();
  playMock.mockClear();
  pauseMock.mockClear();
});
