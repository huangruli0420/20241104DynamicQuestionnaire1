import { MatPaginatorIntl } from '@angular/material/paginator';

export function chinesePaginator() {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = '每頁問卷數';
  // paginatorIntl.nextPageLabel = '下一頁';
  // paginatorIntl.previousPageLabel = '上一頁';
  // paginatorIntl.firstPageLabel = '首頁';
  // paginatorIntl.lastPageLabel = '末頁';
  return paginatorIntl;
}
