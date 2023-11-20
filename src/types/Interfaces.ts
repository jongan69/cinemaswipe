interface IMovie {
  length: any;
  map(arg0: (movie: { id: any; titleText: { text: string; }; primaryImage: { url: any; caption: { plainText: string; }; }; }, index: string | number) => React.JSX.Element): unknown;
  id: any;
  titleText: {
    text: string;
  };
  primaryImage: {
    url: any;
    caption: {
      plainText: string;
    };
  };
}

export {
  // not exporting IWords | INumbers
  IMovie
}