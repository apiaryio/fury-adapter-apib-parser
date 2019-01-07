// API Blueprint parser for Fury.js

import deckardcain from 'deckardcain';
import drafterJs from 'drafter.js';
import { JSON06Serialiser } from 'minim';

const name = 'api-blueprint';
const mediaTypes = [
  'text/vnd.apiblueprint',
  'text/vnd.apiblueprint+markdown',
];

function detect(source) {
  return mediaTypes.indexOf(deckardcain.identify(source)) !== -1;
}

export default function (drafter = drafterJs) {
  function validate({ minim, source, requireBlueprintName }, done) {
    const options = {
      requireBlueprintName,
    };

    const serialiser = new JSON06Serialiser(minim);

    drafter.validate(source, options, (err, parseResult) => {
      if (parseResult) {
        done(err, serialiser.deserialise(parseResult));
      } else {
        done(err, parseResult);
      }
    });
  }

  /*
   * Parse an API Blueprint into refract elements.
   */
  function parse({ minim, source, generateSourceMap, requireBlueprintName }, done) {
    const options = {
      exportSourcemap: !!generateSourceMap,
      requireBlueprintName,
    };

    const serialiser = new JSON06Serialiser(minim);

    drafter.parse(source, options, (err, parseResult) => {
      if (parseResult) {
        done(err, serialiser.deserialise(parseResult));
      } else {
        done(err, parseResult);
      }
    });
  }

  return { name, mediaTypes, detect, validate, parse };
}
