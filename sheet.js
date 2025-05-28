function getSheet(name) {
  const SPREADSHEET_ID = '14byOwW2jdwWQyRnbIIRVLpi-fMHtbwv7BcJ7G9R5lp0'
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(name);

  if (!sheet) {
    throw new Error('シートが見つかりません');
  }

  return sheet;
}

function getLastData(name) {
  return getSheet(name).getDataRange().getValues().length;
}
