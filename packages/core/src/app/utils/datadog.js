import tracer from 'dd-trace';

/**
 * Datadog Class
 */
class Datadog {
/**
 * init for datadog tracer
 * settings are set as env variables
 */
  constructor() {
    tracer.init();
    tracer.use('express', {
      hooks: {
        request: this.constructor.onExpressRoute,
      },
    });
    this.Library = tracer;
  }

  /**
   * Hook to track express requests.
   * @param {Span} span Span object.
   * @param {Object} req Request object.
   * @param {Object} res Response object.
   */
  static onExpressRoute(span, req, res) {
    if (res.get('X-Content-Type')) {
      const why = req.get('X-Why');
      const contentType = res.get('X-Content-Type');
      let tag = '/';
      if (why) {
        tag += `${why} - `;
      }
      tag += contentType;
      span.setTag('http.route', tag);
    }
  }

  /**
   * Adds a new tag to the current span
   * @param {string} key the key for the new tag
   * @param {string} value Value for the new tag
   */
  addTag(key, value) {
    const span = this.Library.scope().active();
    if (span) {
      span.setTag(key, value);
    }
  }

  /**
   * Starts and returns a new Span representing a logical unit of work.
   * @param {string} name The name of the operation.
   * @returns {Span}
   */
  addSpan(name) {
    return this.Library.startSpan(name, {
      childOf: this.Library.scope().active(),
    });
  }

  /**
   * Finalizes the Span state.
   * @param {Span} span Span to close
   */
  closeSpan(span) {
    if (span && this.Library) {
      span.finish();
    }
  }
}

export default new Datadog();
