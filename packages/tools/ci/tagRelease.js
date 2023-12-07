const git = require('simple-git')();

/**
 * Class to tag a release.
 */
class TagRelease {
  constructor() {
    this.tagPrefix = 'release-v';
    this.incrementLevel = 'patch';
  }

  /**
   * Returns the name to use to tag the release.
   * @returns {string}
   */
  getTagName() {
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const min = currentDate.getMinutes();
    const dateFormat = `${year}-${month}-${date}-${hours}-${min}`;

    const tagName = `${this.tagPrefix}-${dateFormat}`;
    console.log({tagName});
    return tagName;
  }

  /**
   * Creates a git tag to trigger a release.
   */
  tagRelease() {
    console.log(`Creating tag out of commit: ${process.env.CIRCLE_SHA1}`);
    git
      .checkout(process.env.CIRCLE_SHA1)
      .addTag(this.getTagName())
      .pushTags();
  }
}

module.exports = new TagRelease();
