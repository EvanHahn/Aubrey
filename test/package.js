const expect = require('expect.js');

const pkg = require('../package.json');

describe('package dot json', function () {
  `
    name description author version main license
    keywords repository bugs
  `.trim().split(/\s+/).forEach(function (property) {

    it('has ' + property, function () {
      expect(pkg[property]).not.to.be(undefined);
    });
  });
});
