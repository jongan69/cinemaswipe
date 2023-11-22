interface IMovie {
  movieTitle: any;
  _id: null | undefined;
  length: number;
  map(arg0: (movie: { id: string | number; titleText: { text: string; }; primaryImage: { url: string; caption: { plainText: string; }; }; }, index: string | number) => React.JSX.Element): unknown;
  id: string | number;
  titleText: {
    text: string;
  };
  primaryImage: {
    url: string;
    caption: {
      plainText: string;
    };
  };
}

export {
  // not exporting IWords | INumbers
  IMovie
}