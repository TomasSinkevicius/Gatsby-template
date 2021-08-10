const { onRenderBody } = require("./gatsby-ssr");

const react = require("react");

describe("onRenderBody", () => {
  let setHeadComponents;
  beforeEach(() => {
    setHeadComponents = jest.fn();
  });

  it("should error on no fonts", () => {
    expect(() =>
      onRenderBody({ setHeadComponents }, { fonts: undefined })
    ).toThrow(
      `'fonts' option is a required option and must be an array of strings`
    );
    expect(setHeadComponents.mock.calls.length).toBe(0);
  });

  it("should error on empty fonts", () => {
    expect(() => onRenderBody({ setHeadComponents }, { fonts: [] })).toThrow(
      `'fonts' option is a required option and must be an array of strings`
    );
    expect(setHeadComponents.mock.calls.length).toBe(0);
  });

  it("should error on incorrect font types", () => {
    expect(() => onRenderBody({ setHeadComponents }, { fonts: [1] })).toThrow(
      `'fonts' option is a required option and must be an array of strings`
    );
    expect(setHeadComponents.mock.calls.length).toBe(0);
  });

  it("should error on non-array font type", () => {
    expect(() =>
      onRenderBody({ setHeadComponents }, { fonts: "Montserrat" })
    ).toThrow(
      `'fonts' option is a required option and must be an array of strings`
    );
    expect(setHeadComponents.mock.calls.length).toBe(0);
  });

  it("should transform fonts correctly", () => {
    onRenderBody(
      { setHeadComponents },
      { fonts: ["montserrat", "open sans pro"] }
    );
    const { calls } = setHeadComponents.mock;

    const element = react.createElement("link", {
      crossOrigin: undefined,
      href: "https://fonts.googleapis.com/css?family=Montserrat|Open+Sans+Pro",
      key: "fonts",
      rel: "stylesheet",
      type: "text/css",
    });

    expect(calls[0]).toEqual([[element]]);
  });

  it("should apply display properly", () => {
    onRenderBody(
      { setHeadComponents },
      { fonts: ["montserrat", "open sans pro"], display: "swap" }
    );
    const { calls } = setHeadComponents.mock;

    const element = react.createElement("link", {
      crossOrigin: undefined,
      href:
        "https://fonts.googleapis.com/css?family=Montserrat|Open+Sans+Pro&display=swap",
      key: "fonts",
      rel: "stylesheet",
      type: "text/css",
    });

    expect(calls[0]).toEqual([[element]]);
  });

  describe("overriding attributes", () => {
    it("should not override href attribute", () => {
      onRenderBody(
        { setHeadComponents },
        { fonts: ["montserrat", "open sans pro"], attributes: { href: "test" } }
      );
      const { calls } = setHeadComponents.mock;

      const element = react.createElement("link", {
        crossOrigin: undefined,
        href: "test",
        key: "fonts",
        rel: "stylesheet",
        type: "text/css",
      });

      expect(calls[0]).not.toEqual([[element]]);
    });
    it("should not override type attribute", () => {
      onRenderBody(
        { setHeadComponents },
        { fonts: ["montserrat", "open sans pro"], attributes: { type: "test" } }
      );
      const { calls } = setHeadComponents.mock;

      const element = react.createElement("link", {
        crossOrigin: undefined,
        href:
          "https://fonts.googleapis.com/css?family=Montserrat|Open+Sans+Pro",
        key: "fonts",
        rel: "stylesheet",
        type: "test",
      });

      expect(calls[0]).not.toEqual([[element]]);
    });
    it("should override other attribute", () => {
      onRenderBody(
        { setHeadComponents },
        {
          fonts: ["montserrat", "open sans pro"],
          attributes: {
            rel: "stylesheet preload prefetch",
            key: "some other key",
            crossOrigin: "testing",
          },
        }
      );
      const { calls } = setHeadComponents.mock;

      const element = react.createElement("link", {
        crossOrigin: undefined,
        href:
          "https://fonts.googleapis.com/css?family=Montserrat|Open+Sans+Pro",
        key: "some other key",
        rel: "stylesheet preload prefetch",
        type: "text/css",
        crossOrigin: "testing",
      });

      expect(calls[0]).toEqual([[element]]);
    });
  });

  describe("enabling preconnect", () => {
    it("should create a preconnect element to the correct url", () => {
      onRenderBody(
        { setHeadComponents },
        {
          fonts: ["montserrat", "open sans pro"],
          preconnect: true,
        }
      );
      const { calls } = setHeadComponents.mock;

      const element = react.createElement("link", {
        href:
          "https://fonts.googleapis.com/css?family=Montserrat|Open+Sans+Pro",
        key: "fonts",
        rel: "stylesheet",
        type: "text/css",
        crossOrigin: "anonymous",
      });
      const preconnectElement = react.createElement("link", {
        key: "google-fonts-preconnect",
        rel: "preconnect",
        href: "https://fonts.gstatic.com/",
        crossOrigin: "anonymous",
      });

      expect(calls[0]).toEqual([[preconnectElement, element]]);
    });
  });
});
