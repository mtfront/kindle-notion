# kindle-notion
A chrome plugin that export kindle notes to a notion compatible csv file.

This plugin will convert the current selected kindle notes to a notion compatible csv file.

Made for [my reading notes channel](https://t.me/mtfront) because filtering and sorting is just much more easier this way.

## Output table format in Notion:

| Name | Highlight | Note | No. |
| --- | --- | --- | --- |
|Chapter|Underlined highlights|Notes/thoughts|Index used to sort|


## How to use:
0. Install this chrome extension.
1. Click the extension icon in chrome.
2. The pop up will prompt you to kindle note page if you're not already in.
3. Select the note you want to export and click an export. Browser will start to download the csv.
5. In Notion, create a table (can be either inline or entire page)
6. Click the '...' on right top cornor of your table, chose "Merge with CSV"
7. Wait for import to complete and refresh the notion page
8. Click the '...'->sort, add an ascending sort on 'No.' (why does stupid notion import in random order?)
9. Notion may convert your 'Note' column to 'Type'. Simply click on the header and change property type to 'Text'
10. Remove default unsed fields like "tags"