let video;

beforeEach(() => {
  document.body.innerHTML = "<video></video>";
  video = document.querySelector("video");

  video.play = jest.fn();
  video.pause = jest.fn();


  jest.isolateModules(() => {
    require("../content-scripts/script.js");
  });

});

afterEach(() => {
  jest.clearAllMocks();
});

describe("script.js", () => {

    test("get_vieo find the video in the page",()=>{
      const {get_video} = require("../content-scripts/script.js");
      const test_video = get_video();
      expect(test_video).toBe(video);
    })

    test("pauses the video when hidden and pause=true",()=>{
      Object.defineProperty(document, "visibilitychange", {
        value: "hidden",
        configurable: true,
      });

      _onMessageListener({message: "start"}, null, jest.fn());
      document.dispatchEvent(new Event("visibilitychange"));
      expect(video.play).toHaveBeenCalled();
      expect(video.pause).not.toHaveBeenCalled();
    })

});