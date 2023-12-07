const collectReports = require('./collect');
const uploadResults = require('./uploadResults');

(async () => {
  await collectReports();
  await uploadResults();
})();
