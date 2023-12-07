/**
 * Generate a list of the widgets in /packages/commons/src/utils/widgets/widgetMapping.
 */
import widgets from '../../src/app/utils/factories/widgetMapping/index';

const widgetsByType = {};

// Clear the console
process.stdout.write('\x1Bc');

Object.keys(widgets).forEach((key) => {
  const widget = {
    ...widgets[key],
    key,
  };
  if (widget.type in widgetsByType) {
    widgetsByType[widget.type].push(widget);
  } else {
    widgetsByType[widget.type] = [widget];
  }
});

Object.keys(widgetsByType).forEach((key) => {
  process.stdout.write(`\n${key}:\n`);
  widgetsByType[key].forEach((w) => {
    process.stdout.write(`\t${w.name} (${w.key}): ${/require\((.*)\)/.exec(w.loader)[1]}\n`);
  });
});
