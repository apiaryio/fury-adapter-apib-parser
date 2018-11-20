/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { Fury } from 'fury';
import adapter from '../src/adapter';

const fury = new Fury();
fury.use(adapter);

describe('API Blueprint validation', () => {
  it('can validate an API Blueprint', (done) => {
    const source = '# API Name\n';

    fury.validate({ source, mediaType: 'text/vnd.apiblueprint' }, (err, parseResult) => {
      expect(err).to.be.null;
      expect(parseResult).to.be.null;

      done();
    });
  });

  it('can validate an API Blueprint with a warning', (done) => {
    const source = '# GET /\n';

    fury.validate({ source, mediaType: 'text/vnd.apiblueprint' }, (err, parseResult) => {
      expect(err).to.be.null;
      expect(fury.minim.serialiser.serialise(parseResult)).to.deep.equal({
        element: 'parseResult',
        content: [
          {
            element: 'annotation',
            meta: {
              classes: {
                element: 'array',
                content: [
                  {
                    element: 'string',
                    content: 'warning',
                  },
                ],
              },
            },
            attributes: {
              code: {
                element: 'number',
                content: 6,
              },
              sourceMap: {
                element: 'array',
                content: [
                  {
                    element: 'sourceMap',
                    content: [
                      {
                        element: 'array',
                        content: [
                          {
                            element: 'number',
                            attributes: {
                              line: {
                                element: 'number',
                                content: 1,
                              },
                              column: {
                                element: 'number',
                                content: 1,
                              },
                            },
                            content: 0,
                          },
                          {
                            element: 'number',
                            attributes: {
                              line: {
                                element: 'number',
                                content: 1,
                              },
                              column: {
                                element: 'number',
                                content: 8,
                              },
                            },
                            content: 8,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            },
            content: 'action is missing a response',
          },
        ],
      });

      done();
    });
  });

  it('can validate an API Blueprint with an error', (done) => {
    const source = '# Data Structures\n# A (A)\n';

    fury.validate({ source, mediaType: 'text/vnd.apiblueprint' }, (err, parseResult) => {
      expect(err).to.be.null;
      expect(fury.minim.serialiser.serialise(parseResult)).to.deep.equal({
        element: 'parseResult',
        content: [
          {
            element: 'annotation',
            meta: {
              classes: {
                element: 'array',
                content: [
                  {
                    element: 'string',
                    content: 'error',
                  },
                ],
              },
            },
            attributes: {
              code: {
                element: 'number',
                content: 4,
              },
              sourceMap: {
                element: 'array',
                content: [
                  {
                    element: 'sourceMap',
                    content: [
                      {
                        element: 'array',
                        content: [
                          {
                            element: 'number',
                            attributes: {
                              line: {
                                element: 'number',
                                content: 2,
                              },
                              column: {
                                element: 'number',
                                content: 1,
                              },
                            },
                            content: 18,
                          },
                          {
                            element: 'number',
                            attributes: {
                              line: {
                                element: 'number',
                                content: 2,
                              },
                              column: {
                                element: 'number',
                                content: 8,
                              },
                            },
                            content: 8,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            },
            content: "base type 'A' circularly referencing itself",
          },
        ],
      });

      done();
    });
  });
});
